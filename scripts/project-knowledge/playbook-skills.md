# Playbook skill references

The seven definitions below are reference implementations in the
`razorpay/ai-playbook` repository. They are **not currently shipped in
the Razorpay Compass plugin**. A Project chat cannot run them, write
`LEARNER.md`, scan a repo, or run shell commands.

Use these definitions to explain what a workflow is designed to do. Do
not give a Compass install command or claim that an invocation phrase
will work. If a user needs a currently runnable internal equivalent,
route them to [#ai-help](https://razorpay.slack.com/archives/C08C35GKJKD)
to confirm the supported distribution. For reading questions, answer
here and cite the live hub.

---

## blade-compliance-reviewer

Run a per-file design-system drift scan on a Razorpay UI file. Reads the file, scans for raw colour or spacing values where Blade tokens exist, ad-hoc components shaped like Blade primitives, missing variants, and accessibility-attribute drift. Trigger phrases include "run blade-compliance on <file>", "/blade-compliance-check <file>", "check this file for design-system drift", "scan this UI for Blade drift". The skill produces a per-line Markdown report with one finding per drift, each naming the line, the drift type, and a suggested fix referencing a real Blade primitive or token. Use when reviewing or self-reviewing a UI file before shipping or after inheriting code that may not be design-system compliant.

Source: `skills/blade-compliance-reviewer/SKILL.md` in razorpay/ai-playbook.

## design-intel

Reads a Figma frame and produces structured design intent that the production-compiler can consume. Outputs a Markdown document naming the components used (with Blade equivalents where they exist), the layout shape, the interaction states, the variants, and the accessibility considerations. Activate when the user wants to translate a Figma design into shippable code and is at the first stage of the design-to-code workflow.

Source: `skills/design-intel/SKILL.md` in razorpay/ai-playbook.

## playbook-course

Walks a learner through the Razorpay Org-Wide AI Playbook one belt at a time, reading the same Markdown the HTML hub serves and tracking progress in a LEARNER.md file in the working directory. Triggers on phrases like "start the playbook", "start white belt", "continue my belt", "what's next in my belt", "where am I in the playbook", "show my progress", "show my learner state", "claim white belt", or "claim yellow belt". Use when a learner wants a paced, conversational walk through belt content with progress tracking and quest/boss-fight gating that records claims without bypassing Appendix L's reviewer protocol.

Source: `skills/playbook-course/SKILL.md` in razorpay/ai-playbook.

## pre-ship-check

Run a six-layer structured review on a branch's diff before opening or merging a PR. The six layers are redlines, design system, tests, PR craft, prompt craft, and behaviour preservation. Trigger phrases include "run pre-ship-check on this branch", "/pre-ship-check", "check before review", "is this ready to ship", "pre-ship this PR", "do the six-layer check". The skill produces a structured Markdown report with one section per layer, a colour (GREEN / YELLOW / RED) per layer, and a final summary line. Use when a Razorpay builder is about to open, merge, or hand off a PR; the Green Belt boss fight requires a clean run as sub-requirement (c).

Source: `skills/pre-ship-check/SKILL.md` in razorpay/ai-playbook.

## production-compiler

Takes raw AI-generated UI code (typically from AI Studio, ChatGPT, or a similar prompt-based UI generator) plus optional design-intel and produces Blade-compliant JSX. Three layers: component substitution (raw primitives → Blade primitives), token application (raw values → Blade tokens), accessibility verification. Activate when the user has raw AI-generated UI code or a Figma design they want translated to Blade-using code.

Source: `skills/production-compiler/SKILL.md` in razorpay/ai-playbook.

## security-review-subagent

Spawn a security-review subagent with the canonical six-check brief and consume the structured findings. The skill reviews a branch's diff for redlines, prompt-injection capability creep, untrusted-input handling, output exposure, injection-vulnerable shapes, and unscoped capabilities. Trigger phrases include "run security-review on this branch", "/security-review", "spawn a security-review subagent for this PR", "security-check this diff". The skill returns a structured Markdown artefact with one section per finding. Use on any PR that touches an agent invocation, an MCP connector grant, untrusted-input ingestion, or a new external surface; the Green Belt boss fight assumes this skill has run on the product-repo PR before review.

Source: `skills/security-review-subagent/SKILL.md` in razorpay/ai-playbook.

## setup-verify

Runs a 10-point reference environment health check and produces GREEN / YELLOW / RED status per check with one-line fixes for any non-green result. Activate when the command is distributed in the current session and the user asks for broader setup diagnosis.

Source: `skills/setup-verify/SKILL.md` in razorpay/ai-playbook.
