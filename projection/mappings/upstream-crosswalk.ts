import type {
  CognitiveWorkforceObjectType,
  ProjectionBoundaryOwnership,
} from "../contracts/projection-boundary.ts";
import type { SoloCrewProjectionObjectType } from "../contracts/projection-object-types.ts";

export interface UpstreamProjectionCrosswalkEntry {
  projection_object_type: SoloCrewProjectionObjectType;
  upstream_object_type?: CognitiveWorkforceObjectType;
  ownership: ProjectionBoundaryOwnership;
  status: "mapped" | "aggregate" | "deferred" | "reserved";
  notes: string;
}

export const SOLOCREW_UPSTREAM_CROSSWALK: readonly UpstreamProjectionCrosswalkEntry[] = [
  {
    projection_object_type: "crew",
    upstream_object_type: "agent-group",
    ownership: "projection_owned",
    status: "mapped",
    notes: "Crew maps over agent-group while preserving upstream status and membership truth.",
  },
  {
    projection_object_type: "crew-member",
    upstream_object_type: "agent-worker",
    ownership: "projection_owned",
    status: "mapped",
    notes: "CrewMember maps over agent-worker and supplements it with product-facing role labels and summaries.",
  },
  {
    projection_object_type: "objective",
    upstream_object_type: "objective",
    ownership: "projection_owned",
    status: "mapped",
    notes: "Objective remains traceable to the upstream objective record.",
  },
  {
    projection_object_type: "work-item",
    upstream_object_type: "work-item",
    ownership: "projection_owned",
    status: "mapped",
    notes: "WorkItem packages execution-facing upstream work-item truth into product view state.",
  },
  {
    projection_object_type: "memory-summary",
    upstream_object_type: "memory-profile",
    ownership: "projection_owned",
    status: "aggregate",
    notes: "MemorySummary aggregates memory-profile and preference-profile inputs into one user-facing summary surface.",
  },
  {
    projection_object_type: "review-strip",
    upstream_object_type: "review-cycle",
    ownership: "projection_owned",
    status: "aggregate",
    notes: "ReviewStrip is an aggregate over review-cycle plus objective/work-item/execution signals.",
  },
  {
    projection_object_type: "budget-snapshot",
    ownership: "reserved_due_to_upstream_absence",
    status: "deferred",
    notes: "Budget runtime is absent upstream, so the object exists only as a deferred contract.",
  },
  {
    projection_object_type: "channel-thread",
    ownership: "reserved_due_to_upstream_absence",
    status: "reserved",
    notes: "Channel runtime is absent upstream, so the object stays reserved only.",
  },
] as const;
