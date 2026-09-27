// Server-only: uses the Cloudinary API secret.
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import type { SiteImageMap } from "@/lib/siteImages";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  secure: true,
});

export { cloudinary };

/** Cache tag shared by every Cloudinary read; cleared whenever the admin changes anything. */
export const CLOUDINARY_CACHE_TAG = "cloudinary";

/** Folders the admin panel is allowed to upload into and delete from. */
export const MANAGED_FOLDERS = ["images", "wildlife/portfolio", "wildlife/featured"] as const;

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

export function isManagedPublicId(publicId: string) {
  return MANAGED_FOLDERS.some((folder) => publicId.startsWith(`${folder}/`));
}

/** Readable Cloudinary error text. Never log the raw error: it includes the API secret. */
export function cloudinaryErrorMessage(error: unknown) {
  const err = error as { message?: string; error?: { message?: string } } | undefined;
  return err?.error?.message || err?.message || "Unknown Cloudinary error";
}

export interface CloudinaryAsset {
  publicId: string;
  url: string;
  createdAt: string;
  context: Record<string, string>;
}

async function fetchAssets(prefix: string): Promise<CloudinaryAsset[]> {
  const assets: CloudinaryAsset[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix,
      max_results: 500,
      context: true,
      next_cursor: nextCursor,
    });

    for (const resource of result.resources) {
      assets.push({
        publicId: resource.public_id,
        url: resource.secure_url,
        createdAt: resource.created_at,
        context: resource.context?.custom ?? {},
      });
    }
    nextCursor = result.next_cursor;
  } while (nextCursor);

  // Newest first, so admin and website always show the same order.
  return assets.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// Cloudinary's Admin API is rate limited (500 calls/hour on the free plan), so
// listings are cached and shared by every visitor. Admin changes clear the cache
// immediately via revalidateCloudinary(); the timeout is only a safety net for
// edits made directly in the Cloudinary console.
const cachedAssets = unstable_cache(fetchAssets, ["cloudinary-assets-v1"], {
  tags: [CLOUDINARY_CACHE_TAG],
  revalidate: 300,
});

/** All images under a folder prefix (e.g. "wildlife/portfolio/"), newest first. */
export async function listAssets(prefix: string): Promise<CloudinaryAsset[]> {
  if (!isCloudinaryConfigured()) return [];
  try {
    return await cachedAssets(prefix);
  } catch (error) {
    console.error(`Cloudinary listing failed for "${prefix}": ${cloudinaryErrorMessage(error)}`);
    return [];
  }
}

/** Uploaded replacements for the website's fixed images, keyed by public ID. */
export async function getSiteImageMap(): Promise<SiteImageMap> {
  const assets = await listAssets("images/");
  return Object.fromEntries(assets.map((asset) => [asset.publicId, asset.url]));
}

/** Call after any admin change so the website and admin panel show it right away. */
export function revalidateCloudinary() {
  revalidateTag(CLOUDINARY_CACHE_TAG);
  revalidatePath("/", "layout");
}
