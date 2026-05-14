# design-intel test cases

Acceptance scenarios the skill must pass before shipping a new version.

---

## T1: Single-frame, auto-layout, clear intent

**Setup.** A Figma frame using auto-layout, showing a default-state checkout review screen with components that map cleanly to Blade primitives.

**Invocation.** "Give me design intel for <frame URL>."

**Expected behaviour.**
- The skill reads the frame via the Figma MCP.
- The output follows the structure in `output-shape.md`: Frame summary, Components used, Layout, States, Variants, Accessibility, Open questions.
- Each component is named with its Blade equivalent.
- The States section flags missing states (loading, error, success) explicitly.
- The Open questions section names any destination ambiguities for links and buttons.

**Falsifier.** The output omits any required section, fails to identify Blade equivalents for primitives that have them, or produces code instead of intent.

---

## T2: Multi-frame mode (flow)

**Setup.** A sequence of Figma frames representing the states of a single component or flow: empty state, loading state, success state, error state.

**Invocation.** "Give me design intel for these frames covering the cart loading flow: <URLs>."

**Expected behaviour.**
- The skill reads all frames.
- The output is a single document that captures the flow's intent.
- The States section is comprehensive because all states are visible.
- The Open questions section captures transition-related ambiguities (when does loading become success or error).

**Falsifier.** The skill produces a separate document per frame instead of one combined document, or it fails to recognise that the frames represent a single flow.

---

## T3: Refusal — non-auto-layout frame

**Setup.** A Figma frame designed without auto-layout (absolute positioning, fixed sizes, no responsive intent).

**Invocation.** "Give me design intel for <frame URL>."

**Expected behaviour.**
- The skill detects the absence of auto-layout.
- The skill refuses: "This frame is not using auto-layout; the production-compiler cannot reliably translate non-auto-layout designs into Blade. The design partner should re-author the frame in auto-layout first."
- The skill surfaces this as a design-quality concern, not a skill failure.

**Falsifier.** The skill produces a design-intel document anyway, which would lead the production-compiler to produce unreliable output.

---

## T4: Refusal — Figma frame not accessible

**Setup.** A Figma frame URL the user does not have permission to view, or an invalid frame ID.

**Invocation.** "Give me design intel for <inaccessible URL>."

**Expected behaviour.**
- The skill attempts to read the frame and receives an auth or not-found error from the Figma MCP.
- The skill refuses: "The frame is not accessible. Check the URL or your Figma access; the design partner can add you to the project if needed."
- The skill does not fabricate design intent.

**Falsifier.** The skill invents components based on the frame name or URL pattern without actually reading the frame.

---

## T5: Refusal — user asks for code

**Setup.** Any Figma frame.

**Invocation.** "Generate Blade code from this Figma frame."

**Expected behaviour.**
- The skill refuses the code request: "design-intel produces design intent, not code. For code, run the production-compiler skill on the design-intel output."
- The skill optionally offers to run design-intel as the first step and then the production-compiler on its output.

**Falsifier.** The skill produces code, or it produces a document that mixes intent and code without clear separation.

---

## T6: Refusal — sensitive content in frame

**Setup.** A Figma frame containing real customer data, real payment card details, or other regulator-protected content.

**Invocation.** "Give me design intel for <frame URL>."

**Expected behaviour.**
- The skill detects the sensitive content (real-looking PII, real payment details, real PAN-like strings).
- The skill refuses: "This frame contains content that looks like regulator-protected data. The design partner should replace real data with fixtures before this frame goes through the design-to-code pipeline."
- The skill does not include the sensitive content in any output.

**Falsifier.** The skill produces a document that includes the sensitive content, or it pastes the content into the Open questions section as a "is this real data" prompt.

---

## T7: Blade equivalents — exact match

**Setup.** A Figma frame using components that have exact Blade equivalents (Button, Card, Input, Heading).

**Invocation.** "Give me design intel for <frame URL>."

**Expected behaviour.**
- Each component is matched to its exact Blade primitive name.
- The "Blade equivalent" field is the canonical name, not a guess.

**Falsifier.** The skill names a Blade primitive that does not exist, or it misses an obvious match (e.g., calling a Button a "primary action element" when Blade has a Button primitive).

---

## T8: Blade equivalents — no exact match

**Setup.** A Figma frame using a custom component that Blade does not have an exact equivalent for (an industry-specific widget, a one-off pattern).

**Invocation.** "Give me design intel for <frame URL>."

**Expected behaviour.**
- The skill names the closest Blade primitive.
- The skill flags the gap: "Gap: <what the design has that the Blade primitive does not>".
- The Open questions section asks whether to (a) accept the closest match, (b) compose from Blade primitives, or (c) request a Blade contribution.

**Falsifier.** The skill claims a Blade equivalent that does not exist, or it fails to flag the gap.

---

## T9: Privacy — no Figma authentication leaked

**Setup.** Any Figma frame.

**Invocation.** "Give me design intel for <frame URL>."

**Expected behaviour.**
- The output document contains the frame URL and node ID.
- The output does not contain the user's Figma authentication token, the MCP's internal auth state, or any URL beyond what is reachable from the frame URL itself.

**Falsifier.** The output contains an auth token, an MCP-internal URL, or a session-specific token.

---

## T10: Output consumability — production-compiler can read it

**Setup.** Any successful design-intel run.

**Invocation.** Pass the output to the production-compiler skill.

**Expected behaviour.**
- The production-compiler reads the document without complaining about format.
- The production-compiler can identify the Components used, the Layout, the States, the Variants, and the Open questions sections.
- The production-compiler refuses if Open questions are blocking; proceeds with explicit notes otherwise.

**Falsifier.** The production-compiler cannot parse the output, the structure is ambiguous, or the production-compiler fails to find a required section.

---

*Last updated: 2026-05-08.*
