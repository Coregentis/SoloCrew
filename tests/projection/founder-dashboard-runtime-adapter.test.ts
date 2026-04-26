import assert from "node:assert/strict";
import test from "node:test";

import type {
  OperationalUnitRuntimeProjection,
  RuntimeActionClass,
  RuntimeActionReadinessStatus,
  RuntimeStateProjection,
} from "../../runtime-imports/cognitive-runtime.ts";
import {
  adaptRuntimeStateProjectionToFounderDashboard,
} from "../../projection/adapters/founder-dashboard-runtime-adapter.ts";
import {
  assembleFounderDashboardProjection,
} from "../../projection/assembly/founder-dashboard-projection.ts";

function createOperationalUnitProjection(input: {
  operational_unit_id: string;
  scope_id: string;
  title: string;
  status?: string;
  action_class?: RuntimeActionClass;
  action_readiness?: RuntimeActionReadinessStatus;
}): OperationalUnitRuntimeProjection {
  return {
    operational_unit_id: input.operational_unit_id,
    project_id: "project-01",
    scope_summary: {
      scope_id: input.scope_id,
      scope_kind: "operational_unit",
      status: input.status ?? "active",
      title: input.title,
      summary: `${input.title} summary`,
      evidence_refs: ["scope-evidence-01"],
      runtime_private_fields_omitted: true,
    },
    status: input.status ?? "active",
    priority_summaries: [
      {
        priority_id: `${input.scope_id}-priority`,
        scope_id: input.scope_id,
        title: `${input.title} priority`,
        priority_level: "high",
        rationale: `Keep ${input.title} focused.`,
        related_task_refs: [`${input.scope_id}-task`],
        evidence_refs: ["priority-evidence-01"],
        runtime_private_fields_omitted: true,
        created_at: "2026-04-26T00:00:00.000Z",
      },
    ],
    pending_review_summaries: [
      {
        review_id: `${input.scope_id}-review`,
        scope_id: input.scope_id,
        title: `${input.title} review`,
        status: "pending",
        review_kind: "approval",
        review_summary: `Review ${input.title} before use.`,
        evidence_gap_summary: `Evidence gap for ${input.title}.`,
        evidence_refs: ["review-evidence-01"],
        runtime_private_fields_omitted: true,
        created_at: "2026-04-26T00:00:00.000Z",
      },
    ],
    recent_artifact_summaries: [
      {
        artifact_id: `${input.scope_id}-artifact`,
        scope_id: input.scope_id,
        artifact_kind: "draft_note",
        title: `${input.title} artifact`,
        status: "draft",
        artifact_class: "external_draft",
        source_refs: ["artifact-source-01"],
        evidence_refs: ["artifact-evidence-01"],
        runtime_private_fields_omitted: true,
        created_at: "2026-04-26T00:00:00.000Z",
        updated_at: "2026-04-26T00:05:00.000Z",
      },
    ],
    task_summaries: [
      {
        task_id: `${input.scope_id}-task`,
        scope_id: input.scope_id,
        title: `${input.title} task`,
        status: "blocked",
        task_kind: "analysis",
        related_artifact_refs: [`${input.scope_id}-artifact`],
        evidence_refs: ["task-evidence-01"],
        runtime_private_fields_omitted: true,
        created_at: "2026-04-26T00:00:00.000Z",
      },
    ],
    action_summaries: [
      {
        action_id: `${input.scope_id}-action`,
        scope_id: input.scope_id,
        title: `${input.title} action`,
        action_class: input.action_class ?? "reviewable_local",
        readiness_status: input.action_readiness ?? "needs_review",
        requires_confirmation: true,
        blocked:
          (input.action_class ?? "reviewable_local") === "forbidden_irreversible",
        reason: `Action posture for ${input.title}.`,
        evidence_refs: ["action-evidence-01"],
        related_task_refs: [`${input.scope_id}-task`],
        related_artifact_refs: [`${input.scope_id}-artifact`],
        risk_notes: ["bounded risk note"],
        runtime_private_fields_omitted: true,
        created_at: "2026-04-26T00:00:00.000Z",
      },
    ],
    learning_summaries: [
      {
        learning_summary_id: `${input.scope_id}-learning`,
        project_id: "project-01",
        scope_id: input.scope_id,
        scope_kind: "operational_unit",
        active_candidates: [
          {
            learning_candidate_id: `${input.scope_id}-accepted-learning`,
            project_id: "project-01",
            learning_scope: {
              scope_id: input.scope_id,
              scope_kind: "operational_unit",
            },
            application_scope: "scope_only",
            status: "accepted",
            candidate_kind: "reuse_pattern",
            candidate_summary: `Accepted learning for ${input.title}.`,
            evidence_refs: ["learning-evidence-01"],
            source_refs: ["learning-source-01"],
            runtime_private_fields_omitted: true,
            created_at: "2026-04-26T00:00:00.000Z",
          },
        ],
        global_candidate_summaries: [
          {
            learning_candidate_id: `${input.scope_id}-global-learning`,
            project_id: "project-01",
            learning_scope: {
              scope_id: input.scope_id,
              scope_kind: "operational_unit",
            },
            application_scope: "global_candidate",
            status: "candidate",
            candidate_kind: "policy_suggestion",
            candidate_summary: `Global candidate for ${input.title}.`,
            evidence_refs: ["learning-evidence-02"],
            source_refs: ["learning-source-02"],
            runtime_private_fields_omitted: true,
            created_at: "2026-04-26T00:00:00.000Z",
          },
        ],
        inactive_candidates: [],
        preference_suggestions: [
          {
            preference_suggestion_id: `${input.scope_id}-preference`,
            project_id: "project-01",
            scope_id: input.scope_id,
            scope_kind: "operational_unit",
            summary: `Preference for ${input.title}.`,
            application_scope: "scope_only",
            status: "accepted",
            evidence_refs: ["preference-evidence-01"],
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
        drift_summary_id: `${input.scope_id}-drift`,
        project_id: "project-01",
        scope_id: input.scope_id,
        drift_kind: "intent_drift",
        affected_scope_refs: [input.scope_id],
        affected_artifact_refs: [`${input.scope_id}-artifact`],
        impact_summary: `Block drift for ${input.title}.`,
        recommendation: "block",
        evidence_refs: ["drift-evidence-01"],
        confidence_posture: "bounded",
        runtime_private_fields_omitted: true,
        created_at: "2026-04-26T00:00:00.000Z",
      },
    ],
    suggested_next_actions: [
      {
        action_id: `${input.scope_id}-next-action`,
        project_id: "project-01",
        scope_id: input.scope_id,
        title: `Next step for ${input.title}`,
        rationale: `Suggested next action for ${input.title}.`,
        action_class: input.action_class ?? "reviewable_local",
        readiness_status: input.action_readiness ?? "needs_review",
        evidence_refs: ["next-action-evidence-01"],
        related_task_refs: [`${input.scope_id}-task`],
        related_artifact_refs: [`${input.scope_id}-artifact`],
        runtime_private_fields_omitted: true,
        created_at: "2026-04-26T00:00:00.000Z",
      },
    ],
    evidence_refs: ["unit-evidence-01"],
    runtime_private_fields_omitted: true,
    non_executing: true,
    created_at: "2026-04-26T00:00:00.000Z",
  };
}

function createRuntimeStateProjection(): RuntimeStateProjection {
  return {
    state_projection_id: "runtime-state-projection-01",
    project_id: "project-01",
    operational_unit_projections: [
      createOperationalUnitProjection({
        operational_unit_id: "unit-b",
        scope_id: "cell-b",
        title: "Cell B",
        status: "paused",
        action_class: "limited_external_dispatch",
        action_readiness: "deferred",
      }),
      createOperationalUnitProjection({
        operational_unit_id: "unit-a",
        scope_id: "cell-a",
        title: "Cell A",
        status: "active",
        action_class: "external_draft",
        action_readiness: "needs_review",
      }),
    ],
    evidence_refs: ["state-evidence-02", "state-evidence-01"],
    runtime_private_fields_omitted: true,
    non_executing: true,
    created_at: "2026-04-26T00:00:00.000Z",
  };
}

test("[projection] FounderDashboardProjection maps multi-scope runtime projection into multiple cell cards", () => {
  const dashboard = adaptRuntimeStateProjectionToFounderDashboard(
    createRuntimeStateProjection()
  );

  assert.equal(dashboard.projection_scope, "founder_dashboard_projection");
  assert.equal(dashboard.authority_boundary, "product_projection_only");
  assert.equal(dashboard.non_executing, true);
  assert.equal(dashboard.runtime_private_fields_omitted, true);
  assert.equal(dashboard.cell_cards.length, 2);
  assert.equal(dashboard.cell_cards[0]?.cell_id, "cell-a");
  assert.equal(dashboard.cell_cards[1]?.cell_id, "cell-b");
  assert.equal(dashboard.cell_cards[0]?.cell_label, "Cell A");
  assert.equal(dashboard.cell_cards[0]?.pending_review_count, 1);
});

test("[projection] FounderDashboardProjection includes pending reviews recent artifacts learned preferences suggested next actions and blocked items", () => {
  const dashboard = adaptRuntimeStateProjectionToFounderDashboard(
    createRuntimeStateProjection()
  );

  assert.equal(dashboard.pending_reviews.length, 2);
  assert.equal(dashboard.recent_artifacts.length, 2);
  assert.equal(dashboard.learned_preferences.length, 2);
  assert.equal(dashboard.suggested_next_actions.length, 2);
  assert.ok(dashboard.blocked_items.length >= 4);
  assert.ok(
    dashboard.learned_preferences.every(
      (preference) => preference.runtime_private_fields_omitted === true
    )
  );
});

test("[projection] FounderDashboardProjection stays deterministic and assembly matches adapter", () => {
  const input = createRuntimeStateProjection();
  const first = adaptRuntimeStateProjectionToFounderDashboard(input);
  const second = adaptRuntimeStateProjectionToFounderDashboard(input);
  const assembled = assembleFounderDashboardProjection(input);

  assert.deepEqual(first, second);
  assert.deepEqual(first, assembled);
});

test("[projection] FounderDashboardProjection rejects raw runtime-private fields and positive capability wording", () => {
  assert.throws(() =>
    adaptRuntimeStateProjectionToFounderDashboard({
      ...createRuntimeStateProjection(),
      raw_vsl: { forbidden: true },
    } as unknown as RuntimeStateProjection)
  );

  assert.throws(() =>
    adaptRuntimeStateProjectionToFounderDashboard({
      ...createRuntimeStateProjection(),
      projection_notes: ["provider/channel execution is available"],
    } as unknown as RuntimeStateProjection)
  );
});

test("[projection] FounderDashboardProjection output does not claim provider execution channel execution autonomous operation or UI implementation", () => {
  const dashboard = adaptRuntimeStateProjectionToFounderDashboard(
    createRuntimeStateProjection()
  );
  const copySurface = JSON.stringify(dashboard);

  assert.equal(dashboard.provider_execution_available, false);
  assert.equal(dashboard.channel_entry_available, false);
  assert.equal(dashboard.autonomous_operation_available, false);
  assert.match(copySurface, /V1\.9 Wave 3/);
  assert.match(copySurface, /projection-contract wave/);
  assert.match(copySurface, /does not implement product UI/i);
  assert.doesNotMatch(copySurface, /provider\/channel execution available/i);
  assert.doesNotMatch(copySurface, /autonomous company operation available/i);
});
