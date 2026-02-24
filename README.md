# ITZFIZZ Hero Section — Next.js + GSAP

A premium hero section animation built with Next.js, Tailwind CSS, and GSAP ScrollTrigger.

## ✦ Features

- **Staggered letter-by-letter headline** reveal on load (perspective + Y transform)
- **Animated statistics** with count-up effect and staggered entrance
- **Scroll-based parallax** on the visual card, headline, and background orb
- **Hero fade-out** tied to scroll progress using ScrollTrigger scrub
- **Magnetic cursor** effect on CTA buttons
- **Eye-following cursor** in the logo mark
- **Infinite marquee** ticker at the bottom
- **Service rows** with scroll-triggered reveals and hover interactions
- **Grain texture overlay** for premium feel
- **Performant**: all animations use `transform` — no layout reflows

## 🚀 Quick Start

```bash
# 1. Enter the project directory
cd itzfizz-hero

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

## 📁 Project Structure

```
itzfizz-hero/
├── src/
│   ├── app/
│   │   ├── globals.css       # Custom CSS variables, animations, grain
│   │   ├── layout.js         # Root layout + Google Fonts
│   │   └── page.js           # Root page
│   └── components/
│       ├── HeroSection.js    # Main hero with GSAP animations ← Core file
│       └── BelowFold.js      # Services section with scroll reveals
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎬 Animation Breakdown

### Load Animations (GSAP Timeline)
| Element | Animation | Duration |
|---------|-----------|----------|
| Nav bar | Fade + slide down | 0.8s |
| Headline letters | Stagger fade + rotateX from -90° | 0.7s × 0.025s stagger |
| Subtext | Fade + slide up | 0.7s |
| Stat cards | Scale + fade, back.out easing | 0.6s × 0.1s stagger |
| Visual card | Clip-path reveal L→R | 1.2s |
| CTA group | Fade + slide up | 0.6s |
| Stat numbers | Count-up (0 → target) | 1.5s |

### Scroll Animations (GSAP ScrollTrigger scrub)
| Element | Effect | Scrub |
|---------|--------|-------|
| Visual card | Translate Y -25% | 1.5 |
| Background orb | Translate Y -40%, X +10% | 2.0 |
| Headline | Translate Y +15% | 1.0 |
| Hero content | Opacity 1→0 (starts at 60% scroll) | 1.0 |

## 🛠 Tech Stack

- **Next.js 14** — App Router
- **React 18** — Client components for GSAP
- **Tailwind CSS** — Utility-first styling
- **GSAP + ScrollTrigger** — All animations
- **Google Fonts** — Bebas Neue (display) + DM Sans + DM Mono

## 💡 Key Implementation Notes

1. All scroll animations use `scrub` (not autoplay) for position-linked motion
2. `transform` properties only — no width/height/top/left changes during scroll
3. GSAP context used for proper cleanup on unmount
4. `'use client'` directive required for all GSAP components in Next.js App Router
5. Fonts loaded via `<head>` in layout.js for zero-FOUC

## 🎨 Customization

Edit CSS variables in `globals.css`:
```css
:root {
  --bg: #0a0a08;        /* Background */
  --fg: #f0ede6;        /* Foreground text */
  --accent: #c8f03c;    /* Accent (lime green) */
  --muted: #4a4a42;     /* Muted elements */
}
```

Change stats in `HeroSection.js`:
```js
const STATS = [
  { value: '98%', label: 'Client Satisfaction' },
  // ...
]
```
