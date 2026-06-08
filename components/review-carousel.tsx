"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Review = {
  name: string;
  role: string;
  review: string;
};

export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const current = reviews[index];

  const move = (direction: -1 | 1) => {
    setIndex((value) => (value + direction + reviews.length) % reviews.length);
  };

  return (
    <div className="surface rounded-[28px] bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-1 text-accent">
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <Star key={starIndex} size={18} fill="currentColor" />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() => move(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={() => move(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.name}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          className="mt-6"
        >
          <p className="text-lg leading-8 text-slate-700">{current.review}</p>
          <div className="mt-6">
            <p className="font-heading text-lg font-bold text-slate-900">
              {current.name}
            </p>
            <p className="text-sm text-slate-500">{current.role}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex gap-2">
        {reviews.map((review, reviewIndex) => (
          <button
            key={review.name}
            type="button"
            aria-label={`Go to review ${reviewIndex + 1}`}
            onClick={() => setIndex(reviewIndex)}
            className={`h-2.5 rounded-full ${
              reviewIndex === index ? "w-8 bg-primary" : "w-2.5 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
