// lifecycle
export {
  WorkerLifecycleRuntime,
} from "../../Cognitive_OS/runtime/lifecycle/worker-lifecycle.ts";
export {
  WORKER_LIFECYCLE_STATES,
  is_worker_lifecycle_state,
  list_allowed_worker_state_transitions,
  can_transition_worker_state,
  assert_worker_state_transition,
} from "../../Cognitive_OS/runtime/lifecycle/worker-state-machine.ts";
export type {
  WorkerLifecycleClock,
} from "../../Cognitive_OS/runtime/lifecycle/worker-lifecycle.ts";
export type {
  WorkerLifecycleState,
} from "../../Cognitive_OS/runtime/lifecycle/worker-state-machine.ts";

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
  WorkforceStateRecord,
  WorkforceObjectType,
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
  RuntimeObjectRecord,
} from "../../Cognitive_OS/runtime/core/runtime-types.ts";

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
  ObjectiveAnchorPort,
  ObjectiveAnchorSnapshot,
  ObjectiveAnchorComparison,
} from "../../Cognitive_OS/runtime/learning/objective-anchor.ts";
export type {
  CorrectionCaptureInput,
  CorrectionCapturePort,
  CorrectionCaptureRecord,
  CorrectionCaptureStatus,
} from "../../Cognitive_OS/runtime/learning/correction-capture.ts";
export type {
  PreferenceWritebackRequest,
  PreferenceWritebackResult,
  PreferenceWritebackDisposition,
} from "../../Cognitive_OS/runtime/learning/preference-writeback.ts";

// execution
export {
  ActionDispatcher,
} from "../../Cognitive_OS/runtime/execution/action-dispatcher.ts";
export type {
  ActionDispatchHandler,
  ActionDispatchOutcome,
  ActionDispatchDisposition,
} from "../../Cognitive_OS/runtime/execution/action-dispatcher.ts";
export type {
  ExecutionRequestEnvelope,
  ExecutionResultEnvelope,
  ExecutionWorkerRef,
  ExecutionContextRef,
  ExecutionInstructionSet,
} from "../../Cognitive_OS/runtime/execution/execution-envelope.ts";
export type {
  ExecutionEventContract,
  ExecutionEventType,
} from "../../Cognitive_OS/runtime/execution/execution-events.ts";
export type {
  ExecutionBridgeCapabilities,
  ExecutionBridgeContract,
} from "../../Cognitive_OS/runtime/execution/execution-bridge.ts";

export const COGNITIVE_RUNTIME_ALLOWED_SURFACES = [
  "runtime/core/runtime-types.ts",
  "runtime/lifecycle/worker-state-machine.ts",
  "runtime/lifecycle/worker-lifecycle.ts",
  "runtime/state/state-store-port.ts",
  "runtime/state/in-memory-state-store.ts",
  "runtime/state/sqlite-state-store.ts",
  "runtime/state/worker-store.ts",
  "runtime/state/objective-store.ts",
  "runtime/state/memory-store.ts",
  "runtime/state/preference-store.ts",
  "runtime/learning/objective-anchor.ts",
  "runtime/learning/correction-capture.ts",
  "runtime/learning/preference-writeback.ts",
  "runtime/execution/execution-envelope.ts",
  "runtime/execution/execution-events.ts",
  "runtime/execution/execution-bridge.ts",
  "runtime/execution/action-dispatcher.ts",
] as const;
