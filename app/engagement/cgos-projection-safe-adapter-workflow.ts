import type {
  CommercialMode,
  EngagementStage,
} from "./engagement-canonical-contract.ts";
import type {
  EngagementLoopRun,
  EngagementLoopRunnerResult,
  EngagementLoopStep,
  EngagementLoopStepStatus,
} from "./engagement-loop-runner-contract.ts";
import {
  ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAGS,
} from "./engagement-loop-runner-contract.ts";
import type {
  EngagementSessionExportKind,
  EngagementSessionExportStatus,
  EngagementSessionHistoryStatus,
} from "./engagement-session-history-contract.ts";
import {
  ENGAGEMENT_SESSION_HISTORY_BOUNDARY_FLAGS,
} from "./engagement-session-history-contract.ts";
import type {
  EngagementLoopState,
  EngagementSession,
  EngagementSessionStatus,
  EngagementWorkspace,
  EngagementWorkspaceSourceMetadata,
} from "./engagement-workspace-contract.ts";
import {
  ENGAGEMENT_WORKSPACE_BOUNDARY_FLAGS,
  ENGAGEMENT_WORKSPACE_SOURCE_METADATA,
} from "./engagement-workspace-contract.ts";
import type {
  FounderReviewPacket,
  FounderReviewPacketDecisionKind,
  FounderReviewPacketSection,
  FounderReviewPacketStatus,
} from "./founder-review-packet-contract.ts";
import {
  FOUNDER_REVIEW_PACKET_BOUNDARY_FLAGS,
} from "./founder-review-packet-contract.ts";
import type {
  SoloCrewCgosAdapterCandidateSet,
  SoloCrewCgosBoundaryFlagName,
  SoloCrewCgosBoundaryTranslation,
  SoloCrewCgosEvidenceBundleKind,
  SoloCrewCgosProjectionSafeSource,
  SoloCrewCgosReviewLoopAdapterBoundaryFlags,
  SoloCrewCgosReviewLoopAdapterInput,
  SoloCrewCgosReviewLoopAdapterResult,
  SoloCrewCgosReviewLoopAdapterStatus,
  SoloCrewCgosReviewStepRef,
  SoloCrewCgosRuntimeBoundaryProfile,
} from "./cgos-projection-safe-adapter-contract.ts";
import {
  SOLOCREW_CGOS_ADAPTER_BOUNDARY_FLAGS,
} from "./cgos-projection-safe-adapter-contract.ts";

const DEFAULT_CREATED_AT = "2026-04-30T00:00:00.000Z";
const DEFAULT_STAGE: EngagementStage = "candidate";
const DEFAULT_COMMERCIAL_MODE: CommercialMode = "free_discovery";

const DEFAULT_CGOS_BOUNDARY_PROFILE: SoloCrewCgosRuntimeBoundaryProfile = {
  local_only: true,
  manual_first: true,
  review_only: true,
  deterministic: true,
  non_executing: true,
  runtime_private_payload_omitted: true,
  projection_safe: true,
  no_external_service: true,
  no_filesystem_write: true,
  no_database_storage: true,
  no_persistence_adapter: true,
  no_file_export_path: true,
  no_cloud_sync: true,
  no_provider_dispatch: true,
  no_channel_dispatch: true,
  no_marketplace: true,
  no_crm: true,
  no_email_dispatch: true,
  no_public_publishing: true,
  no_payment: true,
  no_llm_or_tool_invocation: true,
  no_autonomy: true,
  no_package_publish: true,
  no_certification_or_endorsement: true,
};

const BOUNDARY_FLAG_MAPPINGS: ReadonlyArray<{
  cgos_flag: string;
  solocrew_flag: SoloCrewCgosBoundaryFlagName;
}> = [
  { cgos_flag: "local_only", solocrew_flag: "local_only" },
  { cgos_flag: "manual_first", solocrew_flag: "manual_first" },
  { cgos_flag: "review_only", solocrew_flag: "review_only" },
  { cgos_flag: "deterministic", solocrew_flag: "deterministic" },
  { cgos_flag: "non_executing", solocrew_flag: "non_executing" },
  {
    cgos_flag: "runtime_private_payload_omitted",
    solocrew_flag: "runtime_private_fields_omitted",
  },
  { cgos_flag: "projection_safe", solocrew_flag: "projection_safe" },
  { cgos_flag: "no_external_service", solocrew_flag: "no_external_service" },
  { cgos_flag: "no_filesystem_write", solocrew_flag: "no_file_system_write" },
  { cgos_flag: "no_database_storage", solocrew_flag: "no_database_storage" },
  { cgos_flag: "no_persistence_adapter", solocrew_flag: "no_persistence_adapter" },
  { cgos_flag: "no_file_export_path", solocrew_flag: "no_file_export_path" },
  { cgos_flag: "no_cloud_sync", solocrew_flag: "no_cloud_sync" },
  { cgos_flag: "no_provider_dispatch", solocrew_flag: "no_provider_dispatch" },
  { cgos_flag: "no_channel_dispatch", solocrew_flag: "no_channel_dispatch" },
  { cgos_flag: "no_marketplace", solocrew_flag: "no_marketplace" },
  { cgos_flag: "no_crm", solocrew_flag: "no_crm" },
  { cgos_flag: "no_email_dispatch", solocrew_flag: "no_email_dispatch" },
  { cgos_flag: "no_public_publishing", solocrew_flag: "no_public_publishing" },
  { cgos_flag: "no_payment", solocrew_flag: "no_payment" },
  {
    cgos_flag: "no_llm_or_tool_invocation",
    solocrew_flag: "no_llm_or_tool_invocation",
  },
  { cgos_flag: "no_autonomy", solocrew_flag: "no_autonomy" },
  { cgos_flag: "no_package_publish", solocrew_flag: "no_package_publish" },
  {
    cgos_flag: "no_certification_or_endorsement",
    solocrew_flag: "no_mplp_certification_or_endorsement",
  },
];

type PartialAdapterInput =
  & Partial<Omit<SoloCrewCgosReviewLoopAdapterInput,
    | "cgos_workspace"
    | "cgos_session"
    | "cgos_loop_state"
    | "cgos_runner"
    | "cgos_review_packet"
    | "cgos_evidence_ledger"
    | "cgos_evidence_bundle">>
  & {
    cgos_workspace?: Partial<SoloCrewCgosReviewLoopAdapterInput["cgos_workspace"]>;
    cgos_session?: Partial<SoloCrewCgosReviewLoopAdapterInput["cgos_session"]>;
    cgos_loop_state?: Partial<SoloCrewCgosReviewLoopAdapterInput["cgos_loop_state"]>;
    cgos_runner?: Partial<SoloCrewCgosReviewLoopAdapterInput["cgos_runner"]>;
    cgos_review_packet?: Partial<
      SoloCrewCgosReviewLoopAdapterInput["cgos_review_packet"]
    >;
    cgos_evidence_ledger?: Partial<
      SoloCrewCgosReviewLoopAdapterInput["cgos_evidence_ledger"]
    >;
    cgos_evidence_bundle?: Partial<
      SoloCrewCgosReviewLoopAdapterInput["cgos_evidence_bundle"]
    >;
  };

function clone_sorted_strings(values: readonly string[] | undefined): string[] {
  return [...new Set(values ?? [])]
    .filter((value) => value.trim().length > 0)
    .sort();
}

function clone_review_steps(
  values: readonly SoloCrewCgosReviewStepRef[] | undefined
): SoloCrewCgosReviewStepRef[] {
  return [...(values ?? [])]
    .filter((step) => step.step_ref.trim().length > 0)
    .map((step) => ({
      step_ref: step.step_ref,
      status: step.status,
    }))
    .sort((a, b) => a.step_ref.localeCompare(b.step_ref));
}

function clone_boundary_profile(
  input: SoloCrewCgosRuntimeBoundaryProfile | undefined
): SoloCrewCgosRuntimeBoundaryProfile {
  return {
    ...DEFAULT_CGOS_BOUNDARY_PROFILE,
    ...(input ?? {}),
  };
}

function ref_or_default(value: string | undefined, fallback: string): string {
  return value === undefined ? fallback : value;
}

function is_missing_ref(value: string | undefined): boolean {
  return typeof value !== "string" || value.trim().length === 0;
}

function has_blocked_status(value: unknown): boolean {
  return value === "blocked";
}

function boundary_flags(): SoloCrewCgosReviewLoopAdapterBoundaryFlags {
  return { ...SOLOCREW_CGOS_ADAPTER_BOUNDARY_FLAGS };
}

function source_metadata(input: SoloCrewCgosReviewLoopAdapterInput):
  SoloCrewCgosProjectionSafeSource {
  const marker_refs = input.cgos_omission_markers
    .map((marker) => marker.marker)
    .filter((marker) => marker.length > 0)
    .sort();

  return {
    ...ENGAGEMENT_WORKSPACE_SOURCE_METADATA,
    contract_version: "cgos-projection-safe-adapter-contract-v0.1",
    schema_version: "cgos-projection-safe-adapter-v0.1",
    release_line: "cgos-projection-safe-additive-adapter",
    compatibility_profile: "v3.0-cgos-projection-safe-adapter-compatible",
    adapter_source_kind: "cgos_projection_safe_operator_review_loop",
    cgos_result_ref: input.cgos_result_ref,
    projection_safe_handoff_ref: input.cgos_projection_handoff_ref,
    cgos_omission_markers: marker_refs,
    cgos_evidence_refs: clone_sorted_strings(input.cgos_evidence_refs),
    cgos_version_refs: { ...input.cgos_version_refs },
    cgos_import_posture: "structural_projection_safe_input",
    runtime_private_fields_omitted: true,
    non_executing: true,
  } satisfies SoloCrewCgosProjectionSafeSource;
}

function has_blocked_posture(input: SoloCrewCgosReviewLoopAdapterInput): boolean {
  return [
    input.cgos_workspace.status,
    input.cgos_session.status,
    input.cgos_loop_state.status,
    input.cgos_runner.status,
    input.cgos_review_packet.status,
    input.cgos_evidence_ledger.status,
    input.cgos_evidence_bundle.status,
  ].some(has_blocked_status) ||
    input.cgos_loop_state.blocked_step_refs.length > 0 ||
    input.cgos_runner.step_refs.some((step) => step.status === "blocked");
}

function missing_required_refs(input: SoloCrewCgosReviewLoopAdapterInput): string[] {
  const required_refs: Array<[string, string | undefined]> = [
    ["cgos_result_ref", input.cgos_result_ref],
    ["cgos_projection_handoff_ref", input.cgos_projection_handoff_ref],
    ["cgos_workspace.workspace_id", input.cgos_workspace.workspace_id],
    ["cgos_workspace.state_snapshot_ref", input.cgos_workspace.state_snapshot_ref],
    ["cgos_workspace.projection_envelope_ref", input.cgos_workspace.projection_envelope_ref],
    ["cgos_session.session_id", input.cgos_session.session_id],
    ["cgos_session.workspace_ref", input.cgos_session.workspace_ref],
    ["cgos_session.review_loop_ref", input.cgos_session.review_loop_ref],
    ["cgos_session.projection_envelope_ref", input.cgos_session.projection_envelope_ref],
    ["cgos_loop_state.loop_state_id", input.cgos_loop_state.loop_state_id],
    ["cgos_loop_state.workspace_ref", input.cgos_loop_state.workspace_ref],
    ["cgos_loop_state.session_ref", input.cgos_loop_state.session_ref],
    ["cgos_loop_state.projection_envelope_ref", input.cgos_loop_state.projection_envelope_ref],
    ["cgos_runner.runner_id", input.cgos_runner.runner_id],
    ["cgos_runner.loop_state_ref", input.cgos_runner.loop_state_ref],
    ["cgos_runner.projection_envelope_ref", input.cgos_runner.projection_envelope_ref],
    ["cgos_review_packet.packet_id", input.cgos_review_packet.packet_id],
    ["cgos_review_packet.loop_state_ref", input.cgos_review_packet.loop_state_ref],
    ["cgos_review_packet.projection_envelope_ref", input.cgos_review_packet.projection_envelope_ref],
    ["cgos_evidence_ledger.ledger_id", input.cgos_evidence_ledger.ledger_id],
    ["cgos_evidence_ledger.session_ref", input.cgos_evidence_ledger.session_ref],
    ["cgos_evidence_ledger.latest_packet_ref", input.cgos_evidence_ledger.latest_packet_ref],
    ["cgos_evidence_ledger.latest_bundle_ref", input.cgos_evidence_ledger.latest_bundle_ref],
    ["cgos_evidence_ledger.projection_envelope_ref", input.cgos_evidence_ledger.projection_envelope_ref],
    ["cgos_evidence_bundle.bundle_id", input.cgos_evidence_bundle.bundle_id],
    ["cgos_evidence_bundle.ledger_ref", input.cgos_evidence_bundle.ledger_ref],
    ["cgos_evidence_bundle.packet_ref", input.cgos_evidence_bundle.packet_ref],
    ["cgos_evidence_bundle.summary", input.cgos_evidence_bundle.summary],
    ["cgos_evidence_bundle.projection_envelope_ref", input.cgos_evidence_bundle.projection_envelope_ref],
  ];
  const missing = required_refs
    .filter(([, value]) => is_missing_ref(value))
    .map(([field]) => field);

  if (input.cgos_workspace.session_refs.length === 0) {
    missing.push("cgos_workspace.session_refs");
  }

  if (input.cgos_runner.step_refs.length === 0) {
    missing.push("cgos_runner.step_refs");
  }

  if (input.cgos_review_packet.manual_decision_options.length === 0) {
    missing.push("cgos_review_packet.manual_decision_options");
  }

  if (input.cgos_evidence_ledger.entry_refs.length === 0) {
    missing.push("cgos_evidence_ledger.entry_refs");
  }

  if (input.cgos_evidence_bundle.evidence_refs.length === 0) {
    missing.push("cgos_evidence_bundle.evidence_refs");
  }

  if (input.cgos_evidence_refs.length === 0) {
    missing.push("cgos_evidence_refs");
  }

  if (input.cgos_omission_markers.length === 0) {
    missing.push("cgos_omission_markers");
  }

  return missing.sort();
}

function adapter_status(
  input: SoloCrewCgosReviewLoopAdapterInput
): SoloCrewCgosReviewLoopAdapterStatus {
  return missing_required_refs(input).length > 0 || has_blocked_posture(input)
    ? "blocked"
    : "adapter_ready";
}

function local_ref(value: string, fallback: string): string {
  return is_missing_ref(value) ? fallback : value;
}

function local_engagement_ref(workspace_id: string): string {
  return `${local_ref(workspace_id, "missing-cgos-workspace")}:engagement-candidate`;
}

function local_history_record_ref(workspace_id: string): string {
  return `${local_ref(workspace_id, "missing-cgos-workspace")}:adapter-history-record`;
}

function local_entry_ref(input: SoloCrewCgosReviewLoopAdapterInput): string {
  return input.cgos_evidence_ledger.entry_refs[0] ??
    `${local_ref(input.cgos_workspace.workspace_id, "missing-cgos-workspace")}:entry`;
}

function map_step_status(status: SoloCrewCgosReviewStepRef["status"]):
  EngagementLoopStepStatus {
  return status;
}

function map_bundle_kind(
  kind: SoloCrewCgosEvidenceBundleKind
): EngagementSessionExportKind {
  if (kind === "deterministic_summary_bundle") {
    return "deterministic_summary_object";
  }

  if (kind === "audit_snapshot_bundle") {
    return "audit_snapshot_object";
  }

  return "in_memory_export_object";
}

function map_decision_option(option: string): FounderReviewPacketDecisionKind {
  if (option === "continue_review") {
    return "continue_review";
  }

  if (option === "mark_blocked") {
    return "block_until_refs_fixed";
  }

  if (option === "request_more_context") {
    return "request_more_evidence";
  }

  if (option === "archive_without_action") {
    return "archive_without_action";
  }

  return "hold_for_operator_review";
}

function decision_options(input: SoloCrewCgosReviewLoopAdapterInput):
  FounderReviewPacketDecisionKind[] {
  return [...new Set(input.cgos_review_packet.manual_decision_options.map(
    map_decision_option
  ))].sort();
}

function create_runner_result(input: {
  adapter_input: SoloCrewCgosReviewLoopAdapterInput;
  metadata: EngagementWorkspaceSourceMetadata;
  blocked: boolean;
  engagement_ref: string;
}): EngagementLoopRunnerResult {
  const step_inputs = input.adapter_input.cgos_runner.step_refs.length > 0
    ? input.adapter_input.cgos_runner.step_refs
    : [{ step_ref: "missing-cgos-step", status: "blocked" as const }];
  const steps: EngagementLoopStep[] = step_inputs.map((step, index) => ({
    step_id: `${local_ref(
      input.adapter_input.cgos_runner.runner_id,
      "missing-cgos-runner"
    )}:${String(index + 1).padStart(2, "0")}:${step.step_ref}`,
    run_ref: local_ref(input.adapter_input.cgos_runner.runner_id, "missing-cgos-runner"),
    step_kind: step.status === "blocked" ? "blocked" : "evidence_reviewed",
    status: map_step_status(step.status),
    step_summary: step.status === "blocked"
      ? "CGOS-backed adapter step preserves blocked projection-safe posture."
      : "CGOS-backed adapter step preserves review-only projection-safe posture.",
    source_refs: {
      workspace_ref: local_ref(
        input.adapter_input.cgos_workspace.workspace_id,
        "missing-cgos-workspace"
      ),
      session_ref: local_ref(
        input.adapter_input.cgos_session.session_id,
        "missing-cgos-session"
      ),
      loop_state_ref: local_ref(
        input.adapter_input.cgos_loop_state.loop_state_id,
        "missing-cgos-loop-state"
      ),
      engagement_ref: input.engagement_ref,
      evidence_refs: clone_sorted_strings(input.adapter_input.cgos_evidence_refs),
    },
    reviewed_at: DEFAULT_CREATED_AT,
    boundary_flags: { ...ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAGS },
  }));
  const blocked_count = steps.filter((step) => step.status === "blocked").length;
  const reviewed_count = steps.filter((step) => step.status === "reviewed").length;
  const run: EngagementLoopRun = {
    run_id: local_ref(input.adapter_input.cgos_runner.runner_id, "missing-cgos-runner"),
    runner_id: local_ref(input.adapter_input.cgos_runner.runner_id, "missing-cgos-runner"),
    status: input.blocked || blocked_count > 0 ? "blocked" : "review_ready",
    workspace_ref: local_ref(
      input.adapter_input.cgos_workspace.workspace_id,
      "missing-cgos-workspace"
    ),
    session_ref: local_ref(
      input.adapter_input.cgos_session.session_id,
      "missing-cgos-session"
    ),
    engagement_ref: input.engagement_ref,
    current_stage: DEFAULT_STAGE,
    commercial_mode: DEFAULT_COMMERCIAL_MODE,
    step_refs: steps.map((step) => step.step_id),
    reviewed_step_count: reviewed_count,
    blocked_step_count: blocked_count,
    source_metadata: input.metadata,
    boundary_flags: { ...ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAGS },
  };

  return {
    result_id: `${run.run_id}:cgos-adapter-result`,
    run,
    steps,
    workspace_bundle_ref: run.workspace_ref,
    entry_surface_ref: local_entry_ref(input.adapter_input),
    result_summary: input.blocked || blocked_count > 0
      ? "CGOS-backed adapter loop candidate is blocked without execution."
      : "CGOS-backed adapter loop candidate is ready for local review.",
    boundary_flags: { ...ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAGS },
  };
}

function create_packet(input: {
  adapter_input: SoloCrewCgosReviewLoopAdapterInput;
  runner_result: EngagementLoopRunnerResult;
  metadata: EngagementWorkspaceSourceMetadata;
  blocked: boolean;
  engagement_ref: string;
}): FounderReviewPacket {
  const reviewed_step_refs = input.runner_result.steps
    .filter((step) => step.status === "reviewed")
    .map((step) => step.step_id);
  const blocked_step_refs = input.runner_result.steps
    .filter((step) => step.status === "blocked")
    .map((step) => step.step_id);
  const pending_step_refs = input.runner_result.steps
    .filter((step) => step.status === "pending" || step.status === "skipped")
    .map((step) => step.step_id);
  const section = (
    section_id: FounderReviewPacketSection["section_id"],
    title: string,
    summary: string,
    item_refs: string[],
    status: FounderReviewPacketSection["status"]
  ): FounderReviewPacketSection => ({
    section_id,
    title,
    summary,
    item_refs: clone_sorted_strings(item_refs),
    status,
    boundary_flags: { ...FOUNDER_REVIEW_PACKET_BOUNDARY_FLAGS },
  });
  const status: FounderReviewPacketStatus =
    input.blocked ? "blocked" : "ready_for_founder_review";

  return {
    packet_id: local_ref(
      input.adapter_input.cgos_review_packet.packet_id,
      "missing-cgos-packet"
    ),
    status,
    engagement_ref: input.engagement_ref,
    workspace_ref: input.runner_result.run.workspace_ref,
    session_ref: input.runner_result.run.session_ref,
    loop_run_ref: input.runner_result.run.run_id,
    current_stage: DEFAULT_STAGE,
    commercial_mode: DEFAULT_COMMERCIAL_MODE,
    sections: [
      section(
        "engagement_context",
        "Adapter engagement context",
        "SoloCrew-local context derived from CGOS projection-safe refs.",
        [input.engagement_ref],
        "ready"
      ),
      section(
        "loop_review_summary",
        "Adapter loop review summary",
        input.runner_result.result_summary,
        [input.runner_result.run.run_id],
        input.blocked ? "blocked" : "ready"
      ),
      section(
        "reviewed_steps",
        "Reviewed adapter steps",
        `${reviewed_step_refs.length} CGOS-backed step ref(s) reviewed.`,
        reviewed_step_refs,
        "ready"
      ),
      section(
        "blocked_items",
        "Blocked adapter items",
        blocked_step_refs.length > 0
          ? `${blocked_step_refs.length} CGOS-backed step ref(s) blocked.`
          : "No blocked CGOS-backed adapter step refs.",
        blocked_step_refs,
        blocked_step_refs.length > 0 ? "blocked" : "ready"
      ),
      section(
        "pending_items",
        "Pending adapter items",
        pending_step_refs.length > 0
          ? `${pending_step_refs.length} CGOS-backed step ref(s) pending or skipped.`
          : "No pending CGOS-backed adapter step refs.",
        pending_step_refs,
        pending_step_refs.length > 0 ? "pending" : "ready"
      ),
      section(
        "boundary_notice",
        "Adapter boundary notice",
        "Projection-safe adapter output is local, review-only, deterministic, and non-executing.",
        ["local_only", "review_only", "non_executing"],
        "notice"
      ),
    ],
    decision_options: decision_options(input.adapter_input),
    source_refs: {
      entry_surface_ref: local_entry_ref(input.adapter_input),
      workspace_ref: input.runner_result.run.workspace_ref,
      session_ref: input.runner_result.run.session_ref,
      loop_run_ref: input.runner_result.run.run_id,
      loop_step_refs: input.runner_result.steps.map((step) => step.step_id),
      engagement_ref: input.engagement_ref,
    },
    source_metadata: input.metadata,
    boundary_flags: { ...FOUNDER_REVIEW_PACKET_BOUNDARY_FLAGS },
  };
}

export function create_cgos_projection_safe_adapter_input(
  input: PartialAdapterInput = {}
): SoloCrewCgosReviewLoopAdapterInput {
  const cgos_projection_handoff_ref = ref_or_default(
    input.cgos_projection_handoff_ref,
    "cgos-operator-review-loop-handoff-01"
  );
  const cgos_boundary_profile = clone_boundary_profile(input.cgos_boundary_profile);
  const cgos_result_ref = ref_or_default(
    input.cgos_result_ref,
    "cgos-local-review-loop-result-01"
  );
  const workspace_id = ref_or_default(
    input.cgos_workspace?.workspace_id,
    "cgos-operator-workspace-01"
  );
  const session_id = ref_or_default(
    input.cgos_session?.session_id,
    "cgos-operator-session-01"
  );
  const loop_state_id = ref_or_default(
    input.cgos_loop_state?.loop_state_id,
    "cgos-review-loop-state-01"
  );
  const runner_id = ref_or_default(
    input.cgos_runner?.runner_id,
    "cgos-review-loop-runner-01"
  );
  const packet_id = ref_or_default(
    input.cgos_review_packet?.packet_id,
    "cgos-operator-review-packet-01"
  );
  const ledger_id = ref_or_default(
    input.cgos_evidence_ledger?.ledger_id,
    "cgos-session-evidence-ledger-01"
  );
  const bundle_id = ref_or_default(
    input.cgos_evidence_bundle?.bundle_id,
    "cgos-deterministic-evidence-bundle-01"
  );
  const evidence_refs = clone_sorted_strings(
    input.cgos_evidence_refs ?? ["cgos-safe-evidence-ref-01"]
  );
  const reviewed_step_refs = clone_sorted_strings(
    input.cgos_loop_state?.reviewed_step_refs ?? ["cgos-review-step-01"]
  );
  const blocked_step_refs = clone_sorted_strings(
    input.cgos_loop_state?.blocked_step_refs
  );
  const step_refs = clone_review_steps(
    input.cgos_runner?.step_refs ?? [{ step_ref: "cgos-review-step-01", status: "reviewed" }]
  );

  return {
    cgos_result_ref,
    cgos_projection_handoff_ref,
    cgos_boundary_profile,
    cgos_workspace: {
      workspace_id,
      status: input.cgos_workspace?.status ?? "active",
      session_refs: clone_sorted_strings(input.cgos_workspace?.session_refs ?? [session_id]),
      state_snapshot_ref: ref_or_default(
        input.cgos_workspace?.state_snapshot_ref,
        "cgos-state-snapshot-ref-01"
      ),
      evidence_refs: clone_sorted_strings(input.cgos_workspace?.evidence_refs ?? evidence_refs),
      boundary_profile: clone_boundary_profile(input.cgos_workspace?.boundary_profile),
      projection_envelope_ref: ref_or_default(
        input.cgos_workspace?.projection_envelope_ref,
        cgos_projection_handoff_ref
      ),
      runtime_private_fields_omitted: true,
      non_executing: true,
    },
    cgos_session: {
      session_id,
      status: input.cgos_session?.status ?? "review_ready",
      workspace_ref: ref_or_default(input.cgos_session?.workspace_ref, workspace_id),
      review_loop_ref: ref_or_default(input.cgos_session?.review_loop_ref, loop_state_id),
      evidence_refs: clone_sorted_strings(input.cgos_session?.evidence_refs ?? evidence_refs),
      boundary_profile: clone_boundary_profile(input.cgos_session?.boundary_profile),
      projection_envelope_ref: ref_or_default(
        input.cgos_session?.projection_envelope_ref,
        cgos_projection_handoff_ref
      ),
      runtime_private_fields_omitted: true,
      non_executing: true,
    },
    cgos_loop_state: {
      loop_state_id,
      status: input.cgos_loop_state?.status ??
        (blocked_step_refs.length > 0 ? "blocked" : "review_ready"),
      workspace_ref: ref_or_default(input.cgos_loop_state?.workspace_ref, workspace_id),
      session_ref: ref_or_default(input.cgos_loop_state?.session_ref, session_id),
      reviewed_step_refs,
      blocked_step_refs,
      evidence_refs: clone_sorted_strings(input.cgos_loop_state?.evidence_refs ?? evidence_refs),
      boundary_profile: clone_boundary_profile(input.cgos_loop_state?.boundary_profile),
      projection_envelope_ref: ref_or_default(
        input.cgos_loop_state?.projection_envelope_ref,
        cgos_projection_handoff_ref
      ),
      runtime_private_fields_omitted: true,
      non_executing: true,
    },
    cgos_runner: {
      runner_id,
      status: input.cgos_runner?.status ??
        (step_refs.some((step) => step.status === "blocked") ? "blocked" : "review_ready"),
      loop_state_ref: ref_or_default(input.cgos_runner?.loop_state_ref, loop_state_id),
      step_refs,
      boundary_profile: clone_boundary_profile(input.cgos_runner?.boundary_profile),
      projection_envelope_ref: ref_or_default(
        input.cgos_runner?.projection_envelope_ref,
        cgos_projection_handoff_ref
      ),
      runtime_private_fields_omitted: true,
      non_executing: true,
    },
    cgos_review_packet: {
      packet_id,
      status: input.cgos_review_packet?.status ??
        (blocked_step_refs.length > 0 ? "blocked" : "review_ready"),
      loop_state_ref: ref_or_default(input.cgos_review_packet?.loop_state_ref, loop_state_id),
      reviewed_step_refs: clone_sorted_strings(
        input.cgos_review_packet?.reviewed_step_refs ?? reviewed_step_refs
      ),
      blocked_step_refs: clone_sorted_strings(
        input.cgos_review_packet?.blocked_step_refs ?? blocked_step_refs
      ),
      manual_decision_options: clone_sorted_strings(
        input.cgos_review_packet?.manual_decision_options ??
          ["continue_review", "mark_blocked", "request_more_context"]
      ),
      evidence_refs: clone_sorted_strings(input.cgos_review_packet?.evidence_refs ?? evidence_refs),
      boundary_profile: clone_boundary_profile(input.cgos_review_packet?.boundary_profile),
      projection_envelope_ref: ref_or_default(
        input.cgos_review_packet?.projection_envelope_ref,
        cgos_projection_handoff_ref
      ),
      runtime_private_fields_omitted: true,
      non_executing: true,
    },
    cgos_evidence_ledger: {
      ledger_id,
      status: input.cgos_evidence_ledger?.status ?? "active",
      session_ref: ref_or_default(input.cgos_evidence_ledger?.session_ref, session_id),
      entry_refs: clone_sorted_strings(
        input.cgos_evidence_ledger?.entry_refs ?? ["cgos-operator-entry-surface-01"]
      ),
      latest_packet_ref: ref_or_default(
        input.cgos_evidence_ledger?.latest_packet_ref,
        packet_id
      ),
      latest_bundle_ref: ref_or_default(
        input.cgos_evidence_ledger?.latest_bundle_ref,
        bundle_id
      ),
      boundary_profile: clone_boundary_profile(input.cgos_evidence_ledger?.boundary_profile),
      projection_envelope_ref: ref_or_default(
        input.cgos_evidence_ledger?.projection_envelope_ref,
        cgos_projection_handoff_ref
      ),
      runtime_private_fields_omitted: true,
      non_executing: true,
    },
    cgos_evidence_bundle: {
      bundle_id,
      bundle_kind: input.cgos_evidence_bundle?.bundle_kind ??
        "in_memory_evidence_bundle",
      status: input.cgos_evidence_bundle?.status ?? "review_ready",
      ledger_ref: ref_or_default(input.cgos_evidence_bundle?.ledger_ref, ledger_id),
      packet_ref: ref_or_default(input.cgos_evidence_bundle?.packet_ref, packet_id),
      evidence_refs: clone_sorted_strings(
        input.cgos_evidence_bundle?.evidence_refs ?? evidence_refs
      ),
      summary: ref_or_default(
        input.cgos_evidence_bundle?.summary,
        "Projection-safe CGOS evidence bundle summary for local adapter review."
      ),
      boundary_profile: clone_boundary_profile(input.cgos_evidence_bundle?.boundary_profile),
      projection_envelope_ref: ref_or_default(
        input.cgos_evidence_bundle?.projection_envelope_ref,
        cgos_projection_handoff_ref
      ),
      runtime_private_fields_omitted: true,
      non_executing: true,
    },
    cgos_omission_markers: [...(input.cgos_omission_markers ?? [{
      marker: "cgos_operator_review_loop_uses_safe_refs_only",
      reason: "Structural adapter input omits runtime-private payload.",
    }])].map((marker) => ({ ...marker })).sort((a, b) =>
      a.marker.localeCompare(b.marker)
    ),
    cgos_evidence_refs: evidence_refs,
    cgos_version_refs: { ...(input.cgos_version_refs ?? {
      runtime_version_ref: "cgos-operator-review-loop-contract-16d559a",
    }) },
  };
}

export function translate_cgos_runtime_boundary_profile(
  input: SoloCrewCgosRuntimeBoundaryProfile
): SoloCrewCgosBoundaryTranslation {
  const mapping_by_cgos_flag = new Map(
    BOUNDARY_FLAG_MAPPINGS.map((mapping) => [mapping.cgos_flag, mapping])
  );
  const direct_mappings = BOUNDARY_FLAG_MAPPINGS
    .filter((mapping) => input[mapping.cgos_flag] === true)
    .sort((a, b) => a.cgos_flag.localeCompare(b.cgos_flag));
  const missing_or_non_true_cgos_flags = BOUNDARY_FLAG_MAPPINGS
    .filter((mapping) => input[mapping.cgos_flag] !== true)
    .map((mapping) => mapping.cgos_flag)
    .sort();
  const unmatched_cgos_flags = Object.entries(input)
    .filter(([flag, value]) =>
      value === true &&
      !mapping_by_cgos_flag.has(flag) &&
      (flag.startsWith("no_") || flag.endsWith("_omitted"))
    )
    .map(([flag]) => flag)
    .sort();
  const preserved_unmatched_cgos_flags = Object.fromEntries(
    unmatched_cgos_flags.map((flag) => [flag, true])
  ) as Record<string, true>;

  return {
    translated_flags: boundary_flags(),
    direct_mappings,
    unmatched_cgos_flags,
    preserved_unmatched_cgos_flags,
    missing_or_non_true_cgos_flags,
    boundary_notes: [
      "CGOS projection-safe boundary flags are translated into SoloCrew adapter boundary flags.",
      "Unmatched CGOS no-claim flags are preserved as adapter boundary notes.",
      missing_or_non_true_cgos_flags.length > 0
        ? "Some expected CGOS boundary flags were missing or not true; SoloCrew adapter output remains locally bounded."
        : "All expected CGOS boundary flags were present as true.",
    ],
  };
}

export function create_cgos_adapter_candidate_set(
  input: SoloCrewCgosReviewLoopAdapterInput
): SoloCrewCgosAdapterCandidateSet {
  const blocked = adapter_status(input) === "blocked";
  const metadata = source_metadata(input);
  const workspace_id = local_ref(input.cgos_workspace.workspace_id, "missing-cgos-workspace");
  const session_id = local_ref(input.cgos_session.session_id, "missing-cgos-session");
  const loop_state_id = local_ref(input.cgos_loop_state.loop_state_id, "missing-cgos-loop-state");
  const engagement_ref = local_engagement_ref(workspace_id);
  const history_record_ref = local_history_record_ref(workspace_id);
  const session_status: EngagementSessionStatus = blocked ? "blocked" : "review_ready";
  const workspace: EngagementWorkspace = {
    workspace_id,
    engagement_ref,
    participant_refs: ["cgos-adapter-operator"],
    current_stage: DEFAULT_STAGE,
    commercial_mode: DEFAULT_COMMERCIAL_MODE,
    loop_state_ref: loop_state_id,
    history_refs: [history_record_ref],
    source_metadata: metadata,
    boundary_flags: { ...ENGAGEMENT_WORKSPACE_BOUNDARY_FLAGS },
  };
  const session: EngagementSession = {
    session_id,
    workspace_ref: workspace_id,
    operator_ref: "cgos-adapter-operator",
    started_at: DEFAULT_CREATED_AT,
    status: session_status,
    current_stage: DEFAULT_STAGE,
    source_metadata: metadata,
    boundary_flags: { ...ENGAGEMENT_WORKSPACE_BOUNDARY_FLAGS },
  };
  const loop_state: EngagementLoopState = {
    loop_state_id,
    engagement_ref,
    stage: DEFAULT_STAGE,
    readiness_ref: input.cgos_workspace.state_snapshot_ref,
    onboarding_packet_ref: input.cgos_projection_handoff_ref,
    evidence_refs: clone_sorted_strings([
      ...input.cgos_loop_state.evidence_refs,
      ...input.cgos_evidence_refs,
    ]),
    review_gate_refs: clone_sorted_strings([
      ...input.cgos_loop_state.reviewed_step_refs,
      ...input.cgos_loop_state.blocked_step_refs,
    ]),
    outcome_review_ref: input.cgos_review_packet.packet_id,
    support_burden_ref: input.cgos_evidence_bundle.bundle_id,
    boundary_flags: { ...ENGAGEMENT_WORKSPACE_BOUNDARY_FLAGS },
  };
  const runner_result = create_runner_result({
    adapter_input: input,
    metadata,
    blocked,
    engagement_ref,
  });
  const packet = create_packet({
    adapter_input: input,
    runner_result,
    metadata,
    blocked,
    engagement_ref,
  });
  const history_status: EngagementSessionHistoryStatus =
    blocked ? "blocked" : "export_ready";
  const export_status: EngagementSessionExportStatus =
    blocked ? "blocked" : "ready_for_local_review";
  const ledger = {
    ledger_id: local_ref(input.cgos_evidence_ledger.ledger_id, "missing-cgos-ledger"),
    status: history_status,
    workspace_ref: workspace_id,
    session_ref: session_id,
    engagement_ref,
    entry_refs: clone_sorted_strings(input.cgos_evidence_ledger.entry_refs),
    latest_packet_ref: packet.packet_id,
    latest_loop_run_ref: runner_result.run.run_id,
    source_metadata: metadata,
    boundary_flags: { ...ENGAGEMENT_SESSION_HISTORY_BOUNDARY_FLAGS },
  };
  const export_package = {
    export_id: local_ref(input.cgos_evidence_bundle.bundle_id, "missing-cgos-bundle"),
    export_kind: map_bundle_kind(input.cgos_evidence_bundle.bundle_kind),
    status: export_status,
    ledger_ref: ledger.ledger_id,
    workspace_ref: workspace_id,
    session_ref: session_id,
    engagement_ref,
    packet_ref: packet.packet_id,
    loop_run_ref: runner_result.run.run_id,
    history_entry_refs: clone_sorted_strings(ledger.entry_refs),
    export_summary: input.cgos_evidence_bundle.summary,
    source_refs: {
      entry_surface_ref: local_entry_ref(input),
      workspace_ref: workspace_id,
      session_ref: session_id,
      engagement_ref,
      packet_ref: packet.packet_id,
      loop_run_ref: runner_result.run.run_id,
      loop_step_refs: runner_result.steps.map((step) => step.step_id),
    },
    source_metadata: metadata,
    boundary_flags: { ...ENGAGEMENT_SESSION_HISTORY_BOUNDARY_FLAGS },
  };

  return {
    engagement_workspace_candidate: workspace,
    engagement_session_candidate: session,
    engagement_loop_state_candidate: loop_state,
    engagement_loop_runner_candidate: runner_result,
    founder_review_packet_candidate: packet,
    engagement_history_ledger_candidate: ledger,
    engagement_session_export_package_candidate: export_package,
  };
}

export function summarize_solocrew_cgos_adapter_result(input: {
  status: SoloCrewCgosReviewLoopAdapterStatus;
  cgos_result_ref: string;
  missing_required_refs?: readonly string[];
}): string {
  if (input.status === "blocked") {
    return `CGOS projection-safe adapter result blocked for ${input.cgos_result_ref}; missing or blocked refs: ${(input.missing_required_refs ?? []).join(", ") || "blocked posture preserved"}.`;
  }

  return `CGOS projection-safe adapter result ready for ${input.cgos_result_ref}; local V3.0 path remains unchanged.`;
}

export function create_solocrew_cgos_review_loop_adapter_result(
  input: PartialAdapterInput = {}
): SoloCrewCgosReviewLoopAdapterResult {
  const adapter_input = create_cgos_projection_safe_adapter_input(input);
  const status = adapter_status(adapter_input);
  const candidates = create_cgos_adapter_candidate_set(adapter_input);
  const boundary_translation = translate_cgos_runtime_boundary_profile(
    adapter_input.cgos_boundary_profile
  );
  const missing_refs = missing_required_refs(adapter_input);

  return {
    adapter_result_id: `${local_ref(
      adapter_input.cgos_result_ref,
      "missing-cgos-result"
    )}:solocrew-adapter-result`,
    status,
    cgos_result_ref: adapter_input.cgos_result_ref,
    projection_safe_handoff_ref: adapter_input.cgos_projection_handoff_ref,
    ...candidates,
    boundary_flags: boundary_flags(),
    boundary_translation,
    source_metadata: source_metadata(adapter_input),
    adapter_summary: summarize_solocrew_cgos_adapter_result({
      status,
      cgos_result_ref: adapter_input.cgos_result_ref,
      missing_required_refs: missing_refs,
    }),
  };
}
