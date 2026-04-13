import {
  SOLOCREW_CONTRACT_VERSION,
  type ProjectionEnvelope,
  type ProjectionUpstreamRef,
} from "../contracts/projection-object-types.ts";

export type CrewStatus = "forming" | "active" | "paused" | "archived";
export type CrewHealth = "forming" | "working" | "attention" | "paused";
export type CrewContinuityMode =
  | "single_operator"
  | "scheduled_runtime"
  | "continuous_runtime";

export interface Crew extends ProjectionEnvelope<"crew"> {
  crew_id: string;
  display_name: string;
  mission: string;
  status: CrewStatus;
  member_ids: string[];
  current_objective_id?: string;
  continuity_mode?: CrewContinuityMode;
  health: CrewHealth;
}

export interface CreateCrewInput {
  projection_id: string;
  crew_id: string;
  display_name: string;
  mission: string;
  status: CrewStatus;
  health: CrewHealth;
  upstream_refs: ProjectionUpstreamRef[];
  member_ids?: string[];
  current_objective_id?: string;
  continuity_mode?: CrewContinuityMode;
  projection_notes?: string[];
}

export function createCrew(input: CreateCrewInput): Crew {
  return {
    projection_id: input.projection_id,
    object_type: "crew",
    contract_version: SOLOCREW_CONTRACT_VERSION,
    availability: "implemented",
    upstream_refs: [...input.upstream_refs],
    projection_notes: input.projection_notes
      ? [...input.projection_notes]
      : undefined,
    crew_id: input.crew_id,
    display_name: input.display_name,
    mission: input.mission,
    status: input.status,
    member_ids: [...(input.member_ids ?? [])],
    current_objective_id: input.current_objective_id,
    continuity_mode: input.continuity_mode,
    health: input.health,
  };
}
