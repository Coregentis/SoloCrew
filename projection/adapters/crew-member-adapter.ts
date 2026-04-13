import {
  createCrewMember,
  type CrewMember,
  type CrewMemberRole,
} from "../objects/crew-member.ts";
import type {
  AgentWorkerRecord,
  RoleProfileRecord,
} from "./upstream-record-types.ts";

export interface CrewMemberMemorySignals {
  memory_summary_id?: string;
  current_focus?: string;
}

export interface CrewMemberAdapterInput {
  crew_id: string;
  agent_worker: AgentWorkerRecord;
  role_profile?: RoleProfileRecord;
  memory_signals?: CrewMemberMemorySignals;
  recent_action_summary?: string;
}

function derive_role(input: {
  agent_worker: AgentWorkerRecord;
  role_profile?: RoleProfileRecord;
}): CrewMemberRole {
  const role_source = [
    input.role_profile?.profile_name,
    input.agent_worker.worker_name,
    input.agent_worker.worker_summary,
  ]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();

  if (role_source.includes("builder") || role_source.includes("build")) {
    return "builder";
  }

  if (role_source.includes("growth")) {
    return "growth";
  }

  if (role_source.includes("content")) {
    return "content";
  }

  return "ops";
}

export function adaptAgentWorkerToCrewMember(
  input: CrewMemberAdapterInput
): CrewMember {
  const role = derive_role(input);

  return createCrewMember({
    projection_id: `crew-member:${input.agent_worker.object_id}`,
    crew_member_id: input.agent_worker.object_id,
    crew_id: input.crew_id,
    role,
    display_name: input.agent_worker.worker_name,
    status: input.agent_worker.status,
    upstream_refs: [
      {
        source_repo: "Cognitive_OS",
        upstream_object_type: input.agent_worker.object_type,
        upstream_object_id: input.agent_worker.object_id,
      },
      ...(input.role_profile
        ? [
            {
              source_repo: "Cognitive_OS" as const,
              upstream_object_type: input.role_profile.object_type,
              upstream_object_id: input.role_profile.object_id,
            },
          ]
        : []),
    ],
    current_focus:
      input.memory_signals?.current_focus ??
      input.agent_worker.worker_summary,
    recent_action_summary: input.recent_action_summary,
    linked_objective_ids: Array.isArray(input.agent_worker.default_objective_ids)
      ? input.agent_worker.default_objective_ids
      : [],
    capability_tags: Array.isArray(input.agent_worker.capability_tags)
      ? input.agent_worker.capability_tags
      : Array.isArray(input.role_profile?.capability_tags)
        ? input.role_profile.capability_tags
        : [],
    memory_summary_id: input.memory_signals?.memory_summary_id,
  });
}
