# SoloCrew V2.0 Tri-Repo Runtime Readiness Crosswalk v0.1

## 1. Document Control

- `doc_id`: `SOLOCREW-V2.0-TRI-REPO-RUNTIME-READINESS-CROSSWALK-v0.1`
- `status`: `Research Baseline`
- `authority_order`: `MPLP -> Cognitive_OS -> Projection -> SoloCrew`
- `scope`:
  - map SoloCrew V2.0 product requirements to actual tri-repo truth
  - identify exact runtime, projection, and product gaps
  - recommend the next development-wave order without changing code
- `non_goals`:
  - no MPLP change
  - no Cognitive_OS change
  - no runtime implementation
  - no new product requirement invention beyond the stated SoloCrew direction
  - no provider/channel execution claim
  - no GA, certification, or autonomous-company claim
- `trace_tags`:
  - `tri_repo_crosswalk`
  - `v2_0_readiness`
  - `runtime_glue`
  - `projection_contract`
  - `multi_cell_persistence`
  - `learning`
  - `drift`
  - `bounded_execution`

## 2. Executive Summary

Concise result:

- SoloCrew V2.0 is not ready for direct product implementation from the current repo state.
- MPLP is not the primary blocker. MPLP already supplies the protocol-side schemas, event families, confirm/trace surfaces, and learning sample families needed for bounded runtime work.
- Cognitive_OS already contains a real first-pass runtime substrate for AEL, VSL, PSG, learning, and drift handling, but it remains intentionally narrow, runtime-private, and only partly consumable by a downstream product.
- SoloCrew already contains bounded product shells for founder intake, packet revision, continuity UX, action preparation, execution boundary, multi-cell inspection, and Secretary beta handoff/review. It does not yet contain the founder-dashboard and cell-operations-loop product required for V2.0.

Current readiness judgment:

- `V2_0_BLOCKED_PENDING_COGNITIVE_OS_REALIZATION`

Why blocked:

- the earliest hard blocker is not MPLP; it is the lack of enough neutral, runtime-owned, projection-safe state/action/learning/drift summaries in Cognitive_OS for SoloCrew to consume into a V2.0 operating loop
- after that blocker is cleared, SoloCrew still needs a dedicated projection-contract wave before app work should begin

Top 5 gaps:

1. No neutral runtime summary surface yet combines multi-scope priorities, pending reviews, recent artifacts, learned preferences, and suggested next actions for a founder dashboard.
2. No runtime-backed cell-operations surface yet combines tasks, artifacts, actions, memory, learning, metrics, review, and history in one projection-safe contract.
3. No real bounded AIGC artifact-generation path exists yet; current SoloCrew truth stops at template seeds, packet/review shells, display-only prepared-action/execution-boundary cards, and one local fake bounded-motion handler.
4. No accepted neutral action-class taxonomy exists for A0/A1/A2/A3/A4-style bounded execution classes.
5. No full persistent multi-cell operating loop exists yet across cell scope, task history, artifact history, review history, learning isolation, and restart/resume.

Top 5 existing reusable assets:

1. MPLP already defines confirm/trace schemas, runtime/graph/pipeline event families, and learning sample families including `intent_resolution` and `delta_impact`.
2. Cognitive_OS already implements a deterministic runtime skeleton: `Form -> Place -> Activate -> Confirm -> Trace -> Reconcile -> Consolidate`.
3. Cognitive_OS already implements first-pass VSL continuity, PSG graph ingestion, delta-drift impact assessment, and governed learning candidate capture.
4. Cognitive_OS already implements projection-safe summary/revision/continuity/pending-review contracts and validations, plus prepared-action and execution-boundary scaffolds.
5. SoloCrew already has bounded product surfaces for founder intake, packet revision, continuity/local-history UX, single-cell console, multi-cell inspection, Secretary beta handoff/review shells, sqlite-backed session reload, and preference writeback visibility.

Projection-layer note:

- no separate local Projection repository exists in this wave
- the effective `Projection` truth surface is the internal `projection/` layer inside the SoloCrew repo

## 3. Repo Truth Snapshot

Path discovery result:

- authoritative MPLP repo used for this wave: `/Users/jasonwang/Documents/AI_Dev/Coregentis/MPLP-Protocol`
- alternate local path `/Users/jasonwang/Documents/AI_Dev/V1.0_release` exists, but its checked-out branch/remotes identify it as a prerelease workspace rather than the authoritative `origin/main` MPLP-Protocol repo for this audit

| Repo | Repo path | Branch | Local HEAD | Remote HEAD | HEAD == origin/main? | Clean status before changes |
| --- | --- | --- | --- | --- | --- | --- |
| MPLP-Protocol | `/Users/jasonwang/Documents/AI_Dev/Coregentis/MPLP-Protocol` | `main` | `4d320e727b7ced4dcde9b6f9fd7fa08cf64b0242` | `4d320e727b7ced4dcde9b6f9fd7fa08cf64b0242` | `YES` | `clean` |
| Cognitive_OS | `/Users/jasonwang/Documents/AI_Dev/Coregentis/Cognitive_OS` | `main` | `013b1ff01a71c44554e31206f193118664348f36` | `013b1ff01a71c44554e31206f193118664348f36` | `YES` | `clean` |
| SoloCrew | `/Users/jasonwang/Documents/AI_Dev/Coregentis/SoloCrew` | `main` | `1b0b15f8e00318b9439bcb2b754877bd4896b681` | `1b0b15f8e00318b9439bcb2b754877bd4896b681` | `YES` | `clean` |

Relevant paths inspected:

- MPLP-Protocol:
  - `docs/docs/guides/runtime/ael.md`
  - `docs/docs/guides/runtime/vsl.md`
  - `docs/docs/guides/runtime/psg.md`
  - `docs/docs/guides/runtime/runtime-glue-overview.md`
  - `docs/docs/guides/runtime/drift-and-rollback.md`
  - `docs/docs/specification/observability/event-taxonomy.md`
  - `docs/docs/guides/examples/learning-notes/learning-overview.md`
  - `schemas/v2/common/learning-sample.schema.json`
  - `schemas/v2/learning/mplp-learning-sample-intent.schema.json`
  - `schemas/v2/learning/mplp-learning-sample-delta.schema.json`
  - `schemas/v2/events/mplp-runtime-execution-event.schema.json`
  - `schemas/v2/mplp-confirm.schema.json`
  - `schemas/v2/mplp-trace.schema.json`
  - `schemas/v2/taxonomy/learning-taxonomy.yaml`
  - `packages/npm/runtime-minimal/README.md`

- Cognitive_OS:
  - `README.md`
  - `runtime/README.md`
  - `runtime/core/README.md`
  - `runtime/core/{registry-service,binding-service,form-service,memory-service,activation-service,ael-service,policy-service,confirm-service,trace-service,reconcile-service,consolidation-service,vsl-service,psg-service,runtime-orchestrator,projection-types,projection-service,runtime-types}.ts`
  - `runtime/core/{prepared-action-types,execution-boundary-types}.ts`
  - `runtime/execution/action-dispatcher.ts`
  - `runtime/learning/{objective-anchor,correction-capture,preference-writeback}.ts`
  - `runtime/state/state-store-port.ts`
  - `registry/coregentis-object-registry.v0.yaml`
  - `bindings/mplp-coregentis-binding-matrix.v0.yaml`
  - `schemas/coregentis/v0/objects/{delta-intent,drift-record,learning-candidate}.schema.json`
  - `schemas/coregentis/v0/workforce/{preference-profile,cell-runtime-scope,cell-summary-runtime-record}.schema.json`
  - `tests/runtime/{delta-drift-impact-first-pass,governed-learning-first-pass,projection-safe-contract}.test.mjs`
  - `governance/audits/CGOS-CROSS-REPO-CONSUMPTION-AND-NON-PROMOTION-v0.1.md`
  - `governance/research/CGOS-PROJECTION-HANDOFF-SURFACE-INVENTORY-v0.1.md`
  - `governance/audits/CGOS-MPLP-RUNTIME-SEMANTIC-CROSSWALK-AND-VSL-BINDING-RATIFICATION-v0.1.md`

- SoloCrew:
  - `README.md`
  - `CHANGELOG.md`
  - `governance/baselines/SOLOCREW-VERSION-ROADMAP-v0.1.md`
  - `governance/baselines/SOLOCREW-V1.8-PLANNING-BASELINE-v0.1.md`
  - `governance/releases/SOLOCREW-V1.8-STABLE-SEAL-EXECUTION-POST-RELEASE-RECORD-v0.1.md`
  - `runtime-imports/cognitive-runtime.ts`
  - `app/pages/{founder-request-intake,multi-cell-foundation-overview,cell-detail,continuity-inspection,portfolio-secretary,single-cell-operator-console}.ts`
  - `app/shell/{create-runtime-session,create-baseline-shell,create-v1-1-intake-to-packet-page-model,create-v1-2-packet-revision-page-model,create-v1-7-prepared-action-page-model,create-v1-8-execution-boundary-page-model,single-cell-operator-correction-apply,single-cell-correction-review-interaction}.ts`
  - `projection/assembly/{seed-baseline,flow-assembly,founder-request-intake-to-packet-flow,packet-revision-flow,cell-summary-projection,cell-detail-projection,continuity-inspection,portfolio-secretary-shell,secretary-handoff-staging,secretary-handoff-review-packet,dev-delivery-pack-template,runtime-dependent-downstream-truth,platform-delivery-readiness}.ts`
  - `projection/adapters/{cell-summary-runtime-adapter,memory-summary-adapter,lifecycle-continuity-consumption-adapter,session-continuity-ux-adapter,v1-7-prepared-action-adapter,v1-8-execution-boundary-adapter}.ts`
  - `projection/contracts/{cell-summary-projection,cell-detail-projection,continuity-inspection,lifecycle-continuity-consumption,session-continuity-ux,v1-7-prepared-action,v1-8-execution-boundary,founder-request-exception-packet,founder-request-exception-state-evaluation,founder-request-exception-state-machine-contract,founder-request-exception-state-machine-reducer,platform-delivery-readiness}.ts`
  - `tests/app/{sqlite-roundtrip,sqlite-single-cell-operator-correction-apply-reload,sqlite-bounded-motion-failure-roundtrip,create-v1-2-packet-revision-page-model}.test.ts`
  - `tests/projection/{v1-7-prepared-action-adapter,v1-8-execution-boundary-adapter,platform-delivery-readiness}.test.ts`

Search checks performed before declaring absence:

- SoloCrew founder-dashboard / cell-operations-panel file search: no file matches for `dashboard`, `founder-dashboard`, or `cell-operations`
- SoloCrew starter-cell vertical search: no file matches for `e-commerce`, `ecommerce`, `personal media`, or `personal media cell`
- SoloCrew artifact-workflow search: no file matches for product-listing, calendar-suggestion, campaign, or similar artifact-generation surfaces

## 4. MPLP Existing Support

### 4.1 AEL

Repo truth:

- MPLP treats AEL as an informative runtime execution concept, not as a protocol-native top-level object.

Evidence:

- `docs/docs/guides/runtime/ael.md:15-19,23-25,47-51,78-79`
  - AEL is described as a draft runtime execution abstraction and explicitly not a protocol schema object.
- `schemas/v2/events/mplp-runtime-execution-event.schema.json:5-6,14-16`
  - MPLP does define `runtime_execution` evidence, which supports runtime observability without turning AEL into protocol law.
- `packages/npm/runtime-minimal/README.md:8-15,27-33`
  - the published package surface stays minimal and explicitly avoids claiming a full execution runtime.

Gap class:

- `no MPLP change needed`

V2.0 implication:

- SoloCrew V2.0 can rely on MPLP for runtime evidence compatibility, but AEL realization must remain in Cognitive_OS/runtime code.

### 4.2 VSL

Repo truth:

- MPLP treats VSL as an informative runtime persistence abstraction, not as a top-level protocol object.

Evidence:

- `docs/docs/guides/runtime/vsl.md:15-18,22-23,43-49,77-78`
  - VSL is a runtime persistence abstraction and not itself a protocol truth source.
- `docs/docs/guides/runtime/drift-and-rollback.md:24-31,98-105,107-123`
  - rollback/snapshot use is runtime guidance, not protocol-mandated storage law.

Gap class:

- `no MPLP change needed`

V2.0 implication:

- V2.0 persistence/resume work should happen as Cognitive_OS runtime realization plus product-safe projection, not as MPLP schema work.

### 4.3 PSG

Repo truth:

- MPLP treats PSG as an informative runtime logical state model, not as a protocol-native schema object.

Evidence:

- `docs/docs/guides/runtime/psg.md:17-20,24-25,48-55,82-88,99-100`
  - PSG is a runtime concept and logical state model, not a separate schema object.
- `schemas/v2/events/mplp-graph-update-event.schema.json`
  - MPLP defines graph-update evidence rather than a PSG object schema.
- `docs/docs/specification/observability/event-taxonomy.md:55-63`
  - `graph_update` is required; `delta_intent` and `impact_analysis` exist as event families.

Gap class:

- `no MPLP change needed`

V2.0 implication:

- SoloCrew V2.0 needs graph-derived runtime summaries from Cognitive_OS, not PSG promotion into MPLP.

### 4.4 Runtime Glue

Repo truth:

- runtime glue is a guide-level downstream concept only.

Evidence:

- `docs/docs/guides/runtime/runtime-glue-overview.md:16-21,45-50,54-60,78-79`
  - runtime glue is guide-only and does not freeze AEL, VSL, PSG, or drift algorithms as protocol truth.

Gap class:

- `no MPLP change needed`

### 4.5 Learning / LearningSample / Learning Taxonomy

Repo truth:

- MPLP already owns learning sample shape, families, and collection-point taxonomy.
- MPLP does not mandate runtime emission, runtime storage, model training, or a consolidation engine.

Evidence:

- `schemas/v2/common/learning-sample.schema.json:18-45,127-158`
  - generic learning sample structure includes `intent_before`, `delta_intents`, graph snapshots, user feedback, and governance decisions.
- `schemas/v2/learning/mplp-learning-sample-intent.schema.json:14-17,18-44,65-97`
  - `intent_resolution` sample family exists.
- `schemas/v2/learning/mplp-learning-sample-delta.schema.json:14-17,18-51,78-113`
  - `delta_impact` sample family exists with impact scope, compensation, and rollback fields.
- `schemas/v2/taxonomy/learning-taxonomy.yaml:41-109`
  - taxonomy freezes sample families and collection points.
- `docs/docs/guides/examples/learning-notes/learning-overview.md:62-71,158-166,191-199`
  - learning sample families are defined; runtime emission is recommended but optional; storage/training is out of scope.
- `docs/docs/specification/architecture/cross-cutting-kernel-duties/learning-feedback.md:21-25`
  - learning feedback is a normative cross-cutting duty, but implementation details remain outside protocol prescription.

Gap class:

- `no MPLP change needed`

Secondary note:

- `future candidate/backlog` only if a later wave wants richer protocol-facing export of runtime-private learning objects beyond the current learning sample families.

### 4.6 Delta Intent / Intent Drift / Drift / Conflict

Repo truth:

- MPLP supports `delta_intent`, `impact_analysis`, and compensation-related evidence families.
- MPLP does not define top-level protocol-native `delta-intent`, `drift-record`, or `conflict-case` objects.
- Drift is documented as a runtime-observed discrepancy.

Evidence:

- `docs/docs/specification/observability/event-taxonomy.md:57-64`
  - `graph_update` and `pipeline_stage` are required; `delta_intent`, `impact_analysis`, and `compensation_plan` exist as optional event families.
- `schemas/v2/common/learning-sample.schema.json:28-35`
  - generic learning sample includes `delta_intents`.
- `schemas/v2/learning/mplp-learning-sample-delta.schema.json:21-39,81-107`
  - MPLP already has delta-impact capture vocabulary.
- `docs/docs/guides/runtime/drift-and-rollback.md:19-20,53-60,76-89,151-160`
  - drift is runtime guidance; MPLP does not mint canonical drift events here.

Gap class:

- `no MPLP change needed`

Secondary note:

- `guide/profile clarification candidate` only if a later wave wants a stronger normative profile around change-handling evidence and recommended event-family use.

### 4.7 Confirm / Trace / Evidence / Runtime Events

Repo truth:

- MPLP already has confirm and trace module schemas and event-family truth strong enough for V2.0 bounded runtime consumption.

Evidence:

- `schemas/v2/mplp-confirm.schema.json:37-89,186-220`
  - confirm requests and decision records are already defined.
- `schemas/v2/mplp-trace.schema.json:37-87,164-214`
  - trace, segments, statuses, and related events are already defined.
- `docs/docs/guides/runtime/runtime-capability-matrix.md:21-38`
  - runtime evidence obligations already point at runtime execution, trace, tool, and file-update schemas.

Gap class:

- `no MPLP change needed`

### 4.8 MPLP Conclusion

- No proven MPLP schema gap blocks SoloCrew V2.0 in this wave.
- The main required work is runtime realization and downstream projection.
- No separate MPLP authorization is currently justified by repo evidence.

## 5. Cognitive_OS Existing Support

### 5.1 Capability Classification

| Capability | Current level | Evidence | V2.0 reading |
| --- | --- | --- | --- |
| Runtime skeleton | `already implemented` | `runtime/README.md:45-68`; `runtime/core/runtime-orchestrator.ts:378-1365` | deterministic minimal loop exists |
| `RegistryService` | `already implemented` | `runtime/core/registry-service.ts:11-23,25-63` | frozen registry truth is consumable |
| `BindingService` | `already implemented` | `runtime/core/binding-service.ts:35-51,53-138` | binding/export planning exists |
| `FormService` | `already implemented` | `runtime/core/form-service.ts:26-42,72-177` | forms `intent` and `delta-intent` deterministically |
| `MemoryService` | `already implemented` | `runtime/core/memory-service.ts:36-52,79-161` | working/episodic/semantic objects are created |
| `ActivationService` | `already implemented` | `runtime/core/activation-service.ts:21-29,46-100` | activation-signal and action-unit creation exists |
| `PolicyService` | `already implemented` | `runtime/core/policy-service.ts:21-25,39-80` | minimal gating exists, but policy remains narrow |
| `ConfirmService` | `already implemented` | `runtime/core/confirm-service.ts:18-26,46-88` | confirm-gate create/resolve path exists |
| `TraceService` | `already implemented` | `runtime/core/trace-service.ts:21-29,49-102` | trace-evidence and decision-record creation exists |
| `ReconcileService` | `already implemented` | `runtime/core/reconcile-service.ts:47-63,89-176,239-276` | first-pass delta-drift/conflict assessment exists |
| `ConsolidationService` | `already implemented` | `runtime/core/consolidation-service.ts:64-76,104-230,233-314` | governed-learning candidate capture exists |
| `RuntimeOrchestrator` | `already implemented` | `runtime/core/runtime-orchestrator.ts:92-133,378-1365` | full minimal deterministic path exists |
| AEL realization | `already implemented` | `runtime/core/ael-service.ts:20-24,36-91`; `runtime/core/README.md:130-141` | first-pass governed activation only |
| VSL realization | `already implemented` | `runtime/core/vsl-service.ts:20-30,99-196`; `runtime/core/README.md:135,140-141` | first-pass continuity checkpointing only |
| PSG realization | `already implemented` | `runtime/core/psg-service.ts:42-55,467-610`; `runtime/core/README.md:134-141` | first-pass project graph only |
| Learning / consolidation | `already implemented` | `runtime/core/consolidation-service.ts:151-230`; `tests/runtime/governed-learning-first-pass.test.mjs:168-275` | suggestion-only; no autonomous mutation/export |
| Drift / Delta Intent / Conflict | `already implemented` | `schemas/.../delta-intent.schema.json`; `schemas/.../drift-record.schema.json`; `tests/runtime/delta-drift-impact-first-pass.test.mjs:149-260` | first-pass change path only |
| Projection-safe summary / revision / continuity / pending-review | `already implemented` | `runtime/core/projection-types.ts:1-239`; `runtime/core/projection-service.ts:457-759`; `tests/runtime/projection-safe-contract.test.mjs:176-320` | downstream-safe building blocks exist |
| Prepared-action surface | `interface/skeleton only` | `runtime/core/prepared-action-types.ts:1-28,78-150`; `runtime/README.md:176-181` | display-safe scaffold only |
| Execution-boundary surface | `interface/skeleton only` | `runtime/core/execution-boundary-types.ts:1-27,69-126`; `runtime/README.md:183-191` | display-safe scaffold only |
| Bounded handler-routing contract | `already implemented` | `runtime/execution/action-dispatcher.ts:16-32,110-169`; `governance/research/CGOS-PROJECTION-HANDOFF-SURFACE-INVENTORY-v0.1.md:129-144` | bounded handler-routing exists |
| Objective anchor / correction capture / preference writeback | `already implemented` | `runtime/learning/{objective-anchor,correction-capture,preference-writeback}.ts` | bounded learning-adjacent surfaces exist |
| Workforce state stores | `already implemented` | `runtime/state/state-store-port.ts:6-35` | persists `agent-group`, `agent-worker`, `role-profile`, `objective`, `work-item`, `review-cycle`, `memory-profile`, `preference-profile` |
| Multi-scope runtime-store coverage | `missing` | `runtime/state/state-store-port.ts:6-15` excludes `cell-runtime-scope`, `cell-summary-runtime-record`, and management-family records | V2.0 multi-cell persistence is not runtime-backed enough yet |
| Management-family runtime generation | `documented but not implemented` | schemas/registry/binding exist for `cell-runtime-scope`, `cell-summary-runtime-record`, `management-directive-record`, `delivery-return-record`, `approval-request-record`, but no dedicated runtime store/service layer was found | SoloCrew currently consumes these as upstream inputs, not as a live runtime loop |
| Provider bridge / real artifact execution | `missing` | `runtime/README.md:136-153`; `governance/research/CGOS-PROJECTION-HANDOFF-SURFACE-INVENTORY-v0.1.md:208-219` | real bounded AIGC generation is not ready upstream |
| Raw runtime run result safety | `available but not projection-safe` | `runtime/core/runtime-orchestrator.ts:1326-1365` returns created objects, store snapshots, graph state, continuity state | SoloCrew should not bind app/UI directly to this raw surface |

### 5.2 Neutral Runtime Reading

Important upstream boundary:

- Cognitive_OS is the neutral mother-runtime. Future recommendations in this document therefore use neutral terms such as `OperationalUnit`, `RuntimeScope`, `WorkScope`, `RuntimeActionClass`, and `RuntimeStateProjection`.
- Actual repo truth still contains the concrete current object names `cell-runtime-scope` and `cell-summary-runtime-record`. Those file names are reported as evidence, not promoted as future-neutral naming.

### 5.3 Key Cognitive_OS Findings

1. AEL, VSL, PSG, learning, and drift are no longer docs-only; first-pass runtime realization is already in code.
2. The current runtime is still intentionally narrow: deterministic, fixture-driven, non-provider, and below full runtime completion.
3. The state-store layer is materially narrower than V2.0 needs because the dedicated workforce store excludes multi-scope runtime and management-family records.
4. Projection-safe summary/revision/continuity surfaces are real and reusable; prepared-action and execution-boundary remain scaffold-only.
5. The orchestrator is suitable as bounded runtime truth, but its direct output is not yet a safe product-consumption API.

## 6. SoloCrew Existing Support

### 6.1 Version-Line Truth

Evidence preserving current version-line facts:

- `README.md:206-213`
  - SoloCrew V1.8 Stable is released as bounded, display-oriented, non-executing, non-approving, non-dispatching, non-provider, non-queueing, and non-authoritative.
- `governance/releases/SOLOCREW-V1.8-STABLE-SEAL-EXECUTION-POST-RELEASE-RECORD-v0.1.md:20-24,47-60,129-149`
  - V1.8 Stable is closed and post-release verified; non-scope includes provider/channel execution, approve/reject/dispatch/execute, queue implementation, autonomous company operation, protocol certification, and GA.
- `governance/baselines/SOLOCREW-VERSION-ROADMAP-v0.1.md:212-223`
  - V1.8 stable is closed; future V1.9 remains `Execution RC Hardening`; future V2.0 remains `First Usable SoloCrew Operating Loop`.

### 6.2 Product-Surface Classification

| SoloCrew support area | Classification | Evidence |
| --- | --- | --- |
| Founder request intake | `implemented` | `app/pages/founder-request-intake-page.ts:29-70,131-169`; `app/shell/founder-request-intake-contract.ts:13-37` |
| Founder dashboard equivalent | `absent` | no file match for `dashboard` or `founder-dashboard`; existing founder surface is intake-only, not a dashboard |
| Single-cell operator console | `implemented` | `app/pages/single-cell-operator-console-page.ts:86-130`; `app/shell/single-cell-operator-console-shell-contract.ts:155-187` |
| Cell operations panel matching V2.0 fields | `bounded display only` | console covers delivery/objective/task-focus/correction/continuity/readiness, but not a unified operations panel for artifacts, learning, metrics, review, and history |
| Multi-cell foundation overview | `implemented` | `app/pages/multi-cell-foundation-overview-page.ts:10-39,65-137`; `projection/assembly/cell-summary-projection.ts:38-94` |
| Per-cell inspection | `implemented` | `app/pages/cell-detail-page.ts:5-35,46-149`; `projection/assembly/cell-detail-projection.ts:68-196` |
| Continuity inspection | `implemented` | `app/pages/continuity-inspection-page.ts:5-33,44-120`; `projection/assembly/continuity-inspection.ts:103-163` |
| Portfolio / Secretary layer | `implemented` | `README.md:262-290`; `app/pages/portfolio-secretary-page.ts:8-45,72-240`; `projection/assembly/portfolio-secretary-shell.ts:311-360` |
| Secretary handoff staging / review packet / revision loop | `implemented` | `projection/assembly/{secretary-handoff-staging,secretary-handoff-review-packet,packet-revision-flow}.ts` |
| Packet / review / revision loop | `implemented` | `projection/assembly/founder-request-intake-to-packet-flow.ts:104-162`; `projection/assembly/packet-revision-flow.ts:164-221`; `app/shell/create-v1-2-packet-revision-page-model.ts:231-270` |
| Session continuity / local history UX | `implemented` | `projection/contracts/session-continuity-ux-contract.ts:11-71`; `projection/adapters/session-continuity-ux-adapter.ts`; `tests/app/create-v1-2-packet-revision-page-model.test.ts:274-347` |
| Action preparation | `implemented` | `projection/contracts/v1-7-prepared-action-contract.ts:30-69`; `app/shell/create-v1-7-prepared-action-page-model.ts:19-60` |
| Execution boundary | `implemented` | `projection/contracts/v1-8-execution-boundary-contract.ts:22-63`; `app/shell/create-v1-8-execution-boundary-page-model.ts:20-58` |
| Development starter-cell equivalent | `mock / fixture only` | `projection/assembly/dev-delivery-pack-template.ts:12-53` is a template seed only |
| E-commerce starter-cell equivalent | `absent` | no file match for `e-commerce`, `ecommerce`, `product listing`, or `campaign` |
| Personal media starter-cell equivalent | `absent` | no file match for `personal media`, article/calendar/tag workflows, or equivalent page/contract surfaces |
| Persisted task state | `implemented` | `app/shell/create-runtime-session.ts:28-43`; `tests/app/sqlite-bounded-motion-failure-roundtrip.test.ts:129-153` |
| Persisted memory / preference state | `implemented` | `create-runtime-session.ts:33-42`; `tests/app/sqlite-roundtrip.test.ts:11-103`; `seed-baseline.ts:438-494` |
| Persisted artifact state | `absent` | no artifact-history store or artifact record surface found; local fake motion only returns an in-memory `bounded-motion-note` output |
| User preference learning | `implemented` | `runtime-imports/cognitive-runtime.ts:61-86`; `single-cell-operator-correction-apply.ts:285-320`; `tests/app/sqlite-roundtrip.test.ts:50-95` |
| Cell-scoped learning | `absent` | preference writeback is project-facing in current SoloCrew use; no cell-scoped learning view/contract/search match found |
| Drift / change handling | `bounded display only` | founder-request exception posture, reducer, packet revision, and staging/review packet summaries exist; no generalized cell/company drift loop exists |
| Action execution classes | `absent` | no file match for `A0`, `A1`, `A2`, `A3`, `A4`, or `action class` |
| Real AIGC artifact generation | `mock / fixture only` | `projection/assembly/flow-assembly.ts:266-305` registers a local fake motion handler; no provider bridge or product artifact workflows found |
| Tests | `implemented` | release record says 343 tests in V1.8 stable record; repo contains broad `tests/app/` and `tests/projection/` coverage for current bounded surfaces |

### 6.3 SoloCrew-Specific Findings

1. SoloCrew already exceeds a raw chat surface because it has persistent shell state, review loops, continuity/local-history UX, bounded multi-cell inspection, and Secretary beta handoff/review packaging.
2. SoloCrew currently consumes only a bounded subset of Cognitive_OS through `runtime-imports/cognitive-runtime.ts:1-130`: lifecycle, state stores, learning helpers, and bounded handler-routing contracts. It does not currently consume Cognitive_OS runtime-core AEL/VSL/PSG/projection-service outputs directly.
3. SoloCrew persistence today is strongest for seeded baseline workforce/objective/memory/preference state and sqlite reload, not for artifact history or multi-cell operating-loop state.
4. User-preference learning is real but narrow: correction capture plus preference writeback plus summary surfacing, not cell-scoped or cross-cell learning governance.
5. The repo contains bounded product shells for V1.1 through V1.8 and historical `v0.4`/`v0.5` lines, but it still lacks the integrated V2.0 founder dashboard and cell-operations product loop.

## 7. V2.0 Product Requirement Crosswalk

| V2.0 requirement | User-facing value | MPLP existing support | Cognitive_OS existing support | Cognitive_OS gap | Projection DTO needed | SoloCrew current support | SoloCrew gap | Dependency order | Readiness status | Recommended next wave |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. Founder Dashboard | one place to see multi-cell priorities, reviews, blocked work, artifacts, preferences, and next actions | Confirm/Trace schemas; runtime/graph/pipeline events; learning sample shapes; no dashboard concept | cell/workforce schemas, first-pass continuity/pending-review projections, learning candidate capture, preference writeback | no neutral runtime summary that combines priorities, reviews, artifacts, preferences, and next actions across scopes | `FounderDashboardProjection`, `FounderDashboardCellCard`, `FounderDashboardPendingReviewSummary`, `FounderDashboardRecentArtifactSummary`, `FounderDashboardLearnedPreferenceSummary`, `FounderDashboardSuggestedNextActionSummary` | multi-cell overview, continuity inspection, Secretary shelves | no unified founder dashboard page; no recent-artifact shelf; no learned-preference shelf; no suggested-next-action shelf | Cognitive_OS summary surface -> SoloCrew projection contract -> SoloCrew app page | `NEEDS_PROJECTION_CONTRACT` | Wave 3 then Wave 4 |
| 2. Cell Operations Panel | per-cell operating view for objective, tasks, artifacts, actions, memory, learning, metrics, review, history | confirm/trace/evidence/event families; no product panel concept | objective/work-item/memory/preference stores; VSL/PSG first pass; drift and learning first pass | no neutral runtime-owned per-scope panel summary; no artifact/history summary surface; no metric summary surface | `CellOperationsPanelProjection`, `CellTaskSummaryView`, `CellArtifactSummaryView`, `CellActionSummaryView`, `CellMemorySummaryView`, `CellLearningSummaryView`, `CellMetricSummaryView`, `CellHistorySummaryView` | single-cell console, cell detail, continuity inspection | current pages are split and bounded; artifacts/learning/metrics/history are incomplete | Cognitive_OS runtime summary -> SoloCrew projection contract -> SoloCrew app panel | `NEEDS_PROJECTION_CONTRACT` | Wave 3 then Wave 4 |
| 3. Starter Cells | faster time-to-value for Development, E-commerce, Personal Media | MPLP is neutral and does not define product starter cells | neutral workforce/cell schemas exist; no starter-cell manifests or artifact workflow runtime | no runtime-owned starter-cell manifest/workflow truth; no provider bridge for real artifact generation | `StarterCellCatalogView`, `StarterCellManifestView`, `StarterCellWorkflowSummaryView` | one dev-delivery template seed only | no e-commerce cell; no personal-media cell; dev cell is template-only, not an operating loop | Cognitive_OS runtime workflow substrate -> SoloCrew projection/app templates | `BLOCKED_BY_UPSTREAM` | Wave 5 |
| 4. Persistent multi-Cell state | restart/resume with preserved cell, task, artifact, review, and preference history | MPLP supports trace/evidence and learning shapes but not runtime persistence law | sqlite/in-memory workforce state stores; objective anchor; preference writeback; VSL continuity first pass | dedicated state store currently excludes `cell-runtime-scope`, `cell-summary-runtime-record`, and management-family records; no artifact history model | `MultiCellContinuityProjection`, `CellResumeSummaryView`, `ArtifactHistoryView`, `ReviewHistoryView` | sqlite roundtrip for baseline shell; continuity/local-history views | no runtime-backed multi-cell persistence loop; no artifact history persistence | Cognitive_OS state/VSL realization -> projection contract -> SoloCrew app | `NEEDS_COGNITIVE_OS_RUNTIME_REALIZATION` | Wave 2 |
| 5. Learning | preferences, cell-scoped learning, failure patterns, artifact feedback, non-pollution | learning sample schemas/taxonomy already exist | learning-candidate capture, correction capture, preference writeback, governed-learning first pass | no cell-scoped isolation/promotion model; no cross-scope non-pollution acceptance tests; no artifact-feedback learning loop | `LearningSummaryProjection`, `CellLearningSummaryView`, `GlobalPreferencePromotionCandidateView` | project-level preference continuity and correction/apply visibility | no cell-scoped learning view; no cross-cell promotion candidate; no artifact-feedback learning surface | Cognitive_OS learning realization -> projection contract -> SoloCrew UI | `NEEDS_COGNITIVE_OS_RUNTIME_REALIZATION` | Wave 2 then Wave 3 |
| 6. Intent drift / change handling | explain impact and recommend continue/clarify/branch/revise | delta-intent and impact-analysis event families; delta-impact learning sample; drift guidance | delta-intent schema; drift/conflict records; delta-drift assessment; projection-safe revision/continuity surfaces | no neutral product-consumption DTO for generalized drift summary/recommendation outside the current minimal change path | `IntentDriftSummaryView`, `IntentChangeRecommendationView`, `ImpactSummaryView` | founder-request exception packet, packet revision loop, staging/review packet posture | current handling is founder-request-lane specific and mostly display/posture oriented | Cognitive_OS drift summary -> SoloCrew projection contract -> extend product flows | `NEEDS_PROJECTION_CONTRACT` | Wave 3 |
| 7. Action classes | bounded execution ladder from local auto updates to forbidden actions | MPLP does not define SoloCrew action classes | bounded handler-routing contracts, AEL first pass, prepared-action/execution-boundary scaffolds | no neutral `RuntimeActionClass` taxonomy, no classification engine, no A0/A1/A2/A3/A4 gating tests | `RuntimeActionClassView`, `ActionClassPolicySummaryView` | prepared-action and execution-boundary cards | no action-class taxonomy in SoloCrew or upstream; no policy-backed classification | Cognitive_OS action-class contract/policy -> projection contract -> SoloCrew app | `NEEDS_COGNITIVE_OS_RUNTIME_REALIZATION` | Wave 2 |
| 8. Real AIGC artifact generation | produce real dev/media/commerce drafts, not only governance/display shells | MPLP supports evidence/learning shapes; no provider/runtime implementation | bounded handler-routing contract exists; provider bridge intentionally absent | no provider-neutral artifact-generation handlers, no artifact summary/state model, no output classification for draft artifacts | `ArtifactGenerationRequestView`, `ArtifactSummaryView`, `ArtifactFeedbackView` | dev-delivery template seed; local fake bounded-motion note | no real product artifact workflows; no e-commerce/media workflows; no artifact history | Cognitive_OS bounded execution realization -> SoloCrew starter-cell workflows | `BLOCKED_BY_UPSTREAM` | Wave 5 |
| 9. Operating cadence | daily check-in, scheduled proposals, reminders, blocked escalation, background planning | MPLP confirm/trace/events can record runtime actions but does not define product cadence | review-cycle schema; lifecycle continuity projections; objective anchor; worker lifecycle | no scheduler/cadence engine, no reminder/background planning summaries, no multi-cell escalation summaries | `OperatingCadenceProjection`, `DailyCheckInView`, `ScheduledProposalSummaryView`, `BlockedEscalationSummaryView` | review strip, review-cycle seed, continuity/pending-review visibility | no daily check-in surface; no scheduler/reminder/background planning cycle | Cognitive_OS cadence realization -> projection contract -> SoloCrew app | `NEEDS_COGNITIVE_OS_RUNTIME_REALIZATION` | Wave 2 then Wave 4 |
| 10. Product differentiation | move from bounded chat-adjacent shells toward persistent one-person-company operation | MPLP gives protocol/evidence ground truth but no product-parity definition | multi-scope/runtime-private schemas and bounded runtime substrate already exist | no accepted parity rubric for "first usable operating loop" and no runtime/app closure pack proving that bar | none required immediately; gate-level rubric first | SoloCrew is already more than raw chat in structure, persistence, review, and multi-cell shells | still below OpenClaw/Hermes capability class because real artifact workflows, action classes, and founder-loop dashboard are missing | define gate -> finish runtime -> finish projection -> finish product | `REQUIRES_SCOPE_DECISION` | Wave 7 gate definition during RC planning |

## 8. AEL / VSL / PSG / Learning / Drift Gap Analysis

### 8.1 AEL

Actual truth:

- MPLP treats AEL as runtime-only.
- Cognitive_OS already has first-pass governed activation and bounded handler-routing.
- SoloCrew currently surfaces AEL-adjacent meaning mainly through prepared-action cards, execution-boundary cards, founder-request exception posture, and one local fake bounded-motion handler.

Gap to V2.0:

- missing neutral runtime-owned action-class taxonomy
- missing bounded artifact-generation handlers and artifact result summaries
- missing product-safe action feed / action history summaries for founder and cell panels

MPLP posture:

- `no MPLP change needed`

### 8.2 VSL

Actual truth:

- MPLP treats VSL as runtime persistence abstraction only.
- Cognitive_OS already checkpoints continuity, replay horizon, rollback horizon, and retention-horizon metadata in `runtime/core/vsl-service.ts`.
- Cognitive_OS dedicated workforce state-store truth currently covers only `agent-group`, `agent-worker`, `role-profile`, `objective`, `work-item`, `review-cycle`, `memory-profile`, and `preference-profile` via `runtime/state/state-store-port.ts:6-35`.

Gap to V2.0:

- no runtime-backed state-store layer yet for multi-scope runtime records and management-family records
- no artifact history persistence model
- rollback remains metadata-only, not a reusable bounded product/runtime restore path

MPLP posture:

- `no MPLP change needed`

### 8.3 PSG

Actual truth:

- MPLP supports graph evidence, not a PSG object.
- Cognitive_OS already ingests runtime objects into a project-scoped graph and derives relations/evidence edges.
- SoloCrew currently consumes graph meaning indirectly through downstream detail/continuity and founder-request exception summaries rather than via a general graph-derived DTO contract.

Gap to V2.0:

- no generic graph-derived task/artifact/action/history projection
- no founder- or cell-facing dependency/history summaries sourced directly from PSG
- no cross-cell semantic rollup

MPLP posture:

- `no MPLP change needed`

### 8.4 Learning

Actual truth:

- MPLP already defines learning sample shapes and families.
- Cognitive_OS already captures learning candidates and bounded preference writeback.
- SoloCrew already shows preference continuity changes, but only in narrow project/baseline paths.

Gap to V2.0:

- no cell-scoped learning isolation and promotion candidate flow
- no artifact-feedback learning surface
- no cross-cell non-pollution acceptance tests
- no founder dashboard learned-preference and learning-summary shelves

MPLP posture:

- `no MPLP change needed`

Secondary note:

- future protocol-shaped learning export remains `future candidate/backlog`, not a blocker for internal V2.0 runtime work

### 8.5 Drift

Actual truth:

- MPLP supports delta/impact evidence vocabulary and treats drift as runtime guidance.
- Cognitive_OS already computes delta-drift impact summaries and can emit drift/conflict records.
- SoloCrew already uses bounded revision/exception/state-evaluation postures in founder-request and handoff lanes.

Gap to V2.0:

- no generalized drift summary DTO for founder dashboard and cell operations panels
- no continuation/clarify/branch/revise recommendation surface outside the current founder-request lane
- no cell/company-level drift acceptance tests

MPLP posture:

- `no MPLP change needed`

### 8.6 Proven MPLP Gap Result

- This wave found no evidence that SoloCrew V2.0 requires an MPLP schema edit before runtime and product work can proceed.
- No `possible schema gap requiring separate authorization` is evidenced by current repo truth.

## 9. Projection Contract Needs

Projection-layer reality:

- there is no separate local Projection repo
- the needed projection-contract wave should therefore land in SoloCrew `projection/contracts/`, `projection/adapters/`, and `projection/assembly/`

Exact DTOs likely needed for V2.0:

| DTO / contract candidate | Purpose | Current upstream input source | Why current contract set is insufficient |
| --- | --- | --- | --- |
| `FounderDashboardProjection` | top-level founder control center | cell summaries, continuity, pending review, learning, action summaries | no current contract spans all of these |
| `FounderDashboardCellCard` | per-cell overview for dashboard | current `CellSummaryProjection` plus richer runtime summaries | current card lacks action/history/learning/artifact fields |
| `FounderDashboardSuggestedNextActionSummary` | explicit next-step recommendations | runtime action/drift/learning outputs | no current next-action contract exists |
| `FounderDashboardRecentArtifactSummary` | recent outputs across cells | future artifact-generation/runtime outputs | no current artifact summary contract exists |
| `FounderDashboardLearnedPreferenceSummary` | visible learned preferences and promotion candidates | preference profiles, learning candidates | no current dashboard-facing learning shelf exists |
| `CellOperationsPanelProjection` | unified per-cell operations panel | objective/work/task/action/memory/learning/history/runtime summary inputs | current single-cell console is split and incomplete |
| `CellArtifactSummaryView` | artifact list/history for one cell | future artifact runtime outputs | current repo has no artifact DTO |
| `CellActionSummaryView` | action feed/history/classification for one cell | AEL/bounded handler-routing/action-class outputs | current repo has no action-class or action-history DTO |
| `CellLearningSummaryView` | visible learning state for one cell | learning candidates, preferences, feedback summaries | current repo has no cell-scoped learning DTO |
| `CellHistorySummaryView` | review/history/drift timeline for one cell | continuity, pending-review, drift summaries | current continuity UX is packet/session oriented, not cell-ops oriented |
| `IntentDriftSummaryView` | impact summary plus continue/clarify/branch/revise recommendation | delta-drift assessment and conflict status | current founder-request exception contract is too lane-specific |
| `RuntimeActionClassView` | product-safe view of A0/A1/A2/A3/A4-like policy class | future neutral Cognitive_OS action-class output | no current action-class contract exists |
| `StarterCellCatalogView` | Development / E-commerce / Personal Media starter-cell chooser | future starter-cell manifests | current repo only has one dev template seed |
| `ArtifactGenerationWorkflowView` | bounded request/result/feedback view for generated artifacts | future bounded artifact-generation runtime | current repo stops at template seed and local fake motion |

Contract rule for Wave 3:

- these DTOs should consume projection-safe or adapter-safe runtime outputs only
- they should not import raw runtime-private objects into app code
- they should not invent new authority over runtime or protocol semantics

## 10. Recommended Next Development Waves

| Wave | Repo | Likely files affected | Implementation type | Tests | Gates | Why not in current wave |
| --- | --- | --- | --- | --- | --- | --- |
| Wave 1 | SoloCrew | `governance/research/SOLOCREW-V2.0-TRI-REPO-RUNTIME-READINESS-CROSSWALK-v0.1.md` | research baseline | document validation only | no code change; no boundary drift | current wave is research-only by request |
| Wave 2 | Cognitive_OS | `runtime/core/{runtime-types,projection-types,projection-service,vsl-service,psg-service,ael-service,reconcile-service,consolidation-service,runtime-orchestrator}.ts`; `runtime/state/{state-store-port,sqlite-state-store}.ts`; `runtime/execution/*`; `tests/runtime/*` | neutral runtime realization for multi-scope persistence, runtime summaries, action-class classification, artifact summary, learning isolation, drift summary | runtime tests for multi-scope persistence, drift, action classes, learning non-pollution, projection-safe outputs | no product naming; no provider/channel overclaim; projection-safe outputs only | blocked by user scope and by no-code rule for this wave |
| Wave 3 | SoloCrew projection layer | `projection/contracts/*`; `projection/adapters/*`; `projection/assembly/*`; `tests/projection/*` | product-safe DTO contract wave over Wave 2 outputs | projection contract/adaptation tests; boundary rejection tests | no raw runtime-private import; no direct-control semantics | should not start before neutral upstream summaries exist |
| Wave 4 | SoloCrew app layer | `app/pages/*`; `app/shell/*`; `tests/app/*` | Founder Dashboard plus Cell Operations Panel consumption path | page-model tests, shell tests, sqlite reload tests | product stays bounded, non-authoritative, and execution-class aware | current repo lacks needed DTO layer |
| Wave 5 | Cognitive_OS + SoloCrew | Cognitive_OS bounded execution/handler files and tests; SoloCrew starter-cell contracts/assembly/app files | starter cells plus real bounded AIGC artifact workflows; Development first, then E-commerce and Personal Media | runtime handler tests; product workflow tests; artifact-summary tests | action-class enforcement; explicit A4 forbidden guard; no payment/trading/purchase/legal action | requires Wave 2 runtime and Wave 3 DTO contract first |
| Wave 6 | Cognitive_OS + SoloCrew | `tests/runtime/*`; `tests/app/*`; `tests/projection/*` | persistence, learning, and drift acceptance hardening | sqlite restart/resume, cross-cell learning isolation, drift recommendation, founder dashboard integration, artifact-history tests | no hidden queue semantics; no raw runtime-private exposure | acceptance should follow implementation, not precede it |
| Wave 7 | SoloCrew | release-readiness docs and final RC gating files only after prior waves pass | V2.0 RC planning and closure | full regression rerun and gate pack | all V2.0 gates below must pass | release planning before runtime/product completion would overclaim |

Recommended immediate next wave:

- `Wave 2` in Cognitive_OS

Reason:

- the strongest blocker is upstream neutral runtime realization, not MPLP
- without it, SoloCrew would have to invent dashboard, action-class, artifact, learning, and multi-cell operating truth locally

## 11. V2.0 Readiness Gates

### 11.1 Product Usability Gate

Pass only if:

- founder can open one dashboard and see multi-cell priorities, pending reviews, blocked work, recent artifacts, learned preferences, and suggested next actions
- each cell has one operations surface with objective, tasks, artifacts, actions, memory, learning, metrics, review, and history

### 11.2 Runtime Consumption Gate

Pass only if:

- SoloCrew app code consumes projection-safe DTOs only
- SoloCrew does not import raw runtime-private Cognitive_OS objects into app/page contracts
- projection-safe omission markers remain explicit

### 11.3 Learning Gate

Pass only if:

- user preference learning is visible
- cell-scoped learning is visible
- failure-pattern and artifact-feedback learning are captured
- cross-cell non-pollution is regression-tested
- optional global preference-promotion candidates remain explicit and bounded

### 11.4 Drift Gate

Pass only if:

- delta/change handling produces a visible impact summary
- the product can recommend continue, clarify, branch, or revise
- these recommendations remain non-executing until explicitly authorized

### 11.5 Execution Gate

Pass only if:

- A0/A1/A2/A3/A4-like runtime action classes are defined and enforced
- A4 forbidden actions remain blocked
- A3 limited external dispatch remains optional and strongly confirmed
- no payment, trading, purchase, legal, or irreversible financial action is exposed as a V2.0 capability

### 11.6 Persistence Gate

Pass only if:

- restart/resume preserves cell state, task history, review history, learning state, and artifact history at the accepted local durability level
- multi-cell continuity is runtime-backed, not only seeded/fixture-backed

### 11.7 Competitive Parity Gate

Pass only if:

- SoloCrew demonstrably behaves as more than raw chat
- persistent multi-cell company structure, memory, learning, and bounded operating loop are visible to the user
- real bounded artifact workflows exist for at least one starter cell and have an evidenced expansion path for the remaining starter cells

## 12. Boundary And Non-Overclaim Rules

Confirmed in this wave:

- no MPLP change in this wave
- no Cognitive_OS change in this wave
- no implementation in this wave
- no provider/channel execution claim
- no autonomous company claim
- no protocol certification claim
- no GA claim
- no silent rewrite of V1.8, V1.9, or V2.0 version truth
- no claim that current SoloCrew already has founder-dashboard, cell-operations-loop, starter-cell, or real AIGC operating capability

## 13. Final Decision

`V2_0_BLOCKED_PENDING_COGNITIVE_OS_REALIZATION`

Decision basis:

- MPLP already provides enough protocol-side truth for this product wave.
- Cognitive_OS already provides meaningful first-pass runtime substrate, but not yet enough neutral, projection-safe, runtime-owned summary surfaces for V2.0 founder/dashboard/cell-ops consumption.
- SoloCrew already has strong bounded shells and persistence slices, but they remain fragmented across intake, packet revision, continuity, prepared action, execution boundary, multi-cell inspection, and Secretary beta lanes rather than one usable operating loop.

Current stop condition:

- do not start V2.0 app implementation as if runtime truth and projection DTOs already exist
- start with Wave 2 runtime realization in Cognitive_OS, then Wave 3 projection contract work in SoloCrew, then Wave 4 app consumption
