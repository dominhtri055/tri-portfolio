"use client";

import { useEffect, useRef, useState } from "react";
import { FiHeart } from "react-icons/fi";
import styles from "./LikeButton.module.css";

type Language = "en" | "fr" | "vi";
type CounterResponse = { value?: number };

const API_ENDPOINT = "/api/likes";
const LAST_COUNT_STORAGE_KEY = "tri-portfolio-like-count";
const OLD_LIKED_STORAGE_KEY = "tri-portfolio-liked";

const copy = {
  en: { like: "Like", unavailable: "Likes unavailable" },
  fr: { like: "J’aime", unavailable: "Likes indisponibles" },
  vi: { like: "Thả tim", unavailable: "Chưa tải được lượt thích" },
} as const;

function getPageLanguage(): Language {
  const language = document.documentElement.lang;
  return language === "fr" || language === "vi" ? language : "en";
}

function getSavedCount() {
  const raw = window.localStorage.getItem(LAST_COUNT_STORAGE_KEY);
  if (raw === null) return null;

  const saved = Number(raw);
  return Number.isFinite(saved) && saved >= 0 ? saved : null;
}

function saveCount(value: number) {
  window.localStorage.setItem(LAST_COUNT_STORAGE_KEY, String(value));
}

export default function LikeButton() {
  const [language, setLanguage] = useState<Language>("en");
  const [likes, setLikes] = useState<number | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [pulse, setPulse] = useState(false);
  const pulseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = copy[language];

  useEffect(() => {
    setLanguage(getPageLanguage());

    // Remove the old one-like-per-browser lock from previous versions.
    window.localStorage.removeItem(OLD_LIKED_STORAGE_KEY);

    const languageObserver = new MutationObserver(() => {
      setLanguage(getPageLanguage());
    });
    languageObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    const fetchLikes = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}?t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, max-age=0",
            Pragma: "no-cache",
          },
        });

        if (!response.ok) throw new Error("Unable to load likes");

        const data = (await response.json()) as CounterResponse;
        if (typeof data.value !== "number") throw new Error("Invalid like count");

        setLikes(data.value);
        saveCount(data.value);
        setLoadFailed(false);
      } catch {
        const savedCount = getSavedCount();
        if (savedCount !== null) setLikes(savedCount);
        setLoadFailed(true);
      }
    };

    void fetchLikes();

    const refreshOnFocus = () => void fetchLikes();
    const refreshOnVisibility = () => {
      if (document.visibilityState === "visible") void fetchLikes();
    };

    window.addEventListener("focus", refreshOnFocus);
    document.addEventListener("visibilitychange", refreshOnVisibility);

    return () => {
      languageObserver.disconnect();
      window.removeEventListener("focus", refreshOnFocus);
      document.removeEventListener("visibilitychange", refreshOnVisibility);
      if (pulseTimer.current) clearTimeout(pulseTimer.current);
    };
  }, []);

  const handleLike = () => {
    // Optimistic UI: every tap immediately adds one locally.
    setLikes((current) => (current ?? 0) + 1);

    // Restart the heart animation on every click.
    setPulse(false);
    requestAnimationFrame(() => setPulse(true));
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setPulse(false), 420);

    // Every click sends its own atomic +1 request, so rapid repeated clicks are allowed.
    void fetch(`${API_ENDPOINT}?t=${Date.now()}-${Math.random()}`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, max-age=0",
        Pragma: "no-cache",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to submit like");
        return response.json() as Promise<CounterResponse>;
      })
      .then((data) => {
        if (typeof data.value !== "number") throw new Error("Invalid like count");

        // Responses can arrive out of order during spam-clicking; never let an older
        // response move the displayed number backwards.
        setLikes((current) => {
          const next = current === null ? data.value! : Math.max(current, data.value!);
          saveCount(next);
          return next;
        });
        setLoadFailed(false);
      })
      .catch(() => {
        setLoadFailed(true);
      });
  };

  const countLabel = likes === null ? "—" : likes.toLocaleString();

  return (
    <div className={styles.wrap}>
      <button
        className={`${styles.button}${pulse ? ` ${styles.liked}` : ""}`}
        type="button"
        onClick={handleLike}
        aria-label={`${t.like}. ${likes ?? 0} likes.`}
        title={t.like}
      >
        <span className={styles.icon} aria-hidden="true">
          <FiHeart />
        </span>
        <span className={styles.count} aria-live="polite">{countLabel}</span>
        <span className={styles.label}>{t.like}</span>
      </button>

      {loadFailed && <span className={styles.status}>{t.unavailable}</span>}
    </div>
  );
}
