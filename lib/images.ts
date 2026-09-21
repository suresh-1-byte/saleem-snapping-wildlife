import fs from "fs/promises";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

export async function getPublicImages(prefix: string) {
  // Try to fetch from Cloudinary first
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: `images/${prefix}-`,
        max_results: 100,
      });

      if (result.resources && result.resources.length > 0) {
        return result.resources
          .sort((a: any, b: any) => {
            const aNum = parseInt(a.public_id.match(/\d+$/)?.[0] || '0');
            const bNum = parseInt(b.public_id.match(/\d+$/)?.[0] || '0');
            return aNum - bNum;
          })
          .map((resource: any) => resource.secure_url);
      }
    } catch (error) {
      console.log('Cloudinary fetch failed, falling back to local:', error);
    }
  }

  // Fallback to local images
  const imagesDirectory = path.join(process.cwd(), "public", "images");

  try {
    const filenames = await fs.readdir(imagesDirectory);
    return filenames
      .filter((filename) => filename.startsWith(`${prefix}-`))
      .filter((filename) => /\.(jpg|jpeg|png|webp|avif)$/i.test(filename))
      .sort((first, second) => first.localeCompare(second, undefined, { numeric: true }))
      .map((filename) => `/images/${filename}`);
  } catch {
    return [];
  }
}
