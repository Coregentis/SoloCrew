# SOLOCREW-PROJECTION-DTO-CONTRACT-v0.1

## Ownership Rules

- fields that come from mother-runtime truth remain authoritative upstream
- projection-owned fields may package, aggregate, or rename upstream truth for product use
- app-only fields are UI state only and must never be fed back upward as runtime law
- reserved objects stay explicitly reserved until an upstream runtime surface and a downstream implementation phase both exist

## Projection Object Contract Matrix

| Projection Object | Upstream Mother-Runtime Truth Fields | Projection-Owned Fields | App-Only / UI-Only Fields | Status |
| --- | --- | --- | --- | --- |
| `crew` | `project_id`, `status`, `group_name`, `group_summary`, `worker_ids`, `objective_ids`, `review_cycle_id`, `continuity_mode` from `agent-group` | `crew_id`, `display_name`, `mission`, `member_ids`, `current_objective_id`, `health` | `selected_panel`, `card_order`, `last_opened_at` | active baseline |
| `crew-member` | `status`, `worker_name`, `worker_summary`, `worker_kind`, `role_profile_id`, `capability_tags`, `default_objective_ids` from `agent-worker`; `profile_name`, `responsibility_summary` from `role-profile` | `crew_member_id`, `role_label`, `current_focus`, `recent_action_summary`, `linked_objective_ids`, `memory_summary_ref` | `detail_tab`, `is_selected`, `highlight_reason` | active baseline |
| `objective` | `status`, `objective_summary`, `progress_summary`, `success_signals`, `work_item_ids`, `target_due_at`, `owner_worker_id` from `objective` | `objective_id`, `title`, `assigned_member_ids`, `blocked_decision_refs`, `return_state` | `panel_open`, `timeline_zoom` | active baseline |
| `work-item` | `status`, `work_summary`, `work_kind`, `instruction_brief`, `objective_id`, `assigned_worker_id`, `dependency_ids`, `deliverable_refs` from `work-item` | `work_item_id`, `owner_member_id`, `next_step`, `last_update_summary`, `projection_blocker_label` | `row_variant`, `is_expanded` | active baseline |
| `memory-summary` | `memory_summary`, `retained_notes`, `last_revised_at`, `scope_kind`, `scope_ref_id` from `memory-profile`; `preference_summary`, `preference_signals`, `correction_refs` from `preference-profile` | `memory_summary_id`, `scope`, `recent_correction_summary`, `keyword_tags`, `summary_kind` | `selected_filter`, `is_compact` | active baseline |
| `review-strip` | aggregated from `review-cycle`, `objective`, `work-item`, and execution event truth | `review_strip_id`, `moved_items`, `blocked_items`, `needs_decision`, `changed_preferences` | `dismissed`, `collapsed` | active baseline |
| `budget-snapshot` | none today; upstream budget runtime is absent | `budget_snapshot_id`, `availability`, `deferred_reason` | `chart_range`, `comparison_mode` | deferred placeholder |
| `channel-thread` | none today; upstream channel runtime is absent | `channel_thread_id`, `availability`, `deferred_reason` | `composer_state`, `draft_message` | reserved |

## Reserved and Deferred Rule

For `budget-snapshot` and `channel-thread`:

- SoloCrew may freeze the DTO contract now
- SoloCrew may not invent runtime-backed fields that do not exist
- any future activation of these objects requires a new baseline revision against real upstream surfaces
