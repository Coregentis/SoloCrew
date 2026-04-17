import type {
  SoloCrewPackMountModelState,
} from "../contracts/pack-mount-model-contract.ts";
import type {
  SoloCrewCrossPlanePlatformCoherenceState,
} from "../contracts/platform-coherence-contract.ts";
import type {
  SoloCrewPlatformDeliveryReadinessCapabilitySummary,
  SoloCrewPlatformDeliveryReadinessState,
} from "../contracts/platform-delivery-readiness-contract.ts";
import type {
  SingleCellStructuralAssemblyPackage,
} from "../contracts/single-cell-assembly-contract.ts";

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export function assemblePlatformDeliveryReadinessState(input: {
  assembly: SingleCellStructuralAssemblyPackage;
  optional_mount_state: SoloCrewPackMountModelState;
  platform_coherence_state: SoloCrewCrossPlanePlatformCoherenceState;
  continuity_note: string;
}): SoloCrewPlatformDeliveryReadinessState {
  const {
    assembly,
    optional_mount_state,
    platform_coherence_state,
    continuity_note,
  } = input;

  const present_capabilities: SoloCrewPlatformDeliveryReadinessCapabilitySummary[] =
    [
      {
        capability_key: "single_cell_operating_core",
        capability_status: "present_in_bounded_form",
        summary:
          "Single-cell operating core is present in bounded form through the sealed operator console lane, delivery contract truth, and current continuity-backed operator read.",
        supporting_signals: [
          "bounded_operator_console_lane",
          "delivery_contract_truth",
          "current_objective_summary",
          "continuity_backed_operator_read",
        ],
        non_claims: [
          "no_execution_cockpit",
          "no_runtime_complete_product_state",
        ],
      },
      {
        capability_key: "bounded_pack_mount_model",
        capability_status: "present_in_bounded_form",
        summary:
          "Business-pack and metrics-pack mounts are now coherent as structural-only optional mounts with explicit bounded availability and non-executing posture.",
        supporting_signals: [
          optional_mount_state.structural_availability,
          optional_mount_state.execution_boundary,
          ...optional_mount_state.business_pack_mounts.map(
            (mount) => mount.posture_summary
          ),
          ...optional_mount_state.metrics_pack_mounts.map(
            (mount) => mount.posture_summary
          ),
        ],
        non_claims: [
          "no_pack_execution_behavior",
          "no_mount_triggered_actions",
        ],
      },
      {
        capability_key: "cross_plane_platform_coherence",
        capability_status: "present_in_bounded_form",
        summary: platform_coherence_state.cross_plane_summary,
        supporting_signals: [
          ...platform_coherence_state.present_plane_keys,
          platform_coherence_state.platform_readiness_posture,
        ],
        non_claims: [
          ...platform_coherence_state.non_claims,
        ],
      },
      {
        capability_key: "bounded_explanatory_beta_lane",
        capability_status: "present_in_bounded_form",
        summary:
          "The bounded portfolio and Secretary explanatory beta lane is already present elsewhere in current SoloCrew truth and remains downstream, explanatory, and non-executing.",
        supporting_signals: [
          "portfolio_secretary_wave_1_to_5",
          "handoff_review_packet_lane",
          "rationale_evidence_visibility",
        ],
        non_claims: [
          "no_direct_control_semantics",
          "no_workflow_engine_behavior",
        ],
      },
      {
        capability_key: "memory_evidence_continuity_posture",
        capability_status: "present_in_bounded_form",
        summary:
          "Memory and evidence continuity remains present in bounded form through continuity anchors, known absences, and explicit continuity notes rather than a full evidence graph.",
        supporting_signals: [
          ...assembly.compile_input_seed.memory_evidence_state.continuity_sources,
          continuity_note,
          ...assembly.compile_input_seed.memory_evidence_state.known_absences,
        ],
        non_claims: [
          "no_full_evidence_graph",
          "no_runtime_memory_authority",
        ],
      },
    ];

  const deferred_capabilities: SoloCrewPlatformDeliveryReadinessCapabilitySummary[] =
    [
      {
        capability_key: "runtime_dependent_downstream_truth_hardening",
        capability_status: "deferred_for_later_gate",
        summary:
          "Stronger downstream confirm, trace, and evidence-linked delivery truth still depends on upstream Cognitive_OS truth and therefore remains a separately gated next blocker rather than a local readiness claim.",
        supporting_signals: [
          "bounded_confirm_trace_consumption_only",
          "upstream_truth_dependency",
          "separate_gate_required",
        ],
        non_claims: [
          "no_local_runtime_law_invention",
          "no_upstream_workflow_state_adoption",
        ],
      },
      {
        capability_key: "formal_v1_delivery_gate",
        capability_status: "deferred_for_later_gate",
        summary:
          "Formal v1.0 delivery cannot be claimed until the remaining runtime-dependent hardening lands and a separate closure gate confirms the final platform read.",
        supporting_signals: [
          "formal_delivery_gate_not_run",
          "v1_claim_not_authorized",
        ],
        non_claims: [
          "no_formal_v1_delivery_claim",
          "no_readiness_triggered_actions",
        ],
      },
    ];

  return {
    readiness_state_id: `${assembly.assembly_id}-platform-delivery-readiness`,
    readiness_scope: "single_cell_only",
    authority_boundary: "product_projection_only",
    summary_mode: "platform_summary_and_delivery_readiness",
    execution_boundary: "non_executing",
    platform_posture:
      platform_coherence_state.platform_readiness_posture,
    delivery_readiness_status: "planning_ready_not_delivery_ready",
    formal_delivery_ready_now: false,
    current_readiness_blocker:
      "runtime_dependent_downstream_truth_hardening",
    current_blocker_summary:
      "Current platform truth is now planning-ready in bounded form, but formal delivery is still blocked by separately gated runtime-dependent downstream truth hardening and the later v1.0 closure gate.",
    summary_text:
      "Platform summary now gives one bounded pre-delivery read across single-cell core, pack mounts, cross-plane coherence, explanatory beta surfaces, and memory/evidence continuity without upgrading SoloCrew into execution authority.",
    omission_summary:
      "Current readiness remains bounded: runtime-dependent downstream truth hardening, formal v1.0 closure, broad KPI cockpit behavior, direct control semantics, runtime-complete product state, and protocol-facing execution law remain outside this layer.",
    present_capabilities,
    deferred_capabilities,
    deferred_items: unique_items([
      ...assembly.deferred_items,
      "runtime_dependent_downstream_truth_hardening",
      "formal_v1_delivery_gate",
      "broad_kpi_cockpit",
      "direct_control_semantics",
      "runtime_complete_product_state",
    ]),
    non_claims: [
      "no_readiness_triggered_actions",
      "no_execution_cockpit_upgrade",
      "no_runtime_authority_claim",
      "no_protocol_authority_claim",
      "no_formal_v1_delivery_claim",
      "no_direct_control_semantics",
    ],
  };
}
