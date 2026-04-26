// Sealed compatibility bridge for already-shipped SoloCrew V2.0
// runtime-session surfaces only. This is not a product projection API,
// protocol surface, or place for new workforce consumption. Canonical
// workforce paths must use projection-safe envelope DTOs under
// projection/adapters.

// lifecycle
export {
  WorkerLifecycleRuntime,
} from "../../Cognitive_OS/runtime/lifecycle/worker-lifecycle.ts";

// state
export {
  InMemoryStateStore,
} from "../../Cognitive_OS/runtime/state/in-memory-state-store.ts";
export {
  SQLiteStateStore,
} from "../../Cognitive_OS/runtime/state/sqlite-state-store.ts";
export {
  WorkerStore,
} from "../../Cognitive_OS/runtime/state/worker-store.ts";
export {
  ObjectiveStore,
} from "../../Cognitive_OS/runtime/state/objective-store.ts";
export {
  MemoryStore,
} from "../../Cognitive_OS/runtime/state/memory-store.ts";
export {
  PreferenceStore,
} from "../../Cognitive_OS/runtime/state/preference-store.ts";
export type {
  StateStorePort,
} from "../../Cognitive_OS/runtime/state/state-store-port.ts";
export type {
  AgentWorkerRecord,
} from "../../Cognitive_OS/runtime/state/worker-store.ts";
export type {
  ObjectiveRecord,
} from "../../Cognitive_OS/runtime/state/objective-store.ts";
export type {
  MemoryProfileRecord,
} from "../../Cognitive_OS/runtime/state/memory-store.ts";
export type {
  PreferenceProfileRecord,
} from "../../Cognitive_OS/runtime/state/preference-store.ts";

// runtime core truth
export type {
  RuntimeActionClass,
  RuntimeActionReadinessStatus,
} from "../../Cognitive_OS/runtime/core/runtime-types.ts";

export type {
  RuntimePriorityLevel,
  RuntimeArtifactClass,
  RuntimeLearningApplicationScope,
  RuntimeScopedLearningStatus,
  RuntimeContinuationRecommendation,
  RuntimePrioritySummary,
  OperationalUnitRuntimeProjection,
  RuntimeStateProjection,
} from "../../Cognitive_OS/runtime/core/projection-types.ts";

// learning
export {
  InMemoryObjectiveAnchor,
} from "../../Cognitive_OS/runtime/learning/objective-anchor.ts";
export {
  InMemoryCorrectionCapture,
} from "../../Cognitive_OS/runtime/learning/correction-capture.ts";
export {
  PreferenceWritebackService,
} from "../../Cognitive_OS/runtime/learning/preference-writeback.ts";
export type {
  ObjectiveAnchorComparison,
} from "../../Cognitive_OS/runtime/learning/objective-anchor.ts";
export type {
  CorrectionCaptureInput,
  CorrectionCaptureRecord,
} from "../../Cognitive_OS/runtime/learning/correction-capture.ts";
export type {
  PreferenceWritebackResult,
} from "../../Cognitive_OS/runtime/learning/preference-writeback.ts";

// execution
export {
  ActionDispatcher,
} from "../../Cognitive_OS/runtime/execution/action-dispatcher.ts";
export type {
  ActionDispatchHandler,
  ActionDispatchOutcome,
} from "../../Cognitive_OS/runtime/execution/action-dispatcher.ts";
export type {
  ExecutionRequestEnvelope,
} from "../../Cognitive_OS/runtime/execution/execution-envelope.ts";
export type {
  ExecutionEventContract,
} from "../../Cognitive_OS/runtime/execution/execution-events.ts";
