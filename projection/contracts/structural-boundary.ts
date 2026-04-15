import type {
  SoloCrewStructuralAuthorityBoundary,
  SoloCrewStructuralContractObjectType,
  SoloCrewStructuralPhaseBoundary,
} from "./structural-object-types.ts";

export type SoloCrewStructuralContractFamily =
  | "cell_constitution"
  | "management_interface";

export type SoloCrewStructuralRequiredness =
  | "required"
  | "optional_mount";

export type SoloCrewStructuralRuntimeDraftSignal =
  | "product_only_for_now"
  | "runtime_family_draft_likely"
  | "optional_mount_only";

export interface SoloCrewStructuralBoundaryEntry {
  object_type: SoloCrewStructuralContractObjectType;
  constitutional_family: SoloCrewStructuralContractFamily;
  requiredness: SoloCrewStructuralRequiredness;
  authority_boundary: SoloCrewStructuralAuthorityBoundary;
  phase_boundary: SoloCrewStructuralPhaseBoundary;
  runtime_draft_signal: SoloCrewStructuralRuntimeDraftSignal;
  notes: string;
}

export const SOLOCREW_COMPILE_ONLY_OBJECT_TYPES = [
  "cell-charter",
  "delivery-contract",
  "cell-policy-profile",
  "ceo-orchestrator-contract",
  "crew-blueprint",
  "management-directive",
] as const;

export const SOLOCREW_COMPILE_RUNTIME_BRIDGE_OBJECT_TYPES = [
  "objective-portfolio",
  "memory-evidence-anchor",
] as const;

export const SOLOCREW_RUNTIME_ADJACENT_OBJECT_TYPES = [
  "execution-ledger",
  "cell-summary-card",
  "escalation-approval-request",
  "delivery-return",
] as const;

export const SOLOCREW_OPTIONAL_MOUNT_OBJECT_TYPES = [
  "business-pack-mount",
  "metrics-pack-mount",
] as const;

export const SOLOCREW_CREW_COMPILER_INPUT_OBJECT_TYPES = [
  "management-directive",
  "cell-charter",
  "delivery-contract",
  "cell-policy-profile",
  "ceo-orchestrator-contract",
  "crew-blueprint",
  "objective-portfolio",
  "memory-evidence-anchor",
] as const;

export const SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS = [
  "authority_class",
  "primary_layer",
  "memory_layer",
  "protocol_binding_ref",
  "runtime_substrate_hint",
  "runtime_substrate_note",
  "schema_ref",
] as const;

export const SOLOCREW_STRUCTURAL_BOUNDARY: readonly SoloCrewStructuralBoundaryEntry[] =
  [
    {
      object_type: "cell-charter",
      constitutional_family: "cell_constitution",
      requiredness: "required",
      authority_boundary: "product_projection_only",
      phase_boundary: "compile_phase_only",
      runtime_draft_signal: "product_only_for_now",
      notes:
        "Cell Charter remains a product constitutional object and does not become runtime law by default.",
    },
    {
      object_type: "delivery-contract",
      constitutional_family: "cell_constitution",
      requiredness: "required",
      authority_boundary: "product_projection_only",
      phase_boundary: "compile_phase_only",
      runtime_draft_signal: "product_only_for_now",
      notes:
        "Delivery Contract defines the cell-facing delivery promise and must not be confused with runtime execution events.",
    },
    {
      object_type: "cell-policy-profile",
      constitutional_family: "cell_constitution",
      requiredness: "required",
      authority_boundary: "product_projection_only",
      phase_boundary: "compile_phase_only",
      runtime_draft_signal: "product_only_for_now",
      notes:
        "Cell Policy Profile stays product-side for now even though later runtime policy surfaces may become relevant.",
    },
    {
      object_type: "ceo-orchestrator-contract",
      constitutional_family: "cell_constitution",
      requiredness: "required",
      authority_boundary: "product_projection_only",
      phase_boundary: "compile_phase_only",
      runtime_draft_signal: "runtime_family_draft_likely",
      notes:
        "CEO Orchestrator Contract defines Crew Compiler posture downstream without claiming a runtime compiler already exists.",
    },
    {
      object_type: "crew-blueprint",
      constitutional_family: "cell_constitution",
      requiredness: "required",
      authority_boundary: "product_projection_only",
      phase_boundary: "compile_phase_only",
      runtime_draft_signal: "runtime_family_draft_likely",
      notes:
        "Crew Blueprint is a structural design object first and only later a candidate for runtime-backed topology support.",
    },
    {
      object_type: "objective-portfolio",
      constitutional_family: "cell_constitution",
      requiredness: "required",
      authority_boundary: "product_projection_only",
      phase_boundary: "compile_runtime_bridge",
      runtime_draft_signal: "runtime_family_draft_likely",
      notes:
        "Objective Portfolio stays product-owned now while bridging compile intent and later runtime scoping pressure.",
    },
    {
      object_type: "execution-ledger",
      constitutional_family: "cell_constitution",
      requiredness: "required",
      authority_boundary: "product_projection_only",
      phase_boundary: "runtime_adjacent_summary",
      runtime_draft_signal: "runtime_family_draft_likely",
      notes:
        "Execution Ledger is the product-side durable execution truth requirement, not an event timeline or full runtime ledger.",
    },
    {
      object_type: "memory-evidence-anchor",
      constitutional_family: "cell_constitution",
      requiredness: "required",
      authority_boundary: "product_projection_only",
      phase_boundary: "compile_runtime_bridge",
      runtime_draft_signal: "runtime_family_draft_likely",
      notes:
        "Memory & Evidence Anchor stays bounded to current continuity truth and does not claim a full evidence graph.",
    },
    {
      object_type: "business-pack-mount",
      constitutional_family: "cell_constitution",
      requiredness: "optional_mount",
      authority_boundary: "product_projection_only",
      phase_boundary: "optional_mount",
      runtime_draft_signal: "optional_mount_only",
      notes:
        "Business Pack Mount is an optional product-side mount point and not a business-pack runtime implementation.",
    },
    {
      object_type: "metrics-pack-mount",
      constitutional_family: "cell_constitution",
      requiredness: "optional_mount",
      authority_boundary: "product_projection_only",
      phase_boundary: "optional_mount",
      runtime_draft_signal: "optional_mount_only",
      notes:
        "Metrics Pack Mount is an optional product-side mount point and not a KPI cockpit or metrics runtime.",
    },
    {
      object_type: "management-directive",
      constitutional_family: "management_interface",
      requiredness: "required",
      authority_boundary: "management_interface_only",
      phase_boundary: "compile_phase_only",
      runtime_draft_signal: "product_only_for_now",
      notes:
        "Management Directive is a top-down product object, not a runtime task envelope and not protocol law.",
    },
    {
      object_type: "cell-summary-card",
      constitutional_family: "management_interface",
      requiredness: "required",
      authority_boundary: "management_interface_only",
      phase_boundary: "runtime_adjacent_summary",
      runtime_draft_signal: "product_only_for_now",
      notes:
        "Cell Summary Card is a management-facing projection object and not a runtime summary capability by itself.",
    },
    {
      object_type: "escalation-approval-request",
      constitutional_family: "management_interface",
      requiredness: "required",
      authority_boundary: "management_interface_only",
      phase_boundary: "runtime_adjacent_summary",
      runtime_draft_signal: "product_only_for_now",
      notes:
        "Escalation / Approval Request stays product-side until repeated cross-runtime evidence justifies anything stronger.",
    },
    {
      object_type: "delivery-return",
      constitutional_family: "management_interface",
      requiredness: "required",
      authority_boundary: "management_interface_only",
      phase_boundary: "runtime_adjacent_summary",
      runtime_draft_signal: "product_only_for_now",
      notes:
        "Delivery Return packages cell outcomes upward without becoming a runtime event stream or protocol envelope.",
    },
  ] as const;
