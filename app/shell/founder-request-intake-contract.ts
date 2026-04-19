export interface FounderRequestIntakeObject {
  founder_request_id: string;
  request_label: string;
  request_text: string;
  request_intent_hint?: string;
  requested_context_summary?: string;
  risk_hint?: string;
  evidence_hint?: string;
  created_at: string;
  non_executing: true;
}

export interface FounderRequestIntakeShell {
  intake_shell_id: string;
  intake_scope: "founder_request_intake_only";
  operator_surface: "founder_request_intake";
  authority_boundary: "app_shell_projection_consumer";
  phase_boundary: "founder_request_intake_only_non_executing";
  navigation_mode: "intake_only_non_executing";
  intake_title: "Founder Request Intake";
  current_request_intake: FounderRequestIntakeObject;
  navigation: {
    portfolio_route: "/portfolio";
    handoff_route: "/portfolio/handoff";
    review_packet_route: "/portfolio/handoff/review";
    intake_route: string;
    read_mode: "intake_only_non_executing";
  };
  truth_boundary: {
    product_intake_only: true;
    intake_object_is_runtime_law: false;
    upward_runtime_authority: "forbidden";
    upward_protocol_authority: "forbidden";
    non_claims: string[];
  };
  projection_notes: string[];
}
