import type {
  EngagementBaselineRefs,
  EngagementEvidenceRefs,
  EngagementOperationalRefs,
  EngagementReadinessRefs,
  EngagementSourceRefs,
} from "./engagement-canonical-contract.ts";
import type {
  EngagementSourceMetadata,
} from "./engagement-metadata-contract.ts";

type RefRecord = Record<string, unknown>;

export type EngagementLegacySourceRefInput =
  & Partial<EngagementBaselineRefs>
  & Partial<EngagementSourceRefs>
  & Partial<EngagementEvidenceRefs>
  & Partial<EngagementReadinessRefs>
  & Partial<EngagementOperationalRefs>
  & RefRecord;

export type NormalizedEngagementBaselineRefs = Partial<EngagementBaselineRefs>;
export type NormalizedEngagementSourceRefs = Partial<EngagementSourceRefs>;
export type NormalizedEngagementEvidenceRefs = Partial<EngagementEvidenceRefs>;
export type NormalizedEngagementReadinessRefs =
  Partial<EngagementReadinessRefs>;
export type NormalizedEngagementOperationalRefs =
  Partial<EngagementOperationalRefs>;

export const ENGAGEMENT_NORMALIZED_SOURCE_REF_FIELD_NAMES = [
  "baseline_release_ref",
  "baseline_commit_ref",
  "source_release_ref",
  "source_commit_ref",
  "onboarding_packet_ref",
  "readiness_view_ref",
  "evidence_record_ref",
  "review_gate_ref",
  "participant_ref",
  "engagement_ref",
  "workspace_ref",
  "review_packet_export_ref",
  "related_intake_status",
  "no_completion_claim",
  "readiness_status",
  "delivery_status",
  "release_line",
  "phase_ref",
] as const;

const DEFAULT_RELEASE_METADATA = {
  contract_version: "engagement-source-ref-normalizer",
  schema_version: "1",
  release_line: "product-semantic-stabilization",
} as const;

function read_string(
  input: RefRecord,
  ...field_names: string[]
): string | undefined {
  for (const field_name of field_names) {
    const value = input[field_name];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return undefined;
}

function read_boolean(
  input: RefRecord,
  ...field_names: string[]
): boolean | undefined {
  for (const field_name of field_names) {
    const value = input[field_name];
    if (typeof value === "boolean") {
      return value;
    }
  }

  return undefined;
}

function read_string_or_boolean(
  input: RefRecord,
  ...field_names: string[]
): string | boolean | undefined {
  for (const field_name of field_names) {
    const value = input[field_name];
    if (
      (typeof value === "string" && value.length > 0) ||
      typeof value === "boolean"
    ) {
      return value;
    }
  }

  return undefined;
}

function assign_string(
  output: RefRecord,
  field_name: string,
  value: string | undefined
): void {
  if (value !== undefined) {
    output[field_name] = value;
  }
}

function assign_boolean(
  output: RefRecord,
  field_name: string,
  value: boolean | undefined
): void {
  if (value !== undefined) {
    output[field_name] = value;
  }
}

function assign_string_or_boolean(
  output: RefRecord,
  field_name: string,
  value: string | boolean | undefined
): void {
  if (value !== undefined) {
    output[field_name] = value;
  }
}

export function normalize_engagement_baseline_refs(
  input: EngagementLegacySourceRefInput
): NormalizedEngagementBaselineRefs {
  const output: NormalizedEngagementBaselineRefs = {};

  assign_string(
    output,
    "baseline_release_ref",
    read_string(
      input,
      "baseline_release_ref",
      "v2_4_stable_tag",
      "v2_3_stable_tag",
      "v2_2_stable_tag",
      "tag"
    )
  );
  assign_string(
    output,
    "baseline_commit_ref",
    read_string(
      input,
      "baseline_commit_ref",
      "v2_4_stable_commit",
      "v2_3_stable_commit",
      "v2_2_stable_commit",
      "target_commit"
    )
  );

  return output;
}

export function normalize_engagement_source_refs(
  input: EngagementLegacySourceRefInput
): NormalizedEngagementSourceRefs {
  const output: NormalizedEngagementSourceRefs = {};

  assign_string(
    output,
    "source_release_ref",
    read_string(input, "source_release_ref", "source_tag")
  );
  assign_string(
    output,
    "source_commit_ref",
    read_string(input, "source_commit_ref", "source_target_commit")
  );
  assign_string(
    output,
    "participant_ref",
    read_string(input, "participant_ref", "design_partner_id")
  );
  assign_string(
    output,
    "engagement_ref",
    read_string(input, "engagement_ref", "intake_id")
  );

  return output;
}

export function normalize_engagement_evidence_refs(
  input: EngagementLegacySourceRefInput
): NormalizedEngagementEvidenceRefs {
  const output: NormalizedEngagementEvidenceRefs = {
    ...normalize_engagement_baseline_refs(input),
    ...normalize_engagement_source_refs(input),
  };

  assign_string(
    output,
    "onboarding_packet_ref",
    read_string(
      input,
      "onboarding_packet_ref",
      "v2_4_onboarding_packet_ref",
      "onboarding_packet_id"
    )
  );
  assign_string(
    output,
    "readiness_view_ref",
    read_string(input, "readiness_view_ref", "v2_4_dashboard_ref", "dashboard_id")
  );
  assign_string(
    output,
    "evidence_record_ref",
    read_string(
      input,
      "evidence_record_ref",
      "v2_4_feedback_evidence_ref",
      "feedback_evidence_id"
    )
  );
  assign_string(
    output,
    "review_gate_ref",
    read_string(input, "review_gate_ref", "gate_id")
  );

  return output;
}

export function normalize_engagement_readiness_refs(
  input: EngagementLegacySourceRefInput
): NormalizedEngagementReadinessRefs {
  return normalize_engagement_evidence_refs(input);
}

export function normalize_engagement_operational_refs(
  input: EngagementLegacySourceRefInput
): NormalizedEngagementOperationalRefs {
  const output: NormalizedEngagementOperationalRefs = {};

  assign_string(
    output,
    "workspace_ref",
    read_string(input, "workspace_ref", "related_v2_2_workspace_id", "workspace_id")
  );
  assign_string(
    output,
    "review_packet_export_ref",
    read_string(
      input,
      "review_packet_export_ref",
      "related_v2_2_review_packet_export_id",
      "review_packet_export_id"
    )
  );
  assign_string(
    output,
    "related_intake_status",
    read_string(input, "related_intake_status", "related_v2_3_intake_status")
  );
  assign_boolean(
    output,
    "no_completion_claim",
    read_boolean(input, "no_completion_claim", "no_v2_2_completion_claim")
  );
  assign_string_or_boolean(
    output,
    "readiness_status",
    read_string_or_boolean(input, "readiness_status", "v2_0_ready")
  );
  assign_string_or_boolean(
    output,
    "delivery_status",
    read_string_or_boolean(input, "delivery_status", "v2_0_delivered")
  );
  assign_string(output, "release_line", read_string(input, "release_line", "product_line"));
  assign_string(output, "phase_ref", read_string(input, "phase_ref", "phase_boundary"));

  return output;
}

export function normalize_engagement_release_metadata(
  input: EngagementLegacySourceRefInput,
  defaults: Partial<EngagementSourceMetadata> = {}
): EngagementSourceMetadata {
  const baseline_refs = normalize_engagement_baseline_refs(input);

  return {
    contract_version:
      read_string(input, "contract_version") ??
      defaults.contract_version ??
      DEFAULT_RELEASE_METADATA.contract_version,
    schema_version:
      read_string(input, "schema_version") ??
      defaults.schema_version ??
      DEFAULT_RELEASE_METADATA.schema_version,
    release_line:
      read_string(input, "release_line", "product_line") ??
      defaults.release_line ??
      DEFAULT_RELEASE_METADATA.release_line,
    source_release_ref:
      read_string(input, "source_release_ref", "source_tag") ??
      defaults.source_release_ref,
    source_commit_ref:
      read_string(input, "source_commit_ref", "source_target_commit") ??
      defaults.source_commit_ref,
    baseline_release_ref:
      baseline_refs.baseline_release_ref ?? defaults.baseline_release_ref,
    baseline_commit_ref:
      baseline_refs.baseline_commit_ref ?? defaults.baseline_commit_ref,
  };
}
