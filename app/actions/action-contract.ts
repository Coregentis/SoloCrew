import type {
  ProductArtifactCellId,
} from "../artifacts/artifact-contract.ts";

export type ProductActionClass =
  | "auto_local"
  | "reviewable_local"
  | "external_draft"
  | "limited_external_dispatch"
  | "forbidden_irreversible";

export type ProductActionKind =
  | "create_artifact"
  | "revise_artifact"
  | "create_review_proposal"
  | "create_external_draft"
  | "defer_external_dispatch"
  | "block_irreversible"
  | "acknowledge_drift"
  | "no_op_blocked";

export type ProductActionRequestStatus =
  | "requested"
  | "completed_local"
  | "review_required"
  | "draft_created"
  | "deferred_strong_confirmation"
  | "blocked"
  | "rejected";

export interface ProductActionRequestRecord {
  action_request_id: string;
  cell_id: ProductArtifactCellId;
  action_class: ProductActionClass;
  action_kind: ProductActionKind;
  title: string;
  intent_summary: string;
  related_artifact_refs: string[];
  related_task_refs: string[];
  related_drift_refs: string[];
  related_learning_refs: string[];
  source_evidence_refs: string[];
  created_at: string;
  status: ProductActionRequestStatus;
  non_executing: true;
  provider_execution_available: false;
  channel_entry_available: false;
  external_dispatch_available: false;
  runtime_private_fields_omitted: true;
}

export type ProductActionOutcomeKind =
  | "local_update_completed"
  | "review_proposal_created"
  | "external_draft_created"
  | "strong_confirmation_required"
  | "irreversible_blocked"
  | "rejected";

export interface ProductActionOutcomeRecord {
  action_outcome_id: string;
  action_request_id: string;
  cell_id: ProductArtifactCellId;
  outcome_kind: ProductActionOutcomeKind;
  outcome_summary: string;
  produced_artifact_refs: string[];
  produced_review_refs: string[];
  produced_evidence_refs: string[];
  created_at: string;
  non_executing: true;
  provider_execution_available: false;
  channel_entry_available: false;
  external_dispatch_available: false;
  runtime_private_fields_omitted: true;
}

export type ProductReviewProposalStatus =
  | "pending_review"
  | "accepted_for_local_application"
  | "rejected";

export interface ProductReviewProposalRecord {
  review_proposal_id: string;
  action_request_id: string;
  cell_id: ProductArtifactCellId;
  proposal_title: string;
  proposal_summary: string;
  proposed_local_change: string;
  status: ProductReviewProposalStatus;
  source_evidence_refs: string[];
  non_executing: true;
}

export type ProductActionPolicyDecisionKind =
  | "allowed_local"
  | "review_required"
  | "draft_only"
  | "deferred_strong_confirmation"
  | "blocked";

export interface ProductActionPolicyDecision {
  decision: ProductActionPolicyDecisionKind;
  rationale: string;
  allowed_operations: string[];
  forbidden_operations: string[];
  confirmation_required: boolean;
  external_side_effect_allowed: false;
}

export interface ProductActionStoreSnapshot {
  store_kind: "solocrew_action_store";
  schema_version: 1;
  action_requests: ProductActionRequestRecord[];
  action_outcomes: ProductActionOutcomeRecord[];
  review_proposals: ProductReviewProposalRecord[];
}

export interface CreateActionRequestInput {
  cell_id: ProductArtifactCellId;
  action_class: ProductActionClass;
  action_kind: ProductActionKind;
  title: string;
  intent_summary: string;
  related_artifact_refs?: string[];
  related_task_refs?: string[];
  related_drift_refs?: string[];
  related_learning_refs?: string[];
  source_evidence_refs?: string[];
}
