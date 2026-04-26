export type SoloCrewCorrectionCaptureTarget =
  | "objective"
  | "worker"
  | "preference"
  | "execution";

export type SoloCrewPreferenceWritebackDisposition =
  | "applied"
  | "skipped"
  | "failed";

export const SOLOCREW_SEALED_RUNTIME_SESSION_COMPATIBILITY_SURFACES = [
  "runtime/core/runtime-types.ts#projection-safe-enums-only",
  "runtime/core/projection-types.ts#projection-safe-types-only",
  "runtime/lifecycle/worker-lifecycle.ts#sealed-session-only",
  "runtime/state/state-store-port.ts#sealed-session-only",
  "runtime/state/in-memory-state-store.ts#sealed-session-only",
  "runtime/state/sqlite-state-store.ts#sealed-session-only",
  "runtime/state/worker-store.ts#sealed-session-only",
  "runtime/state/objective-store.ts#sealed-session-only",
  "runtime/state/memory-store.ts#sealed-session-only",
  "runtime/state/preference-store.ts#sealed-session-only",
  "runtime/learning/objective-anchor.ts#sealed-session-only",
  "runtime/learning/correction-capture.ts#sealed-session-only",
  "runtime/learning/preference-writeback.ts#sealed-session-only",
  "runtime/execution/execution-envelope.ts#local-bounded-motion-only",
  "runtime/execution/execution-events.ts#local-bounded-motion-only",
  "runtime/execution/action-dispatcher.ts#local-bounded-motion-only",
] as const;

export const SOLOCREW_RUNTIME_SESSION_FACADE_BOUNDARY = {
  bridge_scope: "sealed_v2_0_runtime_session_compatibility",
  projection_api: false,
  product_dto_source: false,
  provider_channel_dispatch_available: false,
  autonomous_execution_available: false,
  runtime_private_fields_must_be_omitted_from_product_dtos: true,
} as const;
