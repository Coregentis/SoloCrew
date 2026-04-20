import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const GENERATOR_PATH = "scripts/governance/write-v1-1-rc-readable-docs.mjs";
const GATE_PATH = "scripts/governance/check-v1-1-governance-readability.mjs";

function withTrailingNewline(lines) {
  const normalized = [...lines];

  while (normalized.length > 0 && normalized.at(-1) === "") {
    normalized.pop();
  }

  return `${normalized.join("\n")}\n`;
}

function writeDoc(path, lines) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, withTrailingNewline(lines), "utf8");
}

function table(headers, rows) {
  const headerRow = `| ${headers.join(" | ")} |`;
  const separatorRow = `|${headers.map(() => "---").join("|")}|`;
  const bodyRows = rows.map((row) => `| ${row.join(" | ")} |`);

  return [headerRow, separatorRow, ...bodyRows];
}

function bullets(items) {
  return items.map((item) => `- ${item}`);
}

function docHeader(title, docId) {
  return [
    `# ${title}`,
    "",
    `\`doc_id: ${docId}\``,
    `\`generated_by: ${GENERATOR_PATH}\``,
    `\`readability_gate: ${GATE_PATH}\``,
    "",
  ];
}

function section(title, bodyLines) {
  return [`## ${title}`, "", ...bodyLines, ""];
}

function closureAuditLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 End-to-End Usable Founder Loop Closure Audit v0.1",
      "SOLOCREW-V1.1-END-TO-END-USABLE-FOUNDER-LOOP-CLOSURE-AUDIT-v0.1",
    ),
    ...section("A. Purpose", [
      "This audit checks whether SoloCrew V1.1 now has a coherent, usable,",
      "end-to-end founder loop that remains explicitly non-executing.",
      "",
      "This document is:",
      ...bullets([
        "closure audit only",
        "not release/seal",
        "no new app implementation in this wave",
        "no provider/channel execution",
        "no approve/reject/dispatch/execute",
        "no founder queue",
        "no Cognitive_OS changes",
        "no MPLP changes",
        "no protocol certification",
      ]),
    ]),
    ...section("B. Loop Under Audit", [
      "The loop under audit is:",
      "",
      "founder request input  ",
      "-> bounded request object  ",
      "-> projection-safe summary envelope  ",
      "-> intake-to-packet adapter  ",
      "-> packet candidate  ",
      "-> intake-to-packet flow  ",
      "-> page model  ",
      "-> founder intake / handoff / review page visibility  ",
      "-> tests and boundary evidence",
    ]),
    ...section("C. Closure Matrix", table(
      ["Stage", "Source artifact", "Status", "Evidence", "Boundary notes"],
      [
        [
          "product scope",
          "`governance/plans/SOLOCREW-V1.1-INTAKE-TO-PACKET-PRODUCT-SCOPE-v0.1.md`",
          "`PASS`",
          "bounded V1.1 goal, wow moment, included scope, and excluded scope are frozen",
          "non-executing founder loop only",
        ],
        [
          "projection consumption plan",
          "`governance/plans/SOLOCREW-V1.1-PROJECTION-CONSUMPTION-PLAN-v0.1.md`",
          "`PASS`",
          "allowed projection-safe surfaces and forbidden interpretations are frozen",
          "no raw runtime-private dependency",
        ],
        [
          "implementation plan",
          "`governance/plans/SOLOCREW-V1.1-INTAKE-TO-PACKET-IMPLEMENTATION-PLAN-v0.1.md`",
          "`PASS`",
          "adapter/flow shape and forbidden behavior were frozen before implementation",
          "no provider/channel, no queue",
        ],
        [
          "scenario plan",
          "`governance/plans/SOLOCREW-V1.1-SCENARIO-AND-FIXTURE-PLAN-v0.1.md`",
          "`PASS`",
          "first scenario and fixture boundaries are frozen",
          "no external action claim",
        ],
        [
          "test plan",
          "`governance/plans/SOLOCREW-V1.1-INTAKE-TO-PACKET-TEST-PLAN-v0.1.md`",
          "`PASS`",
          "test expectations were frozen before code landed",
          "no proof/approval semantics",
        ],
        [
          "adapter implementation",
          "`projection/adapters/founder-request-intake-to-packet-adapter.ts`",
          "`PASS`",
          "packet candidate generation, raw-key rejection, forbidden-label rejection, and project-consistency rejection are implemented",
          "no direct runtime-private import",
        ],
        [
          "flow implementation",
          "`projection/assembly/founder-request-intake-to-packet-flow.ts`",
          "`PASS`",
          "deterministic flow result, review/return posture, blocked fallback, and boundary summary are implemented",
          "blocked fallback remains non-executing",
        ],
        [
          "hardening audit",
          "`governance/audits/SOLOCREW-V1.1-INTAKE-TO-PACKET-HARDENING-AUDIT-v0.1.md`",
          "`PASS`",
          "request-side raw-key hardening and complete negative fixture coverage are recorded",
          "blocked-actions allowance preserved",
        ],
        [
          "app/page integration plan",
          "`governance/plans/SOLOCREW-V1.1-APP-PAGE-INTEGRATION-SCOPE-v0.1.md` and related V1.1 app/page planning docs",
          "`PASS`",
          "page roles, field mapping, copy rules, and app-test boundaries are frozen",
          "no summary-as-proof claim",
        ],
        [
          "page model helper",
          "`app/shell/create-v1-1-intake-to-packet-page-model.ts`",
          "`PASS`",
          "deterministic page-model helper exposes posture labels, blocked fallback, boundary summary, and interpretation guards",
          "no upstream runtime import",
        ],
        [
          "founder intake page integration",
          "`app/pages/founder-request-intake-page.ts`",
          "`PASS`",
          "founder intake page exposes packet candidate planning status, evidence posture, recommendation summary, blocked fallback, and boundary summary",
          "no approval wording",
        ],
        [
          "handoff page integration",
          "`app/pages/secretary-handoff-page.ts`",
          "`PASS`",
          "handoff page exposes staging posture, evidence posture, blocked fallback, and compact boundary summary",
          "no dispatch-ready wording",
        ],
        [
          "review page integration",
          "`app/pages/secretary-handoff-review-page.ts`",
          "`PASS`",
          "review page exposes review posture, recommendation, blocked fallback, boundary summary, and interpretation guards",
          "no proof/execution wording",
        ],
        [
          "app/projection tests",
          "`tests/projection/*` and `tests/app/*` V1.1 files",
          "`PASS`",
          "targeted projection and app tests assert packet candidate, posture, blocked fallback, and boundary semantics",
          "boundary semantics are explicitly tested",
        ],
        [
          "forbidden boundary grep",
          "forbidden overclaim grep set used in closure, RC, and seal-prep governance waves",
          "`PASS`",
          "findings remain negative-boundary, explicit exclusion, or forbidden-claim examples only",
          "no live overclaim detected",
        ],
        [
          "full npm test",
          "`npm test`",
          "`PASS`",
          "full regression suite passes with current V1.1 code and app/page integration present",
          "regression baseline held",
        ],
      ],
    )),
    ...section("D. Closure Decision", [
      "`SOLOCREW_V1_1_E2E_FOUNDER_LOOP_CLOSED_NON_EXECUTING`",
    ]),
    ...section("E. Disclosure", bullets([
      "no provider/channel execution",
      "no approve/reject/dispatch/execute",
      "no founder queue",
      "no external business action execution",
      "no autonomous company operation",
      "no protocol certification",
      "no direct runtime-private dependency",
      "no evidence-as-proof",
      "no terminal-as-execution-complete",
      "no transition-accepted-as-approval",
    ])),
    ...section("F. Next Gate", [
      "Recommended next gate:",
      "",
      "- SoloCrew V1.1 release-candidate planning",
      "",
      "Not release seal yet.",
    ]),
  ];
}

function capabilityInventoryLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 Capability Inventory v0.1",
      "SOLOCREW-V1.1-CAPABILITY-INVENTORY-v0.1",
    ),
    ...section("A. Purpose", [
      "This document inventories what SoloCrew V1.1 now actually provides after",
      "the founder-loop closure and app/page integration waves.",
    ]),
    ...section("B. Capability Table", table(
      ["Capability", "Implemented?", "Source files", "Tests", "User-visible?", "Execution boundary"],
      [
        [
          "founder request intake remains available",
          "`YES`",
          "`app/shell/founder-request-intake-contract.ts`, `app/shell/founder-request-intake.ts`, `app/pages/founder-request-intake-page.ts`",
          "`tests/app/founder-request-intake-page.test.ts`",
          "`YES`",
          "non-executing intake only",
        ],
        [
          "projection-safe packet candidate generation",
          "`YES`",
          "`projection/adapters/founder-request-intake-to-packet-adapter.ts`",
          "`tests/projection/founder-request-intake-to-packet-adapter.test.ts`",
          "`INDIRECT`",
          "non-executing adapter only",
        ],
        [
          "review/staging flow result",
          "`YES`",
          "`projection/assembly/founder-request-intake-to-packet-flow.ts`",
          "`tests/projection/founder-request-intake-to-packet-flow.test.ts`",
          "`INDIRECT`",
          "non-executing flow only",
        ],
        [
          "page model generation",
          "`YES`",
          "`app/shell/create-v1-1-intake-to-packet-page-model.ts`",
          "`tests/app/create-v1-1-intake-to-packet-page-model.test.ts`",
          "`INDIRECT`",
          "product-side deterministic model only",
        ],
        [
          "founder intake page packet candidate visibility",
          "`YES`",
          "`app/pages/founder-request-intake-page.ts`",
          "`tests/app/founder-request-intake-page.test.ts`",
          "`YES`",
          "display-only, non-executing",
        ],
        [
          "handoff page staging visibility",
          "`YES`",
          "`app/pages/secretary-handoff-page.ts`",
          "`tests/app/secretary-handoff-page.test.ts`",
          "`YES`",
          "display-only, non-executing",
        ],
        [
          "review page review visibility",
          "`YES`",
          "`app/pages/secretary-handoff-review-page.ts`",
          "`tests/app/secretary-handoff-review-page.test.ts`",
          "`YES`",
          "display-only, non-executing",
        ],
        [
          "evidence/stale/insufficient posture visibility",
          "`YES`",
          "adapter, flow, page model, intake/handoff/review pages",
          "targeted projection/app tests and `npm test`",
          "`YES`",
          "summary-only posture",
        ],
        [
          "non-executing recommendation visibility",
          "`YES`",
          "adapter, flow, page model, intake/review pages",
          "targeted projection/app tests and `npm test`",
          "`YES`",
          "recommendation only, not action",
        ],
        [
          "blocked-by-contract fallback visibility",
          "`YES`",
          "flow, page model, intake/handoff/review pages",
          "targeted projection/app tests",
          "`YES`",
          "blocked boundary only",
        ],
        [
          "boundary summary visibility",
          "`YES`",
          "flow, page model, intake/handoff/review pages",
          "helper/app tests",
          "`YES`",
          "negative-boundary only",
        ],
        [
          "interpretation guards visibility",
          "`YES`",
          "page model, intake/review pages",
          "helper/app tests",
          "`YES`",
          "anti-overclaim guard only",
        ],
        [
          "raw-key rejection",
          "`YES`",
          "`projection/adapters/founder-request-intake-to-packet-adapter.ts`",
          "adapter and flow tests",
          "`NO`",
          "fail-closed",
        ],
        [
          "forbidden-label rejection",
          "`YES`",
          "`projection/adapters/founder-request-intake-to-packet-adapter.ts`",
          "adapter and flow tests",
          "`NO`",
          "fail-closed",
        ],
        [
          "project mismatch rejection",
          "`YES`",
          "`projection/adapters/founder-request-intake-to-packet-adapter.ts`",
          "adapter tests",
          "`NO`",
          "fail-closed",
        ],
        [
          "full app/projection regression tests",
          "`YES`",
          "repository test tree",
          "`npm test`",
          "`NO`",
          "regression evidence only",
        ],
      ],
    )),
    ...section("C. Explicit Non-Capabilities", bullets([
      "no provider/channel execution",
      "no approve/reject/dispatch/execute",
      "no founder queue",
      "no external action execution",
      "no autonomous company operation",
      "no protocol certification",
      "no live external workflow",
    ])),
    ...section("D. Decision", [
      "`SOLOCREW_V1_1_CAPABILITY_INVENTORY_READY`",
    ]),
  ];
}

function boundaryRiskLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 Boundary and Risk Review v0.1",
      "SOLOCREW-V1.1-BOUNDARY-AND-RISK-REVIEW-v0.1",
    ),
    ...section("A. Purpose", [
      "This review records the key V1.1 boundary risks that must stay explicit",
      "before any future release-candidate notes, seal preparation, or seal",
      "authorization wave.",
    ]),
    ...section("B. Risk Table", table(
      ["Risk", "Current mitigation", "Residual risk", "Release-candidate implication"],
      [
        ["approval wording risk", "interpretation guards and page copy explicitly deny approval semantics", "low", "RC notes must keep `review-ready` clearly below approval"],
        ["execution-complete wording risk", "terminal guard and page copy explicitly deny execution completion", "low", "RC wording must preserve terminal != execution complete"],
        ["evidence-as-proof risk", "evidence summary wording stays summary-only in plans, code, pages, and tests", "low", "RC notes must avoid proof/certification language"],
        [
          "blocked_actions as enabled-controls risk",
          "blocked actions render as negative boundary only and tests assert that",
          "low",
          "seal-prep review must preserve blocked-actions framing",
        ],
        [
          "raw runtime dependency risk",
          "no direct runtime-private import and no Cognitive_OS runtime import grep matches",
          "low",
          "release documentation must keep product-side consumption truth",
        ],
        [
          "provider/channel overclaim risk",
          "boundaries and tests explicitly deny provider/channel execution",
          "low",
          "RC notes and seal-prep docs must repeat the same disclosure",
        ],
        ["founder queue overclaim risk", "boundaries and tests explicitly deny founder queue semantics", "low", "queue absence must remain explicit in all RC materials"],
        ["summary-as-proof claim risk", "summary-as-proof claim remains explicitly blocked in plans and pages", "low", "future release narrative must repeat this guardrail"],
        [
          "direct Cognitive_OS import risk",
          "import-boundary grep remains clean and product-side helper stays local",
          "low",
          "seal authorization should keep import-boundary grep active",
        ],
        [
          "page copy drift risk",
          "app tests assert boundary copy on intake, handoff, and review pages",
          "medium",
          "release notes and seal-prep docs should freeze required copy phrases",
        ],
        [
          "test fixture overclaim risk",
          "hardening audit and explicit fixtures reduce false coverage claims",
          "low",
          "RC and seal waves should quote actual fixture coverage only",
        ],
      ],
    )),
    ...section("C. Required Release-Candidate Guardrails", bullets([
      "forbidden grep must remain active",
      "app tests must prove no approval/execution/proof wording",
      "boundary summary must remain visible",
      "release notes must disclose non-executing scope",
      "no provider/channel",
      "no approve/reject/dispatch/execute",
      "no founder queue",
    ])),
    ...section("D. Decision", [
      "`SOLOCREW_V1_1_BOUNDARY_RISK_REVIEW_READY_FOR_RC_PLANNING`",
    ]),
  ];
}

function rcPlanningAuditLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 RC Planning Audit v0.1",
      "SOLOCREW-V1.1-RC-PLANNING-AUDIT-v0.1",
    ),
    ...section("A. Purpose", [
      "This audit checks whether the V1.1 RC planning pack is complete,",
      "readable, and still explicitly below any actual release, tag, or seal step.",
    ]),
    ...section("B. Planning Matrix", table(
      ["Artifact", "Status", "Evidence", "Boundary notes"],
      [
        [
          "formatting correction completed",
          "`PASS`",
          "closure, capability, boundary/risk, and RC readiness docs use real multi-line Markdown sections and tables",
          "decisions preserved",
        ],
        ["RC planning overview", "`PASS`", "`governance/plans/SOLOCREW-V1.1-RC-PLANNING-OVERVIEW-v0.1.md`", "RC planning only"],
        ["RC scope/disclosure", "`PASS`", "`governance/releases/SOLOCREW-V1.1-RC-SCOPE-AND-DISCLOSURE-v0.1.md`", "non-executing scope disclosed"],
        ["RC evidence manifest", "`PASS`", "`governance/releases/SOLOCREW-V1.1-RC-EVIDENCE-MANIFEST-v0.1.md`", "evidence sources frozen"],
        ["RC validation plan", "`PASS`", "`governance/releases/SOLOCREW-V1.1-RC-VALIDATION-PLAN-v0.1.md`", "validation commands and grep gates frozen"],
        ["RC forbidden claim gate", "`PASS`", "`governance/gates/SOLOCREW-V1.1-RC-FORBIDDEN-CLAIM-GATE-v0.1.md`", "forbidden and allowed wording frozen"],
        ["RC tag/release decision draft", "`PASS`", "`governance/releases/SOLOCREW-V1.1-RC-TAG-AND-RELEASE-DECISION-DRAFT-v0.1.md`", "no tag/release created"],
        ["RC release notes draft", "`PASS`", "`governance/releases/SOLOCREW-V1.1-RC-RELEASE-NOTES-DRAFT-v0.1.md`", "draft only, not final notes"],
        ["RC seal preparation plan", "`PASS`", "`governance/releases/SOLOCREW-V1.1-RC-SEAL-PREPARATION-PLAN-v0.1.md`", "later seal-wave inputs and prohibitions frozen"],
        [
          "RC validation execution checklist",
          "`PASS`",
          "`governance/releases/SOLOCREW-V1.1-RC-VALIDATION-EXECUTION-CHECKLIST-v0.1.md`",
          "later execution evidence requirements frozen",
        ],
        ["RC seal authorization gate draft", "`PASS`", "`governance/gates/SOLOCREW-V1.1-RC-SEAL-AUTHORIZATION-GATE-v0.1.md`", "authorization preconditions frozen"],
        ["governance readability audit", "`PASS`", "`governance/audits/SOLOCREW-V1.1-GOVERNANCE-READABILITY-AUDIT-v0.1.md`", "readability regression controls added"],
        ["tests", "`PASS`", "targeted tests and `npm test` remain green in this wave", "no capability widening"],
        ["grep gates", "`PASS`", "forbidden overclaim grep remains negative-boundary / explicit exclusion only", "no release/seal claim"],
      ],
    )),
    ...section("C. Decision", [
      "`SOLOCREW_V1_1_RC_PLANNING_PACK_READY`",
    ]),
    ...section("D. Next Step", [
      "Recommended next step:",
      "",
      "- SoloCrew V1.1 release-candidate notes and seal preparation",
      "",
      "Not actual release/seal.",
    ]),
  ];
}

function readabilityAuditLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 Governance Readability Audit v0.1",
      "SOLOCREW-V1.1-GOVERNANCE-READABILITY-AUDIT-v0.1",
    ),
    ...section("A. Purpose", [
      "This audit records that V1.1 closure, RC, and seal-prep governance",
      "documents now have a reusable readability gate to keep raw Markdown",
      "human-auditable.",
    ]),
    ...section("B. Issue Found", bullets([
      "prior RC planning commit existed",
      "semantic decisions were mostly present",
      "remote raw Markdown was reported as compressed into very few long lines",
      "previous line-count/readability reporting conflicted with remote raw truth",
      "this required an automated readability gate instead of human assertion alone",
    ])),
    ...section("C. Correction Applied", [
      "This wave rewrote the critical V1.1 governance/release documents and added",
      "the new readability script:",
      "",
      ...bullets([
        "CHANGELOG.md",
        "all critical V1.1 closure / RC / seal-prep governance docs",
        "scripts/governance/check-v1-1-governance-readability.mjs",
        "scripts/governance/write-v1-1-rc-readable-docs.mjs",
      ]),
    ]),
    ...section("D. Readability Gate", [
      "Script path:",
      "",
      "- `scripts/governance/check-v1-1-governance-readability.mjs`",
      "",
      "The readability gate enforces:",
      "",
      ...bullets([
        "minimum line count for critical governance docs",
        "maximum line length",
        "required table headers by file",
        "required decision strings by file",
        "no compressed critical docs",
        "minimum line count and max-line checks for both the gate and generator scripts",
      ]),
    ]),
    ...section("E. Decision", [
      "`SOLOCREW_V1_1_GOVERNANCE_READABILITY_AUDIT_READY`",
    ]),
  ];
}

function rcReadinessGateLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 RC Readiness Gate v0.1",
      "SOLOCREW-V1.1-RC-READINESS-GATE-v0.1",
    ),
    ...section("A. Gate Matrix", table(
      ["Gate", "Requirement", "Status"],
      [
        ["1", "E2E founder loop closure audit exists", "`PASS`"],
        ["2", "Capability inventory exists", "`PASS`"],
        ["3", "Boundary & risk review exists", "`PASS`"],
        ["4", "Projection adapter/flow tests pass", "`PASS`"],
        ["5", "App/page tests pass", "`PASS`"],
        ["6", "Full npm test passes", "`PASS`"],
        ["7", "Forbidden boundary grep passes", "`PASS`"],
        ["8", "No provider/channel execution", "`PASS`"],
        ["9", "No approve/reject/dispatch/execute", "`PASS`"],
        ["10", "No founder queue", "`PASS`"],
        ["11", "No direct runtime-private dependency", "`PASS`"],
        ["12", "No summary-as-proof claim", "`PASS`"],
        ["13", "No app copy overclaim", "`PASS`"],
        ["14", "No upstream changes required", "`PASS`"],
      ],
    )),
    ...section("B. Decision", [
      "`SOLOCREW_V1_1_RC_GATE_READY_FOR_RC_PLANNING`",
    ]),
    ...section("C. What This Permits", bullets([
      "a later V1.1 release-candidate planning wave",
      "RC planning around the already-landed non-executing founder loop closure",
    ])),
    ...section("D. What This Does Not Permit", bullets([
      "release/seal in this wave",
      "provider/channel execution",
      "approve/reject/dispatch/execute",
      "founder queue behavior",
      "direct runtime-private dependency",
    ])),
  ];
}

function forbiddenClaimGateLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 RC Forbidden Claim Gate v0.1",
      "SOLOCREW-V1.1-RC-FORBIDDEN-CLAIM-GATE-v0.1",
    ),
    ...section("A. Forbidden Positive Claims", [
      "The following claims are forbidden in any RC-facing governance or release",
      "material:",
      "",
      ...bullets([
        "provider/channel execution available",
        "approve/reject/dispatch/execute behavior available",
        "founder queue available",
        "external business action executed",
        "autonomous company operation",
        "protocol certification",
        "evidence proof/certification",
        "terminal equals execution complete",
        "transition accepted equals approval",
        "blocked actions are enabled controls",
      ]),
    ]),
    ...section("B. Allowed Negative Boundary Statements", [
      "Examples of allowed wording:",
      "",
      ...bullets([
        "provider/channel execution is not included",
        "approve/reject/dispatch/execute is not included",
        "founder queue is not included",
        "evidence summary is not proof",
        "terminal does not mean execution complete",
        "transition accepted does not mean approval",
        "blocked actions are displayed as negative boundary only",
      ]),
    ]),
    ...section("C. Gate Decision", [
      "`SOLOCREW_V1_1_RC_FORBIDDEN_CLAIM_GATE_READY`",
    ]),
  ];
}

function rcSealAuthorizationGateLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 RC Seal Authorization Gate v0.1",
      "SOLOCREW-V1.1-RC-SEAL-AUTHORIZATION-GATE-v0.1",
    ),
    ...section("A. Purpose", [
      "This draft defines the conditions under which a later RC seal/tag wave",
      "may be authorized.",
    ]),
    ...section("B. Gate Matrix", table(
      ["Gate", "Requirement", "Required status"],
      [
        ["1", "RC release notes draft exists.", "`REQUIRED`"],
        ["2", "RC seal preparation plan exists.", "`REQUIRED`"],
        ["3", "RC validation execution checklist exists.", "`REQUIRED`"],
        ["4", "RC validation commands pass in seal wave.", "`REQUIRED`"],
        ["5", "Forbidden-claim gate passes in seal wave.", "`REQUIRED`"],
        ["6", "No provider/channel execution.", "`REQUIRED`"],
        ["7", "No approve/reject/dispatch/execute.", "`REQUIRED`"],
        ["8", "No founder queue.", "`REQUIRED`"],
        ["9", "No direct runtime-private dependency.", "`REQUIRED`"],
        ["10", "No summary-as-proof claim.", "`REQUIRED`"],
        ["11", "User explicitly authorizes tag/release wave.", "`REQUIRED`"],
        ["12", "Tag name is confirmed.", "`REQUIRED`"],
        ["13", "GitHub release decision is confirmed.", "`REQUIRED`"],
        ["14", "Seal record will be created in seal wave.", "`REQUIRED`"],
      ],
    )),
    ...section("C. Current Decision", [
      "`SOLOCREW_V1_1_RC_SEAL_AUTHORIZATION_GATE_DRAFT_READY`",
    ]),
    ...section("D. What This Does Not Permit", bullets([
      "Does not permit tag creation now.",
      "Does not permit GitHub release now.",
      "Does not permit final seal now.",
    ])),
  ];
}

function rcPlanningOverviewLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 RC Planning Overview v0.1",
      "SOLOCREW-V1.1-RC-PLANNING-OVERVIEW-v0.1",
    ),
    ...section("A. Purpose", [
      "This document opens V1.1 release-candidate planning after closure readiness.",
      "",
      "It is:",
      ...bullets([
        "RC planning only",
        "not release seal",
        "no tag creation",
        "no GitHub release",
        "no provider/channel execution",
        "no approve/reject/dispatch/execute",
        "no founder queue",
        "no Cognitive_OS change",
        "no MPLP change",
      ]),
    ]),
    ...section("B. RC Candidate Identity", bullets([
      "`candidate_line: SoloCrew V1.1`",
      "`candidate_type: release-candidate-planning`",
      "`candidate_scope: bounded non-executing usable founder loop`",
    ])),
    ...section("C. RC Planning Inputs", bullets([
      "E2E closure audit",
      "capability inventory",
      "boundary/risk review",
      "RC readiness gate",
      "app/page integration implementation audit",
      "hardening audit",
      "`npm test` result",
      "forbidden grep result",
    ])),
    ...section("D. RC Planning Outputs", bullets([
      "RC planning overview",
      "RC scope and disclosure",
      "RC evidence manifest",
      "RC validation plan",
      "RC forbidden claim gate",
      "RC tag/release decision draft",
      "RC release notes draft",
      "RC seal preparation plan",
      "RC validation execution checklist",
      "RC seal authorization gate draft",
      "governance readability audit",
      "RC planning audit",
    ])),
    ...section("E. Decision", [
      "`SOLOCREW_V1_1_RC_PLANNING_OPENED`",
    ]),
  ];
}

function rcScopeLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 RC Scope and Disclosure v0.1",
      "SOLOCREW-V1.1-RC-SCOPE-AND-DISCLOSURE-v0.1",
    ),
    ...section("A. Included Scope", bullets([
      "founder request intake remains available",
      "projection-safe packet candidate generation",
      "review/staging flow result",
      "app/page packet candidate visibility",
      "evidence/stale/insufficient posture visibility",
      "non-executing recommendation visibility",
      "blocked-by-contract fallback visibility",
      "boundary summary visibility",
      "interpretation guards visibility",
    ])),
    ...section("B. Explicit Excluded Scope", bullets([
      "`No provider/channel execution is included.`",
      "`No approve/reject/dispatch/execute behavior is included.`",
      "`No founder queue is included.`",
      "`No external business action execution is included.`",
      "`No autonomous company operation is included.`",
      "`No protocol certification is claimed.`",
      "`No direct runtime-private dependency is introduced.`",
      "`Evidence summary is not proof.`",
      "`Terminal does not mean execution complete.`",
      "`Transition accepted does not mean approval.`",
    ])),
    ...section("C. User-Facing Scope Statement", [
      "SoloCrew V1.1 RC candidate scope is a bounded, non-executing founder",
      "request-to-packet review loop.",
    ]),
    ...section("D. Decision", [
      "`SOLOCREW_V1_1_RC_SCOPE_DISCLOSURE_READY`",
    ]),
  ];
}

function rcEvidenceManifestLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 RC Evidence Manifest v0.1",
      "SOLOCREW-V1.1-RC-EVIDENCE-MANIFEST-v0.1",
    ),
    ...section("A. Evidence Categories", table(
      ["Evidence category", "Source artifact", "Status", "Notes"],
      [
        ["planning evidence", "V1.1 planning chain under `governance/plans/` and `governance/gates/`", "`READY`", "planning baseline and implementation scope are frozen"],
        ["projection adapter evidence", "`projection/adapters/founder-request-intake-to-packet-adapter.ts`", "`READY`", "packet candidate generation and boundary guards exist"],
        ["projection flow evidence", "`projection/assembly/founder-request-intake-to-packet-flow.ts`", "`READY`", "deterministic flow result and blocked fallback exist"],
        [
          "hardening evidence",
          "`governance/audits/SOLOCREW-V1.1-INTAKE-TO-PACKET-HARDENING-AUDIT-v0.1.md`",
          "`READY`",
          "negative fixture and request-side raw-key hardening are recorded",
        ],
        [
          "app/page integration evidence",
          "`governance/audits/SOLOCREW-V1.1-APP-PAGE-INTEGRATION-IMPLEMENTATION-AUDIT-v0.1.md`",
          "`READY`",
          "current app/page integration is implemented and audited",
        ],
        ["closure evidence", "`governance/audits/SOLOCREW-V1.1-END-TO-END-USABLE-FOUNDER-LOOP-CLOSURE-AUDIT-v0.1.md`", "`READY`", "loop closure decision is frozen"],
        ["capability inventory evidence", "`governance/audits/SOLOCREW-V1.1-CAPABILITY-INVENTORY-v0.1.md`", "`READY`", "implemented/non-capability scope is frozen"],
        ["boundary/risk evidence", "`governance/audits/SOLOCREW-V1.1-BOUNDARY-AND-RISK-REVIEW-v0.1.md`", "`READY`", "RC guardrails are frozen"],
        ["test evidence", "targeted tests and `npm test`", "`READY`", "targeted and full regression commands are green"],
        ["forbidden grep evidence", "forbidden boundary grep outputs in current wave", "`READY`", "findings remain negative-boundary / explicit exclusion only"],
      ],
    )),
    ...section("B. Source Files", bullets([
      "`projection/adapters/founder-request-intake-to-packet-adapter.ts`",
      "`projection/assembly/founder-request-intake-to-packet-flow.ts`",
      "`app/shell/create-v1-1-intake-to-packet-page-model.ts`",
      "`app/pages/founder-request-intake-page.ts`",
      "`app/pages/secretary-handoff-page.ts`",
      "`app/pages/secretary-handoff-review-page.ts`",
      "targeted app/projection test files",
      "V1.1 governance plans, audits, gates, and release-prep artifacts",
    ])),
    ...section("C. Tests", [
      ...bullets([
        "`node --experimental-strip-types --test tests/projection/founder-request-intake-to-packet-adapter.test.ts`",
        "`node --experimental-strip-types --test tests/projection/founder-request-intake-to-packet-flow.test.ts`",
        "`node --experimental-strip-types --test tests/app/create-v1-1-intake-to-packet-page-model.test.ts`",
        "`node --experimental-strip-types --test tests/app/founder-request-intake-page.test.ts`",
        "`node --experimental-strip-types --test tests/app/secretary-handoff-page.test.ts`",
        "`node --experimental-strip-types --test tests/app/secretary-handoff-review-page.test.ts`",
        "`npm test`",
      ]),
      "",
      "Expected pass state:",
      "",
      "- all commands must pass before any future RC seal/tag wave",
    ]),
    ...section("D. Decision", [
      "`SOLOCREW_V1_1_RC_EVIDENCE_MANIFEST_READY`",
    ]),
  ];
}

function rcValidationPlanLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 RC Validation Plan v0.1",
      "SOLOCREW-V1.1-RC-VALIDATION-PLAN-v0.1",
    ),
    ...section("A. Purpose", [
      "This plan defines validation required before any actual RC seal/tag step.",
    ]),
    ...section("B. Required Commands", bullets([
      "`node --experimental-strip-types --test tests/projection/founder-request-intake-to-packet-adapter.test.ts`",
      "`node --experimental-strip-types --test tests/projection/founder-request-intake-to-packet-flow.test.ts`",
      "`node --experimental-strip-types --test tests/app/create-v1-1-intake-to-packet-page-model.test.ts`",
      "`node --experimental-strip-types --test tests/app/founder-request-intake-page.test.ts`",
      "`node --experimental-strip-types --test tests/app/secretary-handoff-page.test.ts`",
      "`node --experimental-strip-types --test tests/app/secretary-handoff-review-page.test.ts`",
      "`npm test`",
      "`git diff --check`",
    ])),
    ...section("C. Required Grep Gates", bullets([
      "forbidden overclaim grep",
      "decision grep",
    ])),
    ...section("D. Blocking Conditions", [
      "Block RC seal if:",
      "",
      ...bullets([
        "any test fails",
        "forbidden grep finds positive overclaim",
        "app copy implies approval/execution/proof",
        "provider/channel or queue appears as capability",
        "direct runtime-private dependency appears",
        "release notes imply certification",
      ]),
    ]),
    ...section("E. Decision", [
      "`SOLOCREW_V1_1_RC_VALIDATION_PLAN_READY`",
    ]),
  ];
}

function rcTagDraftLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 RC Tag and Release Decision Draft v0.1",
      "SOLOCREW-V1.1-RC-TAG-AND-RELEASE-DECISION-DRAFT-v0.1",
    ),
    ...section("A. Purpose", [
      "This document prepares a future tag/release decision, but does not create",
      "a tag or release now.",
    ]),
    ...section("B. Candidate Tag Pattern", bullets([
      "`solocrew-v1.1-rc-non-executing-founder-loop-YYYYMMDD`",
    ])),
    ...section("C. Current Wave Decision", bullets([
      "`TAG_NOT_CREATED_IN_THIS_WAVE`",
      "`GITHUB_RELEASE_NOT_CREATED_IN_THIS_WAVE`",
      "`RELEASE_SEAL_NOT_CREATED_IN_THIS_WAVE`",
    ])),
    ...section("D. Future Preconditions", [
      "Tag can only be created after:",
      "",
      ...bullets([
        "RC validation plan executed",
        "forbidden claim gate passes",
        "release notes drafted",
        "seal record drafted",
        "user explicitly authorizes a tag/release wave",
      ]),
    ]),
    ...section("E. Decision", [
      "`SOLOCREW_V1_1_RC_TAG_RELEASE_DECISION_DRAFT_READY`",
    ]),
  ];
}

function rcReleaseNotesLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 RC Release Notes Draft v0.1",
      "SOLOCREW-V1.1-RC-RELEASE-NOTES-DRAFT-v0.1",
    ),
    ...section("A. Purpose", [
      "This document is a release-candidate notes draft only.",
      "",
      "It is:",
      ...bullets([
        "not final release notes",
        "not release seal",
        "no tag created",
        "no GitHub release created",
      ]),
    ]),
    ...section("B. RC Summary", [
      "SoloCrew V1.1 RC candidate is a bounded, non-executing founder",
      "request-to-packet review loop.",
    ]),
    ...section("C. Included Capabilities", bullets([
      "founder request intake remains available",
      "projection-safe packet candidate generation",
      "review/staging flow result",
      "page model generation",
      "founder intake page packet candidate visibility",
      "handoff page staging visibility",
      "review page review visibility",
      "evidence/stale/insufficient posture visibility",
      "non-executing recommendation visibility",
      "blocked-by-contract fallback visibility",
      "boundary summary visibility",
      "interpretation guards visibility",
      "raw-key rejection",
      "forbidden-label rejection",
      "project mismatch rejection",
      "full app/projection regression tests",
    ])),
    ...section("D. Explicit Non-Capabilities", bullets([
      "no provider/channel execution",
      "no approve/reject/dispatch/execute",
      "no founder queue",
      "no external action execution",
      "no autonomous company operation",
      "no protocol certification",
      "no live external workflow",
      "no evidence-as-proof",
      "no terminal-as-execution-complete",
      "no transition-accepted-as-approval",
    ])),
    ...section("E. Validation Summary Placeholder", [
      "Validation execution must occur in a later seal-preparation or seal",
      "authorization wave.",
    ]),
    ...section("F. Decision", [
      "`SOLOCREW_V1_1_RC_RELEASE_NOTES_DRAFT_READY`",
    ]),
  ];
}

function rcSealPreparationLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 RC Seal Preparation Plan v0.1",
      "SOLOCREW-V1.1-RC-SEAL-PREPARATION-PLAN-v0.1",
    ),
    ...section("A. Purpose", [
      "This document prepares for a later RC seal wave without executing any",
      "seal, tag, or release action in the current wave.",
    ]),
    ...section("B. Required Pre-Seal Inputs", table(
      ["Input", "Required?", "Source", "Status"],
      [
        ["formatted closure audit", "`YES`", "`governance/audits/SOLOCREW-V1.1-END-TO-END-USABLE-FOUNDER-LOOP-CLOSURE-AUDIT-v0.1.md`", "`READY`"],
        ["capability inventory", "`YES`", "`governance/audits/SOLOCREW-V1.1-CAPABILITY-INVENTORY-v0.1.md`", "`READY`"],
        ["boundary/risk review", "`YES`", "`governance/audits/SOLOCREW-V1.1-BOUNDARY-AND-RISK-REVIEW-v0.1.md`", "`READY`"],
        ["RC readiness gate", "`YES`", "`governance/gates/SOLOCREW-V1.1-RC-READINESS-GATE-v0.1.md`", "`READY`"],
        ["RC planning overview", "`YES`", "`governance/plans/SOLOCREW-V1.1-RC-PLANNING-OVERVIEW-v0.1.md`", "`READY`"],
        ["RC scope/disclosure", "`YES`", "`governance/releases/SOLOCREW-V1.1-RC-SCOPE-AND-DISCLOSURE-v0.1.md`", "`READY`"],
        ["RC evidence manifest", "`YES`", "`governance/releases/SOLOCREW-V1.1-RC-EVIDENCE-MANIFEST-v0.1.md`", "`READY`"],
        ["RC validation plan", "`YES`", "`governance/releases/SOLOCREW-V1.1-RC-VALIDATION-PLAN-v0.1.md`", "`READY`"],
        ["RC forbidden claim gate", "`YES`", "`governance/gates/SOLOCREW-V1.1-RC-FORBIDDEN-CLAIM-GATE-v0.1.md`", "`READY`"],
        ["RC release notes draft", "`YES`", "`governance/releases/SOLOCREW-V1.1-RC-RELEASE-NOTES-DRAFT-v0.1.md`", "`READY`"],
        ["RC tag/release decision draft", "`YES`", "`governance/releases/SOLOCREW-V1.1-RC-TAG-AND-RELEASE-DECISION-DRAFT-v0.1.md`", "`READY`"],
      ],
    )),
    ...section("C. Seal Wave Must Run", bullets([
      "`node --experimental-strip-types --test tests/projection/founder-request-intake-to-packet-adapter.test.ts`",
      "`node --experimental-strip-types --test tests/projection/founder-request-intake-to-packet-flow.test.ts`",
      "`node --experimental-strip-types --test tests/app/create-v1-1-intake-to-packet-page-model.test.ts`",
      "`node --experimental-strip-types --test tests/app/founder-request-intake-page.test.ts`",
      "`node --experimental-strip-types --test tests/app/secretary-handoff-page.test.ts`",
      "`node --experimental-strip-types --test tests/app/secretary-handoff-review-page.test.ts`",
      "`npm test`",
      "`git diff --check`",
    ])),
    ...section("D. Seal Wave Must Not", bullets([
      "create provider/channel execution",
      "create approve/reject/dispatch/execute",
      "create founder queue",
      "claim protocol certification",
      "treat evidence summary as proof",
      "create tag without explicit user authorization",
      "create GitHub release without explicit user authorization",
    ])),
    ...section("E. Decision", [
      "`SOLOCREW_V1_1_RC_SEAL_PREPARATION_PLAN_READY`",
    ]),
  ];
}

function rcValidationChecklistLines() {
  return [
    ...docHeader(
      "SoloCrew V1.1 RC Validation Execution Checklist v0.1",
      "SOLOCREW-V1.1-RC-VALIDATION-EXECUTION-CHECKLIST-v0.1",
    ),
    ...section("A. Purpose", [
      "This checklist defines what a later validation-execution wave must record",
      "before any seal authorization or tag/release step.",
    ]),
    ...section("B. Command Checklist", table(
      ["Command", "Required", "Expected result", "Recorded in this wave?"],
      [
        ["`node --experimental-strip-types --test tests/projection/founder-request-intake-to-packet-adapter.test.ts`", "`YES`", "targeted adapter tests pass", "`NO`"],
        ["`node --experimental-strip-types --test tests/projection/founder-request-intake-to-packet-flow.test.ts`", "`YES`", "targeted flow tests pass", "`NO`"],
        ["`node --experimental-strip-types --test tests/app/create-v1-1-intake-to-packet-page-model.test.ts`", "`YES`", "page-model helper tests pass", "`NO`"],
        ["`node --experimental-strip-types --test tests/app/founder-request-intake-page.test.ts`", "`YES`", "founder intake page tests pass", "`NO`"],
        ["`node --experimental-strip-types --test tests/app/secretary-handoff-page.test.ts`", "`YES`", "handoff page tests pass", "`NO`"],
        ["`node --experimental-strip-types --test tests/app/secretary-handoff-review-page.test.ts`", "`YES`", "review page tests pass", "`NO`"],
        ["`npm test`", "`YES`", "full regression suite passes", "`NO`"],
        ["`git diff --check`", "`YES`", "no whitespace or patch-format issues", "`NO`"],
        ["forbidden overclaim grep", "`YES`", "positive overclaim does not appear", "`NO`"],
        ["decision grep", "`YES`", "required governance decisions remain present", "`NO`"],
        ["source-change check", "`YES`", "no unexpected app/projection changes in a seal-prep-only wave", "`NO`"],
      ],
    )),
    ...section("C. Evidence Recording Requirements", [
      "A later seal wave must record:",
      "",
      ...bullets([
        "command",
        "pass/fail",
        "test count",
        "HEAD SHA",
        "changed files",
        "tag decision",
        "release decision",
        "boundary confirmation",
      ]),
    ]),
    ...section("D. Decision", [
      "`SOLOCREW_V1_1_RC_VALIDATION_EXECUTION_CHECKLIST_READY`",
    ]),
  ];
}

function updateChangelog() {
  const path = "CHANGELOG.md";
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  const newEntry = [
    "- repaired V1.1 RC governance readability using a reusable readability gate and",
    "  rewrote closure/RC/seal-prep artifacts into audit-ready multi-line Markdown.",
    "  The reusable gate is `scripts/governance/check-v1-1-governance-readability.mjs`;",
    "  no app/projection source change, no capability change, no provider/channel",
    "  execution, no approve/reject/dispatch/execute, no founder queue, no tag, no",
    "  GitHub release, and no release/seal claim",
  ];

  const marker = "## 2026-04-20";
  const markerIndex = lines.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error("Unable to find 2026-04-20 changelog section");
  }

  const existingIndex = lines.findIndex((line) =>
    line.includes("repaired V1.1 RC governance readability using a reusable readability gate"),
  );

  if (existingIndex !== -1) {
    let endIndex = existingIndex + 1;
    while (endIndex < lines.length) {
      const value = lines[endIndex];
      if (value.startsWith("- ") || value.startsWith("## ")) {
        break;
      }
      endIndex += 1;
    }
    lines.splice(existingIndex, endIndex - existingIndex, ...newEntry);
  } else {
    lines.splice(markerIndex + 1, 0, "", ...newEntry);
  }

  writeDoc(path, lines);
}

function main() {
  updateChangelog();
  writeDoc(
    "governance/audits/SOLOCREW-V1.1-END-TO-END-USABLE-FOUNDER-LOOP-CLOSURE-AUDIT-v0.1.md",
    closureAuditLines(),
  );
  writeDoc(
    "governance/audits/SOLOCREW-V1.1-CAPABILITY-INVENTORY-v0.1.md",
    capabilityInventoryLines(),
  );
  writeDoc(
    "governance/audits/SOLOCREW-V1.1-BOUNDARY-AND-RISK-REVIEW-v0.1.md",
    boundaryRiskLines(),
  );
  writeDoc(
    "governance/audits/SOLOCREW-V1.1-RC-PLANNING-AUDIT-v0.1.md",
    rcPlanningAuditLines(),
  );
  writeDoc(
    "governance/audits/SOLOCREW-V1.1-GOVERNANCE-READABILITY-AUDIT-v0.1.md",
    readabilityAuditLines(),
  );
  writeDoc(
    "governance/gates/SOLOCREW-V1.1-RC-READINESS-GATE-v0.1.md",
    rcReadinessGateLines(),
  );
  writeDoc(
    "governance/gates/SOLOCREW-V1.1-RC-FORBIDDEN-CLAIM-GATE-v0.1.md",
    forbiddenClaimGateLines(),
  );
  writeDoc(
    "governance/gates/SOLOCREW-V1.1-RC-SEAL-AUTHORIZATION-GATE-v0.1.md",
    rcSealAuthorizationGateLines(),
  );
  writeDoc(
    "governance/plans/SOLOCREW-V1.1-RC-PLANNING-OVERVIEW-v0.1.md",
    rcPlanningOverviewLines(),
  );
  writeDoc(
    "governance/releases/SOLOCREW-V1.1-RC-SCOPE-AND-DISCLOSURE-v0.1.md",
    rcScopeLines(),
  );
  writeDoc(
    "governance/releases/SOLOCREW-V1.1-RC-EVIDENCE-MANIFEST-v0.1.md",
    rcEvidenceManifestLines(),
  );
  writeDoc(
    "governance/releases/SOLOCREW-V1.1-RC-VALIDATION-PLAN-v0.1.md",
    rcValidationPlanLines(),
  );
  writeDoc(
    "governance/releases/SOLOCREW-V1.1-RC-TAG-AND-RELEASE-DECISION-DRAFT-v0.1.md",
    rcTagDraftLines(),
  );
  writeDoc(
    "governance/releases/SOLOCREW-V1.1-RC-RELEASE-NOTES-DRAFT-v0.1.md",
    rcReleaseNotesLines(),
  );
  writeDoc(
    "governance/releases/SOLOCREW-V1.1-RC-SEAL-PREPARATION-PLAN-v0.1.md",
    rcSealPreparationLines(),
  );
  writeDoc(
    "governance/releases/SOLOCREW-V1.1-RC-VALIDATION-EXECUTION-CHECKLIST-v0.1.md",
    rcValidationChecklistLines(),
  );
}

main();
