import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_ASSET_TYPE_KINDS,
  SOLOCREW_ASSET_TYPE_REFERENCES,
} from "../../projection/contracts/asset-type-vocabulary.ts";

test("[asset type vocabulary] includes the official V2.1 asset type kinds", () => {
  assert.deepEqual(SOLOCREW_ASSET_TYPE_KINDS, [
    "cell_blueprint",
    "starter_assembly",
    "business_pack_mount",
    "metrics_pack_mount",
    "crew_blueprint",
    "role_projection_template",
    "capability_plugin",
    "workflow_pattern",
    "memory_template",
    "learning_template",
    "review_gate",
    "evidence_template",
    "tool_adapter",
  ]);
});

test("[asset type vocabulary] references are vocabulary-only and non-executing", () => {
  assert.equal(
    new Set(
      SOLOCREW_ASSET_TYPE_REFERENCES.map(
        (reference) => reference.asset_type_kind
      )
    ).size,
    SOLOCREW_ASSET_TYPE_REFERENCES.length
  );
  assert.equal(
    SOLOCREW_ASSET_TYPE_REFERENCES.length,
    SOLOCREW_ASSET_TYPE_KINDS.length
  );

  for (const reference of SOLOCREW_ASSET_TYPE_REFERENCES) {
    assert.ok(SOLOCREW_ASSET_TYPE_KINDS.includes(reference.asset_type_kind));
    assert.equal(reference.implementation_status, "vocabulary_only");
    assert.equal(reference.marketplace_implemented, false);
    assert.equal(reference.asset_installation_available, false);
    assert.equal(reference.tool_execution_available, false);
    assert.ok(reference.label.length > 0);
    assert.ok(reference.planning_use.length > 0);
  }
});
