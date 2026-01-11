# Portfolio Component Structure

## 📁 Project Architecture

```
src/
├── main.tsx                 # Entry point - renders App
├── App.tsx                  # Main app component with all sections
├── vite-env.d.ts           # Vite types
│
├── components/
│   ├── index.ts            # Barrel export for all components
│   │
│   ├── layout/
│   │   ├── Navbar.tsx      # Fixed navigation with scroll effects
│   │   ├── Footer.tsx      # Footer with socials & credits
│   │   └── CustomCursor.tsx # Custom animated cursor (desktop only)
│   │
│   ├── sections/
│   │   ├── Hero.tsx        # Hero section - split layout, intro
│   │   ├── About.tsx       # About me + skills showcase
│   │   ├── Projects.tsx    # Project cards grid
│   │   ├── Papers.tsx      # Research papers list
│   │   └── Socials.tsx     # Contact/social links
│   │
│   └── ui/
│       ├── Button.tsx      # Reusable button variants
│       ├── Card.tsx        # Project/content card
│       ├── SectionHeader.tsx # Consistent section titles
│       ├── SkillBar.tsx    # Animated skill progress
│       └── MagneticLink.tsx # Links with magnetic hover
│
├── hooks/
│   ├── index.ts            # Barrel export
│   ├── useGsap.ts          # GSAP animation utilities
│   ├── useSmoothScroll.ts  # Lenis smooth scroll
│   └── useMousePosition.ts # Mouse tracking for effects
│
├── utils/
│   ├── animations.ts       # GSAP timeline presets
│   └── constants.ts        # Site data (projects, skills, etc.)
│
├── styles/
│   └── globals.css         # Tailwind + custom utilities
│
└── assets/                 # Images, icons (if any)
```

## 🔄 Component Flow

```
App.tsx
│
├── CustomCursor          # Global - follows mouse
├── Navbar                # Fixed - always visible
│
├── <main>
│   ├── Hero              # Section #1 - id="home"
│   ├── About             # Section #2 - id="about"  
│   ├── Projects          # Section #3 - id="projects"
│   ├── Papers            # Section #4 - id="papers"
│   └── Socials           # Section #5 - id="socials"
│
└── Footer                # Bottom credits
```

## 📦 App.tsx Import Structure

```tsx
// Core React
import { useEffect } from 'react';

// Smooth scroll (initialized at app level)
import { useSmoothScroll } from './hooks';

// Layout components
import CustomCursor from './components/layout/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Section components
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Papers from './components/sections/Papers';
import Socials from './components/sections/Socials';

// Styles
import './styles/globals.css';
```

## 🎯 Each Component's Responsibility

### Layout Components
| Component | Purpose | Key Features |
|-----------|---------|--------------|
| `Navbar` | Navigation | Scroll hide/show, glass effect, mobile menu |
| `Footer` | Credits | GitHub chart, social links, copyright |
| `CustomCursor` | UX Enhancement | Magnetic effect, hover states |

### Section Components
| Component | Purpose | Key Animations |
|-----------|---------|----------------|
| `Hero` | First impression | Split text reveal, floating elements, parallax |
| `About` | Bio + Skills | Scroll-triggered skill bars, stagger reveals |
| `Projects` | Portfolio work | Card hover effects, image reveals |
| `Papers` | Research | List animations, link hovers |
| `Socials` | Contact CTA | Card grid, magnetic links |

### UI Components (Reusable)
| Component | Used In | Purpose |
|-----------|---------|---------|
| `Button` | Hero, About, Projects | Primary/secondary/ghost variants |
| `Card` | Projects, Socials | Consistent card styling |
| `SectionHeader` | All sections | "// ABOUT" style headers |
| `SkillBar` | About | Animated progress bars |
| `MagneticLink` | Navbar, Socials | Links that "pull" toward cursor |

## 📚 Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "gsap": "^3.12.5",           // Complex animations
    "framer-motion": "^11.0.0",  // React animations
    "lenis": "^1.0.42",          // Smooth scroll
    "lucide-react": "^0.378.0"   // Icons
  }
}
```

## 🎨 Animation Strategy

1. **Page Load** → GSAP timeline for hero reveal
2. **Scroll** → Framer Motion `useInView` for section reveals
3. **Hover** → CSS transitions + Framer Motion `whileHover`
4. **Scroll Feel** → Lenis for buttery smooth scrolling
5. **Cursor** → RAF loop for smooth following

## 📱 Responsive Breakpoints

```
Mobile:  < 768px  (md)
Tablet:  768-1024px (lg)
Desktop: > 1024px
```

All sections use `section-container` class for consistent padding.
