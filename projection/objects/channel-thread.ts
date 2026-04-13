import {
  SOLOCREW_CONTRACT_VERSION,
  type ProjectionEnvelope,
  type ProjectionUpstreamRef,
} from "../contracts/projection-object-types.ts";

export interface ChannelThread
  extends ProjectionEnvelope<"channel-thread"> {
  channel_thread_id: string;
  crew_id: string;
  deferred_reason: string;
}

export interface CreateReservedChannelThreadInput {
  projection_id: string;
  channel_thread_id: string;
  crew_id: string;
  deferred_reason: string;
  upstream_refs?: ProjectionUpstreamRef[];
  projection_notes?: string[];
}

export function createReservedChannelThread(
  input: CreateReservedChannelThreadInput
): ChannelThread {
  return {
    projection_id: input.projection_id,
    object_type: "channel-thread",
    contract_version: SOLOCREW_CONTRACT_VERSION,
    availability: "reserved",
    upstream_refs: [...(input.upstream_refs ?? [])],
    projection_notes: input.projection_notes
      ? [...input.projection_notes]
      : undefined,
    channel_thread_id: input.channel_thread_id,
    crew_id: input.crew_id,
    deferred_reason: input.deferred_reason,
  };
}
