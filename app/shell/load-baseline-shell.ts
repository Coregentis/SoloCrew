import {
  bindBaselineRuntimeContext,
  type BaselineRuntimeSession,
} from "../../projection/assembly/seed-baseline.ts";
import { assembleReturnAndContinueView } from "../../projection/assembly/flow-assembly.ts";
import type { BaselineShellSession, SoloCrewShellPayload } from "./create-baseline-shell.ts";
import {
  isRuntimeSession,
  type RuntimeSessionOptions,
} from "./create-runtime-session.ts";
import { loadRuntimeSession } from "./load-runtime-session.ts";

export function loadBaselineShell(
  input: BaselineRuntimeSession | RuntimeSessionOptions
): BaselineShellSession {
  const session = isRuntimeSession(input)
    ? input
    : loadRuntimeSession(input);
  const runtime = bindBaselineRuntimeContext(session);
  const continuation_view = assembleReturnAndContinueView(runtime);

  const shell: SoloCrewShellPayload = {
    project_id: runtime.project_id,
    crew: continuation_view.crew,
    crew_members: continuation_view.crew_members,
    objective: continuation_view.objective,
    work_items: continuation_view.work_items,
    memory_summaries: continuation_view.memory_summaries,
    review_strip: continuation_view.review_strip,
    continuity: continuation_view.continuity,
  };

  return {
    runtime,
    shell,
  };
}
