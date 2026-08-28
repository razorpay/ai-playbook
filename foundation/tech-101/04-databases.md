---
title: "Databases: the world's most important spreadsheet"
slug: "tech-101/databases"
section: "foundation"
status: "drafted"
type: "chapter"
track: "tech-101"
order: 4
time_minutes: 8
audience: "anyone-curious"
outcome: "Know why products need durable structured storage and what can go wrong around it."
prev: "tech-101/server-client-http"
next: "tech-101/api-vs-ui"
pillar: null
belt: null
tags: ["software-basics", "databases"]
updated: "2026-08-28"
---

# 0A.4 — Databases (the world's most important spreadsheet)

> **⏱ 8 minutes · 👥 Anyone curious · 🎯 Leaves with:** the right mental model for the place where every fact your favourite app remembers actually lives.

---

## The one-sentence answer

**A database is structured storage that lets software save, find, and change facts.**

For a first mental model, picture a set of linked spreadsheets built for software rather than humans. That picture is useful, but it has limits: databases also coordinate simultaneous changes, enforce rules, and recover from failures. The rest of this chapter refines the picture without turning you into a database administrator.

---

## Picking up the kitchen metaphor

In chapter 0A.2 we said the backend is the kitchen — where the actual work gets done. In chapter 0A.3 we met the waiter (the HTTP request) carrying tickets back and forth between the dining room and the kitchen. The natural next question is: *where do the ingredients come from*?

Every kitchen has a pantry, a fridge, a freezer. Stuff that's been prepped and stored, ready to be pulled and used. When the waiter brings an order ticket (*one chicken biryani, no onions*) the kitchen doesn't conjure the chicken from thin air. It pulls a portion from the freezer, the rice from the pantry, the spices from the rack, and assembles. The pantry is part of the building. It always has been.

The **database** is the pantry. Many durable facts that an app remembers — your profile, order history, shopping cart, or account ledger — live there. The backend reads those facts when it needs them and writes changes back. Some interactions use a cache, file, queue, or another service instead, but most product flows eventually need durable storage somewhere.

If you remember nothing else, remember this: the database persists facts, while the product's code and configuration determine which correctness guarantees you actually get.

---

## Why "spreadsheet" is the right model

Open a blank spreadsheet in your head. A grid. Rows going down, columns going across. The column headers at the top say things like `name`, `email`, `phone`, `signed_up_at`. Each row is one customer. There might be ten thousand rows.

That's a database **table**. Most databases are made up of dozens or hundreds of tables. Customers, orders, products, payments, sessions, audit logs: each one is a separate sheet, each with its own columns, each with its own rows.

A few specifics that pay off:

- **Each row** is one of whatever the table is about. One customer, one order, one payment. A row is sometimes called a **record**.
- **Each column** is one piece of information about that thing. The `email` column has every customer's email; the `signed_up_at` column has when each customer signed up. A column is sometimes called a **field**.
- **Tables relate to each other.** A row in `orders` will refer to a row in `customers` — the customer who placed the order. The reference is a column called something like `customer_id` that holds a number pointing at the matching row. This relating-rows-across-tables is what makes a database more than a pile of spreadsheets.

Picture a shopping site. Three tables: `customers`, `products`, `orders`. When you place an order, the backend writes one new row to `orders`: your customer ID, the product ID, the quantity, the timestamp. When you open your order history, the backend reads all rows from `orders` where the `customer_id` matches yours, and joins each row to the matching `products` row to get the names, and shows you the result. Every order page you've ever seen is one of those joins, dressed up in a UI.

---

## What "fast" means here

One thing a database does that a spreadsheet *can't* do is stay useful at scale while many people and services read and change data together.

A spreadsheet with ten thousand rows is fine. A spreadsheet with ten million rows starts to wheeze. Databases can hold billions of rows and still answer well-shaped questions quickly.

One reason is **indexes**. An index is a precomputed shortcut — a structure optimised for a specific kind of question. *"Find me all orders for customer #1234"* without a useful index may mean scanning every row in the orders table. With an index on `customer_id`, the database can go much closer to the right rows. Production tables often have several indexes, each tuned to common queries.

Indexes help, but they are not magic. Query shape, data volume, locks, traffic, memory, disk, and network time can all matter. Engineers inspect the query plan and measurements before deciding whether another index is the fix; an unused index only adds storage and slows writes.

---

## Reads and writes

There are really only two things you ever do to a database:

- **Read.** "Tell me what's in here." Show me my balance. List my orders. Search for users with a specific email. Find every payment in the last hour.
- **Write.** "Change what's in here." Insert a row when a user signs up. Update a row when someone changes their address. Delete a row when an order is cancelled. A bad write can leave durable bad data, so important writes need validation and recovery plans.

A database supplies mechanisms for the guarantees a product needs. The application and database configuration still have to use them correctly:

- **Consistency rules** define what a read may see while other writes are happening. Different isolation levels make different trade-offs; a replica may also lag behind the primary.
- **Transactions and constraints** can make a group of changes succeed or fail together and reject invalid states. "Only one person buys the last item" works only when the application encodes that rule correctly.
- **Durability settings** control when an acknowledged write is considered safely persisted. Stronger durability reduces loss risk; asynchronous modes may acknowledge sooner while accepting a small loss window after a crash.

These are not footnotes. They are design choices that help make the difference between *"my balance is correct"* and *"two services disagree about my balance."* When correctness matters, ask which guarantee the system actually implements rather than assuming the word *database* provides it automatically.

---

## The language databases speak

Most databases speak a language called **SQL** (pronounced *"sequel"* or *"S-Q-L"*, both are fine). It looks like this:

```sql
SELECT name, email
FROM customers
WHERE signed_up_at > '2026-01-01';
```

Read that as: *"Give me the name and email of every row in the `customers` table where the signed_up_at date is after Jan 1 2026."* It's English-y on purpose. SQL was designed in the 1970s to be readable by non-programmers — they didn't entirely succeed, but the language is much easier to read than any other programming language you'll meet.

You don't need to learn SQL to read this playbook. But you'll see it pasted into Slack threads when an engineer is debugging something, and now you know what you're looking at. *"This query is slow"* means the team needs evidence: the query plan, timing, data volume, load, and whether it is waiting on another operation.

Other database families are often grouped under *NoSQL*. They use different data models and trade-offs, and some are common at large scale. SQL is still the lingua franca for product and analytics conversations; if you recognise one database language first, make it this one.

---

## What goes wrong with databases (in plain English)

The four things you'll hear blamed on the database, with the actual meaning of each:

- **"The database is slow."** A query or the whole service is taking too long. Possible causes include a poor query plan or missing index, too much work, lock contention, overloaded capacity, or a slow dependency. The fix starts with measurements, not an index-shaped guess.
- **"The database is down."** The application cannot get a usable response. A database process may have failed, connections may be exhausted, the network may be broken, or traffic may be overwhelming the service. Recovery might include failing over to a standby, restoring capacity, or fixing the path to it.
- **"The data is wrong."** Either a buggy write happened (some code put bad data into a row), or a buggy read is *interpreting* good data badly. The database itself rarely loses data; the bugs are in the code around it.
- **"The schema needs to change."** The shape of the tables (which columns exist and what types they are) needs updating because the product is changing. A *migration* applies that change while other code may still be using the old shape, so teams plan compatibility, rollout, and rollback carefully.

### A 30-second incident translation

When someone says *"the database is slow,"* do not prescribe a fix from the phrase alone. Ask:

1. **Scope:** one query, one endpoint, or the whole service?
2. **Timing:** constant, started after a change, or only under load?
3. **Evidence:** what do the query plan, latency, lock, connection, and capacity signals show?

That short checklist turns a vague diagnosis into a useful product conversation without pretending you already know the root cause.

---

## What you should carry into the next chapter

- **A database is structured, durable storage.** Linked spreadsheets are a useful first picture; tables are sheets, rows are records, columns are fields.
- **Many product flows eventually read or write durable data.** Others may use caches, files, queues, or another service along the way.
- **Tables relate to each other** through reference columns (`customer_id`, `product_id`). Joining across tables is most of what useful queries do.
- **SQL is the language relational databases speak.** You don't have to learn it; you just have to recognise it when you see it.
- **Transactions, constraints, isolation, and durability create product guarantees only when configured and used correctly.** The application owns part of that contract.
- **Slow is a symptom, not a root cause.** Ask about scope, timing, and evidence before suggesting a fix.
- The next chapter ([0A.5 — APIs and UIs](05-api-vs-ui.md)) is about the two *interfaces* every product has (the menu and the order ticket) and the format that connects them.

---

**Previous:** [← 0A.3 What is a server, what is a client?](03-server-client-http.md) · **Next:** [→ 0A.5 What is an API? What is a UI?](05-api-vs-ui.md)

**Further reading**
- [Use The Index, Luke!](https://use-the-index-luke.com/) — a beautifully written, free intro to how indexes actually make databases fast (more depth than this chapter; less depth than a textbook)
- [Julia Evans — How does SQL work?](https://wizardzines.com/zines/sql/) — paid; the most readable visual intro to SQL queries you'll find
- [PostgreSQL — Using `EXPLAIN`](https://www.postgresql.org/docs/current/using-explain.html) — how engineers inspect a query plan before guessing at a performance fix
- [PostgreSQL — Transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html) — why concurrent reads and writes do not have one universal behaviour
- [PostgreSQL — Asynchronous commit](https://www.postgresql.org/docs/current/wal-async-commit.html) — an official example of durability and latency being an explicit trade-off
