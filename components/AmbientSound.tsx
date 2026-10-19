"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const SOUND_SRC = "/audio/forest-ambience.mp3";
const PREFERENCE_KEY = "ambient-sound";
// Events browsers accept as permission to start audio.
const GESTURE_EVENTS = ["pointerdown", "keydown", "touchend", "click"] as const;

interface AmbientSoundState {
  /** Sound is audible right now. */
  isPlaying: boolean;
  /** The visitor wants sound on (it may be waiting for their first tap). */
  isEnabled: boolean;
  toggle: () => void;
}

const AmbientSoundContext = createContext<AmbientSoundState>({
  isPlaying: false,
  isEnabled: false,
  toggle: () => {},
});

export const useAmbientSound = () => useContext(AmbientSoundContext);

function readPreference(): boolean {
  try {
    return window.localStorage.getItem(PREFERENCE_KEY) !== "off";
  } catch {
    return true;
  }
}

function savePreference(enabled: boolean) {
  try {
    window.localStorage.setItem(PREFERENCE_KEY, enabled ? "on" : "off");
  } catch {
    // Storage unavailable (private mode); the choice lasts for this visit only.
  }
}

/**
 * Forest ambience that starts when the site opens and keeps playing across
 * page changes (it lives in the root layout, so it is never unmounted while
 * browsing). Browsers block sound until the visitor first interacts with the
 * page, so if autoplay is refused it starts on their first tap, click or key.
 */
export function AmbientSoundProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const enabledRef = useRef(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !enabledRef.current) return false;
    try {
      if (audio.error) audio.load();
      await audio.play();
      return true;
    } catch {
      // Blocked until the visitor interacts, or a network hiccup.
      return false;
    }
  }, []);

  useEffect(() => {
    enabledRef.current = readPreference();
    setIsEnabled(enabledRef.current);
    if (!enabledRef.current) return;

    const removeGestureListeners = () =>
      GESTURE_EVENTS.forEach((type) => document.removeEventListener(type, onGesture, true));

    async function onGesture(event: Event) {
      // The music button handles its own clicks.
      if ((event.target as Element | null)?.closest?.("[data-ambient-toggle]")) return;
      if (await play()) removeGestureListeners();
    }

    play().then((started) => {
      if (!started && enabledRef.current) {
        GESTURE_EVENTS.forEach((type) => document.addEventListener(type, onGesture, true));
      }
    });

    // Resume if the browser paused us (e.g. phone call, tab sleeping).
    const onVisible = () => {
      if (document.visibilityState === "visible" && audioRef.current?.paused) play();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      removeGestureListeners();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [play]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      enabledRef.current = false;
      setIsEnabled(false);
      savePreference(false);
      audio.pause();
      return;
    }

    enabledRef.current = true;
    setIsEnabled(true);
    savePreference(true);
    play();
  }, [play]);

  return (
    <AmbientSoundContext.Provider value={{ isPlaying, isEnabled, toggle }}>
      {children}
      <audio
        ref={audioRef}
        src={SOUND_SRC}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
      />
    </AmbientSoundContext.Provider>
  );
}

/** Music-note button for the header: turns the forest ambience on or off. */
export function MusicToggle({ className = "" }: { className?: string }) {
  const { isPlaying, isEnabled, toggle } = useAmbientSound();
  const label = isPlaying ? "Turn music off" : "Turn music on";
  // Sound is on but the browser is still waiting for a first tap.
  const isWaiting = isEnabled && !isPlaying;

  return (
    <button
      type="button"
      data-ambient-toggle
      onClick={toggle}
      aria-label={label}
      aria-pressed={isPlaying}
      title={label}
      className={`relative w-10 h-10 flex items-center justify-center rounded-full border transition-colors duration-300 ${
        isPlaying
          ? "border-earthy-green/70 text-white"
          : "border-white/25 text-white/60 hover:text-white hover:border-white/50"
      } ${className}`}
    >
      {isWaiting && (
        <span className="absolute inset-0 rounded-full border border-earthy-green/60 animate-ping" aria-hidden="true" />
      )}
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Music note */}
        <path d="M9 18V5l11-2v13" />
        <circle cx="6" cy="18" r="3" fill="currentColor" />
        <circle cx="17" cy="16" r="3" fill="currentColor" />
        {/* Slash when the music is off */}
        {!isPlaying && <path d="M3 3l18 18" className="text-red-300" stroke="currentColor" />}
      </svg>
    </button>
  );
}
