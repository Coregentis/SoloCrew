import type {
  FounderRequestIntakeObject,
  FounderRequestIntakeShell,
} from "./founder-request-intake-contract.ts";

export const FOUNDER_REQUEST_INTAKE_ROUTE = "/portfolio/founder-request-intake";

function assert_non_empty_string(value: string, field_name: string): void {
  if (value.trim().length === 0) {
    throw new Error(`${field_name} must remain a non-empty bounded intake field.`);
  }
}

export function composeFounderRequestIntakeShell(
  current_request_intake: FounderRequestIntakeObject
): FounderRequestIntakeShell {
  assert_non_empty_string(
    current_request_intake.founder_request_id,
    "founder_request_id"
  );
  assert_non_empty_string(current_request_intake.request_label, "request_label");
  assert_non_empty_string(current_request_intake.request_text, "request_text");
  assert_non_empty_string(current_request_intake.created_at, "created_at");

  if (current_request_intake.non_executing !== true) {
    throw new Error(
      "Founder-facing request intake must remain explicitly non-executing."
    );
  }

  return {
    intake_shell_id:
      `${current_request_intake.founder_request_id}-founder-request-intake-shell`,
    intake_scope: "founder_request_intake_only",
    operator_surface: "founder_request_intake",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "founder_request_intake_only_non_executing",
    navigation_mode: "intake_only_non_executing",
    intake_title: "Founder Request Intake",
    current_request_intake: {
      ...current_request_intake,
    },
    navigation: {
      portfolio_route: "/portfolio",
      handoff_route: "/portfolio/handoff",
      review_packet_route: "/portfolio/handoff/review",
      intake_route: FOUNDER_REQUEST_INTAKE_ROUTE,
      read_mode: "intake_only_non_executing",
    },
    truth_boundary: {
      product_intake_only: true,
      intake_object_is_runtime_law: false,
      upward_runtime_authority: "forbidden",
      upward_protocol_authority: "forbidden",
      non_claims: [
        "Founder request intake records bounded request meaning only.",
        "Founder request intake stays below downstream work start, delivery claims, and runtime authority.",
        "Founder request intake does not claim Operational V1 completion or release readiness by itself.",
      ],
    },
    projection_notes: [
      "Founder-facing intake is the smallest bounded entry surface over the existing founder-request loop.",
      "This intake surface reuses current app shell conventions without altering handoff staging or review semantics.",
      "Future packet construction remains a separate bounded step and is not implied by intake alone.",
    ],
  };
}
