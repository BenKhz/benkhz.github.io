const n=`# Building a Modern Portfolio with Vanilla JavaScript

Building a personal portfolio is an excellent way to showcase your skills and projects. In this post, I'll share how I built this portfolio using modern web technologies while keeping things simple and performant.

## Tech Stack

For this project, I chose a minimal but powerful tech stack:

- **Vanilla JavaScript** - No framework overhead, just clean ES6+ code
- **Tailwind CSS v4** - Latest version with CSS-first configuration
- **Vite** - Lightning-fast build tool with HMR
- **animate.css** - Professional animations out of the box

## Why Vanilla JavaScript?

While frameworks like React and Vue are fantastic, sometimes vanilla JavaScript is the perfect choice:

1. **Performance** - No runtime framework overhead
2. **Learning** - Better understanding of core JavaScript concepts
3. **Simplicity** - Less complexity, easier to maintain
4. **Bundle Size** - Significantly smaller JavaScript bundle

## Project Structure

\`\`\`
src/
├── index.html
├── styles/
│   └── main.css
├── js/
│   ├── main.js
│   ├── theme.js
│   ├── animations.js
│   └── journal.js
└── data/
    ├── projects.json
    ├── skills.json
    └── experience.json
\`\`\`

## Key Features

### Dark Mode

Implementing dark mode with localStorage persistence:

\`\`\`javascript
function toggleTheme() {
  const theme = localStorage.getItem('theme')
  const newTheme = theme === 'dark' ? 'light' : 'dark'
  localStorage.setItem('theme', newTheme)
  document.documentElement.classList.toggle('dark')
}
\`\`\`

### Scroll Animations

Using Intersection Observer for performant scroll animations:

\`\`\`javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate__fadeInUp')
    }
  })
})
\`\`\`

### SEO Optimization

Every page includes complete meta tags:

- Open Graph tags for social sharing
- Twitter Card metadata
- Structured data (JSON-LD)
- Semantic HTML5 elements
- Proper heading hierarchy

## Performance Considerations

1. **Lazy Loading** - Images load only when needed
2. **Code Splitting** - Vite handles this automatically
3. **Minification** - Production build is optimized
4. **Accessibility** - WCAG AA compliant

## Lessons Learned

Building without a framework taught me:

- The importance of proper DOM manipulation
- How to structure vanilla JS projects
- Performance optimization techniques
- The value of web standards

## Conclusion

You don't always need a framework to build modern web applications. Vanilla JavaScript, combined with modern build tools and CSS frameworks, can create fast, maintainable, and beautiful websites.

The code for this portfolio is available on [GitHub](https://github.com/yourusername/portfolio). Feel free to use it as a template for your own portfolio!

## Further Reading

- [MDN Web Docs](https://developer.mozilla.org)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
`;export{n as default};
