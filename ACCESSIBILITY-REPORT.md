# Accessibility Audit and Improvement Report

## Project overview

**Interface concept:** Accessible Tech Digest — a technology blog and information portal.

The original concept represents a typical content website with a header, primary navigation, article listings, topic filters, newsletter signup, and footer. This project reworks that concept to prioritize semantic structure, keyboard operability, assistive-technology support, readable contrast, and clear feedback.

## Audit approach

The interface was reviewed manually against common WCAG 2.2 Level AA considerations and common automated-check categories used by tools such as Lighthouse and WAVE:

- Page structure and landmark usage
- Heading hierarchy
- Color contrast
- Keyboard navigation and focus visibility
- Form labeling, instructions, and error handling
- Dynamic-content announcements
- Link and button purpose
- Responsive behavior and touch-target size
- Motion preferences

## Issues identified in a typical blog interface

| Area | Common issue | Accessibility impact |
|---|---|---|
| Navigation | No skip link and unclear current-page indication | Keyboard and screen-reader users must tab through repeated links |
| Articles | Generic “Read more” links and non-semantic card markup | Link purpose is unclear when links are read out of context |
| Topic filters | Custom-looking checkboxes without programmatic labels | Screen-reader users may not understand available options |
| Forms | Placeholder-only labels and color-only errors | Users may miss required information or error details |
| Dynamic updates | Results change silently | Screen-reader users do not learn that filtering or submission succeeded |
| Focus | Default or invisible focus indicators | Keyboard users cannot tell where they are on the page |
| Motion | Unconditional animations | Motion can cause discomfort for motion-sensitive users |

## Improvements implemented

### 1. Semantic HTML and landmarks

The page uses `header`, `nav`, `main`, `section`, `article`, `footer`, `fieldset`, `legend`, `label`, and `time`. These elements communicate the page’s structure to assistive technologies without relying only on visual styling.

- `header` contains the site brand and primary navigation.
- `main` contains the primary page content.
- Each article is marked up with `article` and has an accessible name through `aria-labelledby`.
- The article collection is a `ul`, communicating that the cards are related list items.
- The footer is a separate landmark and includes a clearly labeled secondary navigation region.

**Why it helps:** Screen-reader users can jump between landmarks, understand content relationships, and navigate by headings rather than listening to every element sequentially.

### 2. Meaningful heading hierarchy

The page has one `h1`, followed by logically ordered `h2` and `h3` elements. Article titles are `h3` elements nested under the “Latest articles” `h2`.

**Why it helps:** A logical heading outline allows users to scan and jump directly to the section they need.

### 3. Clear link purpose

Article titles are the link text itself, rather than a separate generic “Read more” link. Each article link is contained within a heading that has a unique accessible name.

**Why it helps:** When screen-reader users open a links list, each link is understandable without requiring surrounding context.

### 4. Keyboard navigation and visible focus

The page supports keyboard-only use through:

- A “Skip to main content” link as the first focusable element
- A logical DOM order that matches the visual reading order
- Native links, buttons, checkboxes, and inputs
- A strong four-pixel focus outline using `:focus-visible`
- `tabindex="-1"` on `main` so the skip link can move focus to the content area

**Why it helps:** People who cannot use a mouse can operate every interactive feature and always see which control currently has focus.

### 5. Accessible forms

The newsletter form includes:

- A visible `<label>` connected to the email input
- A hint connected through `aria-describedby`
- `autocomplete="email"` and `inputmode="email"`
- Client-side validation
- An error message in an element with `role="alert"`
- `aria-invalid="true"` when validation fails
- Focus moved to the email field when an error occurs
- Error text that explains both the problem and the expected format

**Why it helps:** Users receive clear, programmatic feedback and can correct mistakes efficiently. The error is not communicated through color alone.

### 6. Accessible dynamic updates

The topic filter result uses:

```html
<p class="filter-result" role="status" aria-live="polite"></p>
```

The newsletter error/success message uses:

```html
<p id="email-error" class="field-error" role="alert"></p>
```

**Why it helps:** `aria-live="polite"` announces filter results without interrupting the user, while `role="alert"` promptly announces validation errors or successful subscription feedback.

### 7. Color contrast and visual clarity

The palette uses dark gray body text on a light background and a dark blue primary color on white. These combinations are intended to exceed the WCAG AA contrast threshold of 4.5:1 for normal text. Interactive text links are also underlined or otherwise distinguishable through weight, color, and hover/focus states.

**Why it helps:** Users with low vision, color-vision deficiencies, or those viewing a screen in bright light can read content and identify interactive elements more reliably.

### 8. Touch targets and responsive design

Checkboxes are enlarged, navigation links and buttons include generous padding, and the layout adapts at smaller viewports. On narrow screens, article and report cards stack vertically and navigation wraps rather than becoming horizontally scrollable.

**Why it helps:** People with limited dexterity, tremors, or large touch targets needs can interact with controls more comfortably.

### 9. Reduced-motion support

A `prefers-reduced-motion` media query minimizes transitions and animations.

**Why it helps:** Users who experience discomfort or distraction from motion can use the interface without unnecessary animation.

## WCAG alignment summary

| WCAG principle | Implementation in this project |
|---|---|
| Perceivable | Semantic text alternatives, strong contrast, visible labels, and clear visual hierarchy |
| Operable | Skip link, keyboard support, visible focus, native controls, and adequate target sizes |
| Understandable | Clear language, labeled forms, input hints, descriptive errors, and predictable behavior |
| Robust | Valid semantic HTML, appropriate ARIA, and native controls that work with assistive technologies |

## How to test

1. Unzip the project and open `index.html` in a browser.
2. Press `Tab` immediately after the page loads; the “Skip to main content” link should appear.
3. Activate the skip link and confirm focus moves to the main content.
4. Navigate the entire page using only the keyboard.
5. Verify that every focusable element has a clearly visible focus outline.
6. Submit an empty email address, then an invalid address, and confirm the error is announced and focus moves to the field.
7. Submit a valid address and confirm the success message is announced.
8. Select topic filters and confirm that the result message updates.
9. Resize the browser to mobile width and confirm that content remains readable and controls remain usable.
10. Run Lighthouse or WAVE and review the accessibility category.

## Limitations

- The article links are demonstration placeholders and do not lead to separate article pages.
- Newsletter submission is simulated in the browser; a production implementation must validate and process data securely on a server.
- Automated tools cannot fully assess usability, so manual keyboard and screen-reader testing remain important.
