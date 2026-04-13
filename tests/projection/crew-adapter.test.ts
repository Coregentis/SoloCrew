import test from "node:test";
import assert from "node:assert/strict";

import { createRuntimeSession } from "../../app/shell/create-runtime-session.ts";
import { adaptAgentGroupToCrew } from "../../projection/adapters/crew-adapter.ts";
import {
  load_agent_group,
  seedBaselineState,
} from "../../projection/assembly/seed-baseline.ts";

test("[projection] agent-group adapts to Crew with upstream refs preserved", () => {
  const runtime = seedBaselineState(createRuntimeSession());
  const agent_group = load_agent_group(
    runtime.state_store,
    runtime.seeded_ids.group_id
  );

  assert.ok(agent_group);

  const crew = adaptAgentGroupToCrew({
    agent_group,
  });

  assert.equal(crew.object_type, "crew");
  assert.equal(crew.crew_id, runtime.seeded_ids.group_id);
  assert.equal(crew.display_name, "SoloCrew Baseline");
  assert.equal(crew.upstream_refs.length, 1);
  assert.equal(crew.upstream_refs[0]?.upstream_object_id, agent_group.object_id);
  assert.equal("authority_class" in crew, false);
  assert.equal("primary_layer" in crew, false);
  assert.equal("group_name" in crew, false);
  runtime.close();
});
