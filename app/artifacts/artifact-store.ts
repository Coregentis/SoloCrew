import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { dirname } from "node:path";

import type {
  ProductArtifactRecord,
  ProductArtifactStoreSnapshot,
} from "./artifact-contract.ts";

export interface ArtifactStoreOptions {
  storage_path: string;
}

function create_empty_snapshot(): ProductArtifactStoreSnapshot {
  return {
    store_kind: "solocrew_artifact_store",
    schema_version: 1,
    records_by_artifact_id: {},
  };
}

function clone_snapshot(
  snapshot: ProductArtifactStoreSnapshot
): ProductArtifactStoreSnapshot {
  return JSON.parse(JSON.stringify(snapshot)) as ProductArtifactStoreSnapshot;
}

export class ProductArtifactStore {
  readonly storage_path: string;

  constructor(options: ArtifactStoreOptions) {
    this.storage_path = options.storage_path;
  }

  load_snapshot(): ProductArtifactStoreSnapshot {
    if (!existsSync(this.storage_path)) {
      return create_empty_snapshot();
    }

    const parsed = JSON.parse(
      readFileSync(this.storage_path, "utf8")
    ) as ProductArtifactStoreSnapshot;

    return clone_snapshot(parsed);
  }

  save_snapshot(snapshot: ProductArtifactStoreSnapshot): void {
    const parent_directory = dirname(this.storage_path);
    mkdirSync(parent_directory, { recursive: true });

    const stable_snapshot: ProductArtifactStoreSnapshot = {
      ...snapshot,
      records_by_artifact_id: Object.fromEntries(
        Object.entries(snapshot.records_by_artifact_id)
          .sort(([left], [right]) => left.localeCompare(right))
          .map(([artifact_id, records]) => [
            artifact_id,
            [...records].sort((left, right) =>
              left.revision_index - right.revision_index
            ),
          ])
      ),
    };

    const temp_path = `${this.storage_path}.tmp`;
    writeFileSync(
      temp_path,
      JSON.stringify(stable_snapshot, null, 2),
      "utf8"
    );
    renameSync(temp_path, this.storage_path);
  }

  list_current_records(): ProductArtifactRecord[] {
    return Object.values(this.load_snapshot().records_by_artifact_id)
      .map((records) => [...records].sort((left, right) => right.revision_index - left.revision_index)[0])
      .filter((record): record is ProductArtifactRecord => record !== undefined)
      .sort((left, right) => left.artifact_id.localeCompare(right.artifact_id));
  }

  close(): void {
    // no-op; file-backed store is reopened per operation
  }
}

export function loadArtifactStore(
  options: ArtifactStoreOptions
): ProductArtifactStore {
  return new ProductArtifactStore(options);
}

export function restoreArtifactStore(
  options: ArtifactStoreOptions
): ProductArtifactStore {
  return loadArtifactStore(options);
}
