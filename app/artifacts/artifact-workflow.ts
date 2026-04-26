import type {
  ArtifactArchiveInput,
  CreateArtifactDraftInput,
  ProductArtifactCellId,
  ProductArtifactRecord,
  ProductArtifactStoreSnapshot,
  ReviseArtifactInput,
} from "./artifact-contract.ts";
import {
  createStarterCellArtifactTemplate,
} from "./starter-cell-artifact-templates.ts";
import {
  ProductArtifactStore,
} from "./artifact-store.ts";

export interface ArtifactWorkflowCreateOptions {
  created_at?: string;
}

const DEFAULT_CREATED_AT = "2026-04-26T00:00:00.000Z";
const ARTIFACT_SOURCE_FIXTURE_REF =
  "projection/fixtures/starter-cell-fixtures.ts" as const;

function create_artifact_id(args: {
  cell_id: ProductArtifactCellId;
  artifact_kind: ProductArtifactRecord["artifact_kind"];
}): string {
  return `${args.cell_id}:${args.artifact_kind}`;
}

function create_artifact_version_id(
  artifact_id: string,
  revision_index: number
): string {
  return `${artifact_id}@r${revision_index}`;
}

function clone_record(record: ProductArtifactRecord): ProductArtifactRecord {
  return JSON.parse(JSON.stringify(record)) as ProductArtifactRecord;
}

function load_records(
  store: ProductArtifactStore,
  artifact_id: string
): ProductArtifactRecord[] {
  const snapshot = store.load_snapshot();
  return [...(snapshot.records_by_artifact_id[artifact_id] ?? [])].sort(
    (left, right) => left.revision_index - right.revision_index
  );
}

function save_records(
  store: ProductArtifactStore,
  artifact_id: string,
  records: ProductArtifactRecord[]
): ProductArtifactStoreSnapshot {
  const snapshot = store.load_snapshot();
  snapshot.records_by_artifact_id[artifact_id] = [...records].sort(
    (left, right) => left.revision_index - right.revision_index
  );
  store.save_snapshot(snapshot);
  return snapshot;
}

export function createArtifactDraft(
  input: CreateArtifactDraftInput,
  options: ArtifactWorkflowCreateOptions = {}
): ProductArtifactRecord {
  const template = createStarterCellArtifactTemplate(input);
  const created_at = options.created_at ?? DEFAULT_CREATED_AT;
  const artifact_id = create_artifact_id({
    cell_id: template.cell_id,
    artifact_kind: template.artifact_kind,
  });

  return {
    artifact_id,
    artifact_version_id: create_artifact_version_id(artifact_id, 0),
    cell_id: template.cell_id,
    cell_label: template.cell_label,
    artifact_kind: template.artifact_kind,
    artifact_class: template.artifact_class,
    title: template.title,
    content: template.content,
    status: template.artifact_class === "imported" ? "imported" : "draft",
    created_at,
    updated_at: created_at,
    revision_index: 0,
    related_task_refs: [...template.related_task_refs],
    source_evidence_refs: [...template.source_evidence_refs],
    source_fixture_ref: ARTIFACT_SOURCE_FIXTURE_REF,
    non_executing: true,
    provider_execution_available: false,
    channel_entry_available: false,
    external_dispatch_available: false,
    runtime_private_fields_omitted: true,
  };
}

export function saveArtifact(
  store: ProductArtifactStore,
  record: ProductArtifactRecord
): ProductArtifactRecord {
  const existing_records = load_records(store, record.artifact_id);
  const without_same_version = existing_records.filter(
    (existing) => existing.artifact_version_id !== record.artifact_version_id
  );
  save_records(store, record.artifact_id, [...without_same_version, clone_record(record)]);
  return clone_record(record);
}

export function getArtifact(
  store: ProductArtifactStore,
  artifact_id: string
): ProductArtifactRecord | null {
  const records = load_records(store, artifact_id);
  return records.length === 0
    ? null
    : clone_record(records[records.length - 1]!);
}

export function listArtifactsByCell(
  store: ProductArtifactStore,
  cell_id: ProductArtifactCellId
): ProductArtifactRecord[] {
  return store
    .list_current_records()
    .filter((record) => record.cell_id === cell_id)
    .map(clone_record);
}

export function reviseArtifact(
  store: ProductArtifactStore,
  input: ReviseArtifactInput
): ProductArtifactRecord | null {
  const current = getArtifact(store, input.artifact_id);

  if (!current) {
    return null;
  }

  const next_revision_index = current.revision_index + 1;
  const updated_at = `${current.updated_at}-r${next_revision_index}`;
  const revised_record: ProductArtifactRecord = {
    ...current,
    artifact_version_id: create_artifact_version_id(
      current.artifact_id,
      next_revision_index
    ),
    title: input.title ?? current.title,
    content: input.content,
    status: "revised",
    updated_at,
    revision_index: next_revision_index,
    related_task_refs:
      input.related_task_refs && input.related_task_refs.length > 0
        ? [...input.related_task_refs]
        : [...current.related_task_refs],
    source_evidence_refs:
      input.source_evidence_refs && input.source_evidence_refs.length > 0
        ? [...input.source_evidence_refs]
        : [...current.source_evidence_refs],
  };

  saveArtifact(store, revised_record);
  return revised_record;
}

export function archiveArtifact(
  store: ProductArtifactStore,
  input: ArtifactArchiveInput
): ProductArtifactRecord | null {
  const current = getArtifact(store, input.artifact_id);

  if (!current) {
    return null;
  }

  const next_revision_index = current.revision_index + 1;
  const updated_at = `${current.updated_at}-archived-${next_revision_index}`;
  const archived_record: ProductArtifactRecord = {
    ...current,
    artifact_version_id: create_artifact_version_id(
      current.artifact_id,
      next_revision_index
    ),
    artifact_class: "archived",
    status: "archived",
    updated_at,
    revision_index: next_revision_index,
    source_evidence_refs:
      input.source_evidence_refs && input.source_evidence_refs.length > 0
        ? [...input.source_evidence_refs]
        : [...current.source_evidence_refs],
  };

  saveArtifact(store, archived_record);
  return archived_record;
}

export function getArtifactHistory(
  store: ProductArtifactStore,
  artifact_id: string
): ProductArtifactRecord[] {
  return load_records(store, artifact_id).map(clone_record);
}
