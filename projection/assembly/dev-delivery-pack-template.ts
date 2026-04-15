import type {
  DevDeliveryPackTemplateSeed,
} from "../contracts/dev-delivery-pack-template-contract.ts";
import type {
  InitializeSingleCellInput,
} from "./single-cell-initializer.ts";

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export function assembleDevDeliveryPackTemplateSeed(): DevDeliveryPackTemplateSeed {
  return {
    template_id: "dev-delivery-pack-template",
    template_label: "Dev Delivery Pack",
    template_scope: "single_cell_only",
    authority_boundary: "product_projection_only",
    execution_boundary: "template_seed_only",
    default_objective_framing:
      "Ship one bounded development delivery with explicit operator review and next-step clarity.",
    default_workstream_hints: [
      "intake_and_scope",
      "implementation",
      "review_and_return",
    ],
    default_work_item_seed_hints: [
      "Clarify one bounded development request and acceptance shape.",
      "Implement the smallest coherent delivery slice.",
      "Return one operator-reviewable outcome with explicit follow-up work.",
    ],
    default_crew_role_hints: [
      "builder",
      "ops",
      "content",
    ],
    recommended_business_pack_mount_key: "dev-delivery-template",
    recommended_metrics_pack_mount_key: "dev-delivery-metrics",
    deferred_surfaces: [
      "provider_backed_dev_execution",
      "git_or_github_runtime_integration",
      "channel_based_delivery_updates",
    ],
    non_claims: [
      "no_provider_backed_dev_execution",
      "no_git_or_github_runtime_integration",
      "no_channel_or_chatops_delivery_runtime",
      "no_execution_complete_dev_delivery_pack",
    ],
    projection_notes: [
      "Dev Delivery Pack remains a bounded template seed only.",
      "Template hints guide initialization but do not imply business-pack execution logic.",
    ],
  };
}

export function applyDevDeliveryPackTemplateSeed(
  input: InitializeSingleCellInput,
  template_seed: DevDeliveryPackTemplateSeed
): InitializeSingleCellInput {
  return {
    ...input,
    required_role_keys: unique_items([
      ...template_seed.default_crew_role_hints,
      ...(input.required_role_keys ?? []),
    ]),
    business_pack_mount_keys: unique_items([
      ...(input.business_pack_mount_keys ?? []),
      template_seed.recommended_business_pack_mount_key,
    ]),
    metrics_pack_mount_keys: unique_items([
      ...(input.metrics_pack_mount_keys ?? []),
      template_seed.recommended_metrics_pack_mount_key,
    ]),
    projection_notes: unique_items([
      ...(input.projection_notes ?? []),
      ...template_seed.projection_notes,
      `Business template seed: ${template_seed.template_label}.`,
      `Template objective framing: ${template_seed.default_objective_framing}`,
      `Template workstream hints: ${template_seed.default_workstream_hints.join(", ")}`,
    ]),
  };
}
