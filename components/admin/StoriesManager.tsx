"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Story {
  id: string;
  title: string;
  location: string;
  date: string;
  introduction: string;
  content: string;
  heroImage: string;
  images: string[];
  species: string[];
}

export default function StoriesManager() {
  const [stories, setStories] = useState<Story[]>([]);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    fetchStories();
  }, []);

  async function fetchStories() {
    try {
      const res = await fetch("/api/admin/stories");
      if (res.ok) {
        const data = await res.json();
        setStories(data.stories || []);
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  }

  async function handleSaveStory(story: Story) {
    setFormMessage("");
    try {
      const res = await fetch("/api/admin/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(story),
      });

      if (res.ok) {
        setFormMessage("Story saved successfully.");
        fetchStories();
        setShowForm(false);
        setEditingStory(null);
      } else {
        const data = await res.json().catch(() => ({}));
        setFormMessage(data.error || "Could not save the story.");
      }
    } catch (error) {
      console.error("Error saving story:", error);
      setFormMessage("Could not save the story. Check the server and try again.");
    }
  }

  async function uploadStoryPhoto(file: File, slot: "main" | "additional") {
    if (!editingStory) return;

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const imagePath = `/images/story-${editingStory.id}-${slot}-${Date.now()}.${extension}`;
    setUploadingPhoto(slot);
    setFormMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("imagePath", imagePath);
      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setFormMessage("Could not upload that photo.");
        return;
      }

      setEditingStory((current) => {
        if (!current) return current;
        const images = slot === "main"
          ? [imagePath, ...current.images.filter((image) => image !== current.images[0])]
          : [...current.images, imagePath];

        return {
          ...current,
          heroImage: slot === "main" ? imagePath : current.heroImage,
          images,
        };
      });
      setFormMessage("Photo added. Save the story to publish it.");
    } catch (error) {
      setFormMessage("Could not upload that photo.");
    } finally {
      setUploadingPhoto(null);
    }
  }

  function removeStoryPhoto(index: number) {
    setEditingStory((current) => {
      if (!current || index === 0) return current;
      return { ...current, images: current.images.filter((_, photoIndex) => photoIndex !== index) };
    });
  }

  async function handleDeleteStory(id: string) {
    if (!confirm("Are you sure you want to delete this story?")) return;

    try {
      const res = await fetch(`/api/admin/stories?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchStories();
        setFormMessage("Story deleted successfully.");
      } else {
        const data = await res.json().catch(() => ({}));
        setFormMessage(data.error || "Could not delete the story.");
      }
    } catch (error) {
      console.error("Error deleting story:", error);
      setFormMessage("Could not delete the story. Check the server and try again.");
    }
  }

  function handleNewStory() {
    setEditingStory({
      id: Date.now().toString(),
      title: "",
      location: "",
      date: "",
      introduction: "",
      content: "",
      heroImage: "",
      images: [],
      species: [],
    });
    setShowForm(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-wider mb-2">MANAGE STORIES</h2>
          <p className="text-white/60">Add, edit, or delete wildlife stories. The first story is shown as Featured Story on the homepage.</p>
        </div>
        <button
          onClick={handleNewStory}
          className="px-6 py-3 bg-earthy-green hover:bg-earthy-green-light text-white font-medium tracking-wide rounded transition-colors"
        >
          + Add New Story
        </button>
      </div>

      {showForm && editingStory && (
        <div className="bg-charcoal border border-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            {stories.some((story) => story.id === editingStory.id) ? "Edit Story" : "New Story"}
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveStory(editingStory);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={editingStory.title}
                  onChange={(e) =>
                    setEditingStory({ ...editingStory, title: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded focus:outline-none focus:border-earthy-green"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location *</label>
                <input
                  type="text"
                  value={editingStory.location}
                  onChange={(e) =>
                    setEditingStory({ ...editingStory, location: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded focus:outline-none focus:border-earthy-green"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date/Season</label>
              <input
                type="text"
                value={editingStory.date}
                onChange={(e) =>
                  setEditingStory({ ...editingStory, date: e.target.value })
                }
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded focus:outline-none focus:border-earthy-green"
                placeholder="e.g., Winter 2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Introduction *</label>
              <textarea
                value={editingStory.introduction}
                onChange={(e) =>
                  setEditingStory({ ...editingStory, introduction: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded focus:outline-none focus:border-earthy-green"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Story Content *</label>
              <textarea
                value={editingStory.content}
                onChange={(e) =>
                  setEditingStory({ ...editingStory, content: e.target.value })
                }
                rows={8}
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded focus:outline-none focus:border-earthy-green"
                required
              />
            </div>

            <div className="border border-white/10 rounded-lg p-4 space-y-4">
              <div>
                <h4 className="font-semibold">Story Photos</h4>
                <p className="text-sm text-white/60 mt-1">
                  Add the main photo and as many supporting photos as you need.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className="px-4 py-2 bg-earthy-green hover:bg-earthy-green-light rounded text-sm font-medium cursor-pointer transition-colors">
                  {uploadingPhoto === "main" ? "Uploading..." : "Add Main Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingPhoto !== null}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) uploadStoryPhoto(file, "main");
                      event.currentTarget.value = "";
                    }}
                  />
                </label>
                <label className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm font-medium cursor-pointer transition-colors">
                  {uploadingPhoto === "additional" ? "Uploading..." : "Add Supporting Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingPhoto !== null}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) uploadStoryPhoto(file, "additional");
                      event.currentTarget.value = "";
                    }}
                  />
                </label>
              </div>

              {editingStory.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {editingStory.images.map((image, index) => (
                    <div key={image} className="relative aspect-video bg-black/40 border border-white/10 rounded overflow-hidden">
                      <Image src={image} alt={`${editingStory.title || "Story"} photo ${index + 1}`} fill className="object-cover" unoptimized />
                      <div className="p-2 text-xs text-white/70 flex items-center justify-between gap-2">
                        <span>{index === 0 ? "Main photo" : `Photo ${index + 1}`}</span>
                        {index > 0 && (
                          <button type="button" onClick={() => removeStoryPhoto(index)} className="text-red-300 hover:text-red-200">
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-earthy-green hover:bg-earthy-green-light text-white font-medium rounded transition-colors"
              >
                Save Story
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingStory(null);
                }}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {formMessage && (
        <p className="px-4 py-3 rounded border border-earthy-green/40 bg-earthy-green/10 text-earthy-green-light">
          {formMessage}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-charcoal border border-white/10 rounded-lg p-6 hover:border-earthy-green/50 transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">{story.title}</h3>
            {stories[0]?.id === story.id && (
              <span className="inline-block mb-2 px-2 py-1 text-[10px] tracking-widest uppercase bg-earthy-green/20 text-earthy-green-light rounded">
                Homepage Featured Story
              </span>
            )}
            <p className="text-sm text-white/60 mb-4">
              {story.location} • {story.date}
            </p>
            <p className="text-sm text-white/80 mb-4 line-clamp-3">
              {story.introduction}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingStory(story);
                  setShowForm(true);
                }}
                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteStory(story.id)}
                className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 text-sm font-medium rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {stories.length === 0 && !showForm && (
        <div className="text-center py-12 text-white/40">
          <p>No stories yet. Click &quot;Add New Story&quot; to get started.</p>
        </div>
      )}
    </div>
  );
}
