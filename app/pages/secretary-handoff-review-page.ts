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
    founder_request_exception_display?: {
      request_ref: string;
      request_label: string;
      derived_exception_posture:
        NonNullable<
          SecretaryHandoffReviewPacketShell["handoff_review_packet_projection"]["founder_request_exception_enrichment"]
        >["derived_exception_posture"];
      review_return_posture:
        NonNullable<
          SecretaryHandoffReviewPacketShell["handoff_review_packet_projection"]["founder_request_exception_enrichment"]
        >["review_return_posture"];
      review_return_summary: string;
      marker_status_summary: string;
      evidence_summary_label: string;
      evidence_status_summary: string;
      status_marker_summaries: string[];
      family_status_summaries: {
        family: string;
        availability_summary: string;
        summary_label: string;
      }[];
      learning_suggestion_display?: {
        suggestion_summary: string;
        marker_status_summary: string;
        suggestion_posture_notice: "suggestion_only";
      };
      state_evaluation_summary?: {
        evaluation_id: string;
        initial_state: string;
        transition_event: string;
        requested_next_state: string;
        reducer_target_state: string;
        transition_accepted: boolean;
        final_state: string;
        blocked_reason?: string;
        terminal: boolean;
        non_executing: true;
        source_posture: string;
        source_markers: string[];
        notes: string[];
      };
      bounded_recommendation_display?: {
        recommendation_summary: string;
        recommendation_notice: string;
        non_executing: true;
      };
    };
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

function summarize_marker_status(marker_status: string): string {
  switch (marker_status) {
    case "available":
      return "summary available";
    case "omitted_by_contract":
      return "omission visible";
    case "not_available_upstream":
      return "upstream not available";
    case "insufficient_evidence":
      return "insufficiency visible";
    case "stale":
      return "stale visible";
    case "not_applicable":
      return "not applicable";
    default:
      return marker_status;
  }
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

function summarize_state_evaluation_acceptance(
  transition_accepted: boolean
): string {
  return transition_accepted
    ? "state evaluation accepted"
    : "blocked state transition";
}

function summarize_terminal_boundary(terminal: boolean): string {
  return terminal ? "state line terminal" : "state line remains open";
}

export function renderSecretaryHandoffReviewPage(
  review_packet_shell: SecretaryHandoffReviewPacketShell
): SecretaryHandoffReviewPage {
  const review_packet_projection =
    review_packet_shell.handoff_review_packet_projection;
  const founder_request_exception_enrichment =
    review_packet_projection.founder_request_exception_enrichment;
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
    founder_request_exception_display: founder_request_exception_enrichment
      ? {
          request_ref: founder_request_exception_enrichment.request_ref,
          request_label: founder_request_exception_enrichment.request_label,
          derived_exception_posture:
            founder_request_exception_enrichment.derived_exception_posture,
          review_return_posture:
            founder_request_exception_enrichment.review_return_posture,
          review_return_summary:
            founder_request_exception_enrichment.review_return_summary,
          marker_status_summary: summarize_marker_status(
            founder_request_exception_enrichment.marker_status
          ),
          evidence_summary_label:
            founder_request_exception_enrichment.evidence_summary.evidence_summary_label,
          evidence_status_summary: summarize_marker_status(
            founder_request_exception_enrichment.evidence_summary.evidence_status
          ),
          status_marker_summaries:
            founder_request_exception_enrichment.status_markers.map(
              summarize_marker_status
            ),
          family_status_summaries:
            founder_request_exception_enrichment.family_status_summaries.map(
              (family_status) => ({
                family: family_status.family,
                availability_summary: summarize_marker_status(
                  family_status.availability
                ),
                summary_label: family_status.summary_label,
              })
            ),
          learning_suggestion_display:
            founder_request_exception_enrichment.learning_suggestion_summary
              ? {
                  suggestion_summary:
                    founder_request_exception_enrichment.learning_suggestion_summary.suggestion_summary,
                  marker_status_summary: summarize_marker_status(
                    founder_request_exception_enrichment.learning_suggestion_summary.marker_status
                  ),
                  suggestion_posture_notice: "suggestion_only",
                }
              : undefined,
          state_evaluation_summary:
            founder_request_exception_enrichment.state_evaluation_exposure
              ? {
                  evaluation_id:
                    founder_request_exception_enrichment.state_evaluation_exposure.evaluation_id,
                  initial_state:
                    founder_request_exception_enrichment.state_evaluation_exposure.initial_state,
                  transition_event:
                    founder_request_exception_enrichment.state_evaluation_exposure.transition_event,
                  requested_next_state:
                    founder_request_exception_enrichment.state_evaluation_exposure.requested_next_state,
                  reducer_target_state:
                    founder_request_exception_enrichment.state_evaluation_exposure.reducer_target_state,
                  transition_accepted:
                    founder_request_exception_enrichment.state_evaluation_exposure.transition_accepted,
                  final_state:
                    founder_request_exception_enrichment.state_evaluation_exposure.final_state,
                  blocked_reason:
                    founder_request_exception_enrichment.state_evaluation_exposure.blocked_reason,
                  terminal:
                    founder_request_exception_enrichment.state_evaluation_exposure.terminal,
                  non_executing:
                    founder_request_exception_enrichment.state_evaluation_exposure.non_executing,
                  source_posture:
                    founder_request_exception_enrichment.state_evaluation_exposure.source_posture,
                  source_markers: [
                    ...founder_request_exception_enrichment.state_evaluation_exposure.source_markers,
                  ],
                  notes: [
                    ...founder_request_exception_enrichment.state_evaluation_exposure.notes,
                  ],
                }
              : undefined,
          bounded_recommendation_display:
            founder_request_exception_enrichment.bounded_action_recommendation
              ? {
                  recommendation_summary:
                    founder_request_exception_enrichment.bounded_action_recommendation.recommendation_summary,
                  recommendation_notice:
                    "Non-executing recommendation only. This summary does not create action authority.",
                  non_executing:
                    founder_request_exception_enrichment.bounded_action_recommendation.non_executing,
                }
              : undefined,
        }
      : undefined,
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
    ...(sections.founder_request_exception_display
      ? [
          "<section data-section=\"founder-request-exception-display\">",
          "<h2>Founder Request Exception Display</h2>",
          `<p>Request ref: ${escape_html(
            sections.founder_request_exception_display.request_ref
          )}</p>`,
          `<p>Request label: ${escape_html(
            sections.founder_request_exception_display.request_label
          )}</p>`,
          `<p>Exception posture: ${escape_html(
            sections.founder_request_exception_display.derived_exception_posture
          )}</p>`,
          `<p>Review or return posture: ${escape_html(
            sections.founder_request_exception_display.review_return_posture
          )}</p>`,
          `<p>Review or return summary: ${escape_html(
            sections.founder_request_exception_display.review_return_summary
          )}</p>`,
          `<p>Marker status: ${escape_html(
            sections.founder_request_exception_display.marker_status_summary
          )}</p>`,
          `<p>Evidence summary only: ${escape_html(
            sections.founder_request_exception_display.evidence_summary_label
          )}</p>`,
          `<p>Evidence display posture: ${escape_html(
            sections.founder_request_exception_display.evidence_status_summary
          )}</p>`,
          "<p>Evidence remains summary-only here and does not become a raw trace dump or raw runtime detail.</p>",
          ...sections.founder_request_exception_display.status_marker_summaries.map(
            (marker_summary) =>
              `<p>Display marker: ${escape_html(marker_summary)}</p>`
          ),
          ...sections.founder_request_exception_display.family_status_summaries.map(
            (family_status) =>
              `<p>Family status: ${escape_html(
                family_status.family
              )} -> ${escape_html(
                family_status.availability_summary
              )} (${escape_html(family_status.summary_label)})</p>`
          ),
          ...(sections.founder_request_exception_display.learning_suggestion_display
            ? [
                `<p>Learning suggestion only: ${escape_html(
                  sections.founder_request_exception_display
                    .learning_suggestion_display.suggestion_summary
                )}</p>`,
                `<p>Learning display posture: ${escape_html(
                  sections.founder_request_exception_display
                    .learning_suggestion_display.marker_status_summary
                )}</p>`,
                `<p>Learning posture notice: ${escape_html(
                  sections.founder_request_exception_display
                    .learning_suggestion_display.suggestion_posture_notice
                )}</p>`,
              ]
            : []),
          ...(sections.founder_request_exception_display.state_evaluation_summary
            ? [
                "<h3>Detailed State Explanation</h3>",
                `<p>State evaluation id: ${escape_html(
                  sections.founder_request_exception_display
                    .state_evaluation_summary.evaluation_id
                )}</p>`,
                `<p>Initial state: ${escape_html(
                  sections.founder_request_exception_display
                    .state_evaluation_summary.initial_state
                )}</p>`,
                `<p>Transition event: ${escape_html(
                  sections.founder_request_exception_display
                    .state_evaluation_summary.transition_event
                )}</p>`,
                `<p>Requested next state: ${escape_html(
                  sections.founder_request_exception_display
                    .state_evaluation_summary.requested_next_state
                )}</p>`,
                `<p>Reducer target state: ${escape_html(
                  sections.founder_request_exception_display
                    .state_evaluation_summary.reducer_target_state
                )}</p>`,
                `<p>State evaluation accepted: ${escape_html(
                  summarize_state_evaluation_acceptance(
                    sections.founder_request_exception_display
                      .state_evaluation_summary.transition_accepted
                  )
                )}</p>`,
                `<p>Final state: ${escape_html(
                  sections.founder_request_exception_display
                    .state_evaluation_summary.final_state
                )}</p>`,
                `<p>Blocked state transition: ${escape_html(
                  sections.founder_request_exception_display
                    .state_evaluation_summary.blocked_reason ??
                    "none visible"
                )}</p>`,
                `<p>State line terminal: ${escape_html(
                  summarize_terminal_boundary(
                    sections.founder_request_exception_display
                      .state_evaluation_summary.terminal
                  )
                )}</p>`,
                `<p>Non-executing: ${
                  sections.founder_request_exception_display
                    .state_evaluation_summary.non_executing
                }</p>`,
                `<p>Source posture: ${escape_html(
                  sections.founder_request_exception_display
                    .state_evaluation_summary.source_posture
                )}</p>`,
                `<p>Source markers: ${escape_html(
                  sections.founder_request_exception_display
                    .state_evaluation_summary.source_markers
                    .map(summarize_marker_status)
                    .join(", ")
                )}</p>`,
                `<p>Bounded notes: ${escape_html(
                  sections.founder_request_exception_display
                    .state_evaluation_summary.notes.join(" | ")
                )}</p>`,
                "<p>State evaluation accepted remains reducer-backed state truth and not approval.</p>",
                "<p>Blocked state transition remains state-transition reasoning and not a task failure verdict.</p>",
                "<p>State line terminal remains bounded terminality and not execution complete.</p>",
                "<p>Evidence summary remains summary-only and not proof.</p>",
              ]
            : []),
          ...(sections.founder_request_exception_display
            .bounded_recommendation_display
            ? [
                `<p>Bounded recommendation summary: ${escape_html(
                  sections.founder_request_exception_display
                    .bounded_recommendation_display.recommendation_summary
                )}</p>`,
                `<p>Recommendation notice: ${escape_html(
                  sections.founder_request_exception_display
                    .bounded_recommendation_display.recommendation_notice
                )}</p>`,
                `<p>Recommendation non_executing: ${
                  sections.founder_request_exception_display
                    .bounded_recommendation_display.non_executing
                }</p>`,
              ]
            : []),
          "</section>",
        ]
      : []),
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
