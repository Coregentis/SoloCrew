import type {
  FounderDashboardShellPageModel,
} from "../engagement/engagement-compatibility-aliases.ts";

export const FOUNDER_DASHBOARD_ROUTE = "/portfolio/founder-dashboard";

export interface FounderDashboardPage {
  route_path: string;
  page_kind: "founder_dashboard_page";
  page_scope: "founder_dashboard_thin_consumption_only";
  operator_surface: "founder_dashboard_thin_consumption";
  authority_boundary: "app_page_projection_consumer";
  phase_boundary: "v1_9_wave4_product_surface_thin_consumption";
  phase_ref: "founder_dashboard_thin_consumption";
  non_executing: true;
  runtime_private_fields_omitted: true;
  provider_execution_available: false;
  channel_entry_available: false;
  autonomous_operation_available: false;
  readiness_status: false;
  v2_0_ready: false;
  sections: {
    header: {
      route_path: string;
      read_mode: "thin_consumption_only";
      source_projection_ref: string;
      boundary_notes: string[];
    };
    dashboard_surface: FounderDashboardShellPageModel["dashboard_surface"];
    source_evidence_refs: string[];
    deferred_items: string[];
    non_claims: string[];
  };
  html: string;
}

function escape_html(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderFounderDashboardPage(
  model: FounderDashboardShellPageModel
): FounderDashboardPage {
  const sections = {
    header: {
      route_path: FOUNDER_DASHBOARD_ROUTE,
      read_mode: "thin_consumption_only" as const,
      source_projection_ref: model.source_projection_ref,
      boundary_notes: [...model.boundary_notes],
    },
    dashboard_surface: model.dashboard_surface,
    source_evidence_refs: [...model.source_evidence_refs],
    deferred_items: [...model.deferred_items],
    non_claims: [...model.non_claims],
  };

  const html = [
    "<main>",
    "<section data-section=\"header\">",
    "<h1>Founder Dashboard</h1>",
    `<p>Read mode: ${sections.header.read_mode}</p>`,
    `<p>Route: ${escape_html(sections.header.route_path)}</p>`,
    `<p>Source projection ref: ${escape_html(sections.header.source_projection_ref)}</p>`,
    ...sections.header.boundary_notes.map(
      (note) => `<p>Boundary note: ${escape_html(note)}</p>`
    ),
    "</section>",
    "<section data-section=\"cell-cards\">",
    "<h2>Cell Cards</h2>",
    ...sections.dashboard_surface.cell_cards.map((card) =>
      [
        `<article data-cell-id="${escape_html(card.cell_id)}">`,
        `<h3>${escape_html(card.cell_label)}</h3>`,
        `<p>Status: ${escape_html(card.status)}</p>`,
        `<p>Objective summary: ${escape_html(card.objective_summary)}</p>`,
        `<p>Current priority summary: ${escape_html(card.current_priority_summary)}</p>`,
        `<p>Pending review count: ${card.pending_review_count}</p>`,
        `<p>Recent artifact count: ${card.recent_artifact_count}</p>`,
        `<p>Active learning count: ${card.active_learning_count}</p>`,
        `<p>Blocked item count: ${card.blocked_item_count}</p>`,
        ...(card.next_action_summary
          ? [`<p>Next action summary: ${escape_html(card.next_action_summary)}</p>`]
          : []),
        "</article>",
      ].join("")
    ),
    "</section>",
    "<section data-section=\"pending-reviews\">",
    "<h2>Pending Reviews</h2>",
    ...sections.dashboard_surface.pending_reviews.map((review) =>
      `<p>Pending review: ${escape_html(review.cell_label)} -> ${escape_html(review.title)} [${escape_html(review.status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"recent-artifacts\">",
    "<h2>Recent Artifacts</h2>",
    ...sections.dashboard_surface.recent_artifacts.map((artifact) =>
      `<p>Recent artifact: ${escape_html(artifact.cell_label)} -> ${escape_html(artifact.title)} [${escape_html(artifact.artifact_class)} / ${escape_html(artifact.status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"learned-preferences\">",
    "<h2>Learned Preferences</h2>",
    ...sections.dashboard_surface.learned_preferences.map((preference) =>
      `<p>Learned preference: ${escape_html(preference.cell_label)} -> ${escape_html(preference.summary)} [${escape_html(preference.application_scope)} / ${escape_html(preference.status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"suggested-next-actions\">",
    "<h2>Suggested Next Actions</h2>",
    ...sections.dashboard_surface.suggested_next_actions.map((action) =>
      `<p>Suggested next action: ${escape_html(action.cell_label)} -> ${escape_html(action.title)} [${escape_html(action.action_class)} / ${escape_html(action.readiness_status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"blocked-items\">",
    "<h2>Blocked Items</h2>",
    ...sections.dashboard_surface.blocked_items.map((item) =>
      `<p>Blocked item: ${escape_html(item.cell_label)} -> ${escape_html(item.title)} [${escape_html(item.blocked_item_kind)}]</p>`
    ),
    "</section>",
    "<section data-section=\"boundary\">",
    "<h2>Boundary</h2>",
    `<p>V2.0 ready: ${model.v2_0_ready}</p>`,
    `<p>Provider execution available: ${model.provider_execution_available}</p>`,
    `<p>Channel entry available: ${model.channel_entry_available}</p>`,
    `<p>Autonomous operation available: ${model.autonomous_operation_available}</p>`,
    ...sections.source_evidence_refs.map(
      (ref) => `<p>Source evidence ref: ${escape_html(ref)}</p>`
    ),
    ...sections.deferred_items.map(
      (item) => `<p>Deferred item: ${escape_html(item)}</p>`
    ),
    ...sections.non_claims.map(
      (claim) => `<p>Non-claim: ${escape_html(claim)}</p>`
    ),
    "</section>",
    "</main>",
  ].join("");

  return {
    route_path: FOUNDER_DASHBOARD_ROUTE,
    page_kind: "founder_dashboard_page",
    page_scope: "founder_dashboard_thin_consumption_only",
    operator_surface: "founder_dashboard_thin_consumption",
    authority_boundary: "app_page_projection_consumer",
    phase_boundary: "v1_9_wave4_product_surface_thin_consumption",
    phase_ref: "founder_dashboard_thin_consumption",
    non_executing: true,
    runtime_private_fields_omitted: true,
    provider_execution_available: false,
    channel_entry_available: false,
    autonomous_operation_available: false,
    readiness_status: false,
    v2_0_ready: false,
    sections,
    html,
  };
}
