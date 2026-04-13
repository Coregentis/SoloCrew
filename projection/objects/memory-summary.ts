import {
  SOLOCREW_CONTRACT_VERSION,
  type ProjectionEnvelope,
  type ProjectionUpstreamRef,
} from "../contracts/projection-object-types.ts";

export type MemorySummaryScope = "crew" | "crew-member" | "objective";

export interface MemorySummary
  extends ProjectionEnvelope<"memory-summary"> {
  memory_summary_id: string;
  scope: MemorySummaryScope;
  source_ref_id: string;
  summary: string;
  keyword_tags: string[];
  recent_correction_summary?: string;
  preference_summary?: string;
  revised_at?: string;
}

export interface CreateMemorySummaryInput {
  projection_id: string;
  memory_summary_id: string;
  scope: MemorySummaryScope;
  source_ref_id: string;
  summary: string;
  upstream_refs: ProjectionUpstreamRef[];
  keyword_tags?: string[];
  recent_correction_summary?: string;
  preference_summary?: string;
  revised_at?: string;
  projection_notes?: string[];
}

export function createMemorySummary(
  input: CreateMemorySummaryInput
): MemorySummary {
  return {
    projection_id: input.projection_id,
    object_type: "memory-summary",
    contract_version: SOLOCREW_CONTRACT_VERSION,
    availability: "implemented",
    upstream_refs: [...input.upstream_refs],
    projection_notes: input.projection_notes
      ? [...input.projection_notes]
      : undefined,
    memory_summary_id: input.memory_summary_id,
    scope: input.scope,
    source_ref_id: input.source_ref_id,
    summary: input.summary,
    keyword_tags: [...(input.keyword_tags ?? [])],
    recent_correction_summary: input.recent_correction_summary,
    preference_summary: input.preference_summary,
    revised_at: input.revised_at,
  };
}
