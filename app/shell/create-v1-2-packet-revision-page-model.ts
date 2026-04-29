import {
  type PacketRevisionFlowResult,
} from "../../projection/assembly/packet-revision-flow.ts";
import type {
  SoloCrewContinuitySnapshotView,
  SoloCrewLifecycleContinuityView,
  SoloCrewPendingReviewItemView,
  SoloCrewPendingReviewView,
} from "../../projection/contracts/lifecycle-continuity-consumption-contract.ts";

export type V14ContinuityPageModelInput = {
  continuity_view?: SoloCrewLifecycleContinuityView;
  pending_review_view?: SoloCrewPendingReviewView;
  continuity_snapshot_view?: SoloCrewContinuitySnapshotView;
};

export type V12PacketRevisionPageModel = {
  revision_candidate_id: string;
  previous_packet_candidate_id: string;
  revised_packet_candidate_id?: string;
  lifecycle_stage:
    | "evidence_gap"
    | "revision_candidate"
    | "review_posture"
    | "contract_blocked";
  lifecycle_label: string;
  packet_lifecycle_summary: string;
  revision_reason_label: string;
  evidence_gap_summary?: string;
  revision_relationship_label: string;
  safe_clarification_prompt?: string;
  revision_status:
    | "needs_clarification"
    | "revision_candidate_created"
    | "ready_for_review"
    | "return_for_revision"
    | "blocked_by_contract";
  review_posture: "review_only" | "return_for_revision" | "blocked_by_contract";
  review_posture_label: string;
  staging_posture: "not_sent" | "not_dispatchable" | "blocked_by_contract";
  staging_posture_label: string;
  non_executing_posture: string;
  boundary_summary: string;
  continuity_summary?: string;
  continuity_lifecycle_label?: string;
  continuity_history_summary?: string;
  pending_review_visibility?: string;
  pending_review_count?: number;
  pending_review_items_summary?: string;
  continuity_review_posture?: string;
  continuity_non_executing_posture?: string;
  continuity_safe_evidence_refs?: string[];
  runtime_private_fields_omitted?: true;
  interpretation_guards: {
    revision_is_approval: false;
    return_for_revision_is_rejection: false;
    revised_packet_is_execution: false;
    evidence_gap_is_proof: false;
    safe_clarification_prompt_is_provider_channel_send: false;
  };
};

function format_revision_reason_label(reason: string): string {
  if (reason === "contract_blocked") {
    return "blocked by contract";
  }

  if (reason === "operator_clarification") {
    return "operator clarification";
  }

  return reason.replaceAll("_", " ");
}

function format_boundary_summary(result: PacketRevisionFlowResult): string {
  return `${result.boundary_summary} ${result.non_executing_posture}`;
}

function unique_strings(values: string[] = []): string[] {
  return [...new Set(
    values.filter((value) => value.trim().length > 0).map((value) => value.trim())
  )].sort();
}

function select_primary_continuity_view(
  continuity_input?: V14ContinuityPageModelInput
): SoloCrewLifecycleContinuityView | SoloCrewPendingReviewView | SoloCrewContinuitySnapshotView | undefined {
  return continuity_input?.continuity_view ??
    continuity_input?.continuity_snapshot_view ??
    continuity_input?.pending_review_view;
}

function select_pending_review_view(
  continuity_input?: V14ContinuityPageModelInput
): SoloCrewPendingReviewView | SoloCrewContinuitySnapshotView | undefined {
  return continuity_input?.pending_review_view ??
    continuity_input?.continuity_snapshot_view;
}

function format_pending_review_items_summary(
  items: SoloCrewPendingReviewItemView[]
): string | undefined {
  if (items.length === 0) {
    return undefined;
  }

  const labels = unique_strings(items.map((item) => item.lifecycle_label));
  const history_samples = unique_strings(items.map((item) => item.history_summary));

  return `Visible review items: ${labels.join("; ")}. ${history_samples.join(" ")}`;
}

function format_pending_review_visibility(
  count: number,
  items: SoloCrewPendingReviewItemView[]
): string {
  if (count === 0) {
    return "Pending review visibility is currently clear. Visibility-only and not a queue.";
  }

  const item_phrase = count === 1 ? "1 review item" : `${count} review items`;
  const labels = unique_strings(items.map((item) => item.lifecycle_label));
  const label_suffix = labels.length > 0
    ? ` Visible labels: ${labels.join("; ")}.`
    : "";

  return `Pending review visibility shows ${item_phrase}. Visibility-only and not a queue.${label_suffix}`;
}

function format_continuity_summary(args: {
  continuity_history_summary: string;
  continuity_lifecycle_label: string;
  pending_review_count?: number;
  snapshot_summary?: string;
}): string {
  const pending_review_suffix =
    args.pending_review_count === undefined
      ? ""
      : args.pending_review_count === 0
        ? " Pending review visibility is currently clear."
        : ` Pending review visibility shows ${args.pending_review_count} visible review item${args.pending_review_count === 1 ? "" : "s"} below queue semantics.`;
  const snapshot_suffix = args.snapshot_summary
    ? ` Snapshot summary: ${args.snapshot_summary}`
    : "";

  return `Continuity summary: ${args.continuity_lifecycle_label}. ${args.continuity_history_summary}${pending_review_suffix}${snapshot_suffix}`;
}

function build_continuity_page_model_fields(
  continuity_input?: V14ContinuityPageModelInput
): Pick<
  V12PacketRevisionPageModel,
  | "continuity_summary"
  | "continuity_lifecycle_label"
  | "continuity_history_summary"
  | "pending_review_visibility"
  | "pending_review_count"
  | "pending_review_items_summary"
  | "continuity_review_posture"
  | "continuity_non_executing_posture"
  | "continuity_safe_evidence_refs"
  | "runtime_private_fields_omitted"
> {
  const primary_view = select_primary_continuity_view(continuity_input);
  const pending_review_view = select_pending_review_view(continuity_input);

  if (!primary_view) {
    return {
      continuity_summary: undefined,
      continuity_lifecycle_label: undefined,
      continuity_history_summary: undefined,
      pending_review_visibility: undefined,
      pending_review_count: undefined,
      pending_review_items_summary: undefined,
      continuity_review_posture: undefined,
      continuity_non_executing_posture: undefined,
      continuity_safe_evidence_refs: undefined,
      runtime_private_fields_omitted: undefined,
    };
  }

  const pending_review_items = pending_review_view?.pending_review_items ?? [];
  const pending_review_count =
    pending_review_view?.pending_review_count ?? pending_review_items.length;
  const continuity_safe_evidence_refs = unique_strings([
    ...(primary_view.safe_evidence_refs ?? []),
    ...(pending_review_view?.safe_evidence_refs ?? []),
    ...(continuity_input?.continuity_snapshot_view?.safe_evidence_refs ?? []),
    ...pending_review_items.flatMap((item) => item.safe_evidence_refs ?? []),
    ...(
      continuity_input?.continuity_snapshot_view?.pending_review_items ?? []
    ).flatMap((item) => item.safe_evidence_refs ?? []),
  ]);
  const continuity_history_summary = primary_view.history_summary;
  const continuity_lifecycle_label = primary_view.lifecycle_label;
  const continuity_review_posture = primary_view.review_posture;
  const continuity_non_executing_posture =
    pending_review_view?.non_executing_posture ?? primary_view.non_executing_posture;
  const pending_review_visibility =
    pending_review_view
      ? format_pending_review_visibility(pending_review_count, pending_review_items)
      : undefined;
  const pending_review_items_summary = format_pending_review_items_summary(
    pending_review_items
  );
  const continuity_summary = format_continuity_summary({
    continuity_history_summary,
    continuity_lifecycle_label,
    pending_review_count: pending_review_view ? pending_review_count : undefined,
    snapshot_summary:
      continuity_input?.continuity_snapshot_view?.history_summary &&
        continuity_input.continuity_snapshot_view !== primary_view
        ? continuity_input.continuity_snapshot_view.history_summary
        : undefined,
  });

  return {
    continuity_summary,
    continuity_lifecycle_label,
    continuity_history_summary,
    pending_review_visibility,
    pending_review_count: pending_review_view ? pending_review_count : undefined,
    pending_review_items_summary,
    continuity_review_posture,
    continuity_non_executing_posture,
    continuity_safe_evidence_refs,
    runtime_private_fields_omitted: true,
  };
}

export function createV12PacketRevisionPageModel(
  result: PacketRevisionFlowResult,
  continuity_input?: V14ContinuityPageModelInput
): V12PacketRevisionPageModel {
  const continuity_fields = build_continuity_page_model_fields(continuity_input);

  return {
    revision_candidate_id: result.revision_candidate.revision_candidate_id,
    previous_packet_candidate_id:
      result.revision_candidate.previous_packet_candidate_id,
    revised_packet_candidate_id:
      result.revision_candidate.revised_packet_candidate_id,
    lifecycle_stage: result.lifecycle_stage,
    lifecycle_label: result.lifecycle_label,
    packet_lifecycle_summary: result.packet_lifecycle_summary,
    revision_reason_label: format_revision_reason_label(
      result.revision_candidate.revision_reason
    ),
    evidence_gap_summary:
      result.evidence_gap_summary ??
      result.revision_candidate.evidence_gap?.user_visible_summary,
    revision_relationship_label: result.revision_relationship.relationship_label,
    safe_clarification_prompt: result.revision_candidate.safe_clarification_prompt,
    revision_status: result.revision_candidate.revision_status,
    review_posture: result.review_posture,
    review_posture_label: result.review_posture_label,
    staging_posture: result.staging_posture,
    staging_posture_label: result.staging_posture_label,
    non_executing_posture: result.non_executing_posture,
    boundary_summary: format_boundary_summary(result),
    ...continuity_fields,
    interpretation_guards: {
      revision_is_approval: false,
      return_for_revision_is_rejection: false,
      revised_packet_is_execution: false,
      evidence_gap_is_proof: false,
      safe_clarification_prompt_is_provider_channel_send: false,
    },
  };
}

export type ContinuityPageModelInput = V14ContinuityPageModelInput;
export type PacketRevisionPageModel = V12PacketRevisionPageModel;

export const createPacketRevisionPageModel =
  createV12PacketRevisionPageModel;
