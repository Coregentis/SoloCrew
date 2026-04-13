export const SOLOCREW_CONTRACT_VERSION = "v0.1-baseline" as const;

export const SOLOCREW_PROJECTION_OBJECT_TYPES = [
  "crew",
  "crew-member",
  "objective",
  "work-item",
  "memory-summary",
  "review-strip",
  "budget-snapshot",
  "channel-thread",
] as const;

export type SoloCrewProjectionObjectType =
  (typeof SOLOCREW_PROJECTION_OBJECT_TYPES)[number];

export type SoloCrewProjectionAvailability =
  | "implemented"
  | "deferred"
  | "reserved";

export interface ProjectionUpstreamRef {
  source_repo: "Cognitive_OS";
  upstream_object_type: string;
  upstream_object_id?: string;
  notes?: string[];
}

export interface ProjectionEnvelope<
  TObjectType extends SoloCrewProjectionObjectType,
> {
  projection_id: string;
  object_type: TObjectType;
  contract_version: typeof SOLOCREW_CONTRACT_VERSION;
  availability: SoloCrewProjectionAvailability;
  upstream_refs: ProjectionUpstreamRef[];
  projection_notes?: string[];
}
