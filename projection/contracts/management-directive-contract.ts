import type {
  ExistingCellRoutingTarget,
  SecretaryRoutingProposal,
} from "./secretary-routing-proposal-contract.ts";
import type {
  V2OfficialStarterBlueprintId,
  V2StarterCellId,
  V2StarterCellKind,
} from "../fixtures/starter-cell-fixtures.ts";

export type ManagementDirectiveStatus =
  | "draft_review_required"
  | "blocked_pending_routing_review";
export type ManagementDirectiveReviewPosture = "review_required";
export type ManagementDirectiveScope =
  "management_directive_product_projection";

export interface ManagementDirectiveInput {
  directive_id: string;
  source_proposal: SecretaryRoutingProposal;
  accepted_target_kind: "existing_cell";
  accepted_by?: string;
  created_at: string;
}

export interface ManagementDirectiveTarget {
  target_kind: "existing_cell";
  cell_id: V2StarterCellId;
  cell_label: string;
  starter_blueprint_id: V2OfficialStarterBlueprintId;
  cell_kind: V2StarterCellKind;
}

export interface ManagementDirectiveHandoffPreview {
  handoff_preview_id: string;
  target_cell_id: V2StarterCellId;
  target_cell_label: string;
  summary: string;
  directive_summary: string;
  constraints: readonly string[];
  evidence_gap_notes: readonly string[];
  next_review_step: string;
  cell_ceo_assembly_not_started: true;
}

export interface ManagementDirectiveBoundaryFlags {
  non_executing: true;
  no_dispatch: true;
  no_autonomous_execution: true;
  no_approval_execution: true;
  marketplace_not_involved: true;
  asset_installation_started: false;
  cell_ceo_assembly_started: false;
  provider_channel_dispatch_started: false;
  external_business_action_started: false;
  runtime_private_fields_omitted: true;
  product_projection_only: true;
  mplp_object: false;
  cognitive_os_runtime_law: false;
}

export interface ManagementDirective
  extends ManagementDirectiveBoundaryFlags {
  directive_id: string;
  directive_scope: ManagementDirectiveScope;
  source_proposal_id: string;
  source_request_id: string;
  founder_request: string;
  accepted_by?: string;
  status: ManagementDirectiveStatus;
  review_posture: ManagementDirectiveReviewPosture;
  target: ManagementDirectiveTarget;
  handoff_preview: ManagementDirectiveHandoffPreview;
  rationale: readonly string[];
  constraints: readonly string[];
  created_at: string;
}

export type AcceptedManagementDirectiveSourceProposal =
  SecretaryRoutingProposal & {
    recommended_target: ExistingCellRoutingTarget;
  };
