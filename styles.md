# Design System — Task & Annotation App

## Brand Identity

**App Name:** TaskFlow  
**Tagline:** "Manage tasks. Annotate images. Ship faster."  
**Personality:** Dark, futuristic, minimal — like a dev tool that also looks great.

---

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#030115` | Page background |
| `--bg-surface` | `#0d0a1f` | Cards, panels |
| `--bg-elevated` | `#13102a` | Modals, dropdowns |
| `--accent-yellow` | `#FFB13F` | Primary CTA, highlights |
| `--accent-purple` | `#DC3FFF` | Secondary CTA, tags |
| `--accent-blue` | `#51A2FF` | Info, links |
| `--accent-green` | `#05DF72` | Success, "Done" column |
| `--accent-red` | `#F50F0F` | Danger, delete |
| `--text-primary` | `#FFFFFF` | Headings |
| `--text-secondary` | `#9B98AE` | Body, descriptions |
| `--text-muted` | `rgba(255,255,255,0.3)` | Placeholders, disabled |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Card borders |
| `--border-glow` | `rgba(255,255,255,0.2)` | Focused borders |

---

## Typography

| Role | Font | Size | Weight |
|---|---|---|---|
| Hero heading | Geist Sans | `4.5rem / 72px` | 800 |
| Section heading | Geist Sans | `2.25rem / 36px` | 700 |
| Card title | Geist Sans | `1.125rem / 18px` | 600 |
| Body | Geist Sans | `1rem / 16px` | 400 |
| Caption / label | Geist Sans | `0.75rem / 12px` | 500 |
| Code / mono | Geist Mono | `0.875rem / 14px` | 400 |

---

## Spacing Scale

Uses Tailwind default scale. Key values:
- Section padding: `py-24 px-6 md:px-12 lg:px-20`
- Card padding: `p-6`
- Gap between cards: `gap-6`
- Max content width: `max-w-[1440px] mx-auto`

---

## Component Styles

### Buttons
Defined in `ButtonComponent.tsx`. Variants:
- `yellow` — primary action (glow bottom border + yellow radial bg)
- `purple` — secondary action (glow bottom border + purple radial bg)
- `green` / `success` — confirm / done
- `red` — destructive
- `default` — ghost-style

### Cards
```css
background: rgba(255,255,255,0.03);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 12px;
backdrop-filter: blur(20px);
```
Hover: `border-color` lifts to `rgba(255,255,255,0.15)`, subtle `translateY(-2px)`.

### Glass Effect (`.effect` class)
```css
box-shadow: 1.2px 1.1px 1px -0.5px #ffffff8b, -1.2px -1.1px 1px -0.5px #ffffff8d, 1px 1px 10px 2px #00000044;
background-color: #fdfdfd1a;
backdrop-filter: blur(20px);
```

### Kanban Columns
- `To Do` — border-top accent: `--accent-blue`
- `In Progress` — border-top accent: `--accent-yellow`
- `Done` — border-top accent: `--accent-green`

### Priority Badges
- `High` — red pill `bg-red-500/20 text-red-400`
- `Medium` — yellow pill `bg-yellow-500/20 text-yellow-400`
- `Low` — green pill `bg-green-500/20 text-green-400`

---

## Page Layouts

### Home Page `/`
Sections (top → bottom):
1. **Navbar** — fixed, blur backdrop, logo + nav links + auth buttons
2. **Hero** — full-viewport, centered, headline + subtext + dual CTA + animated visual
3. **Features** — 3-column grid, icon + title + description cards
4. **How It Works** — numbered steps, alternating layout
5. **CTA Banner** — full-width gradient strip, single action button
6. **Footer** — links + social + copyright

### Task Page `/tasks`
- Left: `<DateSelector/>` sticky sidebar
- Right: `<Board/>` with 3 `<Column/>` components
- Each column contains `<TaskCard/>` items
- Top bar: date display + "Add Task" button

### Annotate Page `/annotate`
- Left panel: image thumbnail strip (scrollable)
- Main canvas: selected image with polygon overlay
- Right panel: shape list + delete controls
- Top bar: upload button + image name

---

## Animation Tokens

| Name | Usage |
|---|---|
| `framer-motion` fade-up | Section entry animations |
| `transition-all duration-300` | Hover states |
| `animate-spin` | Loading spinners |
| `animate-ring` | Notification bell |
| Gradient shimmer | Skeleton loaders |

---

## Home Page — Section Breakdown

### Hero Section
```
Background: #030115 with radial purple glow top-left + yellow glow top-right
Badge: "✦ Now with Image Annotation" — pill with purple border glow
H1: "Manage Tasks.\nAnnotate Images.\nShip Faster." — white, 72px, 800 weight
  "Annotate Images." — gradient yellow-to-purple
Subtext: 18px, #9B98AE, max-w-xl centered
CTAs: [Get Started →] yellow variant  [View Demo] default variant
Visual: Floating Kanban board mockup card (CSS-only, no image needed)
```

### Features Section
```
Label: "FEATURES" — small caps, yellow, letter-spacing wide
H2: "Everything you need to stay in flow"
Cards (3):
  1. 🗂 Kanban Board — drag & drop task management by date
  2. 🖼 Image Annotation — draw polygons, save shapes to DB
  3. 📅 Date-Driven Tasks — filter tasks per day with date picker
Each card: glass effect, icon in colored circle, title, description
```

### How It Works Section
```
Label: "HOW IT WORKS"
H2: "Three steps to productivity"
Steps:
  1. Login — secure auth, get into your workspace
  2. Manage Tasks — create, drag, and organize on the Kanban board
  3. Annotate — upload images and draw annotation polygons
Layout: horizontal stepper on desktop, vertical on mobile
```

### CTA Banner
```
Background: linear-gradient(135deg, #1a0533, #030115)
Border: 1px solid rgba(220,63,255,0.2)
H2: "Ready to take control of your workflow?"
Button: [Start Now →] yellow variant, large
```
