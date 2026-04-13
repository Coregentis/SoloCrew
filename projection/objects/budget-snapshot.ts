import {
  SOLOCREW_CONTRACT_VERSION,
  type ProjectionEnvelope,
  type ProjectionUpstreamRef,
} from "../contracts/projection-object-types.ts";

export interface BudgetSnapshot
  extends ProjectionEnvelope<"budget-snapshot"> {
  budget_snapshot_id: string;
  crew_id: string;
  deferred_reason: string;
}

export interface CreateDeferredBudgetSnapshotInput {
  projection_id: string;
  budget_snapshot_id: string;
  crew_id: string;
  deferred_reason: string;
  upstream_refs?: ProjectionUpstreamRef[];
  projection_notes?: string[];
}

export function createDeferredBudgetSnapshot(
  input: CreateDeferredBudgetSnapshotInput
): BudgetSnapshot {
  return {
    projection_id: input.projection_id,
    object_type: "budget-snapshot",
    contract_version: SOLOCREW_CONTRACT_VERSION,
    availability: "deferred",
    upstream_refs: [...(input.upstream_refs ?? [])],
    projection_notes: input.projection_notes
      ? [...input.projection_notes]
      : undefined,
    budget_snapshot_id: input.budget_snapshot_id,
    crew_id: input.crew_id,
    deferred_reason: input.deferred_reason,
  };
}
