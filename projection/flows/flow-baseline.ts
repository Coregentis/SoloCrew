import type {
  CognitiveRuntimeConsumptionSurface,
  CognitiveWorkforceObjectType,
} from "../contracts/projection-boundary.ts";
import type { SoloCrewProjectionObjectType } from "../contracts/projection-object-types.ts";

export const SOLOCREW_FLOW_IDS = [
  "flow-01-create-crew",
  "flow-02-set-objective",
  "flow-03-crew-starts-working",
  "flow-04-user-correction",
  "flow-05-return-and-continue",
] as const;

export type SoloCrewFlowId = (typeof SOLOCREW_FLOW_IDS)[number];

export type SoloCrewFlowDependency =
  | CognitiveWorkforceObjectType
  | CognitiveRuntimeConsumptionSurface;

export interface SoloCrewFlowBaseline {
  id: SoloCrewFlowId;
  title: string;
  user_visible_goal: string;
  required_upstream_dependencies: SoloCrewFlowDependency[];
  projection_objects_involved: SoloCrewProjectionObjectType[];
  explicitly_deferred: string[];
}

export const SOLOCREW_FLOW_BASELINE: readonly SoloCrewFlowBaseline[] = [
  {
    id: "flow-01-create-crew",
    title: "Create Crew",
    user_visible_goal: "Stand up the first SoloCrew shell with default members.",
    required_upstream_dependencies: [
      "agent-group",
      "agent-worker",
      "role-profile",
      "state-store",
      "worker-lifecycle",
    ],
    projection_objects_involved: [
      "crew",
      "crew-member",
      "review-strip",
    ],
    explicitly_deferred: [
      "provider-execution",
      "channel-entry",
      "budget-runtime",
    ],
  },
  {
    id: "flow-02-set-objective",
    title: "Set Objective",
    user_visible_goal: "Give the crew one current objective and attach initial work.",
    required_upstream_dependencies: [
      "objective",
      "work-item",
      "state-store",
      "objective-anchor",
    ],
    projection_objects_involved: [
      "crew",
      "objective",
      "crew-member",
      "work-item",
    ],
    explicitly_deferred: [
      "full-psg",
      "autonomous-planning",
      "cross-channel-routing",
    ],
  },
  {
    id: "flow-03-crew-starts-working",
    title: "Crew Starts Working",
    user_visible_goal: "Show visible motion around the current objective.",
    required_upstream_dependencies: [
      "agent-worker",
      "objective",
      "work-item",
      "worker-lifecycle",
      "execution-envelope",
      "execution-events",
      "action-dispatcher",
    ],
    projection_objects_involved: [
      "crew-member",
      "work-item",
      "objective",
      "review-strip",
    ],
    explicitly_deferred: [
      "provider-bridge-implementation",
      "full-orchestration-engine",
      "live-tool-execution",
    ],
  },
  {
    id: "flow-04-user-correction",
    title: "User Correction",
    user_visible_goal: "Capture a correction and package it into product-facing state.",
    required_upstream_dependencies: [
      "memory-profile",
      "preference-profile",
      "state-store",
      "correction-capture",
      "preference-writeback",
    ],
    projection_objects_involved: [
      "memory-summary",
      "crew-member",
      "review-strip",
    ],
    explicitly_deferred: [
      "full-correction-runtime",
      "autonomous-learning",
      "long-horizon-learning-policy",
    ],
  },
  {
    id: "flow-05-return-and-continue",
    title: "Return And Continue",
    user_visible_goal: "Return later and see continuity instead of reset.",
    required_upstream_dependencies: [
      "agent-group",
      "agent-worker",
      "objective",
      "work-item",
      "memory-profile",
      "preference-profile",
      "state-store",
      "objective-anchor",
    ],
    projection_objects_involved: [
      "crew",
      "crew-member",
      "objective",
      "work-item",
      "memory-summary",
    ],
    explicitly_deferred: [
      "full-psg-continuity",
      "channel-continuity",
      "budget-history",
    ],
  },
] as const;
