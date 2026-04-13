import test from "node:test";
import assert from "node:assert/strict";

import { createBaselineShell } from "../../app/shell/create-baseline-shell.ts";

test("[app] baseline shell payload can be created from in-memory seed state", () => {
  const session = createBaselineShell();

  assert.equal(session.shell.crew.object_type, "crew");
  assert.ok(session.shell.crew_members.length >= 2);
  assert.equal(session.shell.objective.object_type, "objective");
  assert.ok(session.shell.work_items.length >= 2);
  assert.ok(session.shell.memory_summaries.length >= 1);
  assert.equal(session.shell.review_strip.object_type, "review-strip");
});
