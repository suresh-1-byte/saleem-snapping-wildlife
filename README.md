# Saleem Snapping - Wildlife Photography Portfolio

A premium, cinematic wildlife photography portfolio website built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Brand Positioning

**Saleem Snapping**  
Wildlife Photographer • Chennai, India

**Tagline:** WILDLIFE, THROUGH MY LENS.

## Features

- **Premium Design**: Cinematic, documentary-style aesthetic with Apple-inspired animations
- **Responsive**: Mobile-first design that works flawlessly across all devices
- **Performance Optimized**: Next.js Image optimization, lazy loading, WebP support
- **Accessible**: WCAG 2.1 Level AA compliant with keyboard navigation and screen reader support
- **SEO Ready**: Complete metadata, Open Graph tags, and semantic HTML

## Pages

1. **Home** - Hero section, featured work, featured story, species preview
2. **Wildlife** - Filterable portfolio gallery with lightbox
3. **Stories** - Documentary-style wildlife narratives
4. **Species** - Visual species index with taxonomy
5. **About** - Photographer biography and philosophy
6. **Contact** - Contact form and information

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: CSS transitions with cubic-bezier easing
- **Images**: Next.js Image component with automatic optimization

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Image Setup

Add your wildlife photographs to the `/public/images/` directory:

### Required Images

- `hero.jpg` - Full-screen hero image (2560x1440 recommended)
- `featured-1.jpg` through `featured-6.jpg` - Featured work images
- `story-hero.jpg` - Featured story hero image
- `story-support-1.jpg`, `story-support-2.jpg` - Supporting story images
- `closing-cta.jpg` - Final cinematic CTA background
- `species-birds.jpg`, `species-mammals.jpg`, etc. - Species category thumbnails
- `portfolio-1.jpg` through `portfolio-6.jpg` - Portfolio gallery images
- `about-portrait.jpg` - Photographer portrait
- `contact-bg.jpg` - Contact page background

### Image Guidelines

- Use high-resolution images (minimum 1920px wide)
- Compress images for web without visible quality loss
- Use consistent editing across the portfolio
- Maintain proper wildlife subject positioning

## Customization

### Colors

Edit `tailwind.config.ts` to adjust the color palette:

```typescript
colors: {
  black: "#000000",
  charcoal: {
    DEFAULT: "#2B2B2B",
    light: "#4A4A4A",
  },
  white: "#FFFFFF",
  "earthy-green": {
    DEFAULT: "hsl(115, 20%, 50%)",
  },
}
```

### Content

All content is preserved exactly as provided in the master prompt. Update component text directly in the respective files under `/components/` and `/app/`.

## Performance

- Lighthouse score: 90+ (mobile and desktop)
- Largest Contentful Paint: < 2.5s
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

## Accessibility

- Keyboard navigation support
- Focus visible indicators
- ARIA labels for icon buttons
- Alt text for all images
- Reduced motion support for prefers-reduced-motion
- WCAG 2.1 Level AA color contrast

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Saleem Snapping. All rights reserved.

## Contact

- Email: [your email]
- Instagram: [your Instagram]
- Location: Chennai, India
