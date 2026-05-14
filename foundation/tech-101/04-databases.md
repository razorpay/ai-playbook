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
updated: "2026-04-26"
---

# 0A.4 — Databases (the world's most important spreadsheet)

> **⏱ 8 minutes · 👥 Anyone curious · 🎯 Leaves with:** the right mental model for the place where every fact your favourite app remembers actually lives.

---

## The one-sentence answer

**A database is a giant, structured, fast-to-search spreadsheet that lives on a server and remembers things.**

That's the whole picture. Yes, real databases are more sophisticated than a single Excel sheet, but a spreadsheet is the right mental model for almost every practical conversation you'll have about them. Hold the spreadsheet image in your head. The rest of this chapter is just refining the picture.

---

## Picking up the kitchen metaphor

In chapter 0A.2 we said the backend is the kitchen — where the actual work gets done. In chapter 0A.3 we met the waiter (the HTTP request) carrying tickets back and forth between the dining room and the kitchen. The natural next question is: *where do the ingredients come from*?

Every kitchen has a pantry, a fridge, a freezer. Stuff that's been prepped and stored, ready to be pulled and used. When the waiter brings an order ticket (*one chicken biryani, no onions*) the kitchen doesn't conjure the chicken from thin air. It pulls a portion from the freezer, the rice from the pantry, the spices from the rack, and assembles. The pantry is part of the building. It always has been.

The **database** is the pantry. Every fact that your app remembers — your name, your email, your bank balance, your order history, the contents of your shopping cart, the message you sent last week — lives in there. Every time the backend has to *do* something, it pulls from the database. Every time something interesting happens, the backend writes back to the database. *Every meaningful interaction with software is, at the bottom, a read or a write to a database.*

If you remember nothing else from this chapter, remember that line.

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

The thing a database does that a spreadsheet *can't* do is stay fast at scale.

A spreadsheet with ten thousand rows is fine. A spreadsheet with ten million rows starts to wheeze. A spreadsheet with ten *billion* rows isn't a meaningful object — Excel won't open it. Databases routinely hold billions of rows and answer questions about them in milliseconds.

The reason is **indexes**. An index is a precomputed shortcut — a different sorted view of the same data, optimised for a specific kind of question. *"Find me all orders for customer #1234"* without an index means scanning every row in the orders table. With an index on the `customer_id` column, the database jumps straight to the right answers in microseconds. Most production database tables have several indexes, each tuned to the questions that get asked most often.

You don't need to think about indexes day-to-day. You'll just hear engineers say things like *"this query is slow, we need an index"* — that's the conversation. The database is fast because it's been carefully shaped for the questions that get asked of it.

---

## Reads and writes

There are really only two things you ever do to a database:

- **Read.** "Tell me what's in here." Show me my balance. List my orders. Search for users with a specific email. Find every payment in the last hour. Reads are the overwhelming majority of what a database is asked to do — for most apps, the read-to-write ratio is more like 100:1.
- **Write.** "Change what's in here." Insert a new row when a user signs up. Update a row when someone changes their address. Delete a row when an order is cancelled. Writes are rarer but more dangerous: if a write goes wrong, the data is wrong forever (or until somebody fixes it manually, which is often).

A handful of things a database guarantees, that you'll see referenced casually:

- **Reads return what was last written.** If you save a change, the next read will see it. (There are exceptions in distributed databases (the famous *eventual consistency* trade-off) but for most apps, most of the time, last-write-wins.)
- **Two writes can't conflict in nonsense ways.** If two users hit "buy the last item" at the same instant, exactly one of them will succeed and the other will fail cleanly. The database refuses to half-do things.
- **Crashes don't lose finished writes.** Once the database has acknowledged your write, it's safely on disk. Power can go out and the write is still there when it comes back.

These guarantees are bigger deals than they sound. They're what make payments work. They're what make the difference between *"my balance is correct"* and *"my balance might be correct, depending."*

---

## The language databases speak

Most databases speak a language called **SQL** (pronounced *"sequel"* or *"S-Q-L"*, both are fine). It looks like this:

```sql
SELECT name, email
FROM customers
WHERE signed_up_at > '2026-01-01';
```

Read that as: *"Give me the name and email of every row in the `customers` table where the signed_up_at date is after Jan 1 2026."* It's English-y on purpose. SQL was designed in the 1970s to be readable by non-programmers — they didn't entirely succeed, but the language is much easier to read than any other programming language you'll meet.

You don't need to learn SQL to read this playbook. But you'll see it pasted into Slack threads when an engineer is debugging something, and now you know what you're looking at. *"This query is slow"* almost always means "this SQL statement takes too long to run, probably because there's no index on the column it's filtering by."

A few non-SQL databases exist (collectively called *NoSQL*), and they have their own languages and trade-offs. They matter for certain specialised workloads but rarely for the kind of conversations you'll have. SQL is the lingua franca; if you only ever recognise one database language, make it that one.

---

## What goes wrong with databases (in plain English)

The four things you'll hear blamed on the database, with the actual meaning of each:

- **"The database is slow."** Almost always: a query is missing an index. The database has too much data to scan and the question being asked isn't tuned for what it has. Fix is small (add the right index) but takes coordination because indexes themselves cost storage and slow down writes.
- **"The database is down."** A specific database server isn't responding. Usually the underlying machine has crashed, run out of memory, or got swamped with too many requests at once. The fix is "bring it back up," sometimes via failing over to a standby copy.
- **"The data is wrong."** Either a buggy write happened (some code put bad data into a row), or a buggy read is *interpreting* good data badly. The database itself rarely loses data; the bugs are in the code around it.
- **"The schema needs to change."** The shape of the tables (which columns exist, what types they are) needs updating because the product is changing. *Migrations* (the formal name for renaming a column or adding a new one) are surprisingly painful operations because they have to happen on a live database that other code is also using. Most production-incident horror stories involve a migration somewhere.

You don't need to memorise any of this. But "the database is slow" is something you'll hear in incident channels, and the response *"have you checked indexes?"* is the right one nine times out of ten.

---

## What you should carry into the next chapter

- **A database is a structured, fast-to-search spreadsheet that lives on a server.** Tables are sheets, rows are records, columns are fields.
- **Every meaningful interaction with software is, at the bottom, a read or a write to a database.** Hold this image in your head.
- **Tables relate to each other** through reference columns (`customer_id`, `product_id`). Joining across tables is most of what useful queries do.
- **SQL is the language databases speak.** You don't have to learn it; you just have to recognise it when you see it.
- **The four common database problems** are slowness (missing indexes), unavailability (server down), bad data (buggy writes), and migrations (changing the shape). Each is a different conversation.
- The next chapter ([0A.5 — APIs and UIs](05-api-vs-ui.md)) is about the two *interfaces* every product has (the menu and the order ticket) and the format that connects them.

---

**Previous:** [← 0A.3 What is a server, what is a client?](03-server-client-http.md) · **Next:** [→ 0A.5 What is an API? What is a UI?](05-api-vs-ui.md)

**Further reading**
- [Use The Index, Luke!](https://use-the-index-luke.com/) — a beautifully written, free intro to how indexes actually make databases fast (more depth than this chapter; less depth than a textbook)
- [Julia Evans — How does SQL work?](https://wizardzines.com/zines/sql/) — paid; the most readable visual intro to SQL queries you'll find
- [PostgreSQL: A Curious Mystery](https://www.postgresql.org/about/) — for when you want to understand why one database has been beating all the others for thirty years
