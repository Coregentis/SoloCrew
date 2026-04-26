import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { dirname } from "node:path";

import type {
  ProductLearningDriftStoreSnapshot,
} from "./learning-drift-contract.ts";

export interface LearningDriftStoreOptions {
  storage_path: string;
}

function create_empty_snapshot(): ProductLearningDriftStoreSnapshot {
  return {
    store_kind: "solocrew_learning_drift_store",
    schema_version: 1,
    feedback_records: [],
    learning_candidates: [],
    drift_signals: [],
    drift_impacts: [],
  };
}

function clone_snapshot(
  snapshot: ProductLearningDriftStoreSnapshot
): ProductLearningDriftStoreSnapshot {
  return JSON.parse(JSON.stringify(snapshot)) as ProductLearningDriftStoreSnapshot;
}

function sort_snapshot(
  snapshot: ProductLearningDriftStoreSnapshot
): ProductLearningDriftStoreSnapshot {
  return {
    ...snapshot,
    feedback_records: [...snapshot.feedback_records].sort((left, right) =>
      left.feedback_id.localeCompare(right.feedback_id)
    ),
    learning_candidates: [...snapshot.learning_candidates].sort((left, right) =>
      left.candidate_id.localeCompare(right.candidate_id)
    ),
    drift_signals: [...snapshot.drift_signals].sort((left, right) =>
      left.drift_signal_id.localeCompare(right.drift_signal_id)
    ),
    drift_impacts: [...snapshot.drift_impacts].sort((left, right) =>
      left.drift_impact_id.localeCompare(right.drift_impact_id)
    ),
  };
}

export class ProductLearningDriftStore {
  readonly storage_path: string;

  constructor(options: LearningDriftStoreOptions) {
    this.storage_path = options.storage_path;
  }

  load_snapshot(): ProductLearningDriftStoreSnapshot {
    if (!existsSync(this.storage_path)) {
      return create_empty_snapshot();
    }

    const parsed = JSON.parse(
      readFileSync(this.storage_path, "utf8")
    ) as ProductLearningDriftStoreSnapshot;
    return clone_snapshot(parsed);
  }

  save_snapshot(snapshot: ProductLearningDriftStoreSnapshot): void {
    const parent_directory = dirname(this.storage_path);
    mkdirSync(parent_directory, { recursive: true });

    const temp_path = `${this.storage_path}.tmp`;
    writeFileSync(
      temp_path,
      JSON.stringify(sort_snapshot(snapshot), null, 2),
      "utf8"
    );
    renameSync(temp_path, this.storage_path);
  }

  close(): void {
    // no-op for file-backed store
  }
}

export function loadLearningDriftStore(
  options: LearningDriftStoreOptions
): ProductLearningDriftStore {
  return new ProductLearningDriftStore(options);
}

export function restoreLearningDriftStore(
  options: LearningDriftStoreOptions
): ProductLearningDriftStore {
  return loadLearningDriftStore(options);
}
