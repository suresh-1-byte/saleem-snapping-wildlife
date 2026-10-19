// Contact details shown on the Contact page and in the footer, edited from the
// admin panel's Contact tab.

export interface ContactSettings {
  email: string;
  /** Shown to visitors, without the leading "@". */
  instagramUsername: string;
  /** Where the username links to. */
  instagramUrl: string;
}

export const EMPTY_CONTACT_SETTINGS: ContactSettings = {
  email: "",
  instagramUsername: "",
  instagramUrl: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[A-Za-z0-9._]{1,30}$/;

function usernameFromUrl(url: string) {
  try {
    const segment = new URL(url).pathname.split("/").filter(Boolean)[0] || "";
    return USERNAME_PATTERN.test(segment) ? segment : "";
  } catch {
    return "";
  }
}

/**
 * Clean up admin input. Fills in whichever Instagram field was left blank and
 * returns an error message for anything invalid.
 */
export function normalizeContactSettings(
  input: Partial<Record<keyof ContactSettings, unknown>>
): { settings: ContactSettings; error?: string } {
  const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

  const email = text(input.email);
  let instagramUsername = text(input.instagramUsername).replace(/^@+/, "");
  let instagramUrl = text(input.instagramUrl);

  if (instagramUrl && !/^https?:\/\//i.test(instagramUrl)) {
    instagramUrl = `https://${instagramUrl}`;
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    return { settings: EMPTY_CONTACT_SETTINGS, error: "Please enter a valid email address." };
  }
  if (instagramUsername && !USERNAME_PATTERN.test(instagramUsername)) {
    return {
      settings: EMPTY_CONTACT_SETTINGS,
      error: "Instagram username can only use letters, numbers, dots and underscores (max 30).",
    };
  }
  if (instagramUrl) {
    try {
      const url = new URL(instagramUrl);
      if (!/^https?:$/.test(url.protocol) || !url.hostname.includes(".")) throw new Error();
    } catch {
      return { settings: EMPTY_CONTACT_SETTINGS, error: "Please enter a valid Instagram link." };
    }
  }

  if (instagramUsername && !instagramUrl) {
    instagramUrl = `https://www.instagram.com/${instagramUsername}/`;
  }
  if (instagramUrl && !instagramUsername) {
    instagramUsername = usernameFromUrl(instagramUrl);
    if (!instagramUsername) {
      return { settings: EMPTY_CONTACT_SETTINGS, error: "Please enter the Instagram username too." };
    }
  }

  return { settings: { email, instagramUsername, instagramUrl } };
}
