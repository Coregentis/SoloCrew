export type ProductArtifactCellId =
  | "development_company"
  | "ecommerce"
  | "personal_media";

export type ProductArtifactKind =
  | "implementation_plan"
  | "review_packet"
  | "listing_copy"
  | "campaign_plan"
  | "article_draft"
  | "content_calendar_suggestion";

export type ProductArtifactClass =
  | "local_generated"
  | "external_draft"
  | "imported"
  | "archived";

export type ProductArtifactStatus =
  | "draft"
  | "revised"
  | "archived"
  | "imported";

export interface ProductArtifactRecord {
  artifact_id: string;
  artifact_version_id: string;
  cell_id: ProductArtifactCellId;
  cell_label: string;
  artifact_kind: ProductArtifactKind;
  artifact_class: ProductArtifactClass;
  title: string;
  content: string;
  status: ProductArtifactStatus;
  created_at: string;
  updated_at: string;
  revision_index: number;
  related_task_refs: string[];
  source_evidence_refs: string[];
  source_fixture_ref: "projection/fixtures/starter-cell-fixtures.ts";
  non_executing: true;
  provider_execution_available: false;
  channel_entry_available: false;
  external_dispatch_available: false;
  runtime_private_fields_omitted: true;
}

export interface ProductArtifactStoreSnapshot {
  store_kind: "solocrew_artifact_store";
  schema_version: 1;
  records_by_artifact_id: Record<string, ProductArtifactRecord[]>;
}

export interface CreateArtifactDraftInput {
  cell_id: ProductArtifactCellId;
  artifact_kind?: ProductArtifactKind;
  title?: string;
  content_seed?: string;
  related_task_refs?: string[];
  source_evidence_refs?: string[];
}

export interface ReviseArtifactInput {
  artifact_id: string;
  title?: string;
  content: string;
  related_task_refs?: string[];
  source_evidence_refs?: string[];
}

export interface ArtifactArchiveInput {
  artifact_id: string;
  source_evidence_refs?: string[];
}
