---
name: flow-step-editor
description: Converts an existing multi-screen user flow into a step-by-step experience where each step asks one question with one or two input options. Use when the user wants to turn a form, onboarding, checkout, or configuration flow into guided steps, or to simplify a flow into single-choice or two-choice steps.
---

# Flow Step Editor

Turn a flow into a sequence of steps. Each step asks one question and offers one or two input options. Follow the principles of Marty Cagan (solve the real problem, validate before scaling) and Teresa Torres (one decision at a time, tied to user outcomes).

## 1. Understand the current flow

Before editing, gather:
- The starting point and the goal (what the user completes at the end).
- Every screen or state, with the inputs it collects today.
- Required vs. optional inputs.
- Any branching logic (for example, "if business account, show tax ID").

If any of this is missing or ambiguous, ask before designing. Ask at most three questions at a time.

## 2. Map inputs to steps

- Create one step per decision. Group inputs only when they are a single decision (for example, city and postal code).
- Phrase each question from the user's point of view ("Who is this for?" not "Recipient type").
- Mark each step as required or optional.
- Order steps from foundational to detailed.
- Remove steps whose answers can be inferred or defaulted. Note each removal and why.

## 3. Define the options per step

Each step has 1 or 2 options:
- Two options: use a clear binary or a pair of contrasting choices (for example, "Individual" / "Team").
- One option: use only for confirmations or a single action (for example, "Continue" after an informational step). Do not force a choice that does not exist.
- If a question needs three or more answers, split it into two steps (first narrow the category, then choose).
- Each option gets a short label (1 to 4 words) and an optional one-line description.
- Pre-select a default only when one option is clearly the most common and a wrong choice is cheap to fix.

## 4. Specify the step layout

For each step, define:
- Progress indicator (for example, "Step 2 of 5").
- Question headline and optional helper text.
- Option cards or toggles, with a visible selected state.
- Primary action (Continue) disabled until a choice is made, unless a default exists.
- Back action on every step after the first. Answers persist when going back.
- Save and exit, when the flow takes more than about two minutes.

## 5. Write the copy

- All UI copy, labels, annotations, and layer names are in English.
- Use plain, active language. Avoid jargon unless the audience uses it daily.
- Keep questions under 10 words where possible.
- Do not use em dashes in any copy or annotation. Use commas, colons, periods, or parentheses.

## 6. Handle branching and edge cases

- Show a step only when a prior answer requires it. Do not show dead-end steps.
- Define what happens when the user changes an earlier answer (which later answers are cleared or kept).
- Define an error or empty state for each step, even if it is only "Choose an option to continue."
- End with a review step: a summary of all answers with an "Edit" link per row.

## 7. Output

Produce a step map:

| Step | Question | Options (1 to 2) | Required | Branches to | Notes |
|---|---|---|---|---|---|

Then, per step: headline, helper text, option labels and descriptions, default, back behavior, and validation message.

If Figma tools are connected, build one frame per step in a row, labeled "Step 1 of N", with a progress indicator and the review screen at the end. Keep a consistent layout grid and reuse components.

## 8. Review before delivering

Check each item and fix failures before presenting the result:
- Every step asks one question and has 1 or 2 options.
- No step repeats information already captured.
- Every option label is understandable without context.
- Every step has a back action (except the first) and a clear primary action.
- No em dashes appear in copy or annotations.
- All text is in English.
- The step count is justified. If it exceeds 7, check whether steps can be merged or removed.

Keep the final message short. Lead with the step map, then list open questions.
