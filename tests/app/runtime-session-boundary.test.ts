import test from "node:test";
import assert from "node:assert/strict";

import {
  createRuntimeSession,
} from "../../app/shell/create-runtime-session.ts";
import { createLocalFakeActionHandler } from "../../projection/assembly/flow-assembly.ts";
import { COGNITIVE_RUNTIME_ALLOWED_SURFACES } from "../../runtime-imports/cognitive-runtime.ts";

test("[app] runtime session stays inside allowed bounded surfaces and local fake motion remains downstream-owned", () => {
  const session = createRuntimeSession();

  assert.deepEqual(
    session.consumed_surfaces,
    COGNITIVE_RUNTIME_ALLOWED_SURFACES
  );
  assert.equal(
    session.consumed_surfaces.some((surface) =>
      /provider|telegram|channel|budget/u.test(surface)
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
