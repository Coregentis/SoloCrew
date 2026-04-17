import type {
  SecretaryHandoffReviewPacketShell,
} from "../shell/secretary-handoff-review-packet-contract.ts";

export interface SecretaryHandoffReviewPage {
  route_path: string;
  page_kind: "secretary_handoff_review_page";
  page_scope: "portfolio_secretary_handoff_review_packet_only";
  operator_surface: "portfolio_secretary_handoff_review_packet";
  authority_boundary: "app_page_projection_consumer";
  phase_boundary: "bounded_secretary_handoff_review_packet_page";
  navigation_mode: "review_packet_only_non_executing";
  secretary_behavior_available: true;
  portfolio_dispatch_behavior_available: false;
  direct_approve_control_available: false;
  direct_reject_control_available: false;
  direct_dispatch_control_available: false;
  direct_execute_control_available: false;
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  workflow_engine_behavior_available: false;
  runtime_complete_orchestration_available: false;
  handoff_creation_available: true;
  sections: {
    header: {
      read_mode: "review_packet_only_non_executing";
      portfolio_route: "/portfolio";
      foundation_overview_route: "/cells";
      handoff_route: string;
      review_packet_route: string;
      projection_notes: string[];
    };
    target_selection:
      SecretaryHandoffReviewPacketShell["handoff_review_packet_projection"]["target_selection"];
    packet_states:
      SecretaryHandoffReviewPacketShell["handoff_review_packet_projection"]["packet_states"];
    review_readiness:
      SecretaryHandoffReviewPacketShell["handoff_review_packet_projection"]["review_readiness"];
    packet_framing: {
      packet_state:
        SecretaryHandoffReviewPacketShell["handoff_review_packet_projection"]["packet_state"];
      packet_summary: string;
      packet_rationale: string;
      packet_context_framing: string;
      packet_state_summary: string;
      revision_loop_summary: string;
      management_posture_framing: string;
      review_posture_framing: string;
      non_executing_notice: string;
    };
    rationale_evidence:
      SecretaryHandoffReviewPacketShell["handoff_review_packet_projection"]["rationale_evidence"];
    navigation: SecretaryHandoffReviewPacketShell["navigation"];
    truth_boundary: SecretaryHandoffReviewPacketShell["truth_boundary"];
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

function render_packet_state(
  state: SecretaryHandoffReviewPage["sections"]["packet_states"][number]
): string {
  return [
    `<article data-packet-state="${escape_html(state.stage)}">`,
    `<h3>${escape_html(state.label)}</h3>`,
    `<p>Active: ${state.active}</p>`,
    `<p>State note: ${escape_html(state.note)}</p>`,
    "</article>",
  ].join("");
}

function render_navigation_link(
  link: SecretaryHandoffReviewPage["sections"]["navigation"]["cell_links"][number]
): string {
  return [
    `<article data-cell-id="${escape_html(link.cell_id)}">`,
    `<h3>${escape_html(link.cell_name)}</h3>`,
    `<p>Selected: ${link.selected}</p>`,
    `<p>Handoff route: ${escape_html(link.handoff_route)}</p>`,
    `<p>Review packet route: ${escape_html(link.review_packet_route)}</p>`,
    "</article>",
  ].join("");
}

export function renderSecretaryHandoffReviewPage(
  review_packet_shell: SecretaryHandoffReviewPacketShell
): SecretaryHandoffReviewPage {
  const review_packet_projection =
    review_packet_shell.handoff_review_packet_projection;
  const sections = {
    header: {
      read_mode: review_packet_shell.navigation.read_mode,
      portfolio_route: review_packet_shell.navigation.portfolio_route,
      foundation_overview_route:
        review_packet_shell.navigation.foundation_overview_route,
      handoff_route: review_packet_shell.navigation.handoff_route,
      review_packet_route: review_packet_shell.navigation.review_packet_route,
      projection_notes: [
        ...review_packet_shell.projection_notes,
        ...review_packet_projection.projection_notes,
      ],
    },
    target_selection: review_packet_projection.target_selection,
    packet_states: review_packet_projection.packet_states,
    review_readiness: review_packet_projection.review_readiness,
    packet_framing: {
      packet_state: review_packet_projection.packet_state,
      packet_summary: review_packet_projection.packet_summary,
      packet_rationale: review_packet_projection.packet_rationale,
      packet_context_framing: review_packet_projection.packet_context_framing,
      packet_state_summary: review_packet_projection.packet_state_summary,
      revision_loop_summary: review_packet_projection.revision_loop_summary,
      management_posture_framing:
        review_packet_projection.management_and_review_posture.management_posture_framing,
      review_posture_framing:
        review_packet_projection.management_and_review_posture.review_posture_framing,
      non_executing_notice: review_packet_projection.non_executing_notice,
    },
    rationale_evidence: review_packet_projection.rationale_evidence,
    navigation: review_packet_shell.navigation,
    truth_boundary: review_packet_shell.truth_boundary,
  };

  const html = [
    "<main>",
    "<section data-section=\"header\">",
    "<h1>Secretary Handoff Review Packet</h1>",
    `<p>Read mode: ${escape_html(sections.header.read_mode)}</p>`,
    `<p>Portfolio route: ${escape_html(sections.header.portfolio_route)}</p>`,
    `<p>Foundation overview route: ${escape_html(
      sections.header.foundation_overview_route
    )}</p>`,
    `<p>Handoff route: ${escape_html(sections.header.handoff_route)}</p>`,
    `<p>Review packet route: ${escape_html(
      sections.header.review_packet_route
    )}</p>`,
    "<p>Handoff review packet is product-level review framing and revision-return visibility only.</p>",
    "<p>No approve, reject, dispatch, execute, provider, or runtime mutation controls are present here.</p>",
    ...sections.header.projection_notes.map(
      (note) => `<p>Projection note: ${escape_html(note)}</p>`
    ),
    "</section>",
    "<section data-section=\"target-selection\">",
    "<h2>Target Selection</h2>",
    `<p>Target cell id: ${escape_html(
      sections.target_selection.target_cell_id ?? "unselected"
    )}</p>`,
    `<p>Target cell name: ${escape_html(
      sections.target_selection.target_cell_name ?? "unselected"
    )}</p>`,
    `<p>Target readiness: ${escape_html(
      sections.target_selection.target_readiness_signal ?? "unselected"
    )}</p>`,
    `<p>Target delivery posture: ${escape_html(
      sections.target_selection.target_delivery_posture ?? "unselected"
    )}</p>`,
    `<p>Target active work count: ${sections.target_selection.target_active_work_count ?? "unselected"}</p>`,
    `<p>Target blocked work count: ${sections.target_selection.target_blocked_work_count ?? "unselected"}</p>`,
    "</section>",
    "<section data-section=\"packet-states\">",
    "<h2>Packet States</h2>",
    ...sections.packet_states.map(render_packet_state),
    "</section>",
    "<section data-section=\"review-readiness\">",
    "<h2>Review Readiness</h2>",
    `<p>Readiness label: ${escape_html(sections.review_readiness.readiness_label)}</p>`,
    `<p>Readiness summary: ${escape_html(
      sections.review_readiness.readiness_summary
    )}</p>`,
    "</section>",
    "<section data-section=\"packet-framing\">",
    "<h2>Packet Framing</h2>",
    `<p>Packet state: ${escape_html(sections.packet_framing.packet_state)}</p>`,
    `<p>Packet summary: ${escape_html(sections.packet_framing.packet_summary)}</p>`,
    `<p>Packet rationale: ${escape_html(sections.packet_framing.packet_rationale)}</p>`,
    `<p>Packet context framing: ${escape_html(
      sections.packet_framing.packet_context_framing
    )}</p>`,
    `<p>Packet state summary: ${escape_html(
      sections.packet_framing.packet_state_summary
    )}</p>`,
    `<p>Revision loop summary: ${escape_html(
      sections.packet_framing.revision_loop_summary
    )}</p>`,
    `<p>Management posture framing: ${escape_html(
      sections.packet_framing.management_posture_framing
    )}</p>`,
    `<p>Review posture framing: ${escape_html(
      sections.packet_framing.review_posture_framing
    )}</p>`,
    `<p>Notice: ${escape_html(sections.packet_framing.non_executing_notice)}</p>`,
    "</section>",
    "<section data-section=\"rationale-evidence\">",
    "<h2>Rationale and Evidence</h2>",
    `<p>Rationale summary: ${escape_html(
      sections.rationale_evidence.rationale_summary
    )}</p>`,
    `<p>State reason: ${escape_html(
      sections.rationale_evidence.state_reason_summary
    )}</p>`,
    `<p>Evidence summary: ${escape_html(
      sections.rationale_evidence.evidence_summary
    )}</p>`,
    `<p>Provenance summary: ${escape_html(
      sections.rationale_evidence.provenance_summary
    )}</p>`,
    ...sections.rationale_evidence.known_facts.map(
      (fact) => `<p>Known fact: ${escape_html(fact)}</p>`
    ),
    ...sections.rationale_evidence.omission_notes.map(
      (note) => `<p>Omission note: ${escape_html(note)}</p>`
    ),
    ...sections.rationale_evidence.source_hints.map(
      (hint) => `<p>Source hint: ${escape_html(hint)}</p>`
    ),
    "</section>",
    "<section data-section=\"navigation\">",
    "<h2>Portfolio Context</h2>",
    ...sections.navigation.cell_links.map(render_navigation_link),
    ...(sections.navigation.selected_cell_routes
      ? [
          `<p>Selected detail route: ${escape_html(
            sections.navigation.selected_cell_routes.detail_route
          )}</p>`,
          `<p>Selected management route: ${escape_html(
            sections.navigation.selected_cell_routes.management_route
          )}</p>`,
          `<p>Selected continuity route: ${escape_html(
            sections.navigation.selected_cell_routes.continuity_route
          )}</p>`,
          `<p>Selected handoff route: ${escape_html(
            sections.navigation.selected_cell_routes.handoff_route
          )}</p>`,
          `<p>Selected review packet route: ${escape_html(
            sections.navigation.selected_cell_routes.review_packet_route
          )}</p>`,
        ]
      : []),
    "</section>",
    "<section data-section=\"truth-boundary\">",
    "<h2>Truth Boundary</h2>",
    `<p>Product projection only: ${sections.truth_boundary.product_projection_only}</p>`,
    `<p>Review packet projection is runtime law: ${sections.truth_boundary.review_packet_projection_is_runtime_law}</p>`,
    ...sections.truth_boundary.non_claims.map(
      (claim) => `<p>Non-claim: ${escape_html(claim)}</p>`
    ),
    "</section>",
    "</main>",
  ].join("");

  return {
    route_path: review_packet_shell.navigation.review_packet_route,
    page_kind: "secretary_handoff_review_page",
    page_scope: "portfolio_secretary_handoff_review_packet_only",
    operator_surface: "portfolio_secretary_handoff_review_packet",
    authority_boundary: "app_page_projection_consumer",
    phase_boundary: "bounded_secretary_handoff_review_packet_page",
    navigation_mode: "review_packet_only_non_executing",
    secretary_behavior_available: true,
    portfolio_dispatch_behavior_available: false,
    direct_approve_control_available: false,
    direct_reject_control_available: false,
    direct_dispatch_control_available: false,
    direct_execute_control_available: false,
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    workflow_engine_behavior_available: false,
    runtime_complete_orchestration_available: false,
    handoff_creation_available: true,
    sections,
    html,
  };
}
