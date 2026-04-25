import type {
  SoloCrewExecutionBoundaryAcknowledgmentRequirementView,
  SoloCrewExecutionBoundaryCardView,
} from "../contracts/v1-8-execution-boundary-contract.ts";
import {
  V18_EXECUTION_BOUNDARY_SUMMARY,
} from "../contracts/v1-8-execution-boundary-contract.ts";

type ExecutionBoundaryRecord = Record<string, unknown>;

type ExecutionBoundarySafeEvidenceRefInput =
  | string
  | {
      evidence_ref: string;
      evidence_label?: string;
    };

export type V18ExecutionBoundaryAdapterInput = {
  execution_boundary_id: string;
  project_id: string;
  requirement_summary: {
    requirement_summary: string;
    non_executing_posture: string;
  };
  risk_warning: {
    risk_warning: string;
    non_executing_posture: string;
  };
  preflight_checklist: {
    preflight_checklist: string[];
    runtime_private_fields_omitted: true;
  };
  acknowledgment_requirement: {
    acknowledgment_required: boolean;
    acknowledgment_requirement: string;
    runtime_private_fields_omitted: true;
    non_executing_posture: string;
  };
  transition_posture: {
    non_executing_posture: string;
    provider_channel_execution_available: false;
    approval_dispatch_execution_available: false;
    queue_available: false;
    authoritative_transition_state_available: false;
    runtime_private_fields_omitted: true;
  };
  safe_evidence_refs?: ExecutionBoundarySafeEvidenceRefInput[];
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

const FORBIDDEN_AUTHORITATIVE_FIELDS = [
  "authoritative_acknowledgment_state",
  "authoritative_transition_state",
  "authoritative_confirmation_transition_state",
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
    phrase: "authoritative acknowledgment",
    message: "forbidden authoritative wording",
  },
  {
    phrase: "authoritative transition state",
    message: "forbidden authoritative wording",
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

function as_record(value: unknown): ExecutionBoundaryRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as ExecutionBoundaryRecord;
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

    if ((FORBIDDEN_AUTHORITATIVE_FIELDS as readonly string[]).includes(key)) {
      target.push(`forbidden authoritative field: ${key}`);
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
  input: V18ExecutionBoundaryAdapterInput
): {
  execution_boundary_id: string;
  project_id: string;
  requirement_summary: string;
  requirement_non_executing_posture: string;
  risk_warning: string;
  risk_non_executing_posture: string;
  preflight_checklist: string[];
  acknowledgment_required: boolean;
  acknowledgment_requirement: string;
  acknowledgment_non_executing_posture: string;
  transition_posture_non_executing: string;
  safe_evidence_refs: string[];
} {
  const errors = [
    ...collect_forbidden_field_errors(input),
    ...collect_forbidden_string_errors(input),
  ];

  const requirement_summary = as_record(input.requirement_summary);
  const risk_warning = as_record(input.risk_warning);
  const preflight_checklist = as_record(input.preflight_checklist);
  const acknowledgment_requirement = as_record(input.acknowledgment_requirement);
  const transition_posture = as_record(input.transition_posture);

  const execution_boundary_id = require_string(
    input.execution_boundary_id,
    "execution_boundary_id is required",
    errors
  );
  const project_id = require_string(
    input.project_id,
    "project_id is required",
    errors
  );
  const requirement_summary_text = require_string(
    requirement_summary.requirement_summary,
    "requirement_summary.requirement_summary is required",
    errors
  );
  const requirement_non_executing_posture = require_string(
    requirement_summary.non_executing_posture,
    "requirement_summary.non_executing_posture is required",
    errors
  );
  const risk_warning_text = require_string(
    risk_warning.risk_warning,
    "risk_warning.risk_warning is required",
    errors
  );
  const risk_non_executing_posture = require_string(
    risk_warning.non_executing_posture,
    "risk_warning.non_executing_posture is required",
    errors
  );

  ensure_runtime_private_fields_omitted(
    input.runtime_private_fields_omitted,
    "runtime_private_fields_omitted",
    errors
  );
  ensure_runtime_private_fields_omitted(
    preflight_checklist.runtime_private_fields_omitted,
    "preflight_checklist.runtime_private_fields_omitted",
    errors
  );
  ensure_runtime_private_fields_omitted(
    acknowledgment_requirement.runtime_private_fields_omitted,
    "acknowledgment_requirement.runtime_private_fields_omitted",
    errors
  );
  ensure_runtime_private_fields_omitted(
    transition_posture.runtime_private_fields_omitted,
    "transition_posture.runtime_private_fields_omitted",
    errors
  );

  let preflight_checklist_items: string[] = [];
  if (!Array.isArray(preflight_checklist.preflight_checklist)) {
    errors.push("preflight_checklist.preflight_checklist must be an array");
  } else {
    preflight_checklist_items = preflight_checklist.preflight_checklist
      .map((value, index) =>
        require_string(
          value,
          `preflight_checklist.preflight_checklist[${index}] is required`,
          errors
        )
      )
      .filter((value) => value.length > 0);
  }

  if (typeof acknowledgment_requirement.acknowledgment_required !== "boolean") {
    errors.push(
      "acknowledgment_requirement.acknowledgment_required is required"
    );
  }

  const acknowledgment_requirement_text = require_string(
    acknowledgment_requirement.acknowledgment_requirement,
    "acknowledgment_requirement.acknowledgment_requirement is required",
    errors
  );
  const acknowledgment_non_executing_posture = require_string(
    acknowledgment_requirement.non_executing_posture,
    "acknowledgment_requirement.non_executing_posture is required",
    errors
  );
  const transition_posture_non_executing = require_string(
    transition_posture.non_executing_posture,
    "transition_posture.non_executing_posture is required",
    errors
  );

  if (transition_posture.provider_channel_execution_available !== false) {
    errors.push(
      "transition_posture.provider_channel_execution_available must be false"
    );
  }
  if (transition_posture.approval_dispatch_execution_available !== false) {
    errors.push(
      "transition_posture.approval_dispatch_execution_available must be false"
    );
  }
  if (transition_posture.queue_available !== false) {
    errors.push("transition_posture.queue_available must be false");
  }
  if (transition_posture.authoritative_transition_state_available !== false) {
    errors.push(
      "transition_posture.authoritative_transition_state_available must be false"
    );
  }

  const safe_evidence_refs = normalize_safe_evidence_refs(
    input.safe_evidence_refs,
    errors
  );

  assert_valid(errors);

  return {
    execution_boundary_id,
    project_id,
    requirement_summary: requirement_summary_text,
    requirement_non_executing_posture,
    risk_warning: risk_warning_text,
    risk_non_executing_posture,
    preflight_checklist: preflight_checklist_items,
    acknowledgment_required:
      acknowledgment_requirement.acknowledgment_required as boolean,
    acknowledgment_requirement: acknowledgment_requirement_text,
    acknowledgment_non_executing_posture,
    transition_posture_non_executing,
    safe_evidence_refs,
  };
}

function build_acknowledgment_requirement(
  acknowledgment_required: boolean,
  acknowledgment_requirement: string
): SoloCrewExecutionBoundaryAcknowledgmentRequirementView {
  return {
    acknowledgment_required,
    acknowledgment_requirement:
      `${acknowledgment_required ? "Acknowledgment required." : "Acknowledgment currently not required."} ${acknowledgment_requirement}`.trim(),
  };
}

export function adapt_v1_8_execution_boundary_card(
  input: V18ExecutionBoundaryAdapterInput
): SoloCrewExecutionBoundaryCardView {
  const normalized = validate_base_input(input);
  const display_only_posture =
    "Display-only execution-boundary. Human-visible review surface only.";
  const non_executing_posture =
    `${normalized.transition_posture_non_executing} This slice is non-approval-automation, non-dispatching, non-provider, and non-queueing.`.trim();
  const non_authoritative_posture =
    "Non-authoritative execution-boundary. No acknowledgment is captured and no transition state is recorded.";

  return {
    project_id: normalized.project_id,
    execution_boundary_id: normalized.execution_boundary_id,
    requirement_summary: {
      requirement_summary: normalized.requirement_summary,
    },
    risk_warning: {
      risk_warning: normalized.risk_warning,
    },
    preflight_checklist: {
      preflight_checklist: normalized.preflight_checklist,
    },
    acknowledgment_requirement: build_acknowledgment_requirement(
      normalized.acknowledgment_required,
      normalized.acknowledgment_requirement
    ),
    transition_posture: {
      transition_posture:
        `${normalized.transition_posture_non_executing} ${normalized.requirement_non_executing_posture} ${normalized.risk_non_executing_posture} ${normalized.acknowledgment_non_executing_posture}`.trim(),
    },
    safe_evidence_refs:
      normalized.safe_evidence_refs.length > 0
        ? normalized.safe_evidence_refs
        : undefined,
    runtime_private_fields_omitted: true,
    display_only_posture,
    non_executing_posture,
    non_authoritative_posture:
      `${non_authoritative_posture} ${V18_EXECUTION_BOUNDARY_SUMMARY}`.trim(),
  };
}
