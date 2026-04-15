import test from "node:test";
import assert from "node:assert/strict";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
  SOLOCREW_STRUCTURAL_BOUNDARY,
} from "../../projection/contracts/structural-boundary.ts";
import {
  SOLOCREW_STRUCTURAL_CONTRACT_VERSION,
} from "../../projection/contracts/structural-object-types.ts";
import {
  createBusinessPackMount,
  createCEOOrchestratorContract,
  createCellCharter,
  createCellPolicyProfile,
  createCrewBlueprint,
  createDeliveryContract,
  createExecutionLedger,
  createMemoryEvidenceAnchor,
  createMetricsPackMount,
  createObjectivePortfolio,
} from "../../projection/objects/cell-constitution.ts";

test("[projection] structural constitution skeleton preserves boundaries and optional mounts", () => {
  const required_boundary = SOLOCREW_STRUCTURAL_BOUNDARY.find(
    (entry) => entry.object_type === "cell-charter"
  );
  const mount_boundary = SOLOCREW_STRUCTURAL_BOUNDARY.find(
    (entry) => entry.object_type === "business-pack-mount"
  );

  assert.ok(required_boundary);
  assert.ok(mount_boundary);
  assert.equal(required_boundary.requiredness, "required");
  assert.equal(mount_boundary.requiredness, "optional_mount");

  const objects = [
    createCellCharter({
      projection_id: "cell-charter-proj",
      charter_id: "charter-01",
      cell_id: "cell-01",
      cell_name: "Solo Operator Cell",
      mission: "Operate one focused business unit.",
      business_scope: "solo-operator-core",
      operator_id: "operator-01",
    }),
    createDeliveryContract({
      projection_id: "delivery-contract-proj",
      delivery_contract_id: "delivery-contract-01",
      cell_id: "cell-01",
      delivery_target: "Ship one coherent operator-facing delivery.",
      done_definition: "Return a usable and reviewable result.",
      return_shape: "delivery-return",
      review_posture: "operator_review",
    }),
    createCellPolicyProfile({
      projection_id: "cell-policy-proj",
      cell_policy_profile_id: "cell-policy-01",
      cell_id: "cell-01",
      approval_mode: "operator_required",
      risk_posture: "balanced",
      stop_conditions: ["budget-unknown", "approval-blocked"],
      escalation_triggers: ["policy-conflict"],
    }),
    createCEOOrchestratorContract({
      projection_id: "ceo-contract-proj",
      ceo_orchestrator_contract_id: "ceo-contract-01",
      cell_id: "cell-01",
    }),
    createCrewBlueprint({
      projection_id: "crew-blueprint-proj",
      crew_blueprint_id: "crew-blueprint-01",
      cell_id: "cell-01",
      coordination_pattern: "ceo_led",
    }),
    createObjectivePortfolio({
      projection_id: "objective-portfolio-proj",
      objective_portfolio_id: "objective-portfolio-01",
      cell_id: "cell-01",
      current_objective_id: "objective-01",
      queued_objective_ids: ["objective-02"],
    }),
    createExecutionLedger({
      projection_id: "execution-ledger-proj",
      execution_ledger_id: "execution-ledger-01",
      cell_id: "cell-01",
    }),
    createMemoryEvidenceAnchor({
      projection_id: "memory-anchor-proj",
      memory_evidence_anchor_id: "memory-anchor-01",
      cell_id: "cell-01",
    }),
    createBusinessPackMount({
      projection_id: "business-pack-mount-proj",
      business_pack_mount_id: "business-pack-mount-01",
      cell_id: "cell-01",
      mount_key: "growth-pack",
      mount_scope: "cell",
      mount_status: "reserved",
    }),
    createMetricsPackMount({
      projection_id: "metrics-pack-mount-proj",
      metrics_pack_mount_id: "metrics-pack-mount-01",
      cell_id: "cell-01",
      mount_key: "delivery-metrics",
      mount_scope: "cell",
      mount_status: "unmounted",
    }),
  ];

  for (const object of objects) {
    assert.equal(
      object.contract_version,
      SOLOCREW_STRUCTURAL_CONTRACT_VERSION
    );
    assert.equal(object.upward_runtime_authority, "forbidden");
    assert.equal(object.upward_protocol_authority, "forbidden");

    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in object, false);
    }
  }

  assert.equal(objects[8]?.implementation_status, "deferred_mount");
  assert.equal(objects[8]?.phase_boundary, "optional_mount");
  assert.equal(objects[9]?.implementation_status, "deferred_mount");
  assert.equal(objects[9]?.phase_boundary, "optional_mount");
});
