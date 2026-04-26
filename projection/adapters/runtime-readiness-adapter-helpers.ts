import type {
  ProjectionUpstreamRef,
} from "../contracts/projection-object-types.ts";
import type {
  RuntimeActionClass,
  RuntimeActionReadinessStatus,
} from "../../runtime-imports/cognitive-runtime.ts";

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
  "execute_now",
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
    phrase: "provider execution",
    message: "forbidden provider wording",
  },
  {
    phrase: "channel execution",
    message: "forbidden channel wording",
  },
  {
    phrase: "provider/channel send",
    message: "forbidden provider/channel wording",
  },
  {
    phrase: "approved",
    message: "forbidden execution wording",
  },
  {
    phrase: "dispatched",
    message: "forbidden execution wording",
  },
  {
    phrase: "executed",
    message: "forbidden execution wording",
  },
  {
    phrase: "autonomous company",
    message: "forbidden autonomy wording",
  },
  {
    phrase: "autonomous operation available",
    message: "forbidden autonomy wording",
  },
  {
    phrase: "general availability",
    message: "forbidden ga wording",
  },
  {
    phrase: "protocol certification",
    message: "forbidden protocol wording",
  },
  {
    phrase: "payment",
    message: "forbidden irreversible wording",
  },
  {
    phrase: "trading",
    message: "forbidden irreversible wording",
  },
  {
    phrase: "purchase",
    message: "forbidden irreversible wording",
  },
] as const;

const FORBIDDEN_POSITIVE_CLAIM_RULES = [
  {
    pattern: /provider\/channel execution is available/i,
    message: "forbidden positive provider/channel claim",
  },
  {
    pattern: /provider execution is available/i,
    message: "forbidden positive provider claim",
  },
  {
    pattern: /channel execution is available/i,
    message: "forbidden positive channel claim",
  },
  {
    pattern: /autonomous company operation is available/i,
    message: "forbidden positive autonomous company claim",
  },
  {
    pattern: /autonomous operation is available/i,
    message: "forbidden positive autonomous operation claim",
  },
  {
    pattern: /V2_0_ALLOWED/i,
    message: "forbidden positive v2.0 allowance claim",
  },
] as const;

const FORBIDDEN_DIRECT_ACTION_LABELS = [
  "approve",
  "reject",
  "dispatch",
  "execute",
] as const;

export function unique_strings(values: unknown[] = []): string[] {
  return [...new Set(
    values.filter(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 0
    ).map((value) => value.trim())
  )].sort();
}

export function as_record(value: unknown): ProjectionRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as ProjectionRecord;
}

export function assert_valid(errors: string[]): void {
  if (errors.length === 0) {
    return;
  }

  throw new Error([...new Set(errors)].sort().join("; "));
}

export function require_string(
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

export function optional_string(
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

export function collect_forbidden_field_errors(
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
    if ((FORBIDDEN_RUNTIME_PRIVATE_FIELDS as readonly string[]).includes(key)) {
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

export function collect_forbidden_string_errors(
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

export function collect_forbidden_positive_claim_errors(
  value: unknown,
  path = "input",
  target: string[] = []
): string[] {
  if (typeof value === "string") {
    for (const rule of FORBIDDEN_POSITIVE_CLAIM_RULES) {
      if (rule.pattern.test(value)) {
        target.push(`${rule.message} at ${path}`);
      }
    }

    return target;
  }

  if (Array.isArray(value)) {
    value.forEach((entry, index) => {
      collect_forbidden_positive_claim_errors(
        entry,
        `${path}[${index}]`,
        target
      );
    });
    return target;
  }

  if (!value || typeof value !== "object") {
    return target;
  }

  for (const [key, nested] of Object.entries(value)) {
    collect_forbidden_positive_claim_errors(nested, `${path}.${key}`, target);
  }

  return target;
}

export function ensure_runtime_private_fields_omitted(
  value: unknown,
  errors: string[],
  field_name = "runtime_private_fields_omitted"
): true {
  if (value !== true) {
    errors.push(`${field_name} must be true`);
  }

  return true;
}

export function normalize_string_array(
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

export function stable_sort_by_key<TValue extends Record<string, unknown>>(
  values: TValue[],
  key: keyof TValue
): TValue[] {
  return [...values].sort((left, right) =>
    String(left[key] ?? "").localeCompare(String(right[key] ?? ""))
  );
}

export function create_runtime_projection_ref(args: {
  upstream_object_type: string;
  upstream_object_id: string;
  notes?: string[];
}): ProjectionUpstreamRef {
  return {
    source_repo: "Cognitive_OS",
    upstream_object_type: args.upstream_object_type,
    upstream_object_id: args.upstream_object_id,
    notes: args.notes ? [...args.notes] : undefined,
  };
}

export function ensure_action_readiness_matches_class(
  action_class: RuntimeActionClass,
  readiness_status: RuntimeActionReadinessStatus,
  blocked: boolean,
  errors: string[],
  field_name: string
): void {
  if (action_class === "forbidden_irreversible" && !(blocked || readiness_status === "blocked")) {
    errors.push(`${field_name} forbidden_irreversible must remain blocked`);
  }

  if (
    action_class === "limited_external_dispatch" &&
    !(readiness_status === "deferred" || readiness_status === "blocked")
  ) {
    errors.push(`${field_name} limited_external_dispatch must remain deferred or blocked`);
  }

  if (
    action_class === "external_draft" &&
    !(readiness_status === "needs_review" || readiness_status === "blocked")
  ) {
    errors.push(`${field_name} external_draft must remain needs_review or blocked`);
  }
}
