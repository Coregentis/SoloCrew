import type {
  RuntimeStateProjection,
} from "../../runtime-imports/cognitive-runtime.ts";
import {
  assembleFounderDashboardProjection,
} from "../../projection/assembly/founder-dashboard-projection.ts";
import type {
  FounderDashboardProjection,
} from "../../projection/contracts/founder-dashboard-projection-contract.ts";
import {
  assert_valid,
  collect_forbidden_field_errors,
  collect_forbidden_positive_claim_errors,
  ensure_runtime_private_fields_omitted,
  stable_sort_by_key,
  unique_strings,
} from "../../projection/adapters/runtime-readiness-adapter-helpers.ts";

export type V19FounderDashboardPageModelInput =
  FounderDashboardProjection | RuntimeStateProjection;

export interface V19FounderDashboardPageModel {
  page_id: string;
  page_kind: "founder_dashboard_thin_consumption";
  phase_boundary: "v1_9_wave4_product_surface_thin_consumption";
  projection_scope: "founder_dashboard_projection";
  non_executing: true;
  runtime_private_fields_omitted: true;
  provider_execution_available: false;
  channel_entry_available: false;
  autonomous_operation_available: false;
  v2_0_ready: false;
  project_id: string;
  dashboard_surface: {
    cell_cards: FounderDashboardProjection["cell_cards"];
    pending_reviews: FounderDashboardProjection["pending_reviews"];
    recent_artifacts: FounderDashboardProjection["recent_artifacts"];
    learned_preferences: FounderDashboardProjection["learned_preferences"];
    suggested_next_actions:
      FounderDashboardProjection["suggested_next_actions"];
    blocked_items: FounderDashboardProjection["blocked_items"];
  };
  source_projection_ref: string;
  source_evidence_refs: string[];
  deferred_items: string[];
  non_claims: string[];
  boundary_notes: string[];
}

function is_founder_dashboard_projection(
  value: V19FounderDashboardPageModelInput
): value is FounderDashboardProjection {
  return (
    "projection_scope" in value &&
    value.projection_scope === "founder_dashboard_projection"
  );
}

function normalize_founder_dashboard_projection(
  input: V19FounderDashboardPageModelInput
): FounderDashboardProjection {
  return is_founder_dashboard_projection(input)
    ? input
    : assembleFounderDashboardProjection(input);
}

export function createV19FounderDashboardPageModel(
  input: V19FounderDashboardPageModelInput
): V19FounderDashboardPageModel {
  const projection = normalize_founder_dashboard_projection(input);
  const errors = [
    ...collect_forbidden_field_errors(projection),
    ...collect_forbidden_positive_claim_errors(projection),
  ];

  if (projection.non_executing !== true) {
    errors.push("FounderDashboardProjection.non_executing must be true");
  }

  ensure_runtime_private_fields_omitted(
    projection.runtime_private_fields_omitted,
    errors,
    "FounderDashboardProjection.runtime_private_fields_omitted"
  );

  assert_valid(errors);

  return {
    page_id: `${projection.dashboard_id}-page-model`,
    page_kind: "founder_dashboard_thin_consumption",
    phase_boundary: "v1_9_wave4_product_surface_thin_consumption",
    projection_scope: "founder_dashboard_projection",
    non_executing: true,
    runtime_private_fields_omitted: true,
    provider_execution_available: false,
    channel_entry_available: false,
    autonomous_operation_available: false,
    v2_0_ready: false,
    project_id: projection.project_id,
    dashboard_surface: {
      cell_cards: stable_sort_by_key([...projection.cell_cards], "cell_id"),
      pending_reviews: stable_sort_by_key(
        [...projection.pending_reviews],
        "review_id"
      ),
      recent_artifacts: stable_sort_by_key(
        [...projection.recent_artifacts],
        "artifact_id"
      ),
      learned_preferences: stable_sort_by_key(
        [...projection.learned_preferences],
        "preference_id"
      ),
      suggested_next_actions: stable_sort_by_key(
        [...projection.suggested_next_actions],
        "action_id"
      ),
      blocked_items: stable_sort_by_key(
        [...projection.blocked_items],
        "blocked_item_id"
      ),
    },
    source_projection_ref: projection.dashboard_id,
    source_evidence_refs: unique_strings(projection.source_evidence_refs),
    deferred_items: [...projection.deferred_items],
    non_claims: [...projection.non_claims],
    boundary_notes: [
      "This is V1.9 Wave 4.",
      "This is product-surface thin consumption.",
      "It consumes V1.9 Wave 3 projection contracts.",
      "It does not make SoloCrew V2.0 ready by itself.",
      "It does not implement full product UI.",
      "It does not implement external provider/channel execution.",
      "It prepares the final V1.9 closure wave.",
      ...projection.projection_notes,
    ],
  };
}
