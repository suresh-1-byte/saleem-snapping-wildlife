"use client";

import imageCompression from "browser-image-compression";

// Cloudinary's free plan rejects images over 10 MB.
const MAX_UPLOAD_BYTES = 9.5 * 1024 * 1024;

export interface UploadedImage {
  url: string;
  publicId: string;
}

interface UploadOptions {
  /** Cloudinary folder: "images", "wildlife/portfolio" or "wildlife/featured". */
  folder: string;
  /** Fixed name to overwrite (e.g. "hero-pg"). Omit to create a new image. */
  publicId?: string;
  /** Metadata stored with the image (wildlife title/location/categories). */
  context?: Record<string, string>;
}

/** Read a JSON response, turning HTML error pages (413, 504, ...) into readable errors. */
export async function readJsonResponse(res: Response) {
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // Not JSON: a platform error page.
  }

  if (!res.ok) {
    const detail = data?.details || data?.error?.message || data?.error;
    throw new Error(
      typeof detail === "string" && detail
        ? detail
        : `Server responded with ${res.status}${res.statusText ? ` ${res.statusText}` : ""}`
    );
  }
  return data;
}

/** Keep the original photo; only shrink files that are too large for Cloudinary. */
async function prepareFile(file: File): Promise<File> {
  if (file.size <= MAX_UPLOAD_BYTES) return file;

  try {
    return await imageCompression(file, {
      maxSizeMB: 9,
      maxWidthOrHeight: 6000,
      useWebWorker: true,
      initialQuality: 0.92,
    });
  } catch {
    throw new Error(
      `This photo is ${(file.size / 1024 / 1024).toFixed(1)} MB. Please upload a JPEG or PNG under 10 MB.`
    );
  }
}

/** Tell the server to refresh cached images so the website shows the change now. */
export async function refreshSiteImages() {
  await fetch("/api/admin/cloudinary/revalidate", { method: "POST" }).catch(() => undefined);
}

/**
 * Upload a photo straight from the browser to Cloudinary (signed by our server),
 * then refresh the website's image cache.
 */
export async function uploadImage(file: File, options: UploadOptions): Promise<UploadedImage> {
  // Some phones report HEIC photos with an empty type, so only reject known non-images.
  if (file.type && !file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }

  const prepared = await prepareFile(file);

  const signRes = await fetch("/api/admin/cloudinary/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options),
  });
  if (signRes.status === 401) {
    throw new Error("Your admin session has expired. Please log in again.");
  }
  const { cloudName, apiKey, params, signature } = await readJsonResponse(signRes);

  const form = new FormData();
  form.append("file", prepared);
  form.append("api_key", apiKey);
  form.append("signature", signature);
  for (const [key, value] of Object.entries(params as Record<string, unknown>)) {
    form.append(key, String(value));
  }

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });
  const result = await readJsonResponse(uploadRes);

  await refreshSiteImages();
  return { url: result.secure_url, publicId: result.public_id };
}
