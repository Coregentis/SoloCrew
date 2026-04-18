import {
  FOUNDER_REQUEST_EXCEPTION_PACKET_SUMMARY_FAMILIES,
  is_founder_request_exception_packet_contract,
  is_founder_request_exception_posture,
  is_founder_request_projection_summary_availability,
  type FounderRequestActivationProjectionSummary,
  type FounderRequestBoundedActionRecommendation,
  type FounderRequestConfirmTraceDecisionProjectionSummary,
  type FounderRequestContinuityProjectionSummary,
  type FounderRequestDriftImpactProjectionSummary,
  type FounderRequestEvidenceSummaryClass,
  type FounderRequestExceptionPacketContract,
  type FounderRequestExceptionPacketSummaryFamily,
  type FounderRequestExceptionPosture,
  type FounderRequestLearningSuggestionProjectionSummary,
  type FounderRequestLearningSuggestionSummaryClass,
  type FounderRequestProjectionEvidenceRef,
  type FounderRequestProjectionSummaryAvailability,
  type FounderRequestProjectionSummarySet,
  type FounderRequestSemanticRelationProjectionSummary,
} from "../contracts/founder-request-exception-packet-contract.ts";

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

const ORDERED_AVAILABILITY_VALUES: FounderRequestProjectionSummaryAvailability[] = [
  "available",
  "omitted_by_contract",
  "not_available_upstream",
  "insufficient_evidence",
  "stale",
  "not_applicable",
];

const FORBIDDEN_RAW_FIELD_KEYS = new Set(
  [
    join_parts("runtime", "_object"),
    join_parts("runtime", "_object", "_record"),
    join_parts("raw", "_vsl"),
    join_parts("raw", "_psg"),
    join_parts("raw", "_trace"),
    join_parts("raw", "_graph"),
    join_parts("minimal", "_loop", "_run", "_result"),
    join_parts("learning", "_candidate"),
    join_parts("drift", "_record"),
    join_parts("conflict", "_case"),
    join_parts("activation", "_signal"),
    join_parts("action", "_unit"),
    join_parts("memory", "_promotion", "_record"),
  ]
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

type FounderRequestRecommendationPosture =
  FounderRequestBoundedActionRecommendation["recommendation_posture"];

interface FounderRequestProjectionSummaryInputBase {
  availability?: FounderRequestProjectionSummaryAvailability;
  summary_label?: string;
  summary_notes?: string[];
  evidence_refs?: FounderRequestProjectionEvidenceRef[];
}

export interface FounderRequestContinuityProjectionSummaryInput
  extends FounderRequestProjectionSummaryInputBase {
  continuation_label?: string;
  continuation_anchor_label?: string;
  freshness_posture?: FounderRequestContinuityProjectionSummary["freshness_posture"];
}

export interface FounderRequestSemanticRelationProjectionSummaryInput
  extends FounderRequestProjectionSummaryInputBase {
  affected_object_labels?: string[];
  relation_change_summary?: string;
}

export interface FounderRequestDriftImpactProjectionSummaryInput
  extends FounderRequestProjectionSummaryInputBase {
  drift_kind_label?: string;
  impact_summary_label?: string;
  has_conflict_signal?: boolean;
}

export interface FounderRequestActivationProjectionSummaryInput
  extends FounderRequestProjectionSummaryInputBase {
  activation_posture?: FounderRequestActivationProjectionSummary["activation_posture"];
  recommendation_visibility?: FounderRequestActivationProjectionSummary["recommendation_visibility"];
}

export interface FounderRequestConfirmTraceDecisionProjectionSummaryInput
  extends FounderRequestProjectionSummaryInputBase {
  confirm_posture?: FounderRequestConfirmTraceDecisionProjectionSummary["confirm_posture"];
  evidence_summary_label?: string;
}

export interface FounderRequestLearningSuggestionProjectionSummaryInput
  extends FounderRequestProjectionSummaryInputBase {
  suggestion_posture?: FounderRequestLearningSuggestionProjectionSummary["suggestion_posture"];
  suggestion_summary_label?: string;
}

export interface FounderRequestProjectionSummaryInputMap {
  continuity_projection_summary: FounderRequestContinuityProjectionSummaryInput;
  semantic_relation_projection_summary: FounderRequestSemanticRelationProjectionSummaryInput;
  drift_impact_projection_summary: FounderRequestDriftImpactProjectionSummaryInput;
  activation_projection_summary: FounderRequestActivationProjectionSummaryInput;
  confirm_trace_decision_projection_summary: FounderRequestConfirmTraceDecisionProjectionSummaryInput;
  learning_suggestion_projection_summary: FounderRequestLearningSuggestionProjectionSummaryInput;
}

export interface FounderRequestExceptionPacketAdapterInput {
  request_ref: string;
  request_label: string;
  projection_summaries?: Partial<FounderRequestProjectionSummaryInputMap>;
  derived_exception_posture_hint?: FounderRequestExceptionPosture;
  review_return_posture_hint?: FounderRequestExceptionPosture;
  bounded_action_recommendation_text?: string;
  bounded_action_recommendation_posture?: FounderRequestRecommendationPosture;
  evidence_summary_text?: string;
  learning_suggestion_text?: string;
  status_markers?: FounderRequestProjectionSummaryAvailability[];
}

export type FounderRequestExceptionPacketAdapterFailureReason =
  | "invalid_input"
  | "forbidden_input"
  | "contract_guard_failed";

export type FounderRequestExceptionPacketAdapterResult =
  | {
      ok: true;
      packet: FounderRequestExceptionPacketContract;
    }
  | {
      ok: false;
      reason: FounderRequestExceptionPacketAdapterFailureReason;
      notes: string[];
    };

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

function ordered_unique_markers(
  markers: FounderRequestProjectionSummaryAvailability[]
): FounderRequestProjectionSummaryAvailability[] {
  const marker_set = new Set(markers);

  return ORDERED_AVAILABILITY_VALUES.filter((marker) => marker_set.has(marker));
}

function pick_marker_status(
  markers: FounderRequestProjectionSummaryAvailability[]
): FounderRequestProjectionSummaryAvailability {
  const ordered_markers = ordered_unique_markers(markers);

  if (ordered_markers.includes("stale")) {
    return "stale";
  }

  if (ordered_markers.includes("insufficient_evidence")) {
    return "insufficient_evidence";
  }

  if (ordered_markers.includes("omitted_by_contract")) {
    return "omitted_by_contract";
  }

  if (ordered_markers.includes("not_available_upstream")) {
    return "not_available_upstream";
  }

  if (ordered_markers.includes("not_applicable")) {
    return "not_applicable";
  }

  return "available";
}

function default_availability(
  value: unknown
): FounderRequestProjectionSummaryAvailability {
  return is_founder_request_projection_summary_availability(value)
    ? value
    : "not_available_upstream";
}

function default_notes(
  value: unknown,
  fallback: string
): string[] {
  if (is_string_array(value) && value.length > 0) {
    return value;
  }

  return [fallback];
}

function default_label(
  value: unknown,
  fallback: string
): string {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

function optional_evidence_refs(
  value: unknown
): FounderRequestProjectionEvidenceRef[] | undefined {
  if (!Array.isArray(value) || value.length === 0) {
    return undefined;
  }

  return value as FounderRequestProjectionEvidenceRef[];
}

function optional_string(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function optional_boolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function ensure_projection_summary_keys(
  value: unknown
): value is Partial<FounderRequestProjectionSummaryInputMap> {
  if (value === undefined) {
    return true;
  }

  if (!is_record(value)) {
    return false;
  }

  return Object.keys(value).every((key) =>
    FOUNDER_REQUEST_EXCEPTION_PACKET_SUMMARY_FAMILIES.includes(
      key as FounderRequestExceptionPacketSummaryFamily
    )
  );
}

function create_continuity_projection_summary(
  input: FounderRequestContinuityProjectionSummaryInput | undefined
): FounderRequestContinuityProjectionSummary {
  const availability = default_availability(input?.availability);

  return {
    family: "continuity_projection_summary",
    availability,
    summary_label: default_label(
      input?.summary_label,
      `Continuity projection summary is ${availability}.`
    ),
    summary_notes: default_notes(
      input?.summary_notes,
      "Continuity posture remains bounded and omission-aware."
    ),
    evidence_refs: optional_evidence_refs(input?.evidence_refs),
    continuation_label: optional_string(input?.continuation_label),
    continuation_anchor_label: optional_string(input?.continuation_anchor_label),
    freshness_posture:
      input?.freshness_posture === "fresh" ||
      input?.freshness_posture === "resume_ready" ||
      input?.freshness_posture === "stale"
        ? input.freshness_posture
        : undefined,
  };
}

function create_semantic_relation_projection_summary(
  input: FounderRequestSemanticRelationProjectionSummaryInput | undefined
): FounderRequestSemanticRelationProjectionSummary {
  const availability = default_availability(input?.availability);

  return {
    family: "semantic_relation_projection_summary",
    availability,
    summary_label: default_label(
      input?.summary_label,
      `Semantic relation projection summary is ${availability}.`
    ),
    summary_notes: default_notes(
      input?.summary_notes,
      "Semantic relation posture remains bounded and affected-object aware."
    ),
    evidence_refs: optional_evidence_refs(input?.evidence_refs),
    affected_object_labels: is_string_array(input?.affected_object_labels)
      ? input.affected_object_labels
      : undefined,
    relation_change_summary: optional_string(input?.relation_change_summary),
  };
}

function create_drift_impact_projection_summary(
  input: FounderRequestDriftImpactProjectionSummaryInput | undefined
): FounderRequestDriftImpactProjectionSummary {
  const availability = default_availability(input?.availability);

  return {
    family: "drift_impact_projection_summary",
    availability,
    summary_label: default_label(
      input?.summary_label,
      `Drift and impact projection summary is ${availability}.`
    ),
    summary_notes: default_notes(
      input?.summary_notes,
      "Drift and impact posture remains bounded and evidence-aware."
    ),
    evidence_refs: optional_evidence_refs(input?.evidence_refs),
    drift_kind_label: optional_string(input?.drift_kind_label),
    impact_summary_label: optional_string(input?.impact_summary_label),
    has_conflict_signal: optional_boolean(input?.has_conflict_signal),
  };
}

function create_activation_projection_summary(
  input: FounderRequestActivationProjectionSummaryInput | undefined
): FounderRequestActivationProjectionSummary {
  const availability = default_availability(input?.availability);

  return {
    family: "activation_projection_summary",
    availability,
    summary_label: default_label(
      input?.summary_label,
      `Activation projection summary is ${availability}.`
    ),
    summary_notes: default_notes(
      input?.summary_notes,
      "Activation posture remains bounded and non-executing."
    ),
    evidence_refs: optional_evidence_refs(input?.evidence_refs),
    activation_posture:
      input?.activation_posture === "observe_only" ||
      input?.activation_posture === "confirm_gate" ||
      input?.activation_posture === "blocked" ||
      input?.activation_posture === "escalation_gate"
        ? input.activation_posture
        : undefined,
    recommendation_visibility:
      input?.recommendation_visibility === "visible" ||
      input?.recommendation_visibility === "hidden"
        ? input.recommendation_visibility
        : undefined,
  };
}

function create_confirm_trace_decision_projection_summary(
  input: FounderRequestConfirmTraceDecisionProjectionSummaryInput | undefined
): FounderRequestConfirmTraceDecisionProjectionSummary {
  const availability = default_availability(input?.availability);

  return {
    family: "confirm_trace_decision_projection_summary",
    availability,
    summary_label: default_label(
      input?.summary_label,
      `Confirm, trace, and decision projection summary is ${availability}.`
    ),
    summary_notes: default_notes(
      input?.summary_notes,
      "Confirm and evidence posture remain bounded and omission-aware."
    ),
    evidence_refs: optional_evidence_refs(input?.evidence_refs),
    confirm_posture:
      input?.confirm_posture === "not_required" ||
      input?.confirm_posture === "required" ||
      input?.confirm_posture === "withheld"
        ? input.confirm_posture
        : undefined,
    evidence_summary_label: optional_string(input?.evidence_summary_label),
  };
}

function create_learning_suggestion_projection_summary(
  input: FounderRequestLearningSuggestionProjectionSummaryInput | undefined
): FounderRequestLearningSuggestionProjectionSummary {
  const availability = default_availability(input?.availability);

  return {
    family: "learning_suggestion_projection_summary",
    availability,
    summary_label: default_label(
      input?.summary_label,
      `Learning suggestion projection summary is ${availability}.`
    ),
    summary_notes: default_notes(
      input?.summary_notes,
      "Learning posture remains suggestion_only and bounded."
    ),
    evidence_refs: optional_evidence_refs(input?.evidence_refs),
    suggestion_posture:
      input?.suggestion_posture === "suggestion_only"
        ? input.suggestion_posture
        : undefined,
    suggestion_summary_label: optional_string(input?.suggestion_summary_label),
  };
}

function create_projection_summaries(
  input: Partial<FounderRequestProjectionSummaryInputMap> | undefined
): FounderRequestProjectionSummarySet {
  return {
    continuity_projection_summary: create_continuity_projection_summary(
      input?.continuity_projection_summary
    ),
    semantic_relation_projection_summary:
      create_semantic_relation_projection_summary(
        input?.semantic_relation_projection_summary
      ),
    drift_impact_projection_summary: create_drift_impact_projection_summary(
      input?.drift_impact_projection_summary
    ),
    activation_projection_summary: create_activation_projection_summary(
      input?.activation_projection_summary
    ),
    confirm_trace_decision_projection_summary:
      create_confirm_trace_decision_projection_summary(
        input?.confirm_trace_decision_projection_summary
      ),
    learning_suggestion_projection_summary:
      create_learning_suggestion_projection_summary(
        input?.learning_suggestion_projection_summary
      ),
  };
}

function collect_projection_evidence_refs(
  projection_summaries: FounderRequestProjectionSummarySet
): FounderRequestProjectionEvidenceRef[] | undefined {
  const unique_refs = new Map<string, FounderRequestProjectionEvidenceRef>();

  for (const family of FOUNDER_REQUEST_EXCEPTION_PACKET_SUMMARY_FAMILIES) {
    const summary = projection_summaries[family];

    for (const evidence_ref of summary.evidence_refs ?? []) {
      unique_refs.set(
        `${evidence_ref.ref_family}:${evidence_ref.ref_label}`,
        evidence_ref
      );
    }
  }

  return unique_refs.size > 0 ? Array.from(unique_refs.values()) : undefined;
}

function collect_status_markers(
  projection_summaries: FounderRequestProjectionSummarySet,
  input_markers: unknown
): FounderRequestProjectionSummaryAvailability[] {
  const markers = FOUNDER_REQUEST_EXCEPTION_PACKET_SUMMARY_FAMILIES.map(
    (family) => projection_summaries[family].availability
  );

  if (Array.isArray(input_markers)) {
    for (const marker of input_markers) {
      if (is_founder_request_projection_summary_availability(marker)) {
        markers.push(marker);
      }
    }
  }

  return ordered_unique_markers(markers);
}

function derive_exception_posture(
  projection_summaries: FounderRequestProjectionSummarySet,
  input_hint: unknown,
  marker_status: FounderRequestProjectionSummaryAvailability
): FounderRequestExceptionPosture {
  if (is_founder_request_exception_posture(input_hint)) {
    return input_hint;
  }

  if (marker_status === "stale") {
    return "stale_context";
  }

  if (marker_status === "insufficient_evidence") {
    return "evidence_insufficient";
  }

  if (projection_summaries.activation_projection_summary.activation_posture === "blocked") {
    return "activation_blocked";
  }

  if (
    projection_summaries.activation_projection_summary.activation_posture ===
    "escalation_gate"
  ) {
    return "escalation_required";
  }

  if (
    projection_summaries.confirm_trace_decision_projection_summary.confirm_posture ===
    "required"
  ) {
    return "confirm_required";
  }

  if (
    marker_status === "omitted_by_contract" ||
    marker_status === "not_available_upstream"
  ) {
    return "blocked_by_contract";
  }

  if (
    projection_summaries.drift_impact_projection_summary.has_conflict_signal === true ||
    projection_summaries.drift_impact_projection_summary.impact_summary_label !==
      undefined ||
    projection_summaries.drift_impact_projection_summary.drift_kind_label !==
      undefined
  ) {
    return "impact_detected";
  }

  if (
    projection_summaries.semantic_relation_projection_summary.availability ===
      "available" ||
    projection_summaries.continuity_projection_summary.availability === "available" ||
    projection_summaries.learning_suggestion_projection_summary.availability ===
      "available"
  ) {
    return "review_needed";
  }

  return "monitor";
}

function default_review_summary(
  posture: FounderRequestExceptionPosture
): string {
  switch (posture) {
    case "stale_context":
      return "Stale bounded summaries require refreshed context before stronger review posture is shown.";
    case "evidence_insufficient":
      return "Evidence remains too thin for stronger founder-request posture.";
    case "activation_blocked":
      return "Activation posture remains blocked inside the bounded contract lane.";
    case "confirm_required":
      return "Confirm posture remains required before stronger downstream interpretation.";
    case "escalation_required":
      return "Escalation posture remains bounded and visible for later review.";
    case "blocked_by_contract":
      return "Contract boundaries block a fuller founder-request packet read at this time.";
    case "impact_detected":
      return "Impact posture is visible and bounded for founder-request review.";
    case "return_for_revision":
      return "Revision posture remains bounded and ready for return.";
    case "monitor":
      return "Bounded posture remains visible for continued monitoring.";
    case "no_exception":
      return "No bounded exception posture is currently visible.";
    default:
      return "Founder-request posture remains bounded for review.";
  }
}

function derive_recommendation_posture(
  posture: FounderRequestExceptionPosture,
  input_posture: unknown
): FounderRequestRecommendationPosture {
  if (
    input_posture === "observe_only" ||
    input_posture === "prepare_for_review" ||
    input_posture === "prepare_for_revision" ||
    input_posture === "hold_for_confirmation"
  ) {
    return input_posture;
  }

  if (posture === "confirm_required") {
    return "hold_for_confirmation";
  }

  if (posture === "return_for_revision") {
    return "prepare_for_revision";
  }

  return "prepare_for_review";
}

function create_bounded_action_recommendation(
  text: unknown,
  posture: FounderRequestExceptionPosture,
  marker_status: FounderRequestProjectionSummaryAvailability
): FounderRequestBoundedActionRecommendation | undefined {
  if (typeof text !== "string" || text.length === 0) {
    return undefined;
  }

  return {
    recommendation_kind: "bounded_action_recommendation",
    recommendation_posture: derive_recommendation_posture(posture, undefined),
    recommendation_summary: text,
    marker_status,
    non_executing: true,
  };
}

function create_evidence_summary(
  text: unknown,
  marker_status: FounderRequestProjectionSummaryAvailability,
  evidence_refs: FounderRequestProjectionEvidenceRef[] | undefined
): FounderRequestEvidenceSummaryClass {
  return {
    evidence_summary_label: default_label(
      text,
      `Bounded evidence summary is ${marker_status} for the current founder request.`
    ),
    evidence_status: marker_status,
    evidence_refs,
  };
}

function create_learning_suggestion_summary(
  text: unknown,
  marker_status: FounderRequestProjectionSummaryAvailability,
  evidence_refs: FounderRequestProjectionEvidenceRef[] | undefined
): FounderRequestLearningSuggestionSummaryClass | undefined {
  if (typeof text !== "string" || text.length === 0) {
    return undefined;
  }

  return {
    suggestion_posture: "suggestion_only",
    suggestion_summary: text,
    marker_status,
    evidence_refs,
  };
}

function validate_adapter_input(input: unknown): string[] {
  const notes: string[] = [];

  if (!is_record(input)) {
    notes.push("Adapter input must be an object.");
    return notes;
  }

  if (typeof input.request_ref !== "string" || input.request_ref.length === 0) {
    notes.push("Adapter input must include a bounded founder request ref.");
  }

  if (typeof input.request_label !== "string" || input.request_label.length === 0) {
    notes.push("Adapter input must include a bounded founder request label.");
  }

  if (!ensure_projection_summary_keys(input.projection_summaries)) {
    notes.push("Projection summary input may use only the six frozen family keys.");
  }

  if (has_forbidden_runtime_like_keys(input)) {
    notes.push("Forbidden raw runtime-like input was provided.");
  }

  if (has_forbidden_label_tokens(input)) {
    notes.push("Forbidden authority-like input wording was provided.");
  }

  if (has_forbidden_recommendation_tokens(input.bounded_action_recommendation_text)) {
    notes.push("Bounded recommendation wording exceeded the frozen contract lane.");
  }

  return notes;
}

export function adapt_founder_request_exception_packet(
  input: unknown
): FounderRequestExceptionPacketAdapterResult {
  const notes = validate_adapter_input(input);

  if (notes.length > 0) {
    return {
      ok: false,
      reason: notes.some((note) => note.includes("Forbidden"))
        ? "forbidden_input"
        : "invalid_input",
      notes,
    };
  }

  const valid_input = input as FounderRequestExceptionPacketAdapterInput;
  const projection_summaries = create_projection_summaries(
    valid_input.projection_summaries
  );
  const status_markers = collect_status_markers(
    projection_summaries,
    valid_input.status_markers
  );
  const marker_status = pick_marker_status(status_markers);
  const evidence_refs = collect_projection_evidence_refs(projection_summaries);
  const derived_exception_posture = derive_exception_posture(
    projection_summaries,
    valid_input.derived_exception_posture_hint ??
      valid_input.review_return_posture_hint,
    marker_status
  );
  const bounded_action_recommendation = create_bounded_action_recommendation(
    valid_input.bounded_action_recommendation_text,
    derived_exception_posture,
    marker_status
  );
  const packet: FounderRequestExceptionPacketContract = {
    contract_scope: "founder_request_exception_packet",
    authority_boundary: "product_projection_only",
    non_executing: true,
    request_identity: {
      request_ref: valid_input.request_ref,
      request_label: valid_input.request_label,
      request_origin: "founder_request",
    },
    projection_summaries,
    derived_exception_posture,
    review_return_posture: {
      posture: is_founder_request_exception_posture(
        valid_input.review_return_posture_hint
      )
        ? valid_input.review_return_posture_hint
        : derived_exception_posture,
      posture_summary: default_review_summary(derived_exception_posture),
      marker_status,
    },
    bounded_action_recommendation:
      bounded_action_recommendation === undefined
        ? undefined
        : {
            ...bounded_action_recommendation,
            recommendation_posture: derive_recommendation_posture(
              derived_exception_posture,
              valid_input.bounded_action_recommendation_posture
            ),
          },
    evidence_summary: create_evidence_summary(
      valid_input.evidence_summary_text,
      marker_status,
      evidence_refs
    ),
    learning_suggestion_summary: create_learning_suggestion_summary(
      valid_input.learning_suggestion_text,
      marker_status,
      projection_summaries.learning_suggestion_projection_summary.evidence_refs ??
        evidence_refs
    ),
    status_markers,
  };

  if (!is_founder_request_exception_packet_contract(packet)) {
    return {
      ok: false,
      reason: "contract_guard_failed",
      notes: [
        "The adapted packet did not satisfy the frozen founder-request contract guard.",
      ],
    };
  }

  return {
    ok: true,
    packet,
  };
}
