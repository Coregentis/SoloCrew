import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { dirname } from "node:path";

import type {
  ProductActionRequestRecord,
  ProductActionStoreSnapshot,
} from "./action-contract.ts";

export interface ActionStoreOptions {
  storage_path: string;
}

function create_empty_snapshot(): ProductActionStoreSnapshot {
  return {
    store_kind: "solocrew_action_store",
    schema_version: 1,
    action_requests: [],
    action_outcomes: [],
    review_proposals: [],
  };
}

function clone_snapshot(
  snapshot: ProductActionStoreSnapshot
): ProductActionStoreSnapshot {
  return JSON.parse(JSON.stringify(snapshot)) as ProductActionStoreSnapshot;
}

function sort_snapshot(
  snapshot: ProductActionStoreSnapshot
): ProductActionStoreSnapshot {
  return {
    ...snapshot,
    action_requests: [...snapshot.action_requests].sort((left, right) =>
      left.action_request_id.localeCompare(right.action_request_id)
    ),
    action_outcomes: [...snapshot.action_outcomes].sort((left, right) =>
      left.action_outcome_id.localeCompare(right.action_outcome_id)
    ),
    review_proposals: [...snapshot.review_proposals].sort((left, right) =>
      left.review_proposal_id.localeCompare(right.review_proposal_id)
    ),
  };
}

export class ProductActionStore {
  readonly storage_path: string;

  constructor(options: ActionStoreOptions) {
    this.storage_path = options.storage_path;
  }

  load_snapshot(): ProductActionStoreSnapshot {
    if (!existsSync(this.storage_path)) {
      return create_empty_snapshot();
    }

    const parsed = JSON.parse(
      readFileSync(this.storage_path, "utf8")
    ) as ProductActionStoreSnapshot;
    return clone_snapshot(parsed);
  }

  save_snapshot(snapshot: ProductActionStoreSnapshot): void {
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

  get_action_request(
    action_request_id: string
  ): ProductActionRequestRecord | null {
    return (
      this.load_snapshot().action_requests.find(
        (entry) => entry.action_request_id === action_request_id
      ) ?? null
    );
  }

  close(): void {
    // no-op for file-backed store
  }
}

export function loadActionStore(
  options: ActionStoreOptions
): ProductActionStore {
  return new ProductActionStore(options);
}

export function restoreActionStore(
  options: ActionStoreOptions
): ProductActionStore {
  return loadActionStore(options);
}
