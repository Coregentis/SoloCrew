import assert from "node:assert/strict";
import test from "node:test";

import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";
import {
  composeSingleCellShellScaffold,
} from "../../projection/assembly/single-cell-shell-composer.ts";
import {
  adaptSingleCellShellEntry,
} from "../../app/shell/single-cell-shell-entry-adapter.ts";
import {
  composeSingleCellOperatorConsoleShell,
} from "../../app/shell/single-cell-operator-console-shell.ts";

test("[app] single-cell operator console shell keeps deferred surfaces visible and avoids multi-cell or secretary drift", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-operator-console-02",
    cell_id: "cell-02",
    cell_name: "Delivery Cell",
    operator_id: "operator-01",
    mission: "Operate one bounded delivery cell.",
    business_scope: "delivery-ops",
    current_objective_id: "objective-02",
    current_objective_headline: "Stabilize one operator-facing console shell.",
    delivery_target: "Return one console shell with deferred mounts.",
    active_work_count: 3,
    blocked_work_count: 1,
    business_pack_mount_keys: ["growth-pack"],
    metrics_pack_mount_keys: ["delivery-metrics"],
  });
  const shell_composition = composeSingleCellShellScaffold(assembly);
  const entry_package = adaptSingleCellShellEntry(shell_composition);
  const console_shell = composeSingleCellOperatorConsoleShell(entry_package);

  assert.equal(console_shell.header.delivery_posture, "attention");
  assert.equal(
    console_shell.objective_overview.near_term_execution_pressure,
    "stabilize_and_review"
  );
  assert.equal(
    console_shell.work_item_execution_overview.work_item_timeline_available,
    false
  );
  assert.equal(
    console_shell.deferred_surfaces.optional_mounts_present,
    true
  );
  assert.equal(
    console_shell.deferred_surfaces.business_pack_mount_keys.length,
    1
  );
  assert.equal(
    console_shell.deferred_surfaces.metrics_pack_mount_keys.length,
    1
  );
  assert.equal(
    console_shell.deferred_surfaces.all_mounts_deferred,
    true
  );

  assert.equal(console_shell.actual_ui_pages_present, false);
  assert.equal(console_shell.secretary_behavior_available, false);
  assert.equal(
    console_shell.multi_cell_portfolio_behavior_available,
    false
  );
  assert.equal(console_shell.broad_kpi_cockpit_available, false);

  assert.ok(
    console_shell.platform_delivery_readiness_overview.present_capability_summaries.some(
      (summary) => summary.startsWith("single_cell_operating_core:")
    )
  );
  assert.ok(
    console_shell.platform_delivery_readiness_overview.deferred_capability_summaries.some(
      (summary) =>
        summary.startsWith(
          "runtime_dependent_downstream_truth_hardening:"
        )
    )
  );
  assert.ok(
    console_shell.platform_delivery_readiness_overview.non_claims.includes(
      "no_execution_cockpit_upgrade"
    )
  );
  assert.ok(
    console_shell.deferred_items.includes("interactive-cockpit")
  );
  assert.ok(
    console_shell.platform_delivery_readiness_overview.deferred_items.includes(
      "runtime_dependent_downstream_truth_hardening"
    )
  );
  assert.ok(
    console_shell.deferred_items.includes("live-data-fetching")
  );
  assert.ok(
    console_shell.truth_boundary.non_claims.includes(
      "no_multi_cell_portfolio_truth"
    )
  );
  assert.ok(
    console_shell.truth_boundary.non_claims.includes(
      "no_secretary_behavior_truth"
    )
  );
  assert.ok(
    console_shell.truth_boundary.non_claims.includes(
      "no_broad_kpi_projection"
    )
  );
});
