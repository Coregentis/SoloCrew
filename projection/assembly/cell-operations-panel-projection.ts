import type {
  OperationalUnitRuntimeProjection,
  RuntimeStateProjection,
} from "../../runtime-imports/cognitive-runtime.ts";
import type {
  CellOperationsPanelProjection,
} from "../contracts/cell-operations-panel-projection-contract.ts";
import {
  adaptOperationalUnitRuntimeProjectionToCellOperationsPanel,
} from "../adapters/cell-operations-runtime-adapter.ts";

export function assembleCellOperationsPanelProjection(
  source_runtime_projection_ref: string,
  operational_unit_projection: OperationalUnitRuntimeProjection
): CellOperationsPanelProjection {
  return adaptOperationalUnitRuntimeProjectionToCellOperationsPanel({
    source_runtime_projection_ref,
    operational_unit_projection,
  });
}

export function assembleCellOperationsPanelProjections(
  runtime_state_projection: RuntimeStateProjection
): CellOperationsPanelProjection[] {
  return runtime_state_projection.operational_unit_projections.map(
    (operational_unit_projection) =>
      assembleCellOperationsPanelProjection(
        runtime_state_projection.state_projection_id,
        operational_unit_projection
      )
  );
}
