# Admin Dashboard - Wildlife Management Update

## Tasks:

### 1. ✅ Fix Navigation
- Tabs stay in admin (don't redirect to website)
- Current tabs work correctly (using `<button>` with `onClick`)
- Issue might be with clicking inside tab content

### 2. ✅ Add Wildlife Tab
- New tab in admin: "🌿 WILDLIFE"
- Manage wildlife gallery photos
- Add photos with descriptions
- CRUD operations (Create, Read, Update, Delete)

### 3. ✅ Create WildlifeManager Component
Features:
- Upload wildlife photos
- Add description for each photo
- Edit existing photos
- Delete photos
- Reorder photos (optional)

### 4. ✅ Create API Routes
- `/api/admin/wildlife` - GET/POST/DELETE
- Manage wildlife photos in JSON file or database

### 5. ✅ Update Wildlife Page
- Same font for descriptions as photo captions
- Use consistent typography

## Implementation Plan:

1. Create `components/admin/WildlifeManager.tsx`
2. Add wildlife tab to AdminDashboard
3. Create API route `/app/api/admin/wildlife/route.ts`
4. Update wildlife page typography
5. Create data structure for wildlife photos

Ready to implement!
