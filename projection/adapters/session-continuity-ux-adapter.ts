import type {
  SoloCrewContinuitySnapshotView,
  SoloCrewLifecycleContinuityView,
  SoloCrewPendingReviewItemView,
  SoloCrewPendingReviewView,
} from "../contracts/lifecycle-continuity-consumption-contract.ts";
import type {
  SoloCrewContinuityReplayStep,
  SoloCrewLocalHistoryTimelineItem,
  SoloCrewLocalHistoryTimelineView,
  SoloCrewReviewTrailItem,
  SoloCrewReviewTrailView,
  SoloCrewSessionContinuityPanelView,
} from "../contracts/session-continuity-ux-contract.ts";

type ProjectionRecord = Record<string, unknown>;

export type SessionContinuityUXAdapterInput = {
  session_label?: string;
  continuity_view?: SoloCrewLifecycleContinuityView;
  pending_review_view?: SoloCrewPendingReviewView;
  continuity_snapshot_view?: SoloCrewContinuitySnapshotView;
};

const FORBIDDEN_RUNTIME_PRIVATE_FIELDS = [
  "raw_vsl",
  "raw_psg",
  "raw_trace",
  "runtime_private_payload",
  "runtime_private_object",
  "runtime_private_fields",
  "raw_runtime_private_payload",
] as const;

const FORBIDDEN_EXECUTION_FIELDS = [
  "provider_channel_result",
  "dispatch_result",
  "approval_result",
  "execution_result",
  "provider_sent",
  "channel_published",
] as const;

const FORBIDDEN_QUEUE_FIELDS = [
  "queue_worker_state",
  "founder_queue",
  "queue_state",
] as const;

const FORBIDDEN_STRING_RULES = [
  {
    phrase: "provider/channel execution",
    message: "forbidden provider/channel wording",
  },
  {
    phrase: "provider/channel send",
    message: "forbidden provider/channel wording",
  },
  {
    phrase: "founder queue",
    message: "forbidden founder queue wording",
  },
  {
    phrase: "action-preparation",
    message: "forbidden action-preparation wording",
  },
  {
    phrase: "durable multi-session persistence",
    message: "forbidden durable persistence wording",
  },
  {
    phrase: "multi-session authoritative state",
    message: "forbidden durable persistence wording",
  },
  {
    phrase: "approved revision",
    message: "forbidden execution wording",
  },
  {
    phrase: "approval granted",
    message: "forbidden execution wording",
  },
  {
    phrase: "execution completed",
    message: "forbidden execution wording",
  },
  {
    phrase: "execution ready",
    message: "forbidden execution wording",
  },
  {
    phrase: "dispatch-ready",
    message: "forbidden execution wording",
  },
  {
    phrase: "dispatch ready",
    message: "forbidden execution wording",
  },
  {
    phrase: "queue worker",
    message: "forbidden queue wording",
  },
] as const;

function unique_strings(values: unknown[] = []): string[] {
  return [...new Set(
    values.filter(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 0
    ).map((value) => value.trim())
  )].sort();
}

function assert_valid(errors: string[]): void {
  if (errors.length === 0) {
    return;
  }

  throw new Error([...new Set(errors)].sort().join("; "));
}

function as_projection_record(value: unknown): ProjectionRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as ProjectionRecord;
}

function require_string(
  value: unknown,
  required_message: string,
  errors: string[]
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(required_message);
    return "";
  }

  return value.trim();
}

function optional_string(
  value: unknown,
  field_name: string,
  errors: string[]
): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(`${field_name} must remain a non-empty bounded field.`);
    return undefined;
  }

  return value.trim();
}

function collect_forbidden_field_errors(
  value: unknown,
  target: string[] = []
): string[] {
  if (!value || typeof value !== "object") {
    return target;
  }

  if (Array.isArray(value)) {
    value.forEach((entry) => {
      collect_forbidden_field_errors(entry, target);
    });
    return target;
  }

  for (const [key, nested] of Object.entries(value)) {
    if (
      (FORBIDDEN_RUNTIME_PRIVATE_FIELDS as readonly string[]).includes(key)
    ) {
      target.push(`forbidden runtime-private field: ${key}`);
    }

    if ((FORBIDDEN_EXECUTION_FIELDS as readonly string[]).includes(key)) {
      target.push(`forbidden execution field: ${key}`);
    }

    if ((FORBIDDEN_QUEUE_FIELDS as readonly string[]).includes(key)) {
      target.push(`forbidden queue field: ${key}`);
    }

    collect_forbidden_field_errors(nested, target);
  }

  return target;
}

function collect_forbidden_string_errors(
  value: unknown,
  path = "input",
  target: string[] = []
): string[] {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    for (const rule of FORBIDDEN_STRING_RULES) {
      if (normalized.includes(rule.phrase)) {
        target.push(`${rule.message} at ${path}`);
      }
    }

    return target;
  }

  if (Array.isArray(value)) {
    value.forEach((entry, index) => {
      collect_forbidden_string_errors(entry, `${path}[${index}]`, target);
    });
    return target;
  }

  if (!value || typeof value !== "object") {
    return target;
  }

  for (const [key, nested] of Object.entries(value)) {
    collect_forbidden_string_errors(nested, `${path}.${key}`, target);
  }

  return target;
}

function validate_safe_evidence_refs(
  value: unknown,
  field_name: string,
  errors: string[]
): string[] {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value)) {
    errors.push(`${field_name} must be an array`);
    return [];
  }

  value.forEach((entry, index) => {
    if (typeof entry !== "string" || entry.trim().length === 0) {
      errors.push(`${field_name}[${index}] must remain a non-empty bounded field.`);
    }
  });

  return unique_strings(value);
}

function ensure_runtime_private_fields_omitted(
  value: unknown,
  errors: string[]
): true {
  if (value !== true) {
    errors.push("runtime_private_fields_omitted must be true");
  }

  return true;
}

function normalize_session_label(value: unknown): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  return "current local continuity session";
}

function source_view(
  input: SessionContinuityUXAdapterInput,
  key:
    | "continuity_view"
    | "pending_review_view"
    | "continuity_snapshot_view"
): ProjectionRecord {
  return as_projection_record(input[key]);
}

function primary_view(input: SessionContinuityUXAdapterInput): ProjectionRecord {
  return source_view(input, "continuity_view").project_id
    ? source_view(input, "continuity_view")
    : source_view(input, "continuity_snapshot_view").project_id
      ? source_view(input, "continuity_snapshot_view")
      : source_view(input, "pending_review_view");
}

function validate_base_input(
  input: SessionContinuityUXAdapterInput
): {
  project_id: string;
  continuity_id: string;
  session_label: string;
  continuity_view: ProjectionRecord;
  pending_review_view: ProjectionRecord;
  continuity_snapshot_view: ProjectionRecord;
  primary_view: ProjectionRecord;
} {
  const errors = [
    ...collect_forbidden_field_errors(input),
    ...collect_forbidden_string_errors(input),
  ];
  const continuity_view = source_view(input, "continuity_view");
  const pending_review_view = source_view(input, "pending_review_view");
  const continuity_snapshot_view = source_view(input, "continuity_snapshot_view");
  const selected_primary_view = primary_view(input);
  const project_id = require_string(
    selected_primary_view.project_id,
    "project_id is required",
    errors
  );
  const continuity_id = require_string(
    selected_primary_view.continuity_id,
    "continuity_id is required",
    errors
  );

  if (continuity_view.project_id !== undefined) {
    ensure_runtime_private_fields_omitted(
      continuity_view.runtime_private_fields_omitted,
      errors
    );
  }

  if (pending_review_view.project_id !== undefined) {
    ensure_runtime_private_fields_omitted(
      pending_review_view.runtime_private_fields_omitted,
      errors
    );
  }

  if (continuity_snapshot_view.project_id !== undefined) {
    ensure_runtime_private_fields_omitted(
      continuity_snapshot_view.runtime_private_fields_omitted,
      errors
    );
  }

  assert_valid(errors);

  return {
    project_id,
    continuity_id,
    session_label: normalize_session_label(input.session_label),
    continuity_view,
    pending_review_view,
    continuity_snapshot_view,
    primary_view: selected_primary_view,
  };
}

function normalize_local_history_item(
  session_label: string,
  value: {
    project_id: string;
    continuity_id: string;
    lifecycle_label: unknown;
    history_summary: unknown;
    safe_evidence_refs?: unknown;
  },
  errors: string[]
): SoloCrewLocalHistoryTimelineItem {
  const lifecycle_label = require_string(
    value.lifecycle_label,
    "local_history_items.lifecycle_label must remain a non-empty bounded field.",
    errors
  );
  const history_summary = require_string(
    value.history_summary,
    "local_history_items.history_summary must remain a non-empty bounded field.",
    errors
  );
  const safe_evidence_refs = validate_safe_evidence_refs(
    value.safe_evidence_refs,
    "local_history_items.safe_evidence_refs",
    errors
  );

  return {
    project_id: value.project_id,
    continuity_id: value.continuity_id,
    lifecycle_label,
    history_summary,
    safe_evidence_refs,
    runtime_private_fields_omitted: true,
    non_executing_posture:
      `Local history remains display-only in ${session_label} and does not become execution replay.`,
  };
}

function dedupe_local_history_items(
  items: SoloCrewLocalHistoryTimelineItem[]
): SoloCrewLocalHistoryTimelineItem[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = `${item.lifecycle_label}::${item.history_summary}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function adapt_local_history_timeline(
  input: SessionContinuityUXAdapterInput
): SoloCrewLocalHistoryTimelineView {
  const normalized = validate_base_input(input);
  const errors: string[] = [];
  const items = dedupe_local_history_items([
    ...(normalized.continuity_view.project_id
      ? [
          normalize_local_history_item(
            normalized.session_label,
            {
              project_id: normalized.project_id,
              continuity_id: normalized.continuity_id,
              lifecycle_label: normalized.continuity_view.lifecycle_label,
              history_summary: normalized.continuity_view.history_summary,
              safe_evidence_refs: normalized.continuity_view.safe_evidence_refs,
            },
            errors
          ),
        ]
      : []),
    ...(normalized.pending_review_view.project_id
      ? [
          normalize_local_history_item(
            normalized.session_label,
            {
              project_id: normalized.project_id,
              continuity_id: normalized.continuity_id,
              lifecycle_label: normalized.pending_review_view.lifecycle_label,
              history_summary: normalized.pending_review_view.history_summary,
              safe_evidence_refs: normalized.pending_review_view.safe_evidence_refs,
            },
            errors
          ),
          ...((normalized.pending_review_view.pending_review_items as
            | SoloCrewPendingReviewItemView[]
            | undefined) ?? []).map((item) =>
            normalize_local_history_item(
              normalized.session_label,
              {
                project_id: normalized.project_id,
                continuity_id: normalized.continuity_id,
                lifecycle_label: item.lifecycle_label,
                history_summary: item.history_summary,
                safe_evidence_refs: item.safe_evidence_refs,
              },
              errors
            )
          ),
        ]
      : []),
    ...(normalized.continuity_snapshot_view.project_id
      ? [
          normalize_local_history_item(
            normalized.session_label,
            {
              project_id: normalized.project_id,
              continuity_id: normalized.continuity_id,
              lifecycle_label: normalized.continuity_snapshot_view.lifecycle_label,
              history_summary: normalized.continuity_snapshot_view.history_summary,
              safe_evidence_refs: normalized.continuity_snapshot_view.safe_evidence_refs,
            },
            errors
          ),
        ]
      : []),
  ]);
  const safe_evidence_refs = unique_strings(
    items.flatMap((item) => item.safe_evidence_refs ?? [])
  );

  assert_valid(errors);

  return {
    project_id: normalized.project_id,
    continuity_id: normalized.continuity_id,
    session_label: normalized.session_label,
    history_summary:
      "Local history timeline remains display-only over existing safe continuity summaries.",
    local_history_items: items,
    safe_evidence_refs,
    runtime_private_fields_omitted: true,
    non_executing_posture:
      "Local history timeline remains display-only, review-only, and non-executing.",
  };
}

function normalize_review_trail_item(
  session_label: string,
  project_id: string,
  continuity_id: string,
  value: {
    lifecycle_label: unknown;
    history_summary: unknown;
    safe_evidence_refs?: unknown;
  },
  errors: string[]
): SoloCrewReviewTrailItem {
  const lifecycle_label = require_string(
    value.lifecycle_label,
    "review_trail_items.lifecycle_label must remain a non-empty bounded field.",
    errors
  );
  const history_summary = require_string(
    value.history_summary,
    "review_trail_items.history_summary must remain a non-empty bounded field.",
    errors
  );
  const safe_evidence_refs = validate_safe_evidence_refs(
    value.safe_evidence_refs,
    "review_trail_items.safe_evidence_refs",
    errors
  );

  return {
    project_id,
    continuity_id,
    lifecycle_label,
    history_summary,
    safe_evidence_refs,
    runtime_private_fields_omitted: true,
    non_executing_posture:
      `Review trail remains display-only in ${session_label} and stays review-only.`,
  };
}

export function adapt_review_trail(
  input: SessionContinuityUXAdapterInput
): SoloCrewReviewTrailView {
  const normalized = validate_base_input(input);
  const errors: string[] = [];
  const pending_items = ((normalized.pending_review_view.pending_review_items as
    | SoloCrewPendingReviewItemView[]
    | undefined) ?? []);
  const review_trail_items = (
    pending_items.length > 0
      ? pending_items.map((item) =>
          normalize_review_trail_item(
            normalized.session_label,
            normalized.project_id,
            normalized.continuity_id,
            item,
            errors
          )
        )
      : [
          normalize_review_trail_item(
            normalized.session_label,
            normalized.project_id,
            normalized.continuity_id,
            {
              lifecycle_label:
                normalized.primary_view.lifecycle_label ?? "review trail visibility",
              history_summary:
                normalized.primary_view.history_summary ??
                "Review trail remains bounded to safe continuity summaries.",
              safe_evidence_refs: normalized.primary_view.safe_evidence_refs,
            },
            errors
          ),
        ]
  );

  assert_valid(errors);

  return {
    project_id: normalized.project_id,
    continuity_id: normalized.continuity_id,
    session_label: normalized.session_label,
    history_summary:
      "Review trail remains display-only and below queue semantics.",
    review_trail_items,
    pending_review_count:
      typeof normalized.pending_review_view.pending_review_count === "number"
        ? normalized.pending_review_view.pending_review_count
        : review_trail_items.length,
    pending_review_visibility:
      typeof normalized.pending_review_view.history_summary === "string"
        ? "Pending review visibility remains display-only and not a queue."
        : undefined,
    safe_evidence_refs: unique_strings(
      review_trail_items.flatMap((item) => item.safe_evidence_refs ?? [])
    ),
    runtime_private_fields_omitted: true,
    non_executing_posture:
      "Review trail remains display-only, review-only, and non-executing.",
  };
}

export function adapt_continuity_replay_steps(
  input: SessionContinuityUXAdapterInput
): SoloCrewContinuityReplayStep[] {
  const normalized = validate_base_input(input);
  const local_history_timeline = adapt_local_history_timeline(input);
  const review_trail = adapt_review_trail(input);

  return [
    {
      project_id: normalized.project_id,
      continuity_id: normalized.continuity_id,
      session_label: normalized.session_label,
      lifecycle_label:
        optional_string(
          normalized.primary_view.lifecycle_label,
          "continuity_replay_steps.lifecycle_label",
          []
        ) ?? "session continuity summary",
      history_summary:
        "Guided display step: start from the bounded continuity summary and keep it review-only.",
      safe_evidence_refs: unique_strings(
        normalized.primary_view.safe_evidence_refs as unknown[] ?? []
      ),
      runtime_private_fields_omitted: true,
      non_executing_posture:
        "Guided viewing only. This is not execution replay.",
    },
    {
      project_id: normalized.project_id,
      continuity_id: normalized.continuity_id,
      session_label: normalized.session_label,
      lifecycle_label: "local history timeline",
      history_summary:
        `${local_history_timeline.local_history_items.length} local history items are visible in display-only form.`,
      safe_evidence_refs: local_history_timeline.safe_evidence_refs,
      runtime_private_fields_omitted: true,
      non_executing_posture:
        "Guided viewing only. Local history remains display-only.",
    },
    {
      project_id: normalized.project_id,
      continuity_id: normalized.continuity_id,
      session_label: normalized.session_label,
      lifecycle_label: "review trail display",
      history_summary:
        `${review_trail.review_trail_items.length} review trail items remain review-only and below queue semantics.`,
      safe_evidence_refs: review_trail.safe_evidence_refs,
      runtime_private_fields_omitted: true,
      non_executing_posture:
        "Guided viewing only. Review trail remains display-only.",
    },
    ...(normalized.continuity_snapshot_view.project_id
      ? [{
          project_id: normalized.project_id,
          continuity_id: normalized.continuity_id,
          session_label: normalized.session_label,
          lifecycle_label: "continuity snapshot display",
          history_summary:
            "Guided display step: optional continuity snapshot remains bounded and non-executing.",
          safe_evidence_refs: unique_strings(
            normalized.continuity_snapshot_view.safe_evidence_refs as unknown[] ?? []
          ),
          runtime_private_fields_omitted: true as const,
          non_executing_posture:
            "Guided viewing only. Continuity snapshot is not execution replay.",
        }]
      : []),
  ];
}

export function adapt_session_continuity_panel(
  input: SessionContinuityUXAdapterInput
): SoloCrewSessionContinuityPanelView {
  const normalized = validate_base_input(input);
  const local_history_timeline = adapt_local_history_timeline(input);
  const review_trail = adapt_review_trail(input);
  const continuity_summary = require_string(
    normalized.primary_view.history_summary,
    "history_summary must remain a non-empty bounded field.",
    []
  );
  const lifecycle_label = require_string(
    normalized.primary_view.lifecycle_label,
    "lifecycle_label must remain a non-empty bounded field.",
    []
  );
  const continuity_snapshot_summary = optional_string(
    normalized.continuity_snapshot_view.history_summary,
    "continuity_snapshot_summary",
    []
  );
  const safe_evidence_refs = unique_strings([
    ...(local_history_timeline.safe_evidence_refs ?? []),
    ...(review_trail.safe_evidence_refs ?? []),
    ...(
      (normalized.primary_view.safe_evidence_refs as unknown[] | undefined) ?? []
    ),
    ...(
      (normalized.continuity_snapshot_view.safe_evidence_refs as
        | unknown[]
        | undefined) ?? []
    ),
    ...(
      ((normalized.continuity_snapshot_view.pending_review_items as
        | SoloCrewPendingReviewItemView[]
        | undefined) ?? []).flatMap((item) => item.safe_evidence_refs ?? [])
    ),
  ]);

  return {
    project_id: normalized.project_id,
    continuity_id: normalized.continuity_id,
    session_label: normalized.session_label,
    continuity_summary:
      `Session continuity summary: ${lifecycle_label}. ${continuity_summary}`,
    lifecycle_label,
    history_summary:
      "Local session continuity remains display-only over existing safe continuity summaries.",
    local_history_items: local_history_timeline.local_history_items,
    review_trail_items: review_trail.review_trail_items,
    pending_review_count: review_trail.pending_review_count,
    pending_review_visibility:
      review_trail.pending_review_visibility ??
      "Pending review visibility is currently clear. Display-only and not a queue.",
    continuity_snapshot_summary,
    safe_evidence_refs,
    runtime_private_fields_omitted: true,
    non_executing_posture:
      "Session continuity UX remains display-only, review-only, and non-executing.",
  };
}
