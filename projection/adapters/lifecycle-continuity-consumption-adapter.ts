import type {
  SoloCrewContinuitySnapshotView,
  SoloCrewLifecycleContinuityView,
  SoloCrewPendingReviewItemView,
  SoloCrewPendingReviewView,
} from "../contracts/lifecycle-continuity-consumption-contract.ts";

type ProjectionRecord = Record<string, unknown>;

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
  "approved_revision",
  "approval_granted",
  "execution_completed",
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
    phrase: "provider sent",
    message: "forbidden provider/channel wording",
  },
  {
    phrase: "channel published",
    message: "forbidden provider/channel wording",
  },
] as const;

const FORBIDDEN_DIRECT_ACTION_LABELS = [
  "approve",
  "reject",
  "dispatch",
  "execute",
] as const;

function unique_strings(values: unknown[] = []): string[] {
  return [...new Set(
    values.filter(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 0
    )
      .map((value) => value.trim())
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
  field_name: string,
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
    if (typeof entry !== "string") {
      errors.push(`${field_name}[${index}] must be a string`);
      return;
    }

    if (entry.trim().length === 0) {
      errors.push(
        `${field_name}[${index}] must remain a non-empty bounded field.`
      );
    }
  });

  return unique_strings(value);
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

    if (
      (FORBIDDEN_DIRECT_ACTION_LABELS as readonly string[]).includes(normalized)
    ) {
      target.push(`forbidden execution wording at ${path}`);
      return target;
    }

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

function normalize_pending_review_count(
  value: unknown,
  derived_count: number,
  errors: string[]
): number {
  if (value === undefined) {
    return derived_count;
  }

  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < 0
  ) {
    errors.push("pending_review_count must be a non-negative integer");
    return derived_count;
  }

  return value;
}

function normalize_pending_review_item(
  value: unknown,
  project_id: string,
  errors: string[]
): SoloCrewPendingReviewItemView {
  const item = as_projection_record(value);

  const item_project_id = require_string(
    item.project_id,
    "pending_review_items.project_id",
    "project_id is required",
    errors
  );
  const continuity_id = require_string(
    item.continuity_id,
    "pending_review_items.continuity_id",
    "continuity_id is required",
    errors
  );
  const lifecycle_stage = require_string(
    item.lifecycle_stage,
    "pending_review_items.lifecycle_stage",
    "pending_review_items.lifecycle_stage must remain a non-empty bounded field.",
    errors
  );
  const lifecycle_label = require_string(
    item.lifecycle_label,
    "pending_review_items.lifecycle_label",
    "pending_review_items.lifecycle_label must remain a non-empty bounded field.",
    errors
  );
  const history_summary = require_string(
    item.history_summary,
    "pending_review_items.history_summary",
    "pending_review_items.history_summary must remain a non-empty bounded field.",
    errors
  );
  const review_posture = require_string(
    item.review_posture,
    "pending_review_items.review_posture",
    "pending_review_items.review_posture must remain a non-empty bounded field.",
    errors
  );
  const non_executing_posture = require_string(
    item.non_executing_posture,
    "pending_review_items.non_executing_posture",
    "pending_review_items.non_executing_posture must remain a non-empty bounded field.",
    errors
  );

  if (item_project_id !== project_id) {
    errors.push("pending_review_items.project_id must match projection project_id");
  }

  if (item.runtime_private_fields_omitted !== true) {
    errors.push("pending_review_items.runtime_private_fields_omitted must be true");
  }

  return {
    project_id: item_project_id,
    continuity_id,
    lifecycle_stage,
    lifecycle_label,
    history_summary,
    evidence_gap_summary: optional_string(
      item.evidence_gap_summary,
      "pending_review_items.evidence_gap_summary",
      errors
    ),
    review_posture,
    non_executing_posture,
    safe_evidence_refs: validate_safe_evidence_refs(
      item.safe_evidence_refs,
      "pending_review_items.safe_evidence_refs",
      errors
    ),
    runtime_private_fields_omitted: true,
  };
}

function normalize_pending_review_items(
  value: unknown,
  project_id: string,
  errors: string[]
): SoloCrewPendingReviewItemView[] {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value)) {
    errors.push("pending_review_items must be an array");
    return [];
  }

  return value.map((item) => normalize_pending_review_item(item, project_id, errors));
}

function validate_base_projection(
  input: ProjectionRecord,
  errors: string[]
): {
  project_id: string;
  continuity_id: string;
  lifecycle_stage: string;
  lifecycle_label: string;
  history_summary: string;
  evidence_gap_summary?: string;
  review_posture: string;
  non_executing_posture: string;
  safe_evidence_refs: string[];
} {
  const project_id = require_string(
    input.project_id,
    "project_id",
    "project_id is required",
    errors
  );
  const continuity_id = require_string(
    input.continuity_id,
    "continuity_id",
    "continuity_id is required",
    errors
  );
  const lifecycle_stage = require_string(
    input.lifecycle_stage,
    "lifecycle_stage",
    "lifecycle_stage must remain a non-empty bounded field.",
    errors
  );
  const lifecycle_label = require_string(
    input.lifecycle_label,
    "lifecycle_label",
    "lifecycle_label must remain a non-empty bounded field.",
    errors
  );
  const history_summary = require_string(
    input.history_summary,
    "history_summary",
    "history_summary must remain a non-empty bounded field.",
    errors
  );
  const review_posture = require_string(
    input.review_posture,
    "review_posture",
    "review_posture must remain a non-empty bounded field.",
    errors
  );
  const non_executing_posture = require_string(
    input.non_executing_posture,
    "non_executing_posture",
    "non_executing_posture must remain a non-empty bounded field.",
    errors
  );

  if (input.runtime_private_fields_omitted !== true) {
    errors.push("runtime_private_fields_omitted must be true");
  }

  return {
    project_id,
    continuity_id,
    lifecycle_stage,
    lifecycle_label,
    history_summary,
    evidence_gap_summary: optional_string(
      input.evidence_gap_summary,
      "evidence_gap_summary",
      errors
    ),
    review_posture,
    non_executing_posture,
    safe_evidence_refs: validate_safe_evidence_refs(
      input.safe_evidence_refs,
      "safe_evidence_refs",
      errors
    ),
  };
}

export function adapt_lifecycle_continuity_projection(
  input: ProjectionRecord
): SoloCrewLifecycleContinuityView {
  const errors = [
    ...collect_forbidden_field_errors(input),
    ...collect_forbidden_string_errors(input),
  ];
  const normalized = validate_base_projection(input, errors);

  assert_valid(errors);

  return {
    ...normalized,
    runtime_private_fields_omitted: true,
  };
}

export function adapt_pending_review_projection(
  input: ProjectionRecord
): SoloCrewPendingReviewView {
  const errors = [
    ...collect_forbidden_field_errors(input),
    ...collect_forbidden_string_errors(input),
  ];
  const normalized = validate_base_projection(input, errors);
  const pending_review_items = normalize_pending_review_items(
    input.pending_review_items,
    normalized.project_id,
    errors
  );
  const pending_review_count = normalize_pending_review_count(
    input.pending_review_count,
    pending_review_items.length,
    errors
  );

  assert_valid(errors);

  return {
    ...normalized,
    pending_review_count,
    pending_review_items,
    runtime_private_fields_omitted: true,
  };
}

export function adapt_continuity_snapshot_projection(
  input: ProjectionRecord
): SoloCrewContinuitySnapshotView {
  const errors = [
    ...collect_forbidden_field_errors(input),
    ...collect_forbidden_string_errors(input),
  ];
  const normalized = validate_base_projection(input, errors);
  const pending_review_items = normalize_pending_review_items(
    input.pending_review_items,
    normalized.project_id,
    errors
  );
  const pending_review_count = normalize_pending_review_count(
    input.pending_review_count,
    pending_review_items.length,
    errors
  );

  assert_valid(errors);

  return {
    ...normalized,
    pending_review_count,
    pending_review_items,
    runtime_private_fields_omitted: true,
  };
}
