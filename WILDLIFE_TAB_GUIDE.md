# 🦅 WILDLIFE TAB - Simple Guide

## ✅ What's New

**NEW "WILDLIFE" TAB** in admin panel - the FIRST tab you see when you login!

This is your main page for managing all wildlife gallery images that appear on:
👉 https://www.saleemsnappings.in/wildlife

---

## 🎯 How to Use

### Step 1: Login to Admin
- Go to: https://www.saleemsnappings.in/admin/login
- Username: `admin`
- Password: `admin123`
- You'll see **WILDLIFE** tab first (🦅 WILDLIFE)

### Step 2: Add Your First Image
1. Click **"+ Add New Image"** button
2. A form will appear with:
   - **Select Image** - Choose your photo file
   - **Title** - Name of the photo (e.g., "Great Egret at Dawn")
   - **Location** - Where you took it (e.g., "Vedanthangal, Tamil Nadu")
   - **Categories** - Click one or more:
     - Birds
     - Mammals
     - Macro
     - Landscapes
     - Wildlife Moments

3. Click **"Upload Wildlife Image"**
4. Wait for success message
5. Your image appears in the grid below!

### Step 3: View on Website
- Open: https://www.saleemsnappings.in/wildlife
- Your image is now visible with handwritten caption style
- Click categories at top to filter images

---

## 📸 Features

### Image Preview
- When you select an image, you'll see a preview before uploading
- Helps you confirm it's the right photo

### All Fields Required
- You MUST fill: Image, Title, Location, and at least 1 Category
- If you miss any, you'll get an error message

### Image Grid View
- All uploaded images shown in a grid
- Each card shows:
  - Image thumbnail
  - Title
  - Location
  - Category tags
  - Upload date
  - Delete button

### Delete Images
- Click "🗑️ Delete" button on any image
- Confirmation popup appears
- Image deleted from both admin and website

---

## 🎨 Categories Explained

**Birds** - All bird photography (eagles, kingfishers, herons, etc.)

**Mammals** - Tigers, elephants, deer, monkeys, etc.

**Macro** - Close-up shots (insects, flowers, details)

**Landscapes** - Scenic wildlife habitats, forests, lakes

**Wildlife Moments** - Action shots, behavioral photos, special moments

💡 **Tip**: You can select MULTIPLE categories for one image!
Example: A photo of a bird catching fish could be both "Birds" AND "Wildlife Moments"

---

## 🔄 Sync Between Admin & Website

### Perfect Sync:
- **Add image** → Shows on /wildlife page immediately
- **Delete image** → Disappears from /wildlife page immediately
- **Admin shows exact same images** as website

### How It Works:
1. You upload image to admin
2. Image goes to Cloudinary (cloud storage)
3. Details saved to `data/portfolio.json` file
4. Website reads from same JSON file
5. = Perfect sync!

---

## 📱 What You'll See on Website

When users visit https://www.saleemsnappings.in/wildlife:

1. **Header** - "The Wild, As I See It" in handwritten font
2. **Category Filters** - All, Birds, Mammals, Macro, Landscapes, Wildlife Moments
3. **Photo Grid** - Your images displayed like polaroid photos:
   - Tilted angles (realistic photo layout)
   - White borders (photo frame style)
   - Handwritten captions with Title and Location
   - Hover effect (lifts up)
   - Click to open lightbox (full-screen view)

---

## ⚠️ Important Notes

### Empty State
- If no images uploaded yet, you'll see:
  - "📸 No wildlife images yet"
  - "Start building your wildlife gallery"
  - Button to add first image

### Image Compression
- Images automatically compressed before upload
- Max size: 3MB
- Max dimensions: 2400px
- Keeps quality good while loading fast

### Categories Are Filterable
- Users can click category buttons on /wildlife page
- Only images with that category will show
- "All" button shows everything

---

## 🚀 Quick Start Example

**Let's add your first wildlife image:**

1. Login → Click **WILDLIFE** tab
2. Click **+ Add New Image**
3. Select a photo of a tiger
4. Fill form:
   - Title: `Bengal Tiger at Sunset`
   - Location: `Bandipur National Park, Karnataka`
   - Categories: Check **Mammals** and **Wildlife Moments**
5. Click **Upload Wildlife Image**
6. ✓ Success! Image uploaded
7. Open https://www.saleemsnappings.in/wildlife
8. See your tiger photo with handwritten caption!

---

## 📊 Admin Tabs Overview

Now you have 5 tabs:

1. **🦅 WILDLIFE** (NEW!) - Main gallery images for /wildlife page
2. **⭐ FEATURED** - Homepage featured work section
3. **📸 BACKGROUNDS** - Site backgrounds, species thumbnails, watermarks
4. **📖 STORIES** - Blog stories
5. **🦁 SPECIES** - Species information pages

---

## ✅ Everything Working Now

- ✅ Wildlife tab is first tab
- ✅ Simple form: Image + Title + Location + Categories
- ✅ Image preview before upload
- ✅ Admin and website perfectly synced
- ✅ Images show on /wildlife page immediately
- ✅ Delete works instantly
- ✅ Category filtering works
- ✅ Handwritten style captions
- ✅ Empty state when no images

**Deployed to:** https://www.saleemsnappings.in

**Admin panel:** https://www.saleemsnappings.in/admin/login
