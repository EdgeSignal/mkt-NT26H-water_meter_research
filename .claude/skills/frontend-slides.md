---
name: frontend-slides
description: Create stunning, animation-rich HTML presentations from scratch or by converting PowerPoint files
triggerPatterns:
  - presentation
  - slides
  - slideshow
  - ppt
  - pptx
  - deck
---

# Frontend Slides Skill

Create beautiful, single-file HTML presentations with animations and interactive elements.

## When to Use

Use this skill when the user wants to:
- Build a presentation from scratch
- Convert a PowerPoint (PPT/PPTX) file to web format
- Create slides for a talk, pitch, or demo
- Design animated, interactive presentations

## Core Capabilities

### 1. Create HTML Presentations
- Single-file HTML output (self-contained)
- Responsive design that works on all devices
- Smooth animations and transitions
- Keyboard navigation (arrow keys, space)
- Full-screen support

### 2. Visual Design
- Clean, modern aesthetics
- Typography hierarchy
- Color schemes and themes
- Image and media support
- Custom layouts per slide

### 3. Animation & Interaction
- Slide transitions (fade, slide, zoom)
- Element animations (appear, fly-in, etc.)
- Progressive disclosure
- Interactive elements

## Implementation Approach

### Structure
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Presentation Title]</title>
  <style>
    /* All CSS embedded */
  </style>
</head>
<body>
  <div class="slides">
    <section class="slide">...</section>
    <section class="slide">...</section>
  </div>
  <script>
    /* All JavaScript embedded */
  </script>
</body>
</html>
```

### Key Features to Include

1. **Slide Container**: Full viewport slides with flex/grid layout
2. **Navigation**: Arrow keys, space bar, progress indicator
3. **Animations**: CSS animations triggered on slide entry
4. **Responsive**: Mobile-friendly with appropriate scaling
5. **Print Support**: CSS for printing to PDF

### Default Styling Guidelines

- **Typography**: Clear hierarchy (h1: 48-72px, h2: 36-48px, body: 24-32px)
- **Colors**: High contrast, professional palette
- **Spacing**: Generous whitespace, 60-80px margins
- **Animations**: Subtle, purposeful (0.3-0.6s duration)

## Workflow

1. **Understand Requirements**
   - Presentation topic/purpose
   - Number of slides needed
   - Content structure
   - Visual style preferences

2. **Create Structure**
   - Build HTML skeleton
   - Set up slide container and navigation
   - Add basic styling

3. **Add Content**
   - Create individual slides
   - Apply typography and layout
   - Add images/media if needed

4. **Enhance with Animations**
   - Add transitions between slides
   - Animate key elements
   - Test timing and flow

5. **Test & Refine**
   - Check navigation
   - Test on different screen sizes
   - Verify animations
   - Ensure print compatibility

## PowerPoint Conversion

When converting PPT/PPTX:
1. Ask user to provide the file path
2. Extract text content and structure
3. Recreate layout in HTML/CSS
4. Apply appropriate animations
5. Maintain visual hierarchy

## Best Practices

- **Keep it simple**: Don't overcrowd slides
- **Consistent style**: Use same fonts, colors throughout
- **Readable text**: Minimum 24px for body text
- **Fast loading**: Optimize images, embed assets
- **Accessibility**: Semantic HTML, keyboard navigation
- **Single file**: All CSS/JS embedded for portability

## Example Output

The final HTML file should:
- Open directly in any browser
- Work offline (no external dependencies)
- Be easy to share (single file)
- Support presenter mode if needed
- Export to PDF via browser print

## Common Patterns

### Title Slide
```html
<section class="slide title-slide">
  <h1>Presentation Title</h1>
  <p class="subtitle">Subtitle or tagline</p>
  <p class="author">Presenter Name</p>
</section>
```

### Content Slide
```html
<section class="slide">
  <h2>Slide Title</h2>
  <ul>
    <li>Point 1</li>
    <li>Point 2</li>
    <li>Point 3</li>
  </ul>
</section>
```

### Image Slide
```html
<section class="slide image-slide">
  <h2>Visual Example</h2>
  <img src="data:image/..." alt="Description">
  <p class="caption">Image caption</p>
</section>
```

## Avoiding Unwanted Whitespace (Layout Gaps)

Multi-column slides frequently develop large blank areas because a short column gets
stretched to match a tall one, and inner cards inherit that stretched height. Watch for
these two failure modes and apply the fixes below.

### 1. Grid/flex columns stretched to equal height

**Symptom**: In a multi-column layout (e.g. `grid-template-columns: 30% 30% 40%`), the
column with less content shows a big empty gap at the bottom because CSS defaults to
`align-items: stretch`, forcing every column to the tallest column's height.

**Fix**: Add `align-items: start;` to the grid/flex container so each column sizes to its
own content instead of being stretched.

```css
/* before — short column stretched, blank space appears */
display: grid; grid-template-columns: 30% 30% 40%; gap: 20px;

/* after — each column uses its natural height */
display: grid; grid-template-columns: 30% 30% 40%; gap: 20px; align-items: start;
```

### 2. Inner cards taller than their text (extra "phantom" row)

**Symptom**: A card that only needs two lines renders as if it has three — an empty row
sits below the text. Caused by loose vertical padding, default paragraph `margin`, and
generous `line-height` compounding.

**Fix**: Tighten the card's vertical rhythm:
- Reduce vertical padding (e.g. `padding: 10px 12px` → `8px 12px`)
- Set `margin: 0` on the last `<p>` to kill the default bottom margin
- Trim `line-height` on body text (e.g. `1.5` → `1.4`)
- Shrink the title-to-content gap (`margin-bottom: 4px` → `3px`)

```html
<div style="padding: 8px 12px; border-radius: 8px;">
  <p style="font-size: 14px; font-weight: 600; margin-bottom: 3px;">Title</p>
  <p style="font-size: 14px; line-height: 1.4; margin: 0;">Content line</p>
</div>
```

### 3. Single-line text box that looks two lines tall (default `<p>` margin)

**Symptom**: A conclusion/callout box wraps a single line of text, yet the box renders as
tall as two lines — there is a blank strip below (and above) the text inside the box. This
is the most common and easily-missed gap.

**Cause**: The `<p>` inside the box has no `margin` reset, so the browser's default
paragraph margin (~1em top and bottom) adds empty space *inside* the box, on top of the
box's own `padding`. Setting the box `padding` alone does NOT fix it — the `<p>` margin sits
inside that padding.

**Fix**: Add `margin: 0;` to the `<p>` (or any block element) inside the box.

```html
<!-- before — <p> default margin inflates the box to ~2 lines -->
<div style="padding: 12px 24px; border-radius: 8px;">
  <p style="font-size: 17px; line-height: 1.45;">Single line of conclusion text.</p>
</div>

<!-- after — box hugs the single line -->
<div style="padding: 12px 24px; border-radius: 8px;">
  <p style="font-size: 17px; line-height: 1.45; margin: 0;">Single line of conclusion text.</p>
</div>
```

**Rule of thumb**: When a slide's content clusters at the top with dead space at the
bottom, first check `align-items` on the container, then tighten inner-card padding/margin.
Because `.slide` is already vertically centered (`justify-content: center`), shrinking the
content block automatically re-centers everything on the page. Apply the same edit to every
theme variant (e.g. `style-minimal-flat.html` and `style-dark-tech.html`) to keep them in sync.

### Mandatory whitespace check (run after every text-box edit)

Whenever you add or edit ANY text box (conclusion box, callout, card, tag), verify it has no
extra blank row below the text before finishing:

1. Does every `<p>` / block child inside the box have `margin: 0` (or an explicit, intended
   margin)? If not, add `margin: 0` — this is the #1 cause of a one-line box looking two lines tall.
2. Does every `<h3>` inside a text box have `margin-top: 0` overridden? The global `.slide h3`
   CSS applies `margin: 25px 0 15px 0` by default, creating unwanted space above headings at
   the top of colored boxes. Use `margin: 0 0 8px 0` or similar to eliminate top spacing.
3. Is the box being stretched by a grid/flex parent? If so, ensure the container has
   `align-items: start`.
4. Is the box's own `margin-bottom` creating a gap above an absolutely-positioned footnote
   (which does not occupy flow space)? If the gap is unwanted, remove that `margin-bottom`.
5. Apply the identical fix to every theme variant so the decks stay in sync.

## Notes

- Always create self-contained HTML (no external CSS/JS files)
- Use base64 encoding for small images
- Provide clear instructions for opening and presenting
- Test keyboard navigation thoroughly
- Consider dark mode support if requested
