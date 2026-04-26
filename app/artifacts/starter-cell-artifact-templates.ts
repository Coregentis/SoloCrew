import type {
  OperationalUnitRuntimeProjection,
  RuntimePrioritySummary,
} from "../../runtime-imports/cognitive-runtime.ts";
import {
  STARTER_CELL_DEFINITIONS,
  STARTER_CELL_IDS,
  createStarterCellsRuntimeStateProjection,
} from "../../projection/fixtures/starter-cell-fixtures.ts";
import type {
  CreateArtifactDraftInput,
  ProductArtifactCellId,
  ProductArtifactClass,
  ProductArtifactKind,
} from "./artifact-contract.ts";

const DEFAULT_ARTIFACT_KIND_BY_CELL: Record<
  ProductArtifactCellId,
  ProductArtifactKind
> = {
  development_company: "implementation_plan",
  ecommerce: "listing_copy",
  personal_media: "article_draft",
};

const ARTIFACT_CLASS_BY_KIND: Record<ProductArtifactKind, ProductArtifactClass> = {
  implementation_plan: "local_generated",
  review_packet: "external_draft",
  listing_copy: "external_draft",
  campaign_plan: "local_generated",
  article_draft: "external_draft",
  content_calendar_suggestion: "local_generated",
};

function find_cell_definition(cell_id: ProductArtifactCellId) {
  return STARTER_CELL_DEFINITIONS.find((definition) => definition.cell_id === cell_id);
}

function find_operational_unit_projection(
  cell_id: ProductArtifactCellId
): OperationalUnitRuntimeProjection {
  const runtime_state_projection = createStarterCellsRuntimeStateProjection();
  const operational_unit_projection =
    runtime_state_projection.operational_unit_projections.find(
      (unit) => unit.scope_summary.scope_id === cell_id
    );

  if (!operational_unit_projection) {
    throw new Error(`Missing starter-cell fixture for ${cell_id}.`);
  }

  return operational_unit_projection;
}

function format_priority(priority: RuntimePrioritySummary | undefined): string {
  if (!priority) {
    return "No active priority summary is currently visible.";
  }

  return `${priority.title}: ${priority.rationale}`;
}

function create_development_content(args: {
  title: string;
  content_seed?: string;
  unit: OperationalUnitRuntimeProjection;
}): string {
  const first_task = args.unit.task_summaries[0];
  const second_task = args.unit.task_summaries[1];
  const priority_summary = format_priority(args.unit.priority_summaries[0]);

  return [
    `Title: ${args.title}`,
    "",
    "Objective",
    args.unit.scope_summary.summary ?? "Keep product and delivery work aligned.",
    "",
    "Priority",
    priority_summary,
    "",
    "Current tasks",
    `- ${first_task?.title ?? "Clarify the bounded feature scope"}`,
    `- ${second_task?.title ?? "Refresh the current task breakdown"}`,
    "",
    "Implementation outline",
    `1. Reconfirm the bounded scope for ${args.unit.scope_summary.title}.`,
    "2. Refresh the local implementation plan with the current task split.",
    "3. Prepare the next review packet for operator inspection.",
    "",
    "Notes",
    args.content_seed ?? "Keep the delivery language concise, review-bounded, and local-only.",
  ].join("\n");
}

function create_ecommerce_content(args: {
  title: string;
  content_seed?: string;
  unit: OperationalUnitRuntimeProjection;
}): string {
  const priority_summary = format_priority(args.unit.priority_summaries[0]);

  return [
    `Title: ${args.title}`,
    "",
    "Core message",
    "A compact workspace upgrade for high-context operators who want cleaner multi-project continuity.",
    "",
    "Selling points",
    "- Keeps current work visible in one bounded operating lane.",
    "- Reduces context loss across repeated product sessions.",
    "- Supports review-first artifact preparation without dispatch.",
    "",
    "Campaign angle",
    priority_summary,
    "",
    "Customer response draft",
    "Thanks for the question. This draft keeps the offer concise, evidence-linked, and ready for operator review before any later use.",
    "",
    "Notes",
    args.content_seed ?? "Preserve the current brand tone and keep the language benefit-first.",
  ].join("\n");
}

function create_personal_media_content(args: {
  title: string;
  content_seed?: string;
  unit: OperationalUnitRuntimeProjection;
}): string {
  const priority_summary = format_priority(args.unit.priority_summaries[0]);

  return [
    `Title: ${args.title}`,
    "",
    "Summary",
    "A reflective long-form draft about staying aligned across multiple AI work streams without losing goals or preferences.",
    "",
    "Suggested structure",
    "1. Why long-running AI work drifts.",
    "2. How bounded multi-Cell structure helps.",
    "3. What the operator still keeps under review.",
    "",
    "Calendar angle",
    priority_summary,
    "",
    "Tag suggestions",
    "- ai-operations",
    "- founder-workflow",
    "- multi-cell-systems",
    "",
    "Notes",
    args.content_seed ?? "Keep the tone reflective, concise, and grounded in repeatable practice.",
  ].join("\n");
}

export function resolveArtifactKindForCell(
  cell_id: ProductArtifactCellId,
  artifact_kind?: ProductArtifactKind
): ProductArtifactKind {
  return artifact_kind ?? DEFAULT_ARTIFACT_KIND_BY_CELL[cell_id];
}

export function resolveArtifactClassForKind(
  artifact_kind: ProductArtifactKind
): ProductArtifactClass {
  return ARTIFACT_CLASS_BY_KIND[artifact_kind];
}

export function createStarterCellArtifactTemplate(
  input: CreateArtifactDraftInput
): {
  cell_id: ProductArtifactCellId;
  cell_label: string;
  artifact_kind: ProductArtifactKind;
  artifact_class: ProductArtifactClass;
  title: string;
  content: string;
  related_task_refs: string[];
  source_evidence_refs: string[];
} {
  if (!STARTER_CELL_IDS.includes(input.cell_id)) {
    throw new Error(`Unsupported starter cell ${input.cell_id}.`);
  }

  const definition = find_cell_definition(input.cell_id);
  const unit = find_operational_unit_projection(input.cell_id);
  const artifact_kind = resolveArtifactKindForCell(
    input.cell_id,
    input.artifact_kind
  );
  const artifact_class = resolveArtifactClassForKind(artifact_kind);
  const title =
    input.title ??
    `${definition?.cell_label ?? input.cell_id} ${artifact_kind.replaceAll("_", " ")}`;
  const related_task_refs =
    input.related_task_refs && input.related_task_refs.length > 0
      ? [...input.related_task_refs]
      : unit.task_summaries.map((task) => task.task_id);
  const source_evidence_refs =
    input.source_evidence_refs && input.source_evidence_refs.length > 0
      ? [...input.source_evidence_refs]
      : [
          ...unit.evidence_refs,
          ...(unit.scope_summary.evidence_refs ?? []),
          ...unit.priority_summaries.flatMap(
            (priority) => priority.evidence_refs ?? []
          ),
        ];

  const content =
    input.cell_id === "development_company"
      ? create_development_content({
          title,
          content_seed: input.content_seed,
          unit,
        })
      : input.cell_id === "ecommerce"
        ? create_ecommerce_content({
            title,
            content_seed: input.content_seed,
            unit,
          })
        : create_personal_media_content({
            title,
            content_seed: input.content_seed,
            unit,
          });

  return {
    cell_id: input.cell_id,
    cell_label: definition?.cell_label ?? unit.scope_summary.title,
    artifact_kind,
    artifact_class,
    title,
    content,
    related_task_refs,
    source_evidence_refs,
  };
}
