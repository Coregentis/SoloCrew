import assert from "node:assert/strict";
import fs from "node:fs";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  loadActionStore,
  restoreActionStore,
} from "../../app/actions/action-store.ts";
import {
  applyBoundedAction,
  createActionRequest,
  createExternalDraftFromAction,
  createReviewProposalFromAction,
  deferLimitedExternalDispatch,
  evaluateActionRequest,
  listActionOutcomesByCell,
  listActionRequestsByCell,
  listReviewProposalsByCell,
  recordReviewProposalDecision,
  blockForbiddenIrreversibleAction,
} from "../../app/actions/action-workflow.ts";
import {
  loadArtifactStore,
} from "../../app/artifacts/artifact-store.ts";
import {
  getArtifact,
  listArtifactsByCell,
} from "../../app/artifacts/artifact-workflow.ts";
import {
  loadLearningDriftStore,
} from "../../app/learning/learning-drift-store.ts";
import {
  captureDriftSignal,
  createDriftImpactFromSignal,
  listDriftImpactsByCell,
} from "../../app/learning/drift-workflow.ts";
import {
  createCellOperationsPanelProductPageModel,
} from "../../app/shell/create-cell-operations-panel-product-page-model.ts";
import {
  STARTER_CELL_IDS,
  createStarterCellsRuntimeStateProjection,
} from "../../projection/fixtures/starter-cell-fixtures.ts";

function create_temp_paths() {
  const root = mkdtempSync(join(tmpdir(), "solocrew-action-workflow-"));
  return {
    root,
    action_path: join(root, "actions.json"),
    artifact_path: join(root, "artifacts.json"),
    learning_path: join(root, "learning-drift.json"),
    cleanup() {
      rmSync(root, { recursive: true, force: true });
    },
  };
}

function read_file(relative_path: string): string {
  return fs.readFileSync(
    new URL(`../../${relative_path}`, import.meta.url),
    "utf8"
  );
}

test("[app] createActionRequest creates request linked to Cell and evidence", () => {
  const temp = create_temp_paths();

  try {
    const store = loadActionStore({ storage_path: temp.action_path });
    const request = createActionRequest(store, {
      cell_id: "development_company",
      action_class: "auto_local",
      action_kind: "create_artifact",
      title: "Create bounded implementation plan",
      intent_summary: "Capture the next implementation plan as a local artifact.",
      related_task_refs: ["task-dev-01"],
      source_evidence_refs: ["evidence-dev-01"],
    });

    assert.equal(request.cell_id, "development_company");
    assert.equal(request.status, "requested");
    assert.ok(request.action_request_id.includes("development_company"));
    assert.deepEqual(request.source_evidence_refs, ["evidence-dev-01"]);
  } finally {
    temp.cleanup();
  }
});

test("[app] evaluateActionRequest maps the five bounded action classes deterministically", () => {
  const store = loadActionStore({ storage_path: join(tmpdir(), "ignore-actions.json") });
  const requests = [
    createActionRequest(store, {
      cell_id: "development_company",
      action_class: "auto_local",
      action_kind: "create_artifact",
      title: "A0",
      intent_summary: "Local artifact update.",
    }),
    createActionRequest(store, {
      cell_id: "development_company",
      action_class: "reviewable_local",
      action_kind: "create_review_proposal",
      title: "A1",
      intent_summary: "Local review proposal.",
    }),
    createActionRequest(store, {
      cell_id: "ecommerce",
      action_class: "external_draft",
      action_kind: "create_external_draft",
      title: "A2",
      intent_summary: "Create a local draft only.",
    }),
    createActionRequest(store, {
      cell_id: "ecommerce",
      action_class: "limited_external_dispatch",
      action_kind: "defer_external_dispatch",
      title: "A3",
      intent_summary: "Defer external handoff.",
    }),
    createActionRequest(store, {
      cell_id: "personal_media",
      action_class: "forbidden_irreversible",
      action_kind: "block_irreversible",
      title: "A4",
      intent_summary: "Block irreversible change.",
    }),
  ];

  assert.equal(evaluateActionRequest(requests[0]!).decision, "allowed_local");
  assert.equal(evaluateActionRequest(requests[1]!).decision, "review_required");
  assert.equal(evaluateActionRequest(requests[2]!).decision, "draft_only");
  assert.equal(
    evaluateActionRequest(requests[3]!).decision,
    "deferred_strong_confirmation"
  );
  assert.equal(evaluateActionRequest(requests[4]!).decision, "blocked");
});

test("[app] A0 auto_local creates a local-only artifact outcome", () => {
  const temp = create_temp_paths();

  try {
    const action_store = loadActionStore({ storage_path: temp.action_path });
    const artifact_store = loadArtifactStore({ storage_path: temp.artifact_path });
    const request = createActionRequest(action_store, {
      cell_id: "development_company",
      action_class: "auto_local",
      action_kind: "create_artifact",
      title: "Create bounded implementation plan",
      intent_summary: "Capture a bounded implementation plan as a local artifact.",
      related_task_refs: ["task-dev-01"],
      source_evidence_refs: ["evidence-dev-01"],
    });
    const result = applyBoundedAction(
      { action_store, artifact_store },
      request,
      { artifact_title: "Development implementation plan" }
    );

    assert.equal(result.updated_request?.status, "completed_local");
    assert.equal(result.action_outcome.outcome_kind, "local_update_completed");
    assert.equal(result.artifact?.artifact_class, "local_generated");
    assert.equal(result.artifact?.cell_id, "development_company");
    assert.equal(result.action_outcome.produced_artifact_refs.length, 1);
    assert.equal(result.action_outcome.provider_execution_available, false);
  } finally {
    temp.cleanup();
  }
});

test("[app] A1 reviewable_local creates a review proposal and does not apply automatically", () => {
  const temp = create_temp_paths();

  try {
    const action_store = loadActionStore({ storage_path: temp.action_path });
    const artifact_store = loadArtifactStore({ storage_path: temp.artifact_path });
    const request = createActionRequest(action_store, {
      cell_id: "ecommerce",
      action_class: "reviewable_local",
      action_kind: "create_review_proposal",
      title: "Create listing refinement proposal",
      intent_summary: "Propose a local refinement before any later application.",
      source_evidence_refs: ["proposal-evidence-01"],
    });
    const result = createReviewProposalFromAction(
      { action_store, artifact_store },
      request,
      {
        review_proposal_summary:
          "The listing refinement remains local and pending review.",
      }
    );

    assert.equal(result.updated_request?.status, "review_required");
    assert.equal(result.review_proposal.status, "pending_review");
    assert.equal(result.action_outcome.outcome_kind, "review_proposal_created");
    assert.equal(listArtifactsByCell(artifact_store, "ecommerce").length, 0);

    const accepted = recordReviewProposalDecision(
      action_store,
      result.review_proposal.review_proposal_id,
      "accepted_for_local_application"
    );
    assert.equal(accepted?.status, "accepted_for_local_application");
  } finally {
    temp.cleanup();
  }
});

test("[app] A2 external_draft creates a local external-draft artifact and does not dispatch", () => {
  const temp = create_temp_paths();

  try {
    const action_store = loadActionStore({ storage_path: temp.action_path });
    const artifact_store = loadArtifactStore({ storage_path: temp.artifact_path });
    const request = createActionRequest(action_store, {
      cell_id: "personal_media",
      action_class: "external_draft",
      action_kind: "create_external_draft",
      title: "Create reflective article draft",
      intent_summary: "Create a draft-only article artifact for later review.",
      source_evidence_refs: ["article-evidence-01"],
    });
    const result = createExternalDraftFromAction(
      { action_store, artifact_store },
      request
    );

    assert.equal(result.updated_request?.status, "draft_created");
    assert.equal(result.artifact?.artifact_class, "external_draft");
    assert.equal(result.artifact?.status, "draft");
    assert.equal(result.action_outcome.outcome_kind, "external_draft_created");
    assert.equal(result.artifact?.external_dispatch_available, false);
    assert.doesNotMatch(JSON.stringify(result), /dispatched/i);
  } finally {
    temp.cleanup();
  }
});

test("[app] A3 limited_external_dispatch remains deferred only and does not dispatch", () => {
  const temp = create_temp_paths();

  try {
    const action_store = loadActionStore({ storage_path: temp.action_path });
    const request = createActionRequest(action_store, {
      cell_id: "ecommerce",
      action_class: "limited_external_dispatch",
      action_kind: "defer_external_dispatch",
      title: "Defer channel handoff",
      intent_summary: "Keep this handoff deferred until a later strong-confirmation wave.",
      source_evidence_refs: ["handoff-evidence-01"],
    });
    const result = deferLimitedExternalDispatch({ action_store }, request);

    assert.equal(result.updated_request?.status, "deferred_strong_confirmation");
    assert.equal(result.action_outcome.outcome_kind, "strong_confirmation_required");
    assert.equal(result.action_outcome.external_dispatch_available, false);
    assert.match(result.action_outcome.outcome_summary, /deferred/i);
  } finally {
    temp.cleanup();
  }
});

test("[app] A4 forbidden_irreversible remains blocked and does not change business state", () => {
  const temp = create_temp_paths();

  try {
    const action_store = loadActionStore({ storage_path: temp.action_path });
    const artifact_store = loadArtifactStore({ storage_path: temp.artifact_path });
    const learning_store = loadLearningDriftStore({ storage_path: temp.learning_path });
    const request = createActionRequest(action_store, {
      cell_id: "development_company",
      action_class: "forbidden_irreversible",
      action_kind: "block_irreversible",
      title: "Block irreversible action",
      intent_summary: "Do not permit irreversible business state change.",
      related_learning_refs: ["learning-ref-01"],
      related_drift_refs: ["drift-ref-01"],
      source_evidence_refs: ["block-evidence-01"],
    });
    const result = blockForbiddenIrreversibleAction(
      { action_store, artifact_store, learning_drift_store: learning_store },
      request
    );

    assert.equal(result.updated_request?.status, "blocked");
    assert.equal(result.action_outcome.outcome_kind, "irreversible_blocked");
    assert.equal(listArtifactsByCell(artifact_store, "development_company").length, 0);
    assert.equal(listActionOutcomesByCell(action_store, "development_company").length, 1);
    assert.equal(listDriftImpactsByCell(learning_store, "development_company").length, 0);
  } finally {
    temp.cleanup();
  }
});

test("[app] action requests outcomes and review proposals survive reload and restart", () => {
  const temp = create_temp_paths();

  try {
    const first_action_store = loadActionStore({ storage_path: temp.action_path });
    const first_artifact_store = loadArtifactStore({ storage_path: temp.artifact_path });
    const first_learning_store = loadLearningDriftStore({
      storage_path: temp.learning_path,
    });
    const draft_request = createActionRequest(first_action_store, {
      cell_id: "development_company",
      action_class: "auto_local",
      action_kind: "create_artifact",
      title: "Create local plan",
      intent_summary: "Persist a local implementation plan.",
    });
    applyBoundedAction(
      {
        action_store: first_action_store,
        artifact_store: first_artifact_store,
      },
      draft_request
    );
    const review_request = createActionRequest(first_action_store, {
      cell_id: "development_company",
      action_class: "reviewable_local",
      action_kind: "create_review_proposal",
      title: "Create review proposal",
      intent_summary: "Prepare a local review proposal.",
    });
    createReviewProposalFromAction(
      {
        action_store: first_action_store,
        artifact_store: first_artifact_store,
      },
      review_request
    );
    const drift_signal = captureDriftSignal(first_learning_store, {
      cell_id: "development_company",
      drift_kind: "scope_conflict",
      change_summary: "Two bounded tasks now conflict at the current scope.",
    });
    const drift_impact = createDriftImpactFromSignal(first_learning_store, {
      drift_signal,
      affected_task_refs: ["task-dev-01"],
    });
    const acknowledge_request = createActionRequest(first_action_store, {
      cell_id: "development_company",
      action_class: "auto_local",
      action_kind: "acknowledge_drift",
      title: "Acknowledge drift",
      intent_summary: "Acknowledge the local drift impact.",
      related_drift_refs: [drift_impact.drift_impact_id],
    });
    applyBoundedAction(
      {
        action_store: first_action_store,
        learning_drift_store: first_learning_store,
      },
      acknowledge_request
    );
    first_action_store.close();

    const reloaded_action_store = restoreActionStore({
      storage_path: temp.action_path,
    });

    assert.equal(
      listActionRequestsByCell(reloaded_action_store, "development_company").length,
      3
    );
    assert.equal(
      listActionOutcomesByCell(reloaded_action_store, "development_company").length,
      3
    );
    assert.equal(
      listReviewProposalsByCell(reloaded_action_store, "development_company").length,
      1
    );
  } finally {
    temp.cleanup();
  }
});

test("[app] Cell Operations Panel consumes persisted action records and keeps fixture fallback when absent", () => {
  const temp = create_temp_paths();

  try {
    const action_store = loadActionStore({ storage_path: temp.action_path });
    const artifact_store = loadArtifactStore({ storage_path: temp.artifact_path });
    const request = createActionRequest(action_store, {
      cell_id: "development_company",
      action_class: "auto_local",
      action_kind: "create_artifact",
      title: "Create local plan",
      intent_summary: "Persist a local implementation plan.",
      related_task_refs: ["task-dev-01"],
    });
    applyBoundedAction({ action_store, artifact_store }, request);

    const runtime_state_projection = createStarterCellsRuntimeStateProjection();
    const persisted_panel = createCellOperationsPanelProductPageModel(
      runtime_state_projection,
      {
        target_cell_id: "development_company",
        persisted_action_requests: listActionRequestsByCell(
          action_store,
          "development_company"
        ),
        persisted_action_outcomes: listActionOutcomesByCell(
          action_store,
          "development_company"
        ),
        persisted_review_proposals: listReviewProposalsByCell(
          action_store,
          "development_company"
        ),
      }
    );
    const fallback_panel = createCellOperationsPanelProductPageModel(
      runtime_state_projection,
      { target_cell_id: "development_company" }
    );

    assert.equal(persisted_panel.action_section.items[0]?.status, "completed_local");
    assert.match(
      persisted_panel.action_section.items[0]?.readiness_summary ?? "",
      /local-only/i
    );
    assert.notEqual(
      persisted_panel.action_section.items[0]?.action_id,
      fallback_panel.action_section.items[0]?.action_id
    );
    assert.equal(fallback_panel.action_section.items[0]?.status, undefined);
  } finally {
    temp.cleanup();
  }
});

test("[app] action workflow stays deterministic and uses canonical starter-cell fixture imports", () => {
  const temp = create_temp_paths();

  try {
    const action_store = loadActionStore({ storage_path: temp.action_path });
    const first = createActionRequest(action_store, {
      cell_id: "personal_media",
      action_class: "external_draft",
      action_kind: "create_external_draft",
      title: "Create article draft",
      intent_summary: "Create a local article draft for later review.",
    });
    const second = createActionRequest(action_store, {
      cell_id: "personal_media",
      action_class: "external_draft",
      action_kind: "create_external_draft",
      title: "Create article draft",
      intent_summary: "Create a local article draft for later review.",
    });

    assert.deepEqual(first, second);

    const page_model_source = read_file(
      "app/shell/create-action-workflow-page-model.ts"
    );

    assert.match(page_model_source, /starter-cell-fixtures\.ts/);
    assert.doesNotMatch(page_model_source, /v2-starter-cells/);
  } finally {
    temp.cleanup();
  }
});
