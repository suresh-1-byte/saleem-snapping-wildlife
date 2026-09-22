"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImagesManager from "./ImagesManager";
import PortfolioManager from "./PortfolioManager";
import FeaturedManager from "./FeaturedManager";
import StoriesManager from "./StoriesManager";
import SpeciesManager from "./SpeciesManager";

type Tab = "portfolio" | "featured" | "images" | "stories" | "species";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("portfolio");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-charcoal border-b border-white/10 sticky top-0 z-50">
        <div className="container-padding">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-bold tracking-wider">SALEEM SNAPPING</h1>
              <p className="text-xs text-white/60">Content Management System</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                View Website →
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-charcoal/50 border-b border-white/10">
        <div className="container-padding">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`px-6 py-3 text-sm font-medium tracking-wider transition-colors whitespace-nowrap ${
                activeTab === "portfolio"
                  ? "bg-earthy-green text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              🖼️ PORTFOLIO
            </button>
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-6 py-3 text-sm font-medium tracking-wider transition-colors whitespace-nowrap ${
                activeTab === "featured"
                  ? "bg-earthy-green text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              ⭐ FEATURED
            </button>
            <button
              onClick={() => setActiveTab("images")}
              className={`px-6 py-3 text-sm font-medium tracking-wider transition-colors whitespace-nowrap ${
                activeTab === "images"
                  ? "bg-earthy-green text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              📸 BACKGROUNDS
            </button>
            <button
              onClick={() => setActiveTab("stories")}
              className={`px-6 py-3 text-sm font-medium tracking-wider transition-colors whitespace-nowrap ${
                activeTab === "stories"
                  ? "bg-earthy-green text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              📖 STORIES
            </button>
            <button
              onClick={() => setActiveTab("species")}
              className={`px-6 py-3 text-sm font-medium tracking-wider transition-colors whitespace-nowrap ${
                activeTab === "species"
                  ? "bg-earthy-green text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              🦁 SPECIES
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-padding py-8">
        {activeTab === "portfolio" && <PortfolioManager />}
        {activeTab === "featured" && <FeaturedManager />}
        {activeTab === "images" && <ImagesManager />}
        {activeTab === "stories" && <StoriesManager />}
        {activeTab === "species" && <SpeciesManager />}
      </div>
    </div>
  );
}
