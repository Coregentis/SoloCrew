import {
  STARTER_CELL_DEFINITIONS,
  V2_STARTER_CELL_KIND,
  type V2OfficialStarterBlueprintId,
  type V2StarterCellId,
  type V2StarterCellKind,
} from "../fixtures/starter-cell-fixtures.ts";
import type {
  ExistingCellRoutingTarget,
  NewCellProposalTarget,
  SecretaryRoutingAmbiguity,
  SecretaryRoutingConfidence,
  SecretaryRoutingInput,
  SecretaryRoutingProposal,
  SecretaryRoutingTarget,
} from "../contracts/secretary-routing-proposal-contract.ts";

type IntentScore = {
  starter_blueprint_id: V2OfficialStarterBlueprintId;
  score: number;
  matched_terms: string[];
};

const SECRETARY_ROUTING_KEYWORDS: Record<
  V2OfficialStarterBlueprintId,
  readonly string[]
> = {
  development_company: [
    "software",
    "repo",
    "code",
    "release",
    "bug",
    "feature",
    "project",
    "engineering",
    "implementation",
    "architecture",
    "test",
    "ci",
    "github",
    "developer",
    "tracepilot",
    "governance",
  ],
  ecommerce: [
    "ecommerce",
    "e-commerce",
    "listing",
    "product",
    "shop",
    "customer",
    "campaign",
    "offer",
    "merchandising",
    "catalog",
    "price",
    "inventory",
    "store",
    "sku",
  ],
  personal_media: [
    "article",
    "content",
    "media",
    "post",
    "newsletter",
    "publishing",
    "title",
    "topic",
    "blog",
    "audience",
    "calendar",
    "editorial",
  ],
};

function normalized_request(founder_request: string): string {
  return founder_request.toLocaleLowerCase("en-US");
}

function score_terms(
  founder_request: string,
  starter_blueprint_id: V2OfficialStarterBlueprintId
): IntentScore {
  const normalized = normalized_request(founder_request);
  const matched_terms = SECRETARY_ROUTING_KEYWORDS[
    starter_blueprint_id
  ].filter((term) => normalized.includes(term));

  return {
    starter_blueprint_id,
    score: matched_terms.length,
    matched_terms,
  };
}

function definition_for(
  starter_blueprint_id: V2OfficialStarterBlueprintId
) {
  return STARTER_CELL_DEFINITIONS.find(
    (definition) =>
      definition.starter_blueprint_id === starter_blueprint_id
  );
}

function available_scores(
  input: SecretaryRoutingInput
): IntentScore[] {
  const available_ids = new Set(input.available_cell_ids);

  return STARTER_CELL_DEFINITIONS.filter((definition) =>
    available_ids.has(definition.cell_id)
  )
    .map((definition) =>
      score_terms(input.founder_request, definition.starter_blueprint_id)
    )
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return input.available_cell_ids.indexOf(left.starter_blueprint_id) -
        input.available_cell_ids.indexOf(right.starter_blueprint_id);
    });
}

function create_existing_cell_target(
  starter_blueprint_id: V2OfficialStarterBlueprintId
): ExistingCellRoutingTarget {
  const definition = definition_for(starter_blueprint_id);

  if (!definition) {
    throw new Error(
      `Unknown starter blueprint for Secretary routing: ${starter_blueprint_id}`
    );
  }

  return {
    target_kind: "existing_cell",
    cell_id: definition.cell_id,
    cell_label: definition.cell_label,
    starter_blueprint_id: definition.starter_blueprint_id,
    cell_kind: definition.cell_kind,
  };
}

function create_new_cell_proposal_target(
  founder_request: string,
  cell_kind: V2StarterCellKind = V2_STARTER_CELL_KIND
): NewCellProposalTarget {
  const trimmed_request = founder_request.trim();

  return {
    target_kind: "new_cell_proposal",
    proposed_cell_label: "New Cell review proposal",
    proposed_reason: trimmed_request
      ? `No current starter blueprint clearly owns: ${trimmed_request}`
      : "No founder request text was available for deterministic routing.",
    starter_blueprint_id: null,
    cell_kind,
    requires_owner_confirmation: true,
    proposed_cell_created: false,
    proposed_cell_kind_created: false,
  };
}

function positive_scores(scores: readonly IntentScore[]): IntentScore[] {
  return scores.filter((score) => score.score > 0);
}

function ambiguity_for(
  positive_matches: readonly IntentScore[],
  tied_top_matches: readonly IntentScore[]
): SecretaryRoutingAmbiguity {
  if (positive_matches.length === 0) {
    return "insufficient_domain_signal";
  }

  if (positive_matches.length > 1 || tied_top_matches.length > 1) {
    return "multiple_domain_signals";
  }

  return "none";
}

function confidence_for(
  positive_matches: readonly IntentScore[],
  tied_top_matches: readonly IntentScore[]
): SecretaryRoutingConfidence {
  if (positive_matches.length === 0 || tied_top_matches.length > 1) {
    return "low";
  }

  return positive_matches[0].score >= 2 ? "high" : "medium";
}

function build_rationale(
  recommended_target: SecretaryRoutingTarget,
  positive_matches: readonly IntentScore[]
): string[] {
  if (recommended_target.target_kind === "new_cell_proposal") {
    return [
      "Secretary could not find a clear existing Cell owner from current starter blueprint signals.",
      "Owner review is required before any new Cell is created or routed.",
    ];
  }

  const matched_score = positive_matches.find(
    (score) =>
      score.starter_blueprint_id === recommended_target.starter_blueprint_id
  );

  return [
    `Secretary matched founder request terms to ${recommended_target.cell_label}.`,
    `Matched starter blueprint terms: ${
      matched_score?.matched_terms.join(", ") ?? "none"
    }.`,
    "The recommendation is a product-level routing proposal only.",
  ];
}

function build_ambiguity_notes(
  positive_matches: readonly IntentScore[],
  tied_top_matches: readonly IntentScore[]
): string[] {
  if (positive_matches.length === 0) {
    return [
      "No starter blueprint received a positive deterministic keyword match.",
    ];
  }

  if (tied_top_matches.length > 1) {
    return [
      `Multiple Cell candidates tied for strongest signal: ${
        tied_top_matches
          .map((score) => score.starter_blueprint_id)
          .join(", ")
      }.`,
    ];
  }

  if (positive_matches.length > 1) {
    return [
      `Multiple Cell candidates matched the request: ${
        positive_matches
          .map((score) => score.starter_blueprint_id)
          .join(", ")
      }.`,
    ];
  }

  return [];
}

function build_evidence_gap_notes(
  recommended_target: SecretaryRoutingTarget
): string[] {
  if (recommended_target.target_kind === "new_cell_proposal") {
    return [
      "Secretary needs owner review before treating this as a new Cell proposal.",
      "No Management Directive is created in this implementation wave.",
    ];
  }

  return [
    "Routing remains review-only before activation.",
    "Cell-local asset selection remains outside Secretary Routing Proposal scope.",
  ];
}

export function listSecretaryRoutingTargets(
  available_cell_ids: readonly V2StarterCellId[]
): ExistingCellRoutingTarget[] {
  const available_ids = new Set(available_cell_ids);

  return STARTER_CELL_DEFINITIONS.filter((definition) =>
    available_ids.has(definition.cell_id)
  ).map((definition) =>
    create_existing_cell_target(definition.starter_blueprint_id)
  );
}

export function createNewCellProposalTarget(
  founder_request: string
): NewCellProposalTarget {
  return create_new_cell_proposal_target(founder_request);
}

export function classifySecretaryRoutingIntent(
  input: SecretaryRoutingInput
): {
  recommended_target: SecretaryRoutingTarget;
  alternative_targets: SecretaryRoutingTarget[];
  positive_matches: IntentScore[];
  tied_top_matches: IntentScore[];
} {
  const scores = available_scores(input);
  const matches = positive_scores(scores);
  const top_score = matches[0]?.score ?? 0;
  const tied_top_matches = matches.filter(
    (score) => score.score === top_score
  );

  if (matches.length === 0 || tied_top_matches.length > 1) {
    return {
      recommended_target: create_new_cell_proposal_target(
        input.founder_request
      ),
      alternative_targets: tied_top_matches.map((score) =>
        create_existing_cell_target(score.starter_blueprint_id)
      ),
      positive_matches: matches,
      tied_top_matches,
    };
  }

  return {
    recommended_target: create_existing_cell_target(
      matches[0].starter_blueprint_id
    ),
    alternative_targets: matches
      .slice(1)
      .map((score) =>
        create_existing_cell_target(score.starter_blueprint_id)
      ),
    positive_matches: matches,
    tied_top_matches,
  };
}

export function createSecretaryRoutingProposal(
  input: SecretaryRoutingInput
): SecretaryRoutingProposal {
  const {
    recommended_target,
    alternative_targets,
    positive_matches,
    tied_top_matches,
  } = classifySecretaryRoutingIntent(input);

  return {
    proposal_id: `${input.request_id}-secretary-routing-proposal`,
    proposal_scope: "secretary_routing_proposal",
    request_id: input.request_id,
    founder_request: input.founder_request,
    requested_by: input.requested_by,
    recommended_target,
    alternative_targets,
    confidence: confidence_for(positive_matches, tied_top_matches),
    ambiguity: ambiguity_for(positive_matches, tied_top_matches),
    rationale: build_rationale(recommended_target, positive_matches),
    ambiguity_notes: build_ambiguity_notes(
      positive_matches,
      tied_top_matches
    ),
    evidence_gap_notes: build_evidence_gap_notes(recommended_target),
    review_posture: "review_required",
    non_executing: true,
    no_dispatch: true,
    no_autonomous_execution: true,
    marketplace_not_involved: true,
    management_directive_created: false,
    cell_ceo_assembly_started: false,
    runtime_private_fields_omitted: true,
    product_projection_only: true,
    created_at: input.created_at,
  };
}
