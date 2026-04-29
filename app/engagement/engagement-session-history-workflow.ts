import type {
  FounderReviewPacketResult,
} from "./founder-review-packet-contract.ts";
import type {
  EngagementWorkspaceSourceMetadataInput,
} from "./engagement-workspace-workflow.ts";
import type {
  EngagementHistoryEntry,
  EngagementHistoryEntryId,
  EngagementHistoryEntryKind,
  EngagementHistoryLedger,
  EngagementHistoryLedgerId,
  EngagementSessionExportId,
  EngagementSessionExportKind,
  EngagementSessionExportPackage,
  EngagementSessionExportStatus,
  EngagementSessionHistoryBoundaryFlags,
  EngagementSessionHistoryResult,
  EngagementSessionHistorySourceRefs,
  EngagementSessionHistoryStatus,
} from "./engagement-session-history-contract.ts";
import {
  ENGAGEMENT_HISTORY_ENTRY_KIND_VALUES,
  ENGAGEMENT_SESSION_EXPORT_KIND_VALUES,
  ENGAGEMENT_SESSION_EXPORT_STATUS_VALUES,
  ENGAGEMENT_SESSION_HISTORY_BOUNDARY_FLAGS,
  ENGAGEMENT_SESSION_HISTORY_SOURCE_METADATA,
  ENGAGEMENT_SESSION_HISTORY_STATUS_VALUES,
} from "./engagement-session-history-contract.ts";

export type CreateEngagementHistoryEntryInput = {
  entry_id: EngagementHistoryEntryId;
  entry_kind: EngagementHistoryEntryKind | string;
  event_summary: string;
  source_refs?: EngagementSessionHistorySourceRefs;
  created_at: string;
};

export type CreateEngagementHistoryLedgerInput = {
  ledger_id: EngagementHistoryLedgerId;
  status: EngagementSessionHistoryStatus | string;
  workspace_ref?: string | null;
  session_ref?: string | null;
  engagement_ref?: string | null;
  entry_refs?: EngagementHistoryEntryId[];
  latest_packet_ref?: string | null;
  latest_loop_run_ref?: string | null;
  source_metadata?: EngagementWorkspaceSourceMetadataInput;
};

export type CreateEngagementSessionExportPackageInput = {
  export_id: EngagementSessionExportId;
  export_kind: EngagementSessionExportKind | string;
  status: EngagementSessionExportStatus | string;
  ledger_ref: EngagementHistoryLedgerId;
  workspace_ref?: string | null;
  session_ref?: string | null;
  engagement_ref?: string | null;
  packet_ref?: string | null;
  loop_run_ref?: string | null;
  history_entry_refs?: EngagementHistoryEntryId[];
  export_summary: string;
  source_refs?: EngagementSessionHistorySourceRefs;
  source_metadata?: EngagementWorkspaceSourceMetadataInput;
};

export type CreateEngagementSessionHistoryFromPacketInput = {
  result_id?: string;
  ledger_id: EngagementHistoryLedgerId;
  export_id: EngagementSessionExportId;
  created_at: string;
  packet_result: FounderReviewPacketResult;
  export_kind?: EngagementSessionExportKind | string;
  source_metadata?: EngagementWorkspaceSourceMetadataInput;
};

function assert_non_empty_string(value: string | undefined, field: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new RangeError(`${field} must be a non-empty string`);
  }

  return value;
}

function assert_history_status(
  value: string | undefined
): EngagementSessionHistoryStatus {
  const status = assert_non_empty_string(
    value,
    "engagement session history status"
  );

  if (
    ENGAGEMENT_SESSION_HISTORY_STATUS_VALUES.includes(
      status as EngagementSessionHistoryStatus
    )
  ) {
    return status as EngagementSessionHistoryStatus;
  }

  throw new RangeError(`Unsupported engagement session history status: ${status}`);
}

function assert_export_status(
  value: string | undefined
): EngagementSessionExportStatus {
  const status = assert_non_empty_string(
    value,
    "engagement session export status"
  );

  if (
    ENGAGEMENT_SESSION_EXPORT_STATUS_VALUES.includes(
      status as EngagementSessionExportStatus
    )
  ) {
    return status as EngagementSessionExportStatus;
  }

  throw new RangeError(`Unsupported engagement session export status: ${status}`);
}

function assert_export_kind(value: string | undefined): EngagementSessionExportKind {
  const export_kind = assert_non_empty_string(
    value,
    "engagement session export kind"
  );

  if (
    ENGAGEMENT_SESSION_EXPORT_KIND_VALUES.includes(
      export_kind as EngagementSessionExportKind
    )
  ) {
    return export_kind as EngagementSessionExportKind;
  }

  throw new RangeError(`Unsupported engagement session export kind: ${export_kind}`);
}

function assert_entry_kind(value: string | undefined): EngagementHistoryEntryKind {
  const entry_kind = assert_non_empty_string(
    value,
    "engagement session history entry kind"
  );

  if (
    ENGAGEMENT_HISTORY_ENTRY_KIND_VALUES.includes(
      entry_kind as EngagementHistoryEntryKind
    )
  ) {
    return entry_kind as EngagementHistoryEntryKind;
  }

  throw new RangeError(`Unsupported engagement session history entry kind: ${entry_kind}`);
}

function optional_ref(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function sort_unique_strings(values: string[] | undefined): string[] {
  return [...new Set(values ?? [])]
    .filter((value) => value.length > 0)
    .sort();
}

function clone_boundary_flags(): EngagementSessionHistoryBoundaryFlags {
  return { ...ENGAGEMENT_SESSION_HISTORY_BOUNDARY_FLAGS };
}

function clone_source_metadata(
  input: EngagementWorkspaceSourceMetadataInput = {}
) {
  return {
    ...input,
    contract_version: ENGAGEMENT_SESSION_HISTORY_SOURCE_METADATA.contract_version,
    schema_version: ENGAGEMENT_SESSION_HISTORY_SOURCE_METADATA.schema_version,
    release_line: ENGAGEMENT_SESSION_HISTORY_SOURCE_METADATA.release_line,
    baseline_release_ref:
      input.baseline_release_ref ??
      ENGAGEMENT_SESSION_HISTORY_SOURCE_METADATA.baseline_release_ref,
    baseline_commit_ref:
      input.baseline_commit_ref ??
      ENGAGEMENT_SESSION_HISTORY_SOURCE_METADATA.baseline_commit_ref,
    compatibility_profile:
      input.compatibility_profile ??
      ENGAGEMENT_SESSION_HISTORY_SOURCE_METADATA.compatibility_profile,
    migration_from: input.migration_from ? { ...input.migration_from } : undefined,
    migration_to: input.migration_to ? { ...input.migration_to } : undefined,
  };
}

function clone_source_refs(
  refs: EngagementSessionHistorySourceRefs = {}
): EngagementSessionHistorySourceRefs {
  return {
    entry_surface_ref: refs.entry_surface_ref ?? null,
    workspace_ref: refs.workspace_ref ?? null,
    session_ref: refs.session_ref ?? null,
    engagement_ref: refs.engagement_ref ?? null,
    packet_ref: refs.packet_ref ?? null,
    loop_run_ref: refs.loop_run_ref ?? null,
    loop_step_refs: sort_unique_strings(refs.loop_step_refs),
  };
}

function create_entry_id(
  ledger_id: EngagementHistoryLedgerId,
  index: number,
  entry_kind: EngagementHistoryEntryKind
): EngagementHistoryEntryId {
  return `${ledger_id}:${String(index).padStart(2, "0")}:${entry_kind}`;
}

function has_required_refs(packet_result: FounderReviewPacketResult): boolean {
  return Boolean(
    packet_result.packet.packet_id &&
      packet_result.packet.workspace_ref &&
      packet_result.packet.session_ref &&
      packet_result.packet.engagement_ref &&
      packet_result.packet.loop_run_ref
  );
}

function base_source_refs(
  packet_result: FounderReviewPacketResult
): EngagementSessionHistorySourceRefs {
  return {
    entry_surface_ref: packet_result.packet.source_refs.entry_surface_ref,
    workspace_ref: packet_result.packet.workspace_ref,
    session_ref: packet_result.packet.session_ref,
    engagement_ref: packet_result.packet.engagement_ref,
    packet_ref: packet_result.packet.packet_id,
    loop_run_ref: packet_result.packet.loop_run_ref,
    loop_step_refs: packet_result.packet.source_refs.loop_step_refs,
  };
}

function create_entries_from_packet(input: {
  ledger_id: EngagementHistoryLedgerId;
  created_at: string;
  packet_result: FounderReviewPacketResult;
  blocked: boolean;
}): EngagementHistoryEntry[] {
  const refs = base_source_refs(input.packet_result);
  const entry_specs: Array<{
    entry_kind: EngagementHistoryEntryKind;
    event_summary: string;
    source_refs: EngagementSessionHistorySourceRefs;
  }> = [
    {
      entry_kind: "workspace_created",
      event_summary:
        "Workspace reference captured in deterministic local session history.",
      source_refs: {
        workspace_ref: refs.workspace_ref,
        session_ref: refs.session_ref,
        engagement_ref: refs.engagement_ref,
      },
    },
    {
      entry_kind: "entry_surface_created",
      event_summary:
        "Entry surface reference captured for local create/load review continuity.",
      source_refs: {
        entry_surface_ref: refs.entry_surface_ref,
        workspace_ref: refs.workspace_ref,
        session_ref: refs.session_ref,
        engagement_ref: refs.engagement_ref,
      },
    },
    {
      entry_kind: "loop_run_completed",
      event_summary:
        "Review-only loop run captured in deterministic local session history.",
      source_refs: {
        loop_run_ref: refs.loop_run_ref,
        loop_step_refs: refs.loop_step_refs,
        workspace_ref: refs.workspace_ref,
        session_ref: refs.session_ref,
        engagement_ref: refs.engagement_ref,
      },
    },
    {
      entry_kind: "founder_review_packet_created",
      event_summary:
        "Founder review packet object captured for local manual review continuity.",
      source_refs: refs,
    },
    {
      entry_kind: "export_package_created",
      event_summary:
        "In-memory deterministic export package object prepared for local review.",
      source_refs: refs,
    },
  ];

  if (input.blocked) {
    entry_specs.push({
      entry_kind: "blocked",
      event_summary:
        "Session history export package blocked until required local refs are fixed.",
      source_refs: refs,
    });
  }

  return entry_specs.map((entry_spec, index) =>
    create_engagement_history_entry({
      entry_id: create_entry_id(input.ledger_id, index + 1, entry_spec.entry_kind),
      entry_kind: entry_spec.entry_kind,
      event_summary: entry_spec.event_summary,
      source_refs: entry_spec.source_refs,
      created_at: input.created_at,
    })
  );
}

export function create_engagement_history_entry(
  input: CreateEngagementHistoryEntryInput
): EngagementHistoryEntry {
  return {
    entry_id: assert_non_empty_string(input.entry_id, "entry_id"),
    entry_kind: assert_entry_kind(input.entry_kind),
    event_summary: assert_non_empty_string(input.event_summary, "event_summary"),
    source_refs: clone_source_refs(input.source_refs),
    created_at: assert_non_empty_string(input.created_at, "created_at"),
    boundary_flags: clone_boundary_flags(),
  };
}

export function create_engagement_history_ledger(
  input: CreateEngagementHistoryLedgerInput
): EngagementHistoryLedger {
  return {
    ledger_id: assert_non_empty_string(input.ledger_id, "ledger_id"),
    status: assert_history_status(input.status),
    workspace_ref: optional_ref(input.workspace_ref),
    session_ref: optional_ref(input.session_ref),
    engagement_ref: optional_ref(input.engagement_ref),
    entry_refs: sort_unique_strings(input.entry_refs),
    latest_packet_ref: optional_ref(input.latest_packet_ref),
    latest_loop_run_ref: optional_ref(input.latest_loop_run_ref),
    source_metadata: clone_source_metadata(input.source_metadata),
    boundary_flags: clone_boundary_flags(),
  };
}

export function create_engagement_session_export_package(
  input: CreateEngagementSessionExportPackageInput
): EngagementSessionExportPackage {
  return {
    export_id: assert_non_empty_string(input.export_id, "export_id"),
    export_kind: assert_export_kind(input.export_kind),
    status: assert_export_status(input.status),
    ledger_ref: assert_non_empty_string(input.ledger_ref, "ledger_ref"),
    workspace_ref: optional_ref(input.workspace_ref),
    session_ref: optional_ref(input.session_ref),
    engagement_ref: optional_ref(input.engagement_ref),
    packet_ref: optional_ref(input.packet_ref),
    loop_run_ref: optional_ref(input.loop_run_ref),
    history_entry_refs: sort_unique_strings(input.history_entry_refs),
    export_summary: assert_non_empty_string(
      input.export_summary,
      "export_summary"
    ),
    source_refs: clone_source_refs(input.source_refs),
    source_metadata: clone_source_metadata(input.source_metadata),
    boundary_flags: clone_boundary_flags(),
  };
}

export function summarize_engagement_session_history(input: {
  ledger: EngagementHistoryLedger;
  entries: EngagementHistoryEntry[];
  export_package: EngagementSessionExportPackage;
}): string {
  if (
    input.ledger.status === "blocked" ||
    input.export_package.status === "blocked"
  ) {
    return `Local session history export object blocked with ${input.entries.length} history entry(s).`;
  }

  return `Local session history ledger assembled with ${input.entries.length} history entry(s) and deterministic in-memory export package ${input.export_package.export_id}.`;
}

export function create_engagement_session_history_from_packet(
  input: CreateEngagementSessionHistoryFromPacketInput
): EngagementSessionHistoryResult {
  const packet_result = JSON.parse(
    JSON.stringify(input.packet_result)
  ) as FounderReviewPacketResult;
  const blocked = packet_result.packet.status === "blocked" ||
    !has_required_refs(packet_result);
  const entries = create_entries_from_packet({
    ledger_id: input.ledger_id,
    created_at: input.created_at,
    packet_result,
    blocked,
  });
  const source_refs = base_source_refs(packet_result);
  const source_metadata =
    input.source_metadata ?? packet_result.packet.source_metadata;
  const ledger = create_engagement_history_ledger({
    ledger_id: input.ledger_id,
    status: blocked ? "blocked" : "export_ready",
    workspace_ref: packet_result.packet.workspace_ref,
    session_ref: packet_result.packet.session_ref,
    engagement_ref: packet_result.packet.engagement_ref,
    entry_refs: entries.map((entry) => entry.entry_id),
    latest_packet_ref: packet_result.packet.packet_id,
    latest_loop_run_ref: packet_result.packet.loop_run_ref,
    source_metadata,
  });
  const export_package = create_engagement_session_export_package({
    export_id: input.export_id,
    export_kind: input.export_kind ?? "in_memory_export_object",
    status: blocked ? "blocked" : "ready_for_local_review",
    ledger_ref: ledger.ledger_id,
    workspace_ref: ledger.workspace_ref,
    session_ref: ledger.session_ref,
    engagement_ref: ledger.engagement_ref,
    packet_ref: ledger.latest_packet_ref,
    loop_run_ref: ledger.latest_loop_run_ref,
    history_entry_refs: entries.map((entry) => entry.entry_id),
    export_summary: blocked
      ? "Deterministic in-memory export package blocked until required local refs are fixed."
      : "Deterministic in-memory export package ready for local founder/operator review.",
    source_refs,
    source_metadata,
  });

  return {
    result_id: input.result_id ?? `${input.ledger_id}:result`,
    ledger,
    entries,
    export_package,
    result_summary: summarize_engagement_session_history({
      ledger,
      entries,
      export_package,
    }),
    boundary_flags: clone_boundary_flags(),
  };
}
