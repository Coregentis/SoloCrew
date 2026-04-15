import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] dev delivery template bootstrap surfaces bounded template truth through the operator console page", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    template: "dev_delivery_pack",
  });

  try {
    assert.equal(bootstrap.bootstrap_scope, "single_cell_only");
    assert.equal(bootstrap.operator_surface, "single_cell_console");
    assert.equal(bootstrap.actual_provider_actions_present, false);
    assert.equal(bootstrap.actual_channel_entry_present, false);
    assert.equal(bootstrap.multi_cell_portfolio_behavior_available, false);
    assert.equal(bootstrap.secretary_behavior_available, false);
    assert.equal(bootstrap.broad_kpi_cockpit_available, false);
    assert.equal(
      bootstrap.runtime_complete_product_state_available,
      false
    );

    assert.ok(bootstrap.template_seed);
    assert.equal(
      bootstrap.template_seed?.template_label,
      "Dev Delivery Pack"
    );
    assert.ok(
      bootstrap.structural_assembly.constitution_state.business_pack_mounts.some(
        (mount) => mount.mount_key === "dev-delivery-template"
      )
    );
    assert.ok(
      bootstrap.structural_assembly.constitution_state.metrics_pack_mounts.some(
        (mount) => mount.mount_key === "dev-delivery-metrics"
      )
    );
    assert.ok(
      bootstrap.structural_assembly.constitution_state.crew_blueprint.required_role_keys.includes(
        "builder"
      )
    );
    assert.match(bootstrap.page.html, /Template seed: Dev Delivery Pack/u);
    assert.match(
      bootstrap.page.html,
      /Template objective framing: Ship one bounded development delivery/u
    );
    assert.match(
      bootstrap.page.html,
      /Template workstream hint: implementation/u
    );
    assert.match(
      bootstrap.page.html,
      /Template work-item seed hint: Implement the smallest coherent delivery slice\./u
    );
    assert.match(
      bootstrap.page.html,
      /Business pack mount: dev-delivery-template/u
    );
    assert.match(
      bootstrap.page.html,
      /Template deferred surface: provider_backed_dev_execution/u
    );
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_execution_complete_dev_delivery_pack/u
    );
    assert.ok(
      bootstrap.page.non_claims.includes(
        "no_provider_backed_dev_execution"
      )
    );
    assert.ok(
      bootstrap.deferred_items.includes("provider_backed_dev_execution")
    );

    const boundary_targets = [
      bootstrap,
      bootstrap.template_seed,
      bootstrap.page,
      bootstrap.page.sections.header,
      bootstrap.page.sections.delivery,
      bootstrap.page.sections.crew_overview,
      bootstrap.page.sections.work_item_execution_overview,
      bootstrap.page.sections.deferred_surfaces,
      bootstrap.page.sections.truth_boundary,
    ];

    for (const target of boundary_targets) {
      for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
        assert.equal(field_name in target, false);
      }
    }
  } finally {
    bootstrap.close();
  }
});
