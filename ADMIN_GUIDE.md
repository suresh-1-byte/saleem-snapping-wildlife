# Admin Panel Guide

## Accessing the Admin Panel

1. **Navigate to the admin login page:**
   ```
   http://localhost:3000/admin/login
   ```

2. **Default credentials:**
   - Username: `admin`
   - Password: `admin123`

3. **Change credentials** (recommended for production):
   - Edit `.env.local` file
   - Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` to your preferred values

## Admin Features

### 📸 Images Manager
- **Replace any image** on the website with a single click
- **Categories included:**
  - Hero & Background images
  - Featured Work (6 images)
  - Portfolio images (6 images)
  - Species category thumbnails
  - Story images
  - About page portrait

**How to use:**
1. Go to "IMAGES" tab
2. Find the image you want to replace
3. Click "Replace Image"
4. Select your new image file
5. The image will be uploaded and automatically replaced

### 📖 Stories Manager
- **Add new wildlife stories**
- **Edit existing stories**
- **Delete stories**

**Story fields:**
- Title (required)
- Location (required)
- Date/Season
- Introduction (required)
- Story Content (required)
- Hero Image
- Supporting Images
- Species List

**How to use:**
1. Go to "STORIES" tab
2. Click "+ Add New Story"
3. Fill in the story details
4. Click "Save Story"

### 🦁 Species Manager
- **Add new species entries**
- **Edit species information**
- **Delete species**

**Species fields:**
- Common Name (required)
- Scientific Name (optional, italicized)
- Category (Birds, Mammals, Macro, Reptiles, Amphibians)
- Locations (where you've photographed them)
- Observations/Notes

**How to use:**
1. Go to "SPECIES" tab
2. Click "+ Add New Species"
3. Fill in the species details
4. Click "Save Species"

## Important Notes

### Security
- Always change the default credentials in production
- The admin panel is protected by JWT authentication
- Sessions last for 24 hours

### Image Guidelines
- **Recommended formats:** JPG, PNG
- **Recommended size:** Optimize images before uploading (1920px width max)
- **Quality:** High-quality images look best but balance with file size

### Logout
- Click the "Logout" button in the top-right corner
- You'll be redirected to the login page

## Troubleshooting

### Can't login?
- Check that `.env.local` file exists
- Verify credentials match those in `.env.local`
- Restart the development server

### Image not updating?
- Try clearing your browser cache (Ctrl + F5)
- Check that the image file is valid
- Ensure you have write permissions in the `public/images` folder

### Data not saving?
- Check that the `data` folder exists in the project root
- Verify you're logged in (check for admin_token cookie)
- Check browser console for errors

## Production Deployment

Before deploying to production:

1. **Change credentials in `.env` (or environment variables):**
   ```
   ADMIN_USERNAME=your-secure-username
   ADMIN_PASSWORD=your-very-secure-password
   JWT_SECRET=your-long-random-secret-key
   ```

2. **Secure the admin routes** (add rate limiting, etc.)

3. **Set up HTTPS** (required for secure authentication)

4. **Regular backups** of the `data` folder

## File Structure

```
project/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx          # Login page
│   │   └── dashboard/page.tsx      # Main dashboard
│   └── api/
│       └── admin/
│           ├── login/route.ts      # Authentication
│           ├── logout/route.ts     # Logout
│           ├── upload-image/route.ts # Image uploads
│           ├── stories/route.ts    # Stories CRUD
│           └── species/route.ts    # Species CRUD
├── components/
│   └── admin/
│       ├── AdminDashboard.tsx      # Main dashboard UI
│       ├── ImagesManager.tsx       # Image management
│       ├── StoriesManager.tsx      # Story management
│       └── SpeciesManager.tsx      # Species management
├── lib/
│   ├── auth.ts                     # Authentication logic
│   └── db.ts                       # Data persistence
├── data/                           # JSON data storage
│   ├── stories.json
│   └── species.json
└── .env.local                      # Environment variables
```

## Support

For issues or questions, check:
- Browser console for error messages
- Server logs in the terminal
- This guide for common solutions
