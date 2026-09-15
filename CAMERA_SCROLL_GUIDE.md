# 3D Camera Scroll Section Guide

## Overview
A stunning 3D camera animation section that uses React Three Fiber and GSAP ScrollTrigger to create an immersive scroll experience between your Hero and Featured Work sections.

## Features Implemented

### ✅ 5-Stage Scroll Animation
1. **Entry (0-20%)**: Camera slides in from right side-profile
2. **Explosion (20-40%)**: Body shifts right, lens assembly shifts left
3. **Lens Separation (40-60%)**: Glass elements separate along Z-axis
4. **Rotation (60-75%)**: Assembly rotates to face viewer straight-on
5. **Zoom & Transition (75-100%)**: Zooms through center, fades to black

### ✅ Technical Features
- **Pinned Section**: 400vh scroll duration
- **Studio Lighting**: Realistic PBR environment
- **Fallback Model**: Procedural camera renders if GLTF not found
- **Responsive**: Scales properly on desktop and mobile
- **Clean Cleanup**: GSAP context properly disposed on unmount
- **Smooth Scrubbing**: `scrub: 1` for butter-smooth animation

## File Structure

```
components/
└── CameraScrollSection.tsx

public/
└── models/
    └── camera_exploded.glb (optional - fallback provided)
```

## Usage

The component is already integrated into your homepage between Intro and Featured Work sections.

```tsx
import CameraScrollSection from "@/components/CameraScrollSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <CameraScrollSection />  {/* 3D Camera Animation */}
      <FeaturedWork />
      {/* ... */}
    </>
  );
}
```

## 3D Model Setup (Optional)

### Using the Fallback
The component works immediately with a beautiful procedural camera. No 3D model file needed!

### Adding Custom Model
1. Find or create a camera 3D model
2. Export as `.glb` format
3. Place at: `public/models/camera_exploded.glb`
4. Reload the page

**Recommended Model Sources:**
- Sketchfab (search "camera" with downloadable filter)
- Free3D.com
- CGTrader free section
- Create in Blender

## Customization

### Adjust Animation Timing
Edit the timeline positions in `CameraScrollSection.tsx`:

```tsx
// Current: Stage 1 at 0s, Stage 2 at 1s, etc.
tl.to(/* ... */, 1);  // Change the number to adjust timing
```

### Change Scroll Duration
Modify the ScrollTrigger end value:

```tsx
end: "+=400%",  // Change to "+=300%" for shorter, "+=500%" for longer
```

### Adjust Camera Movement
Modify the position values:

```tsx
{ x: 1.5 }  // Increase for more separation
{ z: 2.4 }  // Increase for deeper lens separation
```

### Text Overlay
Edit the text in the overlay section:

```tsx
<h2>THROUGH THE LENS</h2>
<p>Every detail matters</p>
```

## Performance Notes

- **Mobile**: Automatically scales canvas resolution
- **Optimization**: Models are preloaded
- **Fallback**: Lightweight procedural geometry if GLTF missing
- **Cleanup**: Proper disposal prevents memory leaks

## Troubleshooting

### White/Blank Canvas
- Check browser console for errors
- Ensure dependencies installed: `npm install`
- Try disabling browser extensions

### Animation Not Smooth
- Reduce `end` value (less scroll distance)
- Check for other scroll animations conflicting
- Ensure hardware acceleration enabled in browser

### Model Not Loading
- Verify file path: `public/models/camera_exploded.glb`
- Check file format is `.glb` not `.gltf`
- Fallback camera will render automatically

## Dependencies

```json
{
  "three": "^0.x.x",
  "@react-three/fiber": "^8.x.x",
  "@react-three/drei": "^9.x.x",
  "gsap": "^3.x.x"
}
```

Already installed via `--legacy-peer-deps` flag.

## Future Enhancements

Ideas for extending the animation:
- Add camera flash light effect
- Include shutter sound effects
- Particle effects during explosion
- Interactive controls (pause/play)
- Mouse parallax on camera rotation
- Add aperture blades animation
- Include focus ring rotation

## Credits

- **Three.js**: 3D rendering engine
- **React Three Fiber**: React renderer for Three.js  
- **@react-three/drei**: Useful helpers and abstractions
- **GSAP ScrollTrigger**: Scroll-linked animations
