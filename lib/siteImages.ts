// Shared (browser + server) helpers for resolving website images.
//
// Every fixed image on the site has a local default in /public/images and an
// optional replacement uploaded from the admin panel to Cloudinary. The
// replacement's public ID is derived from the local path, e.g.
//   "/images/hero%20pg.png"  ->  "images/hero-pg"
// so the admin panel and the website always agree on which image is live.

/** Map of Cloudinary public ID -> secure URL, for everything under "images/". */
export type SiteImageMap = Record<string, string>;

const CLOUDINARY_UPLOAD_URL = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/;

function sanitizeSegment(segment: string) {
  return segment.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function isAbsoluteUrl(path: string) {
  return /^(https?:)?\/\//.test(path) || path.startsWith("data:") || path.startsWith("blob:");
}

/**
 * Cloudinary public ID for a local image path.
 * "/images/hero%20pg.png" -> "images/hero-pg". Returns null for absolute URLs.
 */
export function publicIdForPath(path: string): string | null {
  if (!path || isAbsoluteUrl(path)) return null;

  let decoded = path;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    // Keep the raw path if it isn't valid URI encoding.
  }

  const parts = decoded.replace(/^[/\\]+/, "").split("/");
  const filename = sanitizeSegment((parts.pop() || "").replace(/\.[^/.]+$/, ""));
  const folder = parts.map(sanitizeSegment).filter(Boolean).join("/");

  if (!filename) return null;
  return folder ? `${folder}/${filename}` : filename;
}

/** The uploaded Cloudinary URL for a local image path, or the local path itself. */
export function resolveSiteImage(path: string, images: SiteImageMap): string {
  if (!path) return path;
  const publicId = publicIdForPath(path);
  return (publicId && images[publicId]) || path;
}

/** True when an admin upload is replacing the local default for this path. */
export function hasUploadedImage(path: string, images: SiteImageMap): boolean {
  const publicId = publicIdForPath(path);
  return Boolean(publicId && images[publicId]);
}

interface DeliveryOptions {
  /** Longest edge in pixels. Omit to keep the original resolution. */
  width?: number;
  /** "auto:best" keeps photos visually identical to the original file. */
  quality?: "auto" | "auto:good" | "auto:best";
}

/**
 * Deliver a Cloudinary image in the best format for the visitor's browser
 * (WebP/AVIF, and JPEG for iPhone HEIC uploads), optionally capped in size.
 * Non-Cloudinary URLs and already-transformed URLs are returned unchanged.
 */
export function deliveryUrl(url: string, { width, quality = "auto:good" }: DeliveryOptions = {}): string {
  const match = url?.match(CLOUDINARY_UPLOAD_URL);
  if (!match) return url;

  const [, base, rest] = match;
  // Untransformed URLs look like ".../upload/v1790099563/images/hero-pg.png".
  if (!/^v\d+\//.test(rest)) return url;

  const transformation = ["f_auto", `q_${quality}`, width ? `c_limit,w_${width}` : null]
    .filter(Boolean)
    .join(",");
  return `${base}${transformation}/${rest}`;
}
