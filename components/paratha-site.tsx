"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BadgePercent,
  Bike,
  Clock3,
  Flame,
  HeartHandshake,
  IndianRupee,
  LocateFixed,
  MapPinned,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Soup,
  Timer,
  Utensils,
  Wheat,
} from "lucide-react";
import { useMemo, useState } from "react";
import { MobileNav } from "./mobile-nav";
import { MenuTabs } from "./menu-tabs";
import { OrderBuilder } from "./order-builder";
import { ReviewCarousel } from "./review-carousel";

const whatsappUrl =
  "https://wa.me/919999999999?text=Hi%20Paratha%20Wale%2C%20mujhe%20order%20karna%20hai.";

const navLinks = [
  ["Home", "#home"],
  ["Menu", "#menu"],
  ["Student Special", "#student-special"],
  ["Customize", "#customize"],
  ["Testimonials", "#testimonials"],
  ["Contact", "#contact"],
] as const;

const heroStats = [
  { label: "4.8 Rating", icon: Star },
  { label: "Fresh Daily", icon: Sparkles },
  { label: "Student Friendly", icon: HeartHandshake },
  { label: "Pocket Friendly", icon: IndianRupee },
];

const whyChooseUs = [
  ["Fresh Ingredients Daily", "Roz ka fresh prep, no stale shortcuts.", Wheat],
  ["Student Friendly Prices", "Meal ka mazaa, monthly budget ka dhyaan.", IndianRupee],
  ["Ghar Jaisa Swaad", "Masale balanced, taste bilkul apna wala.", Soup],
  ["Fully Customizable", "Stuffing se butter tak sab tumhare mood ke hisaab se.", Sparkles],
  ["Hygienic Kitchen", "Clean station, neat service, trusted prep.", ShieldCheck],
  ["Large Filling Portions", "Pet bhar jaaye, aisa proper serving size.", Utensils],
  ["Quick Service", "Rush hour mein bhi order fast nikalta hai.", Timer],
  ["Multiple Variety Options", "Classic, cheesy, thali, combos sab ready.", Flame],
] as const;

const signatureItems = [
  {
    name: "Aloo Paratha",
    tagline: "Classic comfort, full-on satisfaction",
    description: "Buttery layers with spiced aloo filling and dahi on the side.",
    price: "₹99+",
  },
  {
    name: "Paneer Paratha",
    tagline: "Soft paneer, bold masala",
    description: "Protein-packed favorite with fresh paneer and masala punch.",
    price: "₹129+",
  },
  {
    name: "Pyaz Paratha",
    tagline: "Crunchy, chatpata, addictive",
    description: "Caramelized onion notes with green chilli and coriander.",
    price: "₹109+",
  },
  {
    name: "Cheese Paratha",
    tagline: "Loaded, melty, hostel bestseller",
    description: "Cheesy comfort hit for late classes, late cravings, late nights.",
    price: "₹139+",
  },
  {
    name: "Mix Veg Paratha",
    tagline: "Balanced taste, proper meal vibe",
    description: "Veg-loaded option with texture, spice, and filling bite in every layer.",
    price: "₹119+",
  },
];

const studentThalis = [
  ["Chhota Student Thali", "Quick lunch between lectures", "₹89", "Best Seller"],
  ["Basic Student Thali", "Daily meal without daily stress", "₹119", "Student Favorite"],
  ["Full Student Thali", "Paratha + sides + full satisfaction", "₹149", "Most Ordered"],
  ["Power Student Thali", "Exam day hunger ka solid answer", "₹179", "Hostel Hero"],
] as const;

const menuCategories = [
  {
    id: "signature",
    label: "Signature Parathas",
    items: [
      { name: "Aloo Butter Paratha", description: "House classic with dahi and achar.", price: "₹99+" },
      { name: "Paneer Tadka Paratha", description: "Paneer-heavy filling with fresh herbs.", price: "₹129+", badge: "Popular" },
      { name: "Cheese Lava Paratha", description: "Loaded cheese pull for extra cravings.", price: "₹139+" },
    ],
  },
  {
    id: "thalis",
    label: "Student Thalis",
    items: [
      { name: "Chhota Student Thali", description: "Fast, filling, affordable.", price: "₹89" },
      { name: "Basic Student Thali", description: "Balanced daily meal for PG life.", price: "₹119", badge: "Top Pick" },
      { name: "Power Student Thali", description: "Extra portion for serious bhook.", price: "₹179" },
    ],
  },
  {
    id: "combos",
    label: "Combos",
    items: [
      { name: "Buddy Combo", description: "2 parathas, 2 chai, 2 dips.", price: "₹249" },
      { name: "Office Lunch Combo", description: "Paratha, sabzi, dahi, beverage.", price: "₹199" },
      { name: "Late Night Combo", description: "Cheese paratha + chole + masala chaas.", price: "₹219", badge: "New" },
    ],
  },
  {
    id: "beverages",
    label: "Beverages",
    items: [
      { name: "Masala Chaas", description: "Cooling and spiced.", price: "₹35" },
      { name: "Cutting Chai", description: "Street-style chai with snack meals.", price: "₹25" },
      { name: "Cold Coffee", description: "Student crowd favorite.", price: "₹59" },
    ],
  },
  {
    id: "addons",
    label: "Add-ons",
    items: [
      { name: "Extra Butter", description: "Because some days need more butter.", price: "₹20" },
      { name: "Chole Bowl", description: "Side add-on for fuller meal.", price: "₹35" },
      { name: "Cheese Topping", description: "Go extra when cravings say so.", price: "₹30" },
    ],
  },
];

const reviews = [
  {
    name: "Ritika S.",
    role: "MBA Student, Sudama Nagar",
    review:
      "Hostel se seedha yahaan aate hain. Price bhi theek, quantity bhi mast, aur paneer paratha genuinely filling hota hai.",
  },
  {
    name: "Aman Verma",
    role: "Working Professional",
    review:
      "Office ke baad quick dinner ke liye reliable spot hai. Service fast hai aur taste har baar consistent milta hai.",
  },
  {
    name: "Joshi Family",
    role: "Weekend Family Guests",
    review:
      "Kids ko cheese paratha pasand aaya, humein aloo aur mix veg. Safai aur hospitality dono strong lage.",
  },
  {
    name: "Kunal P.",
    role: "Food Lover",
    review:
      "Butter ka balance aur stuffing ka ratio bilkul sahi hai. Local spot hai but finish proper premium wali lagti hai.",
  },
];

const faqs = [
  ["Delivery available?", "Haan, nearby areas ke liye WhatsApp aur call par order coordinate kiya ja sakta hai."],
  ["Student discount?", "Student combos aur thali pricing already budget-focused hai. Bulk class orders par extra deals mil sakti hain."],
  ["Custom paratha possible?", "Bilkul. Base, stuffing, spice, butter aur add-ons tum customize kar sakte ho."],
  ["Online payment accepted?", "UPI, cash, aur common digital payment options accepted hain."],
  ["Family orders available?", "Haan, family packs aur group combos dono available hain. Advance WhatsApp helpful rahega."],
] as const;

const galleryLabels = [
  "Butter finish close-up",
  "Signature platter",
  "Fresh off the tawa",
  "Student thali mood",
  "Weekend family spread",
  "Late night craving fix",
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.45 },
};

export function ParathaSite() {
  const [openFaq, setOpenFaq] = useState(0);
  const [contact, setContact] = useState({ name: "", phone: "", message: "" });

  const contactLink = useMemo(() => {
    const parts = [
      "Hi Paratha Wale,",
      contact.name ? `Name: ${contact.name}` : "",
      contact.phone ? `Phone: ${contact.phone}` : "",
      contact.message ? `Message: ${contact.message}` : "Mujhe order aur details chahiye.",
    ].filter(Boolean);

    return `https://wa.me/919999999999?text=${encodeURIComponent(parts.join("\n"))}`;
  }, [contact]);

  return (
    <div className="bg-background text-slate-800">
      <header id="home" className="relative min-h-screen overflow-hidden">
        <Image
          src="/images/paratha-hero.png"
          alt="Freshly prepared stuffed parathas with butter and chutneys"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-x-0 top-0 z-20">
          <div className="section-shell">
            <div className="relative mt-4 flex items-center justify-between rounded-full border border-white/15 bg-black/20 px-4 py-3 backdrop-blur-md">
              <a
                href="#home"
                className="font-heading text-lg font-extrabold tracking-[0.18em] text-white"
              >
                PARATHA WALE
              </a>
              <nav className="hidden items-center gap-6 text-sm font-medium text-white/85 md:flex">
                {navLinks.map(([label, href]) => (
                  <a key={href} href={href} className="hover:text-white">
                    {label}
                  </a>
                ))}
              </nav>
              <div className="flex items-center gap-3">
                <a
                  href={whatsappUrl}
                  className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white md:inline-flex"
                >
                  <MessageCircle size={16} />
                  Order on WhatsApp
                </a>
                <MobileNav />
              </div>
            </div>
          </div>
        </div>

        <div className="section-shell relative z-10 flex min-h-screen items-center py-28">
          <div className="grid w-full items-end gap-10 lg:grid-cols-[1.1fr_0.6fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-accent backdrop-blur">
                Pet bhar ke khao, pocket ka bhi dhyaan rakho!
              </p>
              <h1 className="font-heading mt-6 max-w-3xl text-5xl font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
                Bhook Lagi Hai?
                <br />
                Paratha Wale Chalo!
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
                Har bite mein ghar jaisa swaad. Loaded stuffing, fresh
                ingredients, aur pocket-friendly prices. Sudama Nagar ke
                students, families aur office crowd ke liye proper comfort meal
                spot.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#menu"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-slate-900"
                >
                  View Menu
                </a>
                <a
                  href={whatsappUrl}
                  className="inline-flex items-center justify-center rounded-full border border-white/35 px-6 py-3.5 text-sm font-semibold text-white"
                >
                  Order on WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {heroStats.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md"
                >
                  <Icon size={18} className="text-accent" />
                  <p className="mt-3 text-sm font-semibold">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      <main>
        <section className="py-18 sm:py-24">
          <div className="section-shell">
            <motion.div {...fadeUp} className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Why Choose Us
              </p>
              <h2 className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Local vibe, proper quality, zero overthinking
              </h2>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {whyChooseUs.map(([title, description, Icon], index) => (
                <motion.article
                  key={title}
                  {...fadeUp}
                  transition={{ delay: index * 0.04, duration: 0.42 }}
                  className="surface rounded-[26px] bg-white p-5"
                >
                  <Icon size={22} className="text-primary" />
                  <h3 className="font-heading mt-4 text-lg font-bold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="py-18 sm:py-24">
          <div className="section-shell">
            <motion.div
              {...fadeUp}
              className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Signature Parathas
                </p>
                <h2 className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Crowd favorites jo baar-baar order hote hain
                </h2>
              </div>
              <a
                href={whatsappUrl}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle size={17} />
                Quick WhatsApp Order
              </a>
            </motion.div>
            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {signatureItems.map((item, index) => (
                <motion.article
                  key={item.name}
                  {...fadeUp}
                  transition={{ delay: index * 0.04, duration: 0.42 }}
                  className="surface overflow-hidden rounded-[28px] bg-white"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="/images/paratha-hero.png"
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
                      {item.price}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-primary">
                      {item.tagline}
                    </p>
                    <h3 className="font-heading mt-2 text-xl font-bold text-slate-900">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                    <a
                      href={whatsappUrl}
                      className="mt-5 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800"
                    >
                      Order This
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="student-special" className="grain py-18 sm:py-24">
          <div className="section-shell">
            <motion.div
              {...fadeUp}
              className="surface rounded-[32px] bg-gradient-to-br from-primary via-[#f0574c] to-secondary p-8 text-white sm:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black">
                    Student Special
                  </p>
                  <h2 className="font-heading mt-3 text-3xl font-extrabold sm:text-4xl text-black">
                    Student Ho?
                    <br />
                    Budget Ki Tension Chhodo!
                  </h2>
                  <p className="mt-4 max-w-xl text-black">
                    Affordable meals, large portions, fast service, aur
                    hostel-friendly combos. Notes baad mein, pehle proper meal.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
                    <span className="rounded-full bg-black px-4 py-2">
                      Affordable meals
                    </span>
                    <span className="rounded-full bg-black px-4 py-2">
                      Large portions
                    </span>
                    <span className="rounded-full bg-black px-4 py-2">
                      Fast service
                    </span>
                    <span className="rounded-full bg-black px-4 py-2">
                      Hostel friendly
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {studentThalis.map(([title, note, price, badge]) => (
                    <div
                      key={title}
                      className="rounded-[24px] bg-white/12 p-5 backdrop-blur-sm"
                    >
                      <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold text-slate-900">
                        {badge}
                      </span>
                      <h3 className="font-heading mt-4 text-xl font-bold text-slate-900">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-900">{note}</p>
                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-2xl font-extrabold text-slate-900">
                          {price}
                        </span>
                        <a
                          href={whatsappUrl}
                          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
                        >
                          Order
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* <section id="customize" className="py-18 sm:py-24">
          <div className="section-shell">
            <motion.div {...fadeUp} className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Build Your Own Paratha
              </p>
              <h2 className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Taste apna, order bhi apna
              </h2>
            </motion.div>
            <OrderBuilder />
          </div>
        </section> */}

        <section className="py-18 sm:py-24">
          <div className="section-shell">
            <motion.div {...fadeUp} className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Menu Showcase
              </p>
              <h2 className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Har mood ke liye ek section ready
              </h2>
            </motion.div>
            <MenuTabs categories={menuCategories} />
          </div>
        </section>

        <section id="testimonials" className="py-18 sm:py-24">
          <div className="section-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <motion.div {...fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Customer Testimonials
              </p>
              <h2 className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Local log jo vaapas aate rehte hain
              </h2>
              <p className="mt-4 max-w-xl text-slate-600">
                Students, families, professionals aur proper food lovers. Review
                vibe seedha simple hai: quantity solid, taste reliable, pocket
                safe.
              </p>
            </motion.div>
            <motion.div {...fadeUp}>
              <ReviewCarousel reviews={reviews} />
            </motion.div>
          </div>
        </section>

        <section className="grain py-18 sm:py-24">
          <div className="section-shell">
            <motion.div {...fadeUp} className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Special Offers
              </p>
              <h2 className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Combo deals jo decision easy bana dein
              </h2>
            </motion.div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                [
                  "Student Discount",
                  "ID dikhayo, value meal pakka.",
                  BadgePercent,
                ],
                ["Combo Deals", "Class ke baad group order sorted.", Utensils],
                [
                  "Family Packs",
                  "Weekend sharing without kitchen stress.",
                  HeartHandshake,
                ],
                [
                  "Weekend Special",
                  "Extra loaded picks for outing mood.",
                  Sparkles,
                ],
              ].map(([title, note, Icon]) => {
                const Glyph = Icon as typeof BadgePercent;
                return (
                  <motion.article
                    key={title as string}
                    {...fadeUp}
                    className="surface rounded-[26px] bg-white p-5"
                  >
                    <Glyph size={20} className="text-primary" />
                    <h3 className="font-heading mt-4 text-lg font-bold text-slate-900">
                      {title as string}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {note as string}
                    </p>
                    <a
                      href={whatsappUrl}
                      className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Grab Offer
                    </a>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-18 sm:py-24">
          <div className="section-shell">
            <motion.div {...fadeUp} className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Gallery
              </p>
              <h2 className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Butter shots, thali mood, aur tawa wali warmth
              </h2>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {galleryLabels.map((label, index) => (
                <motion.figure
                  key={label}
                  {...fadeUp}
                  transition={{ delay: index * 0.04, duration: 0.42 }}
                  className="group relative overflow-hidden rounded-[26px]"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/images/paratha-hero.png"
                      alt={label}
                      fill
                      className={`object-cover transition duration-500 group-hover:scale-105 ${
                        index % 3 === 0
                          ? "object-center"
                          : index % 3 === 1
                            ? "object-left"
                            : "object-right"
                      }`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white">
                      {label}
                    </figcaption>
                  </div>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        <section className="py-18 sm:py-24">
          <div className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              {...fadeUp}
              className="surface rounded-[28px] bg-slate-900 p-8 text-white"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Location
              </p>
              <h2 className="font-heading mt-3 text-3xl font-extrabold text-black/90 sm:text-4xl">
                Sudama Nagar mein bhook lage toh seedha idhar
              </h2>
              <div className="mt-6 space-y-4 text-black/82">
                <p className="flex items-start gap-3">
                  <MapPinned size={18} className="mt-1 text-accent" />
                  <span>
                    Sudama Nagar, Sector D, Near Lucky Bakery, Indore, Madhya
                    Pradesh, India
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Clock3 size={18} className="text-accent" />
                  <span>Open daily: 8:00 AM to 11:00 PM</span>
                </p>
                <p className="flex items-center gap-3">
                  <Bike size={18} className="text-accent" />
                  <span>
                    Pickup, dine-in, nearby delivery coordination available
                  </span>
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Paratha%20Wale%20Sudama%20Nagar%20Sector%20D%20Near%20Lucky%20Bakery%20Indore"
                  className="rounded-full bg-accent px-5 py-3 text-sm font-bold text-slate-900"
                >
                  Get Directions
                </a>
                <a
                  href="tel:+919999999999"
                  className="rounded-full border border-white/18 px-5 py-3 text-sm font-semibold text-white"
                >
                  Call Now
                </a>
                <a
                  href={whatsappUrl}
                  className="rounded-full border border-white/18 px-5 py-3 text-sm font-semibold text-white"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white"
            >
              <iframe
                title="Paratha Wale map location"
                src="https://www.google.com/maps?q=Sudama%20Nagar%20Sector%20D%20Near%20Lucky%20Bakery%20Indore&output=embed"
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </section>

        <section id="contact" className="py-18 sm:py-24">
          <div className="section-shell grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              {...fadeUp}
              className="surface rounded-[28px] bg-white p-6 sm:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Contact
              </p>
              <h2 className="font-heading mt-3 text-3xl font-extrabold text-slate-900">
                Order bhejo, query pucho, ya bulk plan karo
              </h2>
              <div className="mt-6 grid gap-4">
                <label className="text-sm font-medium text-slate-700">
                  Name
                  <input
                    value={contact.name}
                    onChange={(event) =>
                      setContact((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                    placeholder="Apna naam"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Phone
                  <input
                    value={contact.phone}
                    onChange={(event) =>
                      setContact((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                    placeholder="Mobile number"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Message
                  <textarea
                    value={contact.message}
                    onChange={(event) =>
                      setContact((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    className="mt-2 min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                    placeholder="Kya order karna hai ya kya puchna hai"
                  />
                </label>
              </div>
              <a
                href={contactLink}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-white"
              >
                Submit on WhatsApp
              </a>
            </motion.div>

            <motion.aside
              {...fadeUp}
              className="surface rounded-[28px] bg-white p-6 sm:p-8"
            >
              <div className="space-y-5 text-slate-700">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Contact Details
                  </p>
                  <p className="mt-3 flex items-center gap-3">
                    <Phone size={18} className="text-primary" />
                    <a href="tel:+919999999999">+91 99999 99999</a>
                  </p>
                  <p className="mt-3 flex items-center gap-3">
                    <MessageCircle size={18} className="text-primary" />
                    <a href={whatsappUrl}>WhatsApp Orders</a>
                  </p>
                  <p className="mt-3 flex items-start gap-3">
                    <LocateFixed size={18} className="mt-1 text-primary" />
                    <span>
                      Sudama Nagar, Sector D, Near Lucky Bakery, Indore, MP
                    </span>
                  </p>
                </div>
                <div className="rounded-[24px] bg-slate-50 p-5">
                  <p className="font-heading text-lg font-bold text-slate-900">
                    Business Hours
                  </p>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 11:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Saturday - Sunday</span>
                      <span>8:00 AM - 11:30 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="py-18 sm:py-24">
          <div className="section-shell">
            <motion.div {...fadeUp} className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                FAQ
              </p>
              <h2 className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Jo cheezein log sabse zyada poochte hain
              </h2>
            </motion.div>
            <div className="grid gap-4">
              {faqs.map(([question, answer], index) => {
                const open = openFaq === index;
                return (
                  <motion.button
                    key={question}
                    {...fadeUp}
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : index)}
                    className="surface rounded-[24px] bg-white p-5 text-left"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading text-lg font-bold text-slate-900">
                        {question}
                      </h3>
                      <span className="text-xl font-bold text-primary">
                        {open ? "-" : "+"}
                      </span>
                    </div>
                    {open ? (
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                        {answer}
                      </p>
                    ) : null}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 py-12 text-white">
        <div className="section-shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <p className="font-heading text-xl font-extrabold tracking-[0.18em]">
              PARATHA WALE
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/72">
              Pet bhar ke khao, pocket ka bhi dhyaan rakho! Local warmth,
              filling meals, aur Sudama Nagar ka reliable paratha stop.
            </p>
          </div>
          <div>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-accent">
              Quick Links
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/72">
              {navLinks.map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-accent">
              Menu Links
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/72">
              <a href="#menu">Signature Parathas</a>
              <a href="#student-special">Student Thalis</a>
              <a href="#customize">Customize Order</a>
              <a href={whatsappUrl}>WhatsApp Orders</a>
            </div>
          </div>
          <div>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-accent">
              Contact Details
            </p>
            <div className="mt-4 space-y-3 text-sm text-white/72">
              <p>Sudama Nagar, Sector D, Near Lucky Bakery, Indore</p>
              <p>
                <a href="tel:+919999999999">+91 99999 99999</a>
              </p>
              <p>
                <a href={whatsappUrl}>WhatsApp Us</a>
              </p>
            </div>
          </div>
        </div>
        <div className="section-shell mt-8 border-t border-white/10 pt-6 text-sm text-white/52">
          (c) 2026 Paratha Wale. Pet bhar ke khao, pocket ka bhi dhyaan rakho!
        </div>
      </footer>
    </div>
  );
}
