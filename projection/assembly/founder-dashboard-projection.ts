import type {
  RuntimeStateProjection,
} from "../../runtime-imports/cognitive-runtime.ts";
import type {
  FounderDashboardProjection,
} from "../contracts/founder-dashboard-projection-contract.ts";
import {
  adaptRuntimeStateProjectionToFounderDashboard,
} from "../adapters/founder-dashboard-runtime-adapter.ts";

export function assembleFounderDashboardProjection(
  runtime_state_projection: RuntimeStateProjection
): FounderDashboardProjection {
  return adaptRuntimeStateProjectionToFounderDashboard(runtime_state_projection);
}
