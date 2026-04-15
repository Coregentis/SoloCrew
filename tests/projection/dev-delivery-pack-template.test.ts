import assert from "node:assert/strict";
import test from "node:test";

import {
  assembleDevDeliveryPackTemplateSeed,
  applyDevDeliveryPackTemplateSeed,
} from "../../projection/assembly/dev-delivery-pack-template.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";

test("[projection] dev delivery pack template seed stays single-cell and template-only", () => {
  const template_seed = assembleDevDeliveryPackTemplateSeed();
  const seeded_input = applyDevDeliveryPackTemplateSeed(
    {
      assembly_id: "dev-delivery-template-01",
      cell_id: "cell-01",
      cell_name: "Dev Delivery Cell",
      operator_id: "operator-01",
      mission: "Ship one bounded dev delivery.",
      business_scope: "solo-dev",
      current_objective_id: "objective-01",
      current_objective_headline: "Prepare one bounded development delivery.",
      delivery_target: "Return one operator-reviewable dev delivery slice.",
      required_role_keys: ["builder"],
      projection_notes: ["Baseline structural input."],
    },
    template_seed
  );

  assert.equal(template_seed.template_id, "dev-delivery-pack-template");
  assert.equal(template_seed.template_label, "Dev Delivery Pack");
  assert.equal(template_seed.template_scope, "single_cell_only");
  assert.equal(template_seed.authority_boundary, "product_projection_only");
  assert.equal(template_seed.execution_boundary, "template_seed_only");
  assert.ok(template_seed.default_workstream_hints.length >= 2);
  assert.ok(template_seed.default_work_item_seed_hints.length >= 2);
  assert.ok(template_seed.default_crew_role_hints.includes("builder"));
  assert.ok(
    template_seed.deferred_surfaces.includes(
      "provider_backed_dev_execution"
    )
  );
  assert.ok(
    template_seed.non_claims.includes("no_provider_backed_dev_execution")
  );

  assert.ok(
    seeded_input.required_role_keys?.includes("builder")
  );
  assert.ok(
    seeded_input.required_role_keys?.includes("ops")
  );
  assert.ok(
    seeded_input.business_pack_mount_keys?.includes("dev-delivery-template")
  );
  assert.ok(
    seeded_input.metrics_pack_mount_keys?.includes("dev-delivery-metrics")
  );
  assert.ok(
    seeded_input.projection_notes?.includes(
      "Dev Delivery Pack remains a bounded template seed only."
    )
  );

  for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
    assert.equal(field_name in template_seed, false);
  }
});
