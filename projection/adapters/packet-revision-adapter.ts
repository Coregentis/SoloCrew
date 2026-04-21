import type {
  PacketEvidenceGap,
  PacketEvidenceGapCategory,
  PacketRevisionCandidate,
  PacketRevisionReason,
  PacketRevisionStatus,
} from "../contracts/packet-revision-contract.ts";
import {
  PACKET_REVISION_BOUNDARY_SUMMARY,
} from "../contracts/packet-revision-contract.ts";

function unique_strings(values: unknown[] = []): string[] {
  return [...new Set(
    values.filter(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 0
    )
      .map((value) => value.trim())
  )].sort();
}

function add_non_empty_string_error(
  value: string,
  field_name: string,
  target: string[]
): void {
  if (value.trim().length === 0) {
    target.push(`${field_name} must remain a non-empty bounded field.`);
  }
}

export const PACKET_REVISION_FORBIDDEN_RAW_KEYS = [
  "raw_vsl",
  "raw_psg",
  "raw_trace",
  "drift_record",
  "learning_candidate",
  "provider_channel_result",
  "runtime_store",
  "runtime_private_object",
  "raw_cognitive_os_runtime_internals",
  "runtime_private_fields",
  "runtime_private_payload",
  "raw_runtime_private_payload",
  "runtime_private_trace",
] as const;

const PACKET_REVISION_ALLOWED_REASONS = [
  "insufficient_evidence",
  "stale_context",
  "operator_clarification",
  "contract_blocked",
  "other",
] as const;

const PACKET_REVISION_ALLOWED_GAP_CATEGORIES = [
  "missing_required_context",
  "stale_context",
  "conflicting_evidence",
  "runtime_private_omitted",
  "other",
] as const;

const FORBIDDEN_DIRECT_ACTION_LABELS = [
  "approve",
  "reject",
  "dispatch",
  "execute",
  "provider_channel_send",
  "founder_queue",
] as const;

const FORBIDDEN_POSITIVE_LABELS = [
  "approved",
  "rejected",
  "dispatched",
  "executed",
  "provider_sent",
  "channel_published",
  "approved revision",
  "execution ready",
  "dispatch-ready",
  "approval granted",
  "execution completed",
] as const;

const FORBIDDEN_STRING_PHRASES = [
  {
    phrase: "provider/channel execution",
    message: "forbidden provider/channel wording",
  },
  {
    phrase: "provider/channel send",
    message: "forbidden provider/channel wording",
  },
  {
    phrase: "proof/certification",
    message: "forbidden proof/certification wording",
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
    phrase: "founder queue",
    message: "forbidden founder queue wording",
  },
] as const;

export type CreatePacketRevisionCandidateInput = {
  project_id: string;
  previous_packet_candidate_id: string;
  revision_id: string;
  previous_projection_summary_id: string;
  resulting_projection_summary_id?: string;
  revision_reason: PacketRevisionReason;
  revision_input_summary: string;
  evidence_insufficiency?: {
    detail_id: string;
    project_id: string;
    evidence_available: boolean;
    insufficient: boolean;
    stale: boolean;
    insufficiency_category?: PacketEvidenceGapCategory;
    omission_reason?: string;
    required_evidence_class?: string;
    safe_evidence_refs?: string[];
    safe_clarification_prompt?: string;
    non_executing: true;
    runtime_private_fields_omitted: true;
  };
  non_executing: true;
  runtime_private_fields_omitted: true;
};

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
      (PACKET_REVISION_FORBIDDEN_RAW_KEYS as readonly string[]).includes(key)
    ) {
      target.push(`forbidden raw runtime-like key at ${path}.${key}`);
    }
    collect_forbidden_raw_key_errors(nested, `${path}.${key}`, target);
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
      (FORBIDDEN_POSITIVE_LABELS as readonly string[]).includes(normalized)
    ) {
      target.push(`forbidden execution label at ${path}: ${value}`);
      return target;
    }

    if (
      (FORBIDDEN_DIRECT_ACTION_LABELS as readonly string[]).includes(normalized)
    ) {
      target.push(`forbidden action label at ${path}: ${value}`);
      return target;
    }

    for (const rule of FORBIDDEN_STRING_PHRASES) {
      if (normalized.includes(rule.phrase)) {
        target.push(`${rule.message} at ${path}`);
      }
    }

    return target;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collect_forbidden_string_errors(item, `${path}[${index}]`, target);
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

function validate_evidence_insufficiency(
  evidence_insufficiency: NonNullable<
    CreatePacketRevisionCandidateInput["evidence_insufficiency"]
  >,
  project_id: string
): void {
  const errors = [
    ...collect_forbidden_raw_key_errors(
      evidence_insufficiency,
      "input.evidence_insufficiency"
    ),
    ...collect_forbidden_string_errors(
      evidence_insufficiency,
      "input.evidence_insufficiency"
    ),
  ];

  add_non_empty_string_error(
    evidence_insufficiency.detail_id,
    "input.evidence_insufficiency.detail_id",
    errors
  );
  add_non_empty_string_error(
    evidence_insufficiency.project_id,
    "input.evidence_insufficiency.project_id",
    errors
  );

  if (evidence_insufficiency.project_id !== project_id) {
    errors.push("evidence_insufficiency.project_id must match input.project_id");
  }

  if (typeof evidence_insufficiency.evidence_available !== "boolean") {
    errors.push("evidence_insufficiency.evidence_available must be boolean");
  }

  if (typeof evidence_insufficiency.insufficient !== "boolean") {
    errors.push("evidence_insufficiency.insufficient must be boolean");
  }

  if (typeof evidence_insufficiency.stale !== "boolean") {
    errors.push("evidence_insufficiency.stale must be boolean");
  }

  if (
    evidence_insufficiency.insufficiency_category !== undefined &&
    !(
      PACKET_REVISION_ALLOWED_GAP_CATEGORIES as readonly string[]
    ).includes(evidence_insufficiency.insufficiency_category)
  ) {
    errors.push(
      "evidence_insufficiency.insufficiency_category must be one of missing_required_context, stale_context, conflicting_evidence, runtime_private_omitted, other"
    );
  }

  if (
    evidence_insufficiency.safe_evidence_refs !== undefined &&
    !Array.isArray(evidence_insufficiency.safe_evidence_refs)
  ) {
    errors.push("evidence_insufficiency.safe_evidence_refs must be an array");
  }

  if (Array.isArray(evidence_insufficiency.safe_evidence_refs)) {
    evidence_insufficiency.safe_evidence_refs.forEach((value, index) => {
      if (typeof value !== "string") {
        errors.push(
          `evidence_insufficiency.safe_evidence_refs[${index}] must be a string`
        );
        return;
      }

      if (value.trim().length === 0) {
        errors.push(
          `evidence_insufficiency.safe_evidence_refs[${index}] must remain a non-empty bounded field.`
        );
      }
    });
  }

  if (evidence_insufficiency.non_executing !== true) {
    errors.push("evidence_insufficiency.non_executing must be true");
  }

  if (evidence_insufficiency.runtime_private_fields_omitted !== true) {
    errors.push(
      "evidence_insufficiency.runtime_private_fields_omitted must be true"
    );
  }

  if (errors.length > 0) {
    throw new Error([...new Set(errors)].sort().join("; "));
  }
}

function derive_evidence_gap_summary(
  evidence_insufficiency: NonNullable<
    CreatePacketRevisionCandidateInput["evidence_insufficiency"]
  >
): string {
  if (evidence_insufficiency.omission_reason?.trim()) {
    return `evidence gap: ${evidence_insufficiency.omission_reason.trim()}`;
  }

  if (evidence_insufficiency.insufficient && evidence_insufficiency.stale) {
    return "evidence gap: stale context and insufficient bounded evidence remain before review.";
  }

  if (evidence_insufficiency.insufficient) {
    if (evidence_insufficiency.required_evidence_class?.trim()) {
      return `evidence gap: missing ${evidence_insufficiency.required_evidence_class.trim()} before review.`;
    }

    return "evidence gap: missing required bounded context before review.";
  }

  if (evidence_insufficiency.stale) {
    return "evidence gap: stale context needs refresh before review.";
  }

  if (!evidence_insufficiency.evidence_available) {
    return "evidence gap: bounded evidence is not currently available.";
  }

  if (evidence_insufficiency.insufficiency_category === "conflicting_evidence") {
    return "evidence gap: conflicting bounded evidence needs clarification before review.";
  }

  if (
    evidence_insufficiency.insufficiency_category === "runtime_private_omitted"
  ) {
    return "evidence gap: runtime-private details remain omitted from the bounded summary.";
  }

  return "evidence gap: bounded clarification is still needed before review.";
}

function derive_revision_status(args: {
  revision_reason: PacketRevisionReason;
  resulting_projection_summary_id?: string;
  evidence_gap?: PacketEvidenceGap;
  safe_clarification_prompt?: string;
}): PacketRevisionStatus {
  if (args.revision_reason === "contract_blocked") {
    return "blocked_by_contract";
  }

  if (args.evidence_gap?.insufficient && !args.safe_clarification_prompt) {
    return "needs_clarification";
  }

  if (args.evidence_gap && !args.resulting_projection_summary_id) {
    return "return_for_revision";
  }

  if (args.resulting_projection_summary_id) {
    return "ready_for_review";
  }

  return "revision_candidate_created";
}

export function createPacketRevisionCandidate(
  input: CreatePacketRevisionCandidateInput
): PacketRevisionCandidate {
  const errors = [
    ...collect_forbidden_raw_key_errors(input, "input"),
    ...collect_forbidden_string_errors(input, "input"),
  ];

  add_non_empty_string_error(input.project_id, "input.project_id", errors);
  add_non_empty_string_error(
    input.previous_packet_candidate_id,
    "input.previous_packet_candidate_id",
    errors
  );
  add_non_empty_string_error(input.revision_id, "input.revision_id", errors);
  add_non_empty_string_error(
    input.previous_projection_summary_id,
    "input.previous_projection_summary_id",
    errors
  );
  add_non_empty_string_error(
    input.revision_input_summary,
    "input.revision_input_summary",
    errors
  );

  if (
    input.resulting_projection_summary_id !== undefined &&
    input.resulting_projection_summary_id.trim().length === 0
  ) {
    errors.push(
      "input.resulting_projection_summary_id must remain a non-empty bounded field."
    );
  }

  if (
    !(PACKET_REVISION_ALLOWED_REASONS as readonly string[]).includes(
      input.revision_reason
    )
  ) {
    errors.push(
      "input.revision_reason must be one of insufficient_evidence, stale_context, operator_clarification, contract_blocked, other"
    );
  }

  if (input.non_executing !== true) {
    errors.push("input.non_executing must be true");
  }

  if (input.runtime_private_fields_omitted !== true) {
    errors.push("input.runtime_private_fields_omitted must be true");
  }

  if (errors.length > 0) {
    throw new Error([...new Set(errors)].sort().join("; "));
  }

  if (input.evidence_insufficiency) {
    validate_evidence_insufficiency(input.evidence_insufficiency, input.project_id);
  }

  const safe_clarification_prompt =
    input.evidence_insufficiency?.safe_clarification_prompt?.trim() || undefined;
  const resulting_projection_summary_id =
    input.resulting_projection_summary_id?.trim() || undefined;
  const evidence_gap = input.evidence_insufficiency
    ? {
        gap_id: input.evidence_insufficiency.detail_id,
        project_id: input.project_id,
        evidence_available: input.evidence_insufficiency.evidence_available,
        insufficient: input.evidence_insufficiency.insufficient,
        stale: input.evidence_insufficiency.stale,
        gap_category: input.evidence_insufficiency.insufficiency_category,
        user_visible_summary: derive_evidence_gap_summary(
          input.evidence_insufficiency
        ),
        safe_evidence_refs: unique_strings(
          input.evidence_insufficiency.safe_evidence_refs ?? []
        ),
        not_proof: true,
      }
    : undefined;

  const revision_status = derive_revision_status({
    revision_reason: input.revision_reason,
    resulting_projection_summary_id,
    evidence_gap,
    safe_clarification_prompt,
  });

  return {
    revision_candidate_id: input.revision_id,
    project_id: input.project_id,
    previous_packet_candidate_id: input.previous_packet_candidate_id,
    revised_packet_candidate_id: resulting_projection_summary_id,
    revision_reason: input.revision_reason,
    revision_input_summary: input.revision_input_summary.trim(),
    evidence_gap,
    safe_clarification_prompt,
    revision_status,
    review_only: true,
    non_executing: true,
    boundary_summary: PACKET_REVISION_BOUNDARY_SUMMARY,
    interpretation_guards: {
      revision_candidate_is_approval: false,
      return_for_revision_is_rejection: false,
      revised_packet_is_execution: false,
      evidence_gap_is_proof: false,
      safe_clarification_prompt_is_provider_channel_send: false,
    },
  };
}
