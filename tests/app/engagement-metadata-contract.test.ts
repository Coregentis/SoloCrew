import assert from "node:assert/strict";
import test from "node:test";

import {
  ENGAGEMENT_COMPATIBILITY_METADATA_FIELD_NAMES,
  ENGAGEMENT_METADATA_FIELD_NAMES,
  ENGAGEMENT_SOURCE_METADATA_FIELD_NAMES,
} from "../../app/engagement/engagement-metadata-contract.ts";
import type {
  EngagementCompatibilityMetadata,
  EngagementSourceMetadata,
  EngagementVersionMetadata,
} from "../../app/engagement/engagement-metadata-contract.ts";

const VERSIONED_FIELD_PATTERN = /(^|_)v[0-9]|(^|_)V[0-9]/;

test("[engagement] metadata contract exposes stable canonical field names", () => {
  assert.deepEqual(ENGAGEMENT_METADATA_FIELD_NAMES, [
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
  ]);

  for (const field_name of ENGAGEMENT_METADATA_FIELD_NAMES) {
    assert.doesNotMatch(field_name, VERSIONED_FIELD_PATTERN);
  }
});

test("[engagement] metadata values may carry release evidence without versioned field names", () => {
  const source_metadata: EngagementSourceMetadata = {
    contract_version: "engagement-metadata-v0.1",
    schema_version: "engagement-source-metadata-v0.1",
    release_line: "v2.5-semantic-stabilization",
    source_release_ref:
      "solocrew-v2.4-stable-commercialization-readiness-loop-20260428",
    source_commit_ref: "12d7ccb00506670992b798d82aa81fbc0f5578f6",
    baseline_release_ref:
      "solocrew-v2.3-stable-first-paid-pilot-loop-20260428",
    baseline_commit_ref: "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a",
  };

  const compatibility_metadata: EngagementCompatibilityMetadata = {
    contract_version: "engagement-compatibility-v0.1",
    schema_version: "engagement-compatibility-metadata-v0.1",
    release_line: "v2.5-semantic-stabilization",
    compatibility_profile: "preserve-v2-3-v2-4-v1-x-v2-x-imports",
    migration_from: {
      release_ref: "v2.4-stable",
      compatibility_profile: "versioned-export-alias",
    },
    migration_to: {
      release_ref: "v2.5-canonical-aliases",
      compatibility_profile: "canonical-engagement-alias",
    },
  };

  const combined: EngagementVersionMetadata = {
    ...source_metadata,
    ...compatibility_metadata,
  };

  assert.equal(
    combined.source_release_ref,
    "solocrew-v2.4-stable-commercialization-readiness-loop-20260428"
  );
  assert.equal(combined.baseline_commit_ref, "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a");
  assert.equal(combined.compatibility_profile, "preserve-v2-3-v2-4-v1-x-v2-x-imports");
});

test("[engagement] source and compatibility metadata field lists remain deterministic", () => {
  assert.deepEqual(ENGAGEMENT_SOURCE_METADATA_FIELD_NAMES, [
    "contract_version",
    "schema_version",
    "release_line",
    "source_release_ref",
    "source_commit_ref",
    "baseline_release_ref",
    "baseline_commit_ref",
  ]);
  assert.deepEqual(ENGAGEMENT_COMPATIBILITY_METADATA_FIELD_NAMES, [
    "contract_version",
    "schema_version",
    "release_line",
    "compatibility_profile",
    "migration_from",
    "migration_to",
  ]);
});
