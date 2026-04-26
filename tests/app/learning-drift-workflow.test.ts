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
  restoreLearningDriftStore,
} from "../../app/learning/learning-drift-store.ts";
import {
  captureArtifactFeedback,
  createGlobalLearningCandidateFromFeedback,
  createLearningCandidateFromFeedback,
  deferLearningCandidate,
  listAcceptedLearningByCell,
  listLearningCandidatesByCell,
  listGlobalLearningCandidates,
  acceptLearningCandidate,
  rejectLearningCandidate,
} from "../../app/learning/learning-workflow.ts";
import {
  acknowledgeDriftImpact,
  captureDriftSignal,
  closeDriftImpact,
  createDriftImpactFromSignal,
  listDriftImpactsByCell,
  recommendDriftContinuation,
} from "../../app/learning/drift-workflow.ts";
import {
  createCellOperationsPanelProductPageModel,
} from "../../app/shell/create-cell-operations-panel-product-page-model.ts";
import {
  createLearningDriftPageModel,
} from "../../app/shell/create-learning-drift-page-model.ts";
import {
  renderLearningDriftPage,
} from "../../app/pages/learning-drift-page.ts";
import {
  createStarterCellsRuntimeStateProjection,
} from "../../projection/fixtures/starter-cell-fixtures.ts";

function create_temp_store() {
  const root = mkdtempSync(join(tmpdir(), "solocrew-learning-drift-"));
  const storage_path = join(root, "learning-drift.json");
  return {
    root,
    storage_path,
    cleanup() {
      rmSync(root, { recursive: true, force: true });
    },
  };
}

test("[app] captureArtifactFeedback creates feedback linked to artifact and Cell", () => {
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
      source_evidence_refs: ["feedback-evidence-01"],
    });

    assert.equal(feedback.cell_id, "personal_media");
    assert.equal(feedback.artifact_id, artifact.artifact_id);
    assert.equal(feedback.artifact_version_id, artifact.artifact_version_id);
  } finally {
    temp_store.cleanup();
  }
});

test("[app] scope-only and global candidate learning flows remain bounded", () => {
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
      candidate_kind: "style_preference",
      summary: "Use a more reflective opening and shorter section titles.",
    });
    const global_candidate = createGlobalLearningCandidateFromFeedback(store, {
      feedback,
      candidate_kind: "writing_pattern",
      summary: "Reflective openings may be reusable beyond one draft.",
    });

    assert.equal(scope_candidate.application_scope, "scope_only");
    assert.equal(scope_candidate.status, "candidate");
    assert.equal(global_candidate.application_scope, "global_candidate");
    assert.equal(global_candidate.status, "candidate");

    const accepted = acceptLearningCandidate(store, scope_candidate.candidate_id);
    const rejected = rejectLearningCandidate(store, global_candidate.candidate_id);
    const deferred = deferLearningCandidate(store, global_candidate.candidate_id);
    const candidates = listLearningCandidatesByCell(store, "personal_media");
    const accepted_same_cell = listAcceptedLearningByCell(store, "personal_media");
    const global_candidates = listGlobalLearningCandidates(store);

    assert.ok(accepted !== null);
    assert.equal(accepted?.status, "accepted");
    assert.ok(rejected !== null);
    assert.ok(deferred !== null);
    assert.equal(deferred?.status, "deferred");
    assert.equal(accepted_same_cell.length, 1);
    assert.equal(global_candidates.length, 1);
    assert.equal(global_candidates[0]?.status, "deferred");
    assert.ok(
      accepted_same_cell.some(
        (candidate) =>
          candidate.summary ===
          "Use a more reflective opening and shorter section titles."
      )
    );
    assert.ok(
      global_candidates.some(
        (candidate) =>
          candidate.summary ===
          "Reflective openings may be reusable beyond one draft."
      )
    );
  } finally {
    temp_store.cleanup();
  }
});

test("[app] accepted learning remains Cell-scoped and does not leak across Cells", () => {
  const temp_store = create_temp_store();

  try {
    const store = loadLearningDriftStore({ storage_path: temp_store.storage_path });
    const personal_media_artifact = createArtifactDraft({
      cell_id: "personal_media",
    });
    const feedback = captureArtifactFeedback(store, {
      cell_id: personal_media_artifact.cell_id,
      artifact_id: personal_media_artifact.artifact_id,
      artifact_version_id: personal_media_artifact.artifact_version_id,
      feedback_kind: "style_preference",
      feedback_text: "Use a more reflective opening and shorter section titles.",
    });
    const candidate = createLearningCandidateFromFeedback(store, {
      feedback,
      summary: "Use a more reflective opening and shorter section titles.",
    });
    acceptLearningCandidate(store, candidate.candidate_id);

    const personal_media_learning = listAcceptedLearningByCell(
      store,
      "personal_media"
    );
    const ecommerce_learning = listAcceptedLearningByCell(store, "ecommerce");
    const development_learning = listAcceptedLearningByCell(
      store,
      "development_company"
    );

    assert.equal(personal_media_learning.length, 1);
    assert.equal(ecommerce_learning.length, 0);
    assert.equal(development_learning.length, 0);
  } finally {
    temp_store.cleanup();
  }
});

test("[app] learning store survives reload and drift workflow remains deterministic", () => {
  const temp_store = create_temp_store();

  try {
    const first_store = loadLearningDriftStore({ storage_path: temp_store.storage_path });
    const artifact = createArtifactDraft({ cell_id: "ecommerce" });
    const feedback = captureArtifactFeedback(first_store, {
      cell_id: artifact.cell_id,
      artifact_id: artifact.artifact_id,
      artifact_version_id: artifact.artifact_version_id,
      feedback_kind: "quality_signal",
      feedback_text: "Keep the offer framing tighter and more benefit-first.",
    });
    const candidate = createLearningCandidateFromFeedback(first_store, {
      feedback,
      summary: "Keep the offer framing tighter and more benefit-first.",
    });
    acceptLearningCandidate(first_store, candidate.candidate_id);
    const scope_conflict_signal = captureDriftSignal(first_store, {
      cell_id: "ecommerce",
      source_artifact_id: artifact.artifact_id,
      drift_kind: "scope_conflict",
      change_summary:
        "The offer priorities now conflict with the current campaign emphasis.",
    });
    const stale_signal = captureDriftSignal(first_store, {
      cell_id: "ecommerce",
      source_artifact_id: artifact.artifact_id,
      drift_kind: "stale_artifact",
      change_summary: "The current listing draft is stale after updated catalog facts.",
    });
    const scope_conflict_impact = createDriftImpactFromSignal(first_store, {
      drift_signal: scope_conflict_signal,
      affected_artifact_refs: [artifact.artifact_id],
      affected_task_refs: artifact.related_task_refs,
    });
    const stale_impact = createDriftImpactFromSignal(first_store, {
      drift_signal: stale_signal,
      affected_artifact_refs: [artifact.artifact_id],
      affected_task_refs: artifact.related_task_refs,
    });

    assert.equal(
      recommendDriftContinuation({
        drift_kind: "scope_conflict",
        change_summary: scope_conflict_signal.change_summary,
      }),
      "block"
    );
    assert.equal(
      recommendDriftContinuation({
        drift_kind: "stale_artifact",
        change_summary: stale_signal.change_summary,
      }),
      "revise"
    );
    assert.ok(["clarify", "block"].includes(scope_conflict_impact.recommendation));
    assert.equal(stale_impact.recommendation, "revise");
    acknowledgeDriftImpact(first_store, scope_conflict_impact.drift_impact_id);
    closeDriftImpact(first_store, stale_impact.drift_impact_id);
    first_store.close();

    const reloaded_store = restoreLearningDriftStore({
      storage_path: temp_store.storage_path,
    });
    const candidates = listLearningCandidatesByCell(reloaded_store, "ecommerce");
    const impacts = listDriftImpactsByCell(reloaded_store, "ecommerce");
    const page_model = createLearningDriftPageModel(reloaded_store, {
      cell_id: "ecommerce",
    });
    const page = renderLearningDriftPage(page_model);

    assert.equal(candidates.length, 1);
    assert.equal(candidates[0]?.status, "accepted");
    assert.equal(impacts.length, 2);
    assert.equal(page_model.provider_execution_available, false);
    assert.equal(page_model.autonomous_operation_available, false);
    assert.equal(page_model.v2_0_ready, false);
    assert.match(page.html, /Learning And Drift/);
    assert.match(page.html, /Global candidate learning remains candidate-only/);
  } finally {
    temp_store.cleanup();
  }
});

test("[app] Cell Operations Panel can consume persisted learning and drift while preserving fixture fallback behavior", () => {
  const temp_store = create_temp_store();

  try {
    const store = loadLearningDriftStore({ storage_path: temp_store.storage_path });
    const artifact = createArtifactDraft({ cell_id: "development_company" });
    const feedback = captureArtifactFeedback(store, {
      cell_id: artifact.cell_id,
      artifact_id: artifact.artifact_id,
      artifact_version_id: artifact.artifact_version_id,
      feedback_kind: "structure_preference",
      feedback_text: "Prefer a shorter milestone checklist and concise release headings.",
    });
    const scope_candidate = createLearningCandidateFromFeedback(store, {
      feedback,
      summary: "Prefer a shorter milestone checklist and concise release headings.",
    });
    const global_candidate = createGlobalLearningCandidateFromFeedback(store, {
      feedback,
      summary: "Concise release headings may help across similar artifacts.",
    });
    acceptLearningCandidate(store, scope_candidate.candidate_id);
    deferLearningCandidate(store, global_candidate.candidate_id);
    const signal = captureDriftSignal(store, {
      cell_id: "development_company",
      source_artifact_id: artifact.artifact_id,
      drift_kind: "goal_change",
      change_summary: "The milestone changed from dashboard polish to release blocker fixes.",
    });
    createDriftImpactFromSignal(store, {
      drift_signal: signal,
      affected_artifact_refs: [artifact.artifact_id],
      affected_task_refs: artifact.related_task_refs,
    });

    const candidates = listLearningCandidatesByCell(store, "development_company");
    const impacts = listDriftImpactsByCell(store, "development_company");
    const runtime_state_projection = createStarterCellsRuntimeStateProjection();
    const persisted_panel = createCellOperationsPanelProductPageModel(
      runtime_state_projection,
      {
        target_cell_id: "development_company",
        persisted_learning_candidates: candidates,
        persisted_drift_impacts: impacts,
      }
    );
    const fixture_only_panel = createCellOperationsPanelProductPageModel(
      runtime_state_projection,
      {
        target_cell_id: "development_company",
      }
    );

    assert.ok(
      persisted_panel.learning_section.accepted_scope_only_learning.includes(
        "Prefer a shorter milestone checklist and concise release headings."
      )
    );
    assert.ok(
      persisted_panel.learning_section.global_candidate_learning.includes(
        "Concise release headings may help across similar artifacts."
      )
    );
    assert.ok(
      persisted_panel.drift_section.items.some(
        (item) => item.drift_kind === "goal_change"
      )
    );
    assert.notDeepEqual(
      persisted_panel.learning_section.accepted_scope_only_learning,
      fixture_only_panel.learning_section.accepted_scope_only_learning
    );
    assert.ok(
      fixture_only_panel.learning_section.accepted_scope_only_learning.length >=
        1
    );
  } finally {
    temp_store.cleanup();
  }
});
