import {
  propose_next_action_from_pilot_state,
  type NextActionPilotStateInput,
} from "./next-action-proposal-rules.ts";
import type {
  NextActionProposalSummary,
  V2_3NextActionProposal,
} from "./next-action-proposal-contract.ts";
import {
  V2_3_NEXT_ACTION_BOUNDARY_FLAGS,
} from "./next-action-proposal-contract.ts";

export type CreateNextActionProposalInput = NextActionPilotStateInput & {
  proposal_id: string;
  created_at?: string;
};

const DEFAULT_CREATED_AT = "2026-04-28T00:00:00.000Z";

function clone_proposal(
  proposal: V2_3NextActionProposal
): V2_3NextActionProposal {
  return JSON.parse(JSON.stringify(proposal)) as V2_3NextActionProposal;
}

export function create_next_action_proposal(
  input: CreateNextActionProposalInput
): V2_3NextActionProposal {
  const created_at = input.created_at ?? DEFAULT_CREATED_AT;
  const rule_result = propose_next_action_from_pilot_state(input);

  return {
    proposal_id: input.proposal_id,
    created_at,
    updated_at: created_at,
    status:
      rule_result.priority === "blocked"
        ? "blocked"
        : rule_result.kind === "request_manual_clarification"
          ? "needs_manual_review"
          : "proposed",
    kind: rule_result.kind,
    priority: rule_result.priority,
    title: rule_result.title,
    rationale: rule_result.rationale,
    manual_next_step: rule_result.manual_next_step,
    source_refs: rule_result.source_refs,
    required_manual_inputs: [...rule_result.required_manual_inputs],
    blocking_reasons: [...rule_result.blocking_reasons],
    boundary_flags: V2_3_NEXT_ACTION_BOUNDARY_FLAGS,
    boundary_notices: [...rule_result.boundary_notices],
  };
}

export function create_next_action_proposal_summary(
  proposal: V2_3NextActionProposal
): NextActionProposalSummary {
  return {
    proposal_id: proposal.proposal_id,
    status: proposal.status,
    kind: proposal.kind,
    priority: proposal.priority,
    manual_next_step: proposal.manual_next_step,
    source_refs: { ...proposal.source_refs },
    boundary_notices: [...proposal.boundary_notices],
    review_only: true,
    non_executing: true,
  };
}

export function mark_next_action_completed_manually(input: {
  proposal: V2_3NextActionProposal;
  completed_at?: string;
}): V2_3NextActionProposal {
  const proposal = clone_proposal(input.proposal);

  if (proposal.status === "cancelled") {
    return proposal;
  }

  return {
    ...proposal,
    status: "completed_manually",
    updated_at: input.completed_at ?? proposal.updated_at,
    boundary_flags: V2_3_NEXT_ACTION_BOUNDARY_FLAGS,
  };
}

export function cancel_next_action_proposal(input: {
  proposal: V2_3NextActionProposal;
  cancelled_at?: string;
}): V2_3NextActionProposal {
  const proposal = clone_proposal(input.proposal);

  if (proposal.status === "completed_manually") {
    return proposal;
  }

  return {
    ...proposal,
    status: "cancelled",
    updated_at: input.cancelled_at ?? proposal.updated_at,
    boundary_flags: V2_3_NEXT_ACTION_BOUNDARY_FLAGS,
  };
}
