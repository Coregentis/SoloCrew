import {
  run_local_engagement_loop_review,
} from "../../app/engagement/engagement-loop-runner-workflow.ts";
import {
  createEngagementEntrySurfaceFixture,
} from "./v3-0-engagement-entry-surface-fixture.ts";

export function createEngagementLoopRunnerFixture() {
  const entry_surface_fixture = createEngagementEntrySurfaceFixture();
  const loop_result = run_local_engagement_loop_review({
    runner_id: "engagement-loop-runner-v3-0-local-review",
    run_id: "engagement-loop-run-v3-0-local-review",
    result_id: "engagement-loop-runner-result-v3-0-local-review",
    reviewed_at: "2026-04-30T13:00:00.000Z",
    entry_workspace_result: entry_surface_fixture.load_result,
  });

  return {
    fixture_id: "engagement-loop-runner-v3-0-fixture",
    fixture_kind: "engagement_loop_runner_review_only",
    entry_surface_fixture_id: entry_surface_fixture.fixture_id,
    loop_result,
    run: loop_result.run,
    steps: loop_result.steps,
    boundary_flags: loop_result.boundary_flags,
  } as const;
}

export function createV30EngagementLoopRunnerFixture() {
  return createEngagementLoopRunnerFixture();
}
