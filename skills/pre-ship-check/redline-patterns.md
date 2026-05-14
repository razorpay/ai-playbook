# pre-ship-check — redline patterns

> **What this is.** The patterns Layer 1 of `pre-ship-check` scans for. Cross-references [Appendix H — Reference Cards](../../appendices/H-reference-cards/README.md) as the canonical policy source.

This file is the operational complement to Appendix H. Appendix H names the cards; this file names the patterns the skill matches against. When policy changes (a new card, a new tightening), edit Appendix H first; then mirror the change here.

---

## Category 1 — Credentials

**Cards (Appendix H).** "Never paste credentials." "Never paste tokens." "Never paste env values."

**Patterns the skill scans for.**

- `Bearer <token-shaped string>` — long opaque string after `Bearer`.
- `Authorization: <token-shaped string>` in any HTTP-shaped context.
- `key=<token-shaped string>` or `apikey=<token-shaped string>` or `api_key=<token-shaped string>`.
- `password=<value>` or `pwd=<value>` or `secret=<value>`.
- `<KEY_NAME>=<value>` shapes in `.env`, `.env.local`, `.env.example` — flag if the value is not a placeholder shape (`example`, `your-token-here`, etc.).
- AWS-shaped credentials: `AKIA[0-9A-Z]{16}` and similar provider-shaped keys.
- Slack-shaped tokens: `xox[baprs]-[a-zA-Z0-9-]+`.
- GitHub-shaped tokens: `ghp_[A-Za-z0-9]{36,}`, `gho_`, `ghu_`, etc.
- Vertex / Google service-account-shaped keys: `-----BEGIN PRIVATE KEY-----` blocks.

**False-positive notes.** Test fixtures and example files often contain placeholder credentials. The scan flags any match; the reviewer confirms whether the value is real (RED) or synthetic (YELLOW with PR-description note).

---

## Category 2 — Money-handling identifiers

**Cards (Appendix H).** "Never paste live transaction IDs." "Never paste payment instrument data."

**Patterns the skill scans for.**

- Payment ID prefixes that match the program's live-shape pattern (e.g. `pay_<alphanumeric>`).
- Order ID prefixes that match the program's live-shape pattern.
- Settlement reference IDs that match the program's live-shape pattern.
- Card-shaped numbers: 13–19 digits with Luhn-valid checksum, in any context.
- Card CVVs: 3–4 digit values near the words `cvv`, `cvc`, `csc`, `card`.
- Bank-account shapes near words like `account_number`, `acc_no`, `bank_account`.

**False-positive notes.** Synthetic test IDs that mirror the live shape are common in fixtures. The scan flags; reviewer confirms.

---

## Category 3 — Raw customer PII

**Cards (Appendix H).** "Never paste customer emails / phones / addresses / IDs."

**Patterns the skill scans for.**

- Email addresses: `<word>@<domain>` shapes. Excludes addresses ending in `.example`, `.test`, `.invalid` (RFC reserved test domains).
- Phone numbers: international shapes (`+<country><number>`), India-shaped 10-digit mobile numbers.
- Aadhaar-shaped strings: 12 digits in `xxxx xxxx xxxx` shape (with or without spaces).
- PAN-shaped strings: `[A-Z]{5}[0-9]{4}[A-Z]{1}`.
- Passport-shaped strings (varies by country; the scan uses a small set of common shapes).
- Postal addresses: rough shape recognition for "address line + city + postal code" near words like `address`, `addr`, `street`.

**False-positive notes.** Documentation, example data, and test fixtures often contain shaped-PII. The scan flags; reviewer confirms whether the value is real or synthetic.

---

## Category 4 — Regulator-protected fields

**Cards (Appendix H).** "Never paste card data (PCI scope)." "Never paste KYC documents (RBI scope)." "Never paste regulator-flagged fields."

**Patterns the skill scans for.**

- Card data fields in any context (PAN, CVV, expiry, magnetic stripe).
- Field names with KYC indicators: `kyc_doc`, `kyc_id`, `aadhaar_doc`, `pan_doc`, `passport_doc`.
- Field names with regulator-flagged tags: `pii_flagged`, `pci_scope`, `rbi_scope`, similar program-tagged shapes.
- Patterns that span categories: a field named `customer_card_data` matches both Category 2 and Category 4; the scan flags under the most-restrictive category.

**False-positive notes.** Fewer than the other categories. PCI-scope shapes especially are rarely false positives; even synthetic-looking card-shaped numbers should be redacted on principle.

---

## Pattern maintenance

The pattern set evolves. Two triggers for a maintenance pass:

- a new redline card lands in Appendix H — mirror the pattern here;
- a calibration retro surfaces a redline shape the scan missed — add the pattern.

Removing patterns requires more care: a pattern that has caught real issues stays in the set even if it produces occasional false positives, because the cost of a missed redline is higher than the cost of a flagged synthetic value.

---

## What this scan does NOT replace

- The redline reflex (G.22). The reflex is the front line; this scan is the safety net.
- The LLM proxy's scan (G.23). The proxy scans every prompt; this scan reads the diff. Different surfaces; both matter.
- Output classifiers (G.25). They scan model output; this scan reads code.
- Human review. A reviewer who reads the diff catches shapes the patterns miss.

The scan is one layer of defence. Layered defence is the program's safety story; relying on any single layer is how things slip.
