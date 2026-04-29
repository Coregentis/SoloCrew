import type {
  FounderRequestIntakeShell,
} from "../shell/founder-request-intake-contract.ts";
import {
  FOUNDER_REQUEST_INTAKE_ROUTE,
} from "../shell/founder-request-intake.ts";
import type {
  IntakeToPacketPageModel,
} from "../engagement/engagement-compatibility-aliases.ts";
import type {
  FounderRequestStateEvaluationExposure,
} from "../../projection/contracts/founder-request-exception-packet-contract.ts";

type FounderRequestIntakeStateEvaluationSummary = Pick<
  FounderRequestStateEvaluationExposure,
  | "evaluation_id"
  | "initial_state"
  | "transition_event"
  | "transition_accepted"
  | "final_state"
  | "blocked_reason"
  | "terminal"
  | "non_executing"
  | "source_posture"
  | "source_markers"
  | "notes"
>;

export interface FounderRequestIntakePage {
  route_path: string;
  page_kind: "founder_request_intake_page";
  page_scope: "founder_request_intake_only";
  operator_surface: "founder_request_intake";
  authority_boundary: "app_page_projection_consumer";
  phase_boundary: "bounded_founder_request_intake_page";
  navigation_mode: "intake_only_non_executing";
  intake_available: true;
  sections: {
    header: {
      read_mode: "intake_only_non_executing";
      portfolio_route: "/portfolio";
      handoff_route: "/portfolio/handoff";
      review_packet_route: "/portfolio/handoff/review";
      intake_route: string;
      projection_notes: string[];
    };
    intake_purpose: {
      title: "Founder Request Intake";
      purpose_summary: string;
      loop_link_summary: string;
      intake_only_notice: string;
      non_executing_notice: string;
    };
    request_identity: {
      founder_request_id: string;
      request_label: string;
      created_at: string;
    };
    request_content: {
      request_text: string;
      request_intent_hint?: string;
      requested_context_summary?: string;
      risk_hint?: string;
      evidence_hint?: string;
    };
    v11_packet_candidate?: IntakeToPacketPageModel;
    state_evaluation_summary?: FounderRequestIntakeStateEvaluationSummary;
    truth_boundary: FounderRequestIntakeShell["truth_boundary"];
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

function render_optional_field(label: string, value?: string): string[] {
  return value ? [`<p>${escape_html(label)}: ${escape_html(value)}</p>`] : [];
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

export function renderFounderRequestIntakePage(
  intake_shell: FounderRequestIntakeShell,
  state_evaluation_summary?: FounderRequestIntakeStateEvaluationSummary,
  v11_packet_candidate?: IntakeToPacketPageModel
): FounderRequestIntakePage {
  const sections = {
    header: {
      read_mode: intake_shell.navigation.read_mode,
      portfolio_route: intake_shell.navigation.portfolio_route,
      handoff_route: intake_shell.navigation.handoff_route,
      review_packet_route: intake_shell.navigation.review_packet_route,
      intake_route: intake_shell.navigation.intake_route,
      projection_notes: [...intake_shell.projection_notes],
    },
    intake_purpose: {
      title: intake_shell.intake_title,
      purpose_summary:
        "This page captures bounded founder request meaning for the current product loop.",
      loop_link_summary:
        "The recorded request can later support packet, review, and staging visibility through a separate bounded step.",
      intake_only_notice:
        "This surface is intake-only and records request meaning without starting downstream work.",
      non_executing_notice:
        "This intake remains non-executing and keeps review-first product boundaries visible.",
    },
    request_identity: {
      founder_request_id:
        intake_shell.current_request_intake.founder_request_id,
      request_label: intake_shell.current_request_intake.request_label,
      created_at: intake_shell.current_request_intake.created_at,
    },
    request_content: {
      request_text: intake_shell.current_request_intake.request_text,
      request_intent_hint:
        intake_shell.current_request_intake.request_intent_hint,
      requested_context_summary:
        intake_shell.current_request_intake.requested_context_summary,
      risk_hint: intake_shell.current_request_intake.risk_hint,
      evidence_hint: intake_shell.current_request_intake.evidence_hint,
    },
    v11_packet_candidate: v11_packet_candidate
      ? {
          ...v11_packet_candidate,
          boundary_summary: [...v11_packet_candidate.boundary_summary],
        }
      : undefined,
    state_evaluation_summary: state_evaluation_summary
      ? {
          ...state_evaluation_summary,
          source_markers: [...state_evaluation_summary.source_markers],
          notes: [...state_evaluation_summary.notes],
        }
      : undefined,
    truth_boundary: intake_shell.truth_boundary,
  };

  const html = [
    "<main>",
    "<section data-section=\"header\">",
    "<h1>Founder Request Intake</h1>",
    `<p>Read mode: ${escape_html(sections.header.read_mode)}</p>`,
    `<p>Portfolio route: ${escape_html(sections.header.portfolio_route)}</p>`,
    `<p>Handoff route: ${escape_html(sections.header.handoff_route)}</p>`,
    `<p>Review packet route: ${escape_html(
      sections.header.review_packet_route
    )}</p>`,
    `<p>Intake route: ${escape_html(sections.header.intake_route)}</p>`,
    ...sections.header.projection_notes.map(
      (note) => `<p>Projection note: ${escape_html(note)}</p>`
    ),
    "</section>",
    "<section data-section=\"intake-purpose\">",
    "<h2>Intake Purpose</h2>",
    `<p>Purpose summary: ${escape_html(
      sections.intake_purpose.purpose_summary
    )}</p>`,
    `<p>Loop link summary: ${escape_html(
      sections.intake_purpose.loop_link_summary
    )}</p>`,
    `<p>Intake-only notice: ${escape_html(
      sections.intake_purpose.intake_only_notice
    )}</p>`,
    `<p>Non-executing notice: ${escape_html(
      sections.intake_purpose.non_executing_notice
    )}</p>`,
    "</section>",
    "<section data-section=\"request-identity\">",
    "<h2>Request Identity</h2>",
    `<p>Founder request id: ${escape_html(
      sections.request_identity.founder_request_id
    )}</p>`,
    `<p>Request label: ${escape_html(
      sections.request_identity.request_label
    )}</p>`,
    `<p>Created at: ${escape_html(sections.request_identity.created_at)}</p>`,
    "</section>",
    "<section data-section=\"request-content\">",
    "<h2>Request Content</h2>",
    `<p>Request text: ${escape_html(sections.request_content.request_text)}</p>`,
    ...render_optional_field(
      "Request intent hint",
      sections.request_content.request_intent_hint
    ),
    ...render_optional_field(
      "Requested context summary",
      sections.request_content.requested_context_summary
    ),
    ...render_optional_field("Risk hint", sections.request_content.risk_hint),
    ...render_optional_field(
      "Evidence hint",
      sections.request_content.evidence_hint
    ),
    "</section>",
    ...(sections.v11_packet_candidate
      ? [
          "<section data-section=\"v1-1-packet-candidate\">",
          "<h2>V1.1 Packet Candidate Planning</h2>",
          `<p>Flow id: ${escape_html(
            sections.v11_packet_candidate.flow_id
          )}</p>`,
          `<p>Packet candidate id: ${escape_html(
            sections.v11_packet_candidate.packet_candidate_id
          )}</p>`,
          `<p>Review posture: ${escape_html(
            sections.v11_packet_candidate.review_posture
          )}</p>`,
          `<p>Staging posture: ${escape_html(
            sections.v11_packet_candidate.staging_posture
          )}</p>`,
          `<p>Review ready: ${sections.v11_packet_candidate.review_ready}</p>`,
          `<p>Return for revision: ${sections.v11_packet_candidate.return_for_revision}</p>`,
          `<p>Blocked by contract: ${sections.v11_packet_candidate.blocked_by_contract}</p>`,
          `<p>Packet candidate label: ${escape_html(
            sections.v11_packet_candidate.packet_posture_label
          )}</p>`,
          `<p>Evidence posture: ${escape_html(
            sections.v11_packet_candidate.evidence_posture_label
          )}</p>`,
          `<p>Recommendation summary: ${escape_html(
            sections.v11_packet_candidate.recommendation_label
          )}</p>`,
          ...(sections.v11_packet_candidate.blocked_reason
            ? [
                `<p>Blocked by contract reason: ${escape_html(
                  sections.v11_packet_candidate.blocked_reason
                )}</p>`,
              ]
            : []),
          ...sections.v11_packet_candidate.boundary_summary.map(
            (line) => `<p>Boundary summary: ${escape_html(line)}</p>`
          ),
          `<p>Transition accepted is approval: ${sections.v11_packet_candidate.interpretation_guards.transition_accepted_is_approval}</p>`,
          `<p>Terminal is execution complete: ${sections.v11_packet_candidate.interpretation_guards.terminal_is_execution_complete}</p>`,
          `<p>Evidence summary is proof: ${sections.v11_packet_candidate.interpretation_guards.evidence_summary_is_proof}</p>`,
          `<p>Recommendation is execution: ${sections.v11_packet_candidate.interpretation_guards.recommendation_is_execution}</p>`,
          `<p>Non-executing: ${sections.v11_packet_candidate.non_executing}</p>`,
          "<p>Review posture remains bounded product planning status and not approval.</p>",
          "<p>Evidence summary remains summary-only and not proof or certification.</p>",
          "<p>Blocked by contract remains a boundary failure and not a dispatch-ready state.</p>",
          "</section>",
        ]
      : []),
    ...(sections.state_evaluation_summary
      ? [
          "<section data-section=\"state-evaluation-summary\">",
          "<h2>State Evaluation Summary</h2>",
          `<p>State evaluation id: ${escape_html(
            sections.state_evaluation_summary.evaluation_id
          )}</p>`,
          `<p>Initial state: ${escape_html(
            sections.state_evaluation_summary.initial_state
          )}</p>`,
          `<p>Transition event: ${escape_html(
            sections.state_evaluation_summary.transition_event
          )}</p>`,
          `<p>State evaluation accepted: ${escape_html(
            summarize_state_evaluation_acceptance(
              sections.state_evaluation_summary.transition_accepted
            )
          )}</p>`,
          `<p>Final state: ${escape_html(
            sections.state_evaluation_summary.final_state
          )}</p>`,
          `<p>Blocked state transition: ${escape_html(
            sections.state_evaluation_summary.blocked_reason ??
              "none visible"
          )}</p>`,
          `<p>State line terminal: ${escape_html(
            summarize_terminal_boundary(
              sections.state_evaluation_summary.terminal
            )
          )}</p>`,
          `<p>Non-executing: ${
            sections.state_evaluation_summary.non_executing
          }</p>`,
          `<p>Source posture: ${escape_html(
            sections.state_evaluation_summary.source_posture
          )}</p>`,
          `<p>Source markers: ${escape_html(
            sections.state_evaluation_summary.source_markers
              .map(summarize_marker_status)
              .join(", ")
          )}</p>`,
          `<p>Bounded notes: ${escape_html(
            sections.state_evaluation_summary.notes.join(" | ")
          )}</p>`,
          "<p>State evaluation accepted remains reducer-backed state truth and not approval.</p>",
          "<p>State line terminal remains bounded terminality and not execution complete.</p>",
          "<p>This summary remains non-executing and does not imply packet construction happened.</p>",
          "</section>",
        ]
      : []),
    "<section data-section=\"truth-boundary\">",
    "<h2>Truth Boundary</h2>",
    `<p>Product intake only: ${sections.truth_boundary.product_intake_only}</p>`,
    `<p>Intake object is runtime law: ${sections.truth_boundary.intake_object_is_runtime_law}</p>`,
    `<p>Upward runtime authority: ${escape_html(
      sections.truth_boundary.upward_runtime_authority
    )}</p>`,
    `<p>Upward protocol authority: ${escape_html(
      sections.truth_boundary.upward_protocol_authority
    )}</p>`,
    ...sections.truth_boundary.non_claims.map(
      (note) => `<p>Boundary note: ${escape_html(note)}</p>`
    ),
    "</section>",
    "</main>",
  ].join("");

  return {
    route_path: FOUNDER_REQUEST_INTAKE_ROUTE,
    page_kind: "founder_request_intake_page",
    page_scope: "founder_request_intake_only",
    operator_surface: "founder_request_intake",
    authority_boundary: "app_page_projection_consumer",
    phase_boundary: "bounded_founder_request_intake_page",
    navigation_mode: "intake_only_non_executing",
    intake_available: true,
    sections,
    html,
  };
}
