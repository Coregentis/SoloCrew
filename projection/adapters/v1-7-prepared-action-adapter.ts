import type {
  SoloCrewPreparedActionCardView,
  SoloCrewPreparedActionConfirmationRequirementView,
  SoloCrewPreparedActionEvidenceSufficiencyState,
} from "../contracts/v1-7-prepared-action-contract.ts";
import {
  V17_PREPARED_ACTION_BOUNDARY_SUMMARY,
} from "../contracts/v1-7-prepared-action-contract.ts";

type PreparedActionRecord = Record<string, unknown>;

type PreparedActionSafeEvidenceRefInput =
  | string
  | {
      evidence_ref: string;
      evidence_label?: string;
    };

export type V17PreparedActionAdapterInput = {
  prepared_action_id: string;
  project_id: string;
  intent_summary: {
    action_label: string;
    action_summary: string;
    non_executing_posture: string;
  };
  risk_summary: {
    risk_summary: string;
    boundary_summary: string;
    non_executing_posture: string;
  };
  evidence_sufficiency: {
    sufficiency_state: SoloCrewPreparedActionEvidenceSufficiencyState;
    sufficiency_summary: string;
    runtime_private_fields_omitted: true;
  };
  missing_information: {
    missing_information_summary: string;
    missing_information_items: string[];
    runtime_private_fields_omitted: true;
  };
  confirmation_requirement: {
    confirmation_required: boolean;
    confirmation_summary: string;
    runtime_private_fields_omitted: true;
    non_executing_posture: string;
  };
  boundary_posture: {
    non_executing_posture: string;
    provider_channel_execution_available: false;
    approval_dispatch_execution_available: false;
    queue_available: false;
    runtime_private_fields_omitted: true;
  };
  safe_evidence_refs?: PreparedActionSafeEvidenceRefInput[];
  runtime_private_fields_omitted: true;
  created_at?: string;
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
  "execution_eligibility",
  "approval_status",
  "dispatch_status",
  "provider_channel_status",
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
    phrase: "provider send available",
    message: "forbidden provider/channel wording",
  },
  {
    phrase: "channel publish available",
    message: "forbidden provider/channel wording",
  },
  {
    phrase: "approve/reject/dispatch/execute available",
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
    phrase: "execution eligibility granted",
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
    phrase: "founder queue",
    message: "forbidden founder queue wording",
  },
  {
    phrase: "queue implementation available",
    message: "forbidden queue wording",
  },
  {
    phrase: "queue worker state",
    message: "forbidden queue wording",
  },
  {
    phrase: "autonomous company operation",
    message: "forbidden autonomy wording",
  },
  {
    phrase: "protocol certification",
    message: "forbidden protocol wording",
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

function as_record(value: unknown): PreparedActionRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as PreparedActionRecord;
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

function normalize_safe_evidence_refs(
  value: unknown,
  errors: string[]
): string[] {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value)) {
    errors.push("safe_evidence_refs must be an array");
    return [];
  }

  const refs: string[] = [];

  value.forEach((entry, index) => {
    if (typeof entry === "string") {
      if (entry.trim().length === 0) {
        errors.push(
          `safe_evidence_refs[${index}] must remain a non-empty bounded field.`
        );
        return;
      }

      refs.push(entry.trim());
      return;
    }

    const record = as_record(entry);
    const allowed_keys = ["evidence_ref", "evidence_label"];
    const unexpected_keys = Object.keys(record).filter(
      (key) => !allowed_keys.includes(key)
    );

    if (unexpected_keys.length > 0) {
      errors.push(`safe_evidence_refs[${index}] must remain reference-only.`);
      return;
    }

    const evidence_ref = require_string(
      record.evidence_ref,
      `safe_evidence_refs[${index}].evidence_ref is required`,
      errors
    );

    optional_string(
      record.evidence_label,
      `safe_evidence_refs[${index}].evidence_label`,
      errors
    );

    if (evidence_ref.length > 0) {
      refs.push(evidence_ref);
    }
  });

  return unique_strings(refs);
}

function ensure_runtime_private_fields_omitted(
  value: unknown,
  field_name: string,
  errors: string[]
): true {
  if (value !== true) {
    errors.push(`${field_name} must be true`);
  }

  return true;
}

function validate_base_input(
  input: V17PreparedActionAdapterInput
): {
  prepared_action_id: string;
  project_id: string;
  action_title: string;
  action_intent_summary: string;
  intent_non_executing_posture: string;
  risk_summary: string;
  boundary_summary: string;
  evidence_sufficiency_state: SoloCrewPreparedActionEvidenceSufficiencyState;
  evidence_sufficiency_summary: string;
  missing_information_summary: string;
  missing_information_items: string[];
  confirmation_required: boolean;
  confirmation_summary: string;
  confirmation_non_executing_posture: string;
  boundary_posture_non_executing: string;
  safe_evidence_refs: string[];
} {
  const errors = [
    ...collect_forbidden_field_errors(input),
    ...collect_forbidden_string_errors(input),
  ];

  const intent_summary = as_record(input.intent_summary);
  const risk_summary = as_record(input.risk_summary);
  const evidence_sufficiency = as_record(input.evidence_sufficiency);
  const missing_information = as_record(input.missing_information);
  const confirmation_requirement = as_record(input.confirmation_requirement);
  const boundary_posture = as_record(input.boundary_posture);

  const prepared_action_id = require_string(
    input.prepared_action_id,
    "prepared_action_id is required",
    errors
  );
  const project_id = require_string(
    input.project_id,
    "project_id is required",
    errors
  );
  const action_title = require_string(
    intent_summary.action_label,
    "intent_summary.action_label is required",
    errors
  );
  const action_intent_summary = require_string(
    intent_summary.action_summary,
    "intent_summary.action_summary is required",
    errors
  );
  const intent_non_executing_posture = require_string(
    intent_summary.non_executing_posture,
    "intent_summary.non_executing_posture is required",
    errors
  );
  const risk_summary_text = require_string(
    risk_summary.risk_summary,
    "risk_summary.risk_summary is required",
    errors
  );
  const boundary_summary = require_string(
    risk_summary.boundary_summary,
    "risk_summary.boundary_summary is required",
    errors
  );

  ensure_runtime_private_fields_omitted(
    input.runtime_private_fields_omitted,
    "runtime_private_fields_omitted",
    errors
  );
  ensure_runtime_private_fields_omitted(
    evidence_sufficiency.runtime_private_fields_omitted,
    "evidence_sufficiency.runtime_private_fields_omitted",
    errors
  );
  ensure_runtime_private_fields_omitted(
    missing_information.runtime_private_fields_omitted,
    "missing_information.runtime_private_fields_omitted",
    errors
  );
  ensure_runtime_private_fields_omitted(
    confirmation_requirement.runtime_private_fields_omitted,
    "confirmation_requirement.runtime_private_fields_omitted",
    errors
  );
  ensure_runtime_private_fields_omitted(
    boundary_posture.runtime_private_fields_omitted,
    "boundary_posture.runtime_private_fields_omitted",
    errors
  );

  if (
    evidence_sufficiency.sufficiency_state !== "insufficient" &&
    evidence_sufficiency.sufficiency_state !== "partial" &&
    evidence_sufficiency.sufficiency_state !== "sufficient"
  ) {
    errors.push("evidence_sufficiency.sufficiency_state is required");
  }

  const evidence_sufficiency_summary = require_string(
    evidence_sufficiency.sufficiency_summary,
    "evidence_sufficiency.sufficiency_summary is required",
    errors
  );
  const missing_information_summary = require_string(
    missing_information.missing_information_summary,
    "missing_information.missing_information_summary is required",
    errors
  );

  let missing_information_items: string[] = [];
  if (!Array.isArray(missing_information.missing_information_items)) {
    errors.push("missing_information.missing_information_items must be an array");
  } else {
    missing_information_items = missing_information.missing_information_items
      .map((value, index) =>
        require_string(
          value,
          `missing_information.missing_information_items[${index}] is required`,
          errors
        )
      )
      .filter((value) => value.length > 0);
  }

  if (typeof confirmation_requirement.confirmation_required !== "boolean") {
    errors.push("confirmation_requirement.confirmation_required is required");
  }

  const confirmation_summary = require_string(
    confirmation_requirement.confirmation_summary,
    "confirmation_requirement.confirmation_summary is required",
    errors
  );
  const confirmation_non_executing_posture = require_string(
    confirmation_requirement.non_executing_posture,
    "confirmation_requirement.non_executing_posture is required",
    errors
  );
  const boundary_posture_non_executing = require_string(
    boundary_posture.non_executing_posture,
    "boundary_posture.non_executing_posture is required",
    errors
  );

  if (boundary_posture.provider_channel_execution_available !== false) {
    errors.push(
      "boundary_posture.provider_channel_execution_available must be false"
    );
  }
  if (boundary_posture.approval_dispatch_execution_available !== false) {
    errors.push(
      "boundary_posture.approval_dispatch_execution_available must be false"
    );
  }
  if (boundary_posture.queue_available !== false) {
    errors.push("boundary_posture.queue_available must be false");
  }

  const safe_evidence_refs = normalize_safe_evidence_refs(
    input.safe_evidence_refs,
    errors
  );

  assert_valid(errors);

  return {
    prepared_action_id,
    project_id,
    action_title,
    action_intent_summary,
    intent_non_executing_posture,
    risk_summary: risk_summary_text,
    boundary_summary,
    evidence_sufficiency_state:
      evidence_sufficiency.sufficiency_state as SoloCrewPreparedActionEvidenceSufficiencyState,
    evidence_sufficiency_summary,
    missing_information_summary,
    missing_information_items,
    confirmation_required: confirmation_requirement.confirmation_required as boolean,
    confirmation_summary,
    confirmation_non_executing_posture,
    boundary_posture_non_executing,
    safe_evidence_refs,
  };
}

function build_confirmation_requirement(
  confirmation_required: boolean,
  confirmation_summary: string
): SoloCrewPreparedActionConfirmationRequirementView {
  return {
    confirmation_required,
    human_confirmation_requirement:
      `${confirmation_required ? "Human confirmation required." : "Human confirmation currently not required."} ${confirmation_summary}`,
  };
}

export function adapt_v1_7_prepared_action_card(
  input: V17PreparedActionAdapterInput
): SoloCrewPreparedActionCardView {
  const normalized = validate_base_input(input);
  const draft_only_posture =
    "Draft-only prepared action. Human-visible planning surface only.";
  const non_executing_posture =
    `${normalized.boundary_posture_non_executing} This slice is non-approving, non-dispatching, non-provider, and non-queueing.`;

  return {
    project_id: normalized.project_id,
    prepared_action_id: normalized.prepared_action_id,
    action_title: normalized.action_title,
    action_intent_summary: normalized.action_intent_summary,
    evidence_sufficiency: {
      sufficiency_state: normalized.evidence_sufficiency_state,
      evidence_sufficiency: normalized.evidence_sufficiency_summary,
    },
    missing_information: {
      missing_information: normalized.missing_information_summary,
      missing_information_items: normalized.missing_information_items,
    },
    risk_boundary_summary:
      `${normalized.risk_summary} ${normalized.boundary_summary}`.trim(),
    human_confirmation_requirement: build_confirmation_requirement(
      normalized.confirmation_required,
      normalized.confirmation_summary
    ),
    safe_evidence_refs:
      normalized.safe_evidence_refs.length > 0
        ? normalized.safe_evidence_refs
        : undefined,
    runtime_private_fields_omitted: true,
    draft_only_posture,
    non_executing_posture:
      `${non_executing_posture} ${normalized.intent_non_executing_posture} ${normalized.confirmation_non_executing_posture} ${V17_PREPARED_ACTION_BOUNDARY_SUMMARY}`.trim(),
  };
}
