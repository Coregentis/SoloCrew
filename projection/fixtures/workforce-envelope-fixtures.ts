import type {
  WorkforceCellProjectionInput,
  WorkforceEnvelopeDeliveryPosture,
  WorkforceEnvelopeScopeStatus,
} from "../adapters/upstream-record-types.ts";

export function createWorkforceCellProjectionInput(
  overrides: Partial<WorkforceCellProjectionInput> & {
    scope_ref?: string;
    scope_label?: string;
    scope_status?: WorkforceEnvelopeScopeStatus;
    summary_headline?: string;
    delivery_posture?: WorkforceEnvelopeDeliveryPosture;
  } = {}
): WorkforceCellProjectionInput {
  const scope_ref = overrides.scope_ref ?? "cell-scope-01";
  const scope_label = overrides.scope_label ?? "Runtime Delivery Cell";

  return {
    workforce_envelope: {
      envelope_version: "0.1",
      envelope_kind: "workforce_projection_safe_envelope",
      source_runtime_family: "workforce",
      project_id: "project-01",
      scope_ref,
      scope_label,
      scope_status: overrides.scope_status ?? "active",
      scope_mode: "multi_scope_bounded",
      summary_headline:
        overrides.summary_headline ?? "Ship one bounded runtime-backed review.",
      delivery_posture: overrides.delivery_posture ?? "attention",
      safe_evidence_refs: [`${scope_ref}-evidence`],
      projection_notes: [
        "Projection-safe workforce envelope fixture.",
        "Raw runtime-private workforce records are omitted.",
      ],
      runtime_private_fields_omitted: true,
      non_executing: true,
      created_at: "2026-04-26T00:00:00.000Z",
      ...overrides.workforce_envelope,
    },
    active_work_item_count: overrides.active_work_item_count ?? 2,
    blocked_work_item_count: overrides.blocked_work_item_count ?? 1,
    continuity_hint:
      overrides.continuity_hint ??
      "Upstream projection-safe workforce summary remains bounded and current.",
    management_directive: overrides.management_directive,
    delivery_return: overrides.delivery_return,
    approval_request: overrides.approval_request,
  };
}

export function createWorkforceCellProjectionInputWithManagement(
  overrides: Parameters<typeof createWorkforceCellProjectionInput>[0] = {}
): WorkforceCellProjectionInput {
  const base = createWorkforceCellProjectionInput(overrides);
  const scope_ref = base.workforce_envelope.scope_ref;

  return {
    ...base,
    management_directive: overrides.management_directive ?? {
      directive_ref: `${scope_ref}:directive`,
      objective_ref: "objective-01",
      directive_summary: "Keep delivery visible and bounded.",
      directive_priority: "review_first",
      approval_posture: "operator_required",
      constraint_tags: ["bounded-review", "operator-visible"],
      safe_evidence_refs: [`${scope_ref}:directive-evidence`],
    },
    delivery_return: overrides.delivery_return ?? {
      delivery_return_ref: `${scope_ref}:delivery-return`,
      objective_ref: "objective-01",
      delivery_status: "ready_for_review",
      completed_summary: "Review package assembled.",
      blocked_summary: "One follow-up item remains.",
      next_directive_needed: false,
      requested_follow_up: "Operator review before resuming.",
      safe_evidence_refs: [`${scope_ref}:delivery-evidence`],
    },
    approval_request: overrides.approval_request ?? {
      approval_request_ref: `${scope_ref}:approval-request`,
      objective_ref: "objective-01",
      request_kind: "approval",
      request_status: "pending",
      request_summary: "Operator review requested.",
      requested_decision: "Approve bounded release.",
      urgency: "normal",
      safe_evidence_refs: [`${scope_ref}:approval-evidence`],
    },
  };
}

export function createWorkforceCellProjectionInputs(): WorkforceCellProjectionInput[] {
  return [
    createWorkforceCellProjectionInputWithManagement({
      scope_ref: "cell-scope-01",
      scope_label: "Runtime Delivery Cell",
      summary_headline: "Ship one bounded runtime-backed review.",
      delivery_posture: "attention",
      active_work_item_count: 2,
      blocked_work_item_count: 1,
      continuity_hint:
        "Delivery continuity remains bounded to projection-safe workforce truth.",
      management_directive: {
        directive_ref: "directive-01",
        objective_ref: "objective-01",
        directive_summary: "Keep delivery visible and bounded.",
        directive_priority: "focus_now",
        approval_posture: "operator_required",
        constraint_tags: ["bounded-delivery"],
        safe_evidence_refs: ["directive-01-evidence"],
      },
    }),
    createWorkforceCellProjectionInputWithManagement({
      scope_ref: "cell-scope-02",
      scope_label: "Runtime Review Cell",
      summary_headline: "Review one bounded release package.",
      delivery_posture: "steady",
      active_work_item_count: 1,
      blocked_work_item_count: 0,
      continuity_hint:
        "Review continuity remains bounded to projection-safe workforce truth.",
      delivery_return: {
        delivery_return_ref: "delivery-return-02",
        objective_ref: "objective-02",
        delivery_status: "ready_for_review",
        completed_summary: "Review summary ready.",
        blocked_summary: "",
        next_directive_needed: false,
        safe_evidence_refs: ["delivery-return-02-evidence"],
      },
      approval_request: {
        approval_request_ref: "approval-request-02",
        objective_ref: "objective-02",
        request_kind: "approval",
        request_status: "pending",
        request_summary: "Operator review requested.",
        requested_decision: "Approve bounded release.",
        urgency: "normal",
        safe_evidence_refs: ["approval-request-02-evidence"],
      },
    }),
  ];
}
