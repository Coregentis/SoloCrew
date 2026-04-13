import type { CorrectionCaptureRecord } from "../../../Cognitive_OS/runtime/learning/correction-capture.ts";
import {
  createMemorySummary,
  type MemorySummary,
  type MemorySummaryScope,
} from "../objects/memory-summary.ts";
import type {
  MemoryProfileRecord,
  PreferenceProfileRecord,
} from "./upstream-record-types.ts";

function map_scope(
  scope_kind: MemoryProfileRecord["scope_kind"]
): MemorySummaryScope {
  if (scope_kind === "objective") {
    return "objective";
  }

  if (scope_kind === "agent_worker") {
    return "crew-member";
  }

  return "crew";
}

function derive_keyword_tags(input: {
  memory_profile: MemoryProfileRecord;
  preference_profile?: PreferenceProfileRecord;
}): string[] {
  const tags = [
    ...(Array.isArray(input.preference_profile?.preference_signals)
      ? input.preference_profile.preference_signals
      : []),
    ...(Array.isArray(input.memory_profile.retained_notes)
      ? input.memory_profile.retained_notes
      : []),
  ];

  return [...new Set(tags)];
}

export interface MemorySummaryAdapterInput {
  memory_profile: MemoryProfileRecord;
  preference_profile?: PreferenceProfileRecord;
  corrections?: CorrectionCaptureRecord[];
}

export function adaptMemorySummary(
  input: MemorySummaryAdapterInput
): MemorySummary {
  const latest_correction = [...(input.corrections ?? [])]
    .sort((left, right) => right.captured_at.localeCompare(left.captured_at))
    .at(0);

  return createMemorySummary({
    projection_id: `memory-summary:${input.memory_profile.object_id}`,
    memory_summary_id: input.memory_profile.object_id,
    scope: map_scope(input.memory_profile.scope_kind),
    source_ref_id: input.memory_profile.scope_ref_id,
    summary: input.memory_profile.memory_summary,
    upstream_refs: [
      {
        source_repo: "Cognitive_OS",
        upstream_object_type: input.memory_profile.object_type,
        upstream_object_id: input.memory_profile.object_id,
      },
      ...(input.preference_profile
        ? [
            {
              source_repo: "Cognitive_OS" as const,
              upstream_object_type: input.preference_profile.object_type,
              upstream_object_id: input.preference_profile.object_id,
            },
          ]
        : []),
      ...(latest_correction
        ? [
            {
              source_repo: "Cognitive_OS" as const,
              upstream_object_type: "correction-capture",
              upstream_object_id: latest_correction.correction_id,
            },
          ]
        : []),
    ],
    keyword_tags: derive_keyword_tags(input),
    recent_correction_summary: latest_correction?.correction_summary,
    preference_summary: input.preference_profile?.preference_summary,
    revised_at: input.preference_profile?.last_revised_at ?? input.memory_profile.last_revised_at,
  });
}
