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

## Notes

- Always create self-contained HTML (no external CSS/JS files)
- Use base64 encoding for small images
- Provide clear instructions for opening and presenting
- Test keyboard navigation thoroughly
- Consider dark mode support if requested
