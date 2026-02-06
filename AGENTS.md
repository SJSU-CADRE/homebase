# CADRE Homebase – Agent Instructions

This project is a **lofi, black-and-ASCII** version of the CADRE (Computers in Art, Design, Research and Education) homepage. It is a static front door for the lab, not the full CADRE site.

## Stack & structure

- **Static HTML + CSS only.** No build step, no JS framework. Optional minimal JS is fine (e.g. menu toggle).
- **Files:** `index.html` (markup), `style.css` (all styles). Keep CSS in `style.css`, not inline.
- **Reference:** `currentWebSite/` holds the real CADRE site (HTML/CSS) for layout and content reference. Match its breakpoints and structure where it makes sense (e.g. 850px mobile, sidebar behavior).

## Conventions

- **Aesthetic:** Black/dark background (`#0a0a0a`), light gray text, monospace (IBM Plex Mono). ASCII art, box-drawing, and terminal-style elements are intentional.
- **Responsiveness:** Desktop: full-height sidebar, two-column main. At 850px: hide sidebar, show mobile header, single-column content (aligned with `currentWebSite`).
- **Logo:** ASCII block-drawing logo in the header; keep “Laboratory for New Media” and the upside-down `Ǝᴚᗡ∀Ↄ` line. Binary CADRE in the footer.
- **Links:** Preserve existing hrefs (e.g. `history.html`, `programs/bfa.html`, `login.html`, `register.html`) unless the user asks to change them.

## Do not

- Add analytics, tracking, or third-party scripts unless the user asks.
- Change the lofi/ASCII look to a generic modern UI.
- Put styles in `<style>` in the HTML; use `style.css`.

## Optional

- New pages (e.g. `login.html`, `register.html`) should reuse the same layout and `style.css` for consistency.
