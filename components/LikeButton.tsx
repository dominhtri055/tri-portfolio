"use client";

import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import styles from "./LikeButton.module.css";

type Language = "en" | "fr" | "vi";

const COUNTER_ENDPOINT =
  "https://counterapi.com/api/tri-portfolio-pi.vercel.app/like/portfolio";
const LIKED_STORAGE_KEY = "tri-portfolio-liked";

const copy = {
  en: { like: "Like", liked: "Thanks!", unavailable: "Likes unavailable" },
  fr: { like: "J’aime", liked: "Merci !", unavailable: "Likes indisponibles" },
  vi: { like: "Thả tim", liked: "Cảm ơn!", unavailable: "Chưa tải được lượt thích" },
} as const;

function getPageLanguage(): Language {
  const language = document.documentElement.lang;
  return language === "fr" || language === "vi" ? language : "en";
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

    const languageObserver = new MutationObserver(() => {
      setLanguage(getPageLanguage());
    });
    languageObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    const controller = new AbortController();

    fetch(`${COUNTER_ENDPOINT}?readOnly=true`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load likes");
        return response.json() as Promise<{ value?: number }>;
      })
      .then((data) => {
        if (typeof data.value === "number") {
          setLikes(data.value);
          setLoadFailed(false);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadFailed(true);
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
      const response = await fetch(`${COUNTER_ENDPOINT}?behavior=vote`, {
        cache: "no-store",
      });

      if (!response.ok) throw new Error("Unable to submit like");

      const data = (await response.json()) as { value?: number };
      if (typeof data.value === "number") setLikes(data.value);

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
