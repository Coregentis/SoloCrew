import type { SoloCrewProjectionObjectType } from "./projection-object-types.ts";

export const COGNITIVE_WORKFORCE_OBJECT_TYPES = [
  "agent-group",
  "agent-worker",
  "role-profile",
  "objective",
  "work-item",
  "review-cycle",
  "memory-profile",
  "preference-profile",
] as const;

export type CognitiveWorkforceObjectType =
  (typeof COGNITIVE_WORKFORCE_OBJECT_TYPES)[number];

export const COGNITIVE_RUNTIME_CONSUMPTION_SURFACES = [
  "worker-lifecycle",
  "state-store",
  "execution-envelope",
  "execution-events",
  "execution-bridge",
  "action-dispatcher",
  "objective-anchor",
  "correction-capture",
  "preference-writeback",
] as const;

export type CognitiveRuntimeConsumptionSurface =
  (typeof COGNITIVE_RUNTIME_CONSUMPTION_SURFACES)[number];

export type ProjectionBoundaryOwnership =
  | "upstream_truth"
  | "projection_owned"
  | "app_only"
  | "reserved_due_to_upstream_absence";

export interface ProjectionBoundaryEntry {
  object_type: SoloCrewProjectionObjectType;
  upstream_object_type?: CognitiveWorkforceObjectType;
  ownership: ProjectionBoundaryOwnership;
  notes: string;
}

export const SOLOCREW_PROJECTION_BOUNDARY: readonly ProjectionBoundaryEntry[] = [
  {
    object_type: "crew",
    upstream_object_type: "agent-group",
    ownership: "projection_owned",
    notes: "Crew is a product noun mapped over neutral agent-group truth.",
  },
  {
    object_type: "crew-member",
    upstream_object_type: "agent-worker",
    ownership: "projection_owned",
    notes: "CrewMember wraps agent-worker and role-profile state without replacing them.",
  },
  {
    object_type: "objective",
    upstream_object_type: "objective",
    ownership: "projection_owned",
    notes: "Objective keeps its neutral upstream noun but still belongs to the product DTO layer downstream.",
  },
  {
    object_type: "work-item",
    upstream_object_type: "work-item",
    ownership: "projection_owned",
    notes: "WorkItem stays traceable to the upstream work-item record and execution contracts.",
  },
  {
    object_type: "memory-summary",
    upstream_object_type: "memory-profile",
    ownership: "projection_owned",
    notes: "MemorySummary packages memory-profile and preference-profile signals into a user-facing summary.",
  },
  {
    object_type: "review-strip",
    upstream_object_type: "review-cycle",
    ownership: "projection_owned",
    notes: "ReviewStrip is an aggregate projection over review-cycle, objective, work-item, and execution signals.",
  },
  {
    object_type: "budget-snapshot",
    ownership: "reserved_due_to_upstream_absence",
    notes: "Budget runtime is absent upstream, so this object remains a deferred projection placeholder.",
  },
  {
    object_type: "channel-thread",
    ownership: "reserved_due_to_upstream_absence",
    notes: "Channel runtime is absent upstream, so this object remains reserved only.",
  },
] as const;

export const SOLOCREW_READ_ONLY_AUTHORITY_SURFACES: readonly string[] = [
  "schemas/coregentis/v0/workforce",
  "registry/coregentis-object-registry.v0.yaml",
  "bindings/mplp-coregentis-binding-matrix.v0.yaml",
  "bindings/coregentis-export-rules.v0.yaml",
  "runtime/core/runtime-types.ts",
] as const;

export const SOLOCREW_EXPLICITLY_ABSENT_UPSTREAM_SURFACES: readonly string[] = [
  "full-ael",
  "full-vsl",
  "full-psg",
  "budget-runtime",
  "channel-runtime",
  "provider-implementation",
  "full-autonomous-learning",
] as const;
