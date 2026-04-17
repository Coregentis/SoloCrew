import type {
  SoloCrewCrossPlanePlatformCoherenceState,
} from "../contracts/platform-coherence-contract.ts";
import type {
  SingleCellStructuralAssemblyPackage,
} from "../contracts/single-cell-assembly-contract.ts";
import type {
  SoloCrewRuntimeDependentDownstreamTruthState,
} from "../contracts/runtime-dependent-downstream-truth-contract.ts";

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export function assembleRuntimeDependentDownstreamTruthState(input: {
  assembly: SingleCellStructuralAssemblyPackage;
  platform_coherence_state: SoloCrewCrossPlanePlatformCoherenceState;
  continuity_note: string;
}): SoloCrewRuntimeDependentDownstreamTruthState {
  const {
    assembly,
    platform_coherence_state,
    continuity_note,
  } = input;
  const {
    constitution_state,
    initial_cell_summary_seed,
    compile_input_seed,
  } = assembly;

  const continuity_sources =
    constitution_state.memory_evidence_anchor.continuity_sources;
  const known_absences =
    compile_input_seed.memory_evidence_state.known_absences;
  const {
    active_work_count,
    blocked_work_count,
    near_term_execution_pressure,
  } = compile_input_seed.objective_context;

  return {
    truth_state_id:
      `${assembly.assembly_id}-runtime-dependent-downstream-truth`,
    truth_scope: "single_cell_only",
    authority_boundary: "product_projection_only",
    interpretation_mode:
      "runtime_dependent_downstream_truth_hardening",
    execution_boundary: "non_executing",
    truth_status: "bounded_upstream_supported_interpretation",
    confirm_visibility_status: "supported_in_current_upstream_truth",
    trace_visibility_status: "supported_in_current_upstream_truth",
    evidence_visibility_status: "bounded_and_omission_aware",
    context_export_status:
      "explicitly_unavailable_in_current_upstream_truth",
    plan_export_status:
      "explicitly_unavailable_in_current_upstream_truth",
    upstream_workflow_truth_status: "not_adopted_upstream",
    summary_text:
      "Current downstream delivery truth can now lean on the upstream-bounded Confirm and Trace posture already sealed in Cognitive_OS Phase 4, while SoloCrew remains explanatory only and does not claim delivery authority.",
    confirm_linked_summary:
      `Confirm-linked visibility is now lawfully stronger downstream because current upstream truth authorizes bounded Confirm export where confirm semantics exist, but SoloCrew still does not convert confirm presence into delivery authorization for ${constitution_state.cell_charter.cell_name}.`,
    trace_linked_summary:
      "Trace-linked visibility is now lawfully stronger downstream because current upstream truth authorizes bounded Trace export and explicit omission handling, but SoloCrew still does not own trace records or reinterpret them as local workflow law.",
    evidence_linked_summary:
      `Evidence-linked delivery interpretation remains bounded to continuity anchors, current review posture, active/blocked work counts, and explicit known absences for ${constitution_state.cell_charter.cell_name}, not to a full runtime evidence graph.`,
    delivery_interpretation_summary:
      `Current delivery interpretation stays omission-aware: review posture is ${constitution_state.delivery_contract.review_posture}, delivery posture is ${initial_cell_summary_seed.cell_summary_card.delivery_posture}, and execution-adjacent pressure remains ${near_term_execution_pressure} with ${active_work_count} active and ${blocked_work_count} blocked work items.`,
    supported_upstream_truths: [
      "bounded Confirm export is available where upstream confirm semantics exist",
      "bounded Trace export is available where frozen binding and export truth allow it",
      "Context omission is explicit when canonical reconstruction is not lawful",
      "Plan omission is explicit when canonical reconstruction is not lawful",
      "upstream workflow-truth decision still keeps packet and delivery workflow states out of Cognitive_OS law",
    ],
    bounded_truths: [
      `platform posture remains ${platform_coherence_state.platform_readiness_posture}`,
      `review posture remains ${constitution_state.delivery_contract.review_posture}`,
      `delivery posture remains ${initial_cell_summary_seed.cell_summary_card.delivery_posture}`,
      `continuity remains bounded to ${continuity_sources.join(", ")}`,
      `continuity note remains ${continuity_note}`,
    ],
    unavailable_truths: [
      "canonical MPLP Context reconstruction is not available for local downstream backfill",
      "canonical MPLP Plan reconstruction is not available for local downstream backfill",
      "upstream runtime-owned packet or delivery workflow states are not available",
      "full evidence-graph reconstruction is not available",
    ],
    omission_notes: unique_items([
      "SoloCrew consumes stronger confirm and trace posture downstream only where current upstream truth already supports it.",
      "SoloCrew does not locally invent Context or Plan truth when Cognitive_OS explicitly omits them.",
      "SoloCrew does not treat stronger evidence-linked interpretation as delivery authorization or execution ownership.",
      "SoloCrew does not adopt packet or delivery workflow states upward because those semantics remain not adopted in Cognitive_OS.",
      ...known_absences.map(
        (absence) =>
          `Known absence carried forward: ${absence}`
      ),
    ]),
    non_claims: [
      "no_local_workflow_law_invention",
      "no_runtime_owned_delivery_state_claim",
      "no_protocol_reinterpretation_inside_solocrew",
      "no_confirm_as_delivery_authorization",
      "no_trace_as_execution_authorization",
      "no_context_plan_backfill",
    ],
  };
}
