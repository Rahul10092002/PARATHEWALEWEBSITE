"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const links = [
  ["Home", "#home"],
  ["Menu", "#menu"],
  ["Student Special", "#student-special"],
  ["Customize", "#customize"],
  ["Testimonials", "#testimonials"],
  ["Contact", "#contact"],
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/12 text-white backdrop-blur md:hidden"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute inset-x-0 top-[calc(100%+0.75rem)] z-50 md:hidden"
          >
            <div className="surface mx-4 rounded-2xl bg-white p-4">
              <nav className="flex flex-col gap-2">
                {links.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="https://wa.me/919999999999?text=Hi%20Paratha%20Wale%2C%20mujhe%20order%20karna%20hai."
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
                >
                  <MessageCircle size={18} />
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
