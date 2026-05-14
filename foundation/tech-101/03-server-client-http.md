---
title: "What is a server? What is a client? What is HTTP?"
slug: "tech-101/server-client-http"
section: "foundation"
status: "drafted"
type: "chapter"
track: "tech-101"
order: 3
time_minutes: 10
audience: "anyone-curious"
outcome: "Understand the request-and-response conversation behind most software."
prev: "tech-101/frontend-vs-backend"
next: "tech-101/databases"
pillar: null
belt: null
tags: ["software-basics", "http"]
updated: "2026-04-26"
---

# 0A.3 — What is a server? What is a client? What is HTTP?

> **⏱ 10 minutes · 👥 Anyone curious · 🎯 Leaves with:** the right mental picture for the conversation that happens behind every screen you've ever loaded.

---

## The one-paragraph answer

A **client** is a computer that *asks* for things. A **server** is a computer that *answers*. The client is usually your phone or laptop; the server is usually a machine in a giant warehouse somewhere far away. **HTTP** is the language they use to pass questions and answers back and forth. That's it. The rest of this chapter is just colour.

---

## Picking back up where we left off

In chapter 0A.2 we said the frontend lives on your device and the backend lives on a server somewhere else, and they talk to each other over the internet. That sentence is still true — but the next time you hear someone say "the API is slow today" or "the server is down" or "the frontend can't reach the backend," you'll want a slightly sharper picture of what's actually going on.

The picture is, mercifully, simple. There are two roles. One asks. One answers. They speak a common language. *That's the whole architecture of the internet.* Everything else is detail.

---

## Client and server, in a single picture

```
   ┌──────────────────────────┐                  ┌────────────────────────┐
   │       CLIENT             │                  │       SERVER           │
   │  (your phone, laptop,    │ ───── asks ────▶ │  (a computer in a      │
   │   browser, app)          │                  │   warehouse somewhere) │
   │                          │ ◀──── answers ── │                        │
   │  Runs the frontend.      │                  │  Runs the backend.     │
   │  One per user.           │                  │  One serves millions.  │
   └──────────────────────────┘                  └────────────────────────┘
```

The two roles are *roles*, not types of hardware. Your laptop is a client when it's loading a webpage. Your laptop *could be* a server too if you set it up that way (hint: when you run `npm run dev` later in White Belt, you'll briefly turn your laptop into a server, talking to a client that's also your laptop — it's fine and it's normal).

What makes something a server, in practice, is two things:

1. **It's reachable from far away.** It has an address (we'll come to that) and it's *listening* for requests at all times.
2. **It's serving many clients at once.** A typical production server is handling hundreds or thousands of conversations simultaneously, like a very busy waiter who can sprint between tables faster than you can blink.

Your phone is a client because it's only ever asking on your behalf. The server you're talking to is also talking to thousands of other phones at the same instant. That asymmetry (*one server, many clients*) is the shape of basically every product you use.

---

## Where servers actually live

You'll hear "the server" said as if it's one thing. In reality, "the server" for any meaningful product is usually:

- A handful of physical computers in a data centre: a giant warehouse full of servers, racks and racks, owned by a cloud provider.
- *Plus* a copy of the same set in another data centre on another continent (so when one warehouse loses power, the other one keeps things running).
- *Plus* a few tiers of caching layers in between, which exist to hand back common answers fast without bothering the real servers.

When someone says "the server is down" they almost always mean *one logical server* (the bit doing checkout, or the bit doing search) not the building. Buildings rarely go down. Logical-servers go down all the time, usually for reasons that have nothing to do with the hardware.

You don't need to know any more than that. The mental picture you want is: **somewhere far away, some computers are listening, they have your stuff, and they answer when asked.**

---

## How they find each other (very briefly)

When you type `razorpay.com` into a browser, your browser doesn't actually know where Razorpay's servers are. It asks a phone-book-of-the-internet called **DNS** ("domain name system"), which tells it the *address* — a number like `34.117.65.142` — that the server is reachable at. Your browser then fires off its question to that address. The address is called an **IP address**; the name is called a **domain**; DNS is the lookup that turns the name into the address.

You don't need to retain any of that vocabulary unless you want to. The only practical reason it ever matters in an ops or product conversation is that *DNS itself can break*, in which case "the site is down" might really mean "the phone book is broken and nobody can find the address right now." It's a possibility worth knowing exists.

---

## HTTP — the language of the conversation

So clients ask, servers answer. *In what language?*

The dominant language is called **HTTP** ("hypertext transfer protocol"). HTTPS is the same thing with encryption added (the *S*). Almost every website, app, and API on the internet speaks HTTP. It's old, it's a bit baroque, and it's the lingua franca.

An HTTP **request** has three meaningful parts:

- **A method.** A verb. The most common are `GET` ("show me") and `POST` ("here's something new, do something with it"). There are a handful of others (`PUT`, `DELETE`, `PATCH`) that don't matter much for our purposes today.
- **A URL.** Where the request is going. `https://api.razorpay.com/v1/payments` is a URL. It tells the request which server, and which piece of information at that server.
- **A body.** Optional. The actual content of the request. A `GET` usually has no body — you're just asking. A `POST` usually has a body — you're sending data.

An HTTP **response** has three meaningful parts:

- **A status code.** A three-digit number telling you, at a glance, what happened. **2xx** = success (`200 OK` is the famous one). **3xx** = redirect ("the answer is over there"). **4xx** = you, the client, asked badly (`404 Not Found`, `401 Unauthorized`, `403 Forbidden`). **5xx** = the server messed up (`500 Internal Server Error`, `503 Service Unavailable`). Memorise the *families*, not the codes — they cover 95% of the conversations you'll need to have.
- **Headers.** Bits of metadata about the response. Mostly you can ignore them; occasionally one matters.
- **A body.** The actual answer. Usually JSON (we'll meet JSON in chapter 0A.5) or HTML (the language of webpages).

When you load any webpage, your browser is sending dozens of HTTP requests behind the scenes — one for the page itself, one for the stylesheet, one for each image, one for each script — and stitching the responses together into the rendered page you see.

---

## Status codes, in plain English

You'll hear status codes used as shorthand in incident channels and in error messages. The five families, with the mental model:

- **`2xx` — "I did it."** Most often `200 OK`. Things worked.
- **`3xx` — "Look over there."** Redirects. The browser follows them automatically; you rarely see them as a user.
- **`4xx` — "You asked wrong."** The client (you, your app) sent something the server didn't accept. `404` = "no such thing here." `401` = "you're not logged in." `403` = "you're logged in but not allowed." `400` = "your request was malformed."
- **`5xx` — "I messed up."** The server tried, but failed. `500` is the generic "something went wrong on our end." `503` = "I'm overloaded, try again."
- **Anything weirder than that.** Almost always either a proxy in the middle (a server-in-front-of-the-server) or someone returning the wrong code on purpose. Don't worry about it for now.

When the dashboard is misbehaving and an engineer asks "what status code did you see?", they're asking which family it was in. *4xx versus 5xx tells them whose fault it likely is*, and that's most of the diagnostic value of the question.

---

## A worked example

You open your phone. You tap your bank app. Here's roughly what happens, with names:

1. The app (the **client**) makes an HTTP `GET` request to `https://bank.example.com/api/v1/balance`. It includes a header that says "I am this user, here's my session token."
2. The request travels over the internet: through your phone's cell tower, through a chain of routers, eventually arriving at one of the bank's **servers** in a data centre.
3. The server reads the request. It checks the token (is this really you?). It queries its **database** (next chapter — the spreadsheet that has everyone's balances). It computes the right number for *you*.
4. The server sends back an HTTP **response**. Status code `200 OK`. Body: `{"balance": "12345.67", "currency": "INR"}` — that's JSON, the most common shape of HTTP response bodies these days.
5. Your app receives the response, parses the JSON, takes the `12345.67`, formats it as `₹12,345.67`, and renders it on the screen.

That whole conversation happened in under a second. It happens every single time you open the app. Multiply by every user; that's the load on the server.

If anything in that chain fails (token expired, server overloaded, network hiccup, database hung) you see one of the symptoms you've grown up with: *"please try again," "session expired," "we couldn't load your balance."* Each of those is a slightly different failure mode. The error code in the response body tells the engineer exactly which.

---

## What you should carry into the next chapter

- **Client = asker. Server = answerer.** One conversation, two roles. Always.
- **The server is a computer in a data centre, listening, serving thousands of clients at once.** Your phone is a client; somebody's laptop running `npm run dev` is briefly a server too.
- **HTTP is the language they speak.** Method + URL + (sometimes) body in the request; status code + headers + body in the response.
- **Status codes come in families.** 2xx success, 3xx redirect, 4xx your-fault, 5xx my-fault. Knowing the family is most of the diagnostic value.
- **JSON is the most common shape of response bodies.** We'll meet it properly in chapter 0A.5.
- The next chapter ([0A.4 — Databases](04-databases.md)) is the place inside the server where all the *facts* live — the world's most important spreadsheet.

---

**Previous:** [← 0A.2 Frontend vs backend](02-frontend-vs-backend.md) · **Next:** [→ 0A.4 Databases](04-databases.md)

**Further reading**
- [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) — Mozilla's authoritative plain-language reference
- [Julia Evans — How HTTP works](https://wizardzines.com/zines/http/) — paid zine, the most readable thing on the topic
- [What is a Server? — Cloudflare's primer](https://www.cloudflare.com/learning/cloud/what-is-a-server/) — short, friendly, with diagrams
