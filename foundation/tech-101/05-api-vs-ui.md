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
updated: "2026-04-26"
---

# 0A.5 — What is an API? What is a UI?

> **⏱ 8 minutes · 👥 Anyone curious · 🎯 Leaves with:** the difference between the two interfaces every piece of software has, and a working sense of JSON — the format that ties them together.

---

## The one-paragraph answer

A **UI** (user interface) is what software shows a *human*. Buttons, forms, screens, menus. An **API** (application programming interface) is what software shows a *different piece of software*. URLs, structured data, return codes. The frontend (chapter 0A.2) is mostly UI. The backend is mostly API. Most products have both (*one interface for humans, one for code*) and they talk to each other constantly.

---

## Picking back up where we left off

In chapter 0A.2 we said the frontend is the dining room and the backend is the kitchen. In chapter 0A.3 we met HTTP — the language the waiters speak as they carry tickets between the rooms. In chapter 0A.4 we toured the database — the pantry that holds all the ingredients.

This chapter is about the *menu* (what humans see and pick from) and the *order ticket* (what the kitchen reads and acts on). They're two different things. They both live at the seam between dining room and kitchen. *Almost every product you'll ever ship is a careful translation between the two.*

---

## UI — the menu

A UI is what software shows a human being. The screen on your phone. The page in your browser. The buttons, forms, dropdowns, animations. Anything you can see, click, tap, drag, or scroll.

A few things about UIs that pay off when you start writing about them:

- **The job of a UI is to make complex things feel simple to a human.** A "Pay" button is one click; the work behind it is fifty different decisions and database operations. Most UI design is hiding complexity from the user without lying about it.
- **A UI is opinionated about what's primary.** A login screen has a username field and a password field — but it also *doesn't have* a hundred other fields it could have shown. The choice of what to omit is half the work.
- **A UI is about feedback.** When something is happening, the UI tells you (loading spinner, button changes state, page updates). When something has happened, the UI confirms it (a tick, a flash, a sound). When something has gone wrong, the UI explains it (error message, retry option, escape hatch). A UI without feedback feels broken even when it's working.

You've spent your entire life using UIs. You know more about them than you think. The reason this chapter even exists is that the *other* interface (the one for software) is invisible to most users, and it's the one that makes most product conversations make sense.

---

## API — the order ticket

An API is what software shows a *different piece of software*. The frontend on your phone is software. The backend in the data centre is software. Two different pieces of software. They need to talk to each other. The format they use to talk is the API.

An API has two basic moving parts:

- **A contract.** A list of all the questions software A is allowed to ask software B, and the shape of the answers it'll get. *"You can ask me for a customer's balance by sending GET to /v1/customers/{id}/balance, and I'll give you back a JSON object with `balance` and `currency` fields."* The contract is documentation, basically — but a strict-enough kind of documentation that machines can use it without ambiguity.
- **The actual machinery.** The code that, when an HTTP request matches the contract, runs the database query, computes the answer, and returns it.

The frontend on your phone reads the contract, learns what it's allowed to ask, and asks for what it needs. *"Give me this user's last 10 transactions."* The backend, on the other end of the line, reads the request, checks that the user is allowed to see those transactions, runs the SQL query against the database, takes the rows it gets back, and returns them to the frontend. The frontend then turns those raw rows into pretty cards on the screen.

That whole conversation (*frontend asks, backend returns structured data, frontend renders*) is happening dozens of times per page load. Every list, every count, every name, every avatar is the result of an API call somewhere.

If a UI is the menu the customer reads, the API is the order ticket the waiter takes to the kitchen. Same restaurant, two languages.

---

## Why APIs matter even if you'll never write one

The reason APIs come up so often in product conversations isn't that everyone's writing them. It's that *nearly every interesting software product is built by composing other products together*, and APIs are how you compose.

A few practical reasons APIs come up:

- **Integrations are APIs.** When you say "integrate with Slack" or "integrate with Salesforce," what you're really saying is "have our software call their API." Every time.
- **Mobile and web apps share APIs.** The Razorpay dashboard on the web and on your phone are *different* frontends. They both talk to the *same* backend API. That's how a feature shipped on the backend instantly works on every frontend.
- **Companies sell APIs.** Stripe, Twilio, OpenAI — entire businesses whose product *is* an API. You don't use Stripe by going to stripe.com and clicking a button; you use Stripe by writing code that talks to the Stripe API. Razorpay's payments business is, at heart, an API business.
- **AI tools are largely API-driven.** When Claude Code looks up something using a connector, the connector talks to that service's API on Claude's behalf. We meet this pattern again at White Belt.

If you take away one thing: **an API is the *promise* a piece of software makes about how other software can ask it to do things.** The promise is precise enough that machines can rely on it. That precision is most of what makes APIs useful and most of what makes them annoying.

---

## JSON — the language of API responses

Almost every API response you'll ever see is in a format called **JSON** (pronounced *"jay-son"*; stands for *JavaScript Object Notation*, but you don't need to know that). It looks like this:

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

That's nearly the whole format. JSON is barely a format. Its lack of features is the point — every programming language can parse and produce it without effort, which is why it's everywhere.

When an engineer says *"the API is returning the wrong shape"* or *"this response doesn't have the field I expected"*, they're talking about JSON not matching the contract the frontend was expecting. Most front-end-vs-backend bugs at the seam (chapter 0A.2) are JSON shape disagreements.

---

## A worked example: tying it all together

Let's compose everything from the last four chapters into one trace.

You open your phone. You tap your bank app. You see your most recent transactions list on the home screen. Here's what happens, named:

1. The **frontend** (the bank app on your phone, a UI) decides on load that it needs your last 10 transactions.
2. It builds an HTTP **request** (chapter 0A.3): `GET https://bank.example.com/api/v1/customers/me/transactions?limit=10`. This is the API call. It's the order ticket.
3. The request travels over the internet to a **server** in a data centre (the kitchen).
4. The server reads the request. It validates that you're authenticated. It runs a SQL query against the **database** (chapter 0A.4): `SELECT * FROM transactions WHERE customer_id = 'YOUR_ID' ORDER BY created_at DESC LIMIT 10;`. It gets 10 rows back.
5. The server formats those 10 rows as a **JSON** response: `{"transactions": [{"id": "txn_1", "amount": 500.00, "merchant": "Café", "at": "2026-04-25T09:14:00Z"}, ...]}`.
6. The server returns the JSON in an HTTP **response** with status `200 OK`.
7. The frontend receives the JSON, takes the list, and turns each transaction into a row on the screen: formatted with currency, time-since, the merchant's logo if available.

That's the whole loop. UI on top. API call in the middle. Database at the bottom. JSON tying the API and the UI together. *Every* "real" feature in any real product is some flavour of this loop. Once you can mentally trace the loop for a feature, you can usually predict where its bugs will live and which specialist to talk to.

---

## What you should carry into the next chapter

- **UI = for humans. API = for software.** Most products have both.
- **An API is the *promise* a piece of software makes about how other software can ask it to do things.** Precise enough that machines can rely on it.
- **JSON is the format APIs almost always use.** Curly braces, keys, values. Easy to read once you've seen a few.
- **Most seam bugs are JSON shape disagreements.** When you hear "the API returned the wrong shape," that's what's meant.
- **Every interesting feature is a UI ↔ API ↔ database loop.** The more clearly you can trace that loop in your head for a given feature, the better your product instincts will be.
- The next chapter ([0A.6 — Code is text](06-code-is-text.md)) zooms back out to talk about *where the code that runs all of this actually lives*. Repos, files, the source of truth.

---

**Previous:** [← 0A.4 Databases](04-databases.md) · **Next:** [→ 0A.6 Code is text](06-code-is-text.md)

**Further reading**
- [MDN — An overview of HTTP and APIs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [json.org](https://www.json.org/json-en.html) — the entire JSON specification fits on one page; worth seeing how short it is
- [Stripe's API reference](https://stripe.com/docs/api) — the gold standard for what a beautifully documented API looks like, and a fun browse even if you'll never use it
