"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const bases = ["Whole Wheat", "Multigrain"] as const;
const stuffings = ["Aloo", "Paneer", "Pyaz", "Mix Veg", "Cheese", "Custom Mix"] as const;
const spiceLevels = ["Mild", "Medium", "Spicy", "Extra Spicy"] as const;
const butterLevels = ["Light Butter", "Regular Butter", "Extra Butter", "Desi Ghee"] as const;
const extras = ["Dahi", "Chutney", "Pickle", "Cheese", "Chole"] as const;

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (nextValue: string) => void;
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-heading text-base font-bold text-slate-900">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                selected
                  ? "bg-primary text-white"
                  : "surface bg-white text-slate-700"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function OrderBuilder() {
  const [base, setBase] = useState<string>(bases[0]);
  const [stuffing, setStuffing] = useState<string>(stuffings[1]);
  const [spice, setSpice] = useState<string>(spiceLevels[1]);
  const [butter, setButter] = useState<string>(butterLevels[1]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>(["Dahi"]);

  const summary = useMemo(() => {
    const extrasLabel = selectedExtras.length ? selectedExtras.join(", ") : "No extras";
    const message = `Hi paratha Wale, mujhe custom paratha order karna hai.%0A%0ABase: ${base}%0AStuffing: ${stuffing}%0ASpice Level: ${spice}%0AButter: ${butter}%0AExtras: ${extrasLabel}`;

    return {
      extrasLabel,
      link: `https://wa.me/919999999999?text=${message}`,
    };
  }, [base, stuffing, spice, butter, selectedExtras]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
      <div className="surface rounded-[28px] bg-white p-6 sm:p-8">
        <div className="grid gap-7">
          <ChoiceGroup label="Step 1: Choose Base" options={bases} value={base} onChange={setBase} />
          <ChoiceGroup
            label="Step 2: Choose Stuffing"
            options={stuffings}
            value={stuffing}
            onChange={setStuffing}
          />
          <ChoiceGroup
            label="Step 3: Choose Spice Level"
            options={spiceLevels}
            value={spice}
            onChange={setSpice}
          />
          <ChoiceGroup
            label="Step 4: Choose Butter"
            options={butterLevels}
            value={butter}
            onChange={setButter}
          />

          <div className="space-y-3">
            <h3 className="font-heading text-base font-bold text-slate-900">
              Step 5: Add Extras
            </h3>
            <div className="flex flex-wrap gap-2">
              {extras.map((option) => {
                const selected = selectedExtras.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setSelectedExtras((current) =>
                        current.includes(option)
                          ? current.filter((item) => item !== option)
                          : [...current, option],
                      )
                    }
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      selected
                        ? "bg-secondary text-slate-900"
                        : "surface bg-white text-slate-700"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="surface rounded-[28px] bg-slate-950 p-6 text-white sm:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Live Summary
        </p>
        <h3 className="font-heading mt-3 text-2xl font-bold">
          Tumhara paratha Ready Hai
        </h3>
        <div className="mt-6 space-y-4 text-sm text-white/80">
          <div>
            <p className="text-white/55">Base</p>
            <p className="mt-1 text-base font-semibold text-white">{base}</p>
          </div>
          <div>
            <p className="text-white/55">Stuffing</p>
            <p className="mt-1 text-base font-semibold text-white">{stuffing}</p>
          </div>
          <div>
            <p className="text-white/55">Spice</p>
            <p className="mt-1 text-base font-semibold text-white">{spice}</p>
          </div>
          <div>
            <p className="text-white/55">Butter</p>
            <p className="mt-1 text-base font-semibold text-white">{butter}</p>
          </div>
          <div>
            <p className="text-white/55">Extras</p>
            <p className="mt-1 text-base font-semibold text-white">{summary.extrasLabel}</p>
          </div>
        </div>
        <a
          href={summary.link}
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-bold text-slate-900"
        >
          Send on WhatsApp
        </a>
      </motion.aside>
    </div>
  );
}
