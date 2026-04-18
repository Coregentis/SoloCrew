function is_record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function is_string_array(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function join_parts(...parts: string[]): string {
  return parts.join("");
}

function tokenize_value(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9_]+/u)
    .filter((token) => token.length > 0);
}

const FOUNDER_REQUEST_PROJECTION_SUMMARY_AVAILABILITY_VALUES = [
  "available",
  "omitted_by_contract",
  "not_available_upstream",
  "insufficient_evidence",
  "stale",
  "not_applicable",
] as const;

export type FounderRequestProjectionSummaryAvailability =
  (typeof FOUNDER_REQUEST_PROJECTION_SUMMARY_AVAILABILITY_VALUES)[number];

export const FOUNDER_REQUEST_EXCEPTION_POSTURE_VALUES = [
  "no_exception",
  "monitor",
  "review_needed",
  "evidence_insufficient",
  "stale_context",
  "impact_detected",
  "activation_blocked",
  "confirm_required",
  "escalation_required",
  "return_for_revision",
  "blocked_by_contract",
] as const;

export type FounderRequestExceptionPosture =
  (typeof FOUNDER_REQUEST_EXCEPTION_POSTURE_VALUES)[number];

export const FOUNDER_REQUEST_EXCEPTION_PACKET_SUMMARY_FAMILIES = [
  "continuity_projection_summary",
  "semantic_relation_projection_summary",
  "drift_impact_projection_summary",
  "activation_projection_summary",
  "confirm_trace_decision_projection_summary",
  "learning_suggestion_projection_summary",
] as const;

export type FounderRequestExceptionPacketSummaryFamily =
  (typeof FOUNDER_REQUEST_EXCEPTION_PACKET_SUMMARY_FAMILIES)[number];

export interface FounderRequestProjectionEvidenceRef {
  ref_scope: "bounded_evidence_ref";
  ref_family: FounderRequestExceptionPacketSummaryFamily;
  ref_label: string;
}

interface FounderRequestProjectionSummaryBase<
  TFamily extends FounderRequestExceptionPacketSummaryFamily,
> {
  family: TFamily;
  availability: FounderRequestProjectionSummaryAvailability;
  summary_label: string;
  summary_notes: string[];
  evidence_refs?: FounderRequestProjectionEvidenceRef[];
}

export interface FounderRequestContinuityProjectionSummary
  extends FounderRequestProjectionSummaryBase<"continuity_projection_summary"> {
  continuation_label?: string;
  continuation_anchor_label?: string;
  freshness_posture?: "fresh" | "resume_ready" | "stale";
}

export interface FounderRequestSemanticRelationProjectionSummary
  extends FounderRequestProjectionSummaryBase<"semantic_relation_projection_summary"> {
  affected_object_labels?: string[];
  relation_change_summary?: string;
}

export interface FounderRequestDriftImpactProjectionSummary
  extends FounderRequestProjectionSummaryBase<"drift_impact_projection_summary"> {
  drift_kind_label?: string;
  impact_summary_label?: string;
  has_conflict_signal?: boolean;
}

export interface FounderRequestActivationProjectionSummary
  extends FounderRequestProjectionSummaryBase<"activation_projection_summary"> {
  activation_posture?:
    | "observe_only"
    | "confirm_gate"
    | "blocked"
    | "escalation_gate";
  recommendation_visibility?: "visible" | "hidden";
}

export interface FounderRequestConfirmTraceDecisionProjectionSummary
  extends FounderRequestProjectionSummaryBase<"confirm_trace_decision_projection_summary"> {
  confirm_posture?: "not_required" | "required" | "withheld";
  evidence_summary_label?: string;
}

export interface FounderRequestLearningSuggestionProjectionSummary
  extends FounderRequestProjectionSummaryBase<"learning_suggestion_projection_summary"> {
  suggestion_posture?: "suggestion_only";
  suggestion_summary_label?: string;
}

export interface FounderRequestProjectionSummarySet {
  continuity_projection_summary: FounderRequestContinuityProjectionSummary;
  semantic_relation_projection_summary: FounderRequestSemanticRelationProjectionSummary;
  drift_impact_projection_summary: FounderRequestDriftImpactProjectionSummary;
  activation_projection_summary: FounderRequestActivationProjectionSummary;
  confirm_trace_decision_projection_summary: FounderRequestConfirmTraceDecisionProjectionSummary;
  learning_suggestion_projection_summary: FounderRequestLearningSuggestionProjectionSummary;
}

export interface FounderRequestIdentityClass {
  request_ref: string;
  request_label: string;
  request_origin: "founder_request";
}

export interface FounderRequestReviewReturnPostureClass {
  posture: FounderRequestExceptionPosture;
  posture_summary: string;
  marker_status: FounderRequestProjectionSummaryAvailability;
}

export interface FounderRequestBoundedActionRecommendation {
  recommendation_kind: "bounded_action_recommendation";
  recommendation_posture:
    | "observe_only"
    | "prepare_for_review"
    | "prepare_for_revision"
    | "hold_for_confirmation";
  recommendation_summary: string;
  marker_status: FounderRequestProjectionSummaryAvailability;
  non_executing: true;
}

export interface FounderRequestEvidenceSummaryClass {
  evidence_summary_label: string;
  evidence_status: FounderRequestProjectionSummaryAvailability;
  evidence_refs?: FounderRequestProjectionEvidenceRef[];
}

export interface FounderRequestLearningSuggestionSummaryClass {
  suggestion_posture: "suggestion_only";
  suggestion_summary: string;
  marker_status: FounderRequestProjectionSummaryAvailability;
  evidence_refs?: FounderRequestProjectionEvidenceRef[];
}

export interface FounderRequestExceptionPacketContract {
  contract_scope: "founder_request_exception_packet";
  authority_boundary: "product_projection_only";
  non_executing: true;
  request_identity: FounderRequestIdentityClass;
  projection_summaries: FounderRequestProjectionSummarySet;
  derived_exception_posture: FounderRequestExceptionPosture;
  review_return_posture: FounderRequestReviewReturnPostureClass;
  bounded_action_recommendation?: FounderRequestBoundedActionRecommendation;
  evidence_summary: FounderRequestEvidenceSummaryClass;
  learning_suggestion_summary?: FounderRequestLearningSuggestionSummaryClass;
  status_markers: FounderRequestProjectionSummaryAvailability[];
}

const FORBIDDEN_RAW_FIELD_KEYS = new Set(
  [
    [join_parts("runtime", "_object")],
    [join_parts("runtime", "_object", "_record")],
    [join_parts("raw", "_vsl")],
    [join_parts("raw", "_psg")],
    [join_parts("raw", "_trace")],
    [join_parts("raw", "_graph")],
    [join_parts("minimal", "_loop", "_run", "_result")],
    [join_parts("learning", "_candidate")],
    [join_parts("drift", "_record")],
    [join_parts("conflict", "_case")],
    [join_parts("activation", "_signal")],
    [join_parts("action", "_unit")],
    [join_parts("memory", "_promotion", "_record")],
  ].flat()
);

const FORBIDDEN_LABEL_TOKENS = new Set(
  [
    join_parts("appro", "ved"),
    join_parts("re", "jected"),
    join_parts("dis", "patched"),
    join_parts("exe", "cuted"),
    join_parts("pro", "vider", "_sent"),
    join_parts("chan", "nel", "_published"),
    join_parts("policy", "_mutated"),
    join_parts("protocol", "_certified"),
    join_parts("fully", "_reconstructed"),
    join_parts("autonomous", "_decision", "_complete"),
  ]
);

const FORBIDDEN_RECOMMENDATION_TOKENS = new Set(
  [
    join_parts("appro", "ve"),
    join_parts("re", "ject"),
    join_parts("dis", "patch"),
    join_parts("exe", "cute"),
    join_parts("pro", "vider"),
    join_parts("chan", "nel"),
  ]
);

export function is_founder_request_projection_summary_availability(
  value: unknown
): value is FounderRequestProjectionSummaryAvailability {
  return (
    typeof value === "string" &&
    FOUNDER_REQUEST_PROJECTION_SUMMARY_AVAILABILITY_VALUES.includes(
      value as FounderRequestProjectionSummaryAvailability
    )
  );
}

export function is_founder_request_exception_posture(
  value: unknown
): value is FounderRequestExceptionPosture {
  return (
    typeof value === "string" &&
    FOUNDER_REQUEST_EXCEPTION_POSTURE_VALUES.includes(
      value as FounderRequestExceptionPosture
    )
  );
}

function has_forbidden_runtime_like_keys(value: unknown): boolean {
  if (!is_record(value)) {
    return false;
  }

  for (const [key, nested_value] of Object.entries(value)) {
    if (FORBIDDEN_RAW_FIELD_KEYS.has(key)) {
      return true;
    }

    if (has_forbidden_runtime_like_keys(nested_value)) {
      return true;
    }
  }

  return false;
}

function has_forbidden_label_tokens(value: unknown): boolean {
  if (typeof value === "string") {
    return tokenize_value(value).some((token) => FORBIDDEN_LABEL_TOKENS.has(token));
  }

  if (Array.isArray(value)) {
    return value.some((item) => has_forbidden_label_tokens(item));
  }

  if (is_record(value)) {
    return Object.values(value).some((item) => has_forbidden_label_tokens(item));
  }

  return false;
}

function has_forbidden_recommendation_tokens(value: unknown): boolean {
  if (typeof value !== "string") {
    return false;
  }

  return tokenize_value(value).some((token) =>
    FORBIDDEN_RECOMMENDATION_TOKENS.has(token)
  );
}

function is_founder_request_projection_evidence_ref(
  value: unknown
): value is FounderRequestProjectionEvidenceRef {
  return (
    is_record(value) &&
    value.ref_scope === "bounded_evidence_ref" &&
    typeof value.ref_label === "string" &&
    FOUNDER_REQUEST_EXCEPTION_PACKET_SUMMARY_FAMILIES.includes(
      value.ref_family as FounderRequestExceptionPacketSummaryFamily
    ) &&
    !has_forbidden_runtime_like_keys(value) &&
    !has_forbidden_label_tokens(value)
  );
}

function is_projection_summary_base(
  value: unknown,
  family: FounderRequestExceptionPacketSummaryFamily
): value is FounderRequestProjectionSummaryBase<FounderRequestExceptionPacketSummaryFamily> {
  return (
    is_record(value) &&
    value.family === family &&
    is_founder_request_projection_summary_availability(value.availability) &&
    typeof value.summary_label === "string" &&
    is_string_array(value.summary_notes) &&
    (value.evidence_refs === undefined ||
      (Array.isArray(value.evidence_refs) &&
        value.evidence_refs.every((item) =>
          is_founder_request_projection_evidence_ref(item)
        ))) &&
    !has_forbidden_runtime_like_keys(value) &&
    !has_forbidden_label_tokens(value)
  );
}

function is_continuity_projection_summary(
  value: unknown
): value is FounderRequestContinuityProjectionSummary {
  return (
    is_projection_summary_base(value, "continuity_projection_summary") &&
    (value.continuation_label === undefined ||
      typeof value.continuation_label === "string") &&
    (value.continuation_anchor_label === undefined ||
      typeof value.continuation_anchor_label === "string") &&
    (value.freshness_posture === undefined ||
      value.freshness_posture === "fresh" ||
      value.freshness_posture === "resume_ready" ||
      value.freshness_posture === "stale")
  );
}

function is_semantic_relation_projection_summary(
  value: unknown
): value is FounderRequestSemanticRelationProjectionSummary {
  return (
    is_projection_summary_base(value, "semantic_relation_projection_summary") &&
    (value.affected_object_labels === undefined ||
      is_string_array(value.affected_object_labels)) &&
    (value.relation_change_summary === undefined ||
      typeof value.relation_change_summary === "string")
  );
}

function is_drift_impact_projection_summary(
  value: unknown
): value is FounderRequestDriftImpactProjectionSummary {
  return (
    is_projection_summary_base(value, "drift_impact_projection_summary") &&
    (value.drift_kind_label === undefined ||
      typeof value.drift_kind_label === "string") &&
    (value.impact_summary_label === undefined ||
      typeof value.impact_summary_label === "string") &&
    (value.has_conflict_signal === undefined ||
      typeof value.has_conflict_signal === "boolean")
  );
}

function is_activation_projection_summary(
  value: unknown
): value is FounderRequestActivationProjectionSummary {
  return (
    is_projection_summary_base(value, "activation_projection_summary") &&
    (value.activation_posture === undefined ||
      value.activation_posture === "observe_only" ||
      value.activation_posture === "confirm_gate" ||
      value.activation_posture === "blocked" ||
      value.activation_posture === "escalation_gate") &&
    (value.recommendation_visibility === undefined ||
      value.recommendation_visibility === "visible" ||
      value.recommendation_visibility === "hidden")
  );
}

function is_confirm_trace_decision_projection_summary(
  value: unknown
): value is FounderRequestConfirmTraceDecisionProjectionSummary {
  return (
    is_projection_summary_base(value, "confirm_trace_decision_projection_summary") &&
    (value.confirm_posture === undefined ||
      value.confirm_posture === "not_required" ||
      value.confirm_posture === "required" ||
      value.confirm_posture === "withheld") &&
    (value.evidence_summary_label === undefined ||
      typeof value.evidence_summary_label === "string")
  );
}

function is_learning_suggestion_projection_summary(
  value: unknown
): value is FounderRequestLearningSuggestionProjectionSummary {
  return (
    is_projection_summary_base(value, "learning_suggestion_projection_summary") &&
    (value.suggestion_posture === undefined ||
      value.suggestion_posture === "suggestion_only") &&
    (value.suggestion_summary_label === undefined ||
      typeof value.suggestion_summary_label === "string")
  );
}

export function has_only_founder_request_projection_summary_family_keys(
  value: unknown
): value is FounderRequestProjectionSummarySet {
  if (!is_record(value)) {
    return false;
  }

  const actual_keys = Object.keys(value);

  return (
    actual_keys.length === FOUNDER_REQUEST_EXCEPTION_PACKET_SUMMARY_FAMILIES.length &&
    FOUNDER_REQUEST_EXCEPTION_PACKET_SUMMARY_FAMILIES.every((key) =>
      actual_keys.includes(key)
    )
  );
}

export function is_founder_request_projection_summary_set(
  value: unknown
): value is FounderRequestProjectionSummarySet {
  return (
    has_only_founder_request_projection_summary_family_keys(value) &&
    is_continuity_projection_summary(value.continuity_projection_summary) &&
    is_semantic_relation_projection_summary(
      value.semantic_relation_projection_summary
    ) &&
    is_drift_impact_projection_summary(value.drift_impact_projection_summary) &&
    is_activation_projection_summary(value.activation_projection_summary) &&
    is_confirm_trace_decision_projection_summary(
      value.confirm_trace_decision_projection_summary
    ) &&
    is_learning_suggestion_projection_summary(
      value.learning_suggestion_projection_summary
    ) &&
    !has_forbidden_runtime_like_keys(value) &&
    !has_forbidden_label_tokens(value)
  );
}

function is_founder_request_identity_class(
  value: unknown
): value is FounderRequestIdentityClass {
  return (
    is_record(value) &&
    typeof value.request_ref === "string" &&
    typeof value.request_label === "string" &&
    value.request_origin === "founder_request" &&
    !has_forbidden_runtime_like_keys(value) &&
    !has_forbidden_label_tokens(value)
  );
}

function is_founder_request_review_return_posture_class(
  value: unknown
): value is FounderRequestReviewReturnPostureClass {
  return (
    is_record(value) &&
    is_founder_request_exception_posture(value.posture) &&
    typeof value.posture_summary === "string" &&
    is_founder_request_projection_summary_availability(value.marker_status) &&
    !has_forbidden_runtime_like_keys(value) &&
    !has_forbidden_label_tokens(value)
  );
}

export function is_founder_request_bounded_action_recommendation(
  value: unknown
): value is FounderRequestBoundedActionRecommendation {
  return (
    is_record(value) &&
    value.recommendation_kind === "bounded_action_recommendation" &&
    (value.recommendation_posture === "observe_only" ||
      value.recommendation_posture === "prepare_for_review" ||
      value.recommendation_posture === "prepare_for_revision" ||
      value.recommendation_posture === "hold_for_confirmation") &&
    typeof value.recommendation_summary === "string" &&
    is_founder_request_projection_summary_availability(value.marker_status) &&
    value.non_executing === true &&
    !has_forbidden_runtime_like_keys(value) &&
    !has_forbidden_label_tokens(value) &&
    !has_forbidden_recommendation_tokens(value.recommendation_summary)
  );
}

function is_founder_request_evidence_summary_class(
  value: unknown
): value is FounderRequestEvidenceSummaryClass {
  return (
    is_record(value) &&
    typeof value.evidence_summary_label === "string" &&
    is_founder_request_projection_summary_availability(value.evidence_status) &&
    (value.evidence_refs === undefined ||
      (Array.isArray(value.evidence_refs) &&
        value.evidence_refs.every((item) =>
          is_founder_request_projection_evidence_ref(item)
        ))) &&
    !has_forbidden_runtime_like_keys(value) &&
    !has_forbidden_label_tokens(value)
  );
}

function is_founder_request_learning_suggestion_summary_class(
  value: unknown
): value is FounderRequestLearningSuggestionSummaryClass {
  return (
    is_record(value) &&
    value.suggestion_posture === "suggestion_only" &&
    typeof value.suggestion_summary === "string" &&
    is_founder_request_projection_summary_availability(value.marker_status) &&
    (value.evidence_refs === undefined ||
      (Array.isArray(value.evidence_refs) &&
        value.evidence_refs.every((item) =>
          is_founder_request_projection_evidence_ref(item)
        ))) &&
    !has_forbidden_runtime_like_keys(value) &&
    !has_forbidden_label_tokens(value)
  );
}

export function is_founder_request_exception_packet_contract(
  value: unknown
): value is FounderRequestExceptionPacketContract {
  return (
    is_record(value) &&
    value.contract_scope === "founder_request_exception_packet" &&
    value.authority_boundary === "product_projection_only" &&
    value.non_executing === true &&
    is_founder_request_identity_class(value.request_identity) &&
    is_founder_request_projection_summary_set(value.projection_summaries) &&
    is_founder_request_exception_posture(value.derived_exception_posture) &&
    is_founder_request_review_return_posture_class(value.review_return_posture) &&
    (value.bounded_action_recommendation === undefined ||
      is_founder_request_bounded_action_recommendation(
        value.bounded_action_recommendation
      )) &&
    is_founder_request_evidence_summary_class(value.evidence_summary) &&
    (value.learning_suggestion_summary === undefined ||
      is_founder_request_learning_suggestion_summary_class(
        value.learning_suggestion_summary
      )) &&
    Array.isArray(value.status_markers) &&
    value.status_markers.every((item) =>
      is_founder_request_projection_summary_availability(item)
    ) &&
    !has_forbidden_runtime_like_keys(value) &&
    !has_forbidden_label_tokens(value)
  );
}
