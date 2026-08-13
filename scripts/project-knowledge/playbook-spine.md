# Playbook spine

Compact chapter index for the Razorpay AI Playbook (0.59-alpha, updated 2026-08-07).

Every chapter has a stable slug. The live URL is always `https://razorpay.github.io/ai-playbook/<slug>/`.
Use this file to (a) find the right chapter for a question, (b) get the hub URL, 
(c) check status (drafted / planned / in-progress) before recommending.

Do not paraphrase a chapter from this file. The `outcome` line is a routing hint, 
not a substitute for reading the chapter. For chapter bodies, web_fetch the `hub_url`.

```yaml
version: 0.59-alpha
updated: 2026-08-07
hub: https://razorpay.github.io/ai-playbook
source_of_truth: manifest.yml + slugs.yml in razorpay/ai-playbook
chapters:
  - slug: /
    title: Razorpay Org-Wide AI Playbook
    hub_url: https://razorpay.github.io/ai-playbook/
    section: root
    track: null
    belt: null
    status: drafted
    type: readme
    audience: everyone
    time_minutes: 5
    outcome: Know what this playbook is, what version you are holding, and where to
      start.
    tags:
      - orientation
  - slug: master-index
    title: Razorpay Org-Wide AI Playbook — Master Index
    hub_url: https://razorpay.github.io/ai-playbook/master-index/
    section: root
    track: null
    belt: null
    status: drafted
    type: index
    audience: everyone
    time_minutes: 10
    outcome: Navigate the complete playbook structure.
    tags:
      - index
  - slug: foundation
    title: Part 0 — Foundation
    hub_url: https://razorpay.github.io/ai-playbook/foundation/
    section: foundation
    track: null
    belt: null
    status: drafted
    type: readme
    audience: everyone
    time_minutes: 5
    outcome: Know whether to start with Tech 101, Ops 101, or skip straight to the
      Prologue.
    tags:
      - orientation
  - slug: tech-101
    title: "Tech 101: What is this world I'm in?"
    hub_url: https://razorpay.github.io/ai-playbook/tech-101/
    section: foundation
    track: tech-101
    belt: null
    status: drafted
    type: readme
    audience: anyone-curious
    time_minutes: 3
    outcome: Understand what the Tech 101 track covers and how to read it.
    tags:
      - tech-101
  - slug: tech-101/what-is-software
    title: What is software, really?
    hub_url: https://razorpay.github.io/ai-playbook/tech-101/what-is-software/
    section: foundation
    track: tech-101
    belt: null
    status: drafted
    type: chapter
    audience: anyone-curious
    time_minutes: 5
    outcome: A one-sentence answer to what software is and why it matters.
    tags:
      - software-basics
  - slug: tech-101/frontend-vs-backend
    title: Frontend vs backend
    hub_url: https://razorpay.github.io/ai-playbook/tech-101/frontend-vs-backend/
    section: foundation
    track: tech-101
    belt: null
    status: drafted
    type: chapter
    audience: anyone-curious
    time_minutes: 10
    outcome: Understand which side of a product change lives on the frontend,
      backend, or between them.
    tags:
      - software-basics
  - slug: tech-101/server-client-http
    title: What is a server? What is a client? What is HTTP?
    hub_url: https://razorpay.github.io/ai-playbook/tech-101/server-client-http/
    section: foundation
    track: tech-101
    belt: null
    status: drafted
    type: chapter
    audience: anyone-curious
    time_minutes: 10
    outcome: Understand the request-and-response conversation behind most software.
    tags:
      - software-basics
      - http
  - slug: tech-101/databases
    title: "Databases: the world's most important spreadsheet"
    hub_url: https://razorpay.github.io/ai-playbook/tech-101/databases/
    section: foundation
    track: tech-101
    belt: null
    status: drafted
    type: chapter
    audience: anyone-curious
    time_minutes: 8
    outcome: Know why products need durable structured storage and what can go wrong
      around it.
    tags:
      - software-basics
      - databases
  - slug: tech-101/api-vs-ui
    title: What is an API? What is a UI?
    hub_url: https://razorpay.github.io/ai-playbook/tech-101/api-vs-ui/
    section: foundation
    track: tech-101
    belt: null
    status: drafted
    type: chapter
    audience: anyone-curious
    time_minutes: 8
    outcome: Tell the difference between a human-facing surface and a machine-facing
      contract.
    tags:
      - software-basics
      - apis
  - slug: tech-101/code-is-text
    title: "Code is text: repos, files, the source of truth"
    hub_url: https://razorpay.github.io/ai-playbook/tech-101/code-is-text/
    section: foundation
    track: tech-101
    belt: null
    status: drafted
    type: chapter
    audience: anyone-curious
    time_minutes: 5
    outcome: See code as editable text stored in shared repositories, not as magic
      behind a screen.
    tags:
      - software-basics
      - repos
  - slug: tech-101/git
    title: "Git, conceptually: save points for files"
    hub_url: https://razorpay.github.io/ai-playbook/tech-101/git/
    section: foundation
    track: tech-101
    belt: null
    status: drafted
    type: chapter
    audience: anyone-curious
    time_minutes: 8
    outcome: Understand commits, branches, and pull requests as collaboration
      primitives.
    tags:
      - software-basics
      - git
  - slug: tech-101/build-deploy
    title: Build, deploy, staging, production
    hub_url: https://razorpay.github.io/ai-playbook/tech-101/build-deploy/
    section: foundation
    track: tech-101
    belt: null
    status: drafted
    type: chapter
    audience: anyone-curious
    time_minutes: 10
    outcome: Understand the journey from a code change to something users can touch.
    tags:
      - software-basics
      - deploy
  - slug: tech-101/tests
    title: "Tests: what they are, why they exist"
    hub_url: https://razorpay.github.io/ai-playbook/tech-101/tests/
    section: foundation
    track: tech-101
    belt: null
    status: drafted
    type: chapter
    audience: anyone-curious
    time_minutes: 8
    outcome: Know why a green test suite is evidence, not ceremony.
    tags:
      - software-basics
      - testing
  - slug: tech-101/shape-of-a-software-org
    title: The shape of a software org
    hub_url: https://razorpay.github.io/ai-playbook/tech-101/shape-of-a-software-org/
    section: foundation
    track: tech-101
    belt: null
    status: drafted
    type: chapter
    audience: anyone-curious
    time_minutes: 10
    outcome: Understand the roles around software work and how they collaborate.
    tags:
      - software-basics
      - roles
  - slug: ops-101
    title: "Ops 101: Save 4+ hours a week without writing code"
    hub_url: https://razorpay.github.io/ai-playbook/ops-101/
    section: foundation
    track: ops-101
    belt: null
    status: drafted
    type: readme
    audience: pm-designer-ops
    time_minutes: 3
    outcome: Understand the Ops 101 promise and the route through chapters, quests,
      and boss fight.
    tags:
      - ops-101
  - slug: ops-101/why-this-track
    title: Why this track exists
    hub_url: https://razorpay.github.io/ai-playbook/ops-101/why-this-track/
    section: foundation
    track: ops-101
    belt: null
    status: drafted
    type: chapter
    audience: pm-designer-ops
    time_minutes: 5
    outcome: Name the ops tax AI can eat and choose one place to start reclaiming time.
    tags:
      - ops-101
  - slug: ops-101/non-coding-ai-surface
    title: The non-coding AI surface
    hub_url: https://razorpay.github.io/ai-playbook/ops-101/non-coding-ai-surface/
    section: foundation
    track: ops-101
    belt: null
    status: drafted
    type: chapter
    audience: pm-designer-ops
    time_minutes: 15
    outcome: Know which non-coding AI surface to reach for and what connectors change.
    tags:
      - ops-101
      - connectors
  - slug: ops-101/triage-automations
    title: Triage automations
    hub_url: https://razorpay.github.io/ai-playbook/ops-101/triage-automations/
    section: foundation
    track: ops-101
    belt: null
    status: drafted
    type: chapter
    audience: pm-designer-ops
    time_minutes: 25
    outcome: Turn recurring inbox, Slack, or queue triage into a repeatable
      AI-assisted workflow.
    tags:
      - ops-101
      - automation
  - slug: ops-101/generation-automations
    title: Generation automations
    hub_url: https://razorpay.github.io/ai-playbook/ops-101/generation-automations/
    section: foundation
    track: ops-101
    belt: null
    status: drafted
    type: chapter
    audience: pm-designer-ops
    time_minutes: 25
    outcome: Automate recurring outbound writing without losing judgement or
      accountability.
    tags:
      - ops-101
      - automation
  - slug: ops-101/ticket-automations
    title: Ticket automations
    hub_url: https://razorpay.github.io/ai-playbook/ops-101/ticket-automations/
    section: foundation
    track: ops-101
    belt: null
    status: drafted
    type: chapter
    audience: pm-designer-ops
    time_minutes: 25
    outcome: Draft, route, and digest tickets with AI while keeping ownership human.
    tags:
      - ops-101
      - automation
      - tickets
  - slug: ops-101/document-workflows
    title: Document workflows
    hub_url: https://razorpay.github.io/ai-playbook/ops-101/document-workflows/
    section: foundation
    track: ops-101
    belt: null
    status: drafted
    type: chapter
    audience: pm-designer-ops
    time_minutes: 30
    outcome: Use AI to research, draft, review, and export documents with less
      blank-page friction.
    tags:
      - ops-101
      - documents
  - slug: ops-101/lightweight-agents
    title: Lightweight agents
    hub_url: https://razorpay.github.io/ai-playbook/ops-101/lightweight-agents/
    section: foundation
    track: ops-101
    belt: null
    status: drafted
    type: chapter
    audience: pm-designer-ops
    time_minutes: 25
    outcome: Recognise when a repeated recipe deserves a configured agent and how to
      keep it useful.
    tags:
      - ops-101
      - agents
  - slug: ops-101/minimum-viable-wiki
    title: Building your own minimum viable wiki for any project
    hub_url: https://razorpay.github.io/ai-playbook/ops-101/minimum-viable-wiki/
    section: foundation
    track: ops-101
    belt: null
    status: drafted
    type: chapter
    audience: pm-designer-ops
    time_minutes: 20
    outcome: Set up a small project wiki that lets AI work with memory instead of
      repeated context.
    tags:
      - ops-101
      - knowledge-base
  - slug: ops-101/quest-30-minute-teardown
    title: "Quest 0B-1: The 30-minute teardown"
    hub_url: https://razorpay.github.io/ai-playbook/ops-101/quest-30-minute-teardown/
    section: foundation
    track: ops-101
    belt: null
    status: drafted
    type: quest
    audience: pm-designer-ops
    time_minutes: 30
    outcome: Replace one recurring 30-minute ops task with a Claude-assisted
      workflow and measure the before/after.
    tags:
      - ops-101
      - quest
      - automation
  - slug: ops-101/quest-agent-diary
    title: "Quest 0B-2: The agent diary"
    hub_url: https://razorpay.github.io/ai-playbook/ops-101/quest-agent-diary/
    section: foundation
    track: ops-101
    belt: null
    status: drafted
    type: quest
    audience: pm-designer-ops
    time_minutes: 20
    outcome: Keep a two-week diary of routine work that could become
      configured-agent territory.
    tags:
      - ops-101
      - quest
      - agents
  - slug: ops-101/boss-fight
    title: "Boss Fight 0B: Automate one workflow that saves 4+ hours/week"
    hub_url: https://razorpay.github.io/ai-playbook/ops-101/boss-fight/
    section: foundation
    track: ops-101
    belt: null
    status: drafted
    type: boss-fight
    audience: pm-designer-ops
    time_minutes: 120
    outcome: Run one safe automation for two weeks, prove it saves time, and
      document the recipe for a teammate.
    tags:
      - ops-101
      - boss-fight
      - automation
  - slug: prologue
    title: "Prologue: Before You Begin"
    hub_url: https://razorpay.github.io/ai-playbook/prologue/
    section: prologue
    track: null
    belt: null
    status: drafted
    type: readme
    audience: everyone
    time_minutes: 5
    outcome: Know what the Prologue covers and why it comes before the belts.
    tags:
      - orientation
  - slug: prologue/welcome
    title: Welcome, and why this playbook exists
    hub_url: https://razorpay.github.io/ai-playbook/prologue/welcome/
    section: prologue
    track: null
    belt: null
    status: drafted
    type: chapter
    audience: everyone
    time_minutes: 5
    outcome: Understand the program promise and what shipped code means here.
    tags:
      - orientation
  - slug: prologue/origin-story
    title: The origin story
    hub_url: https://razorpay.github.io/ai-playbook/prologue/origin-story/
    section: prologue
    track: null
    belt: null
    status: drafted
    type: chapter
    audience: everyone
    time_minutes: 8
    outcome: Understand why setup is Layer 0 and what changed between the first two
      Builder Days.
    tags:
      - orientation
      - builder-day
  - slug: prologue/mental-model
    title: The 5-Layer Mental Model of the AI Dev Stack
    hub_url: https://razorpay.github.io/ai-playbook/prologue/mental-model/
    section: prologue
    track: null
    belt: null
    status: drafted
    type: chapter
    audience: everyone
    time_minutes: 10
    outcome: Be able to draw the five-layer stack and use it to debug where work is
      stuck.
    tags:
      - orientation
      - mental-model
  - slug: prologue/enablement-stack
    title: The Enablement Stack
    hub_url: https://razorpay.github.io/ai-playbook/prologue/enablement-stack/
    section: prologue
    track: null
    belt: null
    status: drafted
    type: chapter
    audience: leads
    time_minutes: 10
    outcome: See the nine org-level layers the belt system climbs.
    tags:
      - orientation
      - enablement
      - leadership
  - slug: prologue/tool-tour
    title: Meet your tools
    hub_url: https://razorpay.github.io/ai-playbook/prologue/tool-tour/
    section: prologue
    track: null
    belt: null
    status: drafted
    type: chapter
    audience: everyone
    time_minutes: 5
    outcome: Tell Claude Code, Claude.ai, Cowork, Compass, Slash, Cursor, and Codex
      apart.
    tags:
      - orientation
      - tools
  - slug: prologue/roles-and-forums
    title: Meet the people
    hub_url: https://razorpay.github.io/ai-playbook/prologue/roles-and-forums/
    section: prologue
    track: null
    belt: null
    status: drafted
    type: chapter
    audience: everyone
    time_minutes: 5
    outcome: Know where to ask for help and which support surface fits which problem.
    tags:
      - orientation
      - support
      - directory
  - slug: prologue/operating-principles
    title: Operating Principles
    hub_url: https://razorpay.github.io/ai-playbook/prologue/operating-principles/
    section: prologue
    track: null
    belt: null
    status: drafted
    type: chapter
    audience: everyone
    time_minutes: 10
    outcome: Understand knowledge-base-driven development as the operating
      philosophy of the playbook.
    tags:
      - orientation
      - knowledge-base
  - slug: prologue/how-to-read
    title: How to use this playbook as a reader
    hub_url: https://razorpay.github.io/ai-playbook/prologue/how-to-read/
    section: prologue
    track: null
    belt: null
    status: drafted
    type: chapter
    audience: everyone
    time_minutes: 5
    outcome: Know the fastest honest route through the playbook for your current
      starting point.
    tags:
      - orientation
      - navigation
  - slug: prologue/how-to-lead
    title: How to use this playbook as a team lead
    hub_url: https://razorpay.github.io/ai-playbook/prologue/how-to-lead/
    section: prologue
    track: null
    belt: null
    status: drafted
    type: chapter
    audience: leads
    time_minutes: 10
    outcome: Turn the playbook into a team adoption rhythm without turning it into
      homework.
    tags:
      - orientation
      - leadership
      - adoption
  - slug: prologue/self-assessment
    title: "Self-assessment: which belt should you start at?"
    hub_url: https://razorpay.github.io/ai-playbook/prologue/self-assessment/
    section: prologue
    track: null
    belt: null
    status: drafted
    type: chapter
    audience: everyone
    time_minutes: 5
    outcome: Choose the right starting point by evidence, not confidence.
    tags:
      - orientation
      - self-assessment
      - belts
  - slug: prologue/safety-brief
    title: The safety brief
    hub_url: https://razorpay.github.io/ai-playbook/prologue/safety-brief/
    section: prologue
    track: null
    belt: null
    status: drafted
    type: chapter
    audience: everyone
    time_minutes: 10
    outcome: Memorise the redlines for prompts and know the reflex that keeps work safe.
    tags:
      - security
      - safety
  - slug: prologue/whats-shipping
    title: What's shipping this week
    hub_url: https://razorpay.github.io/ai-playbook/prologue/whats-shipping/
    section: prologue
    track: null
    belt: null
    status: drafted
    type: chapter
    audience: everyone
    time_minutes: 3
    outcome: Understand that the playbook is alive, what the current version
      contains, and what is still coming.
    tags:
      - orientation
      - changelog
  - slug: belts/white
    title: "White Belt: The Foundation Layer"
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/
    section: belts
    track: white
    belt: white
    status: drafted
    type: readme
    audience: new-builder
    time_minutes: 10
    outcome: Understand the White Belt path, evidence chain, and the exact work
      required to earn the first belt.
    tags:
      - white-belt
      - orientation
      - certification
  - slug: belts/white/file-system
    title: The File System
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/file-system/
    section: belts
    track: white
    belt: white
    status: drafted
    type: chapter
    audience: new-builder
    time_minutes: 20
    outcome: Navigate folders, read paths, recognize extensions, and know where you
      are before running a command.
    tags:
      - white-belt
      - file-system
      - paths
  - slug: belts/white/terminal-fluency
    title: Terminal fluency
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/terminal-fluency/
    section: belts
    track: white
    belt: white
    status: drafted
    type: chapter
    audience: new-builder
    time_minutes: 30
    outcome: Use the small set of Terminal commands and shortcuts needed for setup,
      git, and Claude Code.
    tags:
      - white-belt
      - terminal
      - harness
  - slug: belts/white/git-as-savepoints
    title: Git as save-points
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/git-as-savepoints/
    section: belts
    track: white
    belt: white
    status: drafted
    type: chapter
    audience: new-builder
    time_minutes: 45
    outcome: Use branches, commits, push, pull, status, and diff as the save-point
      system behind pull requests.
    tags:
      - white-belt
      - git
      - pull-requests
  - slug: belts/white/auth-setup
    title: Your auth setup
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/auth-setup/
    section: belts
    track: white
    belt: white
    status: drafted
    type: chapter
    audience: new-builder
    time_minutes: 20
    outcome: Name the auth layers behind Claude Code, recognise which one is
      failing, and know which fixes are yours vs. the program's.
    tags:
      - white-belt
      - auth
      - litellm
      - sso
  - slug: belts/white/installing-the-stack
    title: Installing the stack
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/installing-the-stack/
    section: belts
    track: white
    belt: white
    status: drafted
    type: chapter
    audience: new-builder
    time_minutes: 40
    outcome: Install and verify the White Belt tool stack without drifting away from
      the program-pinned setup path.
    tags:
      - white-belt
      - setup
      - node
      - pnpm
      - claude-code
  - slug: belts/white/llm-gateway
    title: The LLM Gateway
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/llm-gateway/
    section: belts
    track: white
    belt: white
    status: drafted
    type: chapter
    audience: new-builder
    time_minutes: 15
    outcome: Understand what the LiteLLM gateway does, what Claude Code does, and
      which failures are yours to debug vs. the gateway's.
    tags:
      - white-belt
      - llm-gateway
      - litellm
  - slug: belts/white/compass-plugin
    title: Compass plugin
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/compass-plugin/
    section: belts
    track: white
    belt: white
    status: drafted
    type: chapter
    audience: new-builder
    time_minutes: 20
    outcome: Understand what the program-pinned plugin is for, how to verify it, and
      how to avoid stale-plugin drift.
    tags:
      - white-belt
      - plugin
      - compass
  - slug: belts/white/green-yellow-red
    title: GREEN / YELLOW / RED
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/green-yellow-red/
    section: belts
    track: white
    belt: white
    status: drafted
    type: chapter
    audience: new-builder
    time_minutes: 20
    outcome: Run the 10-point health check, interpret colour honestly, and route
      setup failures without wasting a cohort day.
    tags:
      - white-belt
      - health-check
      - setup-verify
  - slug: belts/white/first-conversation
    title: Your first conversation with Claude Code
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/first-conversation/
    section: belts
    track: white
    belt: white
    status: drafted
    type: chapter
    audience: new-builder
    time_minutes: 30
    outcome: Start Claude Code safely, ask a scoped first question, and review the
      answer before allowing edits.
    tags:
      - white-belt
      - claude-code
      - prompting
  - slug: belts/white/prompt-quality-101
    title: Prompt quality 101
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/prompt-quality-101/
    section: belts
    track: white
    belt: white
    status: drafted
    type: chapter
    audience: new-builder
    time_minutes: 20
    outcome: Turn vague asks into scoped prompts with goal, context, constraints,
      and success criteria.
    tags:
      - white-belt
      - prompt-quality
      - claude-code
  - slug: belts/white/permission-system
    title: The permission system
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/permission-system/
    section: belts
    track: white
    belt: white
    status: drafted
    type: chapter
    audience: new-builder
    time_minutes: 15
    outcome: Respond safely to yes, no, and always-style permission prompts without
      handing control away.
    tags:
      - white-belt
      - permissions
      - safety
  - slug: belts/white/first-pr
    title: Your first PR
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/first-pr/
    section: belts
    track: white
    belt: white
    status: drafted
    type: chapter
    audience: new-builder
    time_minutes: 30
    outcome: Move one reviewed local change from branch to pull request with a clear
      title, description, and reviewer path.
    tags:
      - white-belt
      - pull-request
      - review
  - slug: belts/white/quest-turn-green
    title: "Quest W-0: Turn GREEN"
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/quest-turn-green/
    section: belts
    track: white
    belt: white
    status: drafted
    type: quest
    audience: new-builder
    time_minutes: 60
    outcome: Run setup verification, reach all-GREEN status, and capture evidence
      that the local environment is ready.
    tags:
      - white-belt
      - quest
      - setup-verify
      - evidence
  - slug: belts/white/quest-hello-razorpay
    title: "Quest W-1: The HelloRazorpay commit"
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/quest-hello-razorpay/
    section: belts
    track: white
    belt: white
    status: drafted
    type: quest
    audience: new-builder
    time_minutes: 45
    outcome: Open and close a tiny sandbox PR that proves branch, commit, push, and
      PR mechanics.
    tags:
      - white-belt
      - quest
      - pull-request
      - sandbox
  - slug: belts/white/boss-fight
    title: "Boss Fight W-B: One real typo, merged"
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/boss-fight/
    section: belts
    track: white
    belt: white
    status: drafted
    type: boss-fight
    audience: new-builder
    time_minutes: 90
    outcome: Find one genuine typo or equivalent micro-fix, use AI assistance to
      triage it, and land the merged PR.
    tags:
      - white-belt
      - boss-fight
      - merged-pr
  - slug: belts/white/badge
    title: White Belt badge template
    hub_url: https://razorpay.github.io/ai-playbook/belts/white/badge/
    section: belts
    track: white
    belt: white
    status: drafted
    type: badge
    audience: new-builder
    time_minutes: 10
    outcome: Provide the builder-facing template for claiming White Belt with
      evidence links and reviewer attestation.
    tags:
      - white-belt
      - badge
      - certification
      - template
  - slug: belts/yellow
    title: "Yellow Belt: The First Builds"
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: readme
    audience: daily-builder
    time_minutes: 12
    outcome: Understand the Yellow Belt path, daily AI-building claim, quests, boss
      fight, and evidence chain.
    tags:
      - yellow-belt
      - orientation
      - certification
  - slug: belts/yellow/tool-atlas
    title: Tool Atlas in practice
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/tool-atlas/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: daily-builder
    time_minutes: 20
    outcome: Pick the right AI surface for the job you're about to do, by working
      through three real decision examples.
    tags:
      - yellow-belt
      - tools
      - tool-atlas
  - slug: belts/yellow/tool-decision-tree
    title: When to reach for which tool
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/tool-decision-tree/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: daily-builder
    time_minutes: 15
    outcome: Use a simple decision tree to choose the right AI surface for a task
      before starting.
    tags:
      - yellow-belt
      - tools
      - decision-tree
  - slug: belts/yellow/prompt-quality-deep
    title: Prompt quality, deep dive
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/prompt-quality-deep/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: daily-builder
    time_minutes: 40
    outcome: Write prompts that express intent, constraints, context, and success
      criteria strongly enough for daily repo work.
    tags:
      - yellow-belt
      - prompting
      - intent
      - constraints
  - slug: belts/yellow/context-101
    title: What Claude can see and what it cannot
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/context-101/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: daily-builder
    time_minutes: 20
    outcome: Understand local files, pasted context, connector context, and the
      limits of what Claude can see.
    tags:
      - yellow-belt
      - context
      - claude-code
  - slug: belts/yellow/claude-md-primer
    title: CLAUDE.md primer
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/claude-md-primer/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: daily-builder
    time_minutes: 25
    outcome: Understand CLAUDE.md as a project rule book and know what belongs in it.
    tags:
      - yellow-belt
      - claude-md
      - context
  - slug: belts/yellow/reading-code
    title: Reading unfamiliar code with Claude
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/reading-code/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: daily-builder
    time_minutes: 30
    outcome: Use Claude Code to orient in an unfamiliar repo without immediately
      editing or over-reading.
    tags:
      - yellow-belt
      - reading-code
      - repo-orientation
  - slug: belts/yellow/permissions-and-hooks
    title: Permissions, hooks, slash commands
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/permissions-and-hooks/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: daily-builder
    time_minutes: 20
    outcome: Use permissions, hooks, and slash commands as daily safety rails
      instead of speed hacks.
    tags:
      - yellow-belt
      - permissions
      - hooks
      - slash-commands
  - slug: belts/yellow/litellm-and-enterprise
    title: LiteLLM and Claude workspace access
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/litellm-and-enterprise/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: daily-builder
    time_minutes: 15
    outcome: Choose the Claude workspace or LiteLLM route you have actually been
      provisioned for.
    tags:
      - yellow-belt
      - litellm
      - claude-workspaces
      - claude-team
      - model-routing
  - slug: belts/yellow/figma-mcp
    title: Figma MCP for non-engineers
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/figma-mcp/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: designer-builder
    time_minutes: 30
    outcome: Use design connector context to move from a Figma frame to a small,
      reviewable code change.
    tags:
      - yellow-belt
      - figma
      - mcp
      - design-to-code
  - slug: belts/yellow/slack-and-gworkspace-mcps
    title: Slack MCP + Google Workspace MCP
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/slack-and-gworkspace-mcps/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: daily-builder
    time_minutes: 30
    outcome: Use messaging and workspace connectors to gather task context safely
      and summarize it for repo work.
    tags:
      - yellow-belt
      - slack
      - google-workspace
      - connectors
  - slug: belts/yellow/bug-hunting
    title: Bug hunting with AI
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/bug-hunting/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: daily-builder
    time_minutes: 30
    outcome: Use AI, git history, connectors, and repo reading to find a small real
      bug worth fixing.
    tags:
      - yellow-belt
      - bug-hunting
      - triage
  - slug: belts/yellow/debugging-loop
    title: Debugging with Claude
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/debugging-loop/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: daily-builder
    time_minutes: 30
    outcome: Use Claude to run a disciplined reproduce, observe, hypothesize,
      isolate, fix, verify debugging loop.
    tags:
      - yellow-belt
      - debugging
      - triage
  - slug: belts/yellow/pr-craft
    title: PR craft
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/pr-craft/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: daily-builder
    time_minutes: 20
    outcome: Write small, reviewable PRs with clear titles, descriptions, staged
      commits, and reviewer etiquette.
    tags:
      - yellow-belt
      - pull-request
      - review
  - slug: belts/yellow/staying-current
    title: Staying current
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/staying-current/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: chapter
    audience: daily-builder
    time_minutes: 10
    outcome: Set up a light change-awareness habit without drowning in changelogs or
      tool updates.
    tags:
      - yellow-belt
      - staying-current
      - meta
  - slug: belts/yellow/quest-standup-bot
    title: "Quest Y-1: Ship the Stand-up Bot"
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/quest-standup-bot/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: quest
    audience: daily-builder
    time_minutes: 360
    outcome: Build a small working utility with Claude Code, demo it, and explain
      the prompt, context, and harness decisions.
    tags:
      - yellow-belt
      - quest
      - utility
      - standup-bot
  - slug: belts/yellow/quest-30-day-challenge
    title: "Quest Y-2: The 30-day 2-minute challenge"
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/quest-30-day-challenge/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: quest
    audience: daily-builder
    time_minutes: 60
    outcome: Build a lightweight daily AI practice log that proves habit,
      reflection, and learning without becoming busywork.
    tags:
      - yellow-belt
      - quest
      - habit
      - practice
  - slug: belts/yellow/boss-fight
    title: Yellow Belt boss fight
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/boss-fight/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: boss-fight
    audience: everyone
    time_minutes: 45
    outcome: Find an open bug in your area, fix it with AI assistance, and open the
      PR that earns Yellow Belt.
    tags:
      - yellow-belt
      - boss-fight
  - slug: belts/yellow/badge
    title: Yellow Belt badge template
    hub_url: https://razorpay.github.io/ai-playbook/belts/yellow/badge/
    section: belts
    track: yellow
    belt: yellow
    status: drafted
    type: badge
    audience: daily-builder
    time_minutes: 10
    outcome: Provide the builder-facing template for claiming Yellow Belt with
      evidence links and prompt/context/harness reflection.
    tags:
      - yellow-belt
      - badge
      - certification
      - template
  - slug: belts/green
    title: Green Belt
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/
    section: belts
    track: green
    belt: green
    status: drafted
    type: readme
    audience: experienced-builder
    time_minutes: 14
    outcome: Understand the Green Belt arc, what is drafted in Part A, and what
      comes next in Parts B and C.
    tags:
      - green-belt
      - readme
      - team-velocity
  - slug: belts/green/a-craft
    title: Green Belt Part A — The Craft
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/a-craft/
    section: belts
    track: green
    belt: green
    status: drafted
    type: readme
    audience: experienced-builder
    time_minutes: 8
    outcome: Understand what Part A teaches, what it expects you to know already,
      and the order to walk it in.
    tags:
      - green-belt
      - part-a
      - the-craft
      - readme
  - slug: belts/green/three-pillars
    title: The Three Pillars — prompt × context × harness
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/three-pillars/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 20
    outcome: Diagnose any AI coding session by naming which pillar is weak — prompt,
      context, or harness — and improve that pillar specifically.
    tags:
      - green-belt
      - three-pillars
      - voice-anchor
      - willison
  - slug: belts/green/context-windows
    title: Why context windows fill — the single constraint everything else follows
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/context-windows/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 20
    outcome: Internalise the context-window constraint and use it to make better
      decisions about what to load, what to summarise, and what to leave out.
    tags:
      - green-belt
      - context-windows
      - constraint
  - slug: belts/green/claude-md-real-service
    title: CLAUDE.md for a real service — WHAT + WHY, under 200 lines
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/claude-md-real-service/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 45
    outcome: Write a CLAUDE.md that names what the service is, what matters, and
      what to avoid — under 200 lines, with WHY beside every rule.
    tags:
      - green-belt
      - claude-md
      - context-engineering
  - slug: belts/green/hierarchical-claude-md
    title: Hierarchical CLAUDE.md in a monorepo — root vs package vs local
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/hierarchical-claude-md/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 30
    outcome: Place the right rule at the right level — root, package, or local — so
      each session reads only the rules that apply to its working directory.
    tags:
      - green-belt
      - claude-md
      - monorepo
      - hierarchy
  - slug: belts/green/claude-local-md
    title: CLAUDE.local.md — personal overrides, and what belongs there
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/claude-local-md/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 10
    outcome: Use CLAUDE.local.md for personal overrides without polluting the team's
      shared CLAUDE.md.
    tags:
      - green-belt
      - claude-md
      - personal-overrides
  - slug: belts/green/skills-overview
    title: Skills — what they are, why they compound
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/skills-overview/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 25
    outcome: Recognise when a workflow has earned a place in the skills library and
      understand why skills are the second compound interest in AI productivity
      after CLAUDE.md.
    tags:
      - green-belt
      - skills
      - compounding
  - slug: belts/green/writing-your-first-skill
    title: Writing your first SKILL.md — the anatomy, naming, discipline
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/writing-your-first-skill/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 45
    outcome: Write a SKILL.md that triggers reliably, does a bounded job, and earns
      a place in the team's skill library.
    tags:
      - green-belt
      - skill-authorship
      - skill-md
      - anatomy
  - slug: belts/green/subagents
    title: Subagents — when to delegate, how to pass intent cleanly
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/subagents/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 30
    outcome: Decide when a task is better delegated to a subagent than handled in
      the main session, and pass intent to that subagent without losing context.
    tags:
      - green-belt
      - subagents
      - delegation
      - harness
  - slug: belts/green/worktrees
    title: Worktrees — running 3-5 Claude instances in parallel, safely
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/worktrees/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 30
    outcome: Run multiple Claude Code sessions against the same repo at the same
      time without conflicting edits, broken builds, or confused state.
    tags:
      - green-belt
      - worktrees
      - parallelism
      - harness
  - slug: belts/green/hooks-and-slash-commands
    title: Hooks + slash commands — when to automate the pre-flight
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/hooks-and-slash-commands/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 30
    outcome: Use hooks to enforce pre-flight checks automatically, and slash
      commands to give yourself reliable shortcuts; know which is the right
      shape for which job.
    tags:
      - green-belt
      - hooks
      - slash-commands
      - automation
      - harness
  - slug: belts/green/advanced-prompting
    title: Advanced prompting — goals, constraints, worked examples
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/advanced-prompting/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 40
    outcome: Write prompts that name the goal, the constraints, and the success
      criteria precisely enough that the agent's output is consistent across
      runs and worth shipping.
    tags:
      - green-belt
      - prompting
      - prompt-craft
  - slug: belts/green/quest-author-a-team-skill
    title: "Quest G-1: Author a team skill"
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/quest-author-a-team-skill/
    section: belts
    track: green
    belt: green
    status: drafted
    type: quest
    audience: experienced-builder
    time_minutes: 240
    outcome: Capture a real team workflow as a SKILL.md, get one teammate to invoke
      it on a real task, and log the invocation.
    tags:
      - green-belt
      - quest
      - skill-authoring
      - team
  - slug: belts/green/b-practices
    title: Green Belt Part B — The Practices
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/b-practices/
    section: belts
    track: green
    belt: green
    status: drafted
    type: readme
    audience: experienced-builder
    time_minutes: 10
    outcome: Understand what Part B teaches, what Part A muscle memory it assumes,
      and the order to walk it in.
    tags:
      - green-belt
      - part-b
      - the-practices
      - readme
  - slug: belts/green/playwright-and-claude-code
    title: E2E testing with Playwright + Claude Code
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/playwright-and-claude-code/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 45
    outcome: Write a Playwright end-to-end test with Claude Code that survives the
      codebase, reads cleanly, and catches the regression you actually fear.
    tags:
      - green-belt
      - playwright
      - e2e-testing
      - voice-anchor
  - slug: belts/green/playwright-skill-pattern
    title: The Playwright Skill pattern — one-shot test quality
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/playwright-skill-pattern/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 30
    outcome: Package the Playwright spec-then-code loop into a skill that turns a
      behaviour description into a working test in one invocation.
    tags:
      - green-belt
      - playwright
      - skill-pattern
      - skill-authoring
  - slug: belts/green/seed-spec
    title: tests/seed.spec.ts — saving the agent 10,000 tokens
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/seed-spec/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 15
    outcome: Use a seed spec — a single small Playwright test that exercises the
      canonical fixtures, helpers, and conventions — to anchor the agent's
      understanding of the test directory in one read.
    tags:
      - green-belt
      - seed-spec
      - context-budget
      - playwright
  - slug: belts/green/design-to-code
    title: Design-to-code — Figma + Blade + Code Connect, end to end
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/design-to-code/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 60
    outcome: Walk a Figma frame through the Figma connector, the Blade design
      system, and Code Connect into running code that respects design-system
      conventions and ships cleanly.
    tags:
      - green-belt
      - design-to-code
      - figma
      - blade
      - code-connect
  - slug: belts/green/blade-deep-dive
    title: Blade deep dive — tokens, primitives, variants, accessibility
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/blade-deep-dive/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 45
    outcome: Understand Blade's anatomy — tokens, primitives, variants,
      accessibility — well enough to pick the right component for any UI need
      without inventing one.
    tags:
      - green-belt
      - blade
      - design-system
      - tokens
      - accessibility
  - slug: belts/green/production-compiler-skill
    title: The production-compiler skill — AI-Studio / ChatGPT output → Blade
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/production-compiler-skill/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 30
    outcome: Recognise when AI-generated code needs to be repaired against the
      design system, and use the production-compiler skill to bring the code
      back to Blade primitives.
    tags:
      - green-belt
      - production-compiler
      - skill-pattern
      - blade
      - repair
  - slug: belts/green/daily-loop
    title: Node + pnpm + localhost + mobile viewport — the daily loop
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/daily-loop/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 30
    outcome: Run a tight, fast local-dev loop for frontend work — install, dev
      server, viewport switching — that scales across multiple worktrees and
      surfaces issues before commit.
    tags:
      - green-belt
      - daily-loop
      - node
      - pnpm
      - localhost
  - slug: belts/green/design-preview-platform
    title: Branch-preview platform — branch → live URL
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/design-preview-platform/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 30
    outcome: Use branch-preview URLs to share work in progress with design and
      product reviewers without anyone having to check out your branch.
    tags:
      - green-belt
      - branch-preview
      - preview-url
      - design-review
  - slug: belts/green/observability-with-ai
    title: Observability with AI — logs, traces, cost attribution
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/observability-with-ai/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 25
    outcome: Use Claude Code with the observability connectors to triage
      production-shape issues — logs, traces, and cost attribution — without
      dumping raw output into the chat window.
    tags:
      - green-belt
      - observability
      - logs
      - traces
      - cost-attribution
  - slug: belts/green/debugging-hard-kind
    title: Debugging the hard kind — when Claude is wrong, and you have to tell
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/debugging-hard-kind/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 30
    outcome: Recognise when Claude's analysis is wrong, push back productively, and
      get to the right answer without falling into either capitulation or
      argument.
    tags:
      - green-belt
      - debugging
      - prompt-craft
      - capstone
  - slug: belts/green/quest-greenfield-crossover
    title: "Quest G-2: The Greenfield cross-over"
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/quest-greenfield-crossover/
    section: belts
    track: green
    belt: green
    status: drafted
    type: quest
    audience: experienced-builder
    time_minutes: 480
    outcome: Ship one meaningful change in a greenfield surface that exercises Part
      A craft and Part B practices together — and capture the cross-over in the
      reflection.
    tags:
      - green-belt
      - quest
      - greenfield
      - crossover
  - slug: belts/green/c-guardrails
    title: Green Belt Part C — Fintech Guardrails
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/c-guardrails/
    section: belts
    track: green
    belt: green
    status: drafted
    type: readme
    audience: experienced-builder
    time_minutes: 10
    outcome: Understand what Part C teaches, what Parts A and B muscle memory it
      assumes, and the order to walk it in.
    tags:
      - green-belt
      - part-c
      - fintech-guardrails
      - readme
  - slug: belts/green/redlines
    title: What never goes into a prompt — the Razorpay redlines
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/redlines/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 20
    outcome: Internalise the things that must never appear in a prompt — the
      redlines — and the reflexes that catch them before you hit Enter.
    tags:
      - green-belt
      - redlines
      - voice-anchor
      - guardrails
      - safety
  - slug: belts/green/llm-proxy
    title: The LLM proxy — what LiteLLM does and why every call routes through it
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/llm-proxy/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 25
    outcome: Understand why every model call routes through a proxy, what LiteLLM
      gives you that direct calls do not, and how to debug when the proxy is the
      friction.
    tags:
      - green-belt
      - llm-proxy
      - litellm
      - harness
  - slug: belts/green/pii-pci-rbi
    title: PII, PCI, RBI — the regulators, the reasons, the reflexes
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/pii-pci-rbi/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 30
    outcome: Recognise data that falls under PII, PCI, or RBI scope; understand why
      each regulator cares; develop the reflexes that keep regulator-protected
      data out of AI-assisted work.
    tags:
      - green-belt
      - compliance
      - pii
      - pci
      - rbi
      - regulators
  - slug: belts/green/prompt-injection
    title: Prompt injection + output classifiers — the threats, the mitigations
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/prompt-injection/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 30
    outcome: Recognise prompt-injection patterns, understand what output classifiers
      catch and what they miss, and design AI-assisted features so injection
      cannot escalate.
    tags:
      - green-belt
      - prompt-injection
      - output-classifiers
      - security
  - slug: belts/green/pre-ship-check-skill
    title: The pre-ship-check skill — 6-layer gate before every PR
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/pre-ship-check-skill/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 20
    outcome: Run the pre-ship-check skill before every PR, read the six-layer
      report, and fix what it surfaces — without working around the gate.
    tags:
      - green-belt
      - pre-ship-check
      - skill-pattern
      - guardrail
  - slug: belts/green/blade-compliance-skill
    title: The Blade-compliance reviewer skill — file-granularity checks
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/blade-compliance-skill/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 15
    outcome: Run the Blade-compliance reviewer skill on individual UI files to catch
      design-system drift the pre-ship-check's PR-level scan might miss.
    tags:
      - green-belt
      - blade-compliance
      - skill-pattern
      - design-system
  - slug: belts/green/security-review-subagent
    title: Using a subagent for security review
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/security-review-subagent/
    section: belts
    track: green
    belt: green
    status: drafted
    type: chapter
    audience: experienced-builder
    time_minutes: 20
    outcome: Spawn a subagent for security review with a clean brief, consume the
      structured findings, and act on what is real without wasting context on
      noise.
    tags:
      - green-belt
      - security-review
      - subagent
      - skill-pattern
  - slug: belts/green/boss-fight
    title: "Boss Fight G-B: The double-ship"
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/boss-fight/
    section: belts
    track: green
    belt: green
    status: drafted
    type: boss-fight
    audience: experienced-builder
    time_minutes: 360
    outcome: Ship two merged PRs — one on a product repo with five named
      sub-requirements, plus your Quest G-2 greenfield PR — and earn Green Belt.
    tags:
      - green-belt
      - boss-fight
      - double-ship
      - capstone
  - slug: belts/green/badge
    title: Green Belt badge template
    hub_url: https://razorpay.github.io/ai-playbook/belts/green/badge/
    section: belts
    track: green
    belt: green
    status: drafted
    type: badge
    audience: experienced-builder
    time_minutes: 12
    outcome: Provide the builder-facing template for claiming Green Belt with
      cross-belt synthesis evidence and reviewer attestation.
    tags:
      - green-belt
      - badge
      - certification
      - template
  - slug: belts/black
    title: Black Belt
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/
    section: belts
    track: black
    belt: black
    status: drafted
    type: readme
    audience: platform-builder
    time_minutes: 15
    outcome: Understand the Black Belt arc, what is drafted in Part A, and what
      comes next in Parts B and C.
    tags:
      - black-belt
      - readme
      - platform
  - slug: belts/black/a-platform
    title: Black Belt Part A — Build the Platform
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/a-platform/
    section: belts
    track: black
    belt: black
    status: drafted
    type: readme
    audience: platform-builder
    time_minutes: 8
    outcome: Understand what Part A teaches, what Green-Belt muscle memory it
      assumes, and the order to walk it in.
    tags:
      - black-belt
      - part-a
      - build-the-platform
      - readme
  - slug: belts/black/internal-mcp-server
    title: Authoring an internal MCP server — architecture, auth, packaging
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/internal-mcp-server/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 60
    outcome: Author an internal MCP server with sound architecture, real auth, and a
      packaging story other PODs can install.
    tags:
      - black-belt
      - mcp
      - voice-anchor
      - platform
  - slug: belts/black/skill-pack-publishing
    title: Publishing a shared skill — placement, validation, review
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/skill-pack-publishing/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 30
    outcome: Publish a reusable skill to razorpay/agent-skills so other teams can
      discover, install, verify, and maintain it without re-deriving the
      workflow.
    tags:
      - black-belt
      - agent-skills
      - publishing
      - governance
  - slug: belts/black/cowork-plugin-marketplace
    title: Publishing a plugin — package once, prove every surface
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/cowork-plugin-marketplace/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 45
    outcome: Publish a plugin through the canonical Razorpay marketplace, then prove
      each user surface you claim supports it.
    tags:
      - black-belt
      - plugins
      - plugin-marketplace
      - publishing
      - compatibility
  - slug: belts/black/agent-sdk
    title: The Claude Agent SDK — when to write your own agent
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/agent-sdk/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 45
    outcome: Decide cleanly between extending the program-pinned plugin and writing
      a custom agent with the Claude Agent SDK.
    tags:
      - black-belt
      - agent-sdk
      - build-vs-install
      - harness
  - slug: belts/black/multi-agent-orchestration
    title: Multi-agent orchestration — patterns that work, patterns that don't
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/multi-agent-orchestration/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 45
    outcome: Choose the right multi-agent orchestration pattern for the job and
      refuse the patterns that consistently fail.
    tags:
      - black-belt
      - multi-agent
      - orchestration
      - patterns
  - slug: belts/black/tool-design
    title: Tool design — JSON schemas, output shapes, error contracts
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/tool-design/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 30
    outcome: Design tool contracts — input schemas, output shapes, error shapes —
      that compose, scale, and survive version changes without breaking the
      agents that depend on them.
    tags:
      - black-belt
      - tool-design
      - json-schema
      - contracts
  - slug: belts/black/quest-publish-an-internal-plugin
    title: "Quest B-1: Publish a shared skill"
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/quest-publish-an-internal-plugin/
    section: belts
    track: black
    belt: black
    status: drafted
    type: quest
    audience: platform-builder
    time_minutes: 480
    outcome: Publish a skill to razorpay/agent-skills so at least two PODs outside
      your team install it within a month — and capture the cross-POD adoption
      signal.
    tags:
      - black-belt
      - quest
      - skill-publishing
      - platform
  - slug: belts/black/b-craft
    title: Black Belt Part B — Push the Craft
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/b-craft/
    section: belts
    track: black
    belt: black
    status: drafted
    type: readme
    audience: platform-builder
    time_minutes: 8
    outcome: Understand what Part B teaches, what Part A muscle memory it assumes,
      and the order to walk it in.
    tags:
      - black-belt
      - part-b
      - push-the-craft
      - readme
  - slug: belts/black/progressive-disclosure
    title: Progressive disclosure — skills that stay small
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/progressive-disclosure/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 25
    outcome: Design skills that stay small by progressively disclosing their depth —
      short by default, deeper when invoked, deepest when needed.
    tags:
      - black-belt
      - progressive-disclosure
      - skill-design
      - voice-anchor
  - slug: belts/black/memory-systems
    title: Memory systems — auto-memory, session state, long-running agents
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/memory-systems/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 45
    outcome: Choose the right memory shape for an agent's job — auto-memory, session
      state, or external storage.
    tags:
      - black-belt
      - memory-systems
      - session-state
      - long-running-agents
  - slug: belts/black/prompt-evals
    title: Prompt evals — A/B, regression, golden sets
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/prompt-evals/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 45
    outcome: Run prompt evaluations against your shipped skills with the right shape
      — golden sets for regression, A/B for improvements, named pass criteria.
    tags:
      - black-belt
      - prompt-evals
      - golden-sets
      - a-b-testing
  - slug: belts/black/cost-and-observability
    title: Cost attribution + observability at team + org scale
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/cost-and-observability/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 30
    outcome: Instrument cost and observability at team and org scale, not just
      per-session — and identify the patterns that run quietly expensive.
    tags:
      - black-belt
      - cost-attribution
      - observability
      - scale
  - slug: belts/black/effort-and-routing
    title: Effort settings, model routing, fall-backs
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/effort-and-routing/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 30
    outcome: Tune per-call settings — effort level, model choice, fall-back path —
      to match the work's stakes.
    tags:
      - black-belt
      - effort-settings
      - model-routing
      - fall-backs
  - slug: belts/black/quest-contribution-or-full-stack
    title: "Quest B-2: Component contribution or full-stack feature"
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/quest-contribution-or-full-stack/
    section: belts
    track: black
    belt: black
    status: drafted
    type: quest
    audience: platform-builder
    time_minutes: 480
    outcome: Prove cross-layer ownership by either contributing a Blade component
      via the contribution pipeline or shipping a full-stack feature you own
      end-to-end.
    tags:
      - black-belt
      - quest
      - blade-contribution
      - full-stack
  - slug: belts/black/c-org
    title: "Black Belt — Part C: Shape the Org"
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/c-org/
    section: belts
    track: black
    belt: black
    status: drafted
    type: readme
    audience: platform-builder
    time_minutes: 8
    outcome: Understand the Part C arc — the cultural and governance moves that turn
      an individual platform-builder into a force multiplier for the whole org —
      and know how to walk it.
    tags:
      - black-belt
      - readme
      - org
      - culture
      - governance
  - slug: belts/black/running-office-hours
    title: Running office hours — the Whoop / Ramp pattern
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/running-office-hours/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 30
    outcome: Run a weekly office hour that surfaces blockers across a POD set and
      produces a redacted decision log.
    tags:
      - black-belt
      - office-hours
      - culture
  - slug: belts/black/embedded-sprints
    title: Embedded sprints — the CTO-with-a-team week
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/embedded-sprints/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 30
    outcome: Embed for a week with a POD outside your own and ship *with* the team
      rather than *for* it; produce a written debrief that the next embed
      inherits.
    tags:
      - black-belt
      - embedded-sprints
      - culture
  - slug: belts/black/writing-an-ai-rfc
    title: Writing an AI RFC — what good looks like at Razorpay
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/writing-an-ai-rfc/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 45
    outcome: Write an AI RFC that earns a merge — a written proposal that names what
      would change, the options considered, the recommendation, the
      cost-and-risk, the rollout plan, the success metric, and the rollback
      plan.
    tags:
      - black-belt
      - rfc
      - governance
  - slug: belts/black/api-council-contributions
    title: Contributing to the API Council (AI-specific reviews)
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/api-council-contributions/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 30
    outcome: Contribute to API Council reviews on AI-specific submissions and apply
      API design discipline to MCP and agent surfaces.
    tags:
      - black-belt
      - api-council
      - governance
  - slug: belts/black/plugin-and-skill-governance
    title: Plugin + skill governance — approval, deprecation, security review
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/plugin-and-skill-governance/
    section: belts
    track: black
    belt: black
    status: drafted
    type: chapter
    audience: platform-builder
    time_minutes: 45
    outcome: Govern shared-skill and plugin lifecycles across scope-sensitive
      approval, deprecation, and security review.
    tags:
      - black-belt
      - governance
      - plugin-lifecycle
  - slug: belts/black/boss-fight-pod-ai-uplift
    title: "Boss Fight B-B: Own a POD's AI uplift for a month"
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/boss-fight-pod-ai-uplift/
    section: belts
    track: black
    belt: black
    status: drafted
    type: boss-fight
    audience: platform-builder
    time_minutes: 1800
    outcome: Embed with a POD outside your own for one month; intervene with the
      full Black Belt toolkit; ship a signed-off metric lift and a one-pager
      case study contributed back to this playbook.
    tags:
      - black-belt
      - boss-fight
      - capstone
  - slug: belts/black/badge
    title: Black Belt badge
    hub_url: https://razorpay.github.io/ai-playbook/belts/black/badge/
    section: belts
    track: black
    belt: black
    status: drafted
    type: badge
    audience: platform-builder
    time_minutes: 5
    outcome: Claim the Black Belt — the platform-builder community's admission
      ticket and the close of the belt curriculum.
    tags:
      - black-belt
      - badge
  - slug: council
    title: Staff+ Council
    hub_url: https://razorpay.github.io/ai-playbook/council/
    section: council
    track: council
    belt: null
    status: drafted
    type: readme
    audience: staff-plus
    time_minutes: 12
    outcome: Understand what the Staff+ Council is, what it does, how a builder
      joins it, and what the chapters cover.
    tags:
      - council
      - readme
      - staff-plus
  - slug: council/what-this-is
    title: What this is and is not
    hub_url: https://razorpay.github.io/ai-playbook/council/what-this-is/
    section: council
    track: council
    belt: null
    status: drafted
    type: chapter
    audience: staff-plus
    time_minutes: 25
    outcome: Understand what the Council is and is not, why senior-IC communities
      exist, and what membership represents.
    tags:
      - council
      - framing
  - slug: council/structure
    title: "Structure: charter, cadence, membership"
    hub_url: https://razorpay.github.io/ai-playbook/council/structure/
    section: council
    track: council
    belt: null
    status: drafted
    type: chapter
    audience: staff-plus
    time_minutes: 35
    outcome: Understand how the Council is composed, how it meets, how it interfaces
      with engineering leadership, and how membership is reviewed.
    tags:
      - council
      - charter
      - membership
  - slug: council/rfc-pipeline
    title: The RFC pipeline and the decision archive
    hub_url: https://razorpay.github.io/ai-playbook/council/rfc-pipeline/
    section: council
    track: council
    belt: null
    status: drafted
    type: chapter
    audience: staff-plus
    time_minutes: 40
    outcome: Submit an RFC, navigate the state machine, understand consensus, and
      treat the archive as a teaching corpus.
    tags:
      - council
      - rfc
      - governance
  - slug: council/mentoring-and-sponsorship
    title: Mentoring and sponsorship at the senior level
    hub_url: https://razorpay.github.io/ai-playbook/council/mentoring-and-sponsorship/
    section: council
    track: council
    belt: null
    status: drafted
    type: chapter
    audience: staff-plus
    time_minutes: 35
    outcome: Distinguish mentoring from sponsorship, time-box relationships,
      recognise mentoring as performance work, and avoid the named failure
      modes.
    tags:
      - council
      - mentoring
      - sponsorship
  - slug: council/external-voice
    title: "External voice: writing, speaking, OSS, brand"
    hub_url: https://razorpay.github.io/ai-playbook/council/external-voice/
    section: council
    track: council
    belt: null
    status: drafted
    type: chapter
    audience: staff-plus
    time_minutes: 35
    outcome: Manage the personal-versus-company voice tension across writing,
      speaking, and OSS contributions.
    tags:
      - council
      - external-voice
      - writing
  - slug: council/multi-year-horizon
    title: The multi-year horizon
    hub_url: https://razorpay.github.io/ai-playbook/council/multi-year-horizon/
    section: council
    track: council
    belt: null
    status: drafted
    type: chapter
    audience: staff-plus
    time_minutes: 25
    outcome: "Understand what the Council shapes that no quarterly artefact
      captures: the program's posture across model generations, regulatory
      frames, and platform-builder community changes over five-to-ten-year
      horizons."
    tags:
      - council
      - long-arc
      - strategy
  - slug: council/charter
    title: Council charter (template)
    hub_url: https://razorpay.github.io/ai-playbook/council/charter/
    section: council
    track: council
    belt: null
    status: drafted
    type: artefact
    audience: staff-plus
    time_minutes: 15
    outcome: A referenceable charter template the Council ratifies and revises
      annually. Sits outside the linear reading order.
    tags:
      - council
      - charter
      - artefact
  - slug: appendices/tool-atlas
    title: "Appendix A: Tool Atlas"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/tool-atlas/
    section: appendices
    track: tool-atlas
    belt: null
    status: drafted
    type: readme
    audience: everyone
    time_minutes: 10
    outcome: Choose the right AI tool surface for the job instead of treating every
      tool as interchangeable.
    tags:
      - appendix
      - tools
      - harness
  - slug: appendices/environment-setup
    title: "Appendix B: Environment Setup"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/environment-setup/
    section: appendices
    track: environment-setup
    belt: white
    status: drafted
    type: readme
    audience: everyone
    time_minutes: 12
    outcome: Know what the setup layer is responsible for and how to triage
      environment failures without guessing.
    tags:
      - appendix
      - setup
      - environment
      - mcp
  - slug: appendices/skills-library
    title: "Appendix C: Skills Library"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/skills-library/
    section: appendices
    track: skills-library
    belt: green
    status: drafted
    type: readme
    audience: everyone
    time_minutes: 10
    outcome: Understand what belongs in a reusable skill, inspect the reference
      definitions, and contribute back without confusing source definitions with
      distributed commands.
    tags:
      - appendix
      - skills
      - agents
      - workflow
  - slug: appendices/certification
    title: "Appendix L: Certification"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/certification/
    section: appendices
    track: certification
    belt: null
    status: drafted
    type: readme
    audience: leads
    time_minutes: 10
    outcome: Understand the evidence required to award belts without turning the
      program into self-reported training.
    tags:
      - appendix
      - certification
      - belts
      - program
  - slug: appendices/reference-cards
    title: "Appendix H: Quick-reference cards"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/reference-cards/
    section: appendices
    track: reference-cards
    belt: null
    status: drafted
    type: readme
    audience: everyone
    time_minutes: 2
    outcome: Find printable reference cards that support the safety and workflow
      chapters.
    tags:
      - appendix
      - reference-card
      - safety
  - slug: appendices/reference-cards/never-put-this-in-a-prompt
    title: Never put this in a prompt
    hub_url: https://razorpay.github.io/ai-playbook/appendices/reference-cards/never-put-this-in-a-prompt/
    section: appendices
    track: reference-cards
    belt: null
    status: drafted
    type: reference-card
    audience: everyone
    time_minutes: 3
    outcome: Use a one-page safety card to decide what must be redacted before
      prompting.
    tags:
      - appendix
      - reference-card
      - safety
      - security
  - slug: appendices/methodologies
    title: "Appendix N: Methodologies & Frameworks"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/methodologies/
    section: appendices
    track: methodologies
    belt: null
    status: drafted
    type: readme
    audience: engineer
    time_minutes: 5
    outcome: Know which methodology reference to read for deeper context on
      KB-driven development.
    tags:
      - appendix
      - knowledge-base
  - slug: appendices/methodologies/kb-driven-development
    title: Knowledge-base-driven development as a discipline
    hub_url: https://razorpay.github.io/ai-playbook/appendices/methodologies/kb-driven-development/
    section: appendices
    track: methodologies
    belt: null
    status: drafted
    type: chapter
    audience: engineer
    time_minutes: 15
    outcome: Understand the discipline behind accumulating context instead of
      re-deriving it.
    tags:
      - appendix
      - knowledge-base
  - slug: appendices/methodologies/gstack
    title: gstack
    hub_url: https://razorpay.github.io/ai-playbook/appendices/methodologies/gstack/
    section: appendices
    track: methodologies
    belt: null
    status: drafted
    type: chapter
    audience: engineer
    time_minutes: 10
    outcome: Understand what to lift from gstack and what to leave behind.
    tags:
      - appendix
      - frameworks
      - gstack
  - slug: appendices/methodologies/gsd
    title: Get Shit Done
    hub_url: https://razorpay.github.io/ai-playbook/appendices/methodologies/gsd/
    section: appendices
    track: methodologies
    belt: null
    status: drafted
    type: chapter
    audience: engineer
    time_minutes: 12
    outcome: Understand GSD as a spec-first, context-engineering workflow pattern.
    tags:
      - appendix
      - frameworks
      - gsd
  - slug: appendices/methodologies/llm-wiki
    title: The LLM Wiki pattern
    hub_url: https://razorpay.github.io/ai-playbook/appendices/methodologies/llm-wiki/
    section: appendices
    track: methodologies
    belt: null
    status: drafted
    type: chapter
    audience: engineer
    time_minutes: 12
    outcome: Understand the wiki-as-context pattern and why it differs from
      RAG-first thinking.
    tags:
      - appendix
      - frameworks
      - knowledge-base
  - slug: appendices/methodologies/three-pillars
    title: Simon Willison's three pillars
    hub_url: https://razorpay.github.io/ai-playbook/appendices/methodologies/three-pillars/
    section: appendices
    track: methodologies
    belt: null
    status: drafted
    type: chapter
    audience: engineer
    time_minutes: 10
    outcome: Use prompt, context, and harness as separate axes for diagnosing AI
      workflows.
    tags:
      - appendix
      - frameworks
      - three-pillars
  - slug: appendices/methodologies/spec-first
    title: Spec-first / agentic-loop design
    hub_url: https://razorpay.github.io/ai-playbook/appendices/methodologies/spec-first/
    section: appendices
    track: methodologies
    belt: null
    status: drafted
    type: chapter
    audience: engineer
    time_minutes: 15
    outcome: Understand why spec-first loops make AI work reviewable and reliable.
    tags:
      - appendix
      - frameworks
      - spec-first
  - slug: appendices/methodologies/minimum-viable-wiki
    title: The minimum viable wiki
    hub_url: https://razorpay.github.io/ai-playbook/appendices/methodologies/minimum-viable-wiki/
    section: appendices
    track: methodologies
    belt: null
    status: drafted
    type: chapter
    audience: engineer
    time_minutes: 20
    outcome: Stand up a small working wiki with schema, catalog, journal, and pages.
    tags:
      - appendix
      - knowledge-base
  - slug: appendices/methodologies/evaluating-frameworks
    title: Evaluating new frameworks
    hub_url: https://razorpay.github.io/ai-playbook/appendices/methodologies/evaluating-frameworks/
    section: appendices
    track: methodologies
    belt: null
    status: drafted
    type: chapter
    audience: engineer
    time_minutes: 12
    outcome: Evaluate the next AI workflow framework with a reusable rubric.
    tags:
      - appendix
      - frameworks
      - rubric
  - slug: appendices/glossary
    title: "Appendix G: Glossary"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/glossary/
    section: appendices
    track: glossary
    belt: null
    status: drafted
    type: readme
    audience: everyone
    time_minutes: 10
    outcome: Look up any acronym, tool, role, or concept used in the curriculum and
      find a short definition with chapter pointers.
    tags:
      - appendix
      - glossary
      - reference
  - slug: appendices/templates
    title: "Appendix I: Templates"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/templates/
    section: appendices
    track: templates
    belt: null
    status: drafted
    type: readme
    audience: everyone
    time_minutes: 8
    outcome: Find the right template for the artefact you are about to create.
    tags:
      - appendix
      - templates
  - slug: appendices/templates/claude-md-service
    title: "Template: CLAUDE.md (service-level)"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/templates/claude-md-service/
    section: appendices
    track: templates
    belt: null
    status: drafted
    type: template
    audience: engineer
    time_minutes: 5
    outcome: Add a working CLAUDE.md to a single service or repository.
    tags:
      - template
      - claude-md
      - service
  - slug: appendices/templates/claude-md-monorepo
    title: "Template: CLAUDE.md (monorepo root)"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/templates/claude-md-monorepo/
    section: appendices
    track: templates
    belt: null
    status: drafted
    type: template
    audience: engineer
    time_minutes: 5
    outcome: Add a working root-level CLAUDE.md to a monorepo.
    tags:
      - template
      - claude-md
      - monorepo
  - slug: appendices/templates/claude-local-md
    title: "Template: CLAUDE.local.md"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/templates/claude-local-md/
    section: appendices
    track: templates
    belt: null
    status: drafted
    type: template
    audience: engineer
    time_minutes: 3
    outcome: Add a personal, gitignored CLAUDE.local.md with overrides and
      machine-specific paths.
    tags:
      - template
      - claude-md
      - local
  - slug: appendices/templates/skill-md-minimum
    title: "Template: SKILL.md (minimum viable)"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/templates/skill-md-minimum/
    section: appendices
    track: templates
    belt: null
    status: drafted
    type: template
    audience: engineer
    time_minutes: 5
    outcome: Author your first SKILL.md with clear triggers, body, and output shape.
    tags:
      - template
      - skill-md
      - minimum
  - slug: appendices/templates/skill-md-full
    title: "Template: SKILL.md (full, with progressive disclosure)"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/templates/skill-md-full/
    section: appendices
    track: templates
    belt: null
    status: drafted
    type: template
    audience: engineer
    time_minutes: 6
    outcome: Author a SKILL.md that stays small in its default body but reveals
      depth on demand.
    tags:
      - template
      - skill-md
      - progressive-disclosure
  - slug: appendices/templates/rfc
    title: "Template: AI RFC"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/templates/rfc/
    section: appendices
    track: templates
    belt: null
    status: drafted
    type: template
    audience: platform-builder
    time_minutes: 8
    outcome: Write an AI RFC that names what would change, why, what alternatives
      exist, and how to roll it back.
    tags:
      - template
      - rfc
      - governance
  - slug: appendices/templates/retro
    title: "Template: Retro (Quest, Boss Fight, Embedded Sprint)"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/templates/retro/
    section: appendices
    track: templates
    belt: null
    status: drafted
    type: template
    audience: everyone
    time_minutes: 5
    outcome: Write a retro that captures what worked, what did not, what surprised,
      and what the next person should know.
    tags:
      - template
      - retro
  - slug: appendices/templates/mv-wiki-seed
    title: "Template: Minimum viable wiki seed"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/templates/mv-wiki-seed/
    section: appendices
    track: templates
    belt: null
    status: drafted
    type: template
    audience: everyone
    time_minutes: 6
    outcome: Stand up a working knowledge-base shape for a project.
    tags:
      - template
      - wiki
      - knowledge-base
  - slug: appendices/known-issues
    title: "Appendix D: Known Issues + FAQ"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/known-issues/
    section: appendices
    track: known-issues
    belt: null
    status: drafted skeleton
    type: readme
    audience: everyone
    time_minutes: 8
    outcome: Find the known fix for a problem you have hit, or contribute a fix you
      have just developed.
    tags:
      - appendix
      - known-issues
      - faq
      - skeleton
  - slug: appendices/roles-and-forums
    title: "Appendix E: Roles & Forums"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/roles-and-forums/
    section: appendices
    track: roles-and-forums
    belt: null
    status: drafted skeleton
    type: readme
    audience: everyone
    time_minutes: 8
    outcome: Find the role that owns a given topic and the forum where the role's
      work happens.
    tags:
      - appendix
      - roles
      - forums
      - skeleton
  - slug: appendices/slack-channels
    title: "Appendix F: Slack Channels & Rules of Engagement"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/slack-channels/
    section: appendices
    track: slack-channels
    belt: null
    status: drafted
    type: readme
    audience: everyone
    time_minutes: 6
    outcome: Find the right channel for a question; follow the etiquette so the
      program's primary channels stay useful.
    tags:
      - appendix
      - slack
      - channels
      - etiquette
      - directory
  - slug: appendices/reading-list
    title: "Appendix J: Reading List"
    hub_url: https://razorpay.github.io/ai-playbook/appendices/reading-list/
    section: appendices
    track: reading-list
    belt: null
    status: drafted
    type: readme
    audience: everyone
    time_minutes: 10
    outcome: Find the public source the curriculum cites for a topic with a one-line
      annotation.
    tags:
      - appendix
      - reading-list
      - external
  - slug: appendices/reference-cards/terminal-essentials
    title: H.2 — Terminal essentials
    hub_url: https://razorpay.github.io/ai-playbook/appendices/reference-cards/terminal-essentials/
    section: appendices
    track: reference-cards
    belt: null
    status: drafted
    type: reference-card
    audience: everyone
    time_minutes: 3
    outcome: The twelve commands and four shortcuts that get a new user through
      White Belt.
    tags:
      - appendix
      - reference-card
      - terminal
  - slug: appendices/reference-cards/git-essentials
    title: H.3 — Git essentials
    hub_url: https://razorpay.github.io/ai-playbook/appendices/reference-cards/git-essentials/
    section: appendices
    track: reference-cards
    belt: null
    status: drafted
    type: reference-card
    audience: everyone
    time_minutes: 3
    outcome: Everyday Git commands plus the four recovery moves that handle most
      situations.
    tags:
      - appendix
      - reference-card
      - git
  - slug: appendices/reference-cards/claude-code-essentials
    title: H.4 — Claude Code essentials
    hub_url: https://razorpay.github.io/ai-playbook/appendices/reference-cards/claude-code-essentials/
    section: appendices
    track: reference-cards
    belt: null
    status: drafted
    type: reference-card
    audience: everyone
    time_minutes: 3
    outcome: The permission system, slash commands, and daily rhythm of working with
      Claude Code.
    tags:
      - appendix
      - reference-card
      - claude-code
  - slug: appendices/reference-cards/playwright-essentials
    title: H.5 — Playwright essentials
    hub_url: https://razorpay.github.io/ai-playbook/appendices/reference-cards/playwright-essentials/
    section: appendices
    track: reference-cards
    belt: null
    status: drafted
    type: reference-card
    audience: engineer
    time_minutes: 3
    outcome: Everyday Playwright commands plus four debugging moves.
    tags:
      - appendix
      - reference-card
      - playwright
      - testing
  - slug: appendices/reference-cards/mv-wiki-one-pager
    title: H.6 — Minimum viable wiki one-pager
    hub_url: https://razorpay.github.io/ai-playbook/appendices/reference-cards/mv-wiki-one-pager/
    section: appendices
    track: reference-cards
    belt: null
    status: drafted
    type: reference-card
    audience: everyone
    time_minutes: 3
    outcome: The four-file wiki shape and the discipline that keeps a project's
      context compounding.
    tags:
      - appendix
      - reference-card
      - knowledge-base
      - wiki
  - slug: appendices/reference-cards/day-1-quick-reference
    title: H.7 — Day-1 quick reference
    hub_url: https://razorpay.github.io/ai-playbook/appendices/reference-cards/day-1-quick-reference/
    section: appendices
    track: reference-cards
    belt: white
    status: drafted
    type: reference-card
    audience: everyone
    time_minutes: 2
    outcome: Have one printable page with every command, channel, and contact a new
      builder needs in their first week.
    tags:
      - appendix
      - reference-card
      - day-one
      - setup
      - channels
      - people
planned: []

```
