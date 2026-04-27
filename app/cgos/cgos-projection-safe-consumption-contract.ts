export const CGOS_CONSUMPTION_SOURCE_OF_TRUTH =
  "Cognitive_OS projection-safe posture handoff" as const;

export const REQUIRED_V2_2_MODULE_POSTURE_NAMES = [
  "Context",
  "Core",
  "Trace",
  "Plan",
  "Confirm",
] as const;

export const REQUIRED_V2_2_KERNEL_DUTY_IDS = [
  "KD-02",
  "KD-05",
  "KD-08",
  "KD-09",
  "KD-10",
  "KD-11",
] as const;

export type CgosRequiredModulePostureName =
  typeof REQUIRED_V2_2_MODULE_POSTURE_NAMES[number];

export type CgosRequiredKernelDutyId =
  typeof REQUIRED_V2_2_KERNEL_DUTY_IDS[number];

export type CgosProjectionSafeRuntimeEnvelopeRef = {
  ref_id: string;
  source_repo: "Cognitive_OS";
  envelope_version: string;
  projection_safe: true;
};

export type CgosModulePostureSummary = {
  module_name: CgosRequiredModulePostureName;
  posture_ref: string;
  bounded_summary: string;
};

export type CgosKernelDutyPostureSummary = {
  duty_id: CgosRequiredKernelDutyId;
  posture_ref: string;
  bounded_summary: string;
};

export type CgosPostureRef = {
  ref_id: string;
  source_repo: "Cognitive_OS";
  posture_kind:
    | "state_snapshot"
    | "transaction_export"
    | "error_insufficiency";
};

export type CgosObjectExportBindingPostureRef = {
  ref_id: string;
  source_repo: "Cognitive_OS";
  bounded_summary: string;
};

export type CgosSafeEvidenceRef = {
  evidence_ref: string;
  evidence_kind: string;
  summary: string;
};

export type CgosOmissionMarker = {
  marker: string;
  reason: string;
};

export type CgosVersionRef = {
  ref_kind: "protocol" | "binding" | "runtime";
  ref_id: string;
  ref_version: string;
};

export type CgosProjectionSafeConsumption = {
  source_of_truth: typeof CGOS_CONSUMPTION_SOURCE_OF_TRUTH;
  projection_safe_runtime_envelope_ref: CgosProjectionSafeRuntimeEnvelopeRef;
  module_posture_summary: CgosModulePostureSummary[];
  kernel_duty_posture_summary: CgosKernelDutyPostureSummary[];
  object_export_binding_posture_refs: CgosObjectExportBindingPostureRef[];
  safe_evidence_refs: CgosSafeEvidenceRef[];
  omission_markers: CgosOmissionMarker[];
  protocol_version_refs: CgosVersionRef[];
  binding_version_refs: CgosVersionRef[];
  state_snapshot_posture_ref: CgosPostureRef;
  transaction_export_posture_ref: CgosPostureRef;
  error_insufficiency_posture_ref: CgosPostureRef;
  required_module_posture_names: CgosRequiredModulePostureName[];
  required_kernel_duty_ids: CgosRequiredKernelDutyId[];
  non_executing: true;
  runtime_private_fields_omitted: true;
};

export function create_default_cgos_projection_safe_consumption(
  workspace_id: string
): CgosProjectionSafeConsumption {
  const required_module_posture_names = [
    ...REQUIRED_V2_2_MODULE_POSTURE_NAMES,
  ];
  const required_kernel_duty_ids = [...REQUIRED_V2_2_KERNEL_DUTY_IDS];

  return {
    source_of_truth: CGOS_CONSUMPTION_SOURCE_OF_TRUTH,
    projection_safe_runtime_envelope_ref: {
      ref_id: `cgos_projection_safe_runtime_envelope:${workspace_id}`,
      source_repo: "Cognitive_OS",
      envelope_version: "0.1",
      projection_safe: true,
    },
    module_posture_summary: required_module_posture_names.map(
      (module_name) => ({
        module_name,
        posture_ref: `cgos_module_posture:${module_name}`,
        bounded_summary:
          "Consumed as a bounded Cognitive_OS posture summary; SoloCrew does not define module semantics.",
      })
    ),
    kernel_duty_posture_summary: required_kernel_duty_ids.map((duty_id) => ({
      duty_id,
      posture_ref: `cgos_kernel_duty_posture:${duty_id}`,
      bounded_summary:
        "Consumed as a bounded Cognitive_OS posture summary; SoloCrew does not define duty semantics.",
    })),
    object_export_binding_posture_refs: [
      {
        ref_id: `cgos_object_export_binding:${workspace_id}`,
        source_repo: "Cognitive_OS",
        bounded_summary:
          "Object/export binding posture is referenced, not interpreted by SoloCrew.",
      },
    ],
    safe_evidence_refs: [
      {
        evidence_ref: `cgos_safe_evidence:${workspace_id}:initial_request`,
        evidence_kind: "workspace_initial_request_summary",
        summary: "Safe evidence reference for the workspace seed request.",
      },
    ],
    omission_markers: [
      {
        marker: "runtime_private_fields_omitted",
        reason:
          "SoloCrew stores Cognitive_OS posture references and summaries only.",
      },
    ],
    protocol_version_refs: [
      {
        ref_kind: "protocol",
        ref_id: "MPLP",
        ref_version: "1.0.0",
      },
    ],
    binding_version_refs: [
      {
        ref_kind: "binding",
        ref_id: "cgos_projection_safe_handoff",
        ref_version: "0.1",
      },
    ],
    state_snapshot_posture_ref: {
      ref_id: `cgos_state_snapshot_posture:${workspace_id}`,
      source_repo: "Cognitive_OS",
      posture_kind: "state_snapshot",
    },
    transaction_export_posture_ref: {
      ref_id: `cgos_transaction_export_posture:${workspace_id}`,
      source_repo: "Cognitive_OS",
      posture_kind: "transaction_export",
    },
    error_insufficiency_posture_ref: {
      ref_id: `cgos_error_insufficiency_posture:${workspace_id}`,
      source_repo: "Cognitive_OS",
      posture_kind: "error_insufficiency",
    },
    required_module_posture_names,
    required_kernel_duty_ids,
    non_executing: true,
    runtime_private_fields_omitted: true,
  };
}

export function assert_cgos_projection_safe_consumption(
  consumption: CgosProjectionSafeConsumption
): void {
  if (!consumption.non_executing) {
    throw new Error("CGOS consumption must remain non-executing.");
  }

  if (!consumption.runtime_private_fields_omitted) {
    throw new Error("CGOS consumption must omit runtime-private fields.");
  }

  assert_exact_members(
    consumption.required_module_posture_names,
    REQUIRED_V2_2_MODULE_POSTURE_NAMES,
    "required module posture names"
  );
  assert_exact_members(
    consumption.required_kernel_duty_ids,
    REQUIRED_V2_2_KERNEL_DUTY_IDS,
    "required kernel duty ids"
  );

  assert_no_forbidden_cgos_payload_keys(consumption);
}

export function assert_no_forbidden_cgos_payload_keys(value: unknown): void {
  const forbidden_keys = new Set([
    "raw_runtime_private_payload",
    "raw_state_store_payload",
    "raw_transaction_store_payload",
    "raw_error_payload",
    "provider_dispatch",
    "channel_dispatch",
    "marketplace_implemented",
    "autonomous_execution",
  ]);

  function walk(candidate: unknown, path: string): void {
    if (!candidate || typeof candidate !== "object") {
      return;
    }

    if (Array.isArray(candidate)) {
      candidate.forEach((item, index) => walk(item, `${path}[${index}]`));
      return;
    }

    for (const [key, nested] of Object.entries(candidate)) {
      if (forbidden_keys.has(key)) {
        throw new Error(`Forbidden CGOS consumption key at ${path}.${key}`);
      }

      walk(nested, `${path}.${key}`);
    }
  }

  walk(value, "$");
}

function assert_exact_members<T extends string>(
  actual: readonly T[],
  expected: readonly T[],
  label: string
): void {
  const actual_sorted = [...actual].sort();
  const expected_sorted = [...expected].sort();

  if (JSON.stringify(actual_sorted) !== JSON.stringify(expected_sorted)) {
    throw new Error(`Unexpected ${label}: ${actual_sorted.join(", ")}`);
  }
}
