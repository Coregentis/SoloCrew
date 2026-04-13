# SOLOCREW-WORKFLOW-BASELINE-v0.1

## Flow-01 Create Crew

User-visible goal:

- create a SoloCrew team and immediately see the first crew shell

Required upstream dependency:

- `agent-group` and `agent-worker` schemas
- `role-profile` schema
- workforce state persistence
- worker lifecycle state vocabulary

Projection objects involved:

- `crew`
- `crew-member`
- `review-strip`

What is explicitly deferred:

- live provider execution
- channel entry
- budget accounting

## Flow-02 Set Objective

User-visible goal:

- give the crew one current objective and see work organized around it

Required upstream dependency:

- `objective` and `work-item` schemas
- objective store
- registry and binding truth for object classification
- optional bounded objective anchor for later comparison

Projection objects involved:

- `objective`
- `crew`
- `crew-member`
- `work-item`

What is explicitly deferred:

- full PSG graph realization
- autonomous planning
- cross-channel routing

## Flow-03 Crew Starts Working

User-visible goal:

- make the crew look visibly in motion around the current objective

Required upstream dependency:

- worker lifecycle runtime
- execution request/result/event contracts
- bounded action dispatcher
- objective and worker persistence

Projection objects involved:

- `crew-member`
- `work-item`
- `review-strip`
- `objective`

What is explicitly deferred:

- provider-specific bridge implementation
- full orchestration engine
- live tool or connector execution

## Flow-04 User Correction

User-visible goal:

- let the user correct a worker and see that correction become structured product state

Required upstream dependency:

- bounded correction capture
- preference write-back
- memory and preference stores

Projection objects involved:

- `memory-summary`
- `crew-member`
- `review-strip`

What is explicitly deferred:

- full autonomous learning
- full correction-loop runtime
- long-horizon learning policy

## Flow-05 Return & Continue

User-visible goal:

- return later and see that the same crew state, objective state, and learned preference state still exist

Required upstream dependency:

- workforce persistence adapters
- worker lifecycle persistence
- objective, memory, and preference stores
- bounded objective anchor comparison

Projection objects involved:

- `crew`
- `crew-member`
- `objective`
- `work-item`
- `memory-summary`

What is explicitly deferred:

- full PSG continuity graph
- channel continuity
- budget history
