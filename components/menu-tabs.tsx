"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  badge?: string;
};

type MenuTabsProps = {
  categories: {
    id: string;
    label: string;
    items: MenuItem[];
  }[];
};

export function MenuTabs({ categories }: MenuTabsProps) {
  const [active, setActive] = useState(categories[0]?.id ?? "");

  const currentItems = useMemo(
    () => categories.find((category) => category.id === active)?.items ?? [],
    [active, categories],
  );

  return (
    <div className="space-y-6">
      <div className="scrollbar-none flex gap-3 overflow-x-auto pb-1">
        {categories.map((category) => {
          const isActive = category.id === active;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActive(category.id)}
              className={`relative min-w-max rounded-full px-4 py-2 text-sm font-semibold ${
                isActive
                  ? "bg-primary text-white"
                  : "surface bg-white text-slate-700"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {currentItems.map((item) => (
          <article
            key={item.name}
            className="surface rounded-2xl bg-white p-5"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              </div>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-slate-900">
                {item.price}
              </span>
            </div>
            {item.badge ? (
              <span className="inline-flex rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-primary">
                {item.badge}
              </span>
            ) : null}
          </article>
        ))}
      </motion.div>
    </div>
  );
}
