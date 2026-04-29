import type {
  CommercialMode,
  EngagementStage,
} from "./engagement-canonical-contract.ts";
import {
  COMMERCIAL_MODE_VALUES,
  ENGAGEMENT_STAGE_VALUES,
} from "./engagement-canonical-contract.ts";
import type {
  EngagementLoopRunnerResult,
  EngagementLoopStep,
} from "./engagement-loop-runner-contract.ts";
import type {
  EngagementWorkspaceSourceMetadataInput,
} from "./engagement-workspace-workflow.ts";
import type {
  FounderReviewPacket,
  FounderReviewPacketBoundaryFlags,
  FounderReviewPacketDecisionKind,
  FounderReviewPacketId,
  FounderReviewPacketResult,
  FounderReviewPacketSection,
  FounderReviewPacketSectionId,
  FounderReviewPacketSectionStatus,
  FounderReviewPacketSourceRefs,
  FounderReviewPacketStatus,
  FounderReviewPacketSummary,
} from "./founder-review-packet-contract.ts";
import {
  FOUNDER_REVIEW_PACKET_BOUNDARY_FLAGS,
  FOUNDER_REVIEW_PACKET_DECISION_KIND_VALUES,
  FOUNDER_REVIEW_PACKET_SECTION_ID_VALUES,
  FOUNDER_REVIEW_PACKET_SECTION_STATUS_VALUES,
  FOUNDER_REVIEW_PACKET_SOURCE_METADATA,
  FOUNDER_REVIEW_PACKET_STATUS_VALUES,
} from "./founder-review-packet-contract.ts";

export type CreateFounderReviewPacketSectionInput = {
  section_id: FounderReviewPacketSectionId | string;
  title: string;
  summary: string;
  item_refs?: string[];
  status: FounderReviewPacketSectionStatus | string;
};

export type CreateFounderReviewPacketInput = {
  packet_id: FounderReviewPacketId;
  status: FounderReviewPacketStatus | string;
  engagement_ref?: string | null;
  workspace_ref?: string | null;
  session_ref?: string | null;
  loop_run_ref: string;
  current_stage: EngagementStage | string;
  commercial_mode: CommercialMode | string;
  sections: FounderReviewPacketSection[];
  decision_options: (FounderReviewPacketDecisionKind | string)[];
  source_refs: FounderReviewPacketSourceRefs;
  source_metadata?: EngagementWorkspaceSourceMetadataInput;
};

export type CreateFounderReviewPacketFromLoopResultInput = {
  packet_id: FounderReviewPacketId;
  result_id?: string;
  loop_result: EngagementLoopRunnerResult;
  source_metadata?: EngagementWorkspaceSourceMetadataInput;
};

function assert_non_empty_string(value: string | undefined, field: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new RangeError(`${field} must be a non-empty string`);
  }

  return value;
}

function optional_non_empty_string(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function assert_packet_status(value: string | undefined): FounderReviewPacketStatus {
  const status = assert_non_empty_string(value, "founder review packet status");

  if (FOUNDER_REVIEW_PACKET_STATUS_VALUES.includes(status as FounderReviewPacketStatus)) {
    return status as FounderReviewPacketStatus;
  }

  throw new RangeError(`Unsupported founder review packet status: ${status}`);
}

function assert_section_id(value: string | undefined): FounderReviewPacketSectionId {
  const section_id = assert_non_empty_string(
    value,
    "founder review packet section id"
  );

  if (
    FOUNDER_REVIEW_PACKET_SECTION_ID_VALUES.includes(
      section_id as FounderReviewPacketSectionId
    )
  ) {
    return section_id as FounderReviewPacketSectionId;
  }

  throw new RangeError(`Unsupported founder review packet section id: ${section_id}`);
}

function assert_section_status(
  value: string | undefined
): FounderReviewPacketSectionStatus {
  const status = assert_non_empty_string(
    value,
    "founder review packet section status"
  );

  if (
    FOUNDER_REVIEW_PACKET_SECTION_STATUS_VALUES.includes(
      status as FounderReviewPacketSectionStatus
    )
  ) {
    return status as FounderReviewPacketSectionStatus;
  }

  throw new RangeError(`Unsupported founder review packet section status: ${status}`);
}

function assert_decision_kind(
  value: string | undefined
): FounderReviewPacketDecisionKind {
  const decision_kind = assert_non_empty_string(
    value,
    "founder review packet decision kind"
  );

  if (
    FOUNDER_REVIEW_PACKET_DECISION_KIND_VALUES.includes(
      decision_kind as FounderReviewPacketDecisionKind
    )
  ) {
    return decision_kind as FounderReviewPacketDecisionKind;
  }

  throw new RangeError(
    `Unsupported founder review packet decision kind: ${decision_kind}`
  );
}

function assert_stage(value: string | undefined): EngagementStage {
  const stage = assert_non_empty_string(value, "founder review packet stage");

  if (ENGAGEMENT_STAGE_VALUES.includes(stage as EngagementStage)) {
    return stage as EngagementStage;
  }

  throw new RangeError(`Unsupported founder review packet stage: ${stage}`);
}

function assert_commercial_mode(value: string | undefined): CommercialMode {
  const mode = assert_non_empty_string(
    value,
    "founder review packet commercial mode"
  );

  if (COMMERCIAL_MODE_VALUES.includes(mode as CommercialMode)) {
    return mode as CommercialMode;
  }

  throw new RangeError(`Unsupported founder review packet commercial mode: ${mode}`);
}

function clone_boundary_flags(): FounderReviewPacketBoundaryFlags {
  return { ...FOUNDER_REVIEW_PACKET_BOUNDARY_FLAGS };
}

function clone_source_metadata(
  input: EngagementWorkspaceSourceMetadataInput = {}
) {
  return {
    ...input,
    contract_version: FOUNDER_REVIEW_PACKET_SOURCE_METADATA.contract_version,
    schema_version: FOUNDER_REVIEW_PACKET_SOURCE_METADATA.schema_version,
    release_line: FOUNDER_REVIEW_PACKET_SOURCE_METADATA.release_line,
    baseline_release_ref:
      input.baseline_release_ref ??
      FOUNDER_REVIEW_PACKET_SOURCE_METADATA.baseline_release_ref,
    baseline_commit_ref:
      input.baseline_commit_ref ??
      FOUNDER_REVIEW_PACKET_SOURCE_METADATA.baseline_commit_ref,
    compatibility_profile:
      input.compatibility_profile ??
      FOUNDER_REVIEW_PACKET_SOURCE_METADATA.compatibility_profile,
    migration_from: input.migration_from ? { ...input.migration_from } : undefined,
    migration_to: input.migration_to ? { ...input.migration_to } : undefined,
  };
}

function clone_item_refs(item_refs: string[] | undefined): string[] {
  return [...new Set(item_refs ?? [])].filter((item_ref) => item_ref.length > 0);
}

function clone_source_refs(
  source_refs: FounderReviewPacketSourceRefs
): FounderReviewPacketSourceRefs {
  return {
    entry_surface_ref: source_refs.entry_surface_ref ?? null,
    workspace_ref: source_refs.workspace_ref ?? null,
    session_ref: source_refs.session_ref ?? null,
    loop_run_ref: assert_non_empty_string(
      source_refs.loop_run_ref,
      "loop_run_ref"
    ),
    loop_step_refs: clone_item_refs(source_refs.loop_step_refs),
    engagement_ref: source_refs.engagement_ref ?? null,
  };
}

function manual_decision_options(
  has_blocked_items: boolean
): FounderReviewPacketDecisionKind[] {
  const allowed_options: FounderReviewPacketDecisionKind[] = has_blocked_items
    ? [
      "block_until_refs_fixed",
      "request_more_evidence",
      "hold_for_operator_review",
      "archive_without_action",
    ]
    : [
      "continue_review",
      "request_more_evidence",
      "hold_for_operator_review",
      "archive_without_action",
    ];

  return FOUNDER_REVIEW_PACKET_DECISION_KIND_VALUES.filter((decision_kind) =>
    allowed_options.includes(decision_kind)
  );
}

function collect_step_refs(
  steps: EngagementLoopStep[],
  status: EngagementLoopStep["status"]
): string[] {
  return steps
    .filter((step) => step.status === status)
    .map((step) => step.step_id);
}

function create_sections_from_loop_result(
  loop_result: EngagementLoopRunnerResult
): FounderReviewPacketSection[] {
  const reviewed_step_refs = collect_step_refs(loop_result.steps, "reviewed");
  const blocked_step_refs = collect_step_refs(loop_result.steps, "blocked");
  const pending_item_refs = [
    ...collect_step_refs(loop_result.steps, "pending"),
    ...collect_step_refs(loop_result.steps, "skipped"),
  ];

  return [
    create_founder_review_packet_section({
      section_id: "engagement_context",
      title: "Engagement context",
      summary:
        "Canonical engagement context for manual founder review.",
      item_refs: clone_item_refs([
        loop_result.run.engagement_ref ?? "",
        loop_result.entry_surface_ref ?? "",
      ]),
      status: loop_result.run.engagement_ref ? "ready" : "blocked",
    }),
    create_founder_review_packet_section({
      section_id: "workspace_summary",
      title: "Workspace summary",
      summary:
        "Local workspace and session references for founder/operator review.",
      item_refs: clone_item_refs([
        loop_result.run.workspace_ref ?? "",
        loop_result.run.session_ref ?? "",
      ]),
      status:
        loop_result.run.workspace_ref && loop_result.run.session_ref
          ? "ready"
          : "blocked",
    }),
    create_founder_review_packet_section({
      section_id: "loop_review_summary",
      title: "Loop review summary",
      summary: loop_result.result_summary,
      item_refs: [loop_result.run.run_id],
      status: loop_result.run.status === "blocked" ? "blocked" : "ready",
    }),
    create_founder_review_packet_section({
      section_id: "reviewed_steps",
      title: "Reviewed steps",
      summary: `${reviewed_step_refs.length} local review step(s) reviewed.`,
      item_refs: reviewed_step_refs,
      status: "ready",
    }),
    create_founder_review_packet_section({
      section_id: "blocked_items",
      title: "Blocked items",
      summary: blocked_step_refs.length > 0
        ? `${blocked_step_refs.length} local review step(s) blocked.`
        : "No blocked local review steps.",
      item_refs: blocked_step_refs,
      status: blocked_step_refs.length > 0 ? "blocked" : "ready",
    }),
    create_founder_review_packet_section({
      section_id: "pending_items",
      title: "Pending items",
      summary: pending_item_refs.length > 0
        ? `${pending_item_refs.length} local review step(s) pending or skipped.`
        : "No pending local review steps.",
      item_refs: pending_item_refs,
      status: pending_item_refs.length > 0 ? "pending" : "ready",
    }),
    create_founder_review_packet_section({
      section_id: "founder_decision_options",
      title: "Founder decision options",
      summary:
        "Manual founder decision options only; no action is executed by this packet.",
      item_refs: manual_decision_options(loop_result.run.status === "blocked"),
      status: loop_result.run.status === "blocked" ? "blocked" : "ready",
    }),
    create_founder_review_packet_section({
      section_id: "boundary_notice",
      title: "Boundary notice",
      summary:
        "Local in-memory review packet object only; no persistence, file output, publishing, dispatch, or autonomy.",
      item_refs: [
        "local_only",
        "manual_first",
        "review_only",
        "non_executing",
      ],
      status: "notice",
    }),
  ];
}

export function create_founder_review_packet_section(
  input: CreateFounderReviewPacketSectionInput
): FounderReviewPacketSection {
  return {
    section_id: assert_section_id(input.section_id),
    title: assert_non_empty_string(input.title, "section title"),
    summary: assert_non_empty_string(input.summary, "section summary"),
    item_refs: clone_item_refs(input.item_refs),
    status: assert_section_status(input.status),
    boundary_flags: clone_boundary_flags(),
  };
}

export function create_founder_review_packet(
  input: CreateFounderReviewPacketInput
): FounderReviewPacket {
  return {
    packet_id: assert_non_empty_string(input.packet_id, "packet_id"),
    status: assert_packet_status(input.status),
    engagement_ref: input.engagement_ref ?? null,
    workspace_ref: input.workspace_ref ?? null,
    session_ref: input.session_ref ?? null,
    loop_run_ref: assert_non_empty_string(input.loop_run_ref, "loop_run_ref"),
    current_stage: assert_stage(input.current_stage),
    commercial_mode: assert_commercial_mode(input.commercial_mode),
    sections: input.sections.map((section) =>
      create_founder_review_packet_section(section)
    ),
    decision_options: FOUNDER_REVIEW_PACKET_DECISION_KIND_VALUES.filter(
      (decision_kind) =>
        input.decision_options
          .map((candidate) => assert_decision_kind(candidate))
          .includes(decision_kind)
    ),
    source_refs: clone_source_refs(input.source_refs),
    source_metadata: clone_source_metadata(input.source_metadata),
    boundary_flags: clone_boundary_flags(),
  };
}

export function summarize_founder_review_packet(input: {
  packet: FounderReviewPacket;
}): string {
  const blocked_section_count = input.packet.sections.filter(
    (section) => section.status === "blocked"
  ).length;
  const pending_section_count = input.packet.sections.filter(
    (section) => section.status === "pending"
  ).length;

  if (input.packet.status === "blocked") {
    return `Founder review packet blocked with ${blocked_section_count} blocked section(s).`;
  }

  return `Founder review packet ready with ${input.packet.sections.length} section(s) and ${pending_section_count} pending section(s).`;
}

export function create_founder_review_packet_summary(
  packet: FounderReviewPacket
): FounderReviewPacketSummary {
  return {
    packet_ref: packet.packet_id,
    status: packet.status,
    engagement_ref: packet.engagement_ref,
    workspace_ref: packet.workspace_ref,
    loop_run_ref: packet.loop_run_ref,
    section_count: packet.sections.length,
    decision_options: [...packet.decision_options],
    blocked_item_count: packet.sections.filter((section) =>
      section.status === "blocked"
    ).length,
    pending_item_count: packet.sections.filter((section) =>
      section.status === "pending"
    ).length,
    boundary_flags: clone_boundary_flags(),
  };
}

export function create_founder_review_packet_from_loop_result(
  input: CreateFounderReviewPacketFromLoopResultInput
): FounderReviewPacketResult {
  const loop_result = JSON.parse(
    JSON.stringify(input.loop_result)
  ) as EngagementLoopRunnerResult;
  const has_blocked_items = loop_result.run.status === "blocked" ||
    loop_result.steps.some((step) => step.status === "blocked");
  const packet = create_founder_review_packet({
    packet_id: input.packet_id,
    status: has_blocked_items ? "blocked" : "ready_for_founder_review",
    engagement_ref: loop_result.run.engagement_ref,
    workspace_ref: loop_result.run.workspace_ref,
    session_ref: loop_result.run.session_ref,
    loop_run_ref: loop_result.run.run_id,
    current_stage: loop_result.run.current_stage,
    commercial_mode: loop_result.run.commercial_mode,
    sections: create_sections_from_loop_result(loop_result),
    decision_options: manual_decision_options(has_blocked_items),
    source_refs: {
      entry_surface_ref: loop_result.entry_surface_ref,
      workspace_ref: loop_result.workspace_bundle_ref,
      session_ref: loop_result.run.session_ref,
      loop_run_ref: loop_result.run.run_id,
      loop_step_refs: loop_result.steps.map((step) => step.step_id),
      engagement_ref: loop_result.run.engagement_ref,
    },
    source_metadata: input.source_metadata ?? loop_result.run.source_metadata,
  });

  return {
    result_id: input.result_id ?? `${input.packet_id}:result`,
    packet,
    result_summary: summarize_founder_review_packet({ packet }),
    boundary_flags: clone_boundary_flags(),
  };
}
