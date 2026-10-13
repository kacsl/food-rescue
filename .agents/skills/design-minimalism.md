---
name: design-minimalism
description: Applies minimalist UI design principles when designing new screens or components and when critiquing existing ones. Use for layout, component, and styling work where clarity and restraint matter.
---

# Design Minimalism

## Principles
- Remove before adding. Every element must help the user complete the primary task.
- One primary action per view, and it is the most prominent element.
- Build hierarchy with space, size, and weight before color, borders, or shadows.
- Use a limited scale: one font family, 2 to 3 type sizes per screen, and spacing values from the design system.
- Group with proximity and whitespace, not boxes or dividers.

## Rules
- **Tags:** Maximum one tag per element (card, list row, header). Never stack badges, chips, or status labels.
- **Brand color:** Use the brand token (`{brand-color-token}`) only for the primary action, the active state, or one focal point per view. Use neutral tokens for text, backgrounds, borders, and icons.
- **Accent colors:** Maximum one accent color per screen.
- **Borders and shadows:** Use at most one per container. Default to neither.
- **Icons:** Default to the stroked version of the icon. Pair icons with text when the action is ambiguous.
- **Copy:** Short, plain, sentence case. Remove filler words.
- **Decoration:** No gradients, illustrations, or ornaments unless the brief requires them.
- **Empty states:** One sentence of explanation and one action.

## Process
1. State the user goal and primary task in one sentence.
2. List the elements that the task needs. Cut the rest.
3. Lay out with the spacing scale. Check hierarchy by blurring the screen: the primary action and main content should read first.
4. Check the output against the rules. Report any rule you bent and why.
5. Always ask when you don't have enough context about how to meet a requirement while keeping the design minimal

## Critique Checklist (Existing UI)
- Is there more than one primary action on the screen?
- Does any element carry more than one tag?
- Is brand color on more than one focal point on the screen?
- Does any container stack a border, shadow, and divider?
- Does any container have a stroke with the primary color?
- Can any element, label, or sentence be removed without losing meaning?

## Output
- All UI copy, layer names, and annotations in English.
- Keep explanations short. Lead with the decision, then the reason.
- No em dashes. Use commas, colons, periods, or parentheses.
