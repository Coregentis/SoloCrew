import type {
  ProjectionUpstreamRef,
} from "./projection-object-types.ts";
import type {
  SecretaryHandoffPacketState,
} from "./secretary-handoff-packet-contract.ts";

export type SecretaryHandoffRationaleScope =
  | "portfolio_secretary_lane_rationale"
  | "secretary_handoff_staging_rationale"
  | "secretary_handoff_review_packet_rationale";

export interface SecretaryHandoffRationaleEvidenceProjection {
  rationale_scope: SecretaryHandoffRationaleScope;
  authority_boundary: "product_projection_only";
  visibility_mode: "rationale_and_evidence_only";
  control_mode: "non_executing";
  packet_state?: SecretaryHandoffPacketState;
  rationale_summary: string;
  state_reason_summary: string;
  evidence_summary: string;
  provenance_summary: string;
  known_facts: string[];
  omission_notes: string[];
  source_hints: string[];
  upstream_refs: ProjectionUpstreamRef[];
  direct_controls_available: false;
  runtime_authority_claimed: false;
  protocol_authority_claimed: false;
}
