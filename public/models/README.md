# 3D Models Directory

## Camera Model Setup

Place your 3D camera model file here: `camera_exploded.glb`

### Model Requirements

- **Format:** GLTF/GLB (`.glb` recommended for single file)
- **File name:** `camera_exploded.glb`
- **Recommended structure:**
  - Camera body as one group/mesh
  - Lens assembly as separate group
  - Individual lens elements as separate meshes (if possible)

### Model Tips

1. **Scale:** Model should be roughly 1-2 units in size
2. **Origin:** Center the model at (0, 0, 0)
3. **Orientation:** Camera facing left (-X direction) works best for the side-profile entry animation
4. **Materials:** PBR materials work best with the studio lighting
5. **Optimization:** Keep polygon count reasonable (< 50k triangles recommended)

### Creating/Finding Camera Models

**Option 1: Free Resources**
- Sketchfab (search for camera models with CC license)
- CGTrader Free section
- TurboSquid Free 3D Models

**Option 2: Create Your Own**
- Use Blender (free) to model a simple camera
- Export as GLTF/GLB format
- Ensure proper naming for body/lens parts

**Option 3: Use the Fallback**
- The component includes a procedural fallback camera
- It renders automatically if `camera_exploded.glb` is not found
- The fallback demonstrates all animation stages

### Fallback Behavior

If `camera_exploded.glb` is not found, the component will automatically render a procedural camera made from:
- Box geometry for the camera body
- Cylinder geometries for the lens assembly
- Semi-transparent cylinders for glass lens elements
- Additional details for viewfinder and grip

This ensures the animation works beautifully even without a custom 3D model!

### Testing the Component

The component will work immediately with the fallback camera. Add your custom model later to enhance the visual fidelity.
