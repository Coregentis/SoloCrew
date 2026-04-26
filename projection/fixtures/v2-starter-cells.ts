import type {
  OperationalUnitRuntimeProjection,
  RuntimeActionClass,
  RuntimeActionReadinessStatus,
  RuntimeArtifactClass,
  RuntimeContinuationRecommendation,
  RuntimePriorityLevel,
  RuntimeStateProjection,
} from "../../runtime-imports/cognitive-runtime.ts";

export const V2_STARTER_CELLS_PROJECT_ID = "v2-starter-cells-project";
export const V2_STARTER_RUNTIME_STATE_PROJECTION_ID =
  "v2-starter-cells-runtime-state-projection";

export const V2_STARTER_CELL_IDS = [
  "development_company",
  "ecommerce",
  "personal_media",
] as const;

export type V2StarterCellId = (typeof V2_STARTER_CELL_IDS)[number];

export interface V2StarterCellDefinition {
  cell_id: V2StarterCellId;
  cell_label: string;
  cell_kind: V2StarterCellId;
  purpose: string;
  default_job_to_be_done: string;
  default_tasks: readonly string[];
  default_artifacts: readonly string[];
  default_memory_fields: readonly string[];
  default_learning_fields: readonly string[];
  default_drift_risks: readonly string[];
  default_action_classes: readonly RuntimeActionClass[];
  default_review_posture: string;
  minimum_acceptance_example: string;
  forbidden_scopes: readonly string[];
}

const FIXTURE_CREATED_AT = "2026-04-26T00:00:00.000Z";
const FIXTURE_UPDATED_AT = "2026-04-26T00:20:00.000Z";

export const V2_STARTER_CELL_DEFINITIONS: readonly V2StarterCellDefinition[] = [
  {
    cell_id: "development_company",
    cell_label: "Development Company Cell",
    cell_kind: "development_company",
    purpose:
      "Operate product, engineering, and release work for a software or agent project.",
    default_job_to_be_done:
      "Turn goals and changes into structured development work and reusable delivery artifacts.",
    default_tasks: [
      "Requirement clarification",
      "PRD shaping",
      "Issue drafting",
      "Task breakdown",
      "Implementation planning",
      "Release preparation",
    ],
    default_artifacts: [
      "PRD",
      "Issue draft",
      "Task breakdown",
      "Implementation plan",
      "Code or file draft",
      "Release note",
      "Review packet",
    ],
    default_memory_fields: [
      "Project objective",
      "Repo and codebase context",
      "Architecture notes",
      "Delivery constraints",
      "Accepted decisions",
      "Release history summary",
    ],
    default_learning_fields: [
      "Code style preferences",
      "Task decomposition preferences",
      "Review depth preference",
      "Release note format preference",
      "Failure-pattern reminders",
    ],
    default_drift_risks: [
      "Changed product requirements",
      "Stale implementation plan",
      "Dependency mismatch",
      "Release-scope drift",
      "Conflicting issue priority",
    ],
    default_action_classes: [
      "auto_local",
      "reviewable_local",
      "external_draft",
    ],
    default_review_posture: "Review before using delivery artifacts.",
    minimum_acceptance_example:
      "Open the Cell, request a feature plan, receive a usable PRD or task-breakdown artifact, revise it, and resume it after restart.",
    forbidden_scopes: [
      "No provider or channel dispatch.",
      "No irreversible financial or legal action.",
    ],
  },
  {
    cell_id: "ecommerce",
    cell_label: "E-commerce Cell",
    cell_kind: "ecommerce",
    purpose:
      "Operate product-listing, merchandising, campaign, and customer-response drafting work.",
    default_job_to_be_done:
      "Turn product and selling intent into usable commercial artifacts without automatic dispatch.",
    default_tasks: [
      "Listing creation",
      "Copy revision",
      "Campaign planning",
      "Offer iteration",
      "Customer response drafting",
    ],
    default_artifacts: [
      "Product title",
      "Listing copy",
      "Selling points",
      "Campaign plan",
      "Customer response draft",
      "Review packet",
    ],
    default_memory_fields: [
      "Product catalog context",
      "Brand tone",
      "Offer constraints",
      "Channel formatting notes",
      "Customer objection patterns",
    ],
    default_learning_fields: [
      "Brand voice preference",
      "Preferred listing structure",
      "Campaign tone",
      "Objection-handling style",
      "Artifact feedback patterns",
    ],
    default_drift_risks: [
      "Changed pricing or product facts",
      "Stale inventory assumptions",
      "Changed brand guidance",
      "Conflicting campaign goal",
      "Cross-channel formatting mismatch",
    ],
    default_action_classes: [
      "auto_local",
      "reviewable_local",
      "external_draft",
    ],
    default_review_posture: "Review before using listing and campaign artifacts.",
    minimum_acceptance_example:
      "Open the Cell, request a listing package, receive usable listing artifacts, revise them, and preserve brand-tone learning inside that Cell.",
    forbidden_scopes: [
      "No uncontrolled external dispatch.",
      "No irreversible financial or legal action.",
    ],
  },
  {
    cell_id: "personal_media",
    cell_label: "Personal Media Cell",
    cell_kind: "personal_media",
    purpose:
      "Operate repeatable content planning and draft-production work for personal publishing.",
    default_job_to_be_done:
      "Turn topics, notes, and audience intent into reusable content artifacts across sessions.",
    default_tasks: [
      "Topic shaping",
      "Article drafting",
      "Title iteration",
      "Summary drafting",
      "Tag generation",
      "Content calendar suggestion",
    ],
    default_artifacts: [
      "Article draft",
      "Title",
      "Summary",
      "Tags",
      "Content calendar suggestion",
      "Review packet",
    ],
    default_memory_fields: [
      "Voice and tone notes",
      "Audience focus",
      "Recurring themes",
      "Publishing cadence",
      "Content backlog context",
    ],
    default_learning_fields: [
      "Style preference learning",
      "Preferred structure",
      "Title preference",
      "Summary preference",
      "Feedback-derived revision patterns",
    ],
    default_drift_risks: [
      "Changed audience target",
      "Stale topic framing",
      "Conflicting content goal",
      "Preference drift across channels",
      "Schedule or cadence change",
    ],
    default_action_classes: [
      "auto_local",
      "reviewable_local",
      "external_draft",
    ],
    default_review_posture: "Review before using content packages outside the Cell.",
    minimum_acceptance_example:
      "Open the Cell, request an article package, receive article, title, summary, tags, and calendar suggestion artifacts, and keep style learning scoped to that Cell.",
    forbidden_scopes: [
      "No uncontrolled external dispatch.",
      "No irreversible financial or legal action.",
    ],
  },
] as const;

type StarterCellSeed = {
  status: string;
  scope_summary: string;
  priority_title: string;
  priority_level: RuntimePriorityLevel;
  priority_rationale: string;
  review_title: string;
  review_summary: string;
  evidence_gap_summary: string;
  artifacts: ReadonlyArray<{
    artifact_kind: string;
    title: string;
    status: string;
    artifact_class: RuntimeArtifactClass;
  }>;
  tasks: ReadonlyArray<{
    title: string;
    status: string;
    task_kind: string;
    related_artifact_indexes: readonly number[];
  }>;
  actions: ReadonlyArray<{
    title: string;
    action_class: RuntimeActionClass;
    readiness_status: RuntimeActionReadinessStatus;
    blocked: boolean;
    reason: string;
    risk_notes: readonly string[];
    related_task_indexes: readonly number[];
    related_artifact_indexes: readonly number[];
  }>;
  learning: {
    accepted_candidate_kind: string;
    accepted_candidate_summary: string;
    global_candidate_kind: string;
    global_candidate_summary: string;
    inactive_candidate_kind: string;
    inactive_candidate_summary: string;
    preference_summary: string;
  };
  drift: {
    drift_kind: string;
    impact_summary: string;
    recommendation: RuntimeContinuationRecommendation;
    confidence_posture: "bounded";
  };
  suggested_actions: ReadonlyArray<{
    title: string;
    rationale: string;
    action_class: RuntimeActionClass;
    readiness_status: RuntimeActionReadinessStatus;
    related_task_indexes: readonly number[];
    related_artifact_indexes: readonly number[];
  }>;
};

const STARTER_CELL_SEEDS: Record<V2StarterCellId, StarterCellSeed> = {
  development_company: {
    status: "active",
    scope_summary:
      "Product, engineering, and release work stays aligned through one bounded delivery lane.",
    priority_title: "Refresh the delivery-ready implementation plan",
    priority_level: "high",
    priority_rationale:
      "Keep requirements, task breakdown, and release notes aligned for the current milestone.",
    review_title: "Review implementation plan packet",
    review_summary:
      "Review the implementation package before reusing it in the next planning step.",
    evidence_gap_summary:
      "Dependency notes are still incomplete for the current milestone.",
    artifacts: [
      {
        artifact_kind: "implementation_plan",
        title: "Current milestone implementation plan",
        status: "draft",
        artifact_class: "local_generated",
      },
      {
        artifact_kind: "review_packet",
        title: "Release note review packet",
        status: "draft",
        artifact_class: "external_draft",
      },
    ],
    tasks: [
      {
        title: "Clarify the bounded feature scope",
        status: "active",
        task_kind: "requirement_clarification",
        related_artifact_indexes: [0],
      },
      {
        title: "Draft the current task breakdown update",
        status: "blocked",
        task_kind: "task_breakdown",
        related_artifact_indexes: [0, 1],
      },
    ],
    actions: [
      {
        title: "Refresh the local task breakdown",
        action_class: "auto_local",
        readiness_status: "ready",
        blocked: false,
        reason: "Local task and memory updates remain ready.",
        risk_notes: ["Keep the implementation notes scoped to the current milestone."],
        related_task_indexes: [0, 1],
        related_artifact_indexes: [0],
      },
      {
        title: "Prepare the local issue draft",
        action_class: "reviewable_local",
        readiness_status: "needs_review",
        blocked: false,
        reason: "Local issue drafting stays review-gated.",
        risk_notes: ["Check architecture notes before reuse."],
        related_task_indexes: [1],
        related_artifact_indexes: [0],
      },
      {
        title: "Draft the release note packet",
        action_class: "external_draft",
        readiness_status: "needs_review",
        blocked: false,
        reason: "Draft output remains bounded and review-only.",
        risk_notes: ["Keep the release summary aligned with accepted scope."],
        related_task_indexes: [1],
        related_artifact_indexes: [1],
      },
      {
        title: "Stage a later handoff for confirmation",
        action_class: "limited_external_dispatch",
        readiness_status: "deferred",
        blocked: false,
        reason: "Any later handoff stays deferred in this fixture.",
        risk_notes: ["No later handoff occurs in this wave."],
        related_task_indexes: [1],
        related_artifact_indexes: [1],
      },
      {
        title: "Attempt an irreversible budget action",
        action_class: "forbidden_irreversible",
        readiness_status: "blocked",
        blocked: true,
        reason: "Irreversible action remains blocked by the boundary.",
        risk_notes: ["Escalate to the operator outside this fixture."],
        related_task_indexes: [1],
        related_artifact_indexes: [1],
      },
    ],
    learning: {
      accepted_candidate_kind: "workflow_preference",
      accepted_candidate_summary:
        "Reuse the concise task-breakdown format for development work.",
      global_candidate_kind: "process_pattern",
      global_candidate_summary:
        "Promote the release checklist pattern only after more evidence.",
      inactive_candidate_kind: "failure_pattern",
      inactive_candidate_summary:
        "Do not reuse stale dependency framing when the milestone changes.",
      preference_summary: "Prefer concise issue and release summaries.",
    },
    drift: {
      drift_kind: "requirement_change",
      impact_summary:
        "A changed requirement altered the current implementation plan scope.",
      recommendation: "revise",
      confidence_posture: "bounded",
    },
    suggested_actions: [
      {
        title: "Refresh the milestone task breakdown",
        rationale:
          "The current plan should be revised before the next review packet is reused.",
        action_class: "auto_local",
        readiness_status: "ready",
        related_task_indexes: [1],
        related_artifact_indexes: [0],
      },
      {
        title: "Prepare the next local issue draft",
        rationale:
          "The issue draft keeps the work visible without widening execution scope.",
        action_class: "reviewable_local",
        readiness_status: "needs_review",
        related_task_indexes: [0, 1],
        related_artifact_indexes: [0],
      },
    ],
  },
  ecommerce: {
    status: "active",
    scope_summary:
      "Listing, offer, and customer-response work stays bounded inside one merchandising lane.",
    priority_title: "Refresh the current listing package",
    priority_level: "high",
    priority_rationale:
      "Keep product facts, selling points, and campaign copy aligned for the current offer.",
    review_title: "Review listing revision pack",
    review_summary:
      "Review the listing and campaign package before reusing it in another step.",
    evidence_gap_summary:
      "Current product facts still need one more bounded verification pass.",
    artifacts: [
      {
        artifact_kind: "campaign_plan",
        title: "Offer refresh campaign plan",
        status: "draft",
        artifact_class: "local_generated",
      },
      {
        artifact_kind: "listing_copy",
        title: "Updated listing copy draft",
        status: "draft",
        artifact_class: "external_draft",
      },
    ],
    tasks: [
      {
        title: "Revise the product title and selling points",
        status: "active",
        task_kind: "listing_revision",
        related_artifact_indexes: [1],
      },
      {
        title: "Align the campaign copy with the current offer",
        status: "blocked",
        task_kind: "campaign_alignment",
        related_artifact_indexes: [0, 1],
      },
    ],
    actions: [
      {
        title: "Refresh the local product memory notes",
        action_class: "auto_local",
        readiness_status: "ready",
        blocked: false,
        reason: "Local catalog notes remain ready for bounded updates.",
        risk_notes: ["Keep current offer assumptions aligned with the latest facts."],
        related_task_indexes: [0, 1],
        related_artifact_indexes: [0, 1],
      },
      {
        title: "Prepare the local listing revision candidate",
        action_class: "reviewable_local",
        readiness_status: "needs_review",
        blocked: false,
        reason: "Local listing changes stay review-gated.",
        risk_notes: ["Recheck brand tone before reuse."],
        related_task_indexes: [0],
        related_artifact_indexes: [1],
      },
      {
        title: "Draft the customer response bundle",
        action_class: "external_draft",
        readiness_status: "needs_review",
        blocked: false,
        reason: "Customer-facing drafts remain review-only.",
        risk_notes: ["Keep promise language aligned with the current offer."],
        related_task_indexes: [1],
        related_artifact_indexes: [1],
      },
      {
        title: "Stage a later merchandising handoff",
        action_class: "limited_external_dispatch",
        readiness_status: "deferred",
        blocked: false,
        reason: "Any later handoff stays deferred in this fixture.",
        risk_notes: ["No later handoff occurs in this wave."],
        related_task_indexes: [1],
        related_artifact_indexes: [0],
      },
      {
        title: "Attempt an irreversible order commitment",
        action_class: "forbidden_irreversible",
        readiness_status: "blocked",
        blocked: true,
        reason: "Irreversible action remains blocked by the boundary.",
        risk_notes: ["Escalate to the operator outside this fixture."],
        related_task_indexes: [1],
        related_artifact_indexes: [0, 1],
      },
    ],
    learning: {
      accepted_candidate_kind: "copy_preference",
      accepted_candidate_summary:
        "Reuse the short-form selling-point structure for listing work.",
      global_candidate_kind: "objection_pattern",
      global_candidate_summary:
        "Promote the objection-handling pattern only after more evidence.",
      inactive_candidate_kind: "campaign_pattern",
      inactive_candidate_summary:
        "Do not reuse stale offer framing when product facts change.",
      preference_summary: "Prefer benefit-first listing copy.",
    },
    drift: {
      drift_kind: "catalog_change",
      impact_summary:
        "Updated product facts changed the current listing package.",
      recommendation: "clarify",
      confidence_posture: "bounded",
    },
    suggested_actions: [
      {
        title: "Prepare the local listing revision candidate",
        rationale:
          "The updated product facts should be reflected before reuse of listing drafts.",
        action_class: "reviewable_local",
        readiness_status: "needs_review",
        related_task_indexes: [0],
        related_artifact_indexes: [1],
      },
      {
        title: "Refresh the product memory notes",
        rationale:
          "The catalog context should stay aligned with the latest offer facts.",
        action_class: "auto_local",
        readiness_status: "ready",
        related_task_indexes: [1],
        related_artifact_indexes: [0],
      },
    ],
  },
  personal_media: {
    status: "active",
    scope_summary:
      "Content planning and draft production stays bounded inside one publishing lane.",
    priority_title: "Refresh the current article package",
    priority_level: "medium",
    priority_rationale:
      "Keep article angle, summary, and calendar suggestion aligned with the current audience focus.",
    review_title: "Review article draft package",
    review_summary:
      "Review the article package before reusing it in another content step.",
    evidence_gap_summary:
      "The current audience note still needs one more bounded clarification pass.",
    artifacts: [
      {
        artifact_kind: "content_calendar_suggestion",
        title: "Weekly content calendar suggestion",
        status: "draft",
        artifact_class: "local_generated",
      },
      {
        artifact_kind: "article_draft",
        title: "Long-form article draft",
        status: "draft",
        artifact_class: "external_draft",
      },
    ],
    tasks: [
      {
        title: "Shape the current article angle",
        status: "active",
        task_kind: "topic_shaping",
        related_artifact_indexes: [1],
      },
      {
        title: "Refresh the weekly content calendar suggestion",
        status: "blocked",
        task_kind: "calendar_planning",
        related_artifact_indexes: [0, 1],
      },
    ],
    actions: [
      {
        title: "Refresh the local topic memory notes",
        action_class: "auto_local",
        readiness_status: "ready",
        blocked: false,
        reason: "Local topic notes remain ready for bounded updates.",
        risk_notes: ["Keep audience notes aligned with the current theme."],
        related_task_indexes: [0, 1],
        related_artifact_indexes: [0, 1],
      },
      {
        title: "Prepare the local article structure candidate",
        action_class: "reviewable_local",
        readiness_status: "needs_review",
        blocked: false,
        reason: "Local structure changes stay review-gated.",
        risk_notes: ["Keep the article outline aligned with the audience focus."],
        related_task_indexes: [0],
        related_artifact_indexes: [1],
      },
      {
        title: "Draft the article summary bundle",
        action_class: "external_draft",
        readiness_status: "needs_review",
        blocked: false,
        reason: "Content drafts remain bounded and review-only.",
        risk_notes: ["Keep the summary bundle aligned with the current schedule."],
        related_task_indexes: [0, 1],
        related_artifact_indexes: [1],
      },
      {
        title: "Stage a later publishing handoff",
        action_class: "limited_external_dispatch",
        readiness_status: "deferred",
        blocked: false,
        reason: "Any later handoff stays deferred in this fixture.",
        risk_notes: ["No later handoff occurs in this wave."],
        related_task_indexes: [1],
        related_artifact_indexes: [0],
      },
      {
        title: "Attempt an irreversible rights action",
        action_class: "forbidden_irreversible",
        readiness_status: "blocked",
        blocked: true,
        reason: "Irreversible action remains blocked by the boundary.",
        risk_notes: ["Escalate to the operator outside this fixture."],
        related_task_indexes: [1],
        related_artifact_indexes: [1],
      },
    ],
    learning: {
      accepted_candidate_kind: "style_preference",
      accepted_candidate_summary:
        "Reuse the reflective article opening pattern for this content lane.",
      global_candidate_kind: "title_pattern",
      global_candidate_summary:
        "Promote the title rhythm pattern only after more evidence.",
      inactive_candidate_kind: "schedule_pattern",
      inactive_candidate_summary:
        "Do not reuse stale cadence framing when the content plan changes.",
      preference_summary: "Prefer reflective long-form summaries.",
    },
    drift: {
      drift_kind: "audience_shift",
      impact_summary:
        "A changed audience focus altered the current content plan.",
      recommendation: "branch",
      confidence_posture: "bounded",
    },
    suggested_actions: [
      {
        title: "Prepare the local article structure candidate",
        rationale:
          "The content angle should be stabilized before the next review packet is reused.",
        action_class: "reviewable_local",
        readiness_status: "needs_review",
        related_task_indexes: [0],
        related_artifact_indexes: [1],
      },
      {
        title: "Refresh the topic memory notes",
        rationale:
          "The audience notes should stay aligned with the current article plan.",
        action_class: "auto_local",
        readiness_status: "ready",
        related_task_indexes: [1],
        related_artifact_indexes: [0],
      },
    ],
  },
};

function find_starter_cell_definition(
  cell_id: V2StarterCellId
): V2StarterCellDefinition {
  const definition = V2_STARTER_CELL_DEFINITIONS.find(
    (entry) => entry.cell_id === cell_id
  );

  if (!definition) {
    throw new Error(`Missing starter cell definition for ${cell_id}.`);
  }

  return definition;
}

function make_ref(
  cell_id: V2StarterCellId,
  area: string,
  suffix: string
): string {
  return `${cell_id}-${area}-${suffix}`;
}

function create_action_summary(
  cell_id: V2StarterCellId,
  scope_id: string,
  task_ids: string[],
  artifact_ids: string[],
  index: number,
  action: StarterCellSeed["actions"][number]
): OperationalUnitRuntimeProjection["action_summaries"][number] {
  const source_evidence_refs = [
    make_ref(cell_id, "action-evidence", String(index + 1)),
  ];

  return {
    action_id: make_ref(cell_id, "action", String(index + 1)),
    scope_id,
    title: action.title,
    action_class: action.action_class,
    readiness_status: action.readiness_status,
    requires_confirmation:
      action.action_class !== "auto_local" &&
      action.action_class !== "forbidden_irreversible",
    blocked: action.blocked,
    reason: action.reason,
    evidence_refs: [...source_evidence_refs],
    source_evidence_refs,
    related_task_refs: action.related_task_indexes.map((task_index) => task_ids[task_index] ?? ""),
    related_artifact_refs: action.related_artifact_indexes.map(
      (artifact_index) => artifact_ids[artifact_index] ?? ""
    ),
    risk_notes: [...action.risk_notes],
    runtime_private_fields_omitted: true,
    created_at: FIXTURE_CREATED_AT,
  };
}

function create_suggested_next_action(
  cell_id: V2StarterCellId,
  scope_id: string,
  project_id: string,
  task_ids: string[],
  artifact_ids: string[],
  index: number,
  action: StarterCellSeed["suggested_actions"][number]
): OperationalUnitRuntimeProjection["suggested_next_actions"][number] {
  return {
    action_id: make_ref(cell_id, "suggested-action", String(index + 1)),
    project_id,
    scope_id,
    title: action.title,
    rationale: action.rationale,
    action_class: action.action_class,
    readiness_status: action.readiness_status,
    evidence_refs: [
      make_ref(cell_id, "suggested-action-evidence", String(index + 1)),
    ],
    related_task_refs: action.related_task_indexes.map(
      (task_index) => task_ids[task_index] ?? ""
    ),
    related_artifact_refs: action.related_artifact_indexes.map(
      (artifact_index) => artifact_ids[artifact_index] ?? ""
    ),
    runtime_private_fields_omitted: true,
    created_at: FIXTURE_CREATED_AT,
  };
}

export function createV2StarterCellOperationalUnitProjection(
  cell_id: V2StarterCellId,
  project_id = V2_STARTER_CELLS_PROJECT_ID
): OperationalUnitRuntimeProjection {
  const definition = find_starter_cell_definition(cell_id);
  const seed = STARTER_CELL_SEEDS[cell_id];
  const scope_id = definition.cell_id;
  const operational_unit_id = `${definition.cell_id}-operational-unit`;

  const artifact_ids = seed.artifacts.map((_, index) =>
    make_ref(cell_id, "artifact", String(index + 1))
  );
  const task_ids = seed.tasks.map((_, index) =>
    make_ref(cell_id, "task", String(index + 1))
  );

  return {
    operational_unit_id,
    project_id,
    scope_summary: {
      scope_id,
      scope_kind: "operational_unit",
      status: seed.status,
      title: definition.cell_label,
      summary: seed.scope_summary,
      evidence_refs: [make_ref(cell_id, "scope-evidence", "01")],
      runtime_private_fields_omitted: true,
    },
    status: seed.status,
    priority_summaries: [
      {
        priority_id: make_ref(cell_id, "priority", "01"),
        scope_id,
        title: seed.priority_title,
        priority_level: seed.priority_level,
        rationale: seed.priority_rationale,
        related_task_refs: [task_ids[0]],
        evidence_refs: [make_ref(cell_id, "priority-evidence", "01")],
        runtime_private_fields_omitted: true,
        created_at: FIXTURE_CREATED_AT,
      },
    ],
    pending_review_summaries: [
      {
        review_id: make_ref(cell_id, "review", "01"),
        scope_id,
        title: seed.review_title,
        status: "pending",
        review_kind: "bounded_review",
        review_summary: seed.review_summary,
        evidence_gap_summary: seed.evidence_gap_summary,
        evidence_refs: [make_ref(cell_id, "review-evidence", "01")],
        runtime_private_fields_omitted: true,
        created_at: FIXTURE_CREATED_AT,
      },
    ],
    recent_artifact_summaries: seed.artifacts.map((artifact, index) => ({
      artifact_id: artifact_ids[index],
      scope_id,
      artifact_kind: artifact.artifact_kind,
      title: artifact.title,
      status: artifact.status,
      artifact_class: artifact.artifact_class,
      source_refs: [make_ref(cell_id, "artifact-source", String(index + 1))],
      evidence_refs: [make_ref(cell_id, "artifact-evidence", String(index + 1))],
      runtime_private_fields_omitted: true,
      created_at: FIXTURE_CREATED_AT,
      updated_at: FIXTURE_UPDATED_AT,
    })),
    task_summaries: seed.tasks.map((task, index) => ({
      task_id: task_ids[index],
      scope_id,
      title: task.title,
      status: task.status,
      task_kind: task.task_kind,
      related_artifact_refs: task.related_artifact_indexes.map(
        (artifact_index) => artifact_ids[artifact_index] ?? ""
      ),
      evidence_refs: [make_ref(cell_id, "task-evidence", String(index + 1))],
      source_evidence_refs: [make_ref(cell_id, "task-evidence", String(index + 1))],
      runtime_private_fields_omitted: true,
      created_at: FIXTURE_CREATED_AT,
    })),
    action_summaries: seed.actions.map((action, index) =>
      create_action_summary(cell_id, scope_id, task_ids, artifact_ids, index, action)
    ),
    learning_summaries: [
      {
        learning_summary_id: make_ref(cell_id, "learning-summary", "01"),
        project_id,
        scope_id,
        scope_kind: "operational_unit",
        active_candidates: [
          {
            learning_candidate_id: make_ref(cell_id, "learning-active", "01"),
            project_id,
            learning_scope: {
              scope_id,
              scope_kind: "operational_unit",
            },
            application_scope: "scope_only",
            status: "accepted",
            candidate_kind: seed.learning.accepted_candidate_kind,
            candidate_summary: seed.learning.accepted_candidate_summary,
            evidence_refs: [make_ref(cell_id, "learning-active-evidence", "01")],
            source_refs: [make_ref(cell_id, "learning-active-source", "01")],
            runtime_private_fields_omitted: true,
            created_at: FIXTURE_CREATED_AT,
          },
        ],
        global_candidate_summaries: [
          {
            learning_candidate_id: make_ref(cell_id, "learning-global", "01"),
            project_id,
            learning_scope: {
              scope_id,
              scope_kind: "operational_unit",
            },
            application_scope: "global_candidate",
            status: "candidate",
            candidate_kind: seed.learning.global_candidate_kind,
            candidate_summary: seed.learning.global_candidate_summary,
            evidence_refs: [make_ref(cell_id, "learning-global-evidence", "01")],
            source_refs: [make_ref(cell_id, "learning-global-source", "01")],
            runtime_private_fields_omitted: true,
            created_at: FIXTURE_CREATED_AT,
          },
        ],
        inactive_candidates: [
          {
            learning_candidate_id: make_ref(cell_id, "learning-inactive", "01"),
            project_id,
            learning_scope: {
              scope_id,
              scope_kind: "operational_unit",
            },
            application_scope: "scope_only",
            status: "rejected",
            candidate_kind: seed.learning.inactive_candidate_kind,
            candidate_summary: seed.learning.inactive_candidate_summary,
            evidence_refs: [make_ref(cell_id, "learning-inactive-evidence", "01")],
            source_refs: [make_ref(cell_id, "learning-inactive-source", "01")],
            runtime_private_fields_omitted: true,
            created_at: FIXTURE_CREATED_AT,
          },
        ],
        preference_suggestions: [
          {
            preference_suggestion_id: make_ref(cell_id, "preference", "01"),
            project_id,
            scope_id,
            scope_kind: "operational_unit",
            summary: seed.learning.preference_summary,
            application_scope: "scope_only",
            status: "accepted",
            evidence_refs: [make_ref(cell_id, "preference-evidence", "01")],
            runtime_private_fields_omitted: true,
            created_at: FIXTURE_CREATED_AT,
          },
        ],
        active_candidate_count: 1,
        runtime_private_fields_omitted: true,
        created_at: FIXTURE_CREATED_AT,
      },
    ],
    drift_summaries: [
      {
        drift_summary_id: make_ref(cell_id, "drift", "01"),
        project_id,
        scope_id,
        drift_kind: seed.drift.drift_kind,
        affected_scope_refs: [scope_id],
        affected_artifact_refs: [artifact_ids[0]],
        impact_summary: seed.drift.impact_summary,
        recommendation: seed.drift.recommendation,
        evidence_refs: [make_ref(cell_id, "drift-evidence", "01")],
        confidence_posture: seed.drift.confidence_posture,
        runtime_private_fields_omitted: true,
        created_at: FIXTURE_CREATED_AT,
      },
    ],
    suggested_next_actions: seed.suggested_actions.map((action, index) =>
      create_suggested_next_action(
        cell_id,
        scope_id,
        project_id,
        task_ids,
        artifact_ids,
        index,
        action
      )
    ),
    evidence_refs: [make_ref(cell_id, "unit-evidence", "01")],
    runtime_private_fields_omitted: true,
    non_executing: true,
    created_at: FIXTURE_CREATED_AT,
  };
}

export function createV2StarterCellOperationalUnitProjections(
  project_id = V2_STARTER_CELLS_PROJECT_ID
): OperationalUnitRuntimeProjection[] {
  return V2_STARTER_CELL_IDS.map((cell_id) =>
    createV2StarterCellOperationalUnitProjection(cell_id, project_id)
  );
}

export function createV2StarterCellsRuntimeStateProjection(
  project_id = V2_STARTER_CELLS_PROJECT_ID
): RuntimeStateProjection {
  return {
    state_projection_id: `${project_id}-${V2_STARTER_RUNTIME_STATE_PROJECTION_ID}`,
    project_id,
    operational_unit_projections:
      createV2StarterCellOperationalUnitProjections(project_id),
    evidence_refs: [
      "starter-cells-state-evidence-01",
      "starter-cells-state-evidence-02",
    ],
    runtime_private_fields_omitted: true,
    non_executing: true,
    created_at: FIXTURE_CREATED_AT,
  };
}
