import {
  createRuntimeSession,
  type RuntimeSessionOptions,
  type SoloCrewRuntimeSession,
} from "./create-runtime-session.ts";

export function loadRuntimeSession(
  options: RuntimeSessionOptions = {}
): SoloCrewRuntimeSession {
  return createRuntimeSession(options);
}
