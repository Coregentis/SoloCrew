import type { ObjectiveAnchorComparison } from "../../runtime-imports/cognitive-runtime.ts";
import type { Crew } from "../../projection/objects/crew.ts";
import type { CrewMember } from "../../projection/objects/crew-member.ts";
import type { Objective } from "../../projection/objects/objective.ts";
import type { WorkItem } from "../../projection/objects/work-item.ts";
import type { MemorySummary } from "../../projection/objects/memory-summary.ts";
import type { ReviewStrip } from "../../projection/objects/review-strip.ts";
import {
  seedBaselineState,
  type BaselineRuntimeSession,
  type BaselineSeedOptions,
} from "../../projection/assembly/seed-baseline.ts";
import { assembleObjectiveView } from "../../projection/assembly/flow-assembly.ts";
import {
  createRuntimeSession,
  type RuntimeSessionOptions,
} from "./create-runtime-session.ts";

export interface SoloCrewShellPayload {
  project_id: string;
  crew: Crew;
  crew_members: CrewMember[];
  objective: Objective;
  work_items: WorkItem[];
  memory_summaries: MemorySummary[];
  review_strip: ReviewStrip;
  continuity: {
    objective_anchor_compare?: ObjectiveAnchorComparison;
    notes: string[];
  };
}

export interface BaselineShellSession {
  runtime: BaselineRuntimeSession;
  shell: SoloCrewShellPayload;
}

export interface CreateBaselineShellOptions extends BaselineSeedOptions {
  session?: RuntimeSessionOptions;
}

function build_session_note(mode: RuntimeSessionOptions["mode"]): string {
  if (mode === "sqlite") {
    return "Baseline shell created over a sqlite-backed runtime session.";
  }

  return "Baseline shell created over an in-memory runtime session.";
}

export function createBaselineShell(
  options: CreateBaselineShellOptions = {}
): BaselineShellSession {
  const session = createRuntimeSession(options.session);
  const runtime = seedBaselineState(session, options);
  const objective_view = assembleObjectiveView(runtime);

  runtime.objective_anchor.capture_anchor(objective_view.objective.objective_id);

  return {
    runtime,
    shell: {
      project_id: runtime.project_id,
      crew: objective_view.crew,
      crew_members: objective_view.crew_members,
      objective: objective_view.objective,
      work_items: objective_view.work_items,
      memory_summaries: objective_view.memory_summaries,
      review_strip: objective_view.review_strip,
      continuity: {
        notes: [
          build_session_note(session.mode),
          "Objective anchor captured for later return-and-continue comparison.",
        ],
      },
    },
  };
}
