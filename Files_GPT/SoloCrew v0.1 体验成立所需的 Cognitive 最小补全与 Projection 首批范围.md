**《SoloCrew v0.1 体验成立所需的 Cognitive 最小补全与 Projection 首批范围》**
**Version:** `v0.1-draft-1`
**Status:** `Draft / Product-Driven Reverse Spec`
**Depends on:** `SoloCrew v0.1 产品需求与 Wow Moment 定义稿` · `MPLP v1.0.0` · `Cognitive OS v0.1 baseline`
**Trace Tags:** `SC-COG-GAP-001` · `SC-PROJ-001` · `SC-RUNTIME-001`

---

## 0. 前置裁决

先给硬结论：

**SoloCrew v0.1 不能直接建立在“现有 Cognitive v0.1 已足够完整”的假设上。**
但也**不需要先把 Cognitive 补成终局版平台**再开始产品。

正确路线是：

> **以 SoloCrew v0.1 的体验成立为目标，补齐 Cognitive 的最小产品级 Runtime 地基；
> 然后立即进入 Projection 首批范围，实现用户可感知的团队感、持续感、老员工萌芽感。**

所以这份文档的目标不是“继续抽象”，而是明确三件事：

1. **SoloCrew v0.1 成立所必需的 Cognitive 最小补全是什么**
2. **哪些不补会直接破坏用户体验**
3. **Projection 第一批必须投影哪些对象、界面和 flow**

---

# 1. 反向约束原则

这份文档遵循的不是“平台优先”，而是你已经确认的路径：

> **用户目标 → 产品需求 → Wow Moment → 最小体验闭环 → 反推 Cognitive → 再做 Projection → 最后 App**

因此，Cognitive 是否要补，不看“技术上还想做什么”，只看：

> **如果不补，SoloCrew 的用户承诺会不会失真。**

SoloCrew v0.1 已冻结的用户承诺是三条：

1. **团队感**：不是一个聊天框，而是一支 Agent 班底
2. **持续感**：这支班底会围绕目标持续推进，而不是一次性回答
3. **老员工萌芽感**：用户纠正之后，系统会越来越贴近用户偏好

所以所有 Cognitive 补全，都必须直接服务这三条。

---

# 2. 当前 Cognitive v0.1 已有基础 vs 不足

## 2.1 已有基础

按当前冻结状态，Cognitive 已具备：

* MPLP import lock
* base schema layer
* object schema layer
* registry layer
* binding layer

这意味着你已经有：

* 协议真相源约束
* 基础对象与命名边界
* 注册与绑定的静态基础
* 后续 Runtime 和 Projection 的可承接结构

## 2.2 关键不足

但从 SoloCrew 的产品视角看，当前仍缺少的是：

* 可执行的 **Worker Runtime**
* 可持久延续的 **State Runtime**
* 可共享的 **Project/Crew Semantic Graph**
* 可吸收纠偏的 **Intent/Drift/Learning 最小闭环**
* 面向外部 Agent 的 **Interop Contract**
* 面向产品的 **Projection-ready Object Model**

换句话说：

> **当前 Cognitive 更像是“结构地基已完成”，
> 但还不是“足以支撑 SoloCrew 产品体验”的产品级运行地基。**

---

# 3. SoloCrew v0.1 体验成立所需的 Cognitive 最小补全

这里不按“大平台模块”写，而按用户体验倒推。

---

## 3.1 补全域 A：最小 AEL（Action Execution Layer）

### 为什么必须补

SoloCrew 的核心不是“回答问题”，而是“数字员工真的在做事”。
如果没有统一执行层，产品会退化成：

* 多个聊天框
* 多个角色 prompt
* 几个状态标签
* 无法统一执行、追踪、回放的 pseudo-agent

这会直接破坏 **团队感** 和 **持续感**。

### v0.1 最小补全目标

必须补出一个最小执行层，至少支持：

* 统一 `action envelope`
* action dispatch
* execution start / finish / fail event
* 外部 agent / tool invocation bridge
* timeout / retry / fail semantics（最小版）
* result callback contract

### v0.1 成功标志

用户能够明确看到：

* 某个员工真的执行了某项动作
* 动作有开始、有结果、有失败提示
* 不同员工的动作不是黑盒乱跑

### 如果不补的后果

* 用户只会觉得“这是会演戏的多 Agent UI”
* 外部接入一多，行为就不可控
* 产品没有真实工作推进感

### 优先级

**P0**

---

## 3.2 补全域 B：最小 VSL（Value State Layer）

### 为什么必须补

SoloCrew 要成立，必须跨天、跨入口、跨员工接力。
这意味着状态必须被持久保存，而不是停留在当前会话。

如果没有最小 VSL，用户会直接感知到：

* 失忆
* 重启
* 无法接力
* 工作上下文断裂
* 根本谈不上“老员工感”

### v0.1 最小补全目标

至少要能持久保存：

* crew state
* worker state
* objective state
* work item state
* user preference profile
* key memory summary
* event log / recovery anchor

### v0.1 成功标志

用户第二次回来时，能看到：

* 目标还在
* 员工状态延续
* 偏好没有丢
* 工作不是从零开始

### 如果不补的后果

* SoloCrew 只能做 demo
* 无法形成跨天持续感
* 无法沉淀老员工感

### 优先级

**P0**

---

## 3.3 补全域 C：最小 PSG（Project / Crew Semantic Graph）

### 为什么必须补

SoloCrew 与普通多 Agent 工具的核心差异，不是多几个角色，而是：

> **这些角色不是各自失忆地工作，而是共用一个项目脑子。**

这个共享脑子，最小产品形态上就是 PSG。

如果没有 PSG，结果一定会是：

* Builder 和 Growth 各说各话
* Content 不知道 Objective 的真实优先级
* 同一业务关键词在不同角色那里含义不一致
* token 开始重复消耗
* “团队感”变成“多个单人助理并排”

### v0.1 最小补全目标

不要求一上来做超级复杂图谱，但至少要有：

#### 节点

* Crew
* Worker
* Objective
* WorkItem
* Memory
* Preference
* Channel
* KPI/Review（可简化）

#### 关系

* worker → assigned_to → objective
* work_item → contributes_to → objective
* preference → influences → worker/crew
* memory → belongs_to → crew/worker
* channel → linked_to → crew/user

#### 行为

* graph update event
* role-scoped graph read
* shared crew state read
* keyword / hashtag / domain lexicon 挂载

### v0.1 成功标志

用户会感知到：

* 不同员工像在共用同一个项目大脑
* 我不用对每个人重复解释
* 业务词汇、目标、偏好在团队里是共享的

### 如果不补的后果

* 多 Agent 协作会迅速退化
* token 成本暴涨
* 老员工感只停留在单角色局部

### 优先级

**P0 / P1 之间的核心项，按执行顺序视为 P0**

---

## 3.4 补全域 D：最小 Intent / Drift / Learning 闭环

### 为什么必须补

SoloCrew 的第三个承诺是：**越来越像老员工。**

这不可能靠“单纯存聊天记录”实现。
至少要有一个最小闭环：

> 用户纠正 → 系统吸收 → 下次行为更贴近

同时，为了避免长期运行跑偏，还必须有最小 drift 约束：

> 当前行为有没有偏离现有 objective / user intent

### v0.1 最小补全目标

至少要补出：

* objective baseline / current intent anchor
* basic drift detection against objective
* user correction capture
* correction → preference/memory update
* role-level learning accumulation
* replan/review trigger

### v0.1 成功标志

用户能感知到：

* 我纠正过一次，它下次更贴近
* 团队不会越来越偏
* 员工不是每次犯同样的错

### 如果不补的后果

* 第二周开始体验明显变差
* 用户会认为“还是得我亲自盯”
* 老员工感无法建立

### 优先级

**P0-P1，按产品感知必须进 v0.1，但不要求做终局学习系统**

---

## 3.5 补全域 E：最小 Budget / Token Runtime

### 为什么必须补

SoloCrew 是 24/7 的产品。
如果不从第一天做最小 token/runtime 经济性控制，这个产品会在可用性和商业上一起失真。

用户不会说“你没有 sparse context”。
用户只会说：

* 怎么越用越贵
* 怎么多几个员工成本翻倍
* 怎么每次都重复读一堆上下文
* 这玩意长期挂着不划算

### v0.1 最小补全目标

至少要补出：

* budget policy
* worker / role scoped context
* shared reusable state
* basic context compaction/summarization
* basic usage visibility

### v0.1 成功标志

用户能看到：

* 谁在花 token
* 团队不是重复性空转
* 长期运行具备“可被接受”的成本感

### 如果不补的后果

* 产品难以持续运行
* 多 Agent 优势会被成本抵消
* 用户会退回单 Agent 工具

### 优先级

**P1，但必须进入 v0.1 范围**

---

## 3.6 补全域 F：最小 Interop / Adapter Contract

### 为什么必须补

SoloCrew 已经冻结了一个关键方向：

> 它不是封闭世界，而是能接 OpenClaw、Hermes、LangChain 等外部 Agent。

如果没有 Interop 骨架，SoloCrew 就会退化成“内建 4 个假员工”的系统。

### v0.1 最小补全目标

至少补出：

* adapter manifest
* capability descriptor
* invocation mapping
* result mapping
* external agent identity/provenance
* minimal bridge to 1 external substrate

### v0.1 成功标志

至少支持 1 个外部 Agent/Framework 的接入骨架跑通。

### 如果不补的后果

* 产品主张不成立
* 很难和现有市场形成互补关系
* adoption friction 增大

### 优先级

**P1**

---

## 3.7 补全域 G：最小 Multi-Channel Mapping

### 为什么必须补

SoloCrew 不能只活在 Web 页面里。
用户已经明确要求多入口沟通。

但多入口不能意味着多份独立记忆和状态。
所以必须有统一通道映射。

### v0.1 最小补全目标

至少补出：

* channel identity
* user-to-crew mapping
* message ingest event
* channel → work/review routing
* unified conversation anchor

### v0.1 成功标志

至少 1 个外部消息入口和 Web cockpit 共享同一 crew 状态。

### 如果不补的后果

* 多入口会变成多会话割裂
* 入口一多反而更乱
* 团队感会破坏

### 优先级

**P1**

---

# 4. Cognitive 最小补全边界：哪些暂时不做

这里要防止重新掉回“大补平台”。

以下内容 **不是 v0.1 先决条件**，不应当前拉高工程范围：

* 完整 AEL/VSL/PSG 终局实现
* 完整多租户/跨组织运行时
* 完整 agent marketplace
* 完整自治扩缩容系统
* 完整高阶 learning model / training pipeline
* 完整 enterprise governance
* 完整所有外部 agent 深度兼容

这些都属于 **后续阶段**，不是 SoloCrew v0.1 体验成立的最小条件。

---

# 5. Projection 的角色与边界

## 5.1 Projection 不是 UI 装饰层

Projection 的作用是：

> **把 Cognitive 的最小产品级地基，投影成用户能理解、能操作、能产生 wow 的产品对象与交互面。**

所以 Projection 是 SoloCrew 的真正产品层开始点。

## 5.2 Projection 的设计原则

Projection 必须做到：

1. 不把底层 schema 直接暴露给用户
2. 不做脱离 Runtime 的伪 UI
3. 所有投影对象都要能映射回 Cognitive 地基
4. 每个投影对象都服务于 wow moment

---

# 6. Projection 首批对象范围

以下对象必须作为 SoloCrew v0.1 首批投影对象。

---

## 6.1 Crew

### 定义

用户的一支 Agent 班底。

### 用户感知

“这是我的团队，不是一堆聊天机器人。”

### 必要属性（产品级）

* crew name
* mission
* active members
* current objectives
* current health/status

---

## 6.2 CrewMember

### 定义

团队中的数字员工个体。

### 首批固定角色

* Builder
* Growth
* Content
* Ops

### 用户感知

“每个员工都有职责和状态。”

### 必要属性

* role
* status（active / paused / blocked）
* current focus
* recent output
* linked objectives
* memory/profile summary

---

## 6.3 Objective

### 定义

用户给团队的当前目标。

### 用户感知

“团队围绕目标工作，而不是自由漂移。”

### 必要属性

* objective title
* success hint
* priority
* assigned crew members
* progress summary
* blocked decisions

---

## 6.4 WorkItem

### 定义

由 Objective 派生的具体工作单元。

### 用户感知

“团队不是空转，而是在推进具体任务。”

### 必要属性

* owned by worker
* contributes to objective
* current status
* next step
* last update

---

## 6.5 MemoryProfile

### 定义

团队和员工对用户、业务、风格的记忆投影。

### 用户感知

“它开始记住我的做事方式和业务语言。”

### 必要属性

* user preferences
* business keywords / hashtags
* role-specific habits
* recent corrections learned

---

## 6.6 Review / Daily Brief

### 定义

用户查看团队推进和需要决策事项的投影面。

### 用户感知

“不是只有日志，而是有班组长式汇报。”

### 必要属性

* what moved
* what blocked
* what needs decision
* what changed in preferences/memory
* cost/budget snapshot

---

## 6.7 Channel

### 定义

团队与用户沟通的入口投影。

### 用户感知

“我在任何入口叫到的是同一支团队。”

### 首批范围

* Web cockpit
* 1 个外部消息入口（建议 Telegram）

---

## 6.8 Budget Snapshot

### 定义

基础成本与预算状态。

### 用户感知

“我能大致知道这支团队是不是在健康地花钱。”

### 必要属性

* today usage
* worker-level usage hint
* abnormal spike hint

---

# 7. Projection 首批界面范围

这里不展开视觉稿，只定义首批必须有的界面投影。

---

## 7.1 Crew Cockpit（首屏）

### 目标

实现主 wow moment。

### 必须呈现

* 当前 Crew
* 4 名员工当前状态
* 当前 Objective
* 每个员工正在推进什么
* 团队今日重点
* 待用户决策项

### 这是 why

用户第一次打开就必须感觉：

> “我真的有一支团队。”

---

## 7.2 Objective View

### 目标

建立“目标驱动而非 prompt 驱动”的产品主语。

### 必须呈现

* 当前目标
* 关联员工
* 关联工作项
* 当前进度
* 风险/阻塞

---

## 7.3 Worker View

### 目标

建立“员工存在感”和“非黑箱感”。

### 必须呈现

* 员工角色
* 当前 focus
* 最近动作
* 已学到的偏好摘要
* 当前问题/需要的输入

---

## 7.4 Memory View（简版）

### 目标

建立“老员工萌芽感”。

### 必须呈现

* 用户偏好
* 业务关键词 / hashtag
* 被采纳的纠偏记录
* 团队共享记忆摘要

---

## 7.5 Review / Brief View

### 目标

让用户感觉到“有人在汇报，不是我自己翻日志”。

### 必须呈现

* 今日推进
* 今日阻塞
* 待决策项
* 关键纠偏
* 基础成本状态

---

# 8. Projection 首批 Flow 范围

SoloCrew v0.1 必须先跑通 5 条 flow。
这 5 条不是可选项，而是体验闭环。

---

## Flow-01：Create Crew

### 用户动作

创建自己的 SoloCrew

### 系统结果

* 初始化 4 名员工
* 初始化默认 crew mission
* 建立初始 memory / objective anchor

### 对应 wow

团队感开始建立

---

## Flow-02：Set Objective

### 用户动作

输入一个当前业务目标

### 系统结果

* 生成 objective
* 分配给不同角色
* 初始化 work items

### 对应 wow

从“聊天”切换到“目标驱动”

---

## Flow-03：Crew Starts Working

### 用户动作

观察团队开始工作

### 系统结果

* 各员工更新状态
* 出现最近动作
* 出现接力关系
* 出现待决策事项

### 对应 wow

主 wow 完整触发：这是一支团队

---

## Flow-04：User Correction

### 用户动作

纠正某员工的优先级、风格、关键词、判断

### 系统结果

* correction 被记录
* memory / preference 更新
* 相关 worker 状态发生调整

### 对应 wow

老员工感开始萌芽

---

## Flow-05：Return & Continue

### 用户动作

用户稍后或次日回来

### 系统结果

* crew 状态延续
* objective 没丢
* work item 持续推进
* 上次纠偏开始体现

### 对应 wow

持续感成立

---

# 9. 首批范围中的“投影-地基映射”原则

Projection 不是自由发挥，必须满足以下映射关系：

* `Crew` ← 映射自 crew state + PSG crew node
* `CrewMember` ← worker state + role profile + action/event traces
* `Objective` ← objective state + task graph linkage
* `MemoryProfile` ← preference state + memory summaries + learned corrections
* `Review` ← action traces + objective state + blockers + budget snapshot
* `Channel` ← unified conversation/channel mapping
* `Budget Snapshot` ← usage state + budget policy

这条原则非常重要。
因为它保证：

> **Projection 不是“看起来像有团队”，而是“背后真的有 Runtime 在支撑”。**

---

# 10. 执行优先级裁决

## P0：不做就无法成立 SoloCrew v0.1

### Cognitive

* 最小 AEL
* 最小 VSL
* 最小 PSG
* 最小 intent/correction loop

### Projection

* Crew
* CrewMember
* Objective
* WorkItem
* Crew Cockpit
* Flow-01 ~ Flow-05

---

## P1：不做会削弱留存与差异化

### Cognitive

* budget/token runtime
* adapter contract
* channel mapping

### Projection

* Memory View
* Review View
* Channel View
* Budget Snapshot
* 至少 1 个外部入口

---

## P2：后续增强

### Cognitive

* deeper learning loop
* advanced token economy
* elastic scaling
* richer interop

### Projection

* richer KPI
* hiring/retiring flows
* automation market
* multi-crew/team projections

---

# 11. 最终裁决

## 11.1 Cognitive 是否还需要补全

**需要。**

但不是继续做无边界平台化补全。
而是：

> **必须补齐 SoloCrew v0.1 体验成立所需的最小产品级 Runtime 地基。**

## 11.2 Projection 是否可以启动

**现在就应该启动。**

因为如果不进入 Projection，就无法验证：

* 团队感是不是真的成立
* 持续感是不是用户可感知
* 老员工萌芽感是不是能被用户认出来

## 11.3 当前正确阶段

当前正确阶段不是：

* 继续单独补 Cognitive
* 直接做 full SoloCrew app

而是：

> **Cognitive Minimal Closure for SoloCrew + SoloCrew Projection Kickoff**

---

# 12. 一句话收敛

**SoloCrew v0.1 要成立，Cognitive 至少要补出最小 AEL/VSL/PSG/intent-learning 地基；Projection 则必须立即把这些地基投影成 Crew、Worker、Objective、Memory、Review 和 5 条首批 flow。**

这才是从产品目标反推出来的正确工程边界。

