# Healnet Telemedicine Website Specification

> **Project:** Healnet - Premium Telemedicine Platform Website
> **Type:** Full website build with React, Framer Motion, Tailwind CSS
> **Goal:** Build a cinematic, scroll-driven, premium digital experience for a telemedicine platform

---

## 1. Project Overview

**Project Name:** Healnet
**Project Type:** Full website (5 pages)
**Core Functionality:** Telemedicine platform website showcasing services, doctors, and appointment booking
**Target Users:** Patients seeking remote healthcare consultations

---

## 2. Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Deep Teal | `#0D5C63` | Primary brand, CTAs, accents |
| Soft Sage | `#E8F4F3` | Backgrounds, cards |
| Warm Coral | `#E07A5F` | Accent, highlights, badges |
| Charcoal | `#1A1A2E` | Body text |
| Slate | `#64748B` | Secondary text |
| White | `#FFFFFF` | Cards, content areas |

### Typography
- **Headlines:** Playfair Display (Google Fonts)
- **Body:** Inter (Google Fonts)
- **Sizes:**
  - Hero: 64px (desktop), 40px (mobile)
  - H1: 48px
  - H2: 36px
  - H3: 24px
  - Body: 16px
  - Small: 14px

### Spacing
- Section padding: 120px vertical (desktop), 80px (mobile)
- Container max-width: 1280px
- Grid gap: 32px

### Visual Effects
- Border radius: 16px (cards), 24px (large cards), 8px (buttons)
- Box shadows: Layered, soft shadows
- Motion: Smooth, purposeful animations with Framer Motion

---

## 3. Page Structure

### 3.1 Home Page

**Sections (in order):**

1. **Navbar** - Fixed, transparent → blurred on scroll
2. **Hero Section** - Full viewport, animated headline, floating app mockup
3. **Features Section** - 6 feature cards with icons
4. **How It Works Section** - 4 steps with animated connecting line
5. **Stats Section** - 4 animated counters
6. **Specialists Section** - Doctor cards with hover effects
7. **Testimonials Section** - Horizontal drag carousel
8. **CTA Section** - Final call-to-action
9. **Footer** - Links, contact info, social

### 3.2 Services Page
- Page header with breadcrumb
- Services grid (6 services)
- Service cards with icons and descriptions

### 3.3 Doctors Page
- Page header
- Search bar
- Filter by specialty
- Doctor cards grid

### 3.4 About Page
- Mission section with image
- Values section (3 values)
- Team section (4 team members)

### 3.5 Contact Page
- Appointment booking form
- Contact information
- FAQ section

---

## 4. Animation Requirements

### Framer Motion Throughout

| Section | Animation |
|---------|-----------|
| Hero | Word-by-word headline animation, breathing CTA button |
| Navbar | Slide down on load, backdrop blur on scroll |
| Features | Staggered fade-up on viewport entry |
| Stats | Count-up animation from 0 |
| Specialists | Hover lift with scale and shadow |
| Testimonials | Horizontal drag scroll |
| How It Works | Sequential step animation with SVG path |
| Page Transitions | Fade/slide with AnimatePresence |
| Buttons | whileTap scale: 0.97 |

### Scroll Progress Bar
- Thin line at top of page
- Tracks scroll depth
- Brand color (#0D5C63)

---

## 5. Component Architecture

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ScrollProgress.jsx
│   ├── home/
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Stats.jsx
│   │   ├── Specialists.jsx
│   │   ├── Testimonials.jsx
│   │   └── CTASection.jsx
│   ├── shared/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Section.jsx
│   └── pages/
│       ├── ServicesContent.jsx
│       ├── DoctorsContent.jsx
│       ├── AboutContent.jsx
│       └── ContactContent.jsx
├── pages/
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── Doctors.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── animations/
│   └── variants.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## 6. Acceptance Criteria

- [ ] All 5 pages implemented and navigable
- [ ] All sections from PDF faithfully executed
- [ ] Framer Motion animations on every section
- [ ] Mobile responsive on all breakpoints
- [ ] Accessibility: aria labels on interactive elements
- [ ] No inline styles - Tailwind only
- [ ] Custom animation variants file created and imported
- [ ] Real healthcare copy (no lorem ipsum)
- [ ] Scroll progress bar functional
- [ ] Page transitions smooth

---

## 7. Tech Stack

- React 18+ with functional components and hooks
- Framer Motion for animations
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Vite as build tool