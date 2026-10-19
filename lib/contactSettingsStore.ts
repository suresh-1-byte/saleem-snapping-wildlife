// Server-only: reads and writes contact settings in Cloudinary.
import { unstable_cache } from "next/cache";
import { readContent, writeContent } from "@/lib/contentStorage";
import { CLOUDINARY_CACHE_TAG } from "@/lib/cloudinary";
import { EMPTY_CONTACT_SETTINGS, normalizeContactSettings, type ContactSettings } from "@/lib/contactSettings";

// Stored like stories and species: { "contact": [ { ...settings } ] } in settings.json.
const FILE = "settings.json";
const KEY = "contact";

/** Uncached read, for the admin panel. */
export async function readContactSettings(): Promise<ContactSettings> {
  const [stored] = await readContent<ContactSettings>(FILE, KEY);
  return stored ? normalizeContactSettings(stored).settings : EMPTY_CONTACT_SETTINGS;
}

export async function saveContactSettings(settings: ContactSettings) {
  await writeContent(FILE, KEY, [settings]);
}

/** Cached for visitors; saving in the admin panel clears the cache immediately. */
export const getContactSettings = unstable_cache(readContactSettings, ["contact-settings-v1"], {
  tags: [CLOUDINARY_CACHE_TAG],
  revalidate: 300,
});
