import { createHash } from "node:crypto";

import type {
  FounderRequestIntakeObject,
} from "../../app/shell/founder-request-intake-contract.ts";

function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function unique_strings(values: unknown[] = []): string[] {
  return [...new Set(
    values.filter(
      (value): value is string => typeof value === "string" && value.length > 0
    )
  )].sort();
}

function stable_stringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stable_stringify(item)).join(",")}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value).sort(([left], [right]) =>
      left.localeCompare(right)
    );
    return `{${entries
      .map(([key, nested]) => `${JSON.stringify(key)}:${stable_stringify(nested)}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}

function deterministic_id(prefix: string, seed: string): string {
  return `${prefix}_${createHash("sha1").update(seed).digest("hex").slice(0, 16)}`;
}

function assert_non_empty_string(value: string, field_name: string): void {
  if (value.trim().length === 0) {
    throw new Error(`${field_name} must remain a non-empty bounded field.`);
  }
}

export type FounderRequestIntakeProjectScopedObject =
  FounderRequestIntakeObject & {
    project_id: string;
  };

export type SoloCrewProjectionSafeStateExposure = {
  projection_id?: string;
  project_id: string;
  source_runtime_ref?: string;
  state_summary: {
    transition_accepted: boolean;
    terminal: boolean;
    blocked_reason?: string;
    initial_state?: string;
    transition_event?: string;
    requested_next_state?: string;
    evaluated_next_state?: string;
    final_state?: string;
  };
  non_executing: true;
};

export type SoloCrewEvidencePostureSummary = {
  evidence_summary_id?: string;
  project_id: string;
  evidence_available: boolean;
  evidence_refs?: string[];
  evidence_summary: string;
  stale: boolean;
  insufficient: boolean;
  omission_reason?: string;
};

export type SoloCrewNonExecutingRecommendationEnvelope = {
  recommendation_id?: string;
  project_id: string;
  recommendation_summary: string;
  recommended_next_posture?: string;
  allowed_next_step?: string;
  blocked_actions: string[];
  non_executing: true;
  requires_later_authorization: true;
};

export type SoloCrewProjectionSummaryEnvelope = {
  projection_summary_id: string;
  project_id: string;
  state_exposure?: SoloCrewProjectionSafeStateExposure;
  evidence_posture?: SoloCrewEvidencePostureSummary;
  recommendation?: SoloCrewNonExecutingRecommendationEnvelope;
  source_refs: string[];
  non_executing: true;
  runtime_private_fields_omitted: true;
};

export type FounderRequestIntakeToPacketCandidate = {
  packet_candidate_id: string;
  project_id: string;
  request_ref: string;
  projection_summary_ref: string;
  review_posture: "review_needed" | "return_for_revision" | "blocked_by_contract";
  staging_posture:
    | "packet_candidate"
    | "evidence_insufficient"
    | "stale_context"
    | "blocked_by_contract";
  evidence_posture: {
    evidence_available: boolean;
    stale: boolean;
    insufficient: boolean;
    evidence_summary: string;
    omission_reason?: string;
  };
  state_interpretation: {
    transition_accepted_is_approval: false;
    terminal_is_execution_complete: false;
    blocked_reason_is_rejection: false;
  };
  recommendation: {
    summary: string;
    non_executing: true;
    blocked_actions: string[];
    requires_later_authorization: true;
  };
  boundaries: {
    provider_channel_execution: false;
    approve_reject_dispatch_execute: false;
    founder_queue: false;
    raw_runtime_private_dependency: false;
  };
};

export const FOUNDER_REQUEST_INTAKE_TO_PACKET_FORBIDDEN_RAW_KEYS = [
  "raw_vsl",
  "raw_psg",
  "raw_trace",
  "drift_record",
  "learning_candidate",
  "provider_channel_result",
  "product_dto",
  "runtime_store",
  "runtime_private_object",
] as const;

const FORBIDDEN_POSITIVE_EXECUTION_LABELS = [
  "approved",
  "rejected",
  "dispatched",
  "executed",
  "provider_sent",
  "channel_published",
] as const;

const FORBIDDEN_DIRECT_ACTION_LABELS = [
  "approve",
  "reject",
  "dispatch",
  "execute",
  "provider_channel_send",
] as const;

const CANONICAL_BLOCKED_ACTIONS = [
  "approve",
  "reject",
  "dispatch",
  "execute",
  "provider_channel_send",
] as const;

function collect_forbidden_raw_key_errors(
  value: unknown,
  path = "input",
  target: string[] = []
): string[] {
  if (!value || typeof value !== "object") {
    return target;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collect_forbidden_raw_key_errors(item, `${path}[${index}]`, target);
    });
    return target;
  }

  for (const [key, nested] of Object.entries(value)) {
    if (
      (FOUNDER_REQUEST_INTAKE_TO_PACKET_FORBIDDEN_RAW_KEYS as readonly string[]).includes(
        key
      )
    ) {
      target.push(`forbidden raw runtime-like key at ${path}.${key}`);
    }
    collect_forbidden_raw_key_errors(nested, `${path}.${key}`, target);
  }

  return target;
}

function collect_forbidden_label_errors(
  value: unknown,
  path = "input",
  allow_blocked_actions = false,
  target: string[] = []
): string[] {
  if (typeof value === "string") {
    if (
      (FORBIDDEN_POSITIVE_EXECUTION_LABELS as readonly string[]).includes(value)
    ) {
      target.push(`forbidden execution label at ${path}: ${value}`);
      return target;
    }

    if (
      !allow_blocked_actions &&
      (FORBIDDEN_DIRECT_ACTION_LABELS as readonly string[]).includes(value)
    ) {
      target.push(`forbidden action label at ${path}: ${value}`);
    }
    return target;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collect_forbidden_label_errors(
        item,
        `${path}[${index}]`,
        allow_blocked_actions,
        target
      );
    });
    return target;
  }

  if (!value || typeof value !== "object") {
    return target;
  }

  for (const [key, nested] of Object.entries(value)) {
    collect_forbidden_label_errors(
      nested,
      `${path}.${key}`,
      key === "blocked_actions",
      target
    );
  }

  return target;
}

function collect_nested_project_mismatch_errors(
  projection_summary: SoloCrewProjectionSummaryEnvelope,
  target: string[] = []
): string[] {
  if (
    projection_summary.state_exposure &&
    projection_summary.state_exposure.project_id !== projection_summary.project_id
  ) {
    target.push(
      "state_exposure.project_id must match projection_summary.project_id"
    );
  }

  if (
    projection_summary.evidence_posture &&
    projection_summary.evidence_posture.project_id !== projection_summary.project_id
  ) {
    target.push(
      "evidence_posture.project_id must match projection_summary.project_id"
    );
  }

  if (
    projection_summary.recommendation &&
    projection_summary.recommendation.project_id !== projection_summary.project_id
  ) {
    target.push(
      "recommendation.project_id must match projection_summary.project_id"
    );
  }

  return target;
}

function validate_founder_request_input(
  request: FounderRequestIntakeProjectScopedObject
): void {
  assert_non_empty_string(request.project_id, "request.project_id");
  assert_non_empty_string(request.founder_request_id, "request.founder_request_id");
  assert_non_empty_string(request.request_label, "request.request_label");
  assert_non_empty_string(request.request_text, "request.request_text");
  assert_non_empty_string(request.created_at, "request.created_at");

  if (request.non_executing !== true) {
    throw new Error("request.non_executing must be true");
  }
}

function validate_projection_summary(
  projection_summary: SoloCrewProjectionSummaryEnvelope
): void {
  assert_non_empty_string(
    projection_summary.project_id,
    "projection_summary.project_id"
  );
  assert_non_empty_string(
    projection_summary.projection_summary_id,
    "projection_summary.projection_summary_id"
  );

  const errors = [
    ...collect_forbidden_raw_key_errors(projection_summary, "projection_summary"),
    ...collect_forbidden_label_errors(projection_summary, "projection_summary"),
    ...collect_nested_project_mismatch_errors(projection_summary),
  ];

  if (projection_summary.non_executing !== true) {
    errors.push("projection_summary.non_executing must be true");
  }

  if (projection_summary.runtime_private_fields_omitted !== true) {
    errors.push("projection_summary.runtime_private_fields_omitted must be true");
  }

  if (
    projection_summary.state_exposure &&
    projection_summary.state_exposure.non_executing !== true
  ) {
    errors.push("state_exposure.non_executing must be true");
  }

  if (
    projection_summary.recommendation &&
    projection_summary.recommendation.non_executing !== true
  ) {
    errors.push("recommendation.non_executing must be true");
  }

  if (
    projection_summary.recommendation &&
    projection_summary.recommendation.requires_later_authorization !== true
  ) {
    errors.push("recommendation.requires_later_authorization must be true");
  }

  if (errors.length > 0) {
    throw new Error([...new Set(errors)].sort().join("; "));
  }
}

function derive_review_posture(
  evidence_posture: FounderRequestIntakeToPacketCandidate["evidence_posture"]
): FounderRequestIntakeToPacketCandidate["review_posture"] {
  if (evidence_posture.insufficient || evidence_posture.stale) {
    return "return_for_revision";
  }

  return "review_needed";
}

function derive_staging_posture(
  evidence_posture: FounderRequestIntakeToPacketCandidate["evidence_posture"]
): FounderRequestIntakeToPacketCandidate["staging_posture"] {
  if (evidence_posture.insufficient) {
    return "evidence_insufficient";
  }

  if (evidence_posture.stale) {
    return "stale_context";
  }

  return "packet_candidate";
}

export function adaptFounderRequestIntakeToPacketCandidate(input: {
  request: FounderRequestIntakeProjectScopedObject;
  projection_summary: SoloCrewProjectionSummaryEnvelope;
}): FounderRequestIntakeToPacketCandidate {
  validate_founder_request_input(input.request);
  validate_projection_summary(input.projection_summary);

  if (input.request.project_id !== input.projection_summary.project_id) {
    throw new Error(
      "request.project_id must match projection_summary.project_id"
    );
  }

  const evidence_posture = {
    evidence_available:
      input.projection_summary.evidence_posture?.evidence_available ?? false,
    stale: input.projection_summary.evidence_posture?.stale ?? false,
    insufficient: input.projection_summary.evidence_posture?.insufficient ?? false,
    evidence_summary:
      input.projection_summary.evidence_posture?.evidence_summary ??
      "No bounded evidence summary is available.",
    omission_reason: input.projection_summary.evidence_posture?.omission_reason,
  } satisfies FounderRequestIntakeToPacketCandidate["evidence_posture"];

  const review_posture = derive_review_posture(evidence_posture);
  const staging_posture = derive_staging_posture(evidence_posture);
  const blocked_actions = unique_strings(
    input.projection_summary.recommendation?.blocked_actions ??
      [...CANONICAL_BLOCKED_ACTIONS]
  );
  const packet_candidate_id = deterministic_id(
    "packet_candidate",
    stable_stringify({
      project_id: input.request.project_id,
      founder_request_id: input.request.founder_request_id,
      projection_summary_id: input.projection_summary.projection_summary_id,
      staging_posture,
      review_posture,
    })
  );

  return {
    packet_candidate_id,
    project_id: input.request.project_id,
    request_ref: input.request.founder_request_id,
    projection_summary_ref: input.projection_summary.projection_summary_id,
    review_posture,
    staging_posture,
    evidence_posture,
    state_interpretation: {
      transition_accepted_is_approval: false,
      terminal_is_execution_complete: false,
      blocked_reason_is_rejection: false,
    },
    recommendation: {
      summary:
        input.projection_summary.recommendation?.recommendation_summary ??
        "No bounded non-executing recommendation summary is available.",
      non_executing: true,
      blocked_actions,
      requires_later_authorization: true,
    },
    boundaries: {
      provider_channel_execution: false,
      approve_reject_dispatch_execute: false,
      founder_queue: false,
      raw_runtime_private_dependency: false,
    },
  };
}
