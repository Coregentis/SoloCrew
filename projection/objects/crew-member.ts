import {
  SOLOCREW_CONTRACT_VERSION,
  type ProjectionEnvelope,
  type ProjectionUpstreamRef,
} from "../contracts/projection-object-types.ts";

export type CrewMemberStatus =
  | "idle"
  | "active"
  | "blocked"
  | "paused"
  | "retired";

export type CrewMemberRole =
  | "builder"
  | "growth"
  | "content"
  | "ops";

export interface CrewMember extends ProjectionEnvelope<"crew-member"> {
  crew_member_id: string;
  crew_id: string;
  role: CrewMemberRole;
  display_name: string;
  status: CrewMemberStatus;
  current_focus?: string;
  recent_action_summary?: string;
  linked_objective_ids: string[];
  capability_tags: string[];
  memory_summary_id?: string;
}

export interface CreateCrewMemberInput {
  projection_id: string;
  crew_member_id: string;
  crew_id: string;
  role: CrewMemberRole;
  display_name: string;
  status: CrewMemberStatus;
  upstream_refs: ProjectionUpstreamRef[];
  current_focus?: string;
  recent_action_summary?: string;
  linked_objective_ids?: string[];
  capability_tags?: string[];
  memory_summary_id?: string;
  projection_notes?: string[];
}

export function createCrewMember(
  input: CreateCrewMemberInput
): CrewMember {
  return {
    projection_id: input.projection_id,
    object_type: "crew-member",
    contract_version: SOLOCREW_CONTRACT_VERSION,
    availability: "implemented",
    upstream_refs: [...input.upstream_refs],
    projection_notes: input.projection_notes
      ? [...input.projection_notes]
      : undefined,
    crew_member_id: input.crew_member_id,
    crew_id: input.crew_id,
    role: input.role,
    display_name: input.display_name,
    status: input.status,
    current_focus: input.current_focus,
    recent_action_summary: input.recent_action_summary,
    linked_objective_ids: [...(input.linked_objective_ids ?? [])],
    capability_tags: [...(input.capability_tags ?? [])],
    memory_summary_id: input.memory_summary_id,
  };
}
