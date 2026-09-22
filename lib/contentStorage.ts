import { v2 as cloudinary } from "cloudinary";
import { readJSON, writeJSON } from "@/lib/db";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

const CONTENT_FOLDER = "wildlife/content";

function canUseCloudinary() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

function publicIdFor(filename: string) {
  return `${CONTENT_FOLDER}/${filename.replace(/\.json$/, "")}`;
}

export async function readContent<T>(filename: string, key: string): Promise<T[]> {
  if (canUseCloudinary()) {
    try {
      const resource = await cloudinary.api.resource(publicIdFor(filename), {
        resource_type: "raw",
      });
      const response = await fetch(`${resource.secure_url}?v=${Date.now()}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`Could not fetch ${filename}`);
      const data = await response.json();
      return Array.isArray(data[key]) ? data[key] : [];
    } catch (error) {
      console.error(`Cloudinary read failed for ${filename}:`, error);
    }
  }

  const data = await readJSON(filename);
  return Array.isArray(data?.[key]) ? data[key] : [];
}

export async function writeContent<T>(filename: string, key: string, items: T[]) {
  const data = { [key]: items };

  if (canUseCloudinary()) {
    const json = JSON.stringify(data);
    const dataUri = `data:application/json;base64,${Buffer.from(json).toString("base64")}`;
    await cloudinary.uploader.upload(dataUri, {
      resource_type: "raw",
      public_id: publicIdFor(filename),
      overwrite: true,
      invalidate: true,
    });
    return;
  }

  await writeJSON(filename, data);
}