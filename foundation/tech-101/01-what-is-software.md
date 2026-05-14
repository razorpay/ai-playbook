---
title: "What is software, really?"
slug: "tech-101/what-is-software"
section: "foundation"
status: "drafted"
type: "chapter"
track: "tech-101"
order: 1
time_minutes: 5
audience: "anyone-curious"
outcome: "A one-sentence answer to what software is and why it matters."
prev: "tech-101"
next: "tech-101/frontend-vs-backend"
pillar: null
belt: null
tags: ["software-basics"]
updated: "2026-04-26"
---

# 0A.1 — What is software, really?

> **⏱ 5 minutes · 👥 Anyone curious · 🎯 Leaves with:** a one-sentence answer to "what is software" that's accurate enough to build everything else on, and a feel for *why software ate the world.*

---

## The one-sentence answer

**Software is instructions for what to do with information.**

That's it. That's the whole thing. Every app you've ever used, every website you've ever opened, every payment you've ever made: at the deepest level, all of them are *instructions*, written down in text, that some piece of hardware reads and follows.

If you remember nothing else from this chapter, remember that sentence. Everything else is detail.

---

## The shape of every program ever written

Pretty much every piece of software, from a calculator to a fighter jet, is doing the same three-step dance:

1. **Take some information in.** A button click. A typed sentence. A photo. The current time. Your bank balance.
2. **Do something to it.** Add it up. Sort it. Search it. Compare it to something else. Translate it. Encrypt it.
3. **Show the result.** A number on a screen. A new line in a chat. A confirmation page. A printed receipt.

Input → process → output. That's the bones.

A calculator: you type `2 + 2`, the program adds them, it shows `4`. A search engine: you type a query, the program looks through a giant pile of pages, it shows the matches. A payment app: you tap a button, the program checks your balance, charges you, updates the balance, and shows a tick. *The shape is identical.* The only thing that varies is what's getting taken in, what's being done to it, and what's coming out.

It helps to think of every screen you've ever stared at as one of those three steps. The form you fill in is the *input* step. The loading spinner is the *process* step. The "thanks, your order is confirmed" page is the *output* step. Once you start seeing software this way, every product begins to feel less like magic and more like a very long sequence of input-process-output, each of which someone wrote down somewhere.

---

## The thing about "instructions written down"

Here's the part that took us forty years to fully appreciate as a species:

Once you write down instructions for what to do with information — once you actually pin them down in text, character by character, precisely enough that a machine can follow them — you can run those instructions a billion times for almost no extra cost.

Compare that to instructions for what to do with *physical* stuff. A cake recipe runs once per cake. A how-to-build-a-house guide runs once per house, slowly, expensively, with permits. The instructions for those things don't get cheaper to follow with practice — every fresh cake costs flour and time, every fresh house costs lumber and months.

But software? You write the instructions for "look up the order, charge the card, show a tick" *once*, and then those instructions run every time anyone, anywhere in the world, places an order. The thousandth order doesn't cost meaningfully more than the first. This is the single weirdest thing about software, and it is the reason a small team in Bangalore can run payments for half the country.

If you've ever wondered why software companies seem to have such enormous valuations relative to how many people work there — this is why. The instructions, once written, work for everyone forever, at almost no cost per use. Pre-software, that was true of nothing at all. Post-software, it's true of an entire industry.

---

## Where the instructions actually live

The instructions are text. Plain, ordinary text, the kind you could type in a notepad. We call that text **source code**, or just *code*, and we'll cover where it lives in chapter 0A.6. For now, it's enough to know that someone wrote down a long list of *if-this-then-that* steps, saved them as text, and a computer reads them top to bottom and does what they say.

The text doesn't run by itself, of course. Something has to read it and act on the steps. That something is a piece of hardware: sometimes the laptop on your desk, sometimes a server in a giant warehouse halfway across the world, often both at once handing pieces of work to each other. We'll meet servers and the laptop side of the conversation in chapter 0A.3. But the *instructions are still just text*, and a person sat down and wrote each line. Software is not summoned. It's authored.

---

## What software needs, to do anything useful

To pull off even simple tasks, software needs three things that you'll meet in the next few chapters:

- **Somewhere to keep stuff.** Your name, your bank balance, your last order. That somewhere is called a **database**, and it's the topic of chapter 0A.4. Picture the world's most powerful spreadsheet.
- **A way to do things to that stuff.** Add it, change it, look it up, hand it to someone else. The instructions for that live on a **server** (chapter 0A.3): a different piece of hardware from yours, sitting in a warehouse somewhere, doing the actual work.
- **A way to show what happened.** A screen. A button. A page that updates. That part is called a **frontend** or a **UI**, and it lives on your phone or laptop, talking back and forth with the server. Chapter 0A.2.

If you're already feeling like this is too many new words at once, that's fine. None of them are hard once you see them in context. They're just names for parts you already use a hundred times a day.

---

## What you should carry into the next chapter

- Software is instructions for what to do with information. Take input, process it, show output.
- Those instructions are *text*: written by people, read by machines, runnable for almost free a billion times once written.
- That "free copies" property is the actual reason software has been such a big deal for the last forty years.
- Three things make software useful: somewhere to keep stuff, a way to do things to it, a way to show the result.
- The next chapter ([0A.2 — Frontend vs Backend](02-frontend-vs-backend.md)) is the most useful single distinction in this whole world. It explains why product friction so often lives at the seam between the two, and why most product conversations make more sense once you can name which side a problem is on.

---

**Previous:** [← Tech 101 README](README.md) · **Next:** [→ 0A.2 Frontend vs backend](02-frontend-vs-backend.md)

**Further reading**
- [Julia Evans — How does the internet work?](https://wizardzines.com/zines/networking/) — a paid zine, but the friendliest illustrated tour of how machines talk to each other you'll find
- [Paul Graham — Beating the Averages](http://www.paulgraham.com/avg.html) — older essay, but a great feel for why "code is just text you can copy" was a revelation in its time
