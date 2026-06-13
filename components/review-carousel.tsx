"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// TODO: Replace with verified, real reviews from Google/Zomato.
// Current reviews are placeholders.
export type Review = {
  name: string;
  role: string;
  review: string;
  /** Optional: initials shown in avatar fallback */
  initials?: string;
  /** Optional: date string e.g. "June 2025" */
  date?: string;
  /** Optional: e.g. "Google", "Zomato", "Direct" */
  source?: string;
  /** Optional: star rating 1–5 */
  rating?: number;
};

function InitialsAvatar({ name, initials }: { name: string; initials?: string }) {
  const letters =
    initials ??
    name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  // Deterministic color from name
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-green-600",
    "bg-sky-600",
    "bg-violet-600",
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const color = colors[colorIndex];

  return (
    <div
      className={`${color} inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white`}
      aria-label={`Avatar for ${name}`}
    >
      {letters}
    </div>
  );
}

export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const current = reviews[index];

  const move = (direction: -1 | 1) => {
    setIndex((value) => (value + direction + reviews.length) % reviews.length);
  };

  const rating = current.rating ?? 5;

  return (
    <div className="surface-card rounded-[28px] bg-white p-6 sm:p-8" role="region" aria-label="Customer reviews">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-1 text-accent" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <Star
              key={starIndex}
              size={18}
              fill={starIndex < rating ? "currentColor" : "none"}
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() => move(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:border-primary hover:text-primary"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={() => move(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:border-primary hover:text-primary"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Review body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.name + index}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          className="mt-6"
        >
          <blockquote>
            <p className="text-lg leading-8 text-slate-700">
              &ldquo;{current.review}&rdquo;
            </p>
          </blockquote>

          <div className="mt-6 flex items-center gap-4">
            <InitialsAvatar name={current.name} initials={current.initials} />
            <div>
              <p className="font-heading text-base font-bold text-slate-900">{current.name}</p>
              <p className="text-sm text-slate-500">{current.role}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                {current.source && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                    {current.source}
                  </span>
                )}
                {/* TODO: Replace with actual review dates once real reviews are collected */}
                {current.date && <span>{current.date}</span>}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots navigation */}
      <div className="mt-6 flex gap-2" role="tablist" aria-label="Review navigation">
        {reviews.map((review, reviewIndex) => (
          <button
            key={review.name}
            type="button"
            role="tab"
            aria-selected={reviewIndex === index}
            aria-label={`Go to review ${reviewIndex + 1} by ${review.name}`}
            onClick={() => setIndex(reviewIndex)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              reviewIndex === index ? "w-8 bg-primary" : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
