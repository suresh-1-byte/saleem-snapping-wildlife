"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Simulate form submission
    // In production, replace with actual API call
    setTimeout(() => {
      setSubmitMessage("Thank you for your message. I'll get back to you soon.");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm tracking-wider uppercase opacity-80 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 focus:border-white focus:outline-none transition-all duration-300"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm tracking-wider uppercase opacity-80 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 focus:border-white focus:outline-none transition-all duration-300"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm tracking-wider uppercase opacity-80 mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 focus:border-white focus:outline-none transition-all duration-300"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm tracking-wider uppercase opacity-80 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={6}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 focus:border-white focus:outline-none transition-all duration-300 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-10 py-4 bg-white text-black text-sm tracking-widest uppercase font-medium hover:bg-white/90 transition-all duration-300 animation-smooth hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
      >
        {isSubmitting ? "Sending..." : "Get in Touch"}
      </button>

      {submitMessage && (
        <p className="text-sm opacity-90 bg-earthy-green/20 border border-earthy-green/30 px-4 py-3">
          {submitMessage}
        </p>
      )}
    </form>
  );
}
