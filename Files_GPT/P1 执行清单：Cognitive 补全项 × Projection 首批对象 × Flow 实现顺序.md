**《SoloCrew v0.1 P0/P1 执行清单：Cognitive 补全项 × Projection 首批对象 × Flow 实现顺序》**
**Version:** `v0.1-draft-1`
**Status:** `Execution Draft`
**Depends on:** `SoloCrew v0.1 产品需求与 Wow Moment 定义稿` · `SoloCrew v0.1 体验成立所需的 Cognitive 最小补全与 Projection 首批范围`
**Trace Tags:** `SC-EXEC-001` · `SC-P0-001` · `SC-P1-001`

---

## 0. 前置裁决

这份清单不是“完整开发计划”，而是**让 SoloCrew v0.1 先成立**的执行顺序。

核心原则只有一句：

> **先做能让用户感知到“我有一支会持续工作的 Agent 团队”的最小闭环；
> 其余增强项，全部后置。**

所以执行顺序必须遵守：

**Cognitive 最小地基 → Projection 首批对象 → 5 条关键 Flow → P1 增强项**

不是先做 UI，不是先做全量平台，也不是先做完整自治系统。

---

# 1. 总执行结构

## Phase P0

目标：**让 SoloCrew v0.1 的主 wow 成立**

也就是让用户第一次使用时，真的感受到：

* 有团队
* 围绕目标工作
* 状态可持续
* 用户纠正能被吸收

## Phase P1

目标：**让 SoloCrew v0.1 从“成立”进入“值得持续使用”**

也就是增强：

* 老员工感
* 多入口感
* 成本可控感
* 外部 Agent 接入感

---

# 2. P0 执行清单

---

## P0-A. Cognitive 补全项

这是 P0 的底座。没有这些，不要进入正式 Projection 实装。

### P0-A1. 最小 Worker Lifecycle Runtime

**目标**：让“员工”不只是名字，而是有生命周期和状态的运行对象。

**必须完成**

* Worker state enum

  * `idle`
  * `active`
  * `blocked`
  * `paused`
* Worker activation hook
* Worker suspension hook
* Worker state persistence
* Worker-to-objective binding
* Worker recent activity summary

**完成标准**

* 任一 CrewMember 都能进入状态流转
* 状态切换后可持久保存
* UI 可读取当前状态

**阻塞关系**

* 阻塞 `CrewMember Projection`
* 阻塞 `Flow-03 Crew Starts Working`

---

### P0-A2. 最小 AEL（Action Execution Layer）

**目标**：让员工“真的能做事”，不是只展示状态。

**必须完成**

* `action envelope`
* action dispatch entry
* execution start event
* execution finish event
* execution fail event
* result callback shape
* minimal timeout/fail semantics

**完成标准**

* 任一 worker 能发起一次标准动作
* 动作开始/结束/失败可被记录
* Projection 能显示“最近动作”

**阻塞关系**

* 阻塞 `Worker View`
* 阻塞 `Flow-03`

---

### P0-A3. 最小 VSL（State Persistence）

**目标**：让团队跨天不失忆。

**必须完成**

* Crew state persistence
* Worker state persistence
* Objective persistence
* WorkItem persistence
* Preference summary persistence
* Event log persistence

**完成标准**

* 退出后重进，Crew/Objective/Worker 状态不丢
* 上次纠偏摘要可恢复
* WorkItem 状态可继续

**阻塞关系**

* 阻塞 `Flow-05 Return & Continue`
* 阻塞“持续感”

---

### P0-A4. 最小 PSG（Crew Shared Semantic Graph）

**目标**：让团队共用一个项目脑子。

**必须完成**

* 核心节点：

  * `crew`
  * `worker`
  * `objective`
  * `work_item`
  * `memory`
  * `preference`
* 核心关系：

  * `worker -> assigned_to -> objective`
  * `work_item -> contributes_to -> objective`
  * `memory -> belongs_to -> worker/crew`
  * `preference -> influences -> worker/crew`
* Graph update event
* Role-scoped read
* Shared crew read

**完成标准**

* 不同 worker 可读取同一 objective 与 shared preference
* graph 更新后可在 Projection 层反映
* 至少一个用户关键词能挂到 crew shared memory 上

**阻塞关系**

* 阻塞“团队感”
* 阻塞“共享脑子”
* 阻塞 `Flow-02` 和 `Flow-03`

---

### P0-A5. 最小 Intent / Correction Loop

**目标**：让“老员工萌芽感”第一次出现。

**必须完成**

* Current objective anchor
* User correction capture
* Correction → preference update
* Correction → worker memory update
* Basic drift flag against current objective
* Review trigger on correction

**完成标准**

* 用户纠正一次后，相关 worker 的 preference summary 被更新
* 下次相关动作能读到更新内容
* 系统能标记“偏离当前 objective”的最小状态

**阻塞关系**

* 阻塞 `Flow-04 User Correction`
* 阻塞 `Flow-05 Return & Continue`

---

## P0-B. Projection 首批对象

P0 Projection 只做最核心的对象，不做扩张。

---

### P0-B1. Crew Projection

**作用**：把“我的一支团队”投影出来。

**必须呈现**

* crew name
* crew mission
* active members
* current objective
* current health

**依赖**

* Worker lifecycle
* VSL
* PSG

---

### P0-B2. CrewMember Projection

**作用**：把员工变成用户可感知的“人手”。

**必须呈现**

* role
* current status
* current focus
* recent action
* linked objective
* short memory summary

**依赖**

* Worker lifecycle
* AEL
* VSL
* PSG

---

### P0-B3. Objective Projection

**作用**：把产品主语从 prompt 变成目标。

**必须呈现**

* objective title
* assigned workers
* progress summary
* active work items
* blocked decisions

**依赖**

* PSG
* VSL

---

### P0-B4. WorkItem Projection

**作用**：让用户看到团队不是空转。

**必须呈现**

* item title
* owner
* status
* next step
* last update

**依赖**

* AEL
* VSL
* PSG

---

### P0-B5. Memory/Preference Mini Projection

**作用**：让用户第一次看到“它记住了”。

**必须呈现**

* recent correction
* current preference summary
* shared crew keywords / hashtags

**依赖**

* Intent/Correction loop
* VSL
* PSG

---

## P0-C. Projection 首批界面

---

### P0-C1. Crew Cockpit

**目标**：触发主 wow。

**必须有**

* 4 个员工卡片
* 当前 objective
* 每个员工正在做什么
* 最近动作
* 待用户决策项

**这是 P0 第一界面。**

---

### P0-C2. Objective Panel

**目标**：让用户看到“团队在围绕目标工作”。

**必须有**

* objective 概要
* 关联 workers
* progress
* blockers

---

### P0-C3. Worker Detail Panel

**目标**：让用户看到每个员工不是黑箱。

**必须有**

* 状态
* 当前 focus
* 最近动作
* 已吸收偏好摘要

---

### P0-C4. Review Strip

**目标**：开始形成“班组长汇报感”。

**必须有**

* today moved
* what blocked
* what needs decision

---

## P0-D. Flow 实现顺序

P0 的关键不是对象做完，而是 5 条 Flow 跑通。
实现顺序如下。

---

### Flow-01：Create Crew

**先做原因**：这是一切产品主语的入口。

**依赖**

* Crew Projection
* 4 个默认 worker 初始化
* 基本 state persistence

**完成标准**

* 用户创建后，立刻看到 4 名默认员工
* Crew mission 已初始化

---

### Flow-02：Set Objective

**第二做原因**：没有 objective，就没有 SoloCrew 的产品主语。

**依赖**

* Objective model
* PSG objective node
* Worker-objective binding

**完成标准**

* 用户输入目标后，可分配到 4 名员工
* Objective 面板开始出现内容

---

### Flow-03：Crew Starts Working

**第三做原因**：主 wow 的真正触发点。

**依赖**

* AEL
* Worker lifecycle
* WorkItem Projection
* Cockpit recent actions

**完成标准**

* 至少两名员工出现不同“正在推进”的状态
* 至少一条 work item 出现进度变化
* Cockpit 能看见“团队在动”

---

### Flow-04：User Correction

**第四做原因**：把“工具”推进到“老员工萌芽”。

**依赖**

* Correction capture
* Preference persistence
* Worker memory update

**完成标准**

* 用户纠正一次后，Memory mini projection 可见变化
* 相关 worker detail 可见变化

---

### Flow-05：Return & Continue

**第五做原因**：这是 SoloCrew 和普通 Agent 最大分水岭。

**依赖**

* VSL
* PSG
* persisted work state
* correction persistence

**完成标准**

* 用户二次进入时，Crew / Objective / Worker / WorkItem 状态延续
* 上次纠偏不丢
* 用户明显感觉“它记得并接着干”

---

# 3. P1 执行清单

P1 的目标不是“让产品能跑”，而是让产品**值得留下来继续用**。

---

## P1-A. Cognitive 补全项

### P1-A1. 最小 Budget / Token Runtime

**目标**：让长期运行可接受。

**必须完成**

* crew-level usage snapshot
* worker-level usage hint
* budget policy baseline
* role-scoped context slice
* basic context compaction

**用户感知**

* 不再是完全黑箱成本
* 能看见谁在花钱
* 团队不是无节制空转

---

### P1-A2. 最小 Interop / Adapter Contract

**目标**：让 SoloCrew 不是封闭系统。

**必须完成**

* adapter manifest
* capability descriptor
* invocation mapping
* result mapping
* external agent identity
* 至少一个 adapter skeleton

**优先建议**

* 先做 OpenClaw 或 Hermes 二选一
* 不要同时全做

---

### P1-A3. 最小 Channel Mapping Runtime

**目标**：让 Web + 外部入口共用同一 crew。

**必须完成**

* channel identity
* user mapping
* message ingest
* channel → crew routing
* unified event anchor

**优先建议**

* 先 Telegram
* WhatsApp 后置

---

### P1-A4. 最小 Review / Replan Loop

**目标**：让团队开始具备自我整理能力。

**必须完成**

* daily brief generation
* blocked decision summary
* correction-driven replan trigger
* underperforming worker hint

---

## P1-B. Projection 对象增强

### P1-B1. Full Memory View

**必须呈现**

* user preferences
* shared crew lexicon
* role-specific learned patterns
* recent corrections adopted

---

### P1-B2. Review View

**必须呈现**

* 今日推进
* 今日阻塞
* 待决策项
* 下轮建议动作

---

### P1-B3. Channel View

**必须呈现**

* Web + Telegram 的统一入口状态
* 最近跨入口交互
* 关键消息对 crew 的影响

---

### P1-B4. Budget Snapshot View

**必须呈现**

* today usage
* worker usage split
* abnormal usage hint

---

### P1-B5. Adapter View（简版）

**必须呈现**

* 当前接入的外部 Agent
* capability 摘要
* 当前被哪位 crew member 调用

---

## P1-C. Flow 扩展顺序

---

### Flow-06：Daily Brief

**目标**：形成“有人给我汇报”的体验。

**完成标准**

* 用户能看到今日推进/阻塞/待决策项

---

### Flow-07：Channel-to-Crew

**目标**：让外部入口不是另一个独立聊天框。

**完成标准**

* 从 Telegram 发来的消息影响当前 Crew 状态
* Web 端可看到这次影响

---

### Flow-08：Budget Visibility

**目标**：让用户开始相信“这个东西能长期挂着跑”。

**完成标准**

* 用户能看到基础 usage snapshot
* 至少能识别一个异常 usage 提示

---

### Flow-09：External Agent Bridge

**目标**：证明 SoloCrew 不是封闭系统。

**完成标准**

* 至少 1 个外部 Agent 能以 adapter 形式被一个 worker 调用
* 结果可回写到 WorkItem / recent action

---

### Flow-10：Review to Replan

**目标**：形成“不是只会执行，也会整理”的感知。

**完成标准**

* 今日 review 后，至少一个 work item / worker focus 被调整

---

# 4. 执行顺序总表

## Step 1 — P0 地基

1. Worker lifecycle runtime
2. Minimal AEL
3. Minimal VSL
4. Minimal PSG
5. Minimal intent/correction loop

## Step 2 — P0 投影对象

6. Crew
7. CrewMember
8. Objective
9. WorkItem
10. Memory mini projection

## Step 3 — P0 界面

11. Crew Cockpit
12. Objective Panel
13. Worker Detail
14. Review Strip

## Step 4 — P0 关键 Flow

15. Create Crew
16. Set Objective
17. Crew Starts Working
18. User Correction
19. Return & Continue

## Step 5 — P1 Runtime 增强

20. Budget runtime
21. Adapter contract
22. Channel mapping
23. Review/Replan loop

## Step 6 — P1 投影增强

24. Full Memory View
25. Review View
26. Channel View
27. Budget Snapshot
28. Adapter View

## Step 7 — P1 扩展 Flow

29. Daily Brief
30. Channel-to-Crew
31. Budget Visibility
32. External Agent Bridge
33. Review to Replan

---

# 5. 阻塞关系裁决

## 绝对阻塞项

这些不完成，不要进入 P0 产品演示：

* Worker lifecycle runtime
* Minimal AEL
* Minimal VSL
* Minimal PSG
* Create Crew / Set Objective / Crew Starts Working

## 体验阻塞项

这些不完成，主 wow 会严重变弱：

* User Correction
* Return & Continue
* Memory mini projection

## 留存阻塞项

这些不完成，短期能演示，长期不成立：

* Budget runtime
* Channel mapping
* Review loop

## 差异化阻塞项

这些不完成，产品会更像普通多 Agent 工具：

* Adapter contract
* External Agent Bridge
* Full Memory View

---

# 6. DoD（完成定义）

## P0 完成定义

满足以下条件才算 P0 完成：

* 用户能创建自己的 Crew
* 用户能设置一个 Objective
* 至少 4 名员工可见、可区分、可行动
* 团队开始推进具体 WorkItems
* 用户可纠正至少一个员工
* 用户二次回来时，状态可延续
* 用户明确感到“这不是一个聊天机器人，而是一支团队”

## P1 完成定义

满足以下条件才算 P1 完成：

* 用户能收到简化日报/brief
* 至少 1 个外部消息入口与 Web 共用同一 crew
* 至少 1 个外部 Agent 被成功桥接
* 用户可见基础 usage/budget 状态
* 用户能看到“纠偏 → 更新 → 下次更贴近”的增强效果
* SoloCrew 开始具备“值得长期留用”的感觉

---

# 7. 最终一句话

**P0 的任务是把 SoloCrew 做成“一支真的在工作的 Agent 团队”；P1 的任务是把它做成“一支值得长期留用、开始像老员工的 Agent 团队”。**
