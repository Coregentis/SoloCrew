export type SecretaryHandoffPacketState =
  | "draft"
  | "staged"
  | "ready_for_cell_review"
  | "returned_for_revision";

export interface SecretaryHandoffStageIndicator {
  stage: SecretaryHandoffPacketState;
  label: string;
  active: boolean;
  note: string;
}

export interface SecretaryHandoffPacketStateCounts {
  draft: number;
  staged: number;
  ready_for_cell_review: number;
  returned_for_revision: number;
}
