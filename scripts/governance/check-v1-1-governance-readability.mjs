import { readFileSync } from "node:fs";

const CHANGELOG_PATH = "CHANGELOG.md";

const checks = [
  {
    path: "governance/audits/SOLOCREW-V1.1-END-TO-END-USABLE-FOUNDER-LOOP-CLOSURE-AUDIT-v0.1.md",
    minLines: 20,
    headers: ["| Stage | Source artifact | Status | Evidence | Boundary notes |"],
    decisions: ["SOLOCREW_V1_1_E2E_FOUNDER_LOOP_CLOSED_NON_EXECUTING"],
  },
  {
    path: "governance/audits/SOLOCREW-V1.1-CAPABILITY-INVENTORY-v0.1.md",
    minLines: 20,
    headers: ["| Capability | Implemented? | Source files | Tests | User-visible? | Execution boundary |"],
    decisions: ["SOLOCREW_V1_1_CAPABILITY_INVENTORY_READY"],
  },
  {
    path: "governance/audits/SOLOCREW-V1.1-BOUNDARY-AND-RISK-REVIEW-v0.1.md",
    minLines: 20,
    headers: ["| Risk | Current mitigation | Residual risk | Release-candidate implication |"],
    decisions: ["SOLOCREW_V1_1_BOUNDARY_RISK_REVIEW_READY_FOR_RC_PLANNING"],
  },
  {
    path: "governance/audits/SOLOCREW-V1.1-RC-PLANNING-AUDIT-v0.1.md",
    minLines: 20,
    headers: ["| Artifact | Status | Evidence | Boundary notes |"],
    decisions: ["SOLOCREW_V1_1_RC_PLANNING_PACK_READY"],
  },
  {
    path: "governance/audits/SOLOCREW-V1.1-GOVERNANCE-READABILITY-AUDIT-v0.1.md",
    minLines: 20,
    headers: [],
    decisions: ["SOLOCREW_V1_1_GOVERNANCE_READABILITY_AUDIT_READY"],
  },
  {
    path: "governance/gates/SOLOCREW-V1.1-RC-READINESS-GATE-v0.1.md",
    minLines: 20,
    headers: ["| Gate | Requirement | Status |"],
    decisions: ["SOLOCREW_V1_1_RC_GATE_READY_FOR_RC_PLANNING"],
  },
  {
    path: "governance/gates/SOLOCREW-V1.1-RC-FORBIDDEN-CLAIM-GATE-v0.1.md",
    minLines: 20,
    headers: [],
    decisions: ["SOLOCREW_V1_1_RC_FORBIDDEN_CLAIM_GATE_READY"],
  },
  {
    path: "governance/gates/SOLOCREW-V1.1-RC-SEAL-AUTHORIZATION-GATE-v0.1.md",
    minLines: 20,
    headers: ["| Gate | Requirement | Required status |"],
    decisions: ["SOLOCREW_V1_1_RC_SEAL_AUTHORIZATION_GATE_DRAFT_READY"],
  },
  {
    path: "governance/plans/SOLOCREW-V1.1-RC-PLANNING-OVERVIEW-v0.1.md",
    minLines: 20,
    headers: [],
    decisions: ["SOLOCREW_V1_1_RC_PLANNING_OPENED"],
  },
  {
    path: "governance/releases/SOLOCREW-V1.1-RC-SCOPE-AND-DISCLOSURE-v0.1.md",
    minLines: 20,
    headers: [],
    decisions: ["SOLOCREW_V1_1_RC_SCOPE_DISCLOSURE_READY"],
  },
  {
    path: "governance/releases/SOLOCREW-V1.1-RC-EVIDENCE-MANIFEST-v0.1.md",
    minLines: 20,
    headers: ["| Evidence category | Source artifact | Status | Notes |"],
    decisions: ["SOLOCREW_V1_1_RC_EVIDENCE_MANIFEST_READY"],
  },
  {
    path: "governance/releases/SOLOCREW-V1.1-RC-VALIDATION-PLAN-v0.1.md",
    minLines: 20,
    headers: [],
    decisions: ["SOLOCREW_V1_1_RC_VALIDATION_PLAN_READY"],
  },
  {
    path: "governance/releases/SOLOCREW-V1.1-RC-TAG-AND-RELEASE-DECISION-DRAFT-v0.1.md",
    minLines: 20,
    headers: [],
    decisions: [
      "SOLOCREW_V1_1_RC_TAG_RELEASE_DECISION_DRAFT_READY",
      "TAG_NOT_CREATED_IN_THIS_WAVE",
      "GITHUB_RELEASE_NOT_CREATED_IN_THIS_WAVE",
      "RELEASE_SEAL_NOT_CREATED_IN_THIS_WAVE",
    ],
  },
  {
    path: "governance/releases/SOLOCREW-V1.1-RC-RELEASE-NOTES-DRAFT-v0.1.md",
    minLines: 20,
    headers: [],
    decisions: ["SOLOCREW_V1_1_RC_RELEASE_NOTES_DRAFT_READY"],
  },
  {
    path: "governance/releases/SOLOCREW-V1.1-RC-SEAL-PREPARATION-PLAN-v0.1.md",
    minLines: 20,
    headers: ["| Input | Required? | Source | Status |"],
    decisions: ["SOLOCREW_V1_1_RC_SEAL_PREPARATION_PLAN_READY"],
  },
  {
    path: "governance/releases/SOLOCREW-V1.1-RC-VALIDATION-EXECUTION-CHECKLIST-v0.1.md",
    minLines: 20,
    headers: ["| Command | Required | Expected result | Recorded in this wave? |"],
    decisions: ["SOLOCREW_V1_1_RC_VALIDATION_EXECUTION_CHECKLIST_READY"],
  },
];

const changelogNeedle =
  "repaired V1.1 RC governance readability using a reusable readability gate";

const failures = [];

function readLines(path) {
  const text = readFileSync(path, "utf8");
  return { text, lines: text.split(/\r?\n/) };
}

for (const check of checks) {
  const { text, lines } = readLines(check.path);

  if (lines.length < check.minLines) {
    failures.push(
      `FAIL ${check.path}: line count ${lines.length} is below minimum ${check.minLines}`,
    );
  }

  lines.forEach((line, index) => {
    if (line.length > 600) {
      failures.push(
        `FAIL ${check.path}: line ${index + 1} length ${line.length} exceeds maximum 600`,
      );
    }
  });

  for (const header of check.headers) {
    if (!text.includes(header)) {
      failures.push(`FAIL ${check.path}: missing required header "${header}"`);
    }
  }

  for (const decision of check.decisions) {
    if (!text.includes(decision)) {
      failures.push(`FAIL ${check.path}: missing required decision "${decision}"`);
    }
  }
}

const { text: changelogText, lines: changelogLines } = readLines(CHANGELOG_PATH);

const topEntryIndex = changelogLines.findIndex((line) => line.includes(changelogNeedle));

if (topEntryIndex === -1) {
  failures.push(
    `FAIL ${CHANGELOG_PATH}: missing top V1.1 readability/RC entry containing "${changelogNeedle}"`,
  );
} else if (changelogLines[topEntryIndex].length > 700) {
  failures.push(
    `FAIL ${CHANGELOG_PATH}: top V1.1 readability entry line length ${changelogLines[topEntryIndex].length} exceeds maximum 700`,
  );
}

if (!changelogText.includes(changelogNeedle)) {
  failures.push(`FAIL ${CHANGELOG_PATH}: readability repair entry text not found`);
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }
  process.exit(1);
}

console.log("V1.1 governance readability check passed");
