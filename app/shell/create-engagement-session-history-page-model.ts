import type {
  EngagementSessionHistoryResult,
} from "../engagement/engagement-session-history-contract.ts";

export type EngagementSessionHistoryPageModel = {
  page_id: string;
  page_kind: "engagement_session_history";
  generated_at: string;
  title: string;
  summary: string;
  ledger_ref: string;
  export_ref: string;
  ledger_status: EngagementSessionHistoryResult["ledger"]["status"];
  export_status: EngagementSessionHistoryResult["export_package"]["status"];
  history_entry_refs: string[];
  export_kind: EngagementSessionHistoryResult["export_package"]["export_kind"];
  boundary_notices: string[];
  non_executing: true;
};

export function createEngagementSessionHistoryPageModel(input: {
  result: EngagementSessionHistoryResult;
  generated_at: string;
  page_id?: string;
}): EngagementSessionHistoryPageModel {
  return {
    page_id: input.page_id ?? `${input.result.ledger.ledger_id}:page`,
    page_kind: "engagement_session_history",
    generated_at: input.generated_at,
    title: "Engagement session history",
    summary:
      "Review deterministic local session history and its in-memory export package object.",
    ledger_ref: input.result.ledger.ledger_id,
    export_ref: input.result.export_package.export_id,
    ledger_status: input.result.ledger.status,
    export_status: input.result.export_package.status,
    history_entry_refs: [...input.result.ledger.entry_refs],
    export_kind: input.result.export_package.export_kind,
    boundary_notices: [
      "Local in-memory history and export package object only; no route registration or route URL change.",
      "No filesystem write, database storage, persistence adapter, or cloud sync.",
      "Manual-first and review-only; no publishing, email, CRM, execution, dispatch, or autonomy.",
    ],
    non_executing: true,
  };
}
