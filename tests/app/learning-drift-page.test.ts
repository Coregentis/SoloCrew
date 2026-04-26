import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  createArtifactDraft,
} from "../../app/artifacts/artifact-workflow.ts";
import {
  loadLearningDriftStore,
} from "../../app/learning/learning-drift-store.ts";
import {
  captureArtifactFeedback,
  createGlobalLearningCandidateFromFeedback,
  createLearningCandidateFromFeedback,
  acceptLearningCandidate,
  deferLearningCandidate,
} from "../../app/learning/learning-workflow.ts";
import {
  captureDriftSignal,
  createDriftImpactFromSignal,
} from "../../app/learning/drift-workflow.ts";
import {
  createLearningDriftPageModel,
} from "../../app/shell/create-learning-drift-page-model.ts";
import {
  buildLearningDriftRoute,
  renderLearningDriftPage,
} from "../../app/pages/learning-drift-page.ts";

function create_temp_store() {
  const root = mkdtempSync(join(tmpdir(), "solocrew-learning-drift-page-"));
  const storage_path = join(root, "learning-drift.json");
  return {
    root,
    storage_path,
    cleanup() {
      rmSync(root, { recursive: true, force: true });
    },
  };
}

test("[app] learning/drift page model and renderer expose feedback candidates accepted scope-only learning global candidates rejected-deferred learning drift impacts recommendations and boundary notices", () => {
  const temp_store = create_temp_store();

  try {
    const store = loadLearningDriftStore({ storage_path: temp_store.storage_path });
    const artifact = createArtifactDraft({ cell_id: "personal_media" });
    const feedback = captureArtifactFeedback(store, {
      cell_id: artifact.cell_id,
      artifact_id: artifact.artifact_id,
      artifact_version_id: artifact.artifact_version_id,
      feedback_kind: "style_preference",
      feedback_text: "Use a more reflective opening and shorter section titles.",
    });
    const scope_candidate = createLearningCandidateFromFeedback(store, {
      feedback,
      summary: "Use a more reflective opening and shorter section titles.",
    });
    const global_candidate = createGlobalLearningCandidateFromFeedback(store, {
      feedback,
      summary: "Reflective openings may be reusable beyond one draft.",
    });
    acceptLearningCandidate(store, scope_candidate.candidate_id);
    deferLearningCandidate(store, global_candidate.candidate_id);
    const signal = captureDriftSignal(store, {
      cell_id: "personal_media",
      source_artifact_id: artifact.artifact_id,
      drift_kind: "audience_shift",
      change_summary: "The target audience changed from founders to solo creators.",
    });
    createDriftImpactFromSignal(store, {
      drift_signal: signal,
      affected_artifact_refs: [artifact.artifact_id],
      affected_task_refs: artifact.related_task_refs,
    });

    const model = createLearningDriftPageModel(store, {
      cell_id: "personal_media",
    });
    const page = renderLearningDriftPage(model);

    assert.equal(page.route_path, buildLearningDriftRoute("personal_media"));
    assert.ok(model.feedback_records.length >= 1);
    assert.ok(model.learning_candidates.length >= 2);
    assert.ok(model.accepted_scope_only_learning.length >= 1);
    assert.ok(model.global_candidate_learning.length >= 1);
    assert.ok(model.inactive_learning.length >= 1);
    assert.ok(model.drift_signals.length >= 1);
    assert.ok(model.drift_impacts.length >= 1);
    assert.ok(model.recommendations.length >= 1);
    assert.equal(model.provider_execution_available, false);
    assert.equal(model.channel_entry_available, false);
    assert.equal(model.autonomous_operation_available, false);
    assert.equal(model.v2_0_delivered, false);
    assert.equal(model.v2_0_ready, false);
    assert.equal(model.ga_available, false);
    assert.match(page.html, /Learning And Drift/);
    assert.match(page.html, /Accepted same-Cell learning:/);
    assert.match(page.html, /Global candidate learning:/);
    assert.match(page.boundary_summary, /provider-neutral/i);
    assert.match(page.boundary_summary, /Global candidate learning remains candidate-only/);
    assert.match(page.boundary_summary, /No model training/);
    assert.doesNotMatch(page.html, /provider execution is available/i);
    assert.doesNotMatch(page.html, /autonomous operation is available/i);
    assert.doesNotMatch(page.html, /V2\.0 ready/i);
    assert.doesNotMatch(page.html, /V2\.0 delivered/i);
  } finally {
    temp_store.cleanup();
  }
});
