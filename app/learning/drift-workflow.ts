import type {
  ProductArtifactCellId,
} from "../artifacts/artifact-contract.ts";
import {
  ProductLearningDriftStore,
} from "./learning-drift-store.ts";
import type {
  CaptureDriftSignalInput,
  CreateDriftImpactFromSignalInput,
  ProductDriftImpactRecord,
  ProductDriftImpactStatus,
  ProductDriftKind,
  ProductDriftRecommendation,
  ProductDriftSignalRecord,
} from "./learning-drift-contract.ts";

const DEFAULT_CREATED_AT = "2026-04-26T00:00:00.000Z";

function stable_hash(value: string): string {
  let hash = 0;
  for (const character of value) {
    hash = (hash * 33 + character.charCodeAt(0)) % 2147483647;
  }
  return hash.toString(36);
}

function clone_signal(
  signal: ProductDriftSignalRecord
): ProductDriftSignalRecord {
  return JSON.parse(JSON.stringify(signal)) as ProductDriftSignalRecord;
}

function clone_impact(
  impact: ProductDriftImpactRecord
): ProductDriftImpactRecord {
  return JSON.parse(JSON.stringify(impact)) as ProductDriftImpactRecord;
}

function save_signal(
  store: ProductLearningDriftStore,
  signal: ProductDriftSignalRecord
): ProductDriftSignalRecord {
  const snapshot = store.load_snapshot();
  snapshot.drift_signals = [
    ...snapshot.drift_signals.filter(
      (entry) => entry.drift_signal_id !== signal.drift_signal_id
    ),
    clone_signal(signal),
  ];
  store.save_snapshot(snapshot);
  return clone_signal(signal);
}

function save_impact(
  store: ProductLearningDriftStore,
  impact: ProductDriftImpactRecord
): ProductDriftImpactRecord {
  const snapshot = store.load_snapshot();
  snapshot.drift_impacts = [
    ...snapshot.drift_impacts.filter(
      (entry) => entry.drift_impact_id !== impact.drift_impact_id
    ),
    clone_impact(impact),
  ];
  store.save_snapshot(snapshot);
  return clone_impact(impact);
}

function update_drift_impact_status(
  store: ProductLearningDriftStore,
  drift_impact_id: string,
  status: ProductDriftImpactStatus
): ProductDriftImpactRecord | null {
  const snapshot = store.load_snapshot();
  const impact = snapshot.drift_impacts.find(
    (entry) => entry.drift_impact_id === drift_impact_id
  );

  if (!impact) {
    return null;
  }

  const updated: ProductDriftImpactRecord = {
    ...impact,
    status,
    updated_at: `${impact.created_at}:${status}`,
  };
  snapshot.drift_impacts = snapshot.drift_impacts.map((entry) =>
    entry.drift_impact_id === drift_impact_id ? updated : entry
  );
  store.save_snapshot(snapshot);
  return clone_impact(updated);
}

export function recommendDriftContinuation(input: {
  drift_kind: ProductDriftKind;
  change_summary: string;
}): ProductDriftRecommendation {
  const normalized_summary = input.change_summary.toLowerCase();
  const minor_change =
    normalized_summary.includes("minor") ||
    normalized_summary.includes("small") ||
    normalized_summary.includes("bounded");

  if (
    minor_change &&
    (input.drift_kind === "goal_change" ||
      input.drift_kind === "requirement_change" ||
      input.drift_kind === "catalog_change")
  ) {
    return "continue";
  }

  switch (input.drift_kind) {
    case "goal_change":
      return "clarify";
    case "requirement_change":
      return "revise";
    case "audience_shift":
      return "branch";
    case "catalog_change":
      return "revise";
    case "scope_conflict":
      return "block";
    case "stale_artifact":
      return "revise";
    default:
      return "clarify";
  }
}

export function captureDriftSignal(
  store: ProductLearningDriftStore,
  input: CaptureDriftSignalInput
): ProductDriftSignalRecord {
  const normalized_summary = input.change_summary.trim();
  const drift_signal_id = [
    input.cell_id,
    input.drift_kind,
    stable_hash(`${input.source_artifact_id ?? "no-artifact"}|${normalized_summary}`),
  ].join(":");
  const signal: ProductDriftSignalRecord = {
    drift_signal_id,
    cell_id: input.cell_id,
    source_artifact_id: input.source_artifact_id,
    drift_kind: input.drift_kind,
    change_summary: normalized_summary,
    created_at: DEFAULT_CREATED_AT,
    source_evidence_refs: [...(input.source_evidence_refs ?? [])],
    non_executing: true,
    provider_execution_available: false,
    channel_entry_available: false,
    runtime_private_fields_omitted: true,
  };

  return save_signal(store, signal);
}

export function listDriftSignalsByCell(
  store: ProductLearningDriftStore,
  cell_id: ProductArtifactCellId
): ProductDriftSignalRecord[] {
  return store
    .load_snapshot()
    .drift_signals.filter((entry) => entry.cell_id === cell_id)
    .sort((left, right) => left.drift_signal_id.localeCompare(right.drift_signal_id))
    .map(clone_signal);
}

export function createDriftImpactFromSignal(
  store: ProductLearningDriftStore,
  input: CreateDriftImpactFromSignalInput
): ProductDriftImpactRecord {
  const recommendation = recommendDriftContinuation({
    drift_kind: input.drift_signal.drift_kind,
    change_summary: input.drift_signal.change_summary,
  });
  const impact: ProductDriftImpactRecord = {
    drift_impact_id: `${input.drift_signal.drift_signal_id}:impact`,
    cell_id: input.drift_signal.cell_id,
    source_drift_signal_id: input.drift_signal.drift_signal_id,
    affected_artifact_refs: [...(input.affected_artifact_refs ?? [])],
    affected_task_refs: [...(input.affected_task_refs ?? [])],
    impact_summary: `${input.drift_signal.change_summary} -> ${recommendation}`,
    recommendation,
    status: "open",
    created_at: DEFAULT_CREATED_AT,
    updated_at: DEFAULT_CREATED_AT,
    source_evidence_refs: [
      ...input.drift_signal.source_evidence_refs,
      ...(input.source_evidence_refs ?? []),
    ],
    non_executing: true,
    provider_execution_available: false,
    channel_entry_available: false,
    runtime_private_fields_omitted: true,
  };

  return save_impact(store, impact);
}

export function acknowledgeDriftImpact(
  store: ProductLearningDriftStore,
  drift_impact_id: string
): ProductDriftImpactRecord | null {
  return update_drift_impact_status(store, drift_impact_id, "acknowledged");
}

export function closeDriftImpact(
  store: ProductLearningDriftStore,
  drift_impact_id: string
): ProductDriftImpactRecord | null {
  return update_drift_impact_status(store, drift_impact_id, "closed");
}

export function listDriftImpactsByCell(
  store: ProductLearningDriftStore,
  cell_id: ProductArtifactCellId
): ProductDriftImpactRecord[] {
  return store
    .load_snapshot()
    .drift_impacts.filter((entry) => entry.cell_id === cell_id)
    .sort((left, right) => left.drift_impact_id.localeCompare(right.drift_impact_id))
    .map(clone_impact);
}
