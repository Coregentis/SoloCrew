export type ContractVersion = string;
export type SchemaVersion = string;
export type ReleaseLine = string;
export type SourceReleaseRef = string;
export type SourceCommitRef = string;
export type BaselineReleaseRef = string;
export type BaselineCommitRef = string;
export type CompatibilityProfile = string;

export type MigrationRef = {
  release_ref?: ReleaseLine;
  commit_ref?: SourceCommitRef;
  compatibility_profile?: CompatibilityProfile;
  note?: string;
};

export type EngagementSourceMetadata = {
  contract_version: ContractVersion;
  schema_version: SchemaVersion;
  release_line: ReleaseLine;
  source_release_ref?: SourceReleaseRef;
  source_commit_ref?: SourceCommitRef;
  baseline_release_ref?: BaselineReleaseRef;
  baseline_commit_ref?: BaselineCommitRef;
};

export type EngagementCompatibilityMetadata = {
  contract_version: ContractVersion;
  schema_version: SchemaVersion;
  release_line: ReleaseLine;
  compatibility_profile: CompatibilityProfile;
  migration_from?: MigrationRef;
  migration_to?: MigrationRef;
};

export type EngagementVersionMetadata =
  & EngagementSourceMetadata
  & EngagementCompatibilityMetadata;

export const ENGAGEMENT_METADATA_FIELD_NAMES = [
  "contract_version",
  "schema_version",
  "release_line",
  "source_release_ref",
  "source_commit_ref",
  "baseline_release_ref",
  "baseline_commit_ref",
  "compatibility_profile",
  "migration_from",
  "migration_to",
] as const;

export const ENGAGEMENT_SOURCE_METADATA_FIELD_NAMES = [
  "contract_version",
  "schema_version",
  "release_line",
  "source_release_ref",
  "source_commit_ref",
  "baseline_release_ref",
  "baseline_commit_ref",
] as const;

export const ENGAGEMENT_COMPATIBILITY_METADATA_FIELD_NAMES = [
  "contract_version",
  "schema_version",
  "release_line",
  "compatibility_profile",
  "migration_from",
  "migration_to",
] as const;
