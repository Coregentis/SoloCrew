export const SOLOCREW_STRUCTURAL_CONTRACT_VERSION =
  "v0.2-structural-constitution" as const;

export const SOLOCREW_STRUCTURAL_OBJECT_TYPES = [
  "cell-charter",
  "delivery-contract",
  "cell-policy-profile",
  "ceo-orchestrator-contract",
  "crew-blueprint",
  "objective-portfolio",
  "execution-ledger",
  "memory-evidence-anchor",
  "business-pack-mount",
  "metrics-pack-mount",
] as const;

export type SoloCrewStructuralObjectType =
  (typeof SOLOCREW_STRUCTURAL_OBJECT_TYPES)[number];

export const SOLOCREW_MANAGEMENT_OBJECT_TYPES = [
  "management-directive",
  "cell-summary-card",
  "escalation-approval-request",
  "delivery-return",
] as const;

export type SoloCrewManagementObjectType =
  (typeof SOLOCREW_MANAGEMENT_OBJECT_TYPES)[number];

export type SoloCrewStructuralContractObjectType =
  | SoloCrewStructuralObjectType
  | SoloCrewManagementObjectType;

export type SoloCrewStructuralImplementationStatus =
  | "skeleton_only"
  | "deferred_mount";

export type SoloCrewStructuralAuthorityBoundary =
  | "product_projection_only"
  | "management_interface_only";

export type SoloCrewStructuralPhaseBoundary =
  | "compile_phase_only"
  | "compile_runtime_bridge"
  | "runtime_adjacent_summary"
  | "optional_mount";

export type SoloCrewUpwardAuthorityRule = "forbidden";

export interface StructuralContractEnvelope<
  TObjectType extends SoloCrewStructuralContractObjectType,
> {
  projection_id: string;
  object_type: TObjectType;
  contract_version: typeof SOLOCREW_STRUCTURAL_CONTRACT_VERSION;
  implementation_status: SoloCrewStructuralImplementationStatus;
  authority_boundary: SoloCrewStructuralAuthorityBoundary;
  phase_boundary: SoloCrewStructuralPhaseBoundary;
  upward_runtime_authority: SoloCrewUpwardAuthorityRule;
  upward_protocol_authority: SoloCrewUpwardAuthorityRule;
  projection_notes?: string[];
}
