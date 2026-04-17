import type {
  ProjectionUpstreamRef,
} from "./projection-object-types.ts";
import type {
  SecretaryHandoffManagementPosture,
  SecretaryHandoffStagingTruthSource,
  SecretaryHandoffTargetSelection,
} from "./secretary-handoff-staging-contract.ts";
import type {
  SecretaryHandoffPacketState,
  SecretaryHandoffStageIndicator,
} from "./secretary-handoff-packet-contract.ts";
import type {
  SecretaryHandoffRationaleEvidenceProjection,
} from "./secretary-handoff-rationale-contract.ts";

export type SecretaryHandoffReviewPacketScope =
  "secretary_handoff_review_packet";
export type SecretaryHandoffReviewPacketAuthorityBoundary =
  "product_projection_only";
export type SecretaryHandoffReviewPacketPhaseBoundary = "beta_review_packet";
export type SecretaryHandoffReviewPacketSourceMode =
  "secretary_handoff_staging_projection";
export type SecretaryHandoffReviewReadinessLabel =
  | "draft_only"
  | "staged_context_only"
  | "cell_review_ready"
  | "revision_requested";
export type SecretaryHandoffReviewPacketTruthSource =
  | SecretaryHandoffStagingTruthSource
  | "secretary_handoff_staging_projection";

export interface SecretaryHandoffReviewReadiness {
  visualization_scope: "bounded_cell_review_readiness";
  readiness_label: SecretaryHandoffReviewReadinessLabel;
  readiness_summary: string;
  target_delivery_posture?: SecretaryHandoffTargetSelection["target_delivery_posture"];
  target_active_work_count?: number;
  target_blocked_work_count?: number;
}

export interface SecretaryHandoffReviewPacketProjection {
  secretary_handoff_review_packet_id: string;
  source_handoff_staging_id: string;
  source_portfolio_secretary_projection_id: string;
  projection_scope: SecretaryHandoffReviewPacketScope;
  authority_boundary: SecretaryHandoffReviewPacketAuthorityBoundary;
  phase_boundary: SecretaryHandoffReviewPacketPhaseBoundary;
  source_mode: SecretaryHandoffReviewPacketSourceMode;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  secretary_behavior_available: true;
  portfolio_dispatch_behavior_available: false;
  direct_approve_control_available: false;
  direct_reject_control_available: false;
  direct_dispatch_control_available: false;
  direct_execute_control_available: false;
  provider_execution_available: false;
  channel_entry_available: false;
  workflow_engine_behavior_available: false;
  runtime_complete_orchestration_available: false;
  handoff_creation_available: true;
  review_packet_kind: "product_review_packet_only";
  review_packet_is_runtime_law: false;
  packet_state: SecretaryHandoffPacketState;
  packet_states: SecretaryHandoffStageIndicator[];
  target_selection: SecretaryHandoffTargetSelection;
  packet_summary: string;
  packet_rationale: string;
  packet_context_framing: string;
  packet_state_summary: string;
  revision_loop_summary: string;
  management_and_review_posture: SecretaryHandoffManagementPosture;
  review_readiness: SecretaryHandoffReviewReadiness;
  rationale_evidence: SecretaryHandoffRationaleEvidenceProjection;
  non_executing_notice: string;
  truth_sources: SecretaryHandoffReviewPacketTruthSource[];
  upstream_refs: ProjectionUpstreamRef[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
