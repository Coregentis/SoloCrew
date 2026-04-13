import type { BaselineRuntimeContext } from "../../projection/assembly/seed-baseline.ts";
import { assembleReturnAndContinueView } from "../../projection/assembly/flow-assembly.ts";
import type { SoloCrewShellPayload } from "./create-baseline-shell.ts";

export function loadBaselineShell(
  runtime: BaselineRuntimeContext
): SoloCrewShellPayload {
  const continuation_view = assembleReturnAndContinueView(runtime);

  return {
    project_id: runtime.project_id,
    crew: continuation_view.crew,
    crew_members: continuation_view.crew_members,
    objective: continuation_view.objective,
    work_items: continuation_view.work_items,
    memory_summaries: continuation_view.memory_summaries,
    review_strip: continuation_view.review_strip,
    continuity: continuation_view.continuity,
  };
}
