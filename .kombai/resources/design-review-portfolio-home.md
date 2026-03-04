# Design Review Results: Portfolio Home Page (/)

**Review Date**: 2026-03-04  
**Route**: `/` (PublicPortfolio)  
**Focus Areas**: Visual Design, UX/Usability, Responsive/Mobile, Accessibility, Micro-interactions/Motion, Consistency, Performance  
**Benchmark**: Josh W. Comeau (joshwcomeau.com)

---

## Summary

The portfolio has an impressive dark-mode cyberpunk aesthetic with great interactive elements (particle canvas, custom cursor, glitch text, terminal). However the **light mode is significantly weaker** than dark mode, the **bio text uses monospace font which hurts readability**, and several **accessibility gaps** (missing ARIA labels, a console prop error) need addressing. Performance is impacted by an artificial 500ms loading gate that combines with Supabase cold starts to push FCP to ~8.5s. Compared to Josh W. Comeau's portfolio, the design leans heavily into theming at the cost of human warmth and readability.

---

## Issues

| # | Issue | Criticality | Category | Location |
|---|-------|-------------|----------|----------|
| 1 | **FCP of 8.5s** — artificial 500ms loading timeout compounds Supabase cold-start latency. FCP/LCP are both over 8 seconds which is "poor" by Core Web Vitals. | 🔴 Critical | Performance | `src/App.jsx:60-65` |
| 2 | **Console React prop error** — `Received true for non-boolean attribute jsx`. A prop is passing a boolean where a string is expected, causing a React DOM warning in every render. | 🔴 Critical | Consistency | `src/components/sections/TerminalSection.jsx` (JSX spread) |
| 3 | **Zen Mode toggle has no `aria-label`** — only has `title` attribute which is not announced by all screen readers. | 🔴 Critical | Accessibility | `src/components/layout/NavBar.jsx:85-91` |
| 4 | **Light mode gradient on "AGUSTIN" is broken** — `bg-gradient-to-r from-cyan-600 via-zinc-800 to-fuchsia-600` — the dark `zinc-800` midpoint kills the vibrancy in light mode, producing a muddy blue-purple instead of the cyan-fuchsia intended. Dark mode uses `via-white` which works. | 🟠 High | Visual Design | `src/components/sections/Hero.jsx:309-312` |
| 5 | **Hero "Contact Me" button (light mode) has critically low visual weight** — `border-zinc-300 text-zinc-700` on a `bg-zinc-50` surface. The CTA blends into the background — contrast ratio is below 3:1. | 🟠 High | Accessibility / Visual Design | `src/components/sections/Hero.jsx:344-349` |
| 6 | **Bio paragraphs use `font-mono`** — Monospace font for long-form personal text reduces reading comfort and warmth. Benchmark sites (Josh W. Comeau) use humanist/sans-serif for body copy. Mono should be reserved for code, labels, and HUD elements. | 🟠 High | Visual Design / UX | `src/components/sections/AboutAndSkills.jsx:58` |
| 7 | **Avatar-first layout pushes name and CTA below fold on mobile** — The avatar (48/64 w/h) + bounce animation + status badge + 9rem name + typewriter + buttons means critical content can be truncated on devices < 700px tall. | 🟠 High | UX / Responsive | `src/components/sections/Hero.jsx:274-350` |
| 8 | **CLS score 0.099** — approaching the "poor" threshold (0.1). Caused by async Supabase content loading in Projects/Testimonials pushing layout after mount. | 🟠 High | Performance | `src/components/sections/Projects.jsx`, `Testimonials.jsx` |
| 9 | **Process section is visually disconnected from the design system** — No `border-t` separator, uses a `cyan-500 to purple-600` gradient (different from the site-wide `cyan → fuchsia`), and missing the ambient grid background used in all other sections. | 🟡 Medium | Consistency | `src/components/sections/Process.jsx:41-88` |
| 10 | **Terminology inconsistency** — Some sections use cyberpunk HUD language ("System Worklog", "Incoming Transmissions", "Authorized Credentials") while others use plain English (Process uses "INITIALIZATION", "PROTOCOLS"). The tone is uneven across sections. | 🟡 Medium | Consistency | Multiple sections |
| 11 | **About section missing LinkedIn social link** — Footer shows Github, LinkedIn, Instagram, but the About "Connect" section only shows Mail and Github. | 🟡 Medium | UX | `src/components/sections/AboutAndSkills.jsx:73-85` |
| 12 | **Project stat labels lack context** — `stats: { speed: 90, ui: 85 }` renders as "SPEED 90 / UI 85" with no unit, no scale, no explanation. Visitors don't know if 90 is out of 100, a percentage, or an arbitrary rating. | 🟡 Medium | UX | `src/components/ui/ProjectCard.jsx:101-110` |
| 13 | **Certifications data is hardcoded** while Projects and Testimonials use Supabase — creates a maintenance inconsistency and means cert links all point to `"#"` (dead links). | 🟡 Medium | UX / Consistency | `src/components/sections/Certifications.jsx:4-35` |
| 14 | **Hero CTA "Contact Me" uses a plain anchor** (`<a href="#contact">`) without the smooth scroll handler — will cause an abrupt jump on some browsers rather than smooth scroll. | 🟡 Medium | UX / Micro-interactions | `src/components/sections/Hero.jsx:343-350` |
| 15 | **No scroll-to-top button** — with a long single-page portfolio, users have no quick way to return to the top without scrolling manually. | 🟡 Medium | UX | Missing component |
| 16 | **Glitch animation keyframes are duplicated** — defined in both `src/components/ui/GlitchText.jsx` (inline `<style>`) and `src/styles/globals.js`. This causes redundant CSS and potential conflicts. | 🟡 Medium | Consistency | `src/components/ui/GlitchText.jsx:41-64`, `src/styles/globals.js:23-42` |
| 17 | **`<img>` in ProjectCard uses `project.image_url`** but mockData.js uses `project.image` (different field name). If Supabase is unavailable and mock data is used as fallback, images break. | 🟡 Medium | UX | `src/components/ui/ProjectCard.jsx:69`, `src/data/mockData.js:19` |
| 18 | **HUD marquee strip copy is too generic** — "Design & Code", "Performance First", "Immersive UX" are standard marketing phrases that don't differentiate Dennrick. Could include specific technologies, unique selling points, or fun personal facts. | ⚪ Low | Visual Design / UX | `src/components/sections/Hero.jsx:363-377` |
| 19 | **Footer social icons are too small** (32px `size={32}` rendered as icon, but the touch target is just the icon with no padding) — minimum recommended touch target is 44x44px. | ⚪ Low | Accessibility | `src/components/layout/Footer.jsx:53-56` |
| 20 | **Light mode lacks ambient visual depth** — In dark mode the particle canvas, glow effects, and shadows create immersive depth. In light mode the same sections render as a flat gray `#f4f4f5` with almost invisible particles. A subtle light-mode texture or gradient would greatly improve the experience. | ⚪ Low | Visual Design | `src/components/sections/Hero.jsx:236` |
| 21 | **"SYSTEM ONLINE \| V2.6.0"** status badge — the version number `v2.6.0` appears to be a hardcoded internal value. Unless this tracks the actual portfolio version, it may confuse visitors who wonder what software they're looking at. | ⚪ Low | UX | `src/components/sections/Hero.jsx:291` |
| 22 | **No `<meta>` description or OG tags visible in HTML** — for a portfolio, SEO and social sharing previews are important for professional visibility. | ⚪ Low | UX | `index.html` |

---

## Criticality Legend
- 🔴 **Critical**: Breaks functionality or violates accessibility / performance standards
- 🟠 **High**: Significantly impacts user experience or design quality
- 🟡 **Medium**: Noticeable issue that should be addressed
- ⚪ **Low**: Nice-to-have improvement

---

## Benchmark Comparison: Josh W. Comeau (joshwcomeau.com)

| Aspect | Josh W. Comeau | Dennrick's Portfolio |
|--------|---------------|----------------------|
| Body text font | Humanist sans-serif (warm, readable) | Monospace in bio (cold, technical) |
| Light mode quality | Polished, fully designed | Noticeably weaker than dark mode |
| Tone | Personal, approachable, human | Technical/cyberpunk, impressive but impersonal |
| Hero focus | Name + role + CTA are immediately visible | Avatar pushes name/CTA lower |
| Visual consistency | Uniform design language throughout | Varies between HUD-themed and plain |
| Performance | Fast FCP (~1-2s) | FCP ~8.5s (artificial loading gate) |

---

## Next Steps (Prioritized)

1. **[Critical]** Remove/reduce the 500ms artificial loading timer in `App.jsx`
2. **[Critical]** Add `aria-label` to the Zen Mode toggle button
3. **[Critical]** Fix the React boolean prop console error in TerminalSection
4. **[High]** Fix light mode gradient on "AGUSTIN" — replace `via-zinc-800` with `via-cyan-400` or `via-sky-300`
5. **[High]** Change bio paragraphs from `font-mono` to `font-sans` for readability
6. **[High]** Improve the "Contact Me" button contrast in light mode hero
7. **[High]** Align Process section to the site's design system (add border-t, grid background, cyan-fuchsia gradient)
8. **[Medium]** Add LinkedIn to About section social links
9. **[Medium]** Add a scroll-to-top button
10. **[Medium]** Consolidate glitch animation CSS into `index.css` only
11. **[Low]** Expand touch target on footer social icons with padding
12. **[Low]** Add OG meta tags to `index.html`
