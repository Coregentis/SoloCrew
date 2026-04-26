import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  loadActionStore,
} from "../../app/actions/action-store.ts";
import {
  applyBoundedAction,
  createActionRequest,
  createReviewProposalFromAction,
  deferLimitedExternalDispatch,
  blockForbiddenIrreversibleAction,
} from "../../app/actions/action-workflow.ts";
import {
  loadArtifactStore,
} from "../../app/artifacts/artifact-store.ts";
import {
  createActionWorkflowPageModel,
} from "../../app/shell/create-action-workflow-page-model.ts";
import {
  renderActionWorkflowPage,
} from "../../app/pages/action-workflow-page.ts";

function create_temp_paths() {
  const root = mkdtempSync(join(tmpdir(), "solocrew-action-page-"));
  return {
    root,
    action_path: join(root, "actions.json"),
    artifact_path: join(root, "artifacts.json"),
    cleanup() {
      rmSync(root, { recursive: true, force: true });
    },
  };
}

test("[app] action workflow page model exposes requests outcomes review proposals deferred items blocked items and boundary notices", () => {
  const temp = create_temp_paths();

  try {
    const action_store = loadActionStore({ storage_path: temp.action_path });
    const artifact_store = loadArtifactStore({ storage_path: temp.artifact_path });

    const auto_local_request = createActionRequest(action_store, {
      cell_id: "development_company",
      action_class: "auto_local",
      action_kind: "create_artifact",
      title: "Create bounded implementation plan",
      intent_summary: "Capture a bounded local implementation plan.",
    });
    applyBoundedAction({ action_store, artifact_store }, auto_local_request);

    const review_request = createActionRequest(action_store, {
      cell_id: "development_company",
      action_class: "reviewable_local",
      action_kind: "create_review_proposal",
      title: "Create local review proposal",
      intent_summary: "Prepare a local review proposal for bounded changes.",
    });
    createReviewProposalFromAction(
      { action_store, artifact_store },
      review_request
    );

    const deferred_request = createActionRequest(action_store, {
      cell_id: "development_company",
      action_class: "limited_external_dispatch",
      action_kind: "defer_external_dispatch",
      title: "Defer external handoff",
      intent_summary: "Defer any external handoff to a later confirmation wave.",
    });
    deferLimitedExternalDispatch({ action_store }, deferred_request);

    const blocked_request = createActionRequest(action_store, {
      cell_id: "development_company",
      action_class: "forbidden_irreversible",
      action_kind: "block_irreversible",
      title: "Block irreversible action",
      intent_summary: "Keep irreversible change blocked.",
    });
    blockForbiddenIrreversibleAction({ action_store }, blocked_request);

    const model = createActionWorkflowPageModel(
      action_store,
      {
        cell_id: "development_company",
        artifact_store_or_options: artifact_store,
      }
    );

    assert.equal(model.action_requests.length, 4);
    assert.equal(model.action_outcomes.length, 4);
    assert.equal(model.review_proposals.length, 1);
    assert.equal(model.produced_local_artifacts.length, 1);
    assert.equal(model.deferred_items.length, 1);
    assert.equal(model.blocked_items.length, 1);
    assert.ok(model.boundary_notices.length >= 3);
    assert.equal(model.provider_execution_available, false);
    assert.equal(model.external_dispatch_available, false);
    assert.equal(model.v2_0_ready, false);
  } finally {
    temp.cleanup();
  }
});

test("[app] action workflow renderer exposes product-facing sections and avoids forbidden positive execution wording", () => {
  const temp = create_temp_paths();

  try {
    const action_store = loadActionStore({ storage_path: temp.action_path });
    const artifact_store = loadArtifactStore({ storage_path: temp.artifact_path });

    const external_draft_request = createActionRequest(action_store, {
      cell_id: "personal_media",
      action_class: "external_draft",
      action_kind: "create_external_draft",
      title: "Create reflective article draft",
      intent_summary: "Create a draft-only article artifact for later review.",
    });
    applyBoundedAction(
      { action_store, artifact_store },
      external_draft_request
    );

    const model = createActionWorkflowPageModel(
      action_store,
      {
        cell_id: "personal_media",
        artifact_store_or_options: artifact_store,
      }
    );
    const page = renderActionWorkflowPage(model);

    assert.match(page.html, /Action Requests/);
    assert.match(page.html, /Policy Decisions/);
    assert.match(page.html, /Outcomes/);
    assert.match(page.html, /Produced Local Artifacts/);
    assert.match(page.html, /Boundary Summary/);
    assert.match(page.boundary_summary, /provider-neutral/i);
    assert.match(page.boundary_summary, /No provider\/channel execution/i);
    assert.doesNotMatch(
      page.html,
      /\bapproved\b|\bdispatched\b|\bexecuted\b|\bprovider_ready\b|\bchannel_ready\b|\bautonomous_ready\b/i
    );
    assert.doesNotMatch(page.html, /V2\.0 ready/i);
    assert.doesNotMatch(page.html, /V2\.0 delivered/i);
  } finally {
    temp.cleanup();
  }
});
