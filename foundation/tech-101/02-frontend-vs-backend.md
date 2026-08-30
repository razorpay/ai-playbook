---
title: "Frontend vs backend"
slug: "tech-101/frontend-vs-backend"
section: "foundation"
status: "drafted"
type: "chapter"
track: "tech-101"
order: 2
time_minutes: 10
audience: "anyone-curious"
outcome: "Locate a product change or bug using interface, service, data, and boundary evidence."
prev: "tech-101/what-is-software"
next: "tech-101/server-client-http"
pillar: null
belt: null
tags: ["software-basics"]
updated: "2026-08-30"
---

# 0A.2 — Frontend vs backend (and why product friction lives at boundaries)

> **⏱ 10 minutes · 👥 Anyone curious · 🎯 Leaves with:** a practical way to locate a product change or bug without treating “frontend” and “backend” as rival teams or fixed machines.

---

## The one-line answer

**Frontend is the part of a product responsible for the experience people interact with. Backend is the services, rules, and shared data that support that experience.**

Both sides do real work. The distinction is about responsibility, not importance, and the boundary depends on the system. Use the labels to ask better questions, not to declare whose fault a bug is.

---

## A picture you can keep in your head

Imagine a restaurant. The dining room presents the menu, accepts an order, handles changes, and tells the customer what is happening. The kitchen checks ingredients, prepares the dish, and updates stock.

The **frontend** is the customer-facing experience: menu, table, order confirmation, and status updates.

The **backend** is the behind-the-scenes capability: preparation, stock rules, and the shared record of each order.

Both sides are doing actual work. A perfect kitchen cannot rescue an order entered for the wrong table; a polished dining room cannot serve a dish the kitchen never received.

The order ticket is the **boundary** between them. Its contract matters: dish, quantity, table, allergies, status. Software boundaries work the same way. The two sides can each be healthy while a missing, late, or misunderstood message still breaks the experience.

Like every analogy, this one eventually runs out of cutlery. Real products also have caches, background jobs, third-party services, and infrastructure. Keep the responsibility map; do not force every component into the restaurant.

---

## What this looks like in software

Open a banking app and view a balance.

The interface draws the screen, accepts your tap, shows loading and error states, and formats `12345.67` as `₹12,345.67`. Those are frontend responsibilities.

A service authenticates the request, checks permission, applies account rules, and reads the balance from an approved source. Those are backend responsibilities. The service returns a response; the interface decides how to present it.

That is the common shape, not a law of physics:

- A web server may render part of the interface before sending it to the browser.
- An app may cache data and keep some actions working offline.
- A background job may do important backend work without any screen at all.
- During local development, the interface and service may run on the same laptop.

So “where does it run?” is useful evidence, but responsibility is the more durable distinction.

---

## Four questions that locate a change

When a feature or bug feels ambiguous, ask:

1. **What did the person see or do?** Name the screen, control, message, and visible state.
2. **What crossed the boundary?** Capture the request, response, event, file, or message if one exists.
3. **What did the service or data source record?** Do not infer stored truth from the screen alone.
4. **Who else sees the same result?** Compare another session, device, user, or downstream system when safe.

These questions produce evidence. “Does it work offline?” can still be a useful experiment, but it is not a frontend detector: cached data and offline-capable apps deliberately blur that line.

---

## Where product friction can live

Boundaries deserve attention because assumptions meet there. They are not where every bug lives.

A failure may sit in:

- **the interface** — the right response is rendered incorrectly, an action is unavailable, or local state is stale;
- **the service** — a rule, permission check, calculation, or background job behaves incorrectly;
- **the data** — the source is missing, delayed, duplicated, or not the source the team assumed;
- **the contract between components** — one side sends, expects, or interprets a field differently;
- **the path around them** — network, cache, queue, infrastructure, or an external dependency.

This is why “frontend or backend?” is usually the start of diagnosis, not the verdict.

### A refresh is evidence, not proof

Suppose a page shows the wrong balance, then shows the right balance after refresh. That narrows the investigation, but it does not prove the database was right or the frontend was wrong. The first view could have used stale local state, a cache, a delayed replica, or an older service response. The refresh could also have retried a request that failed the first time.

Record what happened before choosing a cause.

### Copy this bug receipt

```text
SURFACE: <screen, workflow, or consumer>
ACTION: <what the person did>
EXPECTED: <observable result>
OBSERVED: <observable result, exact wording>
BOUNDARY EVIDENCE: <request/response/event/status/correlation ID, or UNKNOWN>
SCOPE + TIME: <who/what was affected, when, how often>
RETRY RESULT: <refresh/retry/new session changed what?>
```

**Five-minute exercise:** fill this receipt for one recent bug report. If evidence is unavailable, write `UNKNOWN` rather than guessing “frontend” or “backend.” You now have a report an engineer can investigate without first translating it.

---

## “Full-stack” and what it does not promise

A **full-stack engineer** can work across user-facing and service/data layers. A **full-stack feature** spans those layers. Neither phrase guarantees one person owns every change, deploy, approval, or operational consequence.

Working across the boundary can reduce hand-offs, but speed comes from a clear contract and evidence, not from keeping everything in one person's head. The belts build this fluency gradually: first inspect a surface, then trace its contracts, then ship and verify across layers.

---

## Infrastructure is another responsibility, not “the third team”

Infrastructure and platform capabilities provide compute, networking, deployment, storage, observability, and reliability controls that frontend and backend work depend on. A dedicated platform or SRE team may own some of them; a product team may own others. The organisational boundary is local.

“The API is down” does not identify a backend-code defect. The service, deployment, network, dependency, capacity, or permission path may be failing. Describe the observed symptom and follow the evidence.

---

## What you should carry into the next chapter

- **Frontend describes the interactive experience; backend describes the supporting services, rules, and shared data.** Both do real work.
- **Responsibility is more durable than location.** Interfaces can be server-rendered, apps can work offline, and local machines can run services.
- **Boundaries are common investigation points, not automatic causes.** Inspect what crossed them.
- **A refresh, status code, or visible symptom is evidence—not a percentage or a blame label.** Capture the full receipt.
- The next chapter ([0A.3 — What is a server? What is a client?](03-server-client-http.md)) zooms in on one common boundary: request and response over a network.

---

**Previous:** [← 0A.1 What is software, really?](01-what-is-software.md) · **Next:** [→ 0A.3 What is a server? What is a client?](03-server-client-http.md)

**Further reading**
- [MDN — Introduction to the server side](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction) — how server-side responsibilities differ from browser-side work
- [MDN — Client-server overview](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview) — the request/response boundary, dynamic sites, and server-side processing
- [MDN — Offline and background operation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation) — why offline behaviour does not cleanly identify a frontend-only feature
