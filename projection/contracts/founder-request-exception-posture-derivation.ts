import {
  is_founder_request_exception_posture,
  type FounderRequestExceptionPosture,
  type FounderRequestProjectionSummaryAvailability,
  type FounderRequestProjectionSummarySet,
} from "./founder-request-exception-packet-contract.ts";

const ORDERED_AVAILABILITY_VALUES: FounderRequestProjectionSummaryAvailability[] = [
  "available",
  "omitted_by_contract",
  "not_available_upstream",
  "insufficient_evidence",
  "stale",
  "not_applicable",
];

export interface FounderRequestExceptionPostureDerivationInput {
  projection_summaries: FounderRequestProjectionSummarySet;
  posture_hint?: FounderRequestExceptionPosture;
  status_markers?: FounderRequestProjectionSummaryAvailability[];
}

export function order_founder_request_projection_markers(
  markers: FounderRequestProjectionSummaryAvailability[]
): FounderRequestProjectionSummaryAvailability[] {
  const marker_set = new Set(markers);

  return ORDERED_AVAILABILITY_VALUES.filter((marker) => marker_set.has(marker));
}

export function derive_founder_request_exception_marker_status(
  status_markers: FounderRequestProjectionSummaryAvailability[]
): FounderRequestProjectionSummaryAvailability {
  const ordered_markers = order_founder_request_projection_markers(status_markers);

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

function collect_marker_defaults(
  projection_summaries: FounderRequestProjectionSummarySet
): FounderRequestProjectionSummaryAvailability[] {
  return [
    projection_summaries.continuity_projection_summary.availability,
    projection_summaries.semantic_relation_projection_summary.availability,
    projection_summaries.drift_impact_projection_summary.availability,
    projection_summaries.activation_projection_summary.availability,
    projection_summaries.confirm_trace_decision_projection_summary.availability,
    projection_summaries.learning_suggestion_projection_summary.availability,
  ];
}

export function derive_founder_request_exception_posture(
  input: FounderRequestExceptionPostureDerivationInput
): FounderRequestExceptionPosture {
  if (is_founder_request_exception_posture(input.posture_hint)) {
    return input.posture_hint;
  }

  const marker_status = derive_founder_request_exception_marker_status(
    input.status_markers ?? collect_marker_defaults(input.projection_summaries)
  );

  if (marker_status === "stale") {
    return "stale_context";
  }

  if (marker_status === "insufficient_evidence") {
    return "evidence_insufficient";
  }

  if (input.projection_summaries.activation_projection_summary.activation_posture === "blocked") {
    return "activation_blocked";
  }

  if (
    input.projection_summaries.activation_projection_summary.activation_posture ===
    "escalation_gate"
  ) {
    return "escalation_required";
  }

  if (
    input.projection_summaries.confirm_trace_decision_projection_summary.confirm_posture ===
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
    input.projection_summaries.drift_impact_projection_summary.has_conflict_signal ===
      true ||
    input.projection_summaries.drift_impact_projection_summary.impact_summary_label !==
      undefined ||
    input.projection_summaries.drift_impact_projection_summary.drift_kind_label !==
      undefined
  ) {
    return "impact_detected";
  }

  if (
    input.projection_summaries.semantic_relation_projection_summary.availability ===
      "available" ||
    input.projection_summaries.continuity_projection_summary.availability ===
      "available" ||
    input.projection_summaries.learning_suggestion_projection_summary.availability ===
      "available"
  ) {
    return "review_needed";
  }

  // Current repo choice keeps the no-signal fallback visible as bounded observation.
  return "monitor";
}
