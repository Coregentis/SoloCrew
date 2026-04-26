import type {
  ProductActionClass,
  ProductActionPolicyDecision,
  ProductActionRequestRecord,
} from "./action-contract.ts";

function build_policy_decision(
  decision: ProductActionPolicyDecision["decision"],
  rationale: string,
  allowed_operations: string[],
  forbidden_operations: string[],
  confirmation_required: boolean
): ProductActionPolicyDecision {
  return {
    decision,
    rationale,
    allowed_operations,
    forbidden_operations,
    confirmation_required,
    external_side_effect_allowed: false,
  };
}

export function evaluateActionPolicy(
  action_class: ProductActionClass
): ProductActionPolicyDecision {
  switch (action_class) {
    case "auto_local":
      return build_policy_decision(
        "allowed_local",
        "Auto-local actions may perform bounded product-local updates only.",
        [
          "create_local_artifact",
          "save_local_artifact",
          "revise_local_artifact",
          "acknowledge_local_drift",
          "update_local_action_status",
        ],
        [
          "provider_execution",
          "channel_execution",
          "external_dispatch",
          "irreversible_business_action",
        ],
        false
      );
    case "reviewable_local":
      return build_policy_decision(
        "review_required",
        "Reviewable-local actions may create local proposals but may not apply automatically.",
        [
          "create_review_proposal",
          "record_review_transition",
        ],
        [
          "auto_apply_local_change",
          "provider_execution",
          "channel_execution",
          "external_dispatch",
        ],
        true
      );
    case "external_draft":
      return build_policy_decision(
        "draft_only",
        "External-draft actions may create local draft records only.",
        [
          "create_external_draft_record",
          "save_draft_artifact",
        ],
        [
          "dispatch_external_draft",
          "provider_execution",
          "channel_execution",
        ],
        true
      );
    case "limited_external_dispatch":
      return build_policy_decision(
        "deferred_strong_confirmation",
        "Limited external dispatch remains deferred and requires stronger confirmation in a later wave.",
        [
          "record_deferred_strong_confirmation",
        ],
        [
          "dispatch_external_action",
          "provider_execution",
          "channel_execution",
        ],
        true
      );
    case "forbidden_irreversible":
      return build_policy_decision(
        "blocked",
        "Forbidden irreversible actions are blocked and may only produce blocked evidence records.",
        [
          "record_blocked_action_evidence",
        ],
        [
          "payment_action",
          "trading_action",
          "purchase_action",
          "legal_action",
          "provider_execution",
          "channel_execution",
          "external_dispatch",
        ],
        true
      );
    default:
      return build_policy_decision(
        "blocked",
        "Unknown action classes remain blocked.",
        [],
        [
          "provider_execution",
          "channel_execution",
          "external_dispatch",
        ],
        true
      );
  }
}

export function evaluateActionPolicyForRequest(
  request: Pick<ProductActionRequestRecord, "action_class">
): ProductActionPolicyDecision {
  return evaluateActionPolicy(request.action_class);
}
