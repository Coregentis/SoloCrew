import assert from "node:assert/strict";
import test from "node:test";

import {
  createV24CommercializationReadinessLoopFixture,
} from "../../projection/fixtures/v2-4-commercialization-readiness-loop-fixture.ts";

test("[v2.4 e2e] commercialization readiness loop fixture is byte-identical across construction", () => {
  const first = JSON.stringify(createV24CommercializationReadinessLoopFixture());
  const second = JSON.stringify(createV24CommercializationReadinessLoopFixture());

  assert.equal(first, second);
});

test("[v2.4 e2e] commercialization readiness loop case ordering is deterministic", () => {
  const loop = createV24CommercializationReadinessLoopFixture();

  assert.deepEqual(Object.keys(loop.cases), [
    "promising_manual_pilot",
    "insufficient_evidence",
    "needs_operator_review",
    "legal_review",
    "denied_public_use",
    "blocked",
  ]);
});

test("[v2.4 e2e] commercialization readiness loop keeps stable refs unchanged", () => {
  const loop = createV24CommercializationReadinessLoopFixture();

  assert.equal(
    loop.v2_3_stable_baseline.tag,
    "solocrew-v2.3-stable-first-paid-pilot-loop-20260428"
  );
  assert.equal(
    loop.v2_3_stable_baseline.target_commit,
    "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a"
  );
  assert.equal(
    loop.source_chain.v2_3_stable_commit,
    "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a"
  );
});
