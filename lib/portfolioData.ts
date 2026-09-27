import type { CloudinaryAsset } from "@/lib/cloudinary";

// Portfolio images live in Cloudinary's "wildlife/portfolio" folder; their title,
// location and categories are stored as Cloudinary context metadata.
export interface PortfolioImage {
  id: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  title: string;
  location: string;
  category: string[];
  uploadedAt: string;
}

export function toPortfolioImage(asset: CloudinaryAsset): PortfolioImage {
  const category = (asset.context.category || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return {
    id: asset.publicId,
    cloudinaryUrl: asset.url,
    cloudinaryPublicId: asset.publicId,
    title: asset.context.title || "Untitled",
    location: asset.context.location || "",
    category: category.length > 0 ? category : ["All"],
    uploadedAt: asset.createdAt,
  };
}
