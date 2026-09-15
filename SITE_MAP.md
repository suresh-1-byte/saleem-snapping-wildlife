# Saleem Snapping - Site Map & Structure

Visual overview of the complete website structure.

---

## 🗺️ Site Navigation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      NAVIGATION BAR                          │
│  Home | Wildlife | Stories | Species | About | Contact      │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
    ┌───▼───┐          ┌─────▼─────┐      ┌─────▼─────┐
    │ HOME  │          │ WILDLIFE  │      │  STORIES  │
    └───┬───┘          │ PORTFOLIO │      └─────┬─────┘
        │              └─────┬─────┘            │
        │                    │                  │
    ┌───▼───┐          ┌─────▼─────┐      ┌─────▼─────┐
    │SPECIES│          │ LIGHTBOX  │      │  SPECIES  │
    └───┬───┘          └───────────┘      └───────────┘
        │
    ┌───▼───┐
    │ ABOUT │
    └───┬───┘
        │
    ┌───▼───┐
    │CONTACT│
    └───────┘
```

---

## 📄 Page Hierarchy

### 🏠 HOME PAGE (/)
**Purpose**: First impression, showcase best work

```
┌─────────────────────────────────────────┐
│             NAVIGATION                  │
├─────────────────────────────────────────┤
│                                         │
│         ╔═══════════════════╗          │
│         ║   HERO SECTION   ║          │
│         ║  Full-screen     ║          │
│         ║  wildlife image  ║          │
│         ║  + Tagline       ║          │
│         ║  + CTA Button    ║          │
│         ╚═══════════════════╝          │
│                                         │
├─────────────────────────────────────────┤
│         WELCOME TO MY WILD WORLD        │
│         (Introduction text)             │
├─────────────────────────────────────────┤
│                                         │
│         FEATURED WORK                   │
│    ┌────┐ ┌────┐ ┌────┐              │
│    │ 1  │ │ 2  │ │ 3  │              │
│    └────┘ └────┘ └────┘              │
│    ┌────┐ ┌────┐ ┌────┐              │
│    │ 4  │ │ 5  │ │ 6  │              │
│    └────┘ └────┘ └────┘              │
│                                         │
├─────────────────────────────────────────┤
│         FEATURED STORY                  │
│    ┌──────────┐  ┌────┐               │
│    │   HERO   │  │ S1 │               │
│    │  IMAGE   │  ├────┤               │
│    └──────────┘  │ S2 │               │
│         + Story Text                    │
├─────────────────────────────────────────┤
│         SPECIES PREVIEW                 │
│    ┌────┐┌────┐┌────┐┌────┐┌────┐   │
│    │Bird││Mamm││Macr││Land││Momn│   │
│    └────┘└────┘└────┘└────┘└────┘   │
├─────────────────────────────────────────┤
│         CLOSING CTA                     │
│    "EVERY FRAME HAS A STORY"           │
│    [VIEW THE PORTFOLIO]                │
├─────────────────────────────────────────┤
│              FOOTER                     │
└─────────────────────────────────────────┘
```

**Sections**: 7 (Hero, Intro, Featured Work, Featured Story, Species Preview, Closing CTA, Footer)

---

### 📸 WILDLIFE PORTFOLIO (/wildlife)
**Purpose**: Main gallery, filterable by category

```
┌─────────────────────────────────────────┐
│             NAVIGATION                  │
├─────────────────────────────────────────┤
│   THE WILD, AS I SEE IT.               │
├─────────────────────────────────────────┤
│  FILTERS:                              │
│  [All] [Birds] [Mammals] [Macro]      │
│  [Landscapes] [Wildlife Moments]       │
├─────────────────────────────────────────┤
│                                         │
│  ┌────┐ ┌────┐ ┌────┐               │
│  │ P1 │ │ P2 │ │ P3 │               │
│  └────┘ └────┘ └────┘               │
│  ┌────┐ ┌────┐ ┌────┐               │
│  │ P4 │ │ P5 │ │ P6 │               │
│  └────┘ └────┘ └────┘               │
│  ┌────┐ ┌────┐ ┌────┐               │
│  │ ... continuing ...                 │
│                                         │
│  (30-60 images total)                  │
│                                         │
├─────────────────────────────────────────┤
│              FOOTER                     │
└─────────────────────────────────────────┘
```

**Features**: 6 filter categories, responsive grid, lightbox on click

---

### 📖 WILDLIFE STORIES (/stories)
**Purpose**: Documentary-style narratives

```
┌─────────────────────────────────────────┐
│             NAVIGATION                  │
├─────────────────────────────────────────┤
│         WILDLIFE STORIES                │
│   Documentary-style narratives          │
├─────────────────────────────────────────┤
│                                         │
│  Story 1: A Morning at Vedanthangal    │
│  ┌──────────┐  ┌──────────────────┐   │
│  │  Image   │  │ Title + Excerpt  │   │
│  └──────────┘  └──────────────────┘   │
│                                         │
│  Story 2: Flamingos of Pulicat         │
│  ┌──────────────────┐  ┌──────────┐   │
│  │ Title + Excerpt  │  │  Image   │   │
│  └──────────────────┘  └──────────┘   │
│                                         │
│  Story 3: Into the Forests of Bandipur │
│  ┌──────────┐  ┌──────────────────┐   │
│  │  Image   │  │ Title + Excerpt  │   │
│  └──────────┘  └──────────────────┘   │
│                                         │
│  (Continues alternating...)            │
│                                         │
├─────────────────────────────────────────┤
│              FOOTER                     │
└─────────────────────────────────────────┘
```

**Features**: 5 stories, alternating layouts, scroll animations

---

### 🦅 SPECIES INDEX (/species)
**Purpose**: Visual species catalog

```
┌─────────────────────────────────────────┐
│             NAVIGATION                  │
├─────────────────────────────────────────┤
│         SPECIES INDEX                   │
│   A visual archive of wildlife          │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────┐┌───────────┐┌─────────┐│
│  │  Painted  ││  Asian    ││ Common  ││
│  │  Stork    ││ Elephant  ││Kingfish ││
│  │  Image    ││  Image    ││  Image  ││
│  │ Scientific││Scientific ││Scientif ││
│  │  Name     ││  Name     ││  Name   ││
│  │ Location  ││ Location  ││Location ││
│  │Observation││Observatn  ││Observtn ││
│  └───────────┘└───────────┘└─────────┘│
│                                         │
│  (Grid continues...)                   │
│                                         │
├─────────────────────────────────────────┤
│              FOOTER                     │
└─────────────────────────────────────────┘
```

**Features**: 3-column grid, 2-5 images per species, taxonomy

---

### 👤 ABOUT PAGE (/about)
**Purpose**: Photographer bio and philosophy

```
┌─────────────────────────────────────────┐
│             NAVIGATION                  │
├─────────────────────────────────────────┤
│       ABOUT SALEEM SNAPPING             │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────┐  ┌───────────┐  │
│  │                  │  │           │  │
│  │  Biography       │  │ Portrait  │  │
│  │  Text            │  │  Photo    │  │
│  │  (3 paragraphs)  │  │           │  │
│  │                  │  │           │  │
│  │  "Every frame    │  │           │  │
│  │  has a story.    │  │           │  │
│  │  This is mine."  │  │           │  │
│  │                  │  │           │  │
│  └──────────────────┘  └───────────┘  │
│                                         │
├─────────────────────────────────────────┤
│              FOOTER                     │
└─────────────────────────────────────────┘
```

**Content**: Biography, philosophy, portrait, location

---

### 📧 CONTACT PAGE (/contact)
**Purpose**: Contact form and information

```
┌─────────────────────────────────────────┐
│             NAVIGATION                  │
├─────────────────────────────────────────┤
│  [Background: Atmospheric wildlife img] │
│                                         │
│         LET'S CONNECT                   │
│                                         │
│  Have a wildlife project, collaboration,│
│  publication request or photography     │
│  opportunity?                           │
│                                         │
│  Email: [your email]                   │
│  Instagram: [your Instagram]           │
│  Location: Chennai, India              │
│                                         │
│  ┌─────────────────────────────┐      │
│  │ Name:    [           ]      │      │
│  │ Email:   [           ]      │      │
│  │ Subject: [           ]      │      │
│  │ Message: [           ]      │      │
│  │          [           ]      │      │
│  │ [GET IN TOUCH]              │      │
│  └─────────────────────────────┘      │
│                                         │
├─────────────────────────────────────────┤
│              FOOTER                     │
└─────────────────────────────────────────┘
```

**Features**: Contact form, email/Instagram links, validation

---

## 🎨 Component Architecture

### Global Components (Used on All Pages)

```
Navigation (Sticky Header)
├── Logo/Brand Link
├── Desktop Menu
│   ├── Home
│   ├── Wildlife
│   ├── Stories
│   ├── Species
│   ├── About
│   └── Contact
└── Mobile Hamburger Menu
    └── Full-screen overlay with links

Footer
├── Brand line: "Saleem Snapping • Wildlife Photographer • Chennai, India"
├── Social Links: Instagram • Email
└── Copyright
```

### Page-Specific Components

```
Home Page Components
├── Hero.tsx           - Full-screen intro
├── Intro.tsx          - Welcome section
├── FeaturedWork.tsx   - 6-8 image grid
├── FeaturedStory.tsx  - Story preview
├── SpeciesPreview.tsx - Category links
└── ClosingCTA.tsx     - Final portfolio CTA

Wildlife Page Components
└── WildlifeGallery.tsx
    ├── Filter buttons
    ├── Image grid
    └── Triggers Lightbox

Lightbox Component (Overlay)
├── Full-screen image display
├── Previous/Next navigation
├── Close button
├── Keyboard support
└── Image metadata

Stories Page Components
└── StoriesGrid.tsx
    └── Story cards (alternating layout)

Species Page Components
└── SpeciesGrid.tsx
    └── Species cards (3-column grid)

Contact Page Components
└── ContactForm.tsx
    ├── Input fields
    ├── Validation
    └── Submit handling
```

---

## 📊 Data Flow

### Static Data (Hardcoded)
```
Navigation menu items → Navigation.tsx
Footer content → Footer.tsx
About page text → about/page.tsx
```

### Dynamic Data (Component State)
```
Portfolio images → WildlifeGallery.tsx → photos array
Story previews → StoriesGrid.tsx → stories array
Species data → SpeciesGrid.tsx → speciesData array
```

### User Interaction Flow
```
User clicks portfolio image
  → Opens Lightbox with current image
  → User can navigate with arrows/keyboard
  → User closes lightbox
  → Returns to gallery

User selects filter
  → Updates active category state
  → Filters photos array
  → Re-renders grid with filtered images

User submits contact form
  → Validates input fields
  → Shows loading state
  → Displays success/error message
  → Resets form
```

---

## 🎯 User Journey Map

### First-Time Visitor
```
1. Lands on Home page
   → Sees impressive hero image
   → Reads tagline

2. Scrolls down Home page
   → Sees featured work
   → Gets sense of photography style
   → Sees featured story

3. Clicks "View the Portfolio"
   → Arrives at Wildlife page
   → Browses full gallery
   → Filters by interest (e.g., "Birds")
   → Clicks image for closer look

4. Opens Lightbox
   → Views image full-screen
   → Navigates through images
   → Reads image metadata

5. Explores Stories
   → Reads narrative
   → Sees documentary-style presentation

6. Visits About
   → Learns about photographer
   → Connects with story

7. Goes to Contact
   → Fills out inquiry form
   → Submits for collaboration
```

### Returning Visitor
```
1. Lands on Home page
   → Immediately recognizes brand

2. Goes directly to Wildlife
   → Checks for new additions

3. Visits Stories
   → Reads latest narratives

4. Follows social media links
```

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Single-column layouts
- Hamburger menu
- Stacked image grids
- Larger touch targets
- Simplified navigation

### Tablet (768px - 1024px)
- 2-column layouts
- Standard navigation
- Medium image grids
- Balanced spacing

### Desktop (> 1024px)
- 3-4 column layouts
- Full navigation bar
- Sticky navigation
- Maximum image sizes
- Optimal spacing

---

## 🔄 Animation Timeline

### Page Load (Home)
```
0ms    → Navigation fades in
300ms  → Hero image scales from 1.03 to 1.0 with fade
600ms  → Hero text fades in
900ms  → CTA button fades in
1200ms → Scroll indicator appears
```

### Scroll Animations
```
Section enters viewport
  → Delay 100ms
  → Fade in + translateY(12px → 0)
  → Duration: 700-1000ms
  → Easing: cubic-bezier(0.22, 1, 0.36, 1)
```

### Hover Animations
```
Image hover
  → Scale: 1.0 → 1.05
  → Duration: 700ms
  → Easing: cubic-bezier(0.22, 1, 0.36, 1)

Button hover
  → Opacity: 1.0 → 0.9
  → Scale: 1.0 → 1.05
  → Duration: 300ms
```

---

## 🗂️ File Organization

```
Project Root
├── app/                    ← Pages (Next.js App Router)
│   ├── layout.tsx         ← Root layout
│   ├── page.tsx           ← Home page
│   ├── globals.css        ← Global styles
│   └── [page]/page.tsx    ← Other pages
│
├── components/             ← React components
│   ├── Navigation.tsx     ← Global nav
│   ├── Footer.tsx         ← Global footer
│   ├── Lightbox.tsx       ← Image viewer
│   ├── home/              ← Home-specific
│   ├── wildlife/          ← Portfolio-specific
│   ├── stories/           ← Stories-specific
│   ├── species/           ← Species-specific
│   └── contact/           ← Contact-specific
│
├── public/                 ← Static assets
│   └── images/            ← All photography
│
└── config files            ← TypeScript, Tailwind, etc.
```

---

## 🎭 Content Types

### Photography
- **Hero Images**: Full-screen impact shots (1)
- **Featured Work**: Best portfolio pieces (6-8)
- **Portfolio Gallery**: Main collection (30-60)
- **Story Images**: Narrative support (6-15 per story)
- **Species Images**: Documentation (2-5 per species)
- **About Portrait**: Photographer image (1-3)
- **Background Images**: Atmospheric shots (2-3)

### Text Content
- **Headings**: Uppercase, large, cinematic
- **Body Text**: Clean, readable, minimal
- **Metadata**: Locations, dates, scientific names
- **Narratives**: Story descriptions and observations
- **UI Labels**: Buttons, navigation, forms

---

## 🔗 Internal Linking Strategy

```
Home
├──→ Wildlife (CTA buttons)
├──→ Stories (Featured story link)
├──→ Species (Preview category links)
└──→ Contact (Footer)

Wildlife
└──→ Home (Navigation)

Stories
├──→ Individual stories (Story cards)
└──→ Home (Navigation)

Species
├──→ Individual species (Species cards)
└──→ Home (Navigation)

Footer (Global)
├──→ Instagram (External)
└──→ Email (mailto:)
```

---

This site map provides a complete visual and structural overview of the Saleem Snapping Wildlife Photography portfolio website.
