# SoloCrew V1.1 RC User Walkthrough v0.1

`doc_id: SOLOCREW-V1.1-RC-USER-WALKTHROUGH-v0.1`

## A. Purpose

This guide explains how to understand and exercise SoloCrew V1.1 RC from a
product and user perspective.

V1.1 RC is:

- bounded
- non-executing
- a founder request-to-packet review loop

V1.1 RC is not:

- a live external workflow
- provider/channel execution
- approve/reject/dispatch/execute
- founder queue

## B. Walkthrough Flow

The intended user walkthrough is:

founder request input  
-> bounded request object  
-> projection-safe packet candidate  
-> review/staging flow result  
-> page model  
-> founder intake / handoff / review page visibility  
-> human review or return-for-revision posture

## C. What The User Should See

- packet candidate id
- review posture
- staging posture
- evidence/stale/insufficient posture
- non-executing recommendation
- blocked-by-contract fallback
- boundary summary
- interpretation guards

## D. What The User Should Not Expect

- no provider/channel send
- no approval action
- no rejection action
- no dispatch
- no execution
- no queue
- no proof/certification

## E. Decision

`SOLOCREW_V1_1_RC_USER_WALKTHROUGH_READY`
