import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import test from "node:test";

import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console bootstrap stays aligned with current app/shell boundaries", () => {
  const temp_dir = mkdtempSync(
    join(tmpdir(), "solocrew-single-cell-bootstrap-")
  );
  const sqlite_path = join(temp_dir, "bootstrap.sqlite");
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    baseline: {
      session: {
        mode: "sqlite",
        sqlite_path,
      },
    },
    structural: {
      business_pack_mount_keys: ["finance-pack"],
      metrics_pack_mount_keys: ["cell-health"],
    },
  });

  try {
    assert.equal(bootstrap.runtime_mode, "sqlite");
    assert.equal(
      bootstrap.shell_entry_package.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      bootstrap.console_shell.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      bootstrap.page.authority_boundary,
      "app_page_projection_consumer"
    );
    assert.equal(
      bootstrap.shell_entry_package.app_shell_boundary.role,
      "projection-consumer"
    );
    assert.equal(bootstrap.actual_provider_actions_present, false);
    assert.equal(bootstrap.actual_channel_entry_present, false);
    assert.equal(bootstrap.multi_cell_portfolio_behavior_available, false);
    assert.equal(bootstrap.secretary_behavior_available, false);
    assert.equal(bootstrap.broad_kpi_cockpit_available, false);
    assert.equal(
      bootstrap.runtime_complete_product_state_available,
      false
    );

    assert.match(
      bootstrap.page.console_shell.header.continuity_note,
      /sqlite-backed runtime session/u
    );
    assert.match(bootstrap.page.html, /Business pack mount: finance-pack/u);
    assert.match(bootstrap.page.html, /Metrics pack mount: cell-health/u);
    assert.match(bootstrap.page.html, /Deferred item: provider_execution/u);
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_secretary_behavior_truth/u
    );
    assert.ok(
      bootstrap.structural_assembly.compile_input_seed.capability_supply.explicitly_absent_capabilities.includes(
        "provider_execution"
      )
    );
    assert.ok(
      bootstrap.structural_assembly.compile_input_seed.capability_supply.explicitly_absent_capabilities.includes(
        "channel_integrations"
      )
    );
    assert.ok(
      bootstrap.page.non_claims.includes(
        "no_multi_cell_portfolio_truth"
      )
    );
    assert.ok(
      bootstrap.page.non_claims.includes(
        "no_secretary_behavior_truth"
      )
    );
  } finally {
    bootstrap.close();
    rmSync(temp_dir, {
      recursive: true,
      force: true,
    });
  }
});
