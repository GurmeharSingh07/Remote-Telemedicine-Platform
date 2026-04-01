# Healnet Telemedicine Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete premium telemedicine website with 5 pages, all sections, and purposeful Framer Motion animations

**Architecture:** React SPA with React Router, Tailwind CSS for styling, Framer Motion for animations. Component-based architecture with reusable variants file.

**Tech Stack:** React, Framer Motion, Tailwind CSS, React Router, Lucide React, Vite

---

## File Structure

```
healnet/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── animations/
│   │   └── variants.js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ScrollProgress.jsx
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── Specialists.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── CTASection.jsx
│   │   ├── shared/
│   │   │   ├── Button.jsx
│   │   │   └── Section.jsx
│   │   └── pages/
│   │       ├── ServicesContent.jsx
│   │       ├── DoctorsContent.jsx
│   │       ├── AboutContent.jsx
│   │       └── ContactContent.jsx
│   └── pages/
│       ├── Home.jsx
│       ├── Services.jsx
│       ├── Doctors.jsx
│       ├── About.jsx
│       └── Contact.jsx
```

---

## Implementation Tasks

### Phase 1: Project Setup

- [ ] **Step 1: Initialize Vite React project**
  Run: `npm create vite@latest healnet -- --template react`
  Expected: Project scaffolded

- [ ] **Step 2: Install dependencies**
  Run: `npm install framer-motion react-router-dom lucide-react tailwindcss postcss autoprefixer`
  Expected: Dependencies installed

- [ ] **Step 3: Configure Tailwind**
  Create: `tailwind.config.js` with custom colors and fonts
  Create: `postcss.config.js`
  Update: `src/index.css` with @tailwind directives and font imports

- [ ] **Step 4: Commit**
  Run: `git add . && git commit -m "feat: initial project setup"`

---

### Phase 2: Animation System

- [ ] **Step 5: Create animation variants file**
  Create: `src/animations/variants.js` with reusable animation variants
  - fadeInUp
  - staggerContainer
  - breathe
  - scaleTap
  - etc.

- [ ] **Step 6: Commit**
  Run: `git add src/animations/variants.js && git commit -m "feat: add animation variants"`

---

### Phase 3: Layout Components

- [ ] **Step 7: Create Navbar component**
  Create: `src/components/layout/Navbar.jsx`
  - Logo with text
  - Navigation links (Home, Services, Doctors, About, Contact)
  - CTA button
  - Scroll state for backdrop blur
  - Slide-down animation on load
  - Responsive hamburger menu

- [ ] **Step 8: Create Footer component**
  Create: `src/components/layout/Footer.jsx`
  - Logo and tagline
  - Quick links
  - Contact info
  - Social icons
  - Newsletter form

- [ ] **Step 9: Create ScrollProgress component**
  Create: `src/components/layout/ScrollProgress.jsx`
  - Fixed at top
  - Animated width based on scroll position

- [ ] **Step 10: Commit**
  Run: `git add src/components/layout/ && git commit -m "feat: add layout components"`

---

### Phase 4: Shared Components

- [ ] **Step 11: Create Button component**
  Create: `src/components/shared/Button.jsx`
  - Variants: primary, secondary, outline
  - whileTap animation
  - Arrow icon option

- [ ] **Step 12: Create Section component**
  Create: `src/components/shared/Section.jsx`
  - Consistent padding
  - Container wrapper

- [ ] **Step 13: Commit**
  Run: `git add src/components/shared/ && git commit -m "feat: add shared components"`

---

### Phase 5: Home Page Components

- [ ] **Step 14: Create Hero component**
  Create: `src/components/home/Hero.jsx`
  - Full viewport height
  - Animated headline (word by word)
  - Subheadline with delay
  - Two CTA buttons (primary, secondary)
  - Floating app mockup with gentle bob animation
  - Gradient background
  - Trust badges (10,000+ patients, Licensed doctors, 24/7 support)

- [ ] **Step 15: Create Features component**
  Create: `src/components/home/Features.jsx`
  - 6 feature cards
  - Icons from Lucide
  - Staggered fade-up animation
  - Features: Video Consultations, Digital Prescriptions, Health Records, 24/7 Support, Secure Messaging, Insurance Integration

- [ ] **Step 16: Create HowItWorks component**
  Create: `src/components/home/HowItWorks.jsx`
  - 4 steps
  - Sequential animation
  - SVG connecting line that draws itself
  - Step numbers with icons

- [ ] **Step 17: Create Stats component**
  Create: `src/components/home/Stats.jsx`
  - 4 stats with icons
  - Count-up animation from 0
  - Stats: 10,000+ Patients, 200+ Doctors, 50,000+ Consultations, 98% Satisfaction

- [ ] **Step 18: Create Specialists component**
  Create: `src/components/home/Specialists.jsx`
  - 4 doctor cards
  - Photo, name, specialty, rating
  - Hover lift animation
  - View all doctors link

- [ ] **Step 19: Create Testimonials component**
  Create: `src/components/home/Testimonials.jsx`
  - Horizontal drag scroll
  - 3 testimonial cards
  - Avatar, name, quote, rating
  - Momentum scrolling

- [ ] **Step 20: Create CTASection component**
  Create: `src/components/home/CTASection.jsx`
  - Final call-to-action
  - Two buttons
  - Background gradient

- [ ] **Step 21: Create Home page**
  Create: `src/pages/Home.jsx`
  - Combines all home components
  - Page transition wrapper

- [ ] **Step 22: Commit**
  Run: `git add src/components/home/ src/pages/Home.jsx && git commit -m "feat: add home page components"`

---

### Phase 6: Other Pages

- [ ] **Step 23: Create Services page**
  Create: `src/components/pages/ServicesContent.jsx`
  Create: `src/pages/Services.jsx`
  - Page header with breadcrumb
  - 6 service cards with icons
  - Services: Primary Care, Dermatology, Mental Health, Pediatrics, Cardiology, Women's Health

- [ ] **Step 24: Create Doctors page**
  Create: `src/components/pages/DoctorsContent.jsx`
  Create: `src/pages/Doctors.jsx`
  - Search bar with animation
  - Filter by specialty dropdown
  - Doctor cards grid (8 doctors)
  - Filter functionality

- [ ] **Step 25: Create About page**
  Create: `src/components/pages/AboutContent.jsx`
  Create: `src/pages/About.jsx`
  - Mission section with image
  - 3 values with icons
  - Team section (4 members)

- [ ] **Step 26: Create Contact page**
  Create: `src/components/pages/ContactContent.jsx`
  Create: `src/pages/Contact.jsx`
  - Appointment booking form with animated inputs
  - Name, email, phone, specialty dropdown, date, message
  - Form validation states
  - Contact info sidebar
  - FAQ section (3 questions)

- [ ] **Step 27: Commit**
  Run: `git add src/components/pages/ src/pages/ && git commit -m "feat: add all pages"`

---

### Phase 7: Routing & App

- [ ] **Step 28: Setup App with routing**
  Update: `src/App.jsx`
  - React Router setup
  - AnimatePresence for page transitions
  - ScrollProgress component
  - Routes for all 5 pages

- [ ] **Step 29: Update main.jsx**
  Update: `src/main.jsx`
  - Import router

- [ ] **Step 30: Commit**
  Run: `git add src/App.jsx src/main.jsx && git commit -m "feat: setup routing"`

---

### Phase 8: Testing & Verification

- [ ] **Step 31: Build the project**
  Run: `npm run build`
  Expected: Build succeeds without errors

- [ ] **Step 32: Start development server**
  Run: `npm run dev`
  Expected: Server starts, no console errors

- [ ] **Step 33: Verify all pages load**
  Test: Navigate to Home, Services, Doctors, About, Contact
  Expected: All pages render without errors

- [ ] **Step 34: Commit**
  Run: `git add . && git commit -m "feat: complete website build"`

---

## Summary

Total Tasks: 34
- Phase 1: 4 tasks (Project Setup)
- Phase 2: 2 tasks (Animation System)
- Phase 3: 3 tasks (Layout Components)
- Phase 4: 2 tasks (Shared Components)
- Phase 5: 9 tasks (Home Page)
- Phase 6: 4 tasks (Other Pages)
- Phase 7: 2 tasks (Routing)
- Phase 8: 4 tasks (Testing)

---

## Notes

- Use @ symbol to reference skills when needed
- Each task should be self-contained and testable
- Run tests after each major phase
- Use descriptive commit messages
- No placeholder content - real healthcare copy throughout