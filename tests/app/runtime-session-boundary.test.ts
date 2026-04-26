import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  createRuntimeSession,
} from "../../app/shell/create-runtime-session.ts";
import { createBaselineShell } from "../../app/shell/create-baseline-shell.ts";
import {
  SOLOCREW_RUNTIME_SESSION_FACADE_BOUNDARY,
  SOLOCREW_SEALED_RUNTIME_SESSION_COMPATIBILITY_SURFACES,
} from "../../app/shell/runtime-session-facade.ts";
import { createLocalFakeActionHandler } from "../../projection/assembly/flow-assembly.ts";

test("[app] runtime session stays inside allowed bounded surfaces and local fake motion remains downstream-owned", () => {
  const session = createRuntimeSession();

  assert.deepEqual(
    session.consumed_surfaces,
    SOLOCREW_SEALED_RUNTIME_SESSION_COMPATIBILITY_SURFACES
  );
  assert.equal(
    SOLOCREW_RUNTIME_SESSION_FACADE_BOUNDARY.projection_api,
    false
  );
  assert.equal(
    session.consumed_surfaces.some((surface) =>
      /provider|telegram|channel|budget|execution-bridge|worker-state-machine/u.test(surface)
    ),
    false
  );
  assert.equal("provider_bridge" in session, false);
  assert.equal("channel_runtime" in session, false);
  assert.equal(session.action_dispatcher.list_handler_ids().length, 0);

  const local_fake_handler = createLocalFakeActionHandler();
  session.action_dispatcher.register_handler(local_fake_handler);

  assert.deepEqual(session.action_dispatcher.list_handler_ids(), [
    "solocrew-local-fake-motion",
  ]);
  session.close();
});

test("[app] runtime import bridge exports only sealed-session symbols used by SoloCrew", () => {
  const bridge_source = readFileSync(
    "runtime-imports/cognitive-runtime.ts",
    "utf8"
  );

  assert.doesNotMatch(bridge_source, /ExecutionBridgeContract/u);
  assert.doesNotMatch(bridge_source, /ExecutionBridgeCapabilities/u);
  assert.doesNotMatch(bridge_source, /WORKER_LIFECYCLE_STATES/u);
  assert.doesNotMatch(bridge_source, /WorkforceObjectType/u);
  assert.doesNotMatch(bridge_source, /COGNITIVE_RUNTIME_ALLOWED_SURFACES/u);
  assert.match(bridge_source, /sealed compatibility bridge/i);
});

test("[app] bootstrap private runtime fields stay out of product shell DTOs", () => {
  const baseline = createBaselineShell();
  const shell_json = JSON.stringify(baseline.shell);
  const private_field_names = [
    "authority_class",
    "primary_layer",
    "memory_layer",
    "protocol_binding_ref",
    "RuntimeObjectRecord",
  ];

  for (const field_name of private_field_names) {
    assert.equal(shell_json.includes(field_name), false);
  }

  const worker_record = baseline.runtime.worker_store.load(
    baseline.runtime.seeded_ids.worker_ids.builder
  );

  assert.equal(
    worker_record?.authority_class,
    "coregentis_private_runtime"
  );
  baseline.runtime.close();
});
