import type {
  ArtifactStoreOptions,
  ProductArtifactStore,
} from "../artifacts/artifact-store.ts";
import type {
  CreateArtifactDraftInput,
  ProductArtifactCellId,
  ProductArtifactKind,
  ProductArtifactRecord,
} from "../artifacts/artifact-contract.ts";
import {
  createArtifactDraft,
  getArtifact,
  listArtifactsByCell,
  reviseArtifact,
  saveArtifact,
} from "../artifacts/artifact-workflow.ts";
import type {
  LearningDriftStoreOptions,
  ProductLearningDriftStore,
} from "../learning/learning-drift-store.ts";
import {
  acknowledgeDriftImpact,
} from "../learning/drift-workflow.ts";
import type {
  ProductActionOutcomeKind,
  ProductActionOutcomeRecord,
  ProductActionPolicyDecision,
  ProductActionRequestRecord,
  ProductActionRequestStatus,
  ProductReviewProposalRecord,
  ProductReviewProposalStatus,
  CreateActionRequestInput,
} from "./action-contract.ts";
import {
  evaluateActionPolicyForRequest,
} from "./action-policy.ts";
import {
  ProductActionStore,
} from "./action-store.ts";

const DEFAULT_CREATED_AT = "2026-04-26T00:00:00.000Z";

const AUTO_LOCAL_ARTIFACT_KIND_BY_CELL: Record<
  ProductArtifactCellId,
  ProductArtifactKind
> = {
  development_company: "implementation_plan",
  ecommerce: "campaign_plan",
  personal_media: "content_calendar_suggestion",
};

const EXTERNAL_DRAFT_ARTIFACT_KIND_BY_CELL: Record<
  ProductArtifactCellId,
  ProductArtifactKind
> = {
  development_company: "review_packet",
  ecommerce: "listing_copy",
  personal_media: "article_draft",
};

export interface ApplyBoundedActionContext {
  action_store: ProductActionStore;
  artifact_store?: ProductArtifactStore;
  learning_drift_store?: ProductLearningDriftStore;
}

export interface ApplyBoundedActionOptions {
  artifact_title?: string;
  artifact_content_seed?: string;
  revised_content?: string;
  review_proposal_title?: string;
  review_proposal_summary?: string;
  proposed_local_change?: string;
  source_evidence_refs?: string[];
}

function stable_hash(value: string): string {
  let hash = 0;
  for (const character of value) {
    hash = (hash * 39 + character.charCodeAt(0)) % 2147483647;
  }
  return hash.toString(36);
}

function clone_request(
  request: ProductActionRequestRecord
): ProductActionRequestRecord {
  return JSON.parse(JSON.stringify(request)) as ProductActionRequestRecord;
}

function clone_outcome(
  outcome: ProductActionOutcomeRecord
): ProductActionOutcomeRecord {
  return JSON.parse(JSON.stringify(outcome)) as ProductActionOutcomeRecord;
}

function clone_review_proposal(
  proposal: ProductReviewProposalRecord
): ProductReviewProposalRecord {
  return JSON.parse(JSON.stringify(proposal)) as ProductReviewProposalRecord;
}

function save_action_request(
  store: ProductActionStore,
  request: ProductActionRequestRecord
): ProductActionRequestRecord {
  const snapshot = store.load_snapshot();
  snapshot.action_requests = [
    ...snapshot.action_requests.filter(
      (entry) => entry.action_request_id !== request.action_request_id
    ),
    clone_request(request),
  ];
  store.save_snapshot(snapshot);
  return clone_request(request);
}

function save_action_outcome(
  store: ProductActionStore,
  outcome: ProductActionOutcomeRecord
): ProductActionOutcomeRecord {
  const snapshot = store.load_snapshot();
  snapshot.action_outcomes = [
    ...snapshot.action_outcomes.filter(
      (entry) => entry.action_outcome_id !== outcome.action_outcome_id
    ),
    clone_outcome(outcome),
  ];
  store.save_snapshot(snapshot);
  return clone_outcome(outcome);
}

function save_review_proposal(
  store: ProductActionStore,
  proposal: ProductReviewProposalRecord
): ProductReviewProposalRecord {
  const snapshot = store.load_snapshot();
  snapshot.review_proposals = [
    ...snapshot.review_proposals.filter(
      (entry) => entry.review_proposal_id !== proposal.review_proposal_id
    ),
    clone_review_proposal(proposal),
  ];
  store.save_snapshot(snapshot);
  return clone_review_proposal(proposal);
}

function update_action_request_status(
  store: ProductActionStore,
  action_request_id: string,
  status: ProductActionRequestStatus
): ProductActionRequestRecord | null {
  const snapshot = store.load_snapshot();
  const request = snapshot.action_requests.find(
    (entry) => entry.action_request_id === action_request_id
  );

  if (!request) {
    return null;
  }

  const updated: ProductActionRequestRecord = {
    ...request,
    status,
  };
  snapshot.action_requests = snapshot.action_requests.map((entry) =>
    entry.action_request_id === action_request_id ? updated : entry
  );
  store.save_snapshot(snapshot);
  return clone_request(updated);
}

function update_review_proposal_status(
  store: ProductActionStore,
  review_proposal_id: string,
  status: ProductReviewProposalStatus
): ProductReviewProposalRecord | null {
  const snapshot = store.load_snapshot();
  const proposal = snapshot.review_proposals.find(
    (entry) => entry.review_proposal_id === review_proposal_id
  );

  if (!proposal) {
    return null;
  }

  const updated: ProductReviewProposalRecord = {
    ...proposal,
    status,
  };
  snapshot.review_proposals = snapshot.review_proposals.map((entry) =>
    entry.review_proposal_id === review_proposal_id ? updated : entry
  );
  store.save_snapshot(snapshot);
  return clone_review_proposal(updated);
}

function create_action_request_id(input: CreateActionRequestInput): string {
  return [
    input.cell_id,
    input.action_class,
    input.action_kind,
    stable_hash(
      [
        input.title,
        input.intent_summary,
        ...(input.related_artifact_refs ?? []),
        ...(input.related_task_refs ?? []),
        ...(input.related_drift_refs ?? []),
        ...(input.related_learning_refs ?? []),
      ].join("|")
    ),
  ].join(":");
}

function create_action_outcome(args: {
  request: ProductActionRequestRecord;
  outcome_kind: ProductActionOutcomeKind;
  outcome_summary: string;
  produced_artifact_refs?: string[];
  produced_review_refs?: string[];
  produced_evidence_refs?: string[];
}): ProductActionOutcomeRecord {
  return {
    action_outcome_id: `${args.request.action_request_id}:${args.outcome_kind}`,
    action_request_id: args.request.action_request_id,
    cell_id: args.request.cell_id,
    outcome_kind: args.outcome_kind,
    outcome_summary: args.outcome_summary,
    produced_artifact_refs: [...(args.produced_artifact_refs ?? [])],
    produced_review_refs: [...(args.produced_review_refs ?? [])],
    produced_evidence_refs: [...(args.produced_evidence_refs ?? [])],
    created_at: args.request.created_at,
    non_executing: true,
    provider_execution_available: false,
    channel_entry_available: false,
    external_dispatch_available: false,
    runtime_private_fields_omitted: true,
  };
}

function create_rejected_outcome(
  context: ApplyBoundedActionContext,
  request: ProductActionRequestRecord,
  outcome_summary: string
): ProductActionOutcomeRecord {
  update_action_request_status(
    context.action_store,
    request.action_request_id,
    "rejected"
  );
  return save_action_outcome(
    context.action_store,
    create_action_outcome({
      request,
      outcome_kind: "rejected",
      outcome_summary,
      produced_evidence_refs: [...request.source_evidence_refs],
    })
  );
}

function resolve_auto_local_artifact_kind(
  cell_id: ProductArtifactCellId
): ProductArtifactKind {
  return AUTO_LOCAL_ARTIFACT_KIND_BY_CELL[cell_id];
}

function resolve_external_draft_artifact_kind(
  cell_id: ProductArtifactCellId
): ProductArtifactKind {
  return EXTERNAL_DRAFT_ARTIFACT_KIND_BY_CELL[cell_id];
}

function create_artifact_input_from_request(args: {
  request: ProductActionRequestRecord;
  artifact_kind: ProductArtifactKind;
  title?: string;
  content_seed?: string;
}): CreateArtifactDraftInput {
  return {
    cell_id: args.request.cell_id,
    artifact_kind: args.artifact_kind,
    title: args.title ?? args.request.title,
    content_seed: args.content_seed ?? args.request.intent_summary,
    related_task_refs: [...args.request.related_task_refs],
    source_evidence_refs: unique_strings([
      ...args.request.source_evidence_refs,
      ...args.request.related_drift_refs,
      ...args.request.related_learning_refs,
    ]),
  };
}

function unique_strings(values: string[]): string[] {
  return [...new Set(values.filter((value) => value.trim().length > 0))].sort(
    (left, right) => left.localeCompare(right)
  );
}

function create_local_artifact_from_request(
  context: ApplyBoundedActionContext,
  request: ProductActionRequestRecord,
  options: ApplyBoundedActionOptions
): ProductArtifactRecord | null {
  if (!context.artifact_store) {
    return null;
  }

  const draft = createArtifactDraft(
    create_artifact_input_from_request({
      request,
      artifact_kind: resolve_auto_local_artifact_kind(request.cell_id),
      title: options.artifact_title,
      content_seed: options.artifact_content_seed,
    })
  );
  return saveArtifact(context.artifact_store, draft);
}

function revise_local_artifact_from_request(
  context: ApplyBoundedActionContext,
  request: ProductActionRequestRecord,
  options: ApplyBoundedActionOptions
): ProductArtifactRecord | null {
  if (!context.artifact_store) {
    return null;
  }

  const artifact_id = request.related_artifact_refs[0];
  if (!artifact_id) {
    return null;
  }

  const current = getArtifact(context.artifact_store, artifact_id);
  if (!current) {
    return null;
  }

  return reviseArtifact(context.artifact_store, {
    artifact_id,
    title: options.artifact_title ?? current.title,
    content:
      options.revised_content ??
      `${current.content}\n\nLocal revision note: ${request.intent_summary}`,
    related_task_refs: [...request.related_task_refs],
    source_evidence_refs: unique_strings([
      ...current.source_evidence_refs,
      ...request.source_evidence_refs,
    ]),
  });
}

function create_external_draft_artifact_from_request(
  context: ApplyBoundedActionContext,
  request: ProductActionRequestRecord,
  options: ApplyBoundedActionOptions
): ProductArtifactRecord | null {
  if (!context.artifact_store) {
    return null;
  }

  const draft = createArtifactDraft(
    create_artifact_input_from_request({
      request,
      artifact_kind: resolve_external_draft_artifact_kind(request.cell_id),
      title: options.artifact_title,
      content_seed: options.artifact_content_seed,
    })
  );
  return saveArtifact(context.artifact_store, draft);
}

export function createActionRequest(
  store: ProductActionStore,
  input: CreateActionRequestInput
): ProductActionRequestRecord {
  const request: ProductActionRequestRecord = {
    action_request_id: create_action_request_id(input),
    cell_id: input.cell_id,
    action_class: input.action_class,
    action_kind: input.action_kind,
    title: input.title.trim(),
    intent_summary: input.intent_summary.trim(),
    related_artifact_refs: [...(input.related_artifact_refs ?? [])],
    related_task_refs: [...(input.related_task_refs ?? [])],
    related_drift_refs: [...(input.related_drift_refs ?? [])],
    related_learning_refs: [...(input.related_learning_refs ?? [])],
    source_evidence_refs: [...(input.source_evidence_refs ?? [])],
    created_at: DEFAULT_CREATED_AT,
    status: "requested",
    non_executing: true,
    provider_execution_available: false,
    channel_entry_available: false,
    external_dispatch_available: false,
    runtime_private_fields_omitted: true,
  };

  return save_action_request(store, request);
}

export function evaluateActionRequest(
  request: ProductActionRequestRecord
): ProductActionPolicyDecision {
  return evaluateActionPolicyForRequest(request);
}

export function listActionRequestsByCell(
  store: ProductActionStore,
  cell_id: ProductArtifactCellId
): ProductActionRequestRecord[] {
  return store
    .load_snapshot()
    .action_requests.filter((entry) => entry.cell_id === cell_id)
    .sort((left, right) => left.action_request_id.localeCompare(right.action_request_id))
    .map(clone_request);
}

export function listActionOutcomesByCell(
  store: ProductActionStore,
  cell_id: ProductArtifactCellId
): ProductActionOutcomeRecord[] {
  return store
    .load_snapshot()
    .action_outcomes.filter((entry) => entry.cell_id === cell_id)
    .sort((left, right) => left.action_outcome_id.localeCompare(right.action_outcome_id))
    .map(clone_outcome);
}

export function listReviewProposalsByCell(
  store: ProductActionStore,
  cell_id: ProductArtifactCellId
): ProductReviewProposalRecord[] {
  return store
    .load_snapshot()
    .review_proposals.filter((entry) => entry.cell_id === cell_id)
    .sort((left, right) => left.review_proposal_id.localeCompare(right.review_proposal_id))
    .map(clone_review_proposal);
}

export function createReviewProposalFromAction(
  context: ApplyBoundedActionContext,
  request: ProductActionRequestRecord,
  options: ApplyBoundedActionOptions = {}
): {
  updated_request: ProductActionRequestRecord | null;
  review_proposal: ProductReviewProposalRecord;
  action_outcome: ProductActionOutcomeRecord;
} {
  const updated_request = update_action_request_status(
    context.action_store,
    request.action_request_id,
    "review_required"
  );
  const review_proposal: ProductReviewProposalRecord = {
    review_proposal_id: `${request.action_request_id}:review`,
    action_request_id: request.action_request_id,
    cell_id: request.cell_id,
    proposal_title: options.review_proposal_title ?? request.title,
    proposal_summary:
      options.review_proposal_summary ??
      `${request.intent_summary} This proposal remains local and pending review.`,
    proposed_local_change:
      options.proposed_local_change ?? request.intent_summary,
    status: "pending_review",
    source_evidence_refs: [...request.source_evidence_refs],
    non_executing: true,
  };
  const saved_review_proposal = save_review_proposal(
    context.action_store,
    review_proposal
  );
  const action_outcome = save_action_outcome(
    context.action_store,
    create_action_outcome({
      request,
      outcome_kind: "review_proposal_created",
      outcome_summary:
        "A local review proposal was created and remains pending review.",
      produced_review_refs: [saved_review_proposal.review_proposal_id],
      produced_evidence_refs: [...request.source_evidence_refs],
    })
  );

  return {
    updated_request,
    review_proposal: saved_review_proposal,
    action_outcome,
  };
}

export function recordReviewProposalDecision(
  store: ProductActionStore,
  review_proposal_id: string,
  status: ProductReviewProposalStatus
): ProductReviewProposalRecord | null {
  return update_review_proposal_status(store, review_proposal_id, status);
}

export function createExternalDraftFromAction(
  context: ApplyBoundedActionContext,
  request: ProductActionRequestRecord,
  options: ApplyBoundedActionOptions = {}
): {
  updated_request: ProductActionRequestRecord | null;
  artifact: ProductArtifactRecord | null;
  action_outcome: ProductActionOutcomeRecord;
} {
  const artifact = create_external_draft_artifact_from_request(
    context,
    request,
    options
  );

  if (!artifact) {
    return {
      updated_request: update_action_request_status(
        context.action_store,
        request.action_request_id,
        "rejected"
      ),
      artifact: null,
      action_outcome: create_rejected_outcome(
        context,
        request,
        "External-draft request could not create a local draft artifact."
      ),
    };
  }

  const updated_request = update_action_request_status(
    context.action_store,
    request.action_request_id,
    "draft_created"
  );
  const action_outcome = save_action_outcome(
    context.action_store,
    create_action_outcome({
      request,
      outcome_kind: "external_draft_created",
      outcome_summary:
        "A local external-draft artifact was created. No dispatch occurred.",
      produced_artifact_refs: [artifact.artifact_id],
      produced_evidence_refs: [...artifact.source_evidence_refs],
    })
  );

  return { updated_request, artifact, action_outcome };
}

export function deferLimitedExternalDispatch(
  context: ApplyBoundedActionContext,
  request: ProductActionRequestRecord
): {
  updated_request: ProductActionRequestRecord | null;
  action_outcome: ProductActionOutcomeRecord;
} {
  const updated_request = update_action_request_status(
    context.action_store,
    request.action_request_id,
    "deferred_strong_confirmation"
  );
  const action_outcome = save_action_outcome(
    context.action_store,
    create_action_outcome({
      request,
      outcome_kind: "strong_confirmation_required",
      outcome_summary:
        "This action remains deferred and requires stronger confirmation in a later wave.",
      produced_evidence_refs: [...request.source_evidence_refs],
    })
  );

  return { updated_request, action_outcome };
}

export function blockForbiddenIrreversibleAction(
  context: ApplyBoundedActionContext,
  request: ProductActionRequestRecord
): {
  updated_request: ProductActionRequestRecord | null;
  action_outcome: ProductActionOutcomeRecord;
} {
  const updated_request = update_action_request_status(
    context.action_store,
    request.action_request_id,
    "blocked"
  );
  const action_outcome = save_action_outcome(
    context.action_store,
    create_action_outcome({
      request,
      outcome_kind: "irreversible_blocked",
      outcome_summary:
        "The irreversible action remains blocked and only a blocked evidence record was preserved.",
      produced_evidence_refs: unique_strings([
        ...request.source_evidence_refs,
        ...request.related_drift_refs,
        ...request.related_learning_refs,
      ]),
    })
  );

  return { updated_request, action_outcome };
}

export function applyBoundedAction(
  context: ApplyBoundedActionContext,
  request: ProductActionRequestRecord,
  options: ApplyBoundedActionOptions = {}
): {
  updated_request: ProductActionRequestRecord | null;
  action_outcome: ProductActionOutcomeRecord;
  artifact?: ProductArtifactRecord | null;
  review_proposal?: ProductReviewProposalRecord;
} {
  const policy = evaluateActionRequest(request);

  switch (policy.decision) {
    case "allowed_local": {
      if (request.action_kind === "acknowledge_drift") {
        const drift_impact_id = request.related_drift_refs[0];
        const acknowledged =
          context.learning_drift_store && drift_impact_id
            ? acknowledgeDriftImpact(
                context.learning_drift_store,
                drift_impact_id
              )
            : null;

        if (!acknowledged) {
          return {
            updated_request: update_action_request_status(
              context.action_store,
              request.action_request_id,
              "rejected"
            ),
            action_outcome: create_rejected_outcome(
              context,
              request,
              "Local drift acknowledgment could not be completed from the current references."
            ),
          };
        }

        return {
          updated_request: update_action_request_status(
            context.action_store,
            request.action_request_id,
            "completed_local"
          ),
          action_outcome: save_action_outcome(
            context.action_store,
            create_action_outcome({
              request,
              outcome_kind: "local_update_completed",
              outcome_summary:
                "A local drift acknowledgment was recorded without external side effects.",
              produced_evidence_refs: unique_strings([
                ...acknowledged.source_evidence_refs,
                acknowledged.drift_impact_id,
              ]),
            })
          ),
        };
      }

      const artifact =
        request.action_kind === "revise_artifact"
          ? revise_local_artifact_from_request(context, request, options)
          : create_local_artifact_from_request(context, request, options);

      if (!artifact) {
        return {
          updated_request: update_action_request_status(
            context.action_store,
            request.action_request_id,
            "rejected"
          ),
          action_outcome: create_rejected_outcome(
            context,
            request,
            "Local bounded action could not complete because the required local artifact state was unavailable."
          ),
          artifact: null,
        };
      }

      return {
        updated_request: update_action_request_status(
          context.action_store,
          request.action_request_id,
          "completed_local"
        ),
        action_outcome: save_action_outcome(
          context.action_store,
          create_action_outcome({
            request,
            outcome_kind: "local_update_completed",
            outcome_summary:
              "A local-only product update completed without provider or channel side effects.",
            produced_artifact_refs: [artifact.artifact_id],
            produced_evidence_refs: [...artifact.source_evidence_refs],
          })
        ),
        artifact,
      };
    }
    case "review_required": {
      const result = createReviewProposalFromAction(context, request, options);
      return {
        updated_request: result.updated_request,
        action_outcome: result.action_outcome,
        review_proposal: result.review_proposal,
      };
    }
    case "draft_only": {
      return createExternalDraftFromAction(context, request, options);
    }
    case "deferred_strong_confirmation": {
      return deferLimitedExternalDispatch(context, request);
    }
    case "blocked":
    default: {
      return blockForbiddenIrreversibleAction(context, request);
    }
  }
}

export function listProducedArtifactsByCell(
  store: ProductArtifactStore,
  cell_id: ProductArtifactCellId
): ProductArtifactRecord[] {
  return listArtifactsByCell(store, cell_id);
}

export type {
  ActionStoreOptions,
} from "./action-store.ts";
export type {
  ArtifactStoreOptions,
  LearningDriftStoreOptions,
};
