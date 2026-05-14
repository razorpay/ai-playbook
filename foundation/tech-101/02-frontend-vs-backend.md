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
outcome: "Understand which side of a product change lives on the frontend, backend, or between them."
prev: "tech-101/what-is-software"
next: "tech-101/server-client-http"
pillar: null
belt: null
tags: ["software-basics"]
updated: "2026-04-26"
---

# 0A.2 — Frontend vs backend (and why most product friction lives in between)

> **⏱ 10 minutes · 👥 Anyone curious · 🎯 Leaves with:** the single most useful distinction in tech vocabulary — clear enough to use in your next standup, accurate enough to debug a confusing conversation with.

---

## The one-line answer

**Frontend is the part you can see and click. Backend is the part that does the actual work.**

That's it. Most disagreements about what counts as which boil down to edge cases and naming preferences, but the line above is right 95% of the time. Use it. The 5% will sort itself out.

---

## A picture you can keep in your head

Imagine you walk into a small restaurant. You sit at a table. A menu is handed to you. You make eye contact with a waiter, point to the dish you want, and a few minutes later a plate arrives. From your seat, you've experienced the entire restaurant. Polished tables, attentive waiters, hot food. A great experience.

The kitchen, of course, is doing something completely different. A chef is taking your order from the waiter, pulling ingredients from a fridge, cooking on a stove, plating the dish, and sending it back out. None of that is visible to you. But all of it had to happen for your plate to land.

That's the whole metaphor.

The **frontend** is the dining room: menus, tables, waiters, plates, the smile when the food arrives. It's what you can see and touch as a customer.

The **backend** is the kitchen: fridges, stoves, prep, plating, ticket spike. It's where the actual work happens.

The waiter walking back and forth is the *seam* between the two. We'll come back to that seam in a minute, because it's where most product friction lives.

---

## What this looks like in software

Open any app on your phone right now. The screen you're looking at (the colours, the text, the buttons, the way it animates when you scroll) that's the frontend. The frontend is running *on your device*. Your phone has the instructions, your phone draws the pixels, your phone listens for your taps.

Now tap something that requires real information: open your bank balance, send a message, check your order status. Your phone *cannot* know your balance on its own; that fact lives somewhere else. So the frontend reaches out across the internet to a **server** sitting in a warehouse somewhere, asks "hey, what's this person's balance?" and waits. The server checks the database, computes the answer, sends it back. The frontend takes the answer and turns it into the number you see on screen.

That whole conversation (frontend asks, backend answers) is the dining room and kitchen exchanging order tickets. Every time you do anything that involves real-world information (your money, your messages, your data), this conversation is happening invisibly behind the smooth UI.

A useful test, when you're not sure which side something lives on:

- *Does this still make sense if my phone is offline?* If yes, it's mostly frontend.
- *Does this involve facts that other people also see?* If yes, the backend is involved.
- *Can two users disagree on what's true?* If they can't, the backend is the source of truth and the frontend is just showing it.

---

## Where each side actually lives

A few practical specifics that pay off later:

**The frontend lives on the user's device.** Your phone, your laptop, your tablet. When you open a website, the frontend code is *downloaded* to your device the first time you load the page, and your browser runs it. That's why browsers have to be fast — they're little computers running code that someone else wrote.

**The backend lives on a server, somewhere else.** Usually somewhere you'll never visit: a giant warehouse full of computers, run by a cloud provider, possibly on a different continent. The server holds the information that has to be true for everyone (account balances, message histories, who-is-friends-with-whom) and runs the instructions that change that information.

**They talk to each other through the internet.** Every screen you've ever loaded that involved real data behind the scenes was a back-and-forth: your device asked, a server answered, your device drew the answer. We'll cover the *language* of that conversation (HTTP) in chapter 0A.3 and the *shape* of the messages they pass (APIs) in chapter 0A.5.

---

## Why most product friction lives at the seam

Here's the part that pays off the rest of your career.

Almost every nasty bug, every "we don't know whose problem this is" Slack thread, every "it works on my machine" moment, lives at the seam between frontend and backend. There are a few reasons for this.

**The seam crosses team boundaries.** At most companies, frontend and backend are built by different engineers, often by different *teams*. The dining room reports to one manager; the kitchen reports to another. When something breaks at the seam — the order arrived at the kitchen wrong, or the dish came out wrong, or the dish came out fine but the waiter didn't know whose table it was for — figuring out who's responsible takes a meeting.

**The seam crosses physical boundaries.** A bug that lives entirely in the frontend (a button doesn't change colour when you hover it) is reproducible on your laptop. A bug that lives entirely in the backend (the balance is wrong) is reproducible by an engineer with database access. But a bug at the seam (the page sometimes shows your old balance after you transfer money) requires *both* the frontend's view of the world and the backend's view of the world at the moment things went sideways. That's harder to reproduce, harder to debug, harder to fix confidently.

**The seam is where assumptions diverge.** The frontend engineer was told "the API returns a number." The backend engineer was told "I'll return whatever's in the database." If the database happens to contain a string instead of a number, the seam breaks. Neither side is wrong, exactly — but neither side has the full picture. Most production incidents are some flavour of this.

If you're a PM, designer, or ops person reading this, the practical implication is: **when you write a bug report, name which side you saw it on.** A report that says "I clicked the button and the wrong number showed up" is much more useful when followed by "and when I refreshed, the right number came back." That second sentence is gold — it tells the engineer the database almost certainly has the right answer, and the bug is somewhere on the way back to the screen. You just narrowed the search by 50% without writing any code.

---

## "Full-stack" and why it matters

You'll hear the word **full-stack**. It just means *both sides*. A full-stack engineer is comfortable working on the frontend and the backend. A full-stack feature is one where the same person owned the change in both layers. A full-stack builder (the kind this playbook eventually trains you to be) is someone who can drive a change end-to-end without handing it across a team boundary halfway through.

Why does it matter? Because the seam (the place all the bugs live) is *much easier* to handle when one mind has been on both sides of it. Most of the speed AI coding tools unlock comes from the same source: a single person, with the right tools, can now hold both the dining room and the kitchen in their head at once, and decisions that used to require three meetings happen in one head in five minutes.

Don't worry about earning "full-stack" yet. The belts get you there. White Belt is mostly frontend. Yellow Belt is mostly frontend. Green Belt starts to cross the seam. Black Belt is fluency on both sides. The vocabulary is what's important now.

---

## The third thing that's neither

A small honesty note before the next chapter. There's a third category that doesn't quite fit either bucket, and you'll hear it called **infrastructure** or **devops** or **platform** or **SRE**. It's the layer underneath the kitchen: the building, the electricity, the plumbing, the staff scheduling. Servers themselves have to live somewhere; they have to stay running; they have to scale up when traffic spikes; they have to be backed up when something goes wrong. That work usually doesn't fall on frontend or backend engineers; it falls on a separate team whose job is "keep the kitchen powered."

You don't need to know this layer well to read the rest of this playbook. But when someone says "the API is down" they probably mean a backend bug. When someone says "the *whole site* is down" they probably mean an infrastructure problem. Different vocabulary for different categories of trouble.

---

## What you should carry into the next chapter

- Frontend = what you see and click. Backend = what does the work. Most "is this frontend or backend?" debates are settled by *can this still happen if my phone is offline?*
- The frontend lives on the user's device. The backend lives on a server somewhere far away. They talk over the internet.
- Most product friction lives at the seam: because the seam crosses team boundaries, physical boundaries, and assumption boundaries.
- A bug report that names *which side* you saw a problem on is dramatically more useful than one that doesn't.
- The next chapter ([0A.3 — What is a server? What is a client?](03-server-client-http.md)) zooms in on that "talks over the internet" part. Servers, clients, and the language they use to pass tickets back and forth.

---

**Previous:** [← 0A.1 What is software, really?](01-what-is-software.md) · **Next:** [→ 0A.3 What is a server? What is a client?](03-server-client-http.md)

**Further reading**
- [MDN — Server-side vs client-side overview](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview) — Mozilla's plain-language explanation of the same split, with diagrams
- [Julia Evans — How HTTP works](https://wizardzines.com/zines/http/) — paid but fantastic; the friendliest illustrated tour of how the seam actually communicates
- [Stripe — engineering culture posts](https://stripe.com/blog/engineering) — for what good frontend↔backend collaboration looks like in a fintech context
