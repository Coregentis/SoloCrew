**《SoloCrew v0.1 执行蓝图：按仓库现实拆成 Schema / Runtime / Projection / App 四类任务》**
**Version:** `v0.1-draft-1`
**Status:** `Execution Blueprint`
**Depends on:** `MPLP v1.0.0` · `Cognitive OS v0.1 baseline (thread-frozen)` · `SoloCrew v0.1 PRD / Wow / P0-P1 execution drafts`
**Trace Tags:** `SC-BLUEPRINT-001` · `SC-REPO-REALITY-001`

---

## 0. 前置裁决

先把结论定死：

**现在不该再把任务写成“继续抽象 SoloCrew”，也不该写成“直接开做完整 App”。**
按你定下的路线，当前正确做法是：

> **以仓库现实为边界，先把 SoloCrew v0.1 拆成四类任务：Schema / Runtime / Projection / App；其中 Schema 与 Runtime 只做支撑 v0.1 wow 所需的最小闭环，Projection 与 App 负责把它变成用户可感知产品。**

这里有两个边界要明确：

第一，**MPLP 已经可以视为稳定约束源，不是当前阻塞点。**
公开仓库显示 MPLP Protocol `v1.0.0` 已冻结，`schemas/v2/`、`tests`、`packages`、`docs`、`governance` 都已成形，且 README 明确把仓库定义为 Source of Truth。([GitHub][1])

第二，**Cognitive OS 这一层，按你本线程冻结的事实，不是“从零开始”，但也不是“产品级终局已完成”。**
所以这份蓝图不再讨论是否继续无边界补底座，而是明确：**哪些任务应落在 Schema、哪些必须进 Runtime、哪些该在 Projection 完成、哪些才属于 App 层。**

---

# 1. 仓库现实下的四层任务划分原则

这四类不是技术偏好，而是执行边界。

## 1.1 Schema 层

职责不是写业务逻辑，而是：

* 把 SoloCrew 的产品语义稳定下来
* 让 Runtime / Projection / App 不至于越做越散
* 把用户心智中可复用的部分沉淀成约束

**判断标准：**
凡是“对象是什么、状态是什么、关系是什么、哪些字段必须可追溯”的内容，都归 Schema。

---

## 1.2 Runtime 层

职责不是做 UI，而是：

* 让员工真的能“运行”
* 让状态真的能“延续”
* 让团队真的能“共享脑子”
* 让纠偏真的能“被吸收”
* 让产品不是假装有团队

**判断标准：**
凡是“没有它产品就只剩界面和 prompt”的内容，都归 Runtime。

---

## 1.3 Projection 层

职责不是底层抽象，而是：

* 把 Runtime 能力投影成用户可理解的对象
* 把 SoloCrew 的 wow moment 落到交互和视图上
* 让“团队感 / 持续感 / 老员工萌芽感”能被看见

**判断标准：**
凡是“用户直接感知到的产品对象和工作流”，都归 Projection。

---

## 1.4 App 层

职责不是再做协议，而是：

* 形成可用产品壳层
* 承载 cockpit、交互、入口、导航、权限、页面
* 把 Projection 串成实际可演示、可试用、可迭代的产品

**判断标准：**
凡是“产品壳、页面、交互容器、入口、会话体验”，都归 App。

---

# 2. SoloCrew v0.1 的仓库级总任务树

真正的总树应该是：

```text
SoloCrew v0.1
├── Schema
│   ├── SoloCrew product objects
│   ├── workforce lifecycle schemas
│   ├── objective / review / memory / budget schemas
│   └── adapter / channel / projection contracts
├── Runtime
│   ├── minimal AEL
│   ├── minimal VSL
│   ├── minimal PSG
│   ├── minimal intent / correction loop
│   ├── budget runtime
│   └── external adapter skeleton
├── Projection
│   ├── Crew / CrewMember / Objective / WorkItem
│   ├── Memory / Review / Channel / Budget
│   ├── Cockpit IA
│   └── Flow-01 ~ Flow-10
└── App
    ├── SoloCrew app shell
    ├── cockpit pages
    ├── worker/objective/detail pages
    ├── Telegram entry
    └── UX state + navigation + auth shell
```

---

# 3. Schema 类任务蓝图

这里的目标不是做“全平台 schema 宇宙”，而是**把 SoloCrew v0.1 的产品边界定住**。

## 3.1 S-01：定义 SoloCrew 产品对象总清单

### 目标

冻结 SoloCrew v0.1 的核心产品对象。

### 必须有

* `crew`
* `crew_member`
* `role_profile`
* `objective`
* `work_item`
* `memory_profile`
* `preference_profile`
* `review_cycle`
* `budget_policy`
* `channel_endpoint`
* `agent_adapter`

### 输出物

* `schemas/solocrew/*.schema.json` 或等价路径
* 对象关系清单
* 命名冻结清单

### 判定

没有这一步，后面 Runtime / Projection 一定会飘。

---

## 3.2 S-02：定义 Worker Lifecycle Schema

### 目标

让“员工”成为有生命周期的正式对象，而不是 UI 卡片。

### 必须有字段

* `member_id`
* `role`
* `status`
* `activation_state`
* `current_focus`
* `linked_objective_ids`
* `memory_ref`
* `adapter_ref`
* `last_action_summary`

### 必须冻结的状态枚举

* `idle`
* `active`
* `blocked`
* `paused`

### 输出物

* `crew_member.schema.json`
* 生命周期状态转换说明

---

## 3.3 S-03：定义 Objective / WorkItem / Review Schema

### 目标

把 SoloCrew 从 prompt 驱动切换到目标驱动。

### 必须有

#### `objective`

* title
* intent summary
* priority
* success hint
* assigned members
* progress summary
* blockers

#### `work_item`

* owner
* contributes_to objective
* status
* next_step
* last_update

#### `review_cycle`

* moved
* blocked
* needs_decision
* suggested_replan

### 输出物

* objective / work_item / review_cycle schemas
* objective-work_item-member 关系约束

---

## 3.4 S-04：定义 Memory / Preference / Lexicon Schema

### 目标

把“老员工萌芽感”变成明确数据边界。

### 必须有

* user preference
* crew shared preference
* worker-specific preference
* keywords / hashtags / business lexicon
* recent learned corrections

### 输出物

* `memory_profile.schema.json`
* `preference_profile.schema.json`
* `lexicon.schema.json` 或合并设计

---

## 3.5 S-05：定义 Budget / Usage Schema

### 目标

把“长期可运行”变成显式对象，不再藏在日志里。

### 必须有

* crew budget baseline
* worker budget hint
* usage snapshot
* abnormal usage marker

### 输出物

* `budget_policy.schema.json`
* `usage_snapshot.schema.json`

---

## 3.6 S-06：定义 Adapter / Channel Contract Schema

### 目标

让 SoloCrew 从第一天就是开放系统，而不是封闭 demo。

### 必须有

#### `agent_adapter`

* adapter id
* substrate type
* capabilities
* invocation contract
* result mapping
* provenance identity

#### `channel_endpoint`

* channel type
* crew binding
* user binding
* routing mode
* last interaction anchor

### 输出物

* adapter / channel schemas
* capability descriptor contract

---

## 3.7 Schema 层 DoD

Schema 层完成，不是“文件多了”，而是满足：

* SoloCrew v0.1 所有核心对象都有正式定义
* 对象边界不再依赖口头约定
* Runtime/Projection/App 可以引用同一套对象真相
* 至少一份 `Schema Alignment Table` 把对象、用途、依赖关系列清

---

# 4. Runtime 类任务蓝图

这里是 SoloCrew 好不好用的真正地基。

## 4.1 R-01：最小 Worker Lifecycle Runtime

### 目标

让员工真正活起来。

### 必做

* Worker activation
* Worker pause
* Worker block
* Worker current focus update
* Worker recent activity update
* Worker state persistence hook

### 输出物

* lifecycle service / state machine
* runtime tests
* event emission hooks

---

## 4.2 R-02：最小 AEL

### 目标

让员工的“做事能力”变成统一执行层。

### 必做

* action envelope
* dispatch entry
* start/finish/fail events
* callback result shape
* minimal timeout/fail semantics

### 输出物

* runtime action executor
* event traces
* one stub action end-to-end

---

## 4.3 R-03：最小 VSL

### 目标

让团队跨天不失忆。

### 必做

* persist crew
* persist worker
* persist objective
* persist work items
* persist preference summaries
* persist event anchors

### 输出物

* state storage layer
* recovery path
* state reload tests

---

## 4.4 R-04：最小 PSG

### 目标

让“共用项目脑子”首次成立。

### 必做

* crew / worker / objective / work_item / memory / preference 节点
* 基本关系存取
* graph update event
* shared read
* role-scoped read

### 输出物

* minimal graph service
* graph update hooks
* shared crew context read path

---

## 4.5 R-05：最小 Intent / Correction Loop

### 目标

让纠偏能进入系统，而不是只留在聊天记录里。

### 必做

* objective anchor
* user correction capture
* correction → preference update
* correction → worker memory update
* basic drift flag
* review trigger

### 输出物

* correction ingestion path
* updated preference summaries
* one correction replay test

---

## 4.6 R-06：最小 Budget Runtime

### 目标

让 token 经济性第一次进入产品层。

### 必做

* crew usage snapshot
* worker usage hint
* budget policy baseline
* role-scoped context slice
* basic compaction/summarization hook

### 输出物

* budget runtime service
* usage snapshot generator
* budget event hook

---

## 4.7 R-07：最小 Adapter Runtime

### 目标

让至少一个外部 Agent 被收编成员工能力。

### 必做

* adapter manifest load
* capability read
* invocation bridge
* result mapping
* provenance write-back

### 输出物

* one adapter skeleton
* one end-to-end bridge demo

---

## 4.8 R-08：最小 Channel Runtime

### 目标

让 Web 和外部入口属于同一支 Crew。

### 必做

* channel identity mapping
* incoming message ingest
* route to crew
* route to review/decision queue
* persist channel anchor

### 输出物

* Telegram first connector runtime
* unified crew/channel state mapping

---

## 4.9 Runtime 层 DoD

Runtime 完成，不是“有服务代码”，而是满足：

* 员工可激活并执行动作
* 团队状态可持久化
* 团队能共享一个最小项目脑子
* 用户纠正能被吸收
* 至少有 budget、adapter、channel 的骨架跑通

---

# 5. Projection 类任务蓝图

Projection 的任务是把 Runtime 投影成产品对象与 flow。

## 5.1 P-01：Crew Projection

### 目标

用户看到的是“我的团队”。

### 必呈现

* crew name
* mission
* current objective
* current health
* active members

### 依赖

* S-01 / S-02 / R-03 / R-04

---

## 5.2 P-02：CrewMember Projection

### 目标

员工有真实存在感。

### 必呈现

* role
* status
* current focus
* recent action
* linked objective
* short memory summary

### 依赖

* S-02 / R-01 / R-02 / R-03 / R-05

---

## 5.3 P-03：Objective Projection

### 目标

让“目标驱动”替代“prompt 驱动”。

### 必呈现

* objective title
* progress
* assigned members
* blockers
* work items

### 依赖

* S-03 / R-03 / R-04

---

## 5.4 P-04：WorkItem Projection

### 目标

让团队推进感可见。

### 必呈现

* owner
* status
* next step
* last update

### 依赖

* S-03 / R-02 / R-03 / R-04

---

## 5.5 P-05：Memory Mini Projection

### 目标

让用户第一次看到“它记住了”。

### 必呈现

* recent correction
* preference summary
* shared keywords / hashtags

### 依赖

* S-04 / R-03 / R-04 / R-05

---

## 5.6 P-06：Review Projection

### 目标

让团队有汇报感，不只是日志感。

### 必呈现

* 今日推进
* 今日阻塞
* 待用户决策
* suggested replan

### 依赖

* S-03 / R-05 / R-08

---

## 5.7 P-07：Budget Snapshot Projection

### 目标

让长期运行的成本第一次可见。

### 必呈现

* today usage
* worker usage split
* abnormal usage hint

### 依赖

* S-05 / R-06

---

## 5.8 P-08：Channel Projection

### 目标

让不同入口都是同一支团队。

### 必呈现

* current linked channels
* recent channel interactions
* channel → crew impact

### 依赖

* S-06 / R-08

---

## 5.9 Projection Flow 顺序

必须按体验闭环落，不按对象多寡落。

### 第一批

* Flow-01 Create Crew
* Flow-02 Set Objective
* Flow-03 Crew Starts Working
* Flow-04 User Correction
* Flow-05 Return & Continue

### 第二批

* Flow-06 Daily Brief
* Flow-07 Channel-to-Crew
* Flow-08 Budget Visibility
* Flow-09 External Agent Bridge
* Flow-10 Review to Replan

---

## 5.10 Projection 层 DoD

Projection 完成，不是“界面有了”，而是：

* 用户第一次进入就能感知团队感
* 目标推进可以被看懂
* 员工不是黑箱
* 纠偏被看见
* 跨天回来有延续感

---

# 6. App 类任务蓝图

App 层不再定义底层能力，只承载产品使用体验。

## 6.1 A-01：SoloCrew App Shell

### 目标

形成独立产品入口。

### 必做

* app shell
* navigation
* workspace layout
* authenticated session shell（最小）
* route skeleton

### 推荐入口

* `solocrew.coregentis.ai`

---

## 6.2 A-02：Crew Cockpit 首屏

### 目标

直接承载主 wow。

### 必做

* crew overview
* 4 个员工卡片
* current objective
* recent actions
* decision queue

### 这是 v0.1 最关键页面。**

---

## 6.3 A-03：Objective Workspace

### 目标

承载目标驱动产品主语。

### 必做

* objective detail
* related workers
* related work items
* blockers
* progress

---

## 6.4 A-04：Worker Workspace

### 目标

承载员工存在感与非黑箱感。

### 必做

* role detail
* current focus
* recent actions
* learned preference summary
* blocked reasons

---

## 6.5 A-05：Memory / Review Workspace（简版）

### 目标

承载“老员工萌芽感”和“班组长汇报感”。

### 必做

* memory summary area
* review strip / brief panel
* correction record summary

---

## 6.6 A-06：Telegram Entry

### 目标

证明 SoloCrew 不是网页里的一次性玩具。

### 必做

* Telegram entry
* basic message → crew routing
* key responses back to Telegram

---

## 6.7 A-07：App-level UX Glue

### 目标

让整个 v0.1 看起来像产品而不是 demo 拼接。

### 必做

* loading / empty / blocked states
* action feedback
* basic error surface
* consistent object linking

---

## 6.8 App 层 DoD

App 层完成，不是“能打开页面”，而是：

* 首屏能形成 wow
* 主要对象之间能互相跳转
* 用户能完成 5 条 P0 flow
* Telegram 至少能参与一个真实闭环
* 产品看起来像一个系统，而不是几页后台

---

# 7. 四类任务的实际先后顺序

这里给你最终的执行顺序，不按层平铺，而按真实依赖顺序压缩。

## Stage 1：Schema 冻结最小对象集

* S-01
* S-02
* S-03
* S-04
* S-05
* S-06

## Stage 2：Runtime 打最小地基

* R-01
* R-02
* R-03
* R-04
* R-05

## Stage 3：Projection 跑通主 wow

* P-01
* P-02
* P-03
* P-04
* P-05
* Flow-01 ~ Flow-05

## Stage 4：App 壳承载 P0

* A-01
* A-02
* A-03
* A-04
* A-05

## Stage 5：Runtime/Projection/App 联动做 P1

* R-06
* R-07
* R-08
* P-06
* P-07
* P-08
* A-06
* A-07
* Flow-06 ~ Flow-10

---

# 8. 最终裁决：现在仓库里最该开始什么

如果按“仓库现实优先”来判，不是所有任务都该同时开工。

## 现在最该立刻开始的

### 第一优先

* Schema 最小对象冻结
* Worker lifecycle runtime
* minimal AEL
* minimal VSL
* minimal PSG
* minimal correction loop

### 第二优先

* Crew/CrewMember/Objective/WorkItem Projection
* Crew Cockpit
* Flow-01 ~ Flow-05

### 第三优先

* budget runtime
* adapter runtime
* Telegram channel runtime
* review / memory / budget / channel projection

---

# 9. 一句话收敛

**SoloCrew v0.1 的仓库级正确推进方式是：先把产品对象冻结成 Schema，把“团队能工作、能延续、能纠偏”的最低地基补进 Runtime，再用 Projection 做出 wow，最后由 App 把这些 flow 串成一个真的可用产品。**

这就是按你那条
**MPLP → Cognitive → Projection → App**
路线，反推出来的最实的执行蓝图。

