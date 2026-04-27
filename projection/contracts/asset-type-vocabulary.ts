export const SOLOCREW_ASSET_TYPE_KINDS = [
  "cell_blueprint",
  "starter_assembly",
  "business_pack_mount",
  "metrics_pack_mount",
  "crew_blueprint",
  "role_projection_template",
  "capability_plugin",
  "workflow_pattern",
  "memory_template",
  "learning_template",
  "review_gate",
  "evidence_template",
  "tool_adapter",
] as const;

export type SoloCrewAssetTypeKind =
  (typeof SOLOCREW_ASSET_TYPE_KINDS)[number];

export interface AssetTypeReference {
  asset_type_kind: SoloCrewAssetTypeKind;
  label: string;
  planning_use: string;
  implementation_status: "vocabulary_only";
  marketplace_implemented: false;
  asset_installation_available: false;
  tool_execution_available: false;
}

export const SOLOCREW_ASSET_TYPE_REFERENCES: readonly AssetTypeReference[] = [
  {
    asset_type_kind: "cell_blueprint",
    label: "Cell Blueprint",
    planning_use:
      "Describe the operating-unit shape a Cell may use before work begins.",
    implementation_status: "vocabulary_only",
    marketplace_implemented: false,
    asset_installation_available: false,
    tool_execution_available: false,
  },
  {
    asset_type_kind: "starter_assembly",
    label: "Starter Assembly",
    planning_use:
      "Describe bundled starter initialization choices without defining Cell kind law.",
    implementation_status: "vocabulary_only",
    marketplace_implemented: false,
    asset_installation_available: false,
    tool_execution_available: false,
  },
  {
    asset_type_kind: "business_pack_mount",
    label: "Business Pack Mount",
    planning_use:
      "Describe domain defaults a Cell may review as business context.",
    implementation_status: "vocabulary_only",
    marketplace_implemented: false,
    asset_installation_available: false,
    tool_execution_available: false,
  },
  {
    asset_type_kind: "metrics_pack_mount",
    label: "Metrics Pack Mount",
    planning_use:
      "Describe metric posture a Cell may review before local work planning.",
    implementation_status: "vocabulary_only",
    marketplace_implemented: false,
    asset_installation_available: false,
    tool_execution_available: false,
  },
  {
    asset_type_kind: "crew_blueprint",
    label: "Crew Blueprint",
    planning_use:
      "Describe possible role topology for Cell-local planning.",
    implementation_status: "vocabulary_only",
    marketplace_implemented: false,
    asset_installation_available: false,
    tool_execution_available: false,
  },
  {
    asset_type_kind: "role_projection_template",
    label: "Role Projection Template",
    planning_use:
      "Describe role-facing projection posture without creating workers.",
    implementation_status: "vocabulary_only",
    marketplace_implemented: false,
    asset_installation_available: false,
    tool_execution_available: false,
  },
  {
    asset_type_kind: "capability_plugin",
    label: "Capability Plugin",
    planning_use:
      "Describe future capability category vocabulary without plugin lifecycle.",
    implementation_status: "vocabulary_only",
    marketplace_implemented: false,
    asset_installation_available: false,
    tool_execution_available: false,
  },
  {
    asset_type_kind: "workflow_pattern",
    label: "Workflow Pattern",
    planning_use:
      "Describe reviewable workflow shape before any task execution.",
    implementation_status: "vocabulary_only",
    marketplace_implemented: false,
    asset_installation_available: false,
    tool_execution_available: false,
  },
  {
    asset_type_kind: "memory_template",
    label: "Memory Template",
    planning_use:
      "Describe possible memory posture without writing runtime memory.",
    implementation_status: "vocabulary_only",
    marketplace_implemented: false,
    asset_installation_available: false,
    tool_execution_available: false,
  },
  {
    asset_type_kind: "learning_template",
    label: "Learning Template",
    planning_use:
      "Describe possible learning posture without training or global learning.",
    implementation_status: "vocabulary_only",
    marketplace_implemented: false,
    asset_installation_available: false,
    tool_execution_available: false,
  },
  {
    asset_type_kind: "review_gate",
    label: "Review Gate",
    planning_use:
      "Describe human review checkpoints below approval/execution authority.",
    implementation_status: "vocabulary_only",
    marketplace_implemented: false,
    asset_installation_available: false,
    tool_execution_available: false,
  },
  {
    asset_type_kind: "evidence_template",
    label: "Evidence Template",
    planning_use:
      "Describe evidence posture a Cell may request before acting.",
    implementation_status: "vocabulary_only",
    marketplace_implemented: false,
    asset_installation_available: false,
    tool_execution_available: false,
  },
  {
    asset_type_kind: "tool_adapter",
    label: "Tool Adapter",
    planning_use:
      "Describe future adapter category vocabulary without tool execution.",
    implementation_status: "vocabulary_only",
    marketplace_implemented: false,
    asset_installation_available: false,
    tool_execution_available: false,
  },
] as const;
