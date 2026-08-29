---
title: "What is an API? What is a UI?"
slug: "tech-101/api-vs-ui"
section: "foundation"
status: "drafted"
type: "chapter"
track: "tech-101"
order: 5
time_minutes: 8
audience: "anyone-curious"
outcome: "Tell the difference between a human-facing surface and a machine-facing contract."
prev: "tech-101/databases"
next: "tech-101/code-is-text"
pillar: null
belt: null
tags: ["software-basics", "apis"]
updated: "2026-08-29"
---

# 0A.5 — What is an API? What is a UI?

> **⏱ 8 minutes · 👥 Anyone curious · 🎯 Leaves with:** the difference between a human-facing UI and a machine-facing API contract, plus a working sense of how HTTP and JSON often connect them on the web.

---

## The one-paragraph answer

A **UI** (user interface) is how a human interacts with software: buttons, forms, screens, menus, or another human-facing control. An **API** (application programming interface) is a contract that lets another program ask the software for data or behaviour. In a web product, the frontend often calls a backend API over HTTP and receives JSON. Those are common choices, not the definition: an API is the contract; HTTP is one transport; JSON is one data format.

---

## Picking back up where we left off

In chapter 0A.2 we said the frontend is the dining room and the backend is the kitchen. In chapter 0A.3 we met HTTP — the language the waiters speak as they carry tickets between the rooms. In chapter 0A.4 we toured the database — the pantry that holds all the ingredients.

This chapter is about the *menu* (what humans see and pick from) and the *order ticket* (the contract the kitchen accepts). They're two different things. In a web app, the UI sits on the human side of the seam while the API defines what may cross it. Many products translate between the two; some software has an API with no UI, and some UI behaviour stays entirely on the device.

---

## UI — the menu

A UI is the part of software intended for a human being. It might be a phone screen or browser page with buttons, forms, dropdowns, and animations. It can also be a voice interface or command prompt. The interaction may be visual, spoken, typed, clicked, tapped, dragged, or scrolled.

A few things about UIs that pay off when you start writing about them:

- **The job of a UI is to make complex things feel simple to a human.** A "Pay" button is one click; the work behind it is fifty different decisions and database operations. Most UI design is hiding complexity from the user without lying about it.
- **A UI is opinionated about what's primary.** A login screen has a username field and a password field — but it also *doesn't have* a hundred other fields it could have shown. The choice of what to omit is half the work.
- **A UI is about feedback.** When something is happening, the UI tells you (loading spinner, button changes state, page updates). When something has happened, the UI confirms it (a tick, a flash, a sound). When something has gone wrong, the UI explains it (error message, retry option, escape hatch). A UI without feedback feels broken even when it's working.

You've spent your entire life using UIs. You know more about them than you think. The reason this chapter even exists is that the *other* interface (the one for software) is invisible to most users, and it's the one that makes most product conversations make sense.

---

## API — the order ticket

An API is the interface software offers to *another piece of software*. The frontend on your phone is software. The backend in the data centre is software. When they need to talk, the API defines which requests are allowed, what inputs each request accepts, and what outcomes the caller should expect.

When a team says it is "building an API," two related things are usually in scope:

- **A contract.** A list of the operations software A may ask software B to perform, the inputs each operation accepts, and the outcomes it returns. For a web API, one operation might be: *"Send `GET /v1/customers/{id}/balance`; on success, expect a JSON object with `balance` and `currency` fields."* The contract may be documented in prose, an OpenAPI description, or types that both sides share.
- **An implementation behind it.** Code receives the request, checks it, performs the work, and returns an outcome. The implementation may query a database, call another service, read a cache, or do none of those things. Callers should be able to rely on the contract without knowing that internal route.

The frontend on your phone is built against the contract and asks for what it needs. *"Give me this user's last 10 transactions."* The backend, on the other end of the line, reads the request, checks that the user is allowed to see those transactions, runs the SQL query against the database, takes the rows it gets back, and returns them to the frontend. The frontend then turns those raw rows into pretty cards on the screen.

That conversation (*frontend asks, backend returns structured data, frontend renders*) may happen many times during one page load. Other screens use cached or local data, and one API response can supply several UI elements. The useful question is not "how many calls?" but "which contract supplies this state?"

If a UI is the menu the customer reads, the API is the order ticket the waiter takes to the kitchen. Same restaurant, two languages.

---

## Why APIs matter even if you'll never write one

The reason APIs come up so often in product conversations isn't that everyone's writing them. Many products compose capabilities from several services, and APIs are a common way to make those boundaries reliable.

A few practical reasons APIs come up:

- **Integrations often use APIs.** A Slack or Salesforce integration usually calls an API and may also receive webhooks or events. Some older integrations exchange files. Name the actual contract instead of assuming every integration is a request from your app.
- **Mobile and web apps can share backend capabilities.** Different frontends often call overlapping APIs, which avoids rebuilding the core business logic. Each client still has to adopt any new operation or field and handle loading, error, empty, and compatibility states. A backend release makes a capability available; it does not make every frontend use it automatically.
- **Companies sell APIs.** Stripe, Twilio, OpenAI — entire businesses whose core capability is available through an API. Developers integrate those capabilities by writing code against the contract, while dashboards and docs remain human-facing UIs around it. Razorpay's payments business is, at heart, an API business.
- **AI tools are largely API-driven.** When Claude Code looks up something using a connector, the connector talks to that service's API on Claude's behalf. We meet this pattern again at White Belt.

If you take away one thing: **an API is the *promise* a piece of software makes about how other software can ask it to do things.** The promise is precise enough that machines can rely on it. That precision is most of what makes APIs useful and most of what makes them annoying.

---

## JSON — a common web API response format

Many web API responses use a text format called **JSON** (pronounced *"jay-son"*; stands for *JavaScript Object Notation*, but you don't need to know that). Others return HTML, XML, a file, or binary data. The response's `Content-Type` declares the format. JSON looks like this:

```json
{
  "id": "cust_8XK2",
  "name": "Asha Rao",
  "email": "asha@example.com",
  "balance": {
    "amount": 12345.67,
    "currency": "INR"
  },
  "tags": ["pro", "verified"]
}
```

A few notes on reading JSON without being told what it is:

- **Curly braces `{}`** wrap an object — a bag of key-value pairs. This is the most common shape.
- **Keys are in quotes** (`"id"`, `"name"`). They name the field.
- **Values can be** strings (`"Asha Rao"`), numbers (`12345.67`), booleans (`true` / `false`), `null`, lists (`["pro", "verified"]`), or other objects (`{"amount": ..., "currency": ...}`).
- **Lists** are wrapped in square brackets `[]` and can hold any of the same value types.

That's nearly the whole format. JSON is deliberately small and text-based, with mature tooling across programming languages. That combination is why it is so widely used.

When an engineer says *"the API is returning the wrong shape"* or *"this response doesn't have the field I expected"*, they're describing a response that does not match the contract the frontend expected. For a JSON API, that may mean a missing field, a changed type, or a different error shape. Contract mismatches are one common class of seam bug; timing, authentication, caching, and network failures are others.

---

## A worked example: tying it all together

Let's compose everything from the last four chapters into one trace.

You open your phone. You tap your bank app. You see your most recent transactions list on the home screen. Here's what happens, named:

1. The **frontend** (the bank app on your phone, a UI) decides on load that it needs your last 10 transactions.
2. It builds an HTTP **request** (chapter 0A.3): `GET https://bank.example.com/api/v1/customers/me/transactions?limit=10`. This is the API call. It's the order ticket.
3. The request travels over the internet to a **server** in a data centre (the kitchen).
4. The server reads the request. It validates that you're authenticated and authorised. It runs a parameterised SQL query against the **database** (chapter 0A.4): `SELECT * FROM transactions WHERE customer_id = ? ORDER BY created_at DESC LIMIT 10;`, with the authenticated customer ID supplied separately. It gets 10 rows back.
5. The server formats those 10 rows as a **JSON** response: `{"transactions": [{"id": "txn_1", "amount": 500.00, "merchant": "Café", "at": "2026-04-25T09:14:00Z"}, ...]}`.
6. The server returns the JSON in an HTTP **response** with status `200 OK`.
7. The frontend receives the JSON, takes the list, and turns each transaction into a row on the screen: formatted with currency, time-since, the merchant's logo if available.

That's one common data-backed loop: UI on top, API call in the middle, database at the bottom, and JSON carrying the response. Other features may work offline, react to events, call several services, or have no database at all. Trace the actual path for the feature in front of you; once you can name each boundary, you can predict where its bugs may live and which specialist to talk to.

---

## What you should carry into the next chapter

- **UI = human-facing interaction. API = program-facing contract.** A product or component may offer either or both.
- **An API is the *promise* a piece of software makes about how other software can ask it to do things.** Precise enough that machines can rely on it.
- **JSON is a common format for web API data.** Curly braces, keys, values. Easy to read once you've seen a few.
- **HTTP and JSON are common web choices, not synonyms for API.** HTTP carries the request; JSON may represent the data; the API contract says what is allowed and what the outcomes mean.
- **A UI ↔ API ↔ database loop is common, not universal.** Trace the actual UI, contract, transport, services, and data stores for the feature in front of you.
- The next chapter ([0A.6 — Code is text](06-code-is-text.md)) zooms back out to talk about *where the code that runs all of this actually lives*. Repos, files, the source of truth.

---

**Previous:** [← 0A.4 Databases](04-databases.md) · **Next:** [→ 0A.6 Code is text](06-code-is-text.md)

**Further reading**
- [MDN — Introduction to web APIs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction) — browser APIs and third-party server APIs, clearly separated
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) — the standard description format for HTTP APIs; useful evidence that "API" and "HTTP API" are not interchangeable terms
- [json.org](https://www.json.org/json-en.html) — the entire JSON specification fits on one page; worth seeing how short it is
- [Stripe's API reference](https://stripe.com/docs/api) — the gold standard for what a beautifully documented API looks like, and a fun browse even if you'll never use it
