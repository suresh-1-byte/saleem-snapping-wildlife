import fs from "fs/promises";
import path from "path";

export async function getPublicImages(prefix: string) {
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
