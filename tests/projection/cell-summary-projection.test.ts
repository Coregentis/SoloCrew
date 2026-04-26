import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  adaptRuntimePrivateCellSummaryToProjection,
} from "../../projection/adapters/cell-summary-runtime-adapter.ts";
import {
  assembleCellSummaryProjection,
} from "../../projection/assembly/cell-summary-projection.ts";
import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";
import {
  composeSingleCellShellScaffold,
} from "../../projection/assembly/single-cell-shell-composer.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  createWorkforceCellProjectionInputWithManagement,
} from "../../projection/fixtures/workforce-envelope-fixtures.ts";

test("[projection] cell summary projection stays product-projected and bounded for multi-cell foundation", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "multi-cell-summary-01",
    cell_id: "cell-01",
    cell_name: "Delivery Cell",
    operator_id: "operator-01",
    mission: "Run one delivery-focused cell.",
    business_scope: "solo-core",
    current_objective_id: "objective-01",
    current_objective_headline: "Ship one bounded delivery review.",
    delivery_target: "Return one bounded operator-reviewable delivery.",
    active_work_count: 3,
    blocked_work_count: 1,
  });

  const shell_composition = composeSingleCellShellScaffold(assembly);
  const summary_projection =
    assembleCellSummaryProjection(shell_composition);

  assert.equal(summary_projection.summary_scope, "cell_summary_projection");
  assert.equal(summary_projection.authority_boundary, "product_projection_only");
  assert.equal(summary_projection.phase_boundary, "runtime_adjacent_summary");
  assert.equal(summary_projection.multi_cell_foundation_scope, "read_inspect_only");
  assert.equal(summary_projection.summary_projection_is_runtime_law, false);
  assert.equal(summary_projection.secretary_behavior_available, false);
  assert.equal(summary_projection.provider_execution_available, false);
  assert.equal(summary_projection.channel_entry_available, false);
  assert.equal(summary_projection.broad_kpi_cockpit_available, false);
  assert.equal(summary_projection.runtime_complete_orchestration_available, false);

  assert.equal(summary_projection.cell_summary_card.cell_name, "Delivery Cell");
  assert.equal(summary_projection.cell_summary_card.blocked_work_count, 1);
  assert.equal(summary_projection.readiness_signal, "attention_required");
  assert.equal(summary_projection.continuity_status, "bounded_and_honest");
  assert.match(
    summary_projection.objective_status_summary,
    /Ship one bounded delivery review\./
  );
  assert.ok(
    summary_projection.non_claims.includes("no_secretary_behavior_truth")
  );
  assert.ok(summary_projection.deferred_items.includes("provider_execution"));

  for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
    assert.equal(field_name in summary_projection, false);
  }
});

test("[projection] runtime-private workforce records are transformed into product summary projection rather than runtime law", () => {
  const summary_projection = adaptRuntimePrivateCellSummaryToProjection(
    createWorkforceCellProjectionInputWithManagement({
      delivery_posture: "blocked",
    })
  );

  assert.equal(summary_projection.source_mode, "upstream_projection_safe_envelope");
  assert.equal(summary_projection.summary_scope, "cell_summary_projection");
  assert.equal(summary_projection.authority_boundary, "product_projection_only");
  assert.equal(summary_projection.summary_projection_is_runtime_law, false);
  assert.equal(summary_projection.secretary_behavior_available, false);
  assert.equal(summary_projection.provider_execution_available, false);
  assert.equal(summary_projection.channel_entry_available, false);
  assert.equal(summary_projection.readiness_signal, "attention_required");
  assert.equal(summary_projection.cell_summary_card.cell_name, "Runtime Delivery Cell");
  assert.equal(summary_projection.cell_summary_card.delivery_posture, "blocked");
  assert.equal(summary_projection.upstream_refs.length, 4);
  assert.deepEqual(
    summary_projection.upstream_refs.map((ref) => ref.upstream_object_type),
    [
      "workforce_projection_safe_envelope",
      "workforce-management-directive-projection",
      "workforce-delivery-return-projection",
      "workforce-approval-request-projection",
    ]
  );
  assert.ok(
    summary_projection.truth_sources.includes("upstream_projection_safe_envelope")
  );
  assert.ok(
    summary_projection.non_claims.includes(
      "no_shared_object_identity_with_runtime_private_record"
    )
  );

  for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
    assert.equal(field_name in summary_projection, false);
  }
});

test("[projection] canonical workforce projection paths do not import the runtime bridge", () => {
  const canonical_workforce_paths = [
    "projection/adapters/upstream-record-types.ts",
    "projection/adapters/cell-summary-runtime-adapter.ts",
    "projection/fixtures/workforce-envelope-fixtures.ts",
  ];

  for (const path of canonical_workforce_paths) {
    const source = readFileSync(path, "utf8");

    assert.doesNotMatch(source, /runtime-imports\/cognitive-runtime/u);
  }

  const adapter_source = readFileSync(
    "projection/adapters/cell-summary-runtime-adapter.ts",
    "utf8"
  );
  assert.match(adapter_source, /WorkforceProjectionSafeEnvelope/u);
  assert.match(adapter_source, /runtime_private_fields_omitted/u);
});
