import type {
  V2OfficialStarterBlueprintId,
  V2StarterCellId,
  V2StarterCellKind,
} from "../fixtures/starter-cell-fixtures.ts";

export type SecretaryRoutingProposalScope = "secretary_routing_proposal";
export type SecretaryRoutingTargetKind =
  | "existing_cell"
  | "new_cell_proposal";
export type SecretaryRoutingConfidence = "high" | "medium" | "low";
export type SecretaryRoutingAmbiguity =
  | "none"
  | "multiple_domain_signals"
  | "insufficient_domain_signal";
export type SecretaryRoutingReviewPosture = "review_required";

export interface SecretaryRoutingInput {
  request_id: string;
  founder_request: string;
  created_at: string;
  requested_by?: string;
  available_cell_ids: readonly V2StarterCellId[];
}

export interface ExistingCellRoutingTarget {
  target_kind: "existing_cell";
  cell_id: V2StarterCellId;
  cell_label: string;
  starter_blueprint_id: V2OfficialStarterBlueprintId;
  cell_kind: V2StarterCellKind;
}

export interface NewCellProposalTarget {
  target_kind: "new_cell_proposal";
  proposed_cell_label: string;
  proposed_reason: string;
  starter_blueprint_id: null;
  cell_kind: V2StarterCellKind;
  requires_owner_confirmation: true;
  proposed_cell_created: false;
  proposed_cell_kind_created: false;
}

export type SecretaryRoutingTarget =
  | ExistingCellRoutingTarget
  | NewCellProposalTarget;

export interface SecretaryRoutingProposal {
  proposal_id: string;
  proposal_scope: SecretaryRoutingProposalScope;
  request_id: string;
  founder_request: string;
  requested_by?: string;
  recommended_target: SecretaryRoutingTarget;
  alternative_targets: readonly SecretaryRoutingTarget[];
  confidence: SecretaryRoutingConfidence;
  ambiguity: SecretaryRoutingAmbiguity;
  rationale: readonly string[];
  ambiguity_notes: readonly string[];
  evidence_gap_notes: readonly string[];
  review_posture: SecretaryRoutingReviewPosture;
  non_executing: true;
  no_dispatch: true;
  no_autonomous_execution: true;
  marketplace_not_involved: true;
  management_directive_created: false;
  cell_ceo_assembly_started: false;
  runtime_private_fields_omitted: true;
  product_projection_only: true;
  created_at: string;
}
