"use client";

import { useEffect, useState } from "react";
import { readJsonResponse } from "@/lib/adminUpload";
import { EMPTY_CONTACT_SETTINGS, type ContactSettings } from "@/lib/contactSettings";

type Message = { type: "success" | "error"; text: string } | null;

const inputClass =
  "w-full px-4 py-3 bg-black border border-white/20 rounded text-white placeholder-white/40 focus:border-earthy-green focus:outline-none";

export default function ContactManager() {
  const [form, setForm] = useState<ContactSettings>(EMPTY_CONTACT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<Message>(null);

  useEffect(() => {
    fetch("/api/admin/contact", { cache: "no-store" })
      .then(readJsonResponse)
      .then((data) => setForm(data.settings || EMPTY_CONTACT_SETTINGS))
      .catch((error) =>
        setMessage({ type: "error", text: `Could not load contact details: ${error.message}` })
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await readJsonResponse(res);
      setForm(data.settings);
      setMessage({ type: "success", text: "Saved! The Contact page and footer now show these details." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Could not save" });
    } finally {
      setSaving(false);
    }
  }

  const update = (field: keyof ContactSettings) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  if (loading) {
    return <div className="text-center py-12 text-white/60 animate-pulse">Loading contact details...</div>;
  }

  const previewUsername = form.instagramUsername.trim().replace(/^@+/, "");

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold tracking-wider mb-2">CONTACT DETAILS</h2>
        <p className="text-white/60">Shown on the Contact page and in the website footer.</p>
      </div>

      {message && (
        <div
          role="status"
          className={`px-4 py-3 rounded-lg border break-words ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-charcoal border border-white/10 rounded-lg p-4 sm:p-6 space-y-5">
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-2 text-white/90">Email</label>
          <input
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="off"
            value={form.email}
            onChange={update("email")}
            placeholder="e.g. hello@saleemsnappings.in"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-insta-name" className="block text-sm font-medium mb-2 text-white/90">Instagram username</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">@</span>
            <input
              id="contact-insta-name"
              type="text"
              autoCapitalize="off"
              autoCorrect="off"
              value={form.instagramUsername}
              onChange={update("instagramUsername")}
              placeholder="saleemsnapping"
              className={`${inputClass} pl-9`}
            />
          </div>
          <p className="text-xs text-white/50 mt-2">This is the text visitors see.</p>
        </div>

        <div>
          <label htmlFor="contact-insta-link" className="block text-sm font-medium mb-2 text-white/90">Instagram link</label>
          <input
            id="contact-insta-link"
            type="url"
            inputMode="url"
            autoCapitalize="off"
            value={form.instagramUrl}
            onChange={update("instagramUrl")}
            placeholder="https://www.instagram.com/saleemsnapping/"
            className={inputClass}
          />
          <p className="text-xs text-white/50 mt-2">Clicking the username opens this link. Leave empty to use instagram.com/username.</p>
        </div>

        <div className="border border-white/10 rounded p-4 bg-black/40">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Preview on the Contact page</p>
          <p className="text-sm uppercase tracking-wider text-white/60">Email</p>
          <p className="mb-3 break-all">{form.email.trim() || <span className="text-white/30">(hidden — no email set)</span>}</p>
          <p className="text-sm uppercase tracking-wider text-white/60">Instagram</p>
          <p className="break-all">
            {previewUsername ? `@${previewUsername}` : <span className="text-white/30">(hidden — no Instagram set)</span>}
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto px-8 py-3 bg-earthy-green hover:bg-earthy-green-light text-white font-medium tracking-wide rounded transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save contact details"}
        </button>
      </form>
    </div>
  );
}
