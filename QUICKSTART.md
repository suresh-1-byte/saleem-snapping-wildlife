# Quick Start Guide

Get your Saleem Snapping Wildlife Photography website up and running in minutes.

## Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Your wildlife photography images ready

## Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages including Next.js, React, TypeScript, and Tailwind CSS.

## Step 2: Add Your Images

1. Navigate to `public/images/` directory
2. Add your wildlife photographs following the naming convention in `IMAGES_GUIDE.md`

**Minimum required images to start:**
- `hero.jpg` - Your best wildlife shot (2560x1440px)
- `featured-1.jpg` through `featured-6.jpg` - Featured work
- `portfolio-1.jpg` through `portfolio-6.jpg` - Gallery images
- `about-portrait.jpg` - Your portrait
- `contact-bg.jpg` - Contact background

**Pro tip**: Start with these essentials and add more images gradually.

## Step 3: Update Contact Information

Edit `app/contact/page.tsx` and replace placeholders:

```typescript
// Change these lines:
<a href="mailto:[your email]">
  [your email]
</a>

<a href="https://instagram.com/[your Instagram]">
  [your Instagram]
</a>

// To your actual information:
<a href="mailto:saleem@example.com">
  saleem@example.com
</a>

<a href="https://instagram.com/saleemsnapping">
  @saleemsnapping
</a>
```

## Step 4: Start Development Server

```bash
npm run dev
```

Open your browser and visit: **http://localhost:3000**

You should see your website running locally!

## Step 5: Test Your Website

Check each page:
- ✅ Home - Hero image displays, featured work visible
- ✅ Wildlife - Portfolio gallery loads and filters work
- ✅ Stories - Story cards display correctly
- ✅ Species - Species grid shows your content
- ✅ About - Portrait image and bio text appear
- ✅ Contact - Form renders and placeholders updated

Test responsiveness:
- Open browser dev tools (F12)
- Toggle device toolbar
- Test mobile (375px), tablet (768px), and desktop (1440px) views

## Step 6: Customize Content (Optional)

### Add More Portfolio Images

Edit `components/wildlife/WildlifeGallery.tsx`:

```typescript
const photos: Photo[] = [
  { 
    id: 1, 
    src: "/images/portfolio-1.jpg", 
    alt: "Wildlife photograph 1", 
    category: ["All", "Birds"], 
    title: "Great Egret at Dawn", 
    location: "Vedanthangal, Tamil Nadu" 
  },
  // Add more photos here
];
```

### Add More Stories

Edit `components/stories/StoriesGrid.tsx`:

```typescript
const stories = [
  {
    id: "your-story-slug",
    title: "Your Story Title",
    location: "Location, State",
    season: "Season Year",
    excerpt: "Brief description...",
    image: "/images/story-your-image.jpg",
  },
  // Add more stories
];
```

### Add More Species

Edit `components/species/SpeciesGrid.tsx`:

```typescript
const speciesData: Species[] = [
  {
    id: "species-slug",
    commonName: "Common Name",
    scientificName: "Scientific name",
    images: ["/images/species-image-1.jpg"],
    location: "Location, State",
    observation: "Your observation notes",
  },
  // Add more species
];
```

## Step 7: Build for Production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized production build in `.next/` directory.

Test the production build locally:

```bash
npm start
```

## Step 8: Deploy

**Easiest: Deploy to Vercel**

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Deploy (Vercel auto-configures everything)

See `DEPLOYMENT.md` for detailed deployment instructions.

## Common Issues & Solutions

### Images not showing

**Problem**: Images appear as broken links

**Solution**: 
- Check file names match exactly (case-sensitive)
- Verify images are in `public/images/` directory
- Ensure file extensions are lowercase (`.jpg` not `.JPG`)

### Port 3000 already in use

**Problem**: Error says port 3000 is already in use

**Solution**:
```bash
# Kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or use a different port:
npm run dev -- -p 3001
```

### TypeScript errors

**Problem**: Type errors during development

**Solution**:
```bash
# Restart TypeScript server in VS Code:
# Press Ctrl+Shift+P, then type "TypeScript: Restart TS Server"

# Or clear the cache:
rm -rf .next node_modules
npm install
```

### Slow loading images

**Problem**: Website loads slowly with images

**Solution**:
- Compress images to under 500KB each
- Use tools like TinyPNG or Squoosh
- Next.js will automatically optimize them further

## Next Steps

1. **Add Real Content**
   - Replace placeholder images with your wildlife photography
   - Update all text to match your style and voice
   - Add your actual story narratives

2. **Customize Design**
   - Adjust colors in `tailwind.config.ts`
   - Modify spacing and typography in `app/globals.css`
   - Fine-tune animations in component files

3. **Set Up Analytics**
   - Add Google Analytics or Vercel Analytics
   - Monitor visitor behavior and performance

4. **SEO Optimization**
   - Submit sitemap to Google Search Console
   - Set up social media preview cards
   - Add more detailed alt text to images

5. **Launch**
   - Connect custom domain
   - Share on social media
   - Update your photography profiles with the link

## Development Tips

### Hot Reload

The development server supports hot reload. Changes to files will automatically refresh the browser.

### VS Code Extensions (Recommended)

- ESLint
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Prettier

### Keyboard Shortcuts

While dev server is running:
- `Ctrl+C` - Stop the server
- `r` - Restart the server (in some terminals)

## Getting Help

- **Documentation**: See README.md for full documentation
- **Deployment**: See DEPLOYMENT.md for deployment guide
- **Images**: See IMAGES_GUIDE.md for image specifications
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Congratulations! 🎉

You now have a premium, production-ready wildlife photography portfolio website. 

Start uploading your stunning wildlife images and share your work with the world!
