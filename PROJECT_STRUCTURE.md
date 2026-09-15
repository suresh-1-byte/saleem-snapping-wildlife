# Project Structure

Complete overview of the Saleem Snapping Wildlife Photography website architecture.

## Directory Structure

```
saleem-snapping-portfolio/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout with Navigation & Footer
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles & Tailwind
│   ├── robots.ts                # SEO robots.txt config
│   ├── sitemap.ts               # SEO sitemap generation
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   ├── species/
│   │   └── page.tsx            # Species index page
│   ├── stories/
│   │   └── page.tsx            # Stories listing page
│   └── wildlife/
│       └── page.tsx            # Wildlife portfolio page
├── components/                   # React components
│   ├── Navigation.tsx           # Main navigation menu
│   ├── Footer.tsx               # Site footer
│   ├── Lightbox.tsx             # Image lightbox viewer
│   ├── contact/
│   │   └── ContactForm.tsx     # Contact form component
│   ├── home/
│   │   ├── Hero.tsx            # Homepage hero section
│   │   ├── Intro.tsx           # Welcome introduction
│   │   ├── FeaturedWork.tsx    # Featured photography grid
│   │   ├── FeaturedStory.tsx   # Featured story preview
│   │   ├── SpeciesPreview.tsx  # Species category links
│   │   └── ClosingCTA.tsx      # Final call-to-action
│   ├── species/
│   │   └── SpeciesGrid.tsx     # Species visual index
│   ├── stories/
│   │   └── StoriesGrid.tsx     # Stories listing grid
│   └── wildlife/
│       └── WildlifeGallery.tsx # Filterable portfolio gallery
├── public/
│   └── images/                  # All photography images
│       └── README.md            # Image directory guide
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── .env.example                # Environment variables template
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies & scripts
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── README.md                   # Main documentation
├── QUICKSTART.md               # Quick start guide
├── DEPLOYMENT.md               # Deployment instructions
├── IMAGES_GUIDE.md             # Image preparation guide
└── PROJECT_STRUCTURE.md        # This file
```

## Pages Overview

### 1. Home Page (`app/page.tsx`)

**Route**: `/`

**Components used**:
- `Hero` - Full-screen wildlife hero image/video
- `Intro` - Welcome section
- `FeaturedWork` - 6-8 featured photographs
- `FeaturedStory` - Story preview with images
- `SpeciesPreview` - Category navigation
- `ClosingCTA` - Final portfolio link

**Purpose**: First impression, showcase best work, guide navigation

---

### 2. Wildlife Portfolio (`app/wildlife/page.tsx`)

**Route**: `/wildlife`

**Components used**:
- `WildlifeGallery` - Filterable photo gallery
- `Lightbox` - Full-screen image viewer

**Features**:
- Filter by category (All, Birds, Mammals, Macro, Landscapes, Wildlife Moments)
- Responsive masonry/grid layout
- Lightbox with keyboard navigation
- Image metadata display

**Purpose**: Main portfolio showcase

---

### 3. Wildlife Stories (`app/stories/page.tsx`)

**Route**: `/stories`

**Components used**:
- `StoriesGrid` - Story cards listing

**Features**:
- Documentary-style story previews
- Location and season metadata
- Alternating left/right layout
- Hover interactions

**Purpose**: Narrative storytelling, brand differentiation

---

### 4. Species Index (`app/species/page.tsx`)

**Route**: `/species`

**Components used**:
- `SpeciesGrid` - Species catalog

**Features**:
- Common and scientific names
- Multiple images per species
- Location information
- Photographer observations

**Purpose**: Organized wildlife documentation

---

### 5. About Page (`app/about/page.tsx`)

**Route**: `/about`

**Features**:
- Photographer biography
- Philosophy and approach
- Portrait photograph
- Location information

**Purpose**: Personal connection, credibility

---

### 6. Contact Page (`app/contact/page.tsx`)

**Route**: `/contact`

**Components used**:
- `ContactForm` - Contact form with validation

**Features**:
- Name, email, subject, message fields
- Form validation
- Success/error messages
- Email and Instagram links
- Location display

**Purpose**: Client inquiries, collaborations

---

## Component Architecture

### Layout Components

#### `Navigation.tsx`
- Fixed top navigation
- Desktop: Horizontal menu
- Mobile: Hamburger full-screen menu
- Active page indicator
- Smooth transitions

#### `Footer.tsx`
- Brand information
- Social links (Instagram, Email)
- Copyright notice
- Minimal design

---

### Home Page Components

#### `Hero.tsx`
- Full-screen hero image
- Cinematic scale animation
- Tagline display
- Primary CTA button
- Scroll indicator

#### `Intro.tsx`
- Scroll-triggered fade-in
- Centered text layout
- Generous whitespace

#### `FeaturedWork.tsx`
- Asymmetric grid layout
- Various image sizes
- Hover scale effects
- Links to portfolio

#### `FeaturedStory.tsx`
- Large hero image
- Two supporting images
- Story text and metadata
- "Read Story" CTA

#### `SpeciesPreview.tsx`
- 5 category cards
- Square aspect ratio images
- Text overlays
- Grid layout

#### `ClosingCTA.tsx`
- Full-width section
- Background image with overlay
- Large heading
- Portfolio button

---

### Wildlife Components

#### `WildlifeGallery.tsx`
- State management for filtering
- Responsive grid (1/2/3 columns)
- Image hover effects
- Metadata display on hover
- Lightbox trigger

#### `Lightbox.tsx`
- Full-screen overlay
- Next/previous navigation
- Keyboard support (Arrow keys, Escape)
- Image metadata display
- Close button
- Click outside to close

---

### Stories Components

#### `StoriesGrid.tsx`
- Story card layout
- Alternating image positions
- Scroll-triggered animations
- Staggered entrance
- Metadata display

---

### Species Components

#### `SpeciesGrid.tsx`
- Species card layout
- Portrait-oriented images
- Common and scientific names
- Location and observations
- 3-column responsive grid

---

### Contact Components

#### `ContactForm.tsx`
- Form state management
- Input validation
- Submit handling
- Success/error feedback
- Accessible form labels

---

## Styling System

### Tailwind CSS Configuration

**Colors**:
- `black`: #000000
- `charcoal`: #2B2B2B (default), #4A4A4A (light)
- `white`: #FFFFFF
- `earthy-green`: HSL(115, 20%, 50%)

**Typography**:
- System font stack
- Clean sans-serif
- Responsive sizes
- Uppercase headings for emphasis

**Animations**:
- Custom easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Smooth transitions
- Opacity and transform based
- GPU-accelerated

**Responsive Breakpoints**:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Global CSS Classes

**Container Padding**: `.container-padding`
- Responsive horizontal padding
- 4px → 16px based on screen size

**Section Spacing**: `.section-spacing`
- Responsive vertical padding
- 64px → 128px based on screen size

**Animation Smooth**: `.animation-smooth`
- Applies custom cubic-bezier easing
- Use on all transitions

---

## Data Flow

### Image Management

Images are stored in `/public/images/` and referenced using Next.js Image component:

```typescript
<Image
  src="/images/hero.jpg"
  alt="Description"
  fill // or width/height
  className="object-cover"
  sizes="100vw" // Responsive sizing
  priority // For above-the-fold images
/>
```

### Portfolio Data

Gallery images are managed in component arrays:

```typescript
const photos: Photo[] = [
  {
    id: 1,
    src: "/images/portfolio-1.jpg",
    alt: "Wildlife photograph",
    category: ["All", "Birds"],
    title: "Image Title",
    location: "Location"
  }
];
```

### State Management

Local component state with React hooks:
- `useState` for form data, filters, lightbox
- `useEffect` for scroll observers, keyboard listeners
- `useRef` for IntersectionObserver targets

---

## Performance Features

### Image Optimization
- Next.js automatic optimization
- WebP/AVIF format conversion
- Responsive srcset generation
- Lazy loading (except hero images)
- Blur-up placeholders

### Code Splitting
- Automatic route-based splitting
- Dynamic imports for heavy components
- Optimized bundle sizes

### SEO
- Metadata on every page
- Open Graph tags
- Sitemap generation
- Semantic HTML
- Alt text on all images

### Accessibility
- Keyboard navigation
- Focus visible states
- ARIA labels
- Screen reader support
- Reduced motion support

---

## Development Workflow

### Adding a New Page

1. Create page file: `app/new-page/page.tsx`
2. Add to navigation: `components/Navigation.tsx`
3. Create metadata export
4. Add to sitemap: `app/sitemap.ts`
5. Test responsiveness

### Adding a New Component

1. Create component file: `components/category/Component.tsx`
2. Use TypeScript for props
3. Add "use client" if using hooks/events
4. Apply consistent styling classes
5. Test accessibility

### Adding Portfolio Images

1. Optimize images (see IMAGES_GUIDE.md)
2. Add to `/public/images/`
3. Update component data array
4. Test loading and display
5. Verify mobile layout

---

## Build Process

### Development
```bash
npm run dev
```
- Hot reload
- Fast refresh
- Source maps
- Detailed error messages

### Production Build
```bash
npm run build
```
- Minification
- Tree shaking
- Image optimization
- Static generation
- Bundle analysis

### Production Server
```bash
npm start
```
- Serves optimized build
- Production mode
- No hot reload

---

## Testing Checklist

### Visual Testing
- [ ] All pages load correctly
- [ ] Images display at correct sizes
- [ ] Text is readable on all backgrounds
- [ ] Hover states work as expected
- [ ] Animations are smooth

### Responsive Testing
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Laptop (1024px)
- [ ] Desktop (1440px)
- [ ] Large display (1920px+)

### Functionality Testing
- [ ] Navigation links work
- [ ] Filter buttons work on portfolio
- [ ] Lightbox opens and closes
- [ ] Lightbox navigation works
- [ ] Contact form submits
- [ ] Form validation works

### Performance Testing
- [ ] Lighthouse score 90+
- [ ] LCP < 2.5s
- [ ] FCP < 1.5s
- [ ] No console errors
- [ ] Images load quickly

### Accessibility Testing
- [ ] Tab navigation works
- [ ] Focus states visible
- [ ] Screen reader compatible
- [ ] Alt text present
- [ ] Keyboard shortcuts work

---

## File Naming Conventions

### Components
- PascalCase: `ComponentName.tsx`
- Descriptive: `WildlifeGallery.tsx`
- Grouped by feature: `home/Hero.tsx`

### Pages
- lowercase: `page.tsx`
- Route-based folders: `wildlife/page.tsx`

### Images
- lowercase with hyphens: `hero-image.jpg`
- Descriptive: `portfolio-elephant-1.jpg`
- Sequential numbering: `featured-1.jpg`

### Configuration
- lowercase with dots: `tailwind.config.ts`
- Descriptive: `next.config.mjs`

---

## Key Technologies

- **Framework**: Next.js 14.2.5
- **Language**: TypeScript 5.5.4
- **Styling**: Tailwind CSS 3.4.7
- **React**: 18.3.1
- **Node**: 18.0+ required

---

## Customization Points

### Easy to Modify
- Colors: `tailwind.config.ts`
- Typography: `tailwind.config.ts`
- Animation timing: `app/globals.css`
- Portfolio data: Component files
- Page content: Page and component files

### Requires Coding
- Layout structure: Component architecture
- New page types: Create new routes
- Advanced features: Custom components
- API integration: Server actions

---

This structure provides a solid foundation for a premium wildlife photography portfolio that's maintainable, performant, and scalable.
