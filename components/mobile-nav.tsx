"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * Navigation links for mobile menu.
 * NOTE: "Customize" (#customize) has been removed because the OrderBuilder
 * section is disabled (commented out) per landing page audit recommendation.
 * Re-enable this link if the customize section is restored.
 */
const links = [
  ["Home", "#home"],
  ["Menu", "#menu"],
  ["Student Special", "#student-special"],
  // Disabled based on landing page audit recommendation.
  // Reason: #customize anchor does not exist — OrderBuilder section is commented out.
  // ["Customize", "#customize"],
  ["Testimonials", "#testimonials"],
  ["Location", "#location"],
  ["Contact", "#contact"],
  ["FAQ", "#faq"],
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/12 text-white backdrop-blur md:hidden"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav-menu"
            role="dialog"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute inset-x-0 top-[calc(100%+0.75rem)] z-50 md:hidden"
          >
            <div className="surface-card mx-4 rounded-2xl bg-white p-4">
              <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
                {links.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-primary"
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="https://wa.me/917440797391?text=Hi%20Parathe%20wale%2C%20mujhe%20order%20karna%20hai."
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Order on WhatsApp
                </a>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
