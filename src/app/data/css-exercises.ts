import { Exercise } from '../models/course.model';

/** Interactive exercises for the CSS Layout course, keyed by lesson id. */
export const CSS_EXERCISES: Record<string, Exercise[]> = {
  // ---------- Level 1 ----------
  'box-model': [
    {
      id: 'ex-boxsizing',
      type: 'fill-blank',
      prompt: 'Make width mean the VISIBLE box (including padding and border).',
      language: 'css',
      codeTemplate: '* {\n  box-sizing: ___;\n}',
      blanks: [{ accepted: ['border-box'], hint: 'The value every project starts with.' }],
      explanation:
        'border-box includes padding and border inside the declared width — predictable sizing.',
    },
  ],
  'display-flow': [
    {
      id: 'ex-inlineblock',
      type: 'fill-blank',
      prompt: 'Make this link sizable (width works) while staying in the text line.',
      language: 'css',
      codeTemplate: 'a.button {\n  display: ___;\n  width: 120px;\n}',
      blanks: [{ accepted: ['inline-block'], hint: 'In the line, but sizes like a block.' }],
      explanation:
        'inline-block flows like a word but accepts width/height — the classic button display.',
    },
  ],
  'units-sizing': [
    {
      id: 'ex-min',
      type: 'fill-blank',
      prompt: 'A fluid container: 92% of the screen, but never wider than 1100px.',
      language: 'css',
      codeTemplate: '.container {\n  width: ___(92%, 1100px);\n  margin-inline: auto;\n}',
      blanks: [{ accepted: ['min'], hint: 'Picks the smaller of the two at any moment.' }],
      explanation:
        'min() applies whichever constraint is smaller — fluid until the cap. The modern container.',
    },
  ],
  positioning: [
    {
      id: 'ex-anchor',
      type: 'fill-blank',
      prompt: 'Pin a badge to the card’s corner: complete the anchor and the pin.',
      language: 'css',
      codeTemplate:
        '.card {\n  position: ___;     /* the anchor */\n}\n.card .badge {\n  position: ___;     /* the pin */\n  top: 8px;\n  right: 8px;\n}',
      blanks: [
        { accepted: ['relative'], hint: 'Keeps its place, becomes the reference.' },
        { accepted: ['absolute'], hint: 'Out of flow, positioned against the anchor.' },
      ],
      explanation:
        'relative parent + absolute child: the positioning duo in every codebase.',
    },
  ],

  // ---------- Level 2 ----------
  'flex-container': [
    {
      id: 'ex-wrap',
      type: 'fill-blank',
      prompt: 'Let the cards break onto new lines instead of squeezing.',
      language: 'css',
      codeTemplate: '.cards {\n  display: flex;\n  flex-___: wrap;\n  gap: 20px;\n}',
      blanks: [{ accepted: ['wrap'], hint: 'The property AND value share the word.' }],
      explanation:
        'flex-wrap: wrap allows new lines — without it items shrink then overflow.',
    },
  ],
  'flex-alignment': [
    {
      id: 'ex-center',
      type: 'fill-blank',
      prompt: 'Perfect centering — complete the legendary trio.',
      language: 'css',
      codeTemplate:
        '.overlay {\n  display: flex;\n  justify-content: ___;\n  align-items: ___;\n}',
      blanks: [
        { accepted: ['center'], hint: 'Main axis.' },
        { accepted: ['center'], hint: 'Cross axis.' },
      ],
      explanation:
        'Both axes centered = anything floats in the middle of anything. Memorize as one unit.',
    },
  ],
  'flex-sizing': [
    {
      id: 'ex-sidebar',
      type: 'fill-blank',
      prompt: 'A rigid 250px sidebar and a content area taking all the rest.',
      language: 'css',
      codeTemplate:
        '.sidebar {\n  flex: 0 0 ___;\n}\n.content {\n  flex: ___;\n  min-width: 0;\n}',
      blanks: [
        { accepted: ['250px'], hint: 'The basis — its fixed size.' },
        { accepted: ['1'], hint: 'Take everything that remains.' },
      ],
      explanation:
        'flex: 0 0 250px never grows or shrinks; flex: 1 absorbs the remaining space.',
    },
  ],
  'flex-patterns': [
    {
      id: 'ex-sticky-footer',
      type: 'arrange',
      prompt: 'Arrange the sticky-footer pattern (footer at the bottom even with short content).',
      language: 'css',
      lines: [
        'body {',
        '  display: flex;',
        '  flex-direction: column;',
        '  min-height: 100vh;',
        '}',
        'main { flex: 1; }',
      ],
      explanation:
        'A full-height column where main absorbs the free space — the footer always rests at the bottom.',
    },
  ],

  // ---------- Level 3 ----------
  'grid-basics': [
    {
      id: 'ex-tracks',
      type: 'fill-blank',
      prompt: 'A 250px sidebar column and a content column taking the remaining space.',
      language: 'css',
      codeTemplate: '.shell {\n  display: grid;\n  grid-template-columns: 250px ___;\n}',
      blanks: [{ accepted: ['1fr'], hint: 'One fraction of the free space.' }],
      explanation:
        'fr distributes what remains after fixed tracks — 1fr takes all of it here.',
    },
  ],
  'grid-placement': [
    {
      id: 'ex-fullwidth',
      type: 'fill-blank',
      prompt: 'Make the header span the FULL width, whatever the column count.',
      language: 'css',
      codeTemplate: '.header {\n  grid-column: 1 / ___;\n}',
      blanks: [{ accepted: ['-1'], hint: 'Counts from the end.' }],
      explanation:
        '-1 is always the last grid line — 1 / -1 spans everything, today and after redesigns.',
    },
  ],
  'grid-responsive': [
    {
      id: 'ex-autofit',
      type: 'fill-blank',
      prompt: 'Complete the famous responsive one-liner: as many 280px+ columns as fit.',
      language: 'css',
      codeTemplate:
        '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, ___(280px, 1fr));\n  gap: 20px;\n}',
      blanks: [{ accepted: ['minmax'], hint: 'A track with a floor and a ceiling.' }],
      explanation:
        'repeat(auto-fit, minmax(280px, 1fr)) — responsive columns with zero media queries.',
    },
  ],
  'grid-vs-flex': [
    {
      id: 'ex-choice',
      type: 'fill-blank',
      prompt: 'Apply the decision rule to each design.',
      language: 'text',
      codeTemplate:
        'dashboard with rows AND columns aligned  ->  ___\nnavbar: one line of items                ->  ___',
      blanks: [
        { accepted: ['grid'], hint: 'Two dimensions.' },
        { accepted: ['flex', 'flexbox'], hint: 'One axis.' },
      ],
      explanation:
        'Rows AND columns → grid; a line of items → flex. The one-question rule.',
    },
  ],

  // ---------- Level 4 ----------
  'media-queries': [
    {
      id: 'ex-mobilefirst',
      type: 'fill-blank',
      prompt: 'Mobile-first: which feature do the enhancing queries use?',
      language: 'css',
      codeTemplate:
        '/* base = mobile, then enhance upward: */\n@media (___-width: 700px) {\n  .layout { grid-template-columns: 1fr 1fr; }\n}',
      blanks: [{ accepted: ['min'], hint: '"From this width and up".' }],
      explanation:
        'min-width queries ADD complexity as space grows — the mobile-first direction.',
    },
  ],
  'fluid-modern': [
    {
      id: 'ex-clamp',
      type: 'fill-blank',
      prompt: 'Fluid heading: never below 1.75rem, never above 3rem, scaling between.',
      language: 'css',
      codeTemplate: 'h1 {\n  font-size: ___(1.75rem, 4vw, 3rem);\n}',
      blanks: [{ accepted: ['clamp'], hint: 'min, preferred, max — one function.' }],
      explanation:
        'clamp() interpolates the middle value between hard bounds — fluid type without breakpoints.',
    },
  ],
  'responsive-patterns': [
    {
      id: 'ex-stack-row',
      type: 'fill-blank',
      prompt: 'The stack-to-row move: complete the property that flips at the breakpoint.',
      language: 'css',
      codeTemplate:
        '.hero { display: flex; flex-direction: column; }\n@media (width >= 800px) {\n  .hero { flex-direction: ___; }\n}',
      blanks: [{ accepted: ['row'], hint: 'Horizontal main axis.' }],
      explanation:
        'One flipped property and the same markup reflows — the foundational responsive move.',
    },
  ],
  'images-media': [
    {
      id: 'ex-cover',
      type: 'fill-blank',
      prompt: 'Uniform 16:9 thumbnails that fill their box without distortion.',
      language: 'css',
      codeTemplate:
        '.card img {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: ___;\n}',
      blanks: [{ accepted: ['cover'], hint: 'Fill the box, crop the overflow.' }],
      explanation:
        'cover fills the proportional box by cropping — any source image, uniform cards.',
    },
  ],

  // ---------- Level 5 ----------
  'modern-css': [
    {
      id: 'ex-var',
      type: 'fill-blank',
      prompt: 'Declare a theme color once and use it.',
      language: 'css',
      codeTemplate:
        ':root {\n  ___: #1565c0;\n}\n.button {\n  background: ___(--primary);\n}',
      blanks: [
        { accepted: ['--primary'], hint: 'Custom properties start with two dashes.' },
        { accepted: ['var'], hint: 'The function that reads them.' },
      ],
      explanation:
        'Custom properties live at runtime: swap them in a .dark class and everything follows.',
    },
  ],
  'css-architecture': [
    {
      id: 'ex-bem',
      type: 'fill-blank',
      prompt: 'Name this class in BEM: the title element of card, featured variant.',
      language: 'text',
      codeTemplate: '.card___title___featured { }',
      blanks: [
        { accepted: ['__'], hint: 'Element separator: two of a character.' },
        { accepted: ['--'], hint: 'Modifier separator: two of another.' },
      ],
      explanation:
        'block__element--modifier: card__title--featured — flat, explicit, collision-proof.',
    },
  ],
  'css-debugging': [
    {
      id: 'ex-outline',
      type: 'fill-blank',
      prompt: 'The overflow-hunt visualizer that adds NO size to any box.',
      language: 'css',
      codeTemplate: '* {\n  ___: 1px solid red;\n}',
      blanks: [{ accepted: ['outline'], hint: 'Paints without participating in layout (border would shift things).' }],
      explanation:
        'outline draws outside the box model — every element becomes visible while layout stays identical.',
    },
  ],
  'css-ecosystem': [
    {
      id: 'ex-nesting',
      type: 'fill-blank',
      prompt: 'Native CSS nesting: complete the hover rule inside the block.',
      language: 'css',
      codeTemplate:
        '.card {\n  padding: 16px;\n\n  ___:hover {\n    box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);\n  }\n}',
      blanks: [{ accepted: ['&'], hint: 'The same symbol SCSS taught you — now native.' }],
      explanation:
        '& refers to the parent selector — nesting shipped natively in all browsers in 2023.',
    },
  ],
};
