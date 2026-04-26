import assert from "node:assert/strict";
import test from "node:test";

import type {
  OperationalUnitRuntimeProjection,
  RuntimeActionClass,
  RuntimeActionReadinessStatus,
  RuntimeStateProjection,
} from "../../runtime-imports/cognitive-runtime.ts";
import {
  adaptOperationalUnitRuntimeProjectionToCellOperationsPanel,
} from "../../projection/adapters/cell-operations-runtime-adapter.ts";
import {
  assembleCellOperationsPanelProjection,
  assembleCellOperationsPanelProjections,
} from "../../projection/assembly/cell-operations-panel-projection.ts";

function createActionSummary(args: {
  action_id: string;
  action_class: RuntimeActionClass;
  readiness_status: RuntimeActionReadinessStatus;
  blocked?: boolean;
}): OperationalUnitRuntimeProjection["action_summaries"][number] {
  return {
    action_id: args.action_id,
    scope_id: "cell-a",
    title: `${args.action_class} action`,
    action_class: args.action_class,
    readiness_status: args.readiness_status,
    requires_confirmation:
      args.action_class !== "auto_local" &&
      args.action_class !== "forbidden_irreversible",
    blocked: args.blocked ?? false,
    reason: `${args.action_class} reason`,
    evidence_refs: [`${args.action_id}-evidence`],
    related_task_refs: ["task-01"],
    related_artifact_refs: ["artifact-01"],
    risk_notes: [`${args.action_class} risk`],
    runtime_private_fields_omitted: true,
    created_at: "2026-04-26T00:00:00.000Z",
  };
}

function createSuggestedNextAction(args: {
  action_id: string;
  action_class: RuntimeActionClass;
  readiness_status: RuntimeActionReadinessStatus;
}): OperationalUnitRuntimeProjection["suggested_next_actions"][number] {
  return {
    action_id: args.action_id,
    project_id: "project-01",
    scope_id: "cell-a",
    title: `${args.action_class} next action`,
    rationale: `${args.action_class} rationale`,
    action_class: args.action_class,
    readiness_status: args.readiness_status,
    evidence_refs: [`${args.action_id}-evidence`],
    related_task_refs: ["task-01"],
    related_artifact_refs: ["artifact-01"],
    runtime_private_fields_omitted: true,
    created_at: "2026-04-26T00:00:00.000Z",
  };
}

function createOperationalUnitProjection(
  overrides: Partial<OperationalUnitRuntimeProjection> = {}
): OperationalUnitRuntimeProjection {
  return {
    operational_unit_id: "unit-a",
    project_id: "project-01",
    scope_summary: {
      scope_id: "cell-a",
      scope_kind: "operational_unit",
      status: "active",
      title: "Cell A",
      summary: "Cell A scope summary",
      evidence_refs: ["scope-evidence"],
      runtime_private_fields_omitted: true,
    },
    status: "active",
    priority_summaries: [
      {
        priority_id: "priority-01",
        scope_id: "cell-a",
        title: "Priority A",
        priority_level: "high",
        rationale: "Keep Cell A moving.",
        related_task_refs: ["task-01"],
        evidence_refs: ["priority-evidence"],
        runtime_private_fields_omitted: true,
        created_at: "2026-04-26T00:00:00.000Z",
      },
    ],
    pending_review_summaries: [
      {
        review_id: "review-01",
        scope_id: "cell-a",
        title: "Review A",
        status: "pending",
        review_kind: "approval",
        review_summary: "Review remains visible and bounded.",
        evidence_gap_summary: "Evidence gap remains visible.",
        evidence_refs: ["review-evidence"],
        runtime_private_fields_omitted: true,
        created_at: "2026-04-26T00:00:00.000Z",
      },
    ],
    recent_artifact_summaries: [
      {
        artifact_id: "artifact-01",
        scope_id: "cell-a",
        artifact_kind: "draft_note",
        title: "Artifact A",
        status: "draft",
        artifact_class: "external_draft",
        source_refs: ["artifact-source"],
        evidence_refs: ["artifact-evidence"],
        runtime_private_fields_omitted: true,
        created_at: "2026-04-26T00:00:00.000Z",
        updated_at: "2026-04-26T00:05:00.000Z",
      },
    ],
    task_summaries: [
      {
        task_id: "task-01",
        scope_id: "cell-a",
        title: "Task A",
        status: "blocked",
        task_kind: "analysis",
        related_artifact_refs: ["artifact-01"],
        evidence_refs: ["task-evidence"],
        runtime_private_fields_omitted: true,
        created_at: "2026-04-26T00:00:00.000Z",
      },
    ],
    action_summaries: [
      createActionSummary({
        action_id: "action-auto-local",
        action_class: "auto_local",
        readiness_status: "ready",
      }),
      createActionSummary({
        action_id: "action-reviewable-local",
        action_class: "reviewable_local",
        readiness_status: "needs_review",
      }),
      createActionSummary({
        action_id: "action-external-draft",
        action_class: "external_draft",
        readiness_status: "needs_review",
      }),
      createActionSummary({
        action_id: "action-limited-external-dispatch",
        action_class: "limited_external_dispatch",
        readiness_status: "deferred",
      }),
      createActionSummary({
        action_id: "action-forbidden-irreversible",
        action_class: "forbidden_irreversible",
        readiness_status: "blocked",
        blocked: true,
      }),
    ],
    learning_summaries: [
      {
        learning_summary_id: "learning-01",
        project_id: "project-01",
        scope_id: "cell-a",
        scope_kind: "operational_unit",
        active_candidates: [
          {
            learning_candidate_id: "learning-accepted",
            project_id: "project-01",
            learning_scope: {
              scope_id: "cell-a",
              scope_kind: "operational_unit",
            },
            application_scope: "scope_only",
            status: "accepted",
            candidate_kind: "reuse_pattern",
            candidate_summary: "Accepted same-scope learning.",
            evidence_refs: ["learning-accepted-evidence"],
            source_refs: ["learning-accepted-source"],
            runtime_private_fields_omitted: true,
            created_at: "2026-04-26T00:00:00.000Z",
          },
        ],
        global_candidate_summaries: [
          {
            learning_candidate_id: "learning-global-candidate",
            project_id: "project-01",
            learning_scope: {
              scope_id: "cell-a",
              scope_kind: "operational_unit",
            },
            application_scope: "global_candidate",
            status: "candidate",
            candidate_kind: "policy_suggestion",
            candidate_summary: "Global candidate remains promotion-only.",
            evidence_refs: ["learning-global-evidence"],
            source_refs: ["learning-global-source"],
            runtime_private_fields_omitted: true,
            created_at: "2026-04-26T00:00:00.000Z",
          },
        ],
        inactive_candidates: [
          {
            learning_candidate_id: "learning-rejected",
            project_id: "project-01",
            learning_scope: {
              scope_id: "cell-a",
              scope_kind: "operational_unit",
            },
            application_scope: "scope_only",
            status: "rejected",
            candidate_kind: "failure_pattern",
            candidate_summary: "Rejected learning remains inactive.",
            evidence_refs: ["learning-rejected-evidence"],
            source_refs: ["learning-rejected-source"],
            runtime_private_fields_omitted: true,
            created_at: "2026-04-26T00:00:00.000Z",
          },
        ],
        preference_suggestions: [
          {
            preference_suggestion_id: "preference-01",
            project_id: "project-01",
            scope_id: "cell-a",
            scope_kind: "operational_unit",
            summary: "Prefer concise Cell A updates.",
            application_scope: "scope_only",
            status: "accepted",
            evidence_refs: ["preference-evidence"],
            runtime_private_fields_omitted: true,
            created_at: "2026-04-26T00:00:00.000Z",
          },
        ],
        active_candidate_count: 1,
        runtime_private_fields_omitted: true,
        created_at: "2026-04-26T00:00:00.000Z",
      },
    ],
    drift_summaries: [
      {
        drift_summary_id: "drift-01",
        project_id: "project-01",
        scope_id: "cell-a",
        drift_kind: "intent_drift",
        affected_scope_refs: ["cell-a"],
        affected_artifact_refs: ["artifact-01"],
        impact_summary: "Clarify the contradictory bounded change.",
        recommendation: "clarify",
        evidence_refs: ["drift-evidence"],
        confidence_posture: "bounded",
        runtime_private_fields_omitted: true,
        created_at: "2026-04-26T00:00:00.000Z",
      },
    ],
    suggested_next_actions: [
      createSuggestedNextAction({
        action_id: "next-auto-local",
        action_class: "auto_local",
        readiness_status: "ready",
      }),
      createSuggestedNextAction({
        action_id: "next-reviewable-local",
        action_class: "reviewable_local",
        readiness_status: "needs_review",
      }),
      createSuggestedNextAction({
        action_id: "next-external-draft",
        action_class: "external_draft",
        readiness_status: "needs_review",
      }),
      createSuggestedNextAction({
        action_id: "next-limited-external-dispatch",
        action_class: "limited_external_dispatch",
        readiness_status: "deferred",
      }),
      createSuggestedNextAction({
        action_id: "next-forbidden-irreversible",
        action_class: "forbidden_irreversible",
        readiness_status: "blocked",
      }),
    ],
    evidence_refs: ["unit-evidence"],
    runtime_private_fields_omitted: true,
    non_executing: true,
    created_at: "2026-04-26T00:00:00.000Z",
    ...overrides,
  };
}

function createRuntimeStateProjection(): RuntimeStateProjection {
  return {
    state_projection_id: "runtime-state-01",
    project_id: "project-01",
    operational_unit_projections: [
      createOperationalUnitProjection(),
      createOperationalUnitProjection({
        operational_unit_id: "unit-b",
        scope_summary: {
          scope_id: "cell-b",
          scope_kind: "operational_unit",
          status: "paused",
          title: "Cell B",
          summary: "Cell B scope summary",
          evidence_refs: ["scope-b-evidence"],
          runtime_private_fields_omitted: true,
        },
        status: "paused",
      }),
    ],
    evidence_refs: ["state-evidence"],
    runtime_private_fields_omitted: true,
    non_executing: true,
    created_at: "2026-04-26T00:00:00.000Z",
  };
}

test("[projection] CellOperationsPanelProjection includes task artifact action learning drift review and suggested-next-action summaries", () => {
  const panel = adaptOperationalUnitRuntimeProjectionToCellOperationsPanel({
    source_runtime_projection_ref: "runtime-state-01",
    operational_unit_projection: createOperationalUnitProjection(),
  });

  assert.equal(panel.projection_scope, "cell_operations_panel_projection");
  assert.equal(panel.authority_boundary, "product_projection_only");
  assert.equal(panel.non_executing, true);
  assert.equal(panel.runtime_private_fields_omitted, true);
  assert.equal(panel.task_summaries.length, 1);
  assert.equal(panel.artifact_summaries.length, 1);
  assert.equal(panel.action_summaries.length, 5);
  assert.equal(panel.learning_summaries.length, 1);
  assert.equal(panel.drift_summaries.length, 1);
  assert.equal(panel.review_summaries.length, 1);
  assert.equal(panel.suggested_next_actions.length, 5);
  assert.ok(panel.history_summaries.length >= 4);
  assert.equal(panel.metric_summary_status, "derived_bounded_counts");
  assert.equal(panel.metric_summaries.length, 5);
});

test("[projection] action classes and readiness are preserved including forbidden blocked limited dispatch deferred and external draft review-only", () => {
  const panel = adaptOperationalUnitRuntimeProjectionToCellOperationsPanel({
    source_runtime_projection_ref: "runtime-state-01",
    operational_unit_projection: createOperationalUnitProjection(),
  });

  const actionsById = new Map(panel.action_summaries.map((action) => [action.action_id, action]));
  assert.equal(actionsById.get("action-auto-local")?.readiness_status, "ready");
  assert.equal(actionsById.get("action-reviewable-local")?.readiness_status, "needs_review");
  assert.equal(actionsById.get("action-external-draft")?.readiness_status, "needs_review");
  assert.equal(actionsById.get("action-limited-external-dispatch")?.readiness_status, "deferred");
  assert.equal(actionsById.get("action-forbidden-irreversible")?.readiness_status, "blocked");
  assert.equal(actionsById.get("action-forbidden-irreversible")?.blocked, true);

  const nextActionsById = new Map(
    panel.suggested_next_actions.map((action) => [action.action_id, action])
  );
  assert.equal(nextActionsById.get("next-limited-external-dispatch")?.readiness_status, "deferred");
  assert.equal(nextActionsById.get("next-forbidden-irreversible")?.readiness_status, "blocked");
});

test("[projection] scoped learning stays scoped and global candidate remains candidate-only", () => {
  const panel = adaptOperationalUnitRuntimeProjectionToCellOperationsPanel({
    source_runtime_projection_ref: "runtime-state-01",
    operational_unit_projection: createOperationalUnitProjection(),
  });

  const learningSummary = panel.learning_summaries[0];
  assert.equal(learningSummary?.active_candidate_count, 1);
  assert.deepEqual(learningSummary?.active_candidate_summaries, [
    "Accepted same-scope learning.",
  ]);
  assert.deepEqual(learningSummary?.global_candidate_summaries, [
    "Global candidate remains promotion-only.",
  ]);
  assert.deepEqual(learningSummary?.inactive_candidate_summaries, [
    "Rejected learning remains inactive.",
  ]);
});

test("[projection] drift recommendations are preserved", () => {
  const panel = adaptOperationalUnitRuntimeProjectionToCellOperationsPanel({
    source_runtime_projection_ref: "runtime-state-01",
    operational_unit_projection: createOperationalUnitProjection(),
  });

  assert.equal(panel.drift_summaries[0]?.recommendation, "clarify");
  assert.match(panel.drift_summaries[0]?.impact_summary ?? "", /contradictory/i);
});

test("[projection] missing artifact summaries degrade gracefully", () => {
  const panel = adaptOperationalUnitRuntimeProjectionToCellOperationsPanel({
    source_runtime_projection_ref: "runtime-state-01",
    operational_unit_projection: createOperationalUnitProjection({
      recent_artifact_summaries: [],
    }),
  });

  assert.deepEqual(panel.artifact_summaries, []);
  assert.ok(panel.history_summaries.every((item) => item.history_kind !== "artifact"));
});

test("[projection] cell operations panel is deterministic and assembly helpers preserve output", () => {
  const input = createOperationalUnitProjection();
  const first = adaptOperationalUnitRuntimeProjectionToCellOperationsPanel({
    source_runtime_projection_ref: "runtime-state-01",
    operational_unit_projection: input,
  });
  const second = adaptOperationalUnitRuntimeProjectionToCellOperationsPanel({
    source_runtime_projection_ref: "runtime-state-01",
    operational_unit_projection: input,
  });
  const assembled = assembleCellOperationsPanelProjection("runtime-state-01", input);
  const assembledMany = assembleCellOperationsPanelProjections(
    createRuntimeStateProjection()
  );

  assert.deepEqual(first, second);
  assert.deepEqual(first, assembled);
  assert.equal(assembledMany.length, 2);
});

test("[projection] runtime-private raw keys and positive capability wording are rejected", () => {
  assert.throws(() =>
    adaptOperationalUnitRuntimeProjectionToCellOperationsPanel({
      source_runtime_projection_ref: "runtime-state-01",
      operational_unit_projection: {
        ...createOperationalUnitProjection(),
        raw_psg: { forbidden: true },
      } as unknown as OperationalUnitRuntimeProjection,
    })
  );

  assert.throws(() =>
    adaptOperationalUnitRuntimeProjectionToCellOperationsPanel({
      source_runtime_projection_ref: "runtime-state-01",
      operational_unit_projection: {
        ...createOperationalUnitProjection(),
        projection_notes: ["provider/channel execution is available"],
      } as unknown as OperationalUnitRuntimeProjection,
    })
  );
});

test("[projection] output does not claim provider or channel execution autonomous operation or UI implementation", () => {
  const panel = adaptOperationalUnitRuntimeProjectionToCellOperationsPanel({
    source_runtime_projection_ref: "runtime-state-01",
    operational_unit_projection: createOperationalUnitProjection(),
  });
  const copySurface = JSON.stringify(panel);

  assert.equal(panel.provider_execution_available, false);
  assert.equal(panel.channel_entry_available, false);
  assert.equal(panel.autonomous_operation_available, false);
  assert.match(copySurface, /V1\.9 Wave 3/);
  assert.match(copySurface, /projection-contract wave/);
  assert.match(copySurface, /does not implement product UI/i);
  assert.doesNotMatch(copySurface, /provider\/channel execution available/i);
  assert.doesNotMatch(copySurface, /autonomous company operation available/i);
});
