"use client";

import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import styles from "./LikeButton.module.css";

type Language = "en" | "fr" | "vi";

type CounterResponse = {
  value?: number;
};

const COUNTER_ENDPOINT =
  "https://counterapi.com/api/tri-portfolio-pi.vercel.app/like/portfolio";
const LIKED_STORAGE_KEY = "tri-portfolio-liked";
const LAST_COUNT_STORAGE_KEY = "tri-portfolio-like-count";

const copy = {
  en: { like: "Like", liked: "Thanks!", unavailable: "Likes unavailable" },
  fr: { like: "J’aime", liked: "Merci !", unavailable: "Likes indisponibles" },
  vi: { like: "Thả tim", liked: "Cảm ơn!", unavailable: "Chưa tải được lượt thích" },
} as const;

function getPageLanguage(): Language {
  const language = document.documentElement.lang;
  return language === "fr" || language === "vi" ? language : "en";
}

function getSavedCount() {
  const saved = Number(window.localStorage.getItem(LAST_COUNT_STORAGE_KEY));
  return Number.isFinite(saved) && saved >= 0 ? saved : null;
}

function saveCount(value: number) {
  window.localStorage.setItem(LAST_COUNT_STORAGE_KEY, String(value));
}

function counterUrl(params: Record<string, string>) {
  const search = new URLSearchParams({
    ...params,
    _: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  });

  return `${COUNTER_ENDPOINT}?${search.toString()}`;
}

export default function LikeButton() {
  const [language, setLanguage] = useState<Language>("en");
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const t = copy[language];

  useEffect(() => {
    setLanguage(getPageLanguage());
    setLiked(window.localStorage.getItem(LIKED_STORAGE_KEY) === "true");

    const savedCount = getSavedCount();
    if (savedCount !== null) setLikes(savedCount);

    const languageObserver = new MutationObserver(() => {
      setLanguage(getPageLanguage());
    });
    languageObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    const controller = new AbortController();

    fetch(counterUrl({ readOnly: "true" }), {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, max-age=0",
        Pragma: "no-cache",
      },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load likes");
        return response.json() as Promise<CounterResponse>;
      })
      .then((data) => {
        if (typeof data.value !== "number") {
          throw new Error("Invalid like count");
        }

        // Never replace a newer locally-observed count with a stale cached API response.
        const nextCount = savedCount === null ? data.value : Math.max(savedCount, data.value);
        setLikes(nextCount);
        saveCount(nextCount);
        setLoadFailed(false);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadFailed(savedCount === null);
      });

    return () => {
      controller.abort();
      languageObserver.disconnect();
    };
  }, []);

  const handleLike = async () => {
    if (liked || submitting) return;

    setSubmitting(true);

    try {
      const response = await fetch(counterUrl({ behavior: "vote" }), {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, max-age=0",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) throw new Error("Unable to submit like");

      const data = (await response.json()) as CounterResponse;
      if (typeof data.value !== "number") throw new Error("Invalid like count");

      const currentCount = likes ?? getSavedCount() ?? 0;
      const nextCount = Math.max(data.value, currentCount + 1);

      setLikes(nextCount);
      saveCount(nextCount);
      window.localStorage.setItem(LIKED_STORAGE_KEY, "true");
      setLiked(true);
      setLoadFailed(false);
    } catch {
      setLoadFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  const countLabel = likes === null ? "—" : likes.toLocaleString();
  const label = liked ? t.liked : t.like;

  return (
    <div className={styles.wrap}>
      <button
        className={`${styles.button}${liked ? ` ${styles.liked}` : ""}`}
        type="button"
        onClick={handleLike}
        disabled={liked || submitting}
        aria-pressed={liked}
        aria-label={`${label}. ${likes ?? 0} likes.`}
        title={label}
      >
        <span className={styles.icon} aria-hidden="true">
          <FiHeart />
        </span>
        <span className={styles.count} aria-live="polite">
          {countLabel}
        </span>
        <span className={styles.label}>{submitting ? "…" : label}</span>
      </button>

      {loadFailed && <span className={styles.status}>{t.unavailable}</span>}
    </div>
  );
}
