import {
  ActionDispatcher,
  InMemoryCorrectionCapture,
  InMemoryObjectiveAnchor,
  InMemoryStateStore,
  MemoryStore,
  ObjectiveStore,
  PreferenceStore,
  PreferenceWritebackService,
  SQLiteStateStore,
  WorkerLifecycleRuntime,
  WorkerStore,
  type StateStorePort,
} from "../../runtime-imports/cognitive-runtime.ts";
import {
  SOLOCREW_SEALED_RUNTIME_SESSION_COMPATIBILITY_SURFACES,
} from "./runtime-session-facade.ts";

export type RuntimeSessionMode = "memory" | "sqlite";

export interface RuntimeSessionOptions {
  mode?: RuntimeSessionMode;
  sqlite_path?: string;
}

type ClosableStateStore = StateStorePort & {
  close?: () => void;
};

export interface SoloCrewRuntimeSession {
  session_kind: "solocrew-runtime-session";
  mode: RuntimeSessionMode;
  sqlite_path?: string;
  state_store: ClosableStateStore;
  worker_store: WorkerStore;
  objective_store: ObjectiveStore;
  memory_store: MemoryStore;
  preference_store: PreferenceStore;
  worker_lifecycle: WorkerLifecycleRuntime;
  objective_anchor: InMemoryObjectiveAnchor;
  correction_capture: InMemoryCorrectionCapture;
  preference_writeback: PreferenceWritebackService;
  action_dispatcher: ActionDispatcher;
  consumed_surfaces: readonly string[];
  close(): void;
}

function create_state_store(
  options: RuntimeSessionOptions
): ClosableStateStore {
  const mode = options.mode ?? "memory";

  if (mode === "sqlite") {
    if (!options.sqlite_path) {
      throw new Error(
        "SQLite runtime session requires sqlite_path."
      );
    }

    return new SQLiteStateStore(options.sqlite_path) as ClosableStateStore;
  }

  return new InMemoryStateStore() as ClosableStateStore;
}

function build_runtime_session(
  state_store: ClosableStateStore,
  options: RuntimeSessionOptions
): SoloCrewRuntimeSession {
  const worker_store = new WorkerStore(state_store);
  const objective_store = new ObjectiveStore(state_store);
  const memory_store = new MemoryStore(state_store);
  const preference_store = new PreferenceStore(state_store);
  const correction_capture = new InMemoryCorrectionCapture();
  const objective_anchor = new InMemoryObjectiveAnchor({
    objective_store,
  });
  const preference_writeback = new PreferenceWritebackService({
    preference_store,
    correction_capture,
  });
  const action_dispatcher = new ActionDispatcher();

  return {
    session_kind: "solocrew-runtime-session",
    mode: options.mode ?? "memory",
    sqlite_path: options.sqlite_path,
    state_store,
    worker_store,
    objective_store,
    memory_store,
    preference_store,
    worker_lifecycle: new WorkerLifecycleRuntime({
      worker_store,
    }),
    objective_anchor,
    correction_capture,
    preference_writeback,
    action_dispatcher,
    consumed_surfaces:
      SOLOCREW_SEALED_RUNTIME_SESSION_COMPATIBILITY_SURFACES,
    close() {
      if (typeof state_store.close === "function") {
        state_store.close();
      }
    },
  };
}

export function isRuntimeSession(
  value: unknown
): value is SoloCrewRuntimeSession {
  return Boolean(
    value &&
      typeof value === "object" &&
      "session_kind" in value &&
      (value as { session_kind?: string }).session_kind ===
        "solocrew-runtime-session"
  );
}

export function createRuntimeSession(
  options: RuntimeSessionOptions = {}
): SoloCrewRuntimeSession {
  const state_store = create_state_store(options);
  return build_runtime_session(state_store, options);
}
