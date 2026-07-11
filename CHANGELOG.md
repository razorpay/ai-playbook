# Razorpay AI Playbook — Changelog

Version history for the playbook. Each entry covers what changed, why, and where to find the work.

The Master Index used to carry this changelog inline. As of v0.23 it lives here so the Master Index can be a navigation tool rather than a release log. See [INDEX.md](./INDEX.md) for the canonical table of contents.

---

## v0.48 — reference-card support-route alignment (2026-07-11)

The H.2 Terminal and H.3 Git printable cards still told stuck learners to ask in "the program's primary support channel" even though Appendix F and H.7 now name `#ai-help` as the active routed help surface. These are stop-and-ask moments for Day-1 readers, so the card should carry the actual channel link instead of a placeholder.

**What changed.**

- **Reference-card escalation routes named.** H.2 now routes unclear terminal errors and accidental `rm` recovery to [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD); H.3 routes uncertain merge-conflict recovery there too.
- **Version markers bumped.** README and INDEX now report v0.48 / 2026-07-11 for this support-route alignment.

## v0.47 — context-window exhaustion FAQ (2026-07-09)

Recent `#ai-help` threads showed the same context-bloat failure from several angles: `Prompt is too long`, context limits after one or two prompts, and fresh sessions where `hi` already consumed a large slice of the window. The playbook taught the concept in Green Belt G.2, but Appendix D did not give support-style triage for builders who are blocked in the moment.

**What changed.**

- **Appendix D FAQ added.** D.14 documents the symptom, separates context exhaustion from LiteLLM quota/model errors, and gives the fresh-session, `/context`, plugin/MCP/hook isolation, and debug-escalation path.
- **Index summary updated.** The Appendix D index row now names the new Layer 3 context-window FAQ instead of implying all promoted entries are still Layer 0 setup items.
- **Version markers bumped.** README and INDEX now report v0.47 / 2026-07-09 for this support-FAQ addition.

## v0.46 — LiteLLM enrollment FAQ (2026-07-09)

Recent `#ai-help` threads showed a repeated Day-1 setup gap: builders can have a Claude.ai enterprise seat or a completed local setup, but still be blocked because their LiteLLM gateway account/key is not provisioned or current models are not enabled on the key. That is different from a retired-model default, a quota cap, or an expired local key.

**What changed.**

- **New setup failure mode.** W.5 now separates missing LiteLLM enrollment/model grants from retired Opus defaults and quota exhaustion.
- **Appendix D FAQ added.** D.13 documents the provisioning request, Add Models step, two-to-three-minute cache wait, Claude Code restart, direct `/model ...` selection, and usage-dashboard login path.
- **Version markers bumped.** README and INDEX now report v0.46 / 2026-07-09, the Appendix D index summary counts thirteen Layer 0 entries, and W.6's failure-mode pointer follows the renumbered quota entry.

## v0.45 — mental-model gateway diagram alignment (2026-07-07)

The Prologue §0.3 five-layer chapter had two bits of drift: the prose still described the LiteLLM gateway as routing only to Claude models, while W.6 now teaches enabled Claude/GPT/approved open-weight routes; the rendered SVG also labelled the user as Layer 5 even though the same chapter defines Layer 5 as Claude Code and Layer 1 as Files.

**What changed.**

- **Gateway wording aligned.** Prologue §0.3 now describes LiteLLM as applying current model-family policy and routing to enabled provider routes instead of hardcoding Anthropic-only routing.
- **Diagram aliases corrected.** Both `03-mental-model.svg` and the canonical `5-layer-mental-model.svg` now use the same Layer 1–5 ordering as the chapter text and ASCII diagram.
- **Version markers bumped.** README and INDEX now report v0.45 / 2026-07-07 for this mental-model correction.

## v0.44 — open-weight quota wording (2026-07-06)

The 2026-07-06 `#ai-help` queue clarified the quota model one notch further: each engineer has a monthly budget with per-model caps for frontier models, while open-weight models such as Kimi, Qwen, and DeepSeek draw from the overall budget without per-model caps. The v0.43 wording correctly depinned dollar amounts, but overgeneralised sublimits to OSS routes.

**What changed.**

- **Open-weight fallback wording corrected.** W.5, Appendix D, Appendix F, and H.7 now distinguish frontier-model caps from open-weight models that draw from the overall LiteLLM budget.
- **Total-budget caveat preserved.** The fix still says another gateway model or personal Claude Max plan will not bypass total-budget exhaustion.
- **Version markers bumped.** README and INDEX now report v0.44 / 2026-07-06 for this quota-wording correction.

## v0.43 — policy-managed LiteLLM cap wording (2026-07-05)

The 2026-07-05 `#ai-help` queue showed a builder's visible spend limit changing from `$100` to `$50` to `$20`; support clarified that per-model caps and total monthly budgets are centrally managed and can change based on platform policy or overall spend. The playbook should teach Day-1 builders to trust the gateway error and route business blockers, not treat one week's dollar amount as a durable entitlement.

**What changed.**

- **Quota wording depinned.** Prologue §0.3, W.5, Appendix D, Appendix F, and H.7 now describe current caps as LiteLLM-managed policy values rather than fixed promise amounts.
- **Escalation path preserved.** The fix still distinguishes model-family caps from total-budget exhaustion and keeps manager-approved `#ai-help` exception review as the blocker path.
- **Version markers bumped.** README and INDEX now report v0.43 / 2026-07-05 for this quota-language correction.

## v0.42 — LiteLLM total-cap clarification (2026-07-03)

The 2026-07-03 support thread clarified that the `$750` LiteLLM total budget is enforced across all gateway models, including OSS routes like `glm-5p2`; a personal Claude Max plan is not a bypass for Razorpay's gateway cap. The prior wording correctly taught model-family fallbacks, but it still implied OSS was separate enough to try after total `Budget=750.0` exhaustion.

**What changed.**

- **Quota mental model corrected.** Prologue §0.3, W.5, Appendix D, Appendix F, and H.7 now distinguish model-family caps from total LiteLLM budget exhaustion.
- **Fallback wording narrowed.** Sonnet/Codex/OSS fallback advice now applies to model-family caps; total-budget exhaustion routes to reset or manager-approved `#ai-help` exception review.
- **Version markers bumped.** README and INDEX now report v0.42 / 2026-07-03 for this quota-guidance correction.

## v0.41 — diagram inventory count alignment (2026-07-02)

The first-read inventory still claimed twelve signature/theme-aware SVG diagrams even though the diagram directory documents nine signature diagrams, with two legacy alias SVGs kept only so older chapter references continue to resolve. The drafted-content inventory should match the repository shape instead of inflating the visual surface.

**What changed.**

- **README inventory corrected.** The repository layout now says `diagrams/` contains nine signature SVG diagrams plus two legacy aliases.
- **What's Shipping aligned.** Prologue §0.12 now reports nine signature SVG diagrams, two legacy aliases, and seven Excalidraw companions.
- **Version markers bumped.** README and INDEX now report v0.41 / 2026-07-02 for this inventory-count cleanup.

## v0.40 — retired Opus default cleanup (2026-07-02)

The 2026-07-01 support queue showed repeated `exceeded budget for model=claude-opus-4-6` errors after Opus 4.6/4.7 were retired. W.5, W.6, Appendix D, Appendix F, and H.7 still carried the old Opus default in settings snippets or troubleshooting rows, which could teach a new builder to copy the stale model back into config.

**What changed.**

- **Setup snippets corrected.** W.5 and H.7 now show `ANTHROPIC_DEFAULT_OPUS_MODEL` as `claude-opus-4-8`.
- **Troubleshooting rows aligned.** W.5, W.6, Appendix D, Appendix F, and H.7 now distinguish retired Opus defaults from real model-family or total-budget caps.
- **Version markers bumped.** README and INDEX now report v0.40 / 2026-07-02 for this model-default cleanup.

## v0.39 — model-wise usage-limit guidance (2026-06-30)

The support surface changed from a single shared-budget explanation to model-wise limits: the 2026-06-30 product-function announcement says code usage should go through LiteLLM in the CLI with a $750 total cap, Opus/Sonnet/GPT sublimits, and OSS models treated separately. The previous FAQ still implied that every gateway model switch was useless once quota pain appeared, which is too coarse for Day-1 triage.

**What changed.**

- **Prologue and W.5 updated.** The mental model and canonical setup chapter now distinguish model-family sublimits from total LiteLLM `Budget=750.0` exhaustion and point routine work toward Sonnet, Codex, or enabled OSS instead of automatic quota bumps.
- **Appendix D and H.7 aligned.** The known-issues FAQ and Day-1 quick reference now carry the same model-wise-limit wording and cite the 2026-06-30 support/announcement evidence.
- **Version markers bumped.** README and INDEX now report v0.39 / 2026-06-30 for this quota-guidance refresh.

## v0.38 — dead maintainer-artifact cleanup (2026-06-30)

`CONTRIBUTING.md` and `slugs.yml` still referenced two root-level maintainer artefacts, `RESEARCH-BRIEF.md` and `V0.4-CLEANUP-PLAN.md`, that are no longer present in the repository. That left contributors with a broken source-of-truth link and left the slug map advertising internal pages that cannot resolve.

**What changed.**

- **Maintainer guidance corrected.** `CONTRIBUTING.md` now says the original research brief was folded into the maintainer manual, roadmap, and chapter set instead of pointing at a missing file, and it names the seven review principles consistently.
- **Directory layout corrected.** The sample root tree no longer lists `RESEARCH-BRIEF.md`, and the roadmap description now matches the current v1.0 path wording.
- **Slug map cleaned.** `slugs.yml` no longer advertises `research-brief` or `v0.4-plan` entries whose targets are absent.
- **Version markers bumped.** README and INDEX now report v0.38 / 2026-06-30 for this maintainer-artifact cleanup.

## v0.37 — setup-verify auth command alignment (2026-06-30)

The setup-verify skill docs still referenced a stale `claude code login --plan=program` command family even though the current Claude CLI exposes authentication under `claude auth`. A Day-1 reader following the skill's Check 2 fix would copy a command the live CLI does not support.

**What changed.**

- **Check 2 one-line fix corrected.** `skills/setup-verify/one-line-fixes.md` now uses `claude auth login --sso` and `claude auth logout && claude auth login --sso`.
- **Worked output and tests aligned.** `output-shape.md` and `test-cases.md` now use the current `claude auth status --text` probe and the same auth-login fix.
- **Version markers bumped.** README and INDEX now report v0.37 / 2026-06-30 for this setup-verify command correction.

Stacks on #26 (`docs/cron-2026-06-29-login-command-faq`) because that in-flight PR already clarifies the shell-vs-session login command path.

## v0.36 — Shell login-command FAQ (2026-06-29)

Recent onboarding-support threads show a repeated Day-1 confusion: builders see `/login` in Claude Code output and run `claude /login` from the terminal, which produces `Unknown skill: login`. Support fixes converged on the same distinction: start Claude Code with `claude` and follow the in-session/browser login flow; use `claude auth logout` / `claude auth login` only when an editor session remains stuck.

**What changed.**

- **Appendix D FAQ added.** D.11 now documents the `Unknown skill: login` symptom, diagnosis, standard setup-script fix, and VS Code auth-refresh fallback.
- **W.5 canonical setup clarified.** The install chapter now says not to run `claude /login`, adds failure mode #8, and keeps the verification snippet aligned.
- **Quest W-0 clarified.** The agent-mode step now distinguishes an in-session `/login` prompt from the wrong shell command.
- **Version markers and index summary bumped.** README and INDEX now report v0.36 / 2026-06-29, and Appendix D's index summary counts the two promoted setup FAQs.

Stacks on #25 (`docs/cron-2026-06-28-native-binary-faq`) because the in-flight FAQ stack already touches Appendix D.

## v0.35 — LiteLLM shared-budget FAQ clarification (2026-06-27)

Recent `#ai-help` threads show a repeated Day-1 confusion: builders who hit `ExceededBudget` expect Kimi, DeepSeek, GPT, or other LiteLLM gateway models to keep working because those are not Claude models. Support answers consistently that the $750 cap is enforced on the LiteLLM key across gateway-backed models; switching models inside the exhausted key does not bypass the cap.

**What changed.**

- **Appendix D FAQ clarified.** D.6 now states that Kimi, DeepSeek, GPT, and other gateway models share the same LiteLLM budget and that exceptions require visible business context plus manager approval.
- **W.5 and H.7 kept aligned.** The canonical setup chapter and Day-1 card now carry the same shared-budget warning in their common-failure rows.
- **Version markers bumped.** README and INDEX now report v0.35 / 2026-06-27 for this support-FAQ pass.

Stacks on #23 (`docs/cron-2026-06-26-h7-index-card`) because the in-flight stack already bumped the root version markers to v0.34.

## v0.34 — Day-1 reference-card index alignment (2026-06-26)

Appendix H.7 shipped in v0.23 and is listed in Appendix H itself, but the root README still counted six quick-reference cards and the Master Index Appendix H summary only listed H.1 through H.6. A Day-1 reader scanning the index could miss the printable setup card even though the card is the fastest path to install commands, channels, contacts, and common failures.

**What changed.**

- **README inventory corrected.** The drafted-content summary now counts seven quick-reference cards.
- **Master Index Appendix H completed.** The cross-cutting references section now links H.7 alongside H.1–H.6.
- **Version markers bumped.** README and INDEX now report v0.34 / 2026-06-26 for this reference-card alignment pass.

Stacks on #22 (`docs/cron-2026-06-25-shipped-surface-tense`) because that in-flight PR already bumped the root version markers to v0.33.

## v0.33 — Shipped-surface future-tense cleanup (2026-06-25)

Two reader-facing orientation lines still described shipped surfaces as future or planned: Prologue §0.8 called the HTML hub search surface future-tense, and the Green Belt Part C overview labelled Black Belt as planned even though the Master Index and generated curriculum mark it drafted.

**What changed.**

- **Reference-mode guidance corrected.** Prologue §0.8 now points readers at the live HTML hub search surface.
- **Green-to-Black handoff corrected.** The Part C guardrails overview now links to drafted Black Belt instead of calling it planned.
- **Version markers bumped.** README and INDEX now report v0.33 / 2026-06-25 for this shipped-surface cleanup.

## v0.32 — Playbook-course drafted-belt routing (2026-06-24)

The playbook-course skill still carried its original v0.8 White/Yellow-only guardrail even though generated `curriculum.json` now marks Green, Black, and Council as drafted. That stale guardrail would tell a learner to come back instead of walking drafted belt content that the curriculum already contains.

**What changed.**

- **Runtime rule corrected.** `skills/playbook-course/SKILL.md` now treats `curriculum.json` status as the source of truth for whether a belt can be walked.
- **Maintainer notes and acceptance tests corrected.** The skill README and test cases now cover drafted-belt progression after Yellow instead of expecting Green Belt deferral.
- **Version markers bumped.** README and INDEX now report v0.32 / 2026-06-24 for this skill-routing pass.

## v0.31 — Archival plan-link cleanup (2026-06-23)

The changelog and Excalidraw companion README still pointed at root-level `V0.*` planning files that are not present in the repository. Those stale references made old release notes and illustration re-authoring guidance look clickable when the targets had already been removed.

**What changed.**

- **Broken archival links removed.** The v0.23 changelog entry now names the planning artefact as historical context without linking to a missing file.
- **Pre-v0.20 footer corrected.** The changelog no longer sends readers to absent root-level plan files.
- **Excalidraw re-authoring guidance corrected.** The companion README now tells maintainers to use the committed SVGs as the source shape instead of a missing `V0.21B-EXCALIDRAW-PLAN.md`.
- **Version markers bumped.** README and INDEX now report v0.31 / 2026-06-23 for this broken-link cleanup.

## v0.30 — Appendix K status alignment (2026-06-22)

The v0.25 status-marker pass reclassified Appendix K as the drafted root changelog, but three Prologue orientation chapters still treated K as missing or as a future tool-landscape appendix. That made the first-read path contradict the Master Index and sent tool-curious readers away from the actual Tool Atlas.

**What changed.**

- **Tool Tour cross-reference corrected.** Prologue §0.5 now points comparison-curious readers to Appendix A, the drafted Tool Atlas, instead of future-tense Appendix K.
- **Reader guidance corrected.** Prologue §0.8 now names Appendix M as the planned appendix and calls Appendix E a deliberate skeleton, matching the Master Index.
- **What's Shipping corrected.** Prologue §0.12 now lists Appendix K as the drafted changelog and leaves only Appendix M in the still-planned bucket.
- **Version markers bumped.** README, INDEX, and affected manifest rows now report v0.30 / 2026-06-22 for this status-alignment pass.

## v0.29 — SVG Vertex-label cleanup (2026-06-21)

The v0.24 post-Vertex sweep updated the Prologue 0.3 prose and W.5/H.7 failure-mode text, but two committed diagram surfaces still showed the retired path: the 5-layer SVG labelled the LLM gateway as "Vertex AI", and the White Belt journey illustration still told readers to run `gcloud auth application-default login`.

**What changed.**

- **5-layer mental-model SVGs corrected.** The source diagrams and committed hub copies now label Layer 2 as `LiteLLM gateway · Anthropic API · policy`, matching Prologue 0.3 and G.23.
- **White Belt journey illustration corrected.** The hand-drawn source, generated hub copy, and generator script now show the real detour: stale Vertex env vars → remove Vertex env vars.
- **Version markers bumped.** README and INDEX now report v0.29 / 2026-06-21 for this diagram-staleness pass.

## v0.28 — LiteLLM usage-cap guidance refresh (2026-06-20)

Recent support threads show the LiteLLM per-builder cap is now $750 and the LiteLLM gateway is the source of truth for Claude Code usage, not the separate claude.ai usage page. The playbook still described the v0.23-era ~$100 cap and implied that quota bumps were routine.

- **Usage-cap amount corrected.** W.5, Appendix D, H.7, and Prologue §0.3 now name the current $750 LiteLLM cap instead of the old $100/month figure.
- **Source-of-truth clarified.** The cap guidance now tells readers to trust LiteLLM `ExceededBudget` errors over claude.ai usage-page numbers, and to route exceptions through `#ai-help` with manager approval rather than assuming a bump is automatic.
- **Version markers bumped.** README and INDEX now report v0.28 / 2026-06-20 for this quota-guidance pass.

## v0.27 — Index and curriculum label alignment (2026-06-17)

Reader-facing TOC rows and generated course metadata still carried older labels after the underlying chapters had moved on. The load-bearing stale pieces were the retired Vertex/gcloud setup labels; regenerating the course curriculum also brought an older Y.1 Tool Atlas metadata row back into sync with its chapter frontmatter.

- **White Belt index and course metadata corrected.** W.4 now names MyAccess, the LiteLLM key, SSO, and proxy trust; W.6 now describes the LiteLLM gateway instead of "what Vertex does." W.4's time budget now matches the chapter frontmatter.
- **Quest W-0 summary aligned.** The Master Index now mirrors the actual five-step Quest W-0 verification flow and routes stuck builders to `#ai-help`.
- **G.23 TOC labels corrected.** The Master Index, Green Belt overview, Part C guardrails overview, manifest, and course curriculum now match the current G.23 title: every model call routes through LiteLLM; Vertex is only a historical migration note inside the chapter.
- **Quest W-0 detour label corrected.** The first-day map caption now names stale Vertex env vars as the failure shape instead of suggesting `gcloud` auth is still required.
- **Course curriculum regenerated.** `skills/playbook-course/curriculum.json` was regenerated from `manifest.yml`, including the existing Y.1 Tool Atlas title, time budget, and outcome from the chapter frontmatter.

## v0.26 — Active support channel rollover (2026-06-16)

`#claude-onboarding-support` was archived on 2026-05-16 with instructions to log further support in `#ai-help`. The playbook still routed Day-1 setup, access, quota, gateway, and stale-row reports to the archived channel. This pass updates active reader-facing escalation paths to `#ai-help` while leaving historical changelog references intact.

- **Support-channel references updated.** White Belt setup/auth/gateway chapters, the Day-1 quick reference, Appendix D/F, Prologue support references, setup-verify fixes, and generated hub fallback copy now point to [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD).
- **Appendix F directory corrected.** The setup/access row now names `#ai-help` as the active successor to archived `#claude-onboarding-support`, removes the duplicate general `#ai-help` row, and records the archive handoff evidence.
- **Version markers bumped.** README and INDEX now report v0.26 / 2026-06-16 for this channel-rollover pass.

## v0.25 — Status-marker accuracy and version-stamp purge (2026-05-29)

A broader correctness sweep after v0.24. Many chapters carried inline version stamps ("drafted in v0.9", "Part B lands in v0.10", "the v0.5 page") and several appendix headers in `INDEX.md` were still tagged `[drafted skeleton]` or `[planned]` long after those appendices had been fully written. A reader landing on the Green Belt index today would see "Part B drafted in v0.10" and reasonably wonder which version they were on; a reader scanning the appendix TOC would see "Appendix K [planned]" while the changelog file it points at is actively maintained. Status markers must mean something.

**What changed.**

- **`INDEX.md` status markers corrected.** Appendices A, B, C, D, K, and L re-tagged `[drafted]` to match reality. F re-tagged `[drafted]` (it's a live directory, not a skeleton). E remains `[drafted skeleton]` because its frontmatter and body both still acknowledge that role-to-person assignments live in the program tracker. The status-marker definition itself was rewritten from "readable in v0.22" to a generic definition.
- **Green Belt overview chapters** (`belts/03-green/README.md`, `a-craft/README.md`, `b-practices/README.md`, `c-guardrails/badge.md`, `b-practices/quest-G2-greenfield-crossover.md`, `c-guardrails/boss-fight-GB-double-ship.md`) — every "drafted in v0.9 / v0.10 / v0.11" and "lands in v0.11" stamp removed; outdated "Parts B and C have not landed yet" guidance removed.
- **Black Belt overview chapters** (`belts/04-black/README.md`, `a-platform/README.md`, `b-craft/README.md`, `a-platform/quest-B1-publish-an-internal-plugin.md`, `a-platform/B05-multi-agent-orchestration.md`) — every "drafted in v0.13/14/15" stamp removed; "Next: Part B lands in v0.14" navigation footer fixed to point at the actual Part B README.
- **Appendices A, B, C** — "v0.5 page", "v0.5 skeleton", and per-skill "Drafted as a runnable skill in v0.18 / v0.12" stamps removed.
- **Prologue 0.1, 0.3, 0.4, 0.8, 0.10, 0.12** — `[coming]` references that now point at drafted content (Council, Appendix M strategy, Green/Black Belt, Appendix L, W.3) replaced with real links. `0.8` rewritten to acknowledge that the marker is rare now. `0.12` un-pinned from v0.23 to read as the current-version chapter.
- **`foundation/ops-101/README.md` and `03-triage-automations.md`** — Appendix I templates `[coming]` references replaced with real links.
- **`belts/04-black/c-org/B14-writing-an-ai-rfc.md`** — Appendix I `[planned]` reference replaced with a real link to the RFC template that has shipped.
- **`appendices/E-roles-and-forums/README.md` and `INDEX.md`** — "Vertex billing owner" row updated to "LiteLLM gateway owner" to match the post-March-2026 model path.
- **`case-studies/README.md`** — "empty at v0.19" stamp removed.
- **`README.md` and `INDEX.md`** — version bumped to v0.25; README's "drafted skeletons" footer corrected to reflect that only E and F are now skeletons.

No new chapters. No structural changes. The polish baseline holds.

## v0.24 — Post-Vertex correctness sweep (2026-05-29)

A targeted correctness pass after a fresh-eyes review surfaced load-bearing chapters that still described the pre-March-2026 Vertex routing path. The W.5/H.7 v0.23 rewrite committed to the LiteLLM gateway as the canonical model path, but several chapters that frame the mental model still pointed at Vertex/gcloud. Readers were forming a wrong model of Layer 3 on day one — and `403 PERMISSION_DENIED` from stale Vertex env vars is the single most common setup error in `#claude-onboarding-support` right now.

**What changed.**

- **Prologue §0.3 — The 5-Layer Mental Model** rewritten so Layer 3 is the LiteLLM gateway, with an explicit migration callout at the top. ASCII diagram, layer-by-layer description, debug examples, and closing summary all updated. Replaces the `gcloud auth application-default login` reflex with the setup-script re-run.
- **Prologue §0.5 — Tool tour** updated where Claude Code, Claude.ai, and the "why Claude" framing referenced Vertex.
- **Prologue §0.11 — Safety brief** updated the WIP-code-sharing line to reflect the gateway path.
- **Prologue §0.12 — What's shipping** rewritten from a v0.7 status report (Green/Black "not drafted yet", "private hosted deployment not done") to a v0.23 status report that matches reality: all belts drafted, hub live at razorpay.github.io/ai-playbook, the version history in CHANGELOG.md, the roadmap in ROADMAP.md.
- **W.4 — Your auth setup** rewritten to name the five real auth layers (Google SSO, MyAccess, Claude.ai SSO, LiteLLM key, Zscaler) instead of the abstract "program-pinned" framing, with the explicit "what to remove from `~/.bashrc`" guidance for Vertex leftovers.
- **W.6 — The LLM Gateway** rewritten to name LiteLLM, the gateway URL, and the three concrete jobs the gateway does. Failure modes link to the canonical W.5 list rather than restating them.
- **G.23 — The LLM proxy** title, intro, diagram, and closing references updated to reflect that the upstream is Anthropic API (post-migration); the substantive education (four jobs, debugging the proxy, what to share when it's the friction) is unchanged.
- **Appendix D — Known Issues + FAQ** promoted from a drafted skeleton to nine real entries seeded from the seven W.5 failure modes plus two recurring shapes (`command not found: claude`, Zscaler cert errors). Each entry follows the documented format with symptom, diagnosis, copy-pasteable fix, references.
- **Appendix G — Glossary** updated the Vertex entry to flag the migration and point to W.4/W.6.
- **`setup-verify` skill** Check 5 rewritten from "gcloud + Vertex auth" to "No stale Vertex environment variables" (the right thing to verify on the new path); Check 6 renamed from "LiteLLM proxy" to "LiteLLM gateway"; the three example output tables in `output-shape.md` and the README example all updated; `one-line-fixes.md` Check 5 rewritten with the actual rc-file cleanup commands.

No structural changes. No new chapters. No content moved. The v0.20 polish baseline holds.

## v0.23 — Readability & first-read experience (2026-05-13)

A targeted UX pass after a brutal fresh-eyes review surfaced three load-bearing problems: the front door was the wrong shape (Master Index opened with changelog noise), the action pages didn't contain their actions (W.5 and Quest W-0 told readers to "use the program-pinned setup path" without ever showing it), and the directory pages didn't contain the directory (Appendix F and Meet The People described purposes without naming channels or people).

**What changed.**

- **W.5 — Installing the stack** rewritten with the canonical two-step install (MyAccess + the `curl -fsSL https://get-claude.dev.razorpay.in/setup.sh | bash` script), the `~/.claude/settings.json` shape, the five-step verification, and the seven common failure modes drawn from `#claude-onboarding-support` thread analysis.
- **Quest W-0 — Turn GREEN** rewritten as a literal five-step verification sequence with the actual commands and per-step GREEN/YELLOW/RED conditions cross-referenced to W.5 failure modes.
- **Appendix F — Slack Channels** rewritten as a live directory with twenty-plus named channels organised by purpose (setup, AI community, design, platform/devex, wider product context, exploration). Each row has handle, purpose, owner, first-response expectation, dated.
- **§0.6 — Meet the people** rewritten with named role-holders dated 2026-05-13 — Bhanu Prakash as program lead, Kaushik Bhat as engineering co-lead, Prafulla as setup-script owner, RKV as quota escalation, Saurabh Soni as design transformation lead, Aravinth P K + Vaibhav Dhir as Compass plugin co-owners, Saurabh + Varun Achar as Blade leads, plus a new "playbook author / curator" role. Roles stay durable; named holders are refreshed quarterly.
- **Appendix H.7 — Day-1 quick reference** is a new printable card that consolidates the install commands, the top channels, the people to DM, the common failure modes, and the pinned URLs onto a single page. Back-linked from W.5, Quest W-0, and Appendix F.
- **Homepage** rewritten with one primary CTA ("Start the journey" → Prologue welcome) and one secondary text link ("Just want the TOC" → Master Index). Added a "Day 1 — three steps in this order" callout above the belt ladder pointing at self-assessment, Tech 101 chapter 1, and W.5.
- **404 page** is now a custom Starlight splash with three suggested entry-points (Tech 101 ch.1, Foundation, Master Index), the search bar, and a one-line apology.
- **Master Index** itself rewritten from a version-changelog-as-front-door into an intent-based jump table. The version history moved here.
- **`{#slug}` rendering bug** on the homepage fixed by removing the explicit heading-id syntax (Starlight's auto-slugger handles it).
- **Site-wide placeholder substitution sweep** — 18 references to "the program's flagship channel" / "the design-system channel" / "the infrastructure channel" / "the celebrations channel" replaced with real handles across Prologue, Foundation, Yellow Belt, Green Belt, Black Belt, and the setup-verify skill.

The Tier 1 plan that defined this pass was `V0.23-READABILITY-PASS-PLAN.md`; that archival planning file is not carried in the current repository.

## v0.22 — UX-tightening pass (2026-05-12)

A targeted UX pass after a real browse-through. Belt-ladder hero arrows now point UP (matching the progression direction). The pre-ship-check six-layer gate had a rotated callout that overlapped the GREEN-column status labels — removed; the subtitle and the footer key carry the meaning. The RFC state machine's "approver decides ACCEPT/REJECT" labels were drifting on top of their own paths — repositioned for clear separation. The homepage was collapsing on itself: Foundation and Council each appeared in two sections ("Find your starting point" plus "Above/Before the belts"). The two duplicate sections are gone; the curriculum is now one unified six-stop ladder (Foundation → White → Yellow → Green → Black → Council), each entry a single line so the sidebar does not get echoed beside it.

## v0.21b — Hand-drawn companion illustrations (2026-05-09)

Seven hand-drawn-style companion illustrations land in `excalidraw/` — the Tier-2 visual layer to the Tier-1 signature SVGs from v0.21. The illustrations cover the Origin Story (Prologue §0.2), the Boss Fight B-B month timeline, office hours (B.12), the embedded sprint week (B.13), inbox triage before/after (Ops 101 §0B.3), the White Belt first-day map (Quest W-0), and a 2×2 grid of RFC anti-patterns (B.14). The two-tier visual language (polished SVG for identity and reference; hand-drawn for narrative and walkthrough) is documented in `excalidraw/README.md`. The initial cut was generated by `scripts/generate-handdrawn-svg.py` (rough.js-inspired perturbations); each file can be replaced with a hand-drawn Excalidraw sketch later without changing any chapter reference.

## v0.21 — Signature diagrams (2026-05-08)

Nine theme-aware SVG diagrams ship with a shared design language (system font stack, `currentColor` primary geometry, five identity colours for belts, GREEN / YELLOW / RED status colours). The belt ladder is the new homepage hero. The 5-layer mental model and the 9-layer Enablement Stack were refreshed against the new language. New diagrams cover the three pillars (G.1), certification flow (Appendix L), design-to-code pipeline (G.15), memory layers (B.8), the RFC state machine (C.3), and the pre-ship-check six-layer gate (G.26). Each diagram lives in `diagrams/`; the design language is documented in `diagrams/README.md`. ASCII originals stay below the SVGs as fallbacks for Markdown viewers that don't render SVG.

## v0.20 — Polish pass (2026-05-06)

A targeted polish pass across pre-v0.16 chapters applied the v0.16 Council voice as the consistency anchor. Em-dash density dropped substantially in Foundation (26.8 → 16.4 per file), Prologue (24.8 → 19.4), Green Belt (19.6 → 15.6), Black Belt (25.4 → 19.8), and Appendices (20.6 → 13.1). Placeholder phrases of the "the program's primary X" shape were rewritten to cleaner role-language. Two polish scripts (`scripts/polish-detector.py` and `scripts/polish-substitute.py`) are committed so maintainers can re-run the sweep when new content lands. The chapters' substance is unchanged; the form is more consistent.

---

Pre-v0.20 history is summarised in the entries above. The version-prefixed planning files that originally captured those scopes are not carried in the current repository.

---

*Cadence: changelog entry per release. Maintained by the playbook author — see [§0.6 Meet the people](./prologue/06-people-and-pocs.md).*
