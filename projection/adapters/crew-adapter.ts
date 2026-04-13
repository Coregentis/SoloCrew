import { createCrew, type Crew, type CrewHealth } from "../objects/crew.ts";
import type { AgentGroupRecord } from "./upstream-record-types.ts";

function derive_crew_health(params: {
  status: AgentGroupRecord["status"];
  worker_ids: string[];
  objective_ids: string[];
}): CrewHealth {
  if (params.status === "paused" || params.status === "archived") {
    return "paused";
  }

  if (params.status === "forming") {
    return "forming";
  }

  if (params.worker_ids.length > 0 && params.objective_ids.length > 0) {
    return "working";
  }

  return "attention";
}

export interface CrewAdapterInput {
  agent_group: AgentGroupRecord;
  related_worker_ids?: string[];
  related_objective_ids?: string[];
}

export function adaptAgentGroupToCrew(input: CrewAdapterInput): Crew {
  const worker_ids =
    input.related_worker_ids ??
    (Array.isArray(input.agent_group.worker_ids)
      ? input.agent_group.worker_ids
      : []);
  const objective_ids =
    input.related_objective_ids ??
    (Array.isArray(input.agent_group.objective_ids)
      ? input.agent_group.objective_ids
      : []);

  return createCrew({
    projection_id: `crew:${input.agent_group.object_id}`,
    crew_id: input.agent_group.object_id,
    display_name: input.agent_group.group_name,
    mission:
      input.agent_group.group_summary ??
      "SoloCrew downstream projection over bounded mother-runtime state.",
    status: input.agent_group.status,
    health: derive_crew_health({
      status: input.agent_group.status,
      worker_ids,
      objective_ids,
    }),
    upstream_refs: [
      {
        source_repo: "Cognitive_OS",
        upstream_object_type: input.agent_group.object_type,
        upstream_object_id: input.agent_group.object_id,
      },
    ],
    member_ids: worker_ids,
    current_objective_id: objective_ids[0],
    continuity_mode: input.agent_group.continuity_mode,
  });
}
