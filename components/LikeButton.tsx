"use client";

import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";

type Language = "en" | "fr" | "vi";

type LikeButtonProps = {
  language: Language;
};

const COUNTER_ENDPOINT =
  "https://counterapi.com/api/tri-portfolio-pi.vercel.app/like/portfolio";
const LIKED_STORAGE_KEY = "tri-portfolio-liked";

const copy = {
  en: {
    eyebrow: "A little signal",
    title: "Enjoyed my portfolio?",
    text: "If something here caught your attention, leave a like.",
    like: "Like this portfolio",
    liked: "Thanks for the support!",
    loading: "Loading likes",
  },
  fr: {
    eyebrow: "Un petit signal",
    title: "Vous avez aimé mon portfolio ?",
    text: "Si quelque chose ici a retenu votre attention, laissez un like.",
    like: "Aimer ce portfolio",
    liked: "Merci pour votre soutien !",
    loading: "Chargement des likes",
  },
  vi: {
    eyebrow: "Một chút tương tác",
    title: "Bạn thích portfolio này?",
    text: "Nếu có điều gì ở đây khiến bạn ấn tượng, hãy thả một tim nhé.",
    like: "Thả tim cho portfolio",
    liked: "Cảm ơn bạn đã ủng hộ!",
    loading: "Đang tải lượt thích",
  },
} as const;

export default function LikeButton({ language }: LikeButtonProps) {
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const t = copy[language];

  useEffect(() => {
    setLiked(window.localStorage.getItem(LIKED_STORAGE_KEY) === "true");

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

    return () => controller.abort();
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

  return (
    <section className="like-section section-shell" aria-labelledby="portfolio-like-title">
      <div className="like-card">
        <div className="like-copy">
          <p className="section-kicker">{t.eyebrow}</p>
          <h2 id="portfolio-like-title">{t.title}</h2>
          <p>{t.text}</p>
        </div>

        <div className="like-action-wrap">
          <button
            className={`like-button${liked ? " liked" : ""}`}
            type="button"
            onClick={handleLike}
            disabled={liked || submitting}
            aria-pressed={liked}
            aria-label={`${liked ? t.liked : t.like}. ${likes ?? 0} likes.`}
          >
            <span className="like-icon" aria-hidden="true">
              <FiHeart />
            </span>
            <span className="like-count" aria-live="polite">
              {countLabel}
            </span>
            <span className="like-label">
              {submitting ? "…" : liked ? t.liked : t.like}
            </span>
          </button>
          <span className="like-status" aria-live="polite">
            {likes === null && !loadFailed ? t.loading : loadFailed ? "" : `${countLabel} likes`}
          </span>
        </div>
      </div>
    </section>
  );
}
