import type {
  PilotOnboardingAudience,
  PilotOnboardingExpectationProfile,
  PilotOnboardingPacketStatus,
  PilotOnboardingPacketSummary,
  PilotOnboardingRequiredInput,
  PilotOnboardingSection,
  PilotOnboardingSourceRefs,
  PilotOnboardingSupportBoundary,
  V2_4PilotOnboardingPacket,
} from "./pilot-onboarding-packet-contract.ts";
import {
  V2_3_STABLE_SOURCE_REFS,
  V2_4_ONBOARDING_BOUNDARY_FLAGS,
  V2_4_ONBOARDING_BOUNDARY_NOTICES,
  V2_4_ONBOARDING_FINAL_STATUSES,
} from "./pilot-onboarding-packet-contract.ts";

export type CreatePilotOnboardingPacketInput = {
  packet_id: string;
  created_at: string;
  audience: PilotOnboardingAudience;
  title?: string;
  status?: PilotOnboardingPacketStatus;
  expectation_profile: PilotOnboardingExpectationProfile;
  required_inputs: PilotOnboardingRequiredInput[];
  support_boundaries: PilotOnboardingSupportBoundary[];
  source_refs: Partial<PilotOnboardingSourceRefs>;
  sections?: PilotOnboardingSection[];
  blocking_reasons?: string[];
};

function clone_packet(
  packet: V2_4PilotOnboardingPacket
): V2_4PilotOnboardingPacket {
  return JSON.parse(JSON.stringify(packet)) as V2_4PilotOnboardingPacket;
}

function sort_required_inputs(
  inputs: PilotOnboardingRequiredInput[]
): PilotOnboardingRequiredInput[] {
  return [...inputs]
    .map((input) => ({ ...input }))
    .sort((left, right) => left.input_id.localeCompare(right.input_id));
}

function sort_support_boundaries(
  boundaries: PilotOnboardingSupportBoundary[]
): PilotOnboardingSupportBoundary[] {
  return [...boundaries]
    .map((boundary) => ({
      ...boundary,
      non_scope: [...boundary.non_scope].sort(),
    }))
    .sort((left, right) => left.boundary_id.localeCompare(right.boundary_id));
}

function sort_sections(
  sections: PilotOnboardingSection[]
): PilotOnboardingSection[] {
  return [...sections]
    .map((section) => ({
      ...section,
      required_input_ids: [...section.required_input_ids].sort(),
    }))
    .sort((left, right) => left.section_id.localeCompare(right.section_id));
}

function create_default_sections(input: {
  audience: PilotOnboardingAudience;
  required_inputs: PilotOnboardingRequiredInput[];
}): PilotOnboardingSection[] {
  const required_input_ids = input.required_inputs
    .map((required_input) => required_input.input_id)
    .sort();

  return [
    {
      section_id: "expectations",
      audience: input.audience,
      title: "Pilot expectations",
      summary:
        "Clarifies manual-first design-partner expectations before the pilot starts.",
      required_input_ids: [],
    },
    {
      section_id: "required_project_inputs",
      audience: input.audience,
      title: "Required project inputs",
      summary:
        "Lists the local project context needed for manual review preparation.",
      required_input_ids,
    },
    {
      section_id: "source_refs",
      audience: "operator",
      title: "Source references",
      summary:
        "Links the packet back to V2.3 pilot state and stable release refs.",
      required_input_ids: [],
    },
    {
      section_id: "support_boundaries",
      audience: input.audience,
      title: "Manual support boundaries",
      summary:
        "States what support is manual, local, review-only, and out of scope.",
      required_input_ids: [],
    },
  ];
}

function recommended_step_for_status(
  status: PilotOnboardingPacketStatus
): string {
  const steps: Record<PilotOnboardingPacketStatus, string> = {
    draft: "review_packet_inputs_before_manual_review",
    ready_for_manual_review: "perform_manual_onboarding_packet_review",
    acknowledged_manually: "start_pilot_only_after_manual_acknowledgement",
    cancelled: "packet_cancelled_no_pilot_start",
    blocked: "resolve_onboarding_blocker_before_pilot_start",
  };

  return steps[status];
}

function is_final_status(status: PilotOnboardingPacketStatus): boolean {
  return V2_4_ONBOARDING_FINAL_STATUSES.includes(
    status as (typeof V2_4_ONBOARDING_FINAL_STATUSES)[number]
  );
}

function transition_packet(input: {
  packet: V2_4PilotOnboardingPacket;
  next_status: PilotOnboardingPacketStatus;
  allowed_from: PilotOnboardingPacketStatus[];
  updated_at: string;
  manual_acknowledgement_ref?: string;
}): V2_4PilotOnboardingPacket {
  const packet = clone_packet(input.packet);

  if (is_final_status(packet.status)) {
    return packet;
  }

  if (!input.allowed_from.includes(packet.status)) {
    return packet;
  }

  return {
    ...packet,
    updated_at: input.updated_at,
    status: input.next_status,
    recommended_manual_step: recommended_step_for_status(input.next_status),
    manual_acknowledgement_ref:
      input.manual_acknowledgement_ref ?? packet.manual_acknowledgement_ref,
    boundary_flags: V2_4_ONBOARDING_BOUNDARY_FLAGS,
    boundary_notices: [...V2_4_ONBOARDING_BOUNDARY_NOTICES],
  };
}

export function create_pilot_onboarding_packet(
  input: CreatePilotOnboardingPacketInput
): V2_4PilotOnboardingPacket {
  const status = input.status ?? "draft";
  const required_inputs = sort_required_inputs(input.required_inputs);
  const support_boundaries = sort_support_boundaries(input.support_boundaries);
  const sections = sort_sections(
    input.sections ?? create_default_sections({
      audience: input.audience,
      required_inputs,
    })
  );

  return {
    packet_id: input.packet_id,
    created_at: input.created_at,
    updated_at: input.created_at,
    status,
    audience: input.audience,
    title: input.title ?? "V2.4 pilot onboarding packet",
    expectation_profile: { ...input.expectation_profile },
    required_inputs,
    support_boundaries,
    sections,
    source_refs: {
      ...V2_3_STABLE_SOURCE_REFS,
      ...input.source_refs,
    },
    blocking_reasons: [...(input.blocking_reasons ?? [])].sort(),
    recommended_manual_step: recommended_step_for_status(status),
    manual_acknowledgement_required: true,
    boundary_flags: V2_4_ONBOARDING_BOUNDARY_FLAGS,
    boundary_notices: [...V2_4_ONBOARDING_BOUNDARY_NOTICES],
  };
}

export function create_pilot_onboarding_packet_summary(
  packet: V2_4PilotOnboardingPacket
): PilotOnboardingPacketSummary {
  return {
    packet_id: packet.packet_id,
    status: packet.status,
    audience: packet.audience,
    title: packet.title,
    source_refs: { ...packet.source_refs },
    required_input_count: packet.required_inputs.length,
    support_boundary_count: packet.support_boundaries.length,
    recommended_manual_step: packet.recommended_manual_step,
    blocking_reasons: [...packet.blocking_reasons],
    boundary_notices: [...packet.boundary_notices],
    manual_first: true,
    local_only: true,
    review_only: true,
    non_executing: true,
  };
}

export function mark_pilot_onboarding_packet_ready_for_manual_review(input: {
  packet: V2_4PilotOnboardingPacket;
  reviewed_at: string;
}): V2_4PilotOnboardingPacket {
  return transition_packet({
    packet: input.packet,
    next_status: "ready_for_manual_review",
    allowed_from: ["draft"],
    updated_at: input.reviewed_at,
  });
}

export function mark_pilot_onboarding_packet_acknowledged_manually(input: {
  packet: V2_4PilotOnboardingPacket;
  acknowledged_at: string;
  manual_acknowledgement_ref: string;
}): V2_4PilotOnboardingPacket {
  return transition_packet({
    packet: input.packet,
    next_status: "acknowledged_manually",
    allowed_from: ["ready_for_manual_review"],
    updated_at: input.acknowledged_at,
    manual_acknowledgement_ref: input.manual_acknowledgement_ref,
  });
}

export function cancel_pilot_onboarding_packet(input: {
  packet: V2_4PilotOnboardingPacket;
  cancelled_at: string;
}): V2_4PilotOnboardingPacket {
  return transition_packet({
    packet: input.packet,
    next_status: "cancelled",
    allowed_from: ["draft", "ready_for_manual_review"],
    updated_at: input.cancelled_at,
  });
}
