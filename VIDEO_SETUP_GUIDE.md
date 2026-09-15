# Scroll-Controlled Video Setup Guide

## ✅ What's Implemented

Your website now has a **scroll-controlled video section** that:
- ✨ **Pins the section** - Page stops scrolling when video section is reached
- 🎬 **Plays on scroll** - Video advances frame-by-frame as you scroll down
- ⏪ **Rewinds on scroll up** - Video plays backwards when scrolling up
- ⏸️ **Pauses when you stop** - Video freezes at current frame
- 📏 **300% scroll length** - Section stays pinned for 3x viewport height
- ➡️ **Continues after** - Normal scrolling resumes after video completes

---

## 📹 Add Your Video

### Step 1: Prepare Your Video

**Recommended specs:**
- **Duration**: 10-30 seconds
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Format**: MP4 (H.264 codec)
- **File size**: Under 20MB (compressed)
- **Frame rate**: 24-30 fps
- **Aspect ratio**: 16:9

### Step 2: Convert/Optimize Your Video

Use a tool like:
- **HandBrake** (free) - https://handbrake.fr/
- **FFmpeg** - `ffmpeg -i input.mp4 -vcodec h264 -acodec aac output.mp4`
- **Online tools** - CloudConvert, Online-Convert

### Step 3: Place Your Video

Save your video file as:
```
public/videos/camera-animation.mp4
```

**Full path:**
```
C:\Users\Suresh K\Downloads\Saleem Snapping Wildlife Website\Saleem Snapping Wildlife Website\public\videos\camera-animation.mp4
```

### Step 4: Test

1. Place video file in `public/videos/` folder
2. Refresh the website (Ctrl + F5)
3. Scroll to the camera section
4. The video should now play with your scroll!

---

## 🎥 How to Create a Camera Animation Video

### Option 1: Screen Record the 3D Animation

1. Run the website with the 3D camera animation
2. Use screen recording software (OBS, Windows Game Bar)
3. Record the camera animation section
4. Export as MP4
5. Place in `public/videos/camera-animation.mp4`

### Option 2: Use Your Own Video

Any camera-related video works:
- Camera flythrough animation
- Product showcase video
- Wildlife photography montage
- Behind-the-scenes footage

### Option 3: Use Stock Video

Free sources:
- **Pexels Videos** - https://www.pexels.com/videos/
- **Pixabay Videos** - https://pixabay.com/videos/
- **Coverr** - https://coverr.co/

Search for: "camera", "photography", "wildlife", "lens"

---

## 🔧 Troubleshooting

### Video Not Playing
✅ **Check file location**: `public/videos/camera-animation.mp4`
✅ **Check file name**: Must be exactly `camera-animation.mp4`
✅ **Check format**: MP4 with H.264 codec
✅ **Hard refresh**: Press Ctrl + F5 in browser
✅ **Check browser console**: F12 → Console for errors

### Video Stuttering
- Reduce video file size
- Lower resolution (try 1280x720)
- Compress video more
- Use WebM format alternative

### Section Not Pinning
- Clear browser cache
- Check browser console for errors
- Ensure GSAP ScrollTrigger is loaded

### Video Too Fast/Slow
Edit the `end` value in `CameraScrollSection.tsx`:
```tsx
end: "+=300%"  // Change to +=200% (faster) or +=400% (slower)
```

---

## 🎨 Customization

### Change Pin Duration

Edit `components/CameraScrollSection.tsx`:
```tsx
end: "+=300%"  // ±= [viewport height multiplier]
```

- `+=200%` = Faster (2x viewport)
- `+=300%` = Default (3x viewport)
- `+=400%` = Slower (4x viewport)
- `+=500%` = Very slow (5x viewport)

### Change Overlay Text

```tsx
<h2>THROUGH THE LENS</h2>  // Change this
<p>Scroll to explore</p>   // Change this
```

### Adjust Video Overlay Darkness

```tsx
<div className="absolute inset-0 bg-black/30" />
//                                    ↑ Change this number
// /10 = light, /30 = medium, /50 = dark, /70 = very dark
```

---

## 📱 Mobile Behavior

The scroll-controlled video works on mobile with touch gestures:
- **Swipe down** = Play forward
- **Swipe up** = Rewind
- **Hold** = Freeze frame

---

## ⚡ Current Status

**Without video file:**
- Section still pins correctly
- Shows black screen with text overlay
- Scroll behavior works
- Ready for video file

**With video file:**
- Full scroll-controlled playback
- Forward/reverse scrubbing
- Frame-perfect control
- Professional effect

---

## 🎬 What You Have Now

```
Homepage Flow:
├── Hero Section (wildlife typography)
├── Intro Section
├── 📹 Camera Video Section (SCROLL-CONTROLLED)
│   ├── Pins on arrival
│   ├── Video plays with scroll
│   ├── 300% scroll duration
│   └── Unpins when complete
├── Featured Work
├── Featured Story
├── Species Preview
└── Closing CTA
```

**The scroll-controlled video section is fully functional and ready for your video file!** 🎉

Just add `camera-animation.mp4` to `public/videos/` and it will work perfectly.
