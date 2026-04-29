import type {
  DesignPartnerId,
  PilotIntakeId,
  PilotIntakeStatus,
} from "./pilot-intake-contract.ts";

export type ManualPaymentRecordId = string;
export type ManualInvoiceId = string;

export type ManualPaymentStatus =
  | "not_requested"
  | "invoice_draft"
  | "invoice_sent"
  | "payment_pending"
  | "payment_confirmed"
  | "payment_blocked"
  | "refunded"
  | "manual_exception"
  | "cancelled";

export type ManualPaymentMethodHint =
  | "manual_invoice"
  | "manual_bank_transfer_instruction"
  | "manual_payment_link_external_note"
  | "manual_exception_only";

export type ManualPaymentBoundaryFlags = {
  manual_only: true;
  no_payment_processor: true;
  no_checkout: true;
  no_subscription_management: true;
  no_automated_billing: true;
  no_card_storage: true;
  no_bank_execution: true;
  no_crypto_execution: true;
  no_saas_sharing: true;
  no_provider_dispatch: true;
  no_channel_dispatch: true;
  no_marketplace_implementation: true;
  no_autonomous_execution: true;
  no_paid_product_readiness_claim: true;
  no_public_beta_claim: true;
  no_mplp_certification: true;
  no_mplp_endorsement: true;
};

export type V2_3ManualPaymentRecord = {
  payment_record_id: ManualPaymentRecordId;
  intake_id: PilotIntakeId;
  design_partner_id: DesignPartnerId;
  invoice_id: ManualInvoiceId;
  created_at: string;
  updated_at: string;
  status: ManualPaymentStatus;
  method_hint: ManualPaymentMethodHint;
  currency_code: string;
  amount_minor_units: number;
  amount_display: string;
  invoice_label: string;
  manual_payment_instruction_ref: string;
  manual_confirmation_ref?: string;
  manual_exception_reason?: string;
  related_intake_status: PilotIntakeStatus;
  related_v2_3_intake_status: PilotIntakeStatus;
  boundary_flags: ManualPaymentBoundaryFlags;
  boundary_notices: string[];
};

export type ManualPaymentSummary = {
  payment_record_id: ManualPaymentRecordId;
  intake_id: PilotIntakeId;
  design_partner_id: DesignPartnerId;
  invoice_id: ManualInvoiceId;
  status: ManualPaymentStatus;
  amount_display: string;
  method_hint: ManualPaymentMethodHint;
  recommended_manual_step: string;
  boundary_notices: string[];
  manual_only: true;
  non_executing: true;
};

export const V2_3_MANUAL_PAYMENT_BOUNDARY_FLAGS = {
  manual_only: true,
  no_payment_processor: true,
  no_checkout: true,
  no_subscription_management: true,
  no_automated_billing: true,
  no_card_storage: true,
  no_bank_execution: true,
  no_crypto_execution: true,
  no_saas_sharing: true,
  no_provider_dispatch: true,
  no_channel_dispatch: true,
  no_marketplace_implementation: true,
  no_autonomous_execution: true,
  no_paid_product_readiness_claim: true,
  no_public_beta_claim: true,
  no_mplp_certification: true,
  no_mplp_endorsement: true,
} as const satisfies ManualPaymentBoundaryFlags;

export const V2_3_MANUAL_PAYMENT_BOUNDARY_NOTICES = [
  "V2.3 manual payment status is manual-only and non-executing.",
  "V2.3 manual payment status stores status and references only; it does not move money.",
  "V2.3 manual payment status keeps no_payment_processor, no_checkout, no_subscription_management, and no_automated_billing boundaries.",
  "V2.3 manual payment status keeps no_card_storage, no_bank_execution, and no_crypto_execution boundaries.",
  "V2.3 manual payment status keeps no_saas_sharing, no_provider_dispatch, no_channel_dispatch, no_marketplace_implementation, and no_autonomous_execution boundaries.",
  "V2.3 manual payment status keeps no_paid_product_readiness_claim, no_public_beta_claim, no_mplp_certification, and no_mplp_endorsement boundaries.",
] as const;

export const V2_3_MANUAL_PAYMENT_FINAL_STATUSES = [
  "payment_confirmed",
  "refunded",
  "cancelled",
] as const satisfies ManualPaymentStatus[];
