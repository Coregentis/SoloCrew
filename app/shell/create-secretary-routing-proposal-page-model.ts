import {
  createSecretaryRoutingProposal,
} from "../../projection/assembly/secretary-routing-proposal.ts";
import type {
  SecretaryRoutingInput,
  SecretaryRoutingProposal,
} from "../../projection/contracts/secretary-routing-proposal-contract.ts";

export interface SecretaryRoutingProposalBoundarySummary {
  product_projection_only: true;
  non_executing: true;
  no_dispatch: true;
  no_autonomous_execution: true;
  marketplace_not_involved: true;
  management_directive_created: false;
  cell_ceo_assembly_started: false;
  runtime_private_fields_omitted: true;
}

export interface SecretaryRoutingProposalPageModel {
  surface_id: string;
  page_title: "Secretary Routing Proposal";
  status: "review_required";
  proposal: SecretaryRoutingProposal;
  review_banner: string;
  boundary_summary: SecretaryRoutingProposalBoundarySummary;
  next_allowed_user_actions: readonly string[];
  forbidden_actions: readonly string[];
  v2_1_implementation_scope: "impl_01_secretary_routing_only";
}

export function createSecretaryRoutingProposalPageModel(
  input: SecretaryRoutingInput
): SecretaryRoutingProposalPageModel {
  const proposal = createSecretaryRoutingProposal(input);

  return {
    surface_id: `${proposal.proposal_id}-page-model`,
    page_title: "Secretary Routing Proposal",
    status: "review_required",
    proposal,
    review_banner:
      "Review the Secretary routing proposal before choosing a Cell path.",
    boundary_summary: {
      product_projection_only: true,
      non_executing: true,
      no_dispatch: true,
      no_autonomous_execution: true,
      marketplace_not_involved: true,
      management_directive_created: false,
      cell_ceo_assembly_started: false,
      runtime_private_fields_omitted: true,
    },
    next_allowed_user_actions: [
      "review routing proposal",
      "choose existing Cell",
      "request clarification",
      "reject proposal",
    ],
    forbidden_actions: [
      "execute automatically",
      "dispatch externally",
      "install marketplace asset",
      "create Management Directive automatically",
      "start Cell CEO Assembly automatically",
      "create TracePilot Cell",
    ],
    v2_1_implementation_scope: "impl_01_secretary_routing_only",
  };
}
