import {
  SOLOCREW_CONTRACT_VERSION,
  type ProjectionEnvelope,
  type ProjectionUpstreamRef,
} from "../contracts/projection-object-types.ts";

export interface ReviewStrip
  extends ProjectionEnvelope<"review-strip"> {
  review_strip_id: string;
  crew_id: string;
  moved_items: string[];
  blocked_items: string[];
  needs_decision: string[];
  changed_preferences: string[];
}

export interface CreateReviewStripInput {
  projection_id: string;
  review_strip_id: string;
  crew_id: string;
  upstream_refs: ProjectionUpstreamRef[];
  moved_items?: string[];
  blocked_items?: string[];
  needs_decision?: string[];
  changed_preferences?: string[];
  projection_notes?: string[];
}

export function createReviewStrip(
  input: CreateReviewStripInput
): ReviewStrip {
  return {
    projection_id: input.projection_id,
    object_type: "review-strip",
    contract_version: SOLOCREW_CONTRACT_VERSION,
    availability: "implemented",
    upstream_refs: [...input.upstream_refs],
    projection_notes: input.projection_notes
      ? [...input.projection_notes]
      : undefined,
    review_strip_id: input.review_strip_id,
    crew_id: input.crew_id,
    moved_items: [...(input.moved_items ?? [])],
    blocked_items: [...(input.blocked_items ?? [])],
    needs_decision: [...(input.needs_decision ?? [])],
    changed_preferences: [...(input.changed_preferences ?? [])],
  };
}
