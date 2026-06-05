import { Course } from '../models/course.model';

/**
 * The CSS Layout course — from zero to advanced.
 * Focus: understand WHY layouts behave as they do (box model, flow,
 * flex & grid algorithms) so you can read and fix any layout confidently.
 */
export const CSS_COURSE: Course = {
  outcome:
    'By the end you will understand how the browser lays out pages — box model, flow, Flexbox and Grid algorithms — read any stylesheet and predict its result, build responsive layouts with modern techniques (clamp, container queries), and debug layout bugs systematically instead of guessing.',
  levels: [
    // ===================================================================
    // LEVEL 1 — LAYOUT FOUNDATIONS
    // ===================================================================
    {
      id: 'l1-foundations',
      order: 1,
      title: 'Level 1 — Layout foundations',
      goal: 'Master the box model, normal flow, sizing units, and positioning — the rules everything else builds on.',
      lessons: [
        {
          id: 'box-model',
          title: 'The box model',
          minutes: 11,
          blurb: 'Every element is a box — learn its four layers.',
          concept: [
            {
              heading: 'Four layers of every box',
              body: 'Everything on a page is a rectangular box with four layers, inside-out: **content** (text/images), **padding** (space inside the border), **border**, and **margin** (space outside, pushing neighbors away). Padding takes the element’s background; margin is always transparent. This box is what every layout system — flow, flex, grid — arranges.',
            },
            {
              heading: 'box-sizing: the first fix',
              body: 'By default (`content-box`), `width: 200px` means the **content** is 200px — padding and border are added ON TOP, so the visible box is wider than you wrote. `box-sizing: border-box` makes `width` mean the **visible box including padding and border** — what everyone expects. Virtually every codebase starts with `* { box-sizing: border-box }` (your SkillForge styles include it).',
            },
            {
              heading: 'Margin collapse — the classic surprise',
              body: 'Vertical margins of adjacent block elements **collapse**: a 24px bottom margin meeting a 16px top margin produces 24px (the larger), not 40px. It happens only vertically, only in normal flow (flex/grid children never collapse). When "my margin does nothing!", collapse is suspect #1 — and one reason modern layouts prefer `gap` over margins.',
            },
          ],
          codeSamples: [
            {
              title: 'Reading a box',
              filename: 'card.css',
              language: 'css',
              code: ".card {\n  box-sizing: border-box;  /* width = the visible box */\n  width: 300px;\n  padding: 16px;           /* inside: pushes content in */\n  border: 1px solid #ddd;\n  margin: 24px;            /* outside: pushes neighbors away */\n  background: white;       /* paints content + padding */\n}\n\n/* shorthand order is clockwise: top right bottom left */\n.banner {\n  margin: 8px 16px;        /* vertical 8, horizontal 16 */\n  padding: 8px 16px 12px;  /* top 8, sides 16, bottom 12 */\n}",
              annotations: [
                { line: 2, note: 'border-box: 300px includes padding and border — predictable.' },
                { line: 7, note: 'Background covers content AND padding — never margin.' },
                { line: 12, note: 'Two values = vertical | horizontal. Memorize the clockwise rule.' },
              ],
              explanation:
                'With border-box, this card is exactly 300px wide on screen: 266px content + 32px padding + 2px border.',
            },
          ],
          keyPoints: [
            'Four layers: content → padding → border → margin (transparent).',
            '`box-sizing: border-box` everywhere — width means the visible box.',
            'Vertical margins collapse (larger wins) in normal flow — flex/grid children don’t.',
            'Shorthand is clockwise: top, right, bottom, left.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'With box-sizing: border-box and width: 200px, padding: 20px — how wide is the visible box?',
              options: [
                { id: 'a', text: '240px', correct: false },
                { id: 'b', text: '200px — border-box includes padding in the width', correct: true },
                { id: 'c', text: '180px', correct: false },
                { id: 'd', text: '220px', correct: false },
              ],
              explanation:
                'border-box makes width the outer (visible) size; content shrinks to fit padding/border inside it.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'A 32px bottom margin meets a 20px top margin between two paragraphs. The gap is:',
              options: [
                { id: 'a', text: '52px', correct: false },
                { id: 'b', text: '32px — vertical margins collapse to the larger one', correct: true },
                { id: 'c', text: '20px', correct: false },
                { id: 'd', text: '26px', correct: false },
              ],
              explanation:
                'Adjacent vertical margins collapse: the larger wins, they do not add up.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which layer does an element’s background color paint?',
              options: [
                { id: 'a', text: 'Content only', correct: false },
                { id: 'b', text: 'Content + padding (up to the border)', correct: true },
                { id: 'c', text: 'Everything including margin', correct: false },
                { id: 'd', text: 'Border only', correct: false },
              ],
              explanation:
                'Padding shares the background; margin is always transparent space between boxes.',
            },
          ],
        },
        {
          id: 'display-flow',
          title: 'Normal flow: block & inline',
          minutes: 10,
          blurb: 'How the page lays itself out before you write any layout CSS.',
          concept: [
            {
              heading: 'The default layout: flow',
              body: 'With zero CSS, the browser uses **normal flow**: **block** elements (`div`, `p`, `h1`, `section`) stack vertically, each taking the full available width; **inline** elements (`span`, `a`, `strong`) sit within lines of text, wrapping like words. Flow is not the absence of layout — it is an excellent layout you should disturb as little as possible.',
            },
            {
              heading: 'The display property',
              body: '`display` switches an element’s behavior: `block`, `inline`, and the hybrid `inline-block` (flows in a line BUT accepts width/height/vertical margins — inline elements ignore those!). `display: none` removes the element entirely (vs `visibility: hidden` which hides but keeps the space). And `display: flex`/`grid` turn an element into a **container** that lays out its children with new rules — the subjects of Levels 2 and 3.',
            },
            {
              heading: 'Reading layout intent',
              body: 'When reading CSS, `display` on a parent tells you which **layout system governs the children**: nothing/block → flow, flex → one axis, grid → two axes. That single property is the first thing to check when a layout confuses you — it decides which set of rules even applies.',
            },
          ],
          codeSamples: [
            {
              title: 'Flow behaviors side by side',
              filename: 'flow.css',
              language: 'css',
              code: "/* block: stacks, fills width, accepts all box properties */\ndiv.note {\n  width: 50%;\n  margin: 16px 0;\n}\n\n/* inline: lives inside text lines — width/height IGNORED */\nspan.badge {\n  padding: 2px 8px;       /* horizontal padding works */\n  /* width: 100px;          would do nothing! */\n}\n\n/* inline-block: in the line, but sizable */\na.button {\n  display: inline-block;\n  width: 120px;\n  padding: 8px 0;\n  text-align: center;\n}",
              annotations: [
                { line: 8, note: 'Inline elements ignore width/height and vertical margins.' },
                { line: 14, note: 'inline-block: flows like a word, sizes like a block — classic for buttons.' },
              ],
              explanation:
                '"Why is my width ignored?!" — the element is inline. The most common beginner layout mystery, solved.',
            },
          ],
          keyPoints: [
            'Normal flow: blocks stack vertically full-width; inlines flow within text lines.',
            'Inline elements ignore width/height/vertical-margins; `inline-block` accepts them.',
            '`display: none` removes; `visibility: hidden` hides but keeps space.',
            'The parent’s `display` decides which layout rules govern the children.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'You set width: 200px on a <span> and nothing happens. Why?',
              options: [
                { id: 'a', text: 'A CSS bug', correct: false },
                { id: 'b', text: 'Inline elements ignore width — use inline-block or block', correct: true },
                { id: 'c', text: 'Spans cannot be styled', correct: false },
                { id: 'd', text: 'Missing !important', correct: false },
              ],
              explanation:
                'Inline boxes size themselves to their content; switching display unlocks sizing.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'display: none vs visibility: hidden?',
              options: [
                { id: 'a', text: 'Identical', correct: false },
                { id: 'b', text: 'none removes the element from layout; hidden keeps its empty space', correct: true },
                { id: 'c', text: 'hidden removes it; none keeps space', correct: false },
                { id: 'd', text: 'Both keep the space', correct: false },
              ],
              explanation:
                'none = as if it does not exist; hidden = invisible but still occupying its box.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does setting display: flex on a parent change?',
              options: [
                { id: 'a', text: 'The parent’s color', correct: false },
                { id: 'b', text: 'The layout system governing its CHILDREN', correct: true },
                { id: 'c', text: 'Only the parent’s size', correct: false },
                { id: 'd', text: 'Nothing visible', correct: false },
              ],
              explanation:
                'flex/grid are container systems: the parent declares them, the children obey new placement rules.',
            },
          ],
        },
        {
          id: 'units-sizing',
          title: 'Units & sizing',
          minutes: 11,
          blurb: 'px, rem, %, vw — and min/max constraints that do the work.',
          concept: [
            {
              heading: 'The units that matter',
              body: '**px** — fixed; fine for borders, small gaps. **rem** — multiples of the root font size (usually 16px); THE unit for font sizes and spacing, because it scales when users change their browser font preference. **em** — relative to the element’s own font size (compounds; use sparingly). **%** — relative to the parent. **vw/vh** — percent of the viewport.',
            },
            {
              heading: 'Constraints beat exact sizes',
              body: 'Professional CSS rarely fixes sizes — it sets **boundaries** and lets content flow: `max-width: 65ch` (readable line length), `min-height: 100vh` (at least a full screen), `width: min(90%, 1100px)` (your app-container pattern). The browser then adapts to any screen. Rule of thumb: prefer `max-/min-` over exact `width/height`.',
            },
            {
              heading: 'Intrinsic sizing keywords',
              body: 'Beyond numbers, sizes can come from **content**: `min-content` (narrowest without overflow — longest word), `max-content` (everything on one line), `fit-content` (max-content but capped by available space). You will meet these again inside Grid — they are how modern CSS lets content decide layout.',
            },
          ],
          codeSamples: [
            {
              title: 'A sizing system in practice',
              filename: 'layout.css',
              language: 'css',
              code: "html { font-size: 16px; }          /* 1rem = 16px */\n\n.prose {\n  font-size: 1.125rem;             /* 18px, scales with user prefs */\n  max-width: 65ch;                 /* readable line length */\n  margin-inline: auto;             /* centered horizontally */\n}\n\n.hero {\n  min-height: 100vh;               /* at least one full screen */\n}\n\n.container {\n  width: min(92%, 1100px);         /* fluid, but never too wide */\n  margin-inline: auto;\n}",
              annotations: [
                { line: 4, note: 'rem for type: respects users who enlarge their default font.' },
                { line: 5, note: 'ch unit = width of the 0 character — perfect for line length.' },
                { line: 14, note: 'min(): two constraints in one line — the modern container.' },
              ],
              explanation:
                'Notice: not one fixed width for content. Boundaries + auto margins = layouts that fit every screen for free.',
            },
          ],
          keyPoints: [
            '`rem` for type & spacing (accessible scaling); `px` for hairlines; `%`/`vw` for fluidity.',
            'Prefer constraints (`max-width`, `min-height`, `min()`) over exact sizes.',
            '`max-width: 65ch` = readable text; `margin-inline: auto` = centered block.',
            'Intrinsic keywords (`min-content`, `max-content`, `fit-content`) size from content.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why prefer rem over px for font sizes?',
              options: [
                { id: 'a', text: 'rem renders sharper', correct: false },
                { id: 'b', text: 'rem scales when users change their browser’s base font size — accessibility', correct: true },
                { id: 'c', text: 'px is deprecated', correct: false },
                { id: 'd', text: 'rem is shorter to type', correct: false },
              ],
              explanation:
                'rem tracks the user’s root font preference; px ignores it and locks users out of scaling.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does width: min(92%, 1100px) do?',
              options: [
                { id: 'a', text: 'Always 1100px', correct: false },
                { id: 'b', text: 'Fluid 92% on small screens, capped at 1100px on large ones', correct: true },
                { id: 'c', text: 'Always 92%', correct: false },
                { id: 'd', text: 'An error', correct: false },
              ],
              explanation:
                'min() picks the smaller value at any moment — fluid until the cap kicks in. The modern container pattern.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'min-content width of a text box equals roughly:',
              options: [
                { id: 'a', text: 'The width of its longest word', correct: true },
                { id: 'b', text: 'Zero', correct: false },
                { id: 'c', text: 'The full sentence on one line', correct: false },
                { id: 'd', text: '50% of the parent', correct: false },
              ],
              explanation:
                'min-content is the narrowest the box can get without overflow — constrained by its longest unbreakable word.',
            },
          ],
        },
        {
          id: 'positioning',
          title: 'Positioning & stacking',
          minutes: 12,
          blurb: 'relative, absolute, fixed, sticky — and the truth about z-index.',
          concept: [
            {
              heading: 'The five position values',
              body: '**static** — default, in flow. **relative** — visually nudged (top/left...) but its flow space is kept; mostly used as an **anchor**. **absolute** — removed from flow, positioned against the nearest **positioned ancestor** (any non-static one). **fixed** — pinned to the viewport (modals, toolbars). **sticky** — hybrid: flows normally until it hits the offset, then pins within its parent (sticky headers — your app toolbar).',
            },
            {
              heading: 'The absolute+relative duo',
              body: 'The pattern in every codebase: parent `position: relative` (the anchor), child `position: absolute; top/right/...` (the pin). Badges on cards, close buttons, dropdowns, tooltips. When an absolute element lands somewhere bizarre — it anchored to a FARTHER ancestor; the fix is `relative` on the intended parent.',
            },
            {
              heading: 'z-index and stacking contexts',
              body: '`z-index` orders overlapping elements — but only **positioned** ones, and only within the same **stacking context**. Some properties (transform, opacity < 1, filter...) create a NEW context: children then compete only among themselves — `z-index: 9999` cannot escape a parent whose context sits below. The famous mystery "why is my 9999 under their 10?" is always a stacking-context boundary.',
            },
          ],
          codeSamples: [
            {
              title: 'The badge pattern + sticky header',
              filename: 'position.css',
              language: 'css',
              code: ".card {\n  position: relative;        /* the anchor */\n}\n.card .badge {\n  position: absolute;        /* out of flow */\n  top: 8px;\n  right: 8px;                /* pinned to the card's corner */\n}\n\n.toolbar {\n  position: sticky;\n  top: 0;                    /* flows, then pins at viewport top */\n  z-index: 10;\n}\n\n.modal-backdrop {\n  position: fixed;\n  inset: 0;                  /* top/right/bottom/left: 0 — full screen */\n}",
              annotations: [
                { line: 2, note: 'relative here exists ONLY to anchor the absolute child.' },
                { line: 7, note: 'Coordinates are relative to the nearest positioned ancestor — the card.' },
                { line: 12, note: 'sticky needs an offset (top: 0) to know when to pin.' },
                { line: 17, note: 'inset: 0 — the four offsets in one property.' },
              ],
              explanation:
                'relative-anchor + absolute-child and sticky-with-top are 90% of real positioning. The rest is z-index archaeology.',
            },
          ],
          keyPoints: [
            '`relative` = nudged but space kept — mostly an anchor; `absolute` = pinned to nearest positioned ancestor.',
            '`fixed` pins to the viewport; `sticky` flows then pins (needs `top`).',
            'Absolute lands wrong? The intended parent lacks `position: relative`.',
            'z-index works inside **stacking contexts**; transform/opacity create new ones — 9999 cannot escape its context.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'An absolute element positions against what?',
              options: [
                { id: 'a', text: 'Always the viewport', correct: false },
                { id: 'b', text: 'The nearest ancestor with a non-static position', correct: true },
                { id: 'c', text: 'Its previous sibling', correct: false },
                { id: 'd', text: 'The body, always', correct: false },
              ],
              explanation:
                'It climbs until it finds a positioned ancestor (often a deliberate relative parent); only then the viewport.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What makes position: sticky actually stick?',
              options: [
                { id: 'a', text: 'Nothing extra needed', correct: false },
                { id: 'b', text: 'An offset like top: 0 — it pins when scrolled to that line', correct: true },
                { id: 'c', text: 'z-index: 9999', correct: false },
                { id: 'd', text: 'JavaScript', correct: false },
              ],
              explanation:
                'sticky without an offset never pins — top/bottom defines the trigger line. (Overflow on ancestors can also break it.)',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Your z-index: 9999 element renders UNDER a z-index: 10 element. The likely cause:',
              options: [
                { id: 'a', text: 'The browser is broken', correct: false },
                { id: 'b', text: 'Your element is trapped in a stacking context whose root sits lower', correct: true },
                { id: 'c', text: '9999 is too large', correct: false },
                { id: 'd', text: 'Numbers compare as strings', correct: false },
              ],
              explanation:
                'z-index competes within a context; a parent with transform/opacity creates one, capping all its children beneath outsiders.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 2 — FLEXBOX
    // ===================================================================
    {
      id: 'l2-flexbox',
      order: 2,
      title: 'Level 2 — Flexbox',
      goal: 'Lay out along one axis with full control: direction, alignment, and how flex items grow and shrink.',
      lessons: [
        {
          id: 'flex-container',
          title: 'The flex container & its axes',
          minutes: 10,
          blurb: 'display: flex — one line that changes everything.',
          concept: [
            {
              heading: 'One axis at a time',
              body: '`display: flex` on a parent lays its children along the **main axis** (horizontal by default — items sit in a row). The perpendicular direction is the **cross axis**. Every flex property aligns to one of these two axes — naming them precisely is what makes Flexbox logical instead of trial-and-error.',
            },
            {
              heading: 'direction and wrap',
              body: '`flex-direction: row | column` chooses the main axis (column = vertical stacking with flex powers). `flex-wrap: wrap` allows items to break onto new lines instead of squeezing — without it, flex children shrink and overflow rather than wrap. `gap: 16px` spaces items cleanly (the modern replacement for margin hacks).',
            },
            {
              heading: 'What children gain',
              body: 'Becoming flex items changes children: they line up on the main axis, stretch to equal height by default (cross-axis stretch — the classic equal-height cards for free), their margins stop collapsing, and `float`/`vertical-align` stop applying. Flex governs **direct children only** — grandchildren need their own container.',
            },
          ],
          codeSamples: [
            {
              title: 'A wrapping card row',
              filename: 'cards.css',
              language: 'css',
              code: ".cards {\n  display: flex;\n  flex-direction: row;     /* main axis: horizontal (default) */\n  flex-wrap: wrap;         /* new lines instead of overflow */\n  gap: 20px;               /* clean spacing, no margin hacks */\n}\n\n.sidebar-layout {\n  display: flex;\n  flex-direction: column;  /* main axis: vertical */\n  gap: 12px;\n  min-height: 100vh;\n}",
              annotations: [
                { line: 2, note: 'One declaration: children now obey flex rules.' },
                { line: 4, note: 'Without wrap, items shrink then overflow — wrap lets them breathe.' },
                { line: 5, note: 'gap works in flex (and grid) — the spacing tool of modern CSS.' },
              ],
              explanation:
                'Your skills hub grid of cards is this exact pattern (with grid). Direction + wrap + gap covers most containers.',
            },
          ],
          keyPoints: [
            '`display: flex` arranges **direct children** along the main axis.',
            '`flex-direction` picks the main axis; cross axis is perpendicular.',
            '`flex-wrap: wrap` allows new lines; default is squeeze-then-overflow.',
            '`gap` is the modern spacing between items.',
            'Default cross-axis stretch = equal-height children for free.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'With flex-direction: column, the main axis is:',
              options: [
                { id: 'a', text: 'Horizontal', correct: false },
                { id: 'b', text: 'Vertical — items stack top to bottom', correct: true },
                { id: 'c', text: 'Diagonal', correct: false },
                { id: 'd', text: 'There is no main axis', correct: false },
              ],
              explanation:
                'direction sets the main axis; column makes it vertical and the cross axis horizontal.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Six wide items in a flex container WITHOUT flex-wrap. What happens?',
              options: [
                { id: 'a', text: 'They wrap automatically', correct: false },
                { id: 'b', text: 'They shrink to fit, then overflow if they cannot', correct: true },
                { id: 'c', text: 'The container grows vertically', correct: false },
                { id: 'd', text: 'An error occurs', correct: false },
              ],
              explanation:
                'No-wrap is the default: items compress on the single line and eventually overflow — wrap opts into new lines.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Does display: flex affect grandchildren?',
              options: [
                { id: 'a', text: 'Yes, all descendants', correct: false },
                { id: 'b', text: 'No — only direct children become flex items', correct: true },
                { id: 'c', text: 'Only with !important', correct: false },
                { id: 'd', text: 'Only in row direction', correct: false },
              ],
              explanation:
                'Flex (and grid) govern one level: each container manages its direct children only.',
            },
          ],
        },
        {
          id: 'flex-alignment',
          title: 'Alignment: justify & align',
          minutes: 11,
          blurb: 'justify-content, align-items — and centering, solved forever.',
          concept: [
            {
              heading: 'Two properties, two axes',
              body: 'The naming rule that unlocks Flexbox: **justify-content** distributes items along the **main** axis (start, center, end, space-between, space-around, space-evenly); **align-items** positions them on the **cross** axis (stretch — the default, center, start, end, baseline). Direction changes? The properties follow their axes, not the screen.',
            },
            {
              heading: 'Centering, solved',
              body: 'The historical "how do I center vertically?!" agony is three lines now: `display: flex; justify-content: center; align-items: center;`. Memorize it as one unit — it centers anything in anything. (Grid’s `place-items: center` is the same trick.)',
            },
            {
              heading: 'Per-item overrides and auto margins',
              body: '`align-self` lets ONE item deviate from the group’s cross alignment. And a secret weapon: **auto margins eat free space** — `margin-left: auto` on one item pushes it (and everything after) to the far end. The classic navbar "logo left, actions right" is exactly `margin-left: auto` on the actions group (or `margin-inline-start` in RTL-aware code).',
            },
          ],
          codeSamples: [
            {
              title: 'The navbar, the center, the outlier',
              filename: 'alignment.css',
              language: 'css',
              code: "/* logo left, links right — auto margin eats the space */\n.navbar {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.navbar .actions {\n  margin-left: auto;\n}\n\n/* perfect centering — memorize as one unit */\n.modal-overlay {\n  display: flex;\n  justify-content: center;   /* main axis */\n  align-items: center;       /* cross axis */\n}\n\n/* one item deviates from the group */\n.toolbar .save-button {\n  align-self: flex-end;\n}",
              annotations: [
                { line: 8, note: 'Auto margins absorb free space — pushes this item to the far edge.' },
                { line: 14, note: 'Both axes centered = element floats in the middle, any size.' },
                { line: 19, note: 'align-self: a personal exception to align-items.' },
              ],
              explanation:
                'These three patterns — auto-margin split, perfect center, self override — appear in every app’s header, modal, and toolbar.',
            },
          ],
          keyPoints: [
            '`justify-content` = main axis; `align-items` = cross axis. The axes, not the screen.',
            'Perfect centering: flex + justify-content center + align-items center.',
            '`space-between` pushes ends apart; `space-evenly` equalizes all gaps.',
            '`align-self` overrides per item; `margin-*: auto` eats free space (navbar split).',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'In flex-direction: column, justify-content: center centers items:',
              options: [
                { id: 'a', text: 'Horizontally', correct: false },
                { id: 'b', text: 'Vertically — justify follows the main axis, now vertical', correct: true },
                { id: 'c', text: 'Both directions', correct: false },
                { id: 'd', text: 'It stops working', correct: false },
              ],
              explanation:
                'The properties bind to axes: in column, main = vertical, so justify-content distributes vertically.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does margin-left: auto on a flex item do?',
              options: [
                { id: 'a', text: 'Removes its margin', correct: false },
                { id: 'b', text: 'Absorbs all free space on its left — pushes it to the right end', correct: true },
                { id: 'c', text: 'Centers it', correct: false },
                { id: 'd', text: 'Hides it', correct: false },
              ],
              explanation:
                'Auto margins in flex eat available space — the classic navbar logo/actions separator.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which trio perfectly centers a child both ways?',
              options: [
                { id: 'a', text: 'text-align + vertical-align + float', correct: false },
                { id: 'b', text: 'display:flex + justify-content:center + align-items:center', correct: true },
                { id: 'c', text: 'margin: center', correct: false },
                { id: 'd', text: 'position: center', correct: false },
              ],
              explanation:
                'The modern centering unit — works for any content, any size, both axes.',
            },
          ],
        },
        {
          id: 'flex-sizing',
          title: 'grow, shrink & basis',
          minutes: 12,
          blurb: 'How flex items share space — the algorithm behind the magic.',
          concept: [
            {
              heading: 'The three sizing knobs',
              body: 'Each item has: **flex-basis** (its starting size before sharing — auto means content/width), **flex-grow** (its share of LEFTOVER space — 0 by default: items do not grow), and **flex-shrink** (its share of the DEFICIT when space is short — 1 by default: items do shrink). The algorithm: start at basis, then distribute surplus by grow ratios or deficit by shrink ratios.',
            },
            {
              heading: 'The shorthand vocabulary',
              body: 'Read these instantly: `flex: 1` = `1 1 0` — grow from zero: items share ALL space equally (the equal-columns idiom). `flex: auto` = `1 1 auto` — grow from content size: bigger content ends bigger. `flex: none` = `0 0 auto` — rigid, content-sized. A fixed sidebar is `flex: 0 0 250px` — never grows, never shrinks, 250px.',
            },
            {
              heading: 'Why flex: 1 equalizes',
              body: 'The subtlety worth understanding once: with basis 0, ALL container space is "leftover", so grow: 1 each divides everything equally — content size becomes irrelevant. With basis auto, only the space BEYOND content is shared, so columns end unequal. That basis difference (0 vs auto) explains 90% of "why are my columns uneven?".',
            },
          ],
          codeSamples: [
            {
              title: 'The holy-grail layout in four lines',
              filename: 'shell.css',
              language: 'css',
              code: ".shell {\n  display: flex;\n  min-height: 100vh;\n}\n\n.sidebar {\n  flex: 0 0 250px;     /* rigid: never grow, never shrink, 250px */\n}\n\n.content {\n  flex: 1;             /* take ALL remaining space */\n  min-width: 0;        /* allow shrinking below content size */\n}\n\n/* equal thirds, regardless of content */\n.stats > div {\n  flex: 1;\n}",
              annotations: [
                { line: 7, note: 'The fixed-sidebar idiom: grow 0, shrink 0, basis 250px.' },
                { line: 11, note: 'flex: 1 — the flexible region absorbs everything left.' },
                { line: 12, note: 'min-width: 0 — flex items refuse to shrink below content without it (overflow fix!).' },
              ],
              explanation:
                'Fixed sidebar + fluid content: the most-built layout on the web, expressed in two flex declarations.',
            },
          ],
          keyPoints: [
            'basis = starting size; grow = share of surplus (default 0); shrink = share of deficit (default 1).',
            '`flex: 1` = equal columns (basis 0); `flex: auto` = grow from content; `flex: none` = rigid.',
            'Fixed sidebar: `flex: 0 0 250px`; fluid main: `flex: 1`.',
            '`min-width: 0` on a flex item fixes the "won’t shrink / overflows" mystery.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why does flex: 1 on all items make them EQUAL regardless of content?',
              options: [
                { id: 'a', text: 'It sets width: 33%', correct: false },
                { id: 'b', text: 'basis becomes 0, so ALL space is distributed purely by grow ratio', correct: true },
                { id: 'c', text: 'It centers them', correct: false },
                { id: 'd', text: 'Luck', correct: false },
              ],
              explanation:
                'flex:1 = 1 1 0. From a zero base, equal grow factors split everything equally — content size never enters.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which declaration creates a 250px sidebar that never changes size?',
              options: [
                { id: 'a', text: 'flex: 1 1 250px', correct: false },
                { id: 'b', text: 'flex: 0 0 250px', correct: true },
                { id: 'c', text: 'flex: 250px', correct: false },
                { id: 'd', text: 'width: 250px alone is always enough', correct: false },
              ],
              explanation:
                'grow 0 (never expands) + shrink 0 (never compresses) + basis 250px = truly rigid.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'A flex item with long text refuses to shrink and overflows. The classic fix:',
              options: [
                { id: 'a', text: 'min-width: 0 on the item', correct: true },
                { id: 'b', text: 'z-index: 9999', correct: false },
                { id: 'c', text: 'position: absolute', correct: false },
                { id: 'd', text: 'More flex-grow', correct: false },
              ],
              explanation:
                'Flex items default to min-width:auto (content size floor). min-width:0 releases the floor so shrink can work.',
            },
          ],
        },
        {
          id: 'flex-patterns',
          title: 'Flexbox patterns you will reuse forever',
          minutes: 10,
          blurb: 'Navbar, media object, sticky footer, tag rows — the greatest hits.',
          concept: [
            {
              heading: 'The media object',
              body: 'Avatar/icon beside flexible text — comments, chat messages, notification rows: container `display: flex; gap`, the image `flex: none` (rigid), the text block `flex: 1; min-width: 0` (fluid, truncatable). This 60-year-old design pattern is four lines of flex.',
            },
            {
              heading: 'The sticky footer',
              body: 'Footer at the bottom even when content is short: `body { display: flex; flex-direction: column; min-height: 100vh }` and `main { flex: 1 }` — main absorbs the free space, pushing the footer down. (Your SkillForge shell does this.) The same column+flex:1 idea makes equal-height card bodies with bottom-pinned action rows.',
            },
            {
              heading: 'Rows that wrap gracefully',
              body: 'Tag/chip lists: `flex-wrap: wrap; gap` — items flow like words, wrap naturally, stay evenly spaced. Form rows that collapse on mobile: `flex-wrap: wrap` with `flex: 1 1 200px` per field — each field wants 200px, grows when roomy, wraps when tight: a media-query-free responsive form.',
            },
          ],
          codeSamples: [
            {
              title: 'Three patterns, production-ready',
              filename: 'patterns.css',
              language: 'css',
              code: "/* 1. media object: avatar + flexible text */\n.comment { display: flex; gap: 12px; }\n.comment img { flex: none; width: 40px; height: 40px; }\n.comment .body { flex: 1; min-width: 0; }\n\n/* 2. sticky footer */\nbody { display: flex; flex-direction: column; min-height: 100vh; }\nmain { flex: 1; }\n\n/* 3. responsive form row — no media queries */\n.form-row { display: flex; flex-wrap: wrap; gap: 12px; }\n.form-row .field { flex: 1 1 200px; }",
              annotations: [
                { line: 4, note: 'flex:1 + min-width:0 — the fluid, safely-truncating text column.' },
                { line: 8, note: 'main absorbs free space; footer rests at the bottom always.' },
                { line: 12, note: 'Want 200px; grow if roomy; wrap if tight — responsive without queries.' },
              ],
              explanation:
                'Recognize these shapes and half of every real stylesheet becomes familiar territory.',
            },
          ],
          keyPoints: [
            'Media object: rigid image (`flex: none`) + fluid text (`flex: 1; min-width: 0`).',
            'Sticky footer: column container `min-height: 100vh`, `main { flex: 1 }`.',
            'Wrap + `flex: 1 1 <ideal>` = responsive rows without media queries.',
            'These few shapes cover most one-axis layouts you will ever read.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'In the media object, why flex: none on the avatar?',
              options: [
                { id: 'a', text: 'To hide it on mobile', correct: false },
                { id: 'b', text: 'So it stays rigid while the text column does all the flexing', correct: true },
                { id: 'c', text: 'To center it', correct: false },
                { id: 'd', text: 'For z-index', correct: false },
              ],
              explanation:
                'The image keeps its natural size; flex: 1 on the text makes it the only flexible part.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'In the sticky-footer pattern, what pushes the footer down?',
              options: [
                { id: 'a', text: 'position: fixed on the footer', correct: false },
                { id: 'b', text: 'flex: 1 on main — it absorbs the free vertical space', correct: true },
                { id: 'c', text: 'A tall margin', correct: false },
                { id: 'd', text: 'JavaScript', correct: false },
              ],
              explanation:
                'The column container spans the viewport; main grows into the surplus, leaving the footer at the bottom.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does flex: 1 1 200px on wrapping form fields achieve?',
              options: [
                { id: 'a', text: 'Fixed 200px always', correct: false },
                { id: 'b', text: 'Fields aim for 200px, grow when there is room, wrap to new lines when there is not', correct: true },
                { id: 'c', text: 'Hides extra fields', correct: false },
                { id: 'd', text: 'Equal heights', correct: false },
              ],
              explanation:
                'basis 200px sets the ideal; grow fills spare room; wrap handles tight rows — responsive with zero media queries.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 3 — GRID
    // ===================================================================
    {
      id: 'l3-grid',
      order: 3,
      title: 'Level 3 — Grid',
      goal: 'Design in two dimensions: define tracks, place items, and build responsive grids that need no media queries.',
      lessons: [
        {
          id: 'grid-basics',
          title: 'Grid: tracks & the fr unit',
          minutes: 11,
          blurb: 'Rows AND columns at once — the two-dimensional system.',
          concept: [
            {
              heading: 'Two dimensions, declared on the parent',
              body: '`display: grid` + `grid-template-columns: 250px 1fr` defines column **tracks**; rows form automatically as content flows in (or explicitly via `grid-template-rows`). Unlike flex (children negotiate one axis), grid lets the **parent declare the whole structure** — children fall into cells. Flex distributes; grid architects.',
            },
            {
              heading: 'The fr unit',
              body: '`fr` = a fraction of the **free space** after fixed tracks are paid: `250px 1fr 1fr` → sidebar takes 250px, the rest splits equally. `repeat(3, 1fr)` = three equal columns. `gap` (one value or `row-gap`/`column-gap`) spaces the tracks — no margin juggling, ever.',
            },
            {
              heading: 'minmax and content-aware tracks',
              body: 'Tracks can be ranges: `minmax(150px, 1fr)` — never below 150px, grows fairly. And content-aware: `auto` (fit content), `min-content`, `max-content`. The combination `minmax(0, 1fr)` fixes grid’s version of the overflow mystery (a track refusing to shrink below its content).',
            },
          ],
          codeSamples: [
            {
              title: 'An app shell as a grid',
              filename: 'shell.css',
              language: 'css',
              code: ".shell {\n  display: grid;\n  grid-template-columns: 250px 1fr;          /* sidebar | content */\n  grid-template-rows: 64px 1fr 48px;         /* header / main / footer */\n  gap: 0 16px;\n  min-height: 100vh;\n}\n\n.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);     /* three equal columns */\n  gap: 20px;\n}",
              annotations: [
                { line: 3, note: 'Two column tracks: fixed sidebar, fluid content.' },
                { line: 4, note: 'Three row tracks: the page skeleton in one line.' },
                { line: 11, note: 'repeat(n, track) — the multi-column shorthand.' },
              ],
              explanation:
                'The whole page skeleton lives in TWO lines on the parent — children just flow into the cells.',
            },
          ],
          keyPoints: [
            'Grid = two-dimensional; the parent declares tracks, children fill cells.',
            '`fr` shares free space after fixed tracks; `repeat(3, 1fr)` = equal columns.',
            '`minmax(min, max)` bounds a track; `minmax(0, 1fr)` fixes shrink-refusal overflow.',
            'Flex distributes children along an axis; grid architects the space itself.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'grid-template-columns: 200px 1fr 1fr — the container is 800px (no gap). The fr columns get:',
              options: [
                { id: 'a', text: '266px each', correct: false },
                { id: 'b', text: '300px each — (800-200) split equally', correct: true },
                { id: 'c', text: '400px each', correct: false },
                { id: 'd', text: '200px each', correct: false },
              ],
              explanation:
                'fr divides what remains after fixed tracks: 600px of free space, two equal shares.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'The key structural difference between grid and flex?',
              options: [
                { id: 'a', text: 'Grid is newer, otherwise identical', correct: false },
                { id: 'b', text: 'Grid controls rows AND columns from the parent; flex flows along one axis', correct: true },
                { id: 'c', text: 'Flex is faster', correct: false },
                { id: 'd', text: 'Grid only works for galleries', correct: false },
              ],
              explanation:
                'Two-dimensional parent-declared structure vs one-dimensional child negotiation.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does minmax(150px, 1fr) mean for a track?',
              options: [
                { id: 'a', text: 'Exactly 150px', correct: false },
                { id: 'b', text: 'At least 150px, growing to a fair share of free space', correct: true },
                { id: 'c', text: 'At most 150px', correct: false },
                { id: 'd', text: '150 fractions', correct: false },
              ],
              explanation:
                'A bounded track: floor of 150px, ceiling of one fraction — the building block of responsive grids.',
            },
          ],
        },
        {
          id: 'grid-placement',
          title: 'Placing items: lines, spans & areas',
          minutes: 11,
          blurb: 'Put anything exactly where you want — by number or by name.',
          concept: [
            {
              heading: 'Grid lines and spans',
              body: 'A 3-column grid has **4 numbered lines** (1 through 4 — lines, not columns!). Place by line: `grid-column: 1 / 3` (from line 1 to line 3 = spans two columns), or by count: `grid-column: span 2`. `-1` means the last line: `grid-column: 1 / -1` = full width, whatever the column count. Same syntax for `grid-row`.',
            },
            {
              heading: 'Named areas — the readable way',
              body: '`grid-template-areas` draws the layout as ASCII art: each quoted string is a row, each word a cell; children declare `grid-area: header`. The CSS **looks like** the page. Repeating a name spans cells; a dot `.` leaves a cell empty. For page-level layout this is the most maintainable tool in CSS.',
            },
            {
              heading: 'Auto-placement and overlap',
              body: 'Unplaced items auto-flow into empty cells (`grid-auto-flow: dense` backfills gaps — masonry-ish galleries). And cells can **overlap**: two items in the same cells stack (control order with z-index) — hero text over an image without absolute positioning. Explicit placement, auto-flow, and overlap mix freely in one grid.',
            },
          ],
          codeSamples: [
            {
              title: 'A page drawn in ASCII',
              filename: 'page.css',
              language: 'css',
              code: ".page {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: auto 1fr auto;\n  grid-template-areas:\n    \"header header\"\n    \"nav    main\"\n    \"footer footer\";\n  min-height: 100vh;\n}\n\n.page > header { grid-area: header; }\n.page > nav    { grid-area: nav; }\n.page > main   { grid-area: main; }\n.page > footer { grid-area: footer; }\n\n/* a featured card spanning 2x2 in a gallery */\n.card.featured {\n  grid-column: span 2;\n  grid-row: span 2;\n}",
              annotations: [
                { line: 6, note: 'Repeating "header" makes it span both columns.' },
                { line: 7, note: 'The layout IS visible in the code — read it like a wireframe.' },
                { line: 19, note: 'span 2 — take two tracks from wherever auto-placement put it.' },
              ],
              explanation:
                'Redesigning the page = redrawing the ASCII. No child CSS changes — that is the maintainability win.',
            },
          ],
          keyPoints: [
            'Place by lines: `grid-column: 1 / 3`; `-1` = the last line (`1 / -1` = full width).',
            '`span n` takes n tracks from the auto position.',
            '`grid-template-areas` draws layout as readable ASCII; children use `grid-area`.',
            'Items can overlap in shared cells — layered designs without absolute positioning.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'In a 4-column grid, grid-column: 2 / 4 spans how many columns?',
              options: [
                { id: 'a', text: 'Three', correct: false },
                { id: 'b', text: 'Two — from line 2 to line 4 crosses columns 2 and 3', correct: true },
                { id: 'c', text: 'Four', correct: false },
                { id: 'd', text: 'One', correct: false },
              ],
              explanation:
                'Those are LINE numbers: lines 2→4 enclose two column tracks.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'The reliable way to span the FULL width regardless of column count:',
              options: [
                { id: 'a', text: 'grid-column: 1 / 99', correct: false },
                { id: 'b', text: 'grid-column: 1 / -1', correct: true },
                { id: 'c', text: 'width: 100%', correct: false },
                { id: 'd', text: 'span all', correct: false },
              ],
              explanation:
                'Negative indices count from the end: -1 is always the last line.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'The biggest advantage of grid-template-areas?',
              options: [
                { id: 'a', text: 'Performance', correct: false },
                { id: 'b', text: 'The layout is readable as a picture, and redesigns touch only the parent', correct: true },
                { id: 'c', text: 'Smaller file size', correct: false },
                { id: 'd', text: 'Browser support', correct: false },
              ],
              explanation:
                'ASCII areas are self-documenting and centralize structure — children never need touching.',
            },
          ],
        },
        {
          id: 'grid-responsive',
          title: 'auto-fit + minmax: responsive without queries',
          minutes: 10,
          blurb: 'The one-line grid that adapts to every screen by itself.',
          concept: [
            {
              heading: 'THE line',
              body: '`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` — the most famous line in modern CSS. The browser fits as many ≥280px columns as the width allows, distributing leftovers fairly: 4 columns on desktop, 2 on tablet, 1 on phone — **zero media queries**. Your SkillForge hub uses exactly this (with auto-fill).',
            },
            {
              heading: 'auto-fit vs auto-fill',
              body: 'They differ only when items are FEW: **auto-fill** keeps empty track slots reserved (3 items on a wide screen stay 3-of-5 width — consistent card sizes), **auto-fit** collapses empty tracks so real items stretch wide. Galleries with guaranteed many items: either. Cards that may be few: choose deliberately.',
            },
            {
              heading: 'Intrinsic design',
              body: 'This is a philosophy shift: instead of dictating "at 768px, 2 columns" (you guessing devices), you declare **content constraints** ("cards need 280px") and layout emerges for ANY width — including a resized side panel or an embedded widget. Media queries remain for bigger reorganizations (Level 4); day-to-day grids should self-adapt.',
            },
          ],
          codeSamples: [
            {
              title: 'Self-adapting grids',
              filename: 'responsive-grid.css',
              language: 'css',
              code: "/* the famous one-liner: as many 280px+ columns as fit */\n.skills-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n}\n\n/* fluid gallery, denser packing */\n.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  grid-auto-rows: 160px;\n  gap: 8px;\n}",
              annotations: [
                { line: 4, note: 'Column count is COMPUTED from available width — never declared.' },
                { line: 11, note: 'auto-fit: with few images, they stretch instead of leaving ghost tracks.' },
                { line: 12, note: 'grid-auto-rows sizes the implicit rows that auto-placement creates.' },
              ],
              explanation:
                'Resize any window with this grid and watch columns appear/disappear smoothly — content constraints, not device guesses.',
            },
          ],
          keyPoints: [
            '`repeat(auto-fit|auto-fill, minmax(min, 1fr))` = responsive columns, no media queries.',
            'auto-fill keeps ghost tracks (consistent sizes); auto-fit stretches few items wide.',
            'Declare content needs ("cards ≥ 280px"), let layout emerge — intrinsic design.',
            '`grid-auto-rows` controls the implicit rows auto-placement creates.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What computes the number of columns in repeat(auto-fit, minmax(280px, 1fr))?',
              options: [
                { id: 'a', text: 'A media query', correct: false },
                { id: 'b', text: 'The browser — as many ≥280px tracks as the current width fits', correct: true },
                { id: 'c', text: 'JavaScript', correct: false },
                { id: 'd', text: 'It is always 3', correct: false },
              ],
              explanation:
                'The constraint (min 280px) is declared; the count emerges from available space at any moment.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Two cards in a WIDE auto-fit grid vs auto-fill grid — the difference?',
              options: [
                { id: 'a', text: 'None ever', correct: false },
                { id: 'b', text: 'auto-fit: they stretch across; auto-fill: they stay narrow beside empty ghost tracks', correct: true },
                { id: 'c', text: 'auto-fill crashes', correct: false },
                { id: 'd', text: 'auto-fit shows scrollbars', correct: false },
              ],
              explanation:
                'fill reserves empty tracks (consistent card width); fit collapses them (items expand). Visible only when items are few.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What is "intrinsic" responsive design?',
              options: [
                { id: 'a', text: 'Designing for iPhones first', correct: false },
                { id: 'b', text: 'Declaring content constraints and letting layout adapt to ANY container width', correct: true },
                { id: 'c', text: 'Using only pixels', correct: false },
                { id: 'd', text: 'Avoiding CSS', correct: false },
              ],
              explanation:
                'Instead of device breakpoints, the content’s own needs (min sizes, wrapping) drive the layout everywhere.',
            },
          ],
        },
        {
          id: 'grid-vs-flex',
          title: 'Grid vs Flexbox — choosing instantly',
          minutes: 9,
          blurb: 'The decision rule, and why real pages use both together.',
          concept: [
            {
              heading: 'The one-question rule',
              body: '**Does the design need rows AND columns to align? Grid. Is it a line of items along one axis? Flex.** Page skeletons, dashboards, galleries, forms with aligned labels → grid. Navbars, button rows, tag lists, media objects, centering → flex. When either would work, prefer the simpler mental model: flex for content-driven lines, grid for structure-driven layouts.',
            },
            {
              heading: 'They compose, not compete',
              body: 'Every real page nests them: a **grid** page skeleton; inside it, a **flex** navbar; cards in a **grid** gallery; each card’s internals a **flex** column (title, body `flex: 1`, actions pinned at bottom). Reading layouts means tracking which system governs each nesting level — one `display` at a time.',
            },
            {
              heading: 'Subgrid — the missing piece, arrived',
              body: 'One historic gap: nested grids could not align to the parent’s tracks (card titles in a row misaligning when content lengths differ). `grid-template-rows: subgrid` lets a child grid **borrow the parent’s tracks** — perfectly aligned card internals across a row. Supported in all modern browsers since 2023; you will see it spread through design systems.',
            },
          ],
          codeSamples: [
            {
              title: 'A real card: grid outside, flex inside, subgrid aligning',
              filename: 'cards.css',
              language: 'css',
              code: "/* structure: a responsive GRID of cards */\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n}\n\n/* content: each card is a FLEX column */\n.card {\n  display: flex;\n  flex-direction: column;\n}\n.card .body { flex: 1; }          /* pushes actions to the bottom */\n.card .actions { display: flex; justify-content: flex-end; gap: 8px; }\n\n/* alignment across cards: SUBGRID rows */\n.cards.aligned .card {\n  display: grid;\n  grid-row: span 3;\n  grid-template-rows: subgrid;    /* title/body/actions align across all cards */\n}",
              annotations: [
                { line: 3, note: 'Grid: the two-dimensional structure of the collection.' },
                { line: 10, note: 'Flex: one-axis content flow inside each card.' },
                { line: 20, note: 'subgrid: the child borrows parent row tracks — cross-card alignment.' },
              ],
              explanation:
                'Grid for the architecture, flex for the furniture, subgrid when furniture must align across rooms.',
            },
          ],
          keyPoints: [
            'Rows AND columns aligned → grid; one line of items → flex.',
            'Real pages nest both — track which `display` governs each level.',
            'Card internals: flex column with `body { flex: 1 }` pins actions down.',
            '`subgrid` lets nested grids align to parent tracks — cross-card alignment solved.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'A navbar with logo, links, and a profile menu. Grid or flex?',
              options: [
                { id: 'a', text: 'Grid — it is structural', correct: false },
                { id: 'b', text: 'Flex — a single line of items along one axis', correct: true },
                { id: 'c', text: 'Neither', correct: false },
                { id: 'd', text: 'Tables', correct: false },
              ],
              explanation:
                'One axis, content-driven sizes, an auto-margin split — the flex sweet spot.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'A dashboard with widgets aligned in rows AND columns. The natural tool?',
              options: [
                { id: 'a', text: 'Nested flexboxes everywhere', correct: false },
                { id: 'b', text: 'Grid — two-dimensional alignment is its purpose', correct: true },
                { id: 'c', text: 'Absolute positioning', correct: false },
                { id: 'd', text: 'Floats', correct: false },
              ],
              explanation:
                'When both axes must align, grid declares it directly; faking it with nested flex fights the tool.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What problem does subgrid solve?',
              options: [
                { id: 'a', text: 'Slow rendering', correct: false },
                { id: 'b', text: 'Nested grids aligning their tracks with the PARENT grid (e.g. equal card sections across a row)', correct: true },
                { id: 'c', text: 'Mobile scrolling', correct: false },
                { id: 'd', text: 'Image compression', correct: false },
              ],
              explanation:
                'A child grid can now borrow parent tracks — internal card rows align across sibling cards.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 4 — RESPONSIVE DESIGN
    // ===================================================================
    {
      id: 'l4-responsive',
      order: 4,
      title: 'Level 4 — Responsive design',
      goal: 'Adapt layouts to every screen: media queries done right, fluid values with clamp, container queries, and media handling.',
      lessons: [
        {
          id: 'media-queries',
          title: 'Media queries, mobile-first',
          minutes: 10,
          blurb: 'Conditional CSS — and why you start from the small screen.',
          concept: [
            {
              heading: 'Conditional blocks',
              body: '`@media (min-width: 768px) { ... }` applies rules only when the viewport is ≥768px. Conditions cover width, orientation, and user preferences — `prefers-color-scheme: dark` and `prefers-reduced-motion` are media queries too. The modern range syntax reads naturally: `@media (width >= 768px)`.',
            },
            {
              heading: 'Mobile-first methodology',
              body: 'Write base styles for the **smallest** screen (usually: everything stacked, full-width — nearly free), then add `min-width` queries that **enhance** upward: 2 columns at 600px, sidebar appears at 900px. The alternative (desktop-first, max-width queries undoing complexity) fights itself. Mobile-first = each query ADDS; desktop-first = each query SUBTRACTS. Adding wins.',
            },
            {
              heading: 'Breakpoints from content, not devices',
              body: 'Forget "iPad = 768px" tables: resize until the layout **breaks** (a line too long, a row too cramped) — THAT is your breakpoint. Most apps need only 2-3. And remember the viewport meta tag in index.html (`width=device-width, initial-scale=1` — SkillForge has it): without it, phones render a zoomed-out desktop and all queries misfire.',
            },
          ],
          codeSamples: [
            {
              title: 'Mobile-first in practice',
              filename: 'responsive.css',
              language: 'css',
              code: "/* BASE = mobile: single column, everything stacked */\n.layout {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n.sidebar { display: none; }\n\n/* enhance: tablet and up */\n@media (width >= 700px) {\n  .layout { grid-template-columns: 1fr 1fr; }\n}\n\n/* enhance: desktop — the sidebar earns its place */\n@media (width >= 1100px) {\n  .layout { grid-template-columns: 250px 1fr 1fr; }\n  .sidebar { display: block; }\n}\n\n/* respect user preferences — also media queries */\n@media (prefers-reduced-motion: reduce) {\n  * { animation: none; transition: none; }\n}",
              annotations: [
                { line: 2, note: 'The base needs no query — smallest screen is the default.' },
                { line: 10, note: 'Modern range syntax: width >= 700px reads like code.' },
                { line: 21, note: 'Accessibility preferences arrive through the same mechanism.' },
              ],
              explanation:
                'Read top to bottom as the screen grows: stack → two columns → sidebar appears. Each query only adds.',
            },
          ],
          keyPoints: [
            'Mobile-first: base = smallest screen; `min-width` queries enhance upward.',
            'Breakpoints where YOUR content breaks — not from device tables; 2-3 usually suffice.',
            'Range syntax: `@media (width >= 768px)`.',
            '`prefers-color-scheme` / `prefers-reduced-motion` — user preferences are queries too.',
            'The viewport meta tag is the prerequisite for any of this to work on phones.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'In mobile-first CSS, what does the un-queried base style target?',
              options: [
                { id: 'a', text: 'Desktop', correct: false },
                { id: 'b', text: 'The smallest screens — queries then enhance for larger ones', correct: true },
                { id: 'c', text: 'Print', correct: false },
                { id: 'd', text: 'No screens', correct: false },
              ],
              explanation:
                'The stacked mobile layout is the cheap default; complexity is added only where space allows it.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Where should breakpoint values come from?',
              options: [
                { id: 'a', text: 'Apple device dimensions', correct: false },
                { id: 'b', text: 'Where your actual content visually breaks when resizing', correct: true },
                { id: 'c', text: 'Always 768 and 1024', correct: false },
                { id: 'd', text: 'Random round numbers', correct: false },
              ],
              explanation:
                'Devices are countless; your content’s breaking points are observable facts. Resize, watch, set.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does @media (prefers-reduced-motion: reduce) detect?',
              options: [
                { id: 'a', text: 'A slow device', correct: false },
                { id: 'b', text: 'The user asked the OS to minimize animations — an accessibility setting', correct: true },
                { id: 'c', text: 'Low battery', correct: false },
                { id: 'd', text: 'Small screens', correct: false },
              ],
              explanation:
                'Vestibular disorders make motion harmful for some users; respecting this query is basic accessibility.',
            },
          ],
        },
        {
          id: 'fluid-modern',
          title: 'clamp() & container queries',
          minutes: 11,
          blurb: 'Values that scale smoothly — and components that adapt to their box.',
          concept: [
            {
              heading: 'clamp(min, preferred, max)',
              body: '`font-size: clamp(1.5rem, 4vw, 2.5rem)` — never below 1.5rem, never above 2.5rem, scaling fluidly with the viewport between. One line replaces three breakpoint jumps with smooth interpolation. **Fluid typography** (and spacing) built on clamp is now the standard for headings and hero sections.',
            },
            {
              heading: 'Container queries — the component revolution',
              body: 'Media queries see the **viewport**; but a card may live in a wide main area OR a narrow sidebar on the SAME screen. `container-type: inline-size` on a wrapper + `@container (width >= 400px) { ... }` lets the component respond to **its own box**. Components become truly self-contained — the thing CSS architects wanted for a decade, supported everywhere since 2023.',
            },
            {
              heading: 'When which',
              body: 'The emerging division: **page-level** reorganization (sidebar appears, nav collapses) → media queries; **component-level** adaptation (card goes horizontal when its slot is wide) → container queries; **value-level** scaling (type, padding) → clamp. Three tools, three scales of decision.',
            },
          ],
          codeSamples: [
            {
              title: 'Fluid values + a self-aware card',
              filename: 'fluid.css',
              language: 'css',
              code: "/* fluid type: no breakpoint jumps */\nh1 {\n  font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem);\n}\n.section {\n  padding-block: clamp(2rem, 6vw, 5rem);\n}\n\n/* container queries: the card adapts to ITS slot */\n.card-slot {\n  container-type: inline-size;\n}\n.card { display: flex; flex-direction: column; }\n\n@container (width >= 420px) {\n  .card { flex-direction: row; }       /* horizontal when ITS box is wide */\n  .card img { width: 40%; }\n}",
              annotations: [
                { line: 3, note: 'min, fluid middle (rem + vw mix), max — smooth between bounds.' },
                { line: 11, note: 'Declares this element as the measuring container for descendants.' },
                { line: 15, note: 'Responds to the slot width — sidebar vs main, same component, right layout.' },
              ],
              explanation:
                'The same card component is vertical in a narrow sidebar and horizontal in wide main content — no page knowledge needed.',
            },
          ],
          keyPoints: [
            '`clamp(min, fluid, max)` = smooth scaling with hard bounds — fluid type/spacing.',
            'Container queries respond to the **component’s box**, not the viewport.',
            'Setup: `container-type: inline-size` on the wrapper, `@container` rules on children.',
            'Division of labor: page → media queries; component → container queries; values → clamp.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'font-size: clamp(1rem, 2.5vw, 2rem) on a very wide screen renders at:',
              options: [
                { id: 'a', text: 'Whatever 2.5vw computes to, unbounded', correct: false },
                { id: 'b', text: '2rem — the max clamps the fluid value', correct: true },
                { id: 'c', text: '1rem', correct: false },
                { id: 'd', text: '2.5rem', correct: false },
              ],
              explanation:
                'The middle value scales until it hits a bound; min and max are hard limits.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'The fundamental difference between container and media queries?',
              options: [
                { id: 'a', text: 'Syntax color', correct: false },
                { id: 'b', text: 'Container queries measure the component’s own wrapper; media queries measure the viewport', correct: true },
                { id: 'c', text: 'Container queries need JavaScript', correct: false },
                { id: 'd', text: 'No difference', correct: false },
              ],
              explanation:
                'A component in a narrow sidebar can adapt independently of screen size — that is the revolution.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What must the wrapper declare for @container rules to work inside it?',
              options: [
                { id: 'a', text: 'position: relative', correct: false },
                { id: 'b', text: 'container-type: inline-size', correct: true },
                { id: 'c', text: 'display: container', correct: false },
                { id: 'd', text: 'Nothing', correct: false },
              ],
              explanation:
                'container-type establishes the measured containment context the query reads from.',
            },
          ],
        },
        {
          id: 'responsive-patterns',
          title: 'Responsive layout patterns',
          minutes: 10,
          blurb: 'Stack-to-row, collapsing sidebars, responsive nav — the standard moves.',
          concept: [
            {
              heading: 'Stack → row',
              body: 'The most common transformation: mobile stacks vertically, desktop flows horizontally. Two idioms: `flex-direction: column` switching to `row` in a query, or the query-free `flex-wrap: wrap` + `flex: 1 1 <ideal>` from Level 2. Forms, card pairs, hero sections — all this one move.',
            },
            {
              heading: 'The collapsing sidebar',
              body: 'Desktop: grid `250px 1fr`. Mobile: the sidebar either drops below (`grid-template-columns: 1fr`, sidebar reordered) or becomes an **off-canvas drawer** (fixed, translated off-screen, slid in via a class toggle — what Material’s sidenav does under the hood). Navigation: horizontal links collapse into a hamburger menu at the content’s breaking point.',
            },
            {
              heading: 'Tables and overflow honesty',
              body: 'Data tables cannot stack meaningfully — the honest pattern is horizontal scroll: wrap in `overflow-x: auto` so the TABLE scrolls, not the page. The same applies to code blocks (your SkillForge code viewer does exactly this). Rule: contain the overflow where it belongs; never let one wide element hijack page scrolling.',
            },
          ],
          codeSamples: [
            {
              title: 'The three standard moves',
              filename: 'patterns.css',
              language: 'css',
              code: "/* 1. stack -> row */\n.hero { display: flex; flex-direction: column; gap: 24px; }\n@media (width >= 800px) {\n  .hero { flex-direction: row; align-items: center; }\n}\n\n/* 2. collapsing sidebar */\n.layout { display: grid; grid-template-columns: 1fr; }\n@media (width >= 1000px) {\n  .layout { grid-template-columns: 250px 1fr; }\n}\n\n/* 3. honest table overflow */\n.table-wrap { overflow-x: auto; }\n.table-wrap table { min-width: 640px; }",
              annotations: [
                { line: 4, note: 'One property flips the axis — content reflows automatically.' },
                { line: 10, note: 'The sidebar column simply appears at the breakpoint.' },
                { line: 14, note: 'The wrapper scrolls; the page stays put. Honest containment.' },
              ],
              explanation:
                'Most "responsive redesigns" in real apps decompose into these three moves applied repeatedly.',
            },
          ],
          keyPoints: [
            'Stack-to-row: flip `flex-direction` at a breakpoint, or wrap+basis without one.',
            'Sidebar: extra grid column appearing at width; or off-canvas drawer on mobile.',
            'Tables/code: `overflow-x: auto` on a wrapper — contained, honest scrolling.',
            'Never let one wide element force the whole page to scroll horizontally.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'The cleanest stack-to-row transformation is:',
              options: [
                { id: 'a', text: 'Two separate HTML versions', correct: false },
                { id: 'b', text: 'flex-direction: column, switched to row in a min-width query', correct: true },
                { id: 'c', text: 'JavaScript resize listeners', correct: false },
                { id: 'd', text: 'position: absolute everywhere', correct: false },
              ],
              explanation:
                'One flipped property; the same markup reflows. The foundational responsive move.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'How should a wide data table behave on a narrow phone?',
              options: [
                { id: 'a', text: 'Shrink the font to 6px', correct: false },
                { id: 'b', text: 'Scroll horizontally inside its own overflow-x: auto wrapper', correct: true },
                { id: 'c', text: 'Make the whole page scroll sideways', correct: false },
                { id: 'd', text: 'Hide most columns silently', correct: false },
              ],
              explanation:
                'Contained scroll preserves data integrity and page behavior — the honest pattern.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'An off-canvas mobile drawer is typically implemented with:',
              options: [
                { id: 'a', text: 'display: none only', correct: false },
                { id: 'b', text: 'position: fixed + transform: translateX(-100%), slid in by a class toggle', correct: true },
                { id: 'c', text: 'A second page', correct: false },
                { id: 'd', text: 'iframes', correct: false },
              ],
              explanation:
                'Off-screen via transform, animated in on toggle — the pattern inside every sidenav component.',
            },
          ],
        },
        {
          id: 'images-media',
          title: 'Responsive images & media',
          minutes: 10,
          blurb: 'object-fit, aspect-ratio, srcset — media that behaves.',
          concept: [
            {
              heading: 'The two-line baseline',
              body: '`img { max-width: 100%; height: auto; }` — images never overflow their container and keep proportions. This belongs in every project’s base styles. Without it, one large image breaks mobile layouts; with it, images are fluid by default.',
            },
            {
              heading: 'object-fit and aspect-ratio',
              body: 'Forcing an image into a fixed box distorts it — unless `object-fit: cover` (fill the box, crop overflow — avatars, card thumbnails) or `contain` (fit entirely, letterbox). And `aspect-ratio: 16 / 9` gives any box a proportional height from its width — video embeds, image placeholders that **reserve space before loading** (killing layout shift, the CLS web vital).',
            },
            {
              heading: 'Right-sized files: srcset',
              body: 'A 4K image on a phone wastes megabytes. `srcset` + `sizes` lists multiple file versions and lets the **browser** pick by actual display size and pixel density; `<picture>` adds format switching (AVIF/WebP with fallback) and art direction. Performance siblings: `loading="lazy"` for below-fold images and explicit width/height attributes (another anti-layout-shift measure).',
            },
          ],
          codeSamples: [
            {
              title: 'Media that behaves',
              filename: 'media.css + index.html',
              language: 'text',
              code: "/* base styles — every project */\nimg { max-width: 100%; height: auto; }\n\n/* thumbnails: uniform boxes, no distortion */\n.card img {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}\n\n<!-- the browser picks the right file -->\n<img\n  src=\"hero-800.jpg\"\n  srcset=\"hero-400.jpg 400w, hero-800.jpg 800w, hero-1600.jpg 1600w\"\n  sizes=\"(width >= 800px) 50vw, 100vw\"\n  width=\"800\" height=\"450\"\n  loading=\"lazy\"\n  alt=\"Course overview\"\n/>",
              annotations: [
                { line: 7, note: 'aspect-ratio reserves proportional space BEFORE the image loads.' },
                { line: 8, note: 'cover: fill and crop — uniform cards from any source image.' },
                { line: 14, note: 'Three sizes offered; the browser computes which to download.' },
                { line: 17, note: 'lazy: below-fold images load only as they approach the screen.' },
              ],
              explanation:
                'Fluid by default, proportional boxes, browser-chosen files, lazy loading — the complete modern image checklist.',
            },
          ],
          keyPoints: [
            'Baseline everywhere: `img { max-width: 100%; height: auto; }`.',
            '`object-fit: cover` fills + crops; `aspect-ratio` reserves proportional space (no layout shift).',
            '`srcset`/`sizes` let the browser download the right file size.',
            '`loading="lazy"` + explicit dimensions = faster pages, stable layout.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Card thumbnails must fill a uniform 16:9 box without distortion. The tools:',
              options: [
                { id: 'a', text: 'width: 100% only', correct: false },
                { id: 'b', text: 'aspect-ratio: 16/9 + object-fit: cover', correct: true },
                { id: 'c', text: 'transform: scale()', correct: false },
                { id: 'd', text: 'Manual cropping of every image', correct: false },
              ],
              explanation:
                'aspect-ratio shapes the box; cover fills it by cropping — any source image, uniform cards.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Who chooses which srcset file to download?',
              options: [
                { id: 'a', text: 'You, with JavaScript', correct: false },
                { id: 'b', text: 'The browser — from display size and pixel density', correct: true },
                { id: 'c', text: 'The server', correct: false },
                { id: 'd', text: 'Random', correct: false },
              ],
              explanation:
                'You offer versions and hints; the browser optimizes the actual choice per device.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'How does aspect-ratio (or width/height attributes) prevent layout shift?',
              options: [
                { id: 'a', text: 'It loads images faster', correct: false },
                { id: 'b', text: 'The box’s space is reserved BEFORE the image arrives — content doesn’t jump', correct: true },
                { id: 'c', text: 'It compresses files', correct: false },
                { id: 'd', text: 'It does not', correct: false },
              ],
              explanation:
                'Known proportions = pre-reserved space = no reflow when the file lands. CLS, solved at the source.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 5 — MODERN CSS & ARCHITECTURE
    // ===================================================================
    {
      id: 'l5-modern',
      order: 5,
      title: 'Level 5 — Modern CSS & architecture',
      goal: 'Use custom properties and modern selectors, organize CSS at scale, debug layouts systematically, and know the ecosystem.',
      lessons: [
        {
          id: 'modern-css',
          title: 'Custom properties, :has & logical properties',
          minutes: 12,
          blurb: 'Variables, the parent selector, and RTL-ready styles.',
          concept: [
            {
              heading: 'Custom properties (CSS variables)',
              body: '`--primary: #1565c0` declared on `:root`, used as `color: var(--primary)`. Unlike preprocessor variables they live at **runtime**: change them in a media query or a `.dark` class and everything using them updates — theming in one place (Angular Material 19 themes are built entirely on them). They cascade and inherit like any property, so components can be themed by their context.',
            },
            {
              heading: ':has() — the parent selector',
              body: 'The historic impossibility, now real: `.card:has(img)` styles cards that **contain** an image; `label:has(input:checked)` styles the label of a checked input; `form:has(.error)` reddens a form with any error. Styling a parent by its children unlocks patterns that previously demanded JavaScript classes.',
            },
            {
              heading: 'Logical properties — RTL for free',
              body: 'Physical properties (`margin-left`, `padding-right`) break in right-to-left languages like Arabic. Logical ones follow **text direction**: `margin-inline-start` (left in English, right in Arabic), `padding-block` (vertical), `inset-inline-end`. Your app has `dir="rtl"` Arabic sections — logical properties are how one stylesheet serves both directions correctly.',
            },
          ],
          codeSamples: [
            {
              title: 'Theming + :has + RTL-ready spacing',
              filename: 'modern.css',
              language: 'css',
              code: ":root {\n  --primary: #1565c0;\n  --surface: #ffffff;\n  --space: 16px;\n}\n.dark {\n  --primary: #90caf9;\n  --surface: #1e293b;       /* same components, new palette */\n}\n\n.card {\n  background: var(--surface);\n  padding: var(--space);\n  /* RTL-aware: start = left in English, right in Arabic */\n  border-inline-start: 4px solid var(--primary);\n  margin-inline-start: var(--space);\n}\n\n/* parent styled by its contents */\n.card:has(img) { padding: 0; }\nform:has(.error) { border-color: red; }",
              annotations: [
                { line: 6, note: 'Theme switch = swapping variable values; no component CSS changes.' },
                { line: 15, note: 'inline-start flips automatically under dir=rtl — Arabic-ready.' },
                { line: 20, note: ':has — the card knows what it contains; no JS classes.' },
              ],
              explanation:
                'Variables centralize decisions, :has removes JS glue, logical properties make your Arabic sections first-class.',
            },
          ],
          keyPoints: [
            'Custom properties are runtime values: theme/dark-mode by swapping them in one place.',
            '`:has()` styles parents by their children — form states, conditional cards, no JS.',
            'Logical properties (`margin-inline-start`...) follow text direction — RTL for free.',
            'Modern Angular Material theming is custom properties all the way down.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'How do CSS custom properties differ from SCSS variables?',
              options: [
                { id: 'a', text: 'Only syntax', correct: false },
                { id: 'b', text: 'They live at runtime — changeable by class/media query, with everything updating', correct: true },
                { id: 'c', text: 'They are slower, otherwise same', correct: false },
                { id: 'd', text: 'SCSS variables are newer', correct: false },
              ],
              explanation:
                'SCSS variables vanish at compile time; custom properties cascade live in the browser — hence runtime theming.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which selector styles a form that CONTAINS a .error element?',
              options: [
                { id: 'a', text: 'form .error', correct: false },
                { id: 'b', text: 'form:has(.error)', correct: true },
                { id: 'c', text: '.error > form', correct: false },
                { id: 'd', text: 'Impossible in CSS', correct: false },
              ],
              explanation:
                ':has() selects the parent by what it contains — the long-awaited parent selector.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why margin-inline-start instead of margin-left in your app?',
              options: [
                { id: 'a', text: 'Shorter to type', correct: false },
                { id: 'b', text: 'It flips automatically for RTL (Arabic) text direction', correct: true },
                { id: 'c', text: 'Better performance', correct: false },
                { id: 'd', text: 'margin-left is deprecated', correct: false },
              ],
              explanation:
                'Logical properties follow dir; your Arabic summary sections render correctly without duplicate rules.',
            },
          ],
        },
        {
          id: 'css-architecture',
          title: 'CSS architecture at scale',
          minutes: 11,
          blurb: 'Specificity, BEM, utilities, and Angular’s scoped styles.',
          concept: [
            {
              heading: 'Specificity — the conflict resolver',
              body: 'When rules collide, **specificity** wins: inline > id > class/attribute/pseudo-class > element. `.card .title` (two classes) beats `.title`. Specificity wars (`!important` versus more `!important`) are the death spiral of unmanaged CSS — every architecture below exists to keep specificity **flat and predictable**. The modern escape hatch `:where()` contributes zero specificity.',
            },
            {
              heading: 'Naming systems and utilities',
              body: '**BEM** (`card__title--featured`: block, element, modifier) keeps selectors flat single classes and prevents collisions in large codebases. **Utility-first** (Tailwind) composes single-purpose classes (`flex items-center gap-4`) directly in markup — no naming, design constraints built in. Most teams land on one of these or a framework’s scoping.',
            },
            {
              heading: 'Angular’s answer: emulated encapsulation',
              body: 'Your component styles (`*.component.scss`) are **scoped automatically**: Angular rewrites selectors with unique attributes so `.title` in one component never leaks into another — BEM’s goal, automated. Global concerns (theme, resets) stay in `styles.scss`. This split — scoped component styles + small global layer — is the architecture you have been using all along.',
            },
          ],
          codeSamples: [
            {
              title: 'Three architectures, same card',
              filename: 'architectures',
              language: 'text',
              code: "/* BEM: flat, explicit, collision-proof */\n.card { }\n.card__title { }\n.card__title--featured { }\n\n<!-- Utility-first (Tailwind): composed in markup -->\n<div class=\"flex items-center gap-4 rounded-xl p-4 shadow\">\n\n/* Angular: write naturally, scoping is automatic */\n/* card.component.scss */\n.title { font-weight: 700; }\n/* compiled: .title[_ngcontent-abc] — leaks nowhere */",
              annotations: [
                { line: 3, note: 'block__element--modifier: one flat class per thing.' },
                { line: 7, note: 'No CSS file for this card at all — utilities compose the design.' },
                { line: 12, note: 'The generated attribute is the encapsulation — BEM automated away.' },
              ],
              explanation:
                'Different costumes, one goal: flat specificity and no accidental leakage between components.',
            },
          ],
          keyPoints: [
            'Specificity: inline > id > class > element; keep it flat, avoid `!important` wars.',
            'BEM: `block__element--modifier` single classes; Tailwind: utilities composed in markup.',
            'Angular scopes component styles automatically — `.title` cannot leak.',
            'Global layer (theme, resets) small and deliberate; everything else component-scoped.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why does .sidebar .menu .item .link eventually cause pain?',
              options: [
                { id: 'a', text: 'It is slow to parse', correct: false },
                { id: 'b', text: 'High specificity: overriding it needs even MORE specificity — the escalation spiral', correct: true },
                { id: 'c', text: 'It breaks on mobile', correct: false },
                { id: 'd', text: 'Too long to read', correct: false },
              ],
              explanation:
                'Deep selectors force deeper overrides, ending in !important — flat single classes avoid the war.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'In BEM, card__title--featured means:',
              options: [
                { id: 'a', text: 'Three nested elements', correct: false },
                { id: 'b', text: 'The title element of card, in its featured variant', correct: true },
                { id: 'c', text: 'An ID selector', correct: false },
                { id: 'd', text: 'A Sass function', correct: false },
              ],
              explanation:
                'block__element--modifier encodes the relationship in ONE flat class — no nesting needed.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'How does Angular prevent .title in one component from affecting another?',
              options: [
                { id: 'a', text: 'It forbids class reuse', correct: false },
                { id: 'b', text: 'Emulated encapsulation: selectors are rewritten with unique generated attributes', correct: true },
                { id: 'c', text: 'iframes per component', correct: false },
                { id: 'd', text: 'It does not — collisions are common', correct: false },
              ],
              explanation:
                'Each component’s styles compile to attribute-scoped selectors — automatic, invisible isolation.',
            },
          ],
        },
        {
          id: 'css-debugging',
          title: 'Debugging layouts systematically',
          minutes: 11,
          blurb: 'DevTools mastery + the five classic layout bugs.',
          concept: [
            {
              heading: 'DevTools is the layout debugger',
              body: 'Right-click → Inspect: the **box model diagram** shows computed margin/border/padding/size; the **Computed** tab shows final values AND which rule won (and what got overridden — the strikethroughs); hovering `display: flex/grid` badges toggles **overlay visualizations** of axes, lines, and gaps. Guessing in the editor is slow; reading the truth in DevTools is fast.',
            },
            {
              heading: 'The five classic bugs',
              body: '1) **Unexpected horizontal scrollbar** — something exceeds the viewport: hunt with `* { outline: 1px solid red }` or DevTools; usual suspects: fixed widths, unwrapped long words, 100vw. 2) **Width ignored** — inline element. 3) **Margin does nothing** — collapse. 4) **z-index ignored** — stacking context (Level 1). 5) **Flex/grid item overflows** — `min-width: 0` / `minmax(0, 1fr)`. You now know the cause of each — that is this course paying off.',
            },
            {
              heading: 'A debugging protocol',
              body: 'When layout misbehaves: 1) Inspect the element — is its computed size what you think? 2) Which layout system governs it (parent’s display)? 3) Walk UP the tree — constraints come from ancestors (a min-width five levels up). 4) Toggle properties live in DevTools until it behaves, THEN port the fix to code. Bugs are upstream more often than on the element itself.',
            },
          ],
          codeSamples: [
            {
              title: 'The overflow hunt + the usual fixes',
              filename: 'debugging.css',
              language: 'css',
              code: "/* the nuclear visualizer: see EVERY box */\n* { outline: 1px solid rgba(255, 0, 0, 0.4); }\n\n/* the five classic fixes */\n.flex-item   { min-width: 0; }          /* refuses to shrink */\n.grid-col    { /* use minmax(0, 1fr) in the template */ }\n.long-words  { overflow-wrap: break-word; }\n.full-width  { width: 100%; }           /* NOT 100vw (scrollbar!) */\n.wrapper     { overflow-x: auto; }      /* contain wide content */",
              annotations: [
                { line: 2, note: 'Outline (not border!) adds no size — every box edge becomes visible.' },
                { line: 5, note: 'The flex overflow fix you learned in Level 2.' },
                { line: 8, note: '100vw includes the scrollbar width on most platforms — a classic source of mystery overflow.' },
              ],
              explanation:
                'One temporary outline rule + five known fixes resolve the vast majority of real-world layout tickets.',
            },
          ],
          keyPoints: [
            'DevTools: box model diagram, Computed tab (who won), flex/grid overlays.',
            'The five classics: page overflow, inline width, margin collapse, stacking context, unshrinkable items.',
            '`* { outline: 1px solid red }` reveals every box during an overflow hunt.',
            'Debug protocol: inspect → which system governs → walk up the tree → toggle live, then port.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why outline instead of border for the debug visualizer?',
              options: [
                { id: 'a', text: 'Outline is prettier', correct: false },
                { id: 'b', text: 'Outline adds no size — layout stays identical while you look', correct: true },
                { id: 'c', text: 'Border is deprecated', correct: false },
                { id: 'd', text: 'No reason', correct: false },
              ],
              explanation:
                'Borders change box sizes and can ALTER the bug; outlines paint without participating in layout.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Width: 100vw sometimes causes a horizontal scrollbar because:',
              options: [
                { id: 'a', text: 'vw units are buggy', correct: false },
                { id: 'b', text: '100vw includes the vertical scrollbar’s width — wider than the visible area', correct: true },
                { id: 'c', text: 'It equals 110%', correct: false },
                { id: 'd', text: 'It never does', correct: false },
              ],
              explanation:
                'The viewport unit counts the full window including scrollbar; width: 100% of the body does not.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'In DevTools Computed tab, struck-through declarations mean:',
              options: [
                { id: 'a', text: 'Syntax errors', correct: false },
                { id: 'b', text: 'Rules that were overridden by more specific or later ones — the cascade visualized', correct: true },
                { id: 'c', text: 'Deprecated properties', correct: false },
                { id: 'd', text: 'Disabled JavaScript', correct: false },
              ],
              explanation:
                'The strikethrough list is the cascade’s audit trail — exactly why your rule lost is readable there.',
            },
          ],
        },
        {
          id: 'css-ecosystem',
          title: 'The CSS ecosystem & what’s next',
          minutes: 10,
          blurb: 'SCSS, Tailwind, where CSS is heading — and your path onward.',
          concept: [
            {
              heading: 'Preprocessors and PostCSS',
              body: '**SCSS** (which your project uses) adds nesting, mixins, partials, and build-time logic on top of CSS. Native CSS has now absorbed its headliners — variables (custom properties, runtime-superior) and **native nesting** (supported everywhere since 2023) — so new projects lean on SCSS less. **PostCSS** transforms CSS in the build (autoprefixing, future-syntax) and powers much of the tooling invisibly.',
            },
            {
              heading: 'The framework landscape',
              body: '**Tailwind** dominates utility-first styling; component libraries (Material — yours, PrimeNG) ship styled components where CSS is mostly theming; **CSS Modules** and CSS-in-JS appear in the React world. Under every one of them sits the same flex, grid, cascade, and box model you now know — frameworks are dialects, not different languages.',
            },
            {
              heading: 'What is arriving, and your path',
              body: 'Shipping or near: **CSS nesting**, `:has`, container queries, subgrid (all covered), `@layer` for explicit cascade ordering, scroll-driven animations, `text-wrap: balance` for headlines. Your path from here: rebuild real layouts you admire (the fastest teacher), keep DevTools open always, and follow CSS evolution through annual "State of CSS" surveys. With this course’s mental models, every new feature will slot into place.',
            },
          ],
          codeSamples: [
            {
              title: 'Native nesting + modern niceties',
              filename: 'future-now.css',
              language: 'css',
              code: "/* native CSS nesting — no preprocessor needed */\n.card {\n  padding: 16px;\n\n  & h2 { margin: 0; }\n  &:hover { box-shadow: 0 4px 12px rgb(0 0 0 / 0.15); }\n\n  @media (width >= 700px) {\n    padding: 24px;          /* queries nest too! */\n  }\n}\n\n/* explicit cascade layers: order beats specificity wars */\n@layer reset, components, utilities;\n\n/* balanced headlines — no orphan words */\nh1 { text-wrap: balance; }",
              annotations: [
                { line: 5, note: 'The & nesting you knew from SCSS — now native.' },
                { line: 8, note: 'Media queries nest inside the component block: cohesive styles.' },
                { line: 14, note: '@layer: later layers win regardless of specificity — architecture by declaration.' },
                { line: 17, note: 'balance distributes headline words evenly across lines.' },
              ],
              explanation:
                'CSS is absorbing its tooling: what needed SCSS or hacks in 2020 is plain CSS today. The fundamentals you learned do not change.',
            },
          ],
          keyPoints: [
            'SCSS adds build-time power; native CSS absorbed variables and nesting.',
            'Tailwind, Material, CSS Modules — dialects atop the same flex/grid/cascade core.',
            'Arriving: `@layer`, scroll-driven animations, `text-wrap: balance`.',
            'Path forward: rebuild real layouts, live in DevTools, follow State of CSS.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Which SCSS features did native CSS absorb?',
              options: [
                { id: 'a', text: 'None', correct: false },
                { id: 'b', text: 'Variables (as runtime custom properties) and nesting', correct: true },
                { id: 'c', text: 'Only mixins', correct: false },
                { id: 'd', text: 'The entire language', correct: false },
              ],
              explanation:
                'Custom properties surpass SCSS variables (runtime!), and nesting shipped natively in 2023.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does @layer give you?',
              options: [
                { id: 'a', text: 'Faster downloads', correct: false },
                { id: 'b', text: 'Explicit cascade ordering — later layers win regardless of selector specificity', correct: true },
                { id: 'c', text: '3D effects', correct: false },
                { id: 'd', text: 'Nothing yet', correct: false },
              ],
              explanation:
                'Layers rank whole groups of rules by declaration order — ending specificity wars architecturally.',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: 'Learning Tailwind replaces the need to understand flex, grid, and the box model.',
              options: [
                { id: 'a', text: 'True', correct: false },
                { id: 'b', text: 'False', correct: true },
              ],
              explanation:
                'Tailwind classes are thin aliases over the same properties — flex items-center IS display:flex + align-items:center.',
            },
          ],
        },
      ],
    },
  ],
};
