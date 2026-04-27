import type {
  ExistingCellRoutingTarget,
  SecretaryRoutingProposal,
} from "../contracts/secretary-routing-proposal-contract.ts";
import type {
  AcceptedManagementDirectiveSourceProposal,
  ManagementDirective,
  ManagementDirectiveHandoffPreview,
  ManagementDirectiveInput,
  ManagementDirectiveTarget,
} from "../contracts/management-directive-contract.ts";

const MANAGEMENT_DIRECTIVE_CONSTRAINTS = [
  "No autonomous execution.",
  "No provider/channel dispatch.",
  "No approval execution.",
  "No asset installation.",
  "No Cell CEO Assembly started.",
  "No external business action.",
  "No marketplace or plugin resolution.",
] as const;

function is_existing_cell_target(
  target: SecretaryRoutingProposal["recommended_target"]
): target is ExistingCellRoutingTarget {
  return target.target_kind === "existing_cell";
}

export function canCreateManagementDirectiveFromProposal(
  proposal: SecretaryRoutingProposal
): proposal is AcceptedManagementDirectiveSourceProposal {
  return is_existing_cell_target(proposal.recommended_target);
}

export function assertExistingCellRoutingTarget(
  proposal: SecretaryRoutingProposal
): ExistingCellRoutingTarget {
  if (!is_existing_cell_target(proposal.recommended_target)) {
    throw new Error(
      "Management Directive requires an accepted existing Cell target."
    );
  }

  return proposal.recommended_target;
}

function create_management_directive_target(
  target: ExistingCellRoutingTarget
): ManagementDirectiveTarget {
  return {
    target_kind: "existing_cell",
    cell_id: target.cell_id,
    cell_label: target.cell_label,
    starter_blueprint_id: target.starter_blueprint_id,
    cell_kind: target.cell_kind,
  };
}

export function createSelectedCellHandoffPreview(input: {
  directive_id: string;
  source_proposal: SecretaryRoutingProposal;
  target: ManagementDirectiveTarget;
}): ManagementDirectiveHandoffPreview {
  return {
    handoff_preview_id: `${input.directive_id}-selected-cell-handoff-preview`,
    target_cell_id: input.target.cell_id,
    target_cell_label: input.target.cell_label,
    summary: `Prepare a review-only handoff preview for ${input.target.cell_label}.`,
    directive_summary: `Hand off founder request "${input.source_proposal.founder_request}" to ${input.target.cell_label} for later Cell-local review.`,
    constraints: [...MANAGEMENT_DIRECTIVE_CONSTRAINTS],
    evidence_gap_notes: [
      ...input.source_proposal.evidence_gap_notes,
      "Cell CEO Assembly is not started in IMPL-02.",
      "Cell-local asset choices remain outside this Management Directive preview.",
    ],
    next_review_step:
      "Human reviews this directive before any future Cell CEO Assembly preview is authorized.",
    cell_ceo_assembly_not_started: true,
  };
}

export function createManagementDirective(
  input: ManagementDirectiveInput
): ManagementDirective {
  const accepted_target = assertExistingCellRoutingTarget(
    input.source_proposal
  );
  const target = create_management_directive_target(accepted_target);
  const constraints = [...MANAGEMENT_DIRECTIVE_CONSTRAINTS];

  return {
    directive_id: input.directive_id,
    directive_scope: "management_directive_product_projection",
    source_proposal_id: input.source_proposal.proposal_id,
    source_request_id: input.source_proposal.request_id,
    founder_request: input.source_proposal.founder_request,
    accepted_by: input.accepted_by,
    status: "draft_review_required",
    review_posture: "review_required",
    target,
    handoff_preview: createSelectedCellHandoffPreview({
      directive_id: input.directive_id,
      source_proposal: input.source_proposal,
      target,
    }),
    rationale: [
      ...input.source_proposal.rationale,
      `Accepted existing Cell target: ${target.cell_label}.`,
      "Management Directive remains a product projection handoff preview only.",
    ],
    constraints,
    non_executing: true,
    no_dispatch: true,
    no_autonomous_execution: true,
    no_approval_execution: true,
    marketplace_not_involved: true,
    asset_installation_started: false,
    cell_ceo_assembly_started: false,
    provider_channel_dispatch_started: false,
    external_business_action_started: false,
    runtime_private_fields_omitted: true,
    product_projection_only: true,
    mplp_object: false,
    cognitive_os_runtime_law: false,
    created_at: input.created_at,
  };
}
