import {
  SOLOCREW_STRUCTURAL_CONTRACT_VERSION,
  type StructuralContractEnvelope,
} from "../contracts/structural-object-types.ts";

export type ManagementPriority =
  | "focus_now"
  | "stabilize"
  | "review_first";

export type ManagementApprovalPosture =
  | "operator_required"
  | "bounded_autonomy"
  | "escalate_on_stop";

export type CellDeliveryPosture =
  | "on_track"
  | "attention"
  | "blocked";

export type EscalationRequestKind = "approval" | "escalation";
export type EscalationUrgency = "normal" | "high" | "critical";

export type DeliveryReturnStatus =
  | "in_progress"
  | "ready_for_review"
  | "blocked"
  | "returned";

interface ManagementEnvelopeInput<TObjectType extends string> {
  projection_id: string;
  object_type: TObjectType;
  phase_boundary:
    | "compile_phase_only"
    | "runtime_adjacent_summary";
  projection_notes?: string[];
}

function create_management_envelope<TObjectType extends string>(
  input: ManagementEnvelopeInput<TObjectType>
): Omit<StructuralContractEnvelope<never>, "object_type"> & {
  object_type: TObjectType;
} {
  return {
    projection_id: input.projection_id,
    object_type: input.object_type,
    contract_version: SOLOCREW_STRUCTURAL_CONTRACT_VERSION,
    implementation_status: "skeleton_only",
    authority_boundary: "management_interface_only",
    phase_boundary: input.phase_boundary,
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    projection_notes: input.projection_notes
      ? [...input.projection_notes]
      : undefined,
  };
}

export interface ManagementDirective
  extends StructuralContractEnvelope<"management-directive"> {
  management_directive_id: string;
  cell_id: string;
  priority: ManagementPriority;
  delivery_target: string;
  approval_posture: ManagementApprovalPosture;
  constraint_emphasis: string[];
  directive_scope: "single_cell";
}

export interface CreateManagementDirectiveInput {
  projection_id: string;
  management_directive_id: string;
  cell_id: string;
  priority: ManagementPriority;
  delivery_target: string;
  approval_posture: ManagementApprovalPosture;
  constraint_emphasis?: string[];
  projection_notes?: string[];
}

export function createManagementDirective(
  input: CreateManagementDirectiveInput
): ManagementDirective {
  return {
    ...create_management_envelope({
      projection_id: input.projection_id,
      object_type: "management-directive",
      phase_boundary: "compile_phase_only",
      projection_notes: input.projection_notes,
    }),
    management_directive_id: input.management_directive_id,
    cell_id: input.cell_id,
    priority: input.priority,
    delivery_target: input.delivery_target,
    approval_posture: input.approval_posture,
    constraint_emphasis: [...(input.constraint_emphasis ?? [])],
    directive_scope: "single_cell",
  };
}

export interface CellSummaryCard
  extends StructuralContractEnvelope<"cell-summary-card"> {
  cell_summary_card_id: string;
  cell_id: string;
  cell_name: string;
  current_objective_headline: string;
  delivery_posture: CellDeliveryPosture;
  active_work_count: number;
  blocked_work_count: number;
  continuity_note: string;
}

export interface CreateCellSummaryCardInput {
  projection_id: string;
  cell_summary_card_id: string;
  cell_id: string;
  cell_name: string;
  current_objective_headline: string;
  delivery_posture: CellDeliveryPosture;
  active_work_count: number;
  blocked_work_count: number;
  continuity_note: string;
  projection_notes?: string[];
}

export function createCellSummaryCard(
  input: CreateCellSummaryCardInput
): CellSummaryCard {
  return {
    ...create_management_envelope({
      projection_id: input.projection_id,
      object_type: "cell-summary-card",
      phase_boundary: "runtime_adjacent_summary",
      projection_notes: input.projection_notes,
    }),
    cell_summary_card_id: input.cell_summary_card_id,
    cell_id: input.cell_id,
    cell_name: input.cell_name,
    current_objective_headline: input.current_objective_headline,
    delivery_posture: input.delivery_posture,
    active_work_count: input.active_work_count,
    blocked_work_count: input.blocked_work_count,
    continuity_note: input.continuity_note,
  };
}

export interface EscalationApprovalRequest
  extends StructuralContractEnvelope<"escalation-approval-request"> {
  escalation_approval_request_id: string;
  cell_id: string;
  request_kind: EscalationRequestKind;
  reason: string;
  affected_objective_id?: string;
  requested_decision: string;
  urgency: EscalationUrgency;
}

export interface CreateEscalationApprovalRequestInput {
  projection_id: string;
  escalation_approval_request_id: string;
  cell_id: string;
  request_kind: EscalationRequestKind;
  reason: string;
  affected_objective_id?: string;
  requested_decision: string;
  urgency: EscalationUrgency;
  projection_notes?: string[];
}

export function createEscalationApprovalRequest(
  input: CreateEscalationApprovalRequestInput
): EscalationApprovalRequest {
  return {
    ...create_management_envelope({
      projection_id: input.projection_id,
      object_type: "escalation-approval-request",
      phase_boundary: "runtime_adjacent_summary",
      projection_notes: input.projection_notes,
    }),
    escalation_approval_request_id: input.escalation_approval_request_id,
    cell_id: input.cell_id,
    request_kind: input.request_kind,
    reason: input.reason,
    affected_objective_id: input.affected_objective_id,
    requested_decision: input.requested_decision,
    urgency: input.urgency,
  };
}

export interface DeliveryReturn
  extends StructuralContractEnvelope<"delivery-return"> {
  delivery_return_id: string;
  cell_id: string;
  delivery_status: DeliveryReturnStatus;
  completed_summary: string;
  blocked_summary: string;
  next_directive_needed: boolean;
  requested_follow_up?: string;
}

export interface CreateDeliveryReturnInput {
  projection_id: string;
  delivery_return_id: string;
  cell_id: string;
  delivery_status: DeliveryReturnStatus;
  completed_summary: string;
  blocked_summary: string;
  next_directive_needed: boolean;
  requested_follow_up?: string;
  projection_notes?: string[];
}

export function createDeliveryReturn(
  input: CreateDeliveryReturnInput
): DeliveryReturn {
  return {
    ...create_management_envelope({
      projection_id: input.projection_id,
      object_type: "delivery-return",
      phase_boundary: "runtime_adjacent_summary",
      projection_notes: input.projection_notes,
    }),
    delivery_return_id: input.delivery_return_id,
    cell_id: input.cell_id,
    delivery_status: input.delivery_status,
    completed_summary: input.completed_summary,
    blocked_summary: input.blocked_summary,
    next_directive_needed: input.next_directive_needed,
    requested_follow_up: input.requested_follow_up,
  };
}
