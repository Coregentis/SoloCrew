import type {
  SingleCellOperatorInSessionDraftCompletenessStatus,
  SingleCellOperatorInSessionDraftEmptinessState,
} from "./single-cell-operator-in-session-draft-state-contract.ts";
import type {
  SingleCellOperatorRequestPreviewabilityStatus,
  SingleCellOperatorRequestReviewabilityStatus,
} from "./single-cell-operator-request-review-submit-preview-contract.ts";
import type { RuntimeSessionMode } from "./create-runtime-session.ts";

export type SingleCellOperatorSessionDraftControlsAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellOperatorSessionDraftControlsPhaseBoundary =
  "operator_session_draft_controls_scaffold";
export type SingleCellOperatorSessionDraftControlsExecutionBoundary =
  "control_scaffold_only";
export type SingleCellOperatorSessionDraftControlId =
  | "keep_draft_hint"
  | "clear_draft_hint"
  | "promote_to_request_preview_hint";
export type SingleCellOperatorSessionDraftControlAvailability =
  | "available_now"
  | "available_as_seed_hint"
  | "blocked_missing_operator_input"
  | "not_needed_now";
export type SingleCellOperatorSessionDraftControlSourceSurface =
  | "in_session_draft_state"
  | "request_review_submit_preview"
  | "truth_boundary";

export interface SingleCellOperatorSessionDraftControlHint {
  control_id: SingleCellOperatorSessionDraftControlId;
  display_label: string;
  availability_status: SingleCellOperatorSessionDraftControlAvailability;
  source_surface: SingleCellOperatorSessionDraftControlSourceSurface;
  notes: string[];
}

export interface SingleCellOperatorSessionDraftCompletenessHint {
  draft_emptiness_state: SingleCellOperatorInSessionDraftEmptinessState;
  draft_completeness_status:
    SingleCellOperatorInSessionDraftCompletenessStatus;
  any_draft_value_present: boolean;
  operator_authored_draft_present: boolean;
  request_reviewability_status:
    SingleCellOperatorRequestReviewabilityStatus;
  request_previewability_status:
    SingleCellOperatorRequestPreviewabilityStatus;
  future_submit_dependency_count: number;
  future_submit_dependencies: string[];
  notes: string[];
}

export interface SingleCellOperatorSessionDraftControlUnavailableSurface {
  surface_id: string;
  display_label: string;
  reason: string;
}

export interface SingleCellOperatorSessionDraftControlsScaffold {
  scaffold_id: string;
  scaffold_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellOperatorSessionDraftControlsAuthorityBoundary;
  phase_boundary: SingleCellOperatorSessionDraftControlsPhaseBoundary;
  execution_boundary: SingleCellOperatorSessionDraftControlsExecutionBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  runtime_mode: RuntimeSessionMode;
  keep_draft_hint: SingleCellOperatorSessionDraftControlHint;
  clear_draft_hint: SingleCellOperatorSessionDraftControlHint;
  promote_to_request_preview_hint:
    SingleCellOperatorSessionDraftControlHint;
  draft_completeness_hint: SingleCellOperatorSessionDraftCompletenessHint;
  unavailable_control_surfaces:
    SingleCellOperatorSessionDraftControlUnavailableSurface[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
