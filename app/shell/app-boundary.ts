import type { SoloCrewProjectionObjectType } from "../../projection/contracts/projection-object-types.ts";

export type SoloCrewAppShellRole =
  | "product-shell"
  | "workflow-composer"
  | "projection-consumer";

export interface SoloCrewAppShellBoundary {
  role: SoloCrewAppShellRole;
  owned_projection_objects: SoloCrewProjectionObjectType[];
  does_not_own: string[];
  deferred: string[];
}

export const SOLOCREW_APP_SHELL_BOUNDARY: SoloCrewAppShellBoundary = {
  role: "projection-consumer",
  owned_projection_objects: [
    "crew",
    "crew-member",
    "objective",
    "work-item",
    "memory-summary",
    "review-strip",
    "budget-snapshot",
  ],
  does_not_own: [
    "mother-runtime-law",
    "provider-implementation",
    "channel-runtime",
    "budget-runtime",
    "autonomous-learning",
  ],
  deferred: [
    "full-page-routing",
    "interactive-cockpit",
    "telegram-entry",
    "live-data-fetching",
  ],
};
