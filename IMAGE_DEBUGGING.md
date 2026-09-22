# Image Loading - Debugging Guide

## ✅ Fix Deployed

I've updated the system to:
1. Search ALL Cloudinary folders (not just `images/`)
2. Create comprehensive path mappings for different filename formats
3. Add console logging to see what's available

---

## 🔍 How to Debug Broken Images

### Step 1: Check Browser Console
1. Open your website: https://www.saleemsnappings.in
2. Press **F12** (or right-click → Inspect)
3. Go to **Console** tab
4. Look for these messages:
   - `"Available image paths:"` - Shows all available images
   - `"Hero image found:"` - Shows the URL being used
   - `"Hero image not found in Cloudinary, using local"` - Image not in Cloudinary

### Step 2: Check What's in Cloudinary
1. Login to Cloudinary: https://console.cloudinary.com
2. Go to **Media Library**
3. Check what folder your uploaded images are in:
   - Are they in `images/` folder?
   - Or in `wildlife/` folder?
   - Note the exact path

### Step 3: Check API Response
1. Open: https://www.saleemsnappings.in/api/admin/images
2. You'll see JSON with all mapped paths
3. Look for your image name in the `images` object
4. Copy the URL and test it directly in browser

---

## 🎯 Common Issues & Solutions

### Issue 1: Image in Wrong Folder
**Symptom:** Uploaded image doesn't show

**Solution:**
- When uploading in admin, the image goes to specific folder
- The API now searches ALL folders
- Check console to see if path is mapped

### Issue 2: Filename Mismatch
**Symptom:** Path looks right but image not loading

**Cause:** Space vs dash vs underscore in filename

**Fix:** The API now creates multiple mappings:
- `/images/hero pg`
- `/images/hero%20pg`
- `/images/hero-pg`
- `/images/hero_pg`

### Issue 3: Extension Missing
**Symptom:** Image has .jpg but code looks for .png

**Fix:** API now tries all combinations:
- With extension: `/images/closing-cta.jpg`
- Without extension: `/images/closing-cta`
- All common extensions: `.jpg`, `.jpeg`, `.png`, `.webp`

---

## 🛠️ Manual Fix (If Still Broken)

If images still show broken icon after deployment:

### Option A: Re-upload the Image
1. Go to admin → IMAGES tab
2. Find the broken image (Hero, Closing CTA, or Contact)
3. Click "Add / Replace"
4. Upload again
5. Wait for success message
6. Hard refresh website (Ctrl+Shift+R)

### Option B: Check Cloudinary Public ID
1. Open browser console on website
2. Type: `fetch('/api/admin/images').then(r=>r.json()).then(console.log)`
3. Press Enter
4. Look at the `images` object
5. Find the URL for your image
6. If it's there, the mapping is working
7. If not, the image isn't in Cloudinary

### Option C: Direct Cloudinary URL
If you know your Cloudinary image URL:
1. The URL format is: `https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1234/path/to/image.jpg`
2. You can update components to use direct URL temporarily
3. Or re-upload through admin

---

## 📊 Current System

### Upload Flow:
```
Admin Upload → Cloudinary → Folder (wildlife/ or images/) → API Maps Paths → Components Fetch
```

### Path Mapping Strategy:
```
Cloudinary public_id: "wildlife/images/hero-pg"
↓
API creates mappings:
- /wildlife/images/hero-pg → [Cloudinary URL]
- /images/hero-pg → [Cloudinary URL]
- /images/hero pg → [Cloudinary URL]
- /images/hero%20pg → [Cloudinary URL]
- /images/hero-pg.png → [Cloudinary URL]
```

### Component Tries Multiple Paths:
```javascript
const heroUrl = data.images['/images/hero pg'] || 
               data.images['/images/hero%20pg'] || 
               data.images['/images/hero pg.png'] ||
               data.images['/images/hero%20pg.png'];
```

---

## 🎯 After Deployment (2 min)

**Test these steps:**

1. **Check Console Logs:**
   - Open homepage
   - Open browser console (F12)
   - Look for "Available image paths:" message
   - Should list all images from Cloudinary

2. **Test API Directly:**
   - Visit: https://www.saleemsnappings.in/api/admin/images
   - Should see JSON with `success: true`
   - Should see `images` object with many paths

3. **Check Background Images:**
   - Homepage hero (top)
   - Homepage closing CTA (bottom)
   - Contact page background
   - All should load (no broken image icon)

4. **If Still Broken:**
   - Note which image is broken
   - Check console for error messages
   - Check Cloudinary Media Library for the file
   - Try re-uploading through admin

---

## ✅ What Was Fixed

1. **Removed `prefix: 'images/'` restriction** - Now searches ALL folders
2. **Added comprehensive path mappings** - Tries multiple filename variations
3. **Added console logging** - Shows what paths are available
4. **Added fallback patterns** - Multiple tries before giving up
5. **Specific mappings for known images** - Hero, Closing CTA, Contact

The system is now much more robust and should find your images regardless of folder structure!
