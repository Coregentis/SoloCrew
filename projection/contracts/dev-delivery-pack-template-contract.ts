import type { CrewMemberRole } from "../objects/crew-member.ts";

export type DevDeliveryPackTemplateAuthorityBoundary =
  "product_projection_only";
export type DevDeliveryPackTemplateExecutionBoundary =
  "template_seed_only";

export interface DevDeliveryPackTemplateSeed {
  template_id: "dev-delivery-pack-template";
  template_label: "Dev Delivery Pack";
  template_scope: "single_cell_only";
  authority_boundary: DevDeliveryPackTemplateAuthorityBoundary;
  execution_boundary: DevDeliveryPackTemplateExecutionBoundary;
  default_objective_framing: string;
  default_workstream_hints: string[];
  default_work_item_seed_hints: string[];
  default_crew_role_hints: CrewMemberRole[];
  recommended_business_pack_mount_key: string;
  recommended_metrics_pack_mount_key: string;
  deferred_surfaces: string[];
  non_claims: string[];
  projection_notes: string[];
}
