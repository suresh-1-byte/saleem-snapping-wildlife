# Wildlife Photography Image Guide

This guide explains exactly which images you need and how to prepare them for the website.

## Image Requirements Overview

| Section | Count | Aspect Ratio | Min Width | Purpose |
|---------|-------|--------------|-----------|---------|
| Hero | 1 | 16:9 | 2560px | Full-screen impact |
| Featured Work | 6-8 | Various | 1920px | Gallery diversity |
| Portfolio | 30-60 | 4:3 or 3:2 | 1920px | Main collection |
| Stories | 5-15 per story | Various | 1920px | Narrative support |
| Species | 2-5 per species | 4:5 portrait | 1200px | Species showcase |
| About | 1-3 | 3:4 portrait | 1200px | Photographer portrait |
| Contact | 1 | 16:9 | 1920px | Atmospheric background |

## Detailed Image List

### HOME PAGE

#### Hero Section
- **Filename**: `hero.jpg`
- **Dimensions**: 2560 x 1440px (16:9)
- **Content**: Your single most powerful cinematic wildlife frame
- **Notes**: This is the first thing visitors see. Choose carefully.

#### Featured Work (6-8 images)
1. `featured-1.jpg` (2560 x 1440px) - Wide environmental shot
2. `featured-2.jpg` (1200 x 1600px) - Bird close-up
3. `featured-3.jpg` (1600 x 1200px) - Mammal action moment
4. `featured-4.jpg` (1200 x 1600px) - Macro photography
5. `featured-5.jpg` (1920 x 1080px) - Landscape
6. `featured-6.jpg` (1920 x 1080px) - Wildlife interaction/behavior

#### Featured Story
- `story-hero.jpg` (2560 x 1280px) - Vedanthangal hero
- `story-support-1.jpg` (1200 x 1500px) - Supporting image
- `story-support-2.jpg` (1200 x 1500px) - Supporting image

#### Species Preview
- `species-birds.jpg` (800 x 800px)
- `species-mammals.jpg` (800 x 800px)
- `species-macro.jpg` (800 x 800px)
- `species-landscapes.jpg` (800 x 800px)
- `species-moments.jpg` (800 x 800px)

#### Closing CTA
- `closing-cta.jpg` (2560 x 1440px) - Final cinematic image

### WILDLIFE PORTFOLIO PAGE

#### Gallery Images (30-60 photos)
- **Filenames**: `portfolio-1.jpg` through `portfolio-60.jpg`
- **Dimensions**: 1920 x 1440px (4:3) or 1920 x 1280px (3:2)
- **Categories to cover**:
  - Birds (10-15 images)
  - Mammals (8-12 images)
  - Macro (5-8 images)
  - Landscapes (5-8 images)
  - Wildlife Moments (8-12 images)

### WILDLIFE STORIES PAGE

#### Story Preview Images
- `story-vedanthangal.jpg` (1920 x 1200px)
- `story-pulicat.jpg` (1920 x 1200px)
- `story-bandipur.jpg` (1920 x 1200px)
- `story-mudumalai.jpg` (1920 x 1200px)
- `story-nilgiris.jpg` (1920 x 1200px)

### SPECIES PAGE

#### Species Images (2-5 per species)
Example for Painted Stork:
- `species-painted-stork-1.jpg` (1200 x 1500px)
- `species-painted-stork-2.jpg` (1200 x 1500px)

Repeat for each species:
- Asian Elephant: `species-elephant-1.jpg`, `species-elephant-2.jpg`
- Common Kingfisher: `species-kingfisher-1.jpg`, `species-kingfisher-2.jpg`

### ABOUT PAGE
- `about-portrait.jpg` (1200 x 1600px) - Natural photographer portrait

### CONTACT PAGE
- `contact-bg.jpg` (2560 x 1440px) - Quiet atmospheric background

## Image Preparation Guidelines

### 1. Resolution & Sizing
- **Minimum width**: 1920px for full-width images
- **Maximum file size**: 2MB per image
- **Format**: JPG (JPEG) - best for photographs

### 2. Aspect Ratios

**Landscape (16:9)** - Hero sections, wide shots
- 2560 x 1440px
- 1920 x 1080px

**Standard (4:3)** - Portfolio gallery
- 1920 x 1440px
- 1600 x 1200px

**Standard (3:2)** - Alternative portfolio
- 1920 x 1280px
- 1500 x 1000px

**Portrait (4:5)** - Species index
- 1200 x 1500px
- 1000 x 1250px

**Portrait (3:4)** - About page
- 1200 x 1600px
- 900 x 1200px

### 3. Image Optimization

Use tools like:
- **Photoshop**: Save for Web (Quality: 80-85%)
- **Online tools**: TinyPNG, Squoosh, ImageOptim
- **Command line**: ImageMagick, Sharp

Example using ImageMagick:
```bash
# Resize and optimize
convert input.jpg -resize 1920x1440^ -quality 85 output.jpg
```

### 4. Editing Consistency

Maintain consistent:
- **White balance** - Same color temperature across images
- **Exposure** - Similar brightness levels
- **Contrast** - Consistent tonal range
- **Saturation** - Natural, not oversaturated
- **Sharpness** - Similar sharpening approach

### 5. Subject Positioning

For hero and featured images:
- **Keep the main subject away from edges**
- **Leave breathing room** for text overlays
- **Consider safe zones** for different screen sizes
- **Avoid important details at the very top** (navigation overlay area)

### 6. Cropping Guidelines

**Do:**
- Crop to enhance composition
- Remove distracting elements
- Follow rule of thirds
- Maintain subject integrity

**Don't:**
- Crop out important body parts awkwardly
- Distort aspect ratios
- Over-crop leaving no context
- Create uncomfortable negative space

## Batch Processing Tips

### Using Lightroom
1. Import all images
2. Apply consistent color correction
3. Export with preset:
   - Format: JPEG
   - Quality: 85%
   - Color Space: sRGB
   - Resize to fit: Long Edge 1920px
   - Sharpening: Screen, Amount: Standard

### Using Photoshop Actions
Create an action to:
1. Resize to target dimensions
2. Sharpen for web
3. Save for web at 85% quality

## File Naming Convention

Use descriptive, lowercase names with hyphens:

**Good:**
- `hero-eagle-sunrise.jpg`
- `portfolio-leopard-stalking.jpg`
- `species-asian-elephant-1.jpg`

**Bad:**
- `IMG_1234.jpg`
- `Final Edit 2.jpg`
- `Best Shot!!.jpg`

## Quality Checklist

Before uploading each image, verify:

- [ ] Correct dimensions for its purpose
- [ ] File size under 2MB
- [ ] No visible compression artifacts
- [ ] Properly sharpened for web
- [ ] Consistent with other portfolio images
- [ ] Subject is in focus and well-exposed
- [ ] No distracting elements in frame
- [ ] Correct file name
- [ ] Saved as JPG in sRGB color space

## Copyright & Watermarks

**Recommendation**: Do NOT add visible watermarks to images on the website.

The premium design aesthetic is compromised by watermarks. Instead:
- Use metadata copyright information
- Add copyright notice in footer
- Use right-click protection if needed (JavaScript)
- Serve lower resolution images (not print-quality)

If you must watermark:
- Make it subtle (< 30% opacity)
- Place in bottom corner only
- Use small, elegant typography
- Keep it consistent across all images

## Backup Strategy

Always maintain:
1. **Original RAW files** - Never upload these
2. **Master edited TIFFs** - High-quality archive
3. **Web-optimized JPGs** - What goes on the website

Store originals separately from web versions.

## Testing Your Images

After adding images to `/public/images/`:

1. Check all pages load correctly
2. Verify images display at correct sizes
3. Test on mobile, tablet, and desktop
4. Ensure fast loading times
5. Check for visual consistency
6. Verify no distortion or stretching

## Need Help?

If you're unsure about any image:
- Start with your best work
- Quality over quantity
- 30 excellent images > 100 mediocre images
- You can always add more later
