import test from "node:test";
import assert from "node:assert/strict";

import {
  SOLOCREW_COMPILE_ONLY_OBJECT_TYPES,
  SOLOCREW_COMPILE_RUNTIME_BRIDGE_OBJECT_TYPES,
  SOLOCREW_CREW_COMPILER_INPUT_OBJECT_TYPES,
  SOLOCREW_OPTIONAL_MOUNT_OBJECT_TYPES,
  SOLOCREW_RUNTIME_ADJACENT_OBJECT_TYPES,
} from "../../projection/contracts/structural-boundary.ts";
import {
  createCEOOrchestratorContract,
  createExecutionLedger,
  createMemoryEvidenceAnchor,
  createObjectivePortfolio,
} from "../../projection/objects/cell-constitution.ts";
import { createManagementDirective } from "../../projection/objects/management-interface.ts";
import {
  createRuntimeBackedManagementDirectiveProjection,
} from "../../projection/objects/runtime-backed-management-projection.ts";
import {
  RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE,
  RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_UPSTREAM_RECORD_TYPE,
} from "../../projection/contracts/runtime-backed-management-projection-contract.ts";

test("[projection] compile-phase and runtime-phase structural boundaries stay separated", () => {
  assert.ok(
    SOLOCREW_COMPILE_ONLY_OBJECT_TYPES.includes("ceo-orchestrator-contract")
  );
  assert.ok(
    SOLOCREW_COMPILE_ONLY_OBJECT_TYPES.includes("management-directive")
  );
  assert.equal(
    SOLOCREW_COMPILE_ONLY_OBJECT_TYPES.includes("execution-ledger"),
    false
  );

  assert.ok(
    SOLOCREW_COMPILE_RUNTIME_BRIDGE_OBJECT_TYPES.includes(
      "objective-portfolio"
    )
  );
  assert.ok(
    SOLOCREW_COMPILE_RUNTIME_BRIDGE_OBJECT_TYPES.includes(
      "memory-evidence-anchor"
    )
  );
  assert.equal(
    SOLOCREW_RUNTIME_ADJACENT_OBJECT_TYPES.includes("management-directive"),
    false
  );
  assert.ok(
    SOLOCREW_RUNTIME_ADJACENT_OBJECT_TYPES.includes("delivery-return")
  );
  assert.ok(
    SOLOCREW_OPTIONAL_MOUNT_OBJECT_TYPES.includes("business-pack-mount")
  );

  assert.ok(
    SOLOCREW_CREW_COMPILER_INPUT_OBJECT_TYPES.includes("management-directive")
  );
  assert.ok(
    SOLOCREW_CREW_COMPILER_INPUT_OBJECT_TYPES.includes("objective-portfolio")
  );
  assert.ok(
    SOLOCREW_CREW_COMPILER_INPUT_OBJECT_TYPES.includes("memory-evidence-anchor")
  );
  assert.equal(
    SOLOCREW_CREW_COMPILER_INPUT_OBJECT_TYPES.includes("execution-ledger"),
    false
  );

  const management_directive = createManagementDirective({
    projection_id: "management-directive-proj",
    management_directive_id: "management-directive-01",
    cell_id: "cell-01",
    priority: "focus_now",
    delivery_target: "Stabilize and ship the current objective.",
    approval_posture: "operator_required",
  });
  const runtime_backed_management_directive =
    createRuntimeBackedManagementDirectiveProjection({
      projection_id: "runtime-backed-management-directive-proj",
      cell_id: "cell-01",
      upstream_record_id: "management-directive-record-01",
      priority: "focus_now",
      delivery_target: "Keep the runtime-backed delivery view bounded.",
      approval_posture: "operator_required",
    });
  const ceo_contract = createCEOOrchestratorContract({
    projection_id: "ceo-contract-proj",
    ceo_orchestrator_contract_id: "ceo-contract-01",
    cell_id: "cell-01",
  });
  const objective_portfolio = createObjectivePortfolio({
    projection_id: "objective-portfolio-proj",
    objective_portfolio_id: "objective-portfolio-01",
    cell_id: "cell-01",
    current_objective_id: "objective-01",
  });
  const memory_anchor = createMemoryEvidenceAnchor({
    projection_id: "memory-anchor-proj",
    memory_evidence_anchor_id: "memory-anchor-01",
    cell_id: "cell-01",
  });
  const execution_ledger = createExecutionLedger({
    projection_id: "execution-ledger-proj",
    execution_ledger_id: "execution-ledger-01",
    cell_id: "cell-01",
  });

  assert.equal(management_directive.phase_boundary, "compile_phase_only");
  assert.equal(
    runtime_backed_management_directive.projection_object_type,
    RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE
  );
  assert.equal(
    runtime_backed_management_directive.upstream_record_type,
    RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_UPSTREAM_RECORD_TYPE
  );
  assert.equal(
    runtime_backed_management_directive.phase_boundary,
    "runtime_adjacent_detail"
  );
  assert.equal(
    runtime_backed_management_directive.upstream_origin,
    "runtime_private_record_projection"
  );
  assert.notEqual(
    runtime_backed_management_directive.projection_object_type,
    management_directive.object_type
  );
  assert.notEqual(
    runtime_backed_management_directive.phase_boundary,
    management_directive.phase_boundary
  );
  assert.equal(ceo_contract.phase_boundary, "compile_phase_only");
  assert.equal(objective_portfolio.phase_boundary, "compile_runtime_bridge");
  assert.equal(memory_anchor.phase_boundary, "compile_runtime_bridge");
  assert.equal(execution_ledger.phase_boundary, "runtime_adjacent_summary");
});
