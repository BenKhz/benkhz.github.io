const n=`# Mastering CSS Grid for Modern Layouts

CSS Grid is one of the most powerful layout systems available in CSS. In this comprehensive guide, we'll explore everything from basics to advanced techniques.

## What is CSS Grid?

CSS Grid is a two-dimensional layout system that allows you to create complex responsive layouts with ease. Unlike Flexbox, which is primarily one-dimensional, Grid handles both rows and columns simultaneously.

## Basic Grid Syntax

Here's a simple grid layout:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

This creates a 3-column grid with equal-width columns and 20px gaps.

## Grid Terminology

Understanding these terms is crucial:

- **Grid Container** - The element with \`display: grid\`
- **Grid Items** - Direct children of the container
- **Grid Lines** - Dividing lines that make up the grid structure
- **Grid Tracks** - Space between two grid lines (rows or columns)
- **Grid Cells** - Single unit of the grid
- **Grid Areas** - Rectangular space spanning multiple cells

## Common Grid Patterns

### Holy Grail Layout

\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
}
\`\`\`

### Responsive Card Grid

\`\`\`css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

This creates a responsive grid that automatically adjusts the number of columns based on available space.

## Advanced Techniques

### Named Grid Lines

\`\`\`css
.container {
  display: grid;
  grid-template-columns: [start] 1fr [middle] 1fr [end];
}

.item {
  grid-column: start / end;
}
\`\`\`

### Subgrid

\`\`\`css
.parent {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.child {
  display: grid;
  grid-template-columns: subgrid;
}
\`\`\`

## Browser Support

CSS Grid has excellent browser support (96%+ globally). For older browsers, provide fallbacks:

\`\`\`css
.container {
  display: flex; /* Fallback */
  display: grid;
}
\`\`\`

## Grid vs Flexbox

When to use each:

- **Grid**: Two-dimensional layouts, complex designs
- **Flexbox**: One-dimensional layouts, alignment, distribution

Often, the best approach is using both together!

## Practical Example

Here's a complete responsive dashboard layout:

\`\`\`css
.dashboard {
  display: grid;
  grid-template-areas:
    "sidebar header header"
    "sidebar main stats"
    "sidebar main stats";
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: auto 1fr;
  gap: 20px;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-areas:
      "header"
      "stats"
      "main"
      "sidebar";
    grid-template-columns: 1fr;
  }
}
\`\`\`

## Resources

- [CSS Grid Garden](https://cssgridgarden.com/) - Interactive learning game
- [Grid by Example](https://gridbyexample.com/) - Comprehensive examples
- [MDN Grid Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

## Conclusion

CSS Grid revolutionizes how we build layouts. Mastering it opens up endless possibilities for creating beautiful, responsive designs with clean, maintainable code.

Start experimenting with Grid today, and you'll wonder how you ever lived without it!
`;export{n as default};
