# Web Developer Portfolio

A clean, responsive single-page portfolio built with vanilla HTML, CSS, and
JavaScript. Uses a minimalist **black / grey / white** color palette.

## Features

- Fixed navigation with scroll-aware background, active-link highlighting, and
  a mobile slide-in menu
- Animated hero with a subtle grid backdrop and scroll indicator
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Scroll progress bar
- Sections: About, Skills, Selected Work, Contact
- Fully responsive, no build step required

## Structure

```
index.html   Markup and content
styles.css   Styling and the color palette (see :root variables)
script.js    Navigation, scroll effects, and reveal animations
```

## Run locally

Any static server works, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Customize

Update your name, copy, projects, and links directly in `index.html`.
Tweak colors in the `:root` block at the top of `styles.css`.
