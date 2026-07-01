"use client";
// surface     = border + shadow only (use on dark/gradient bg cards)
// surface-card = cream bg + border + shadow (use on white/light bg cards)

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgePercent,
  Bike,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
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
  Utensils,
  Wheat,
  CheckCircle,
  Loader2,
  ArrowRight,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  X,
  Search,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MobileNav } from "./mobile-nav";
import { ReviewCarousel, type Review } from "./review-carousel";

// ─── CONFIGURABLE CONSTANTS ─────────────────────────────────────────────────
// TODO: Update these with real operational data

/** WhatsApp phone number (no + or spaces) */
const PHONE_NUMBER = "917440797391";

/** Public display phone */
const PHONE_DISPLAY = "+91 74407 97391";

/** WhatsApp order URL */
const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=Hi%20Parathe%20wale%2C%20mujhe%20order%20karna%20hai.`;

/** Restaurant hours */
const HOURS_WEEKDAY = "8:00 AM – 11:00 PM";
const HOURS_WEEKEND = "8:00 AM – 11:30 PM";

/** Delivery info — TODO: confirm with owner */
const DELIVERY_RADIUS_KM = "3"; // TODO: confirm
const MIN_ORDER_AMOUNT = "₹80"; // TODO: confirm
const AVG_DELIVERY_TIME_MINS = "30"; // TODO: confirm

/** Why Choose Us stats — TODO: fill with real data */
const TAWA_FRESH_INTERVAL_MINS = "20"; // TODO: confirm
const AVG_WAIT_MINS = "10"; // TODO: confirm
const FOUNDED_YEAR = "2018"; // TODO: confirm
const REPEAT_CUSTOMER_RATE = "70%"; // TODO: confirm

/** Google Rating — TODO: replace with live data */
const GOOGLE_RATING = "4.8"; // TODO: connect to real Google rating

/** Live Google Maps link for local listing */
const GOOGLE_MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Parathe+Wale+Sudama+Nagar+Indore";

// ─── NAV LINKS ───────────────────────────────────────────────────────────────
/**
 * Navigation links.
 * NOTE: "Customize" (#customize) removed — OrderBuilder section is disabled
 * per landing page audit recommendation (dead anchor would break UX).
 */
const navLinks = [
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

// ─── HERO STATS (BADGES) ─────────────────────────────────────────────────────
const heroBadges = [
  {
    label: `${GOOGLE_RATING} ★ Rating`,
    sublabel: "Google Reviews", // TODO: replace with verified count
    icon: Star,
    link: GOOGLE_MAPS_LINK,
  },
  {
    label: "Open Daily",
    sublabel: `8 AM – 11 PM`,
    icon: Clock3,
  },
  {
    label: `Delivery ${DELIVERY_RADIUS_KM}km`,
    sublabel: `~${AVG_DELIVERY_TIME_MINS} mins`,
    icon: Bike,
  },
  {
    label: "Student Friendly",
    sublabel: `From ₹30`,
    icon: IndianRupee,
  },
];

// ─── WHY CHOOSE US (6 CARDS) ─────────────────────────────────────────────────
// Removed generic claims: "Fast Service", "Quick Service", "Hygienic Kitchen"
// Replaced with measurable proof placeholders
const whyChooseUs = [
  [
    `Tawa Fresh Every ${TAWA_FRESH_INTERVAL_MINS} Mins`,
    "Har order ke saath fresh tawa se nikla paratha — zero stale risk.",
    Flame,
  ],
  [
    `Wait Under ${AVG_WAIT_MINS} Minutes`,
    "Rush mein bhi order fast nikalta hai — aapka time waste nahi hoga.",
    Clock3,
  ],
  [
    `Trusted Since ${FOUNDED_YEAR}`,
    "Locally trusted, repeat customers ka shukriya. Sudama Nagar ka apna spot.",
    HeartHandshake,
  ],
  [
    "Fresh Dough Daily",
    "Roz ka fresh dough, no stale shortcuts. Aata ghar jaisa, taste bilkul apna.",
    Wheat,
  ],
  [
    `${REPEAT_CUSTOMER_RATE} Repeat Customers`,
    "Log baar-baar aate hain — taste aur trust dono solid hain.",
    ShieldCheck,
  ],
  [
    "Most Ordered Student Meal",
    "Student thali Sudama Nagar ka go-to: roti, dal, sabji, rice — sab ek jagah.",
    Utensils,
  ],
] as const;

// ─── MENU DATA ───────────────────────────────────────────────────────────────
// Featured items (top 6) — shown in the featured grid
// TODO: Add unique image per item (currently uses hero as placeholder)
const featuredItems = [
  {
    name: "Aloo paratha",
    tagline: "Classic comfort, full-on satisfaction",
    description: "Buttery layers with spiced aloo filling and dahi on the side.",
    price: "₹30",
    badge: null,
    image: "/images/aloo-paratha.png",
  },
  {
    name: "Paneer paratha",
    tagline: "Soft paneer, bold masala",
    description: "Protein-packed favorite with fresh paneer and masala punch.",
    price: "₹60",
    badge: "Popular",
    image: "/images/paneer-paratha.png",
  },
  {
    name: "Cheese Aloo paratha",
    tagline: "Loaded, melty, customer favorite",
    description: "Cheesy comfort hit with delicious aloo stuffing in every bite.",
    price: "₹80",
    badge: "Best Seller",
    image: "/images/cheese-aloo-paratha.png",
  },
  {
    name: "Aloo Pyaz paratha",
    tagline: "Crunchy, chatpata, addictive",
    description: "Loaded with spicy aloo, onion, coriander, and Indian spices.",
    price: "₹40",
    badge: null,
    image: "/images/aloo-pyaz-paratha.png",
  },
  {
    name: "Mix Veg paratha",
    tagline: "Balanced taste, proper meal vibe",
    description: "Veg-loaded option with texture, spice, and filling bite in every layer.",
    price: "₹40",
    badge: null,
    image: "/images/mix-veg-paratha.png",
  },
  {
    name: "Gobhi paratha",
    tagline: "Fresh, flavorful, wholesome",
    description: "Traditional cauliflower stuffing seasoned with aromatic spices.",
    price: "₹40",
    badge: "Seasonal",
    image: "/images/gobhi-paratha.png",
  },
];

// Full menu tab categories
const menuCategories = [
  {
    id: "signature",
    label: "Signature parathas",
    items: [
      { name: "Aloo paratha", description: "Stuffed with spicy potato filling.", price: "₹30" },
      { name: "Aloo Pyaz paratha", description: "Stuffed with spicy potato and onion filling.", price: "₹40" },
      { name: "Gobhi paratha", description: "Fresh cauliflower stuffing with Indian spices.", price: "₹40" },
      { name: "Mix Veg paratha", description: "Loaded with seasonal vegetables and flavors.", price: "₹40" },
      { name: "Methi paratha (Seasonal)", description: "Fresh methi leaves blended with traditional spices.", price: "₹40", badge: "Seasonal" },
      { name: "Paneer paratha", description: "Paneer-heavy filling with fresh herbs.", price: "₹60", badge: "Popular" },
      { name: "Cheese Aloo paratha", description: "Cheesy filling with aloo for extra satisfaction.", price: "₹80", badge: "Best Seller" },
      { name: "Sev paratha", description: "Crunchy sev stuffing with a unique taste.", price: "₹40" },
      { name: "Masala paratha", description: "Classic masala-spiced paratha with rich flavors.", price: "₹40" },
      { name: "Kachori paratha", description: "Inspired by kachori flavors with a crispy twist.", price: "₹40" },
    ],
  },
  {
    id: "thalis",
    label: "Student Thalis",
    items: [
      { name: "Mini Thali", description: "Sabji + 5 fresh rotis.", price: "₹50" },
      { name: "Dal Rice Bowl", description: "Comforting dal with steamed rice.", price: "₹50" },
      { name: "Student Special Thali", description: "5 roti + dal + sabji + rice.", price: "₹70", badge: "Best Value" },
      { name: "Supreme Thali", description: "5 roti + dal + sabji + rice + raita.", price: "₹90", badge: "Most Ordered" },
    ],
  },
  {
    id: "rice",
    label: "Rice Specials",
    items: [
      { name: "Veg Pulav", description: "Aromatic rice cooked with fresh vegetables.", price: "₹50" },
      { name: "Fried Rice", description: "Flavorful vegetable fried rice.", price: "₹50" },
    ],
  },
  {
    id: "beverages",
    label: "Beverages",
    items: [
      { name: "Masala Chaas", description: "Cooling and spiced.", price: "₹20" },
      { name: "Cutting Chai", description: "Street-style chai with snack meals.", price: "₹10" },
      { name: "Cold Coffee", description: "Student crowd favorite.", price: "₹50" },
    ],
  },
  {
    id: "addons",
    label: "Add-ons",
    items: [
      { name: "Dahi", description: "Fresh curd served chilled.", price: "₹20" },
      { name: "Raita", description: "Refreshing curd-based side dish.", price: "₹20" },
      { name: "Extra Butter", description: "Add extra butter for richer taste.", price: "As per wish" },
      { name: "Extra Cheese", description: "Cheesy goodness on top.", price: "As per wish" },
      { name: "Extra Sev", description: "Because a true Indori's need Sev with everything.", price: "As per wish" },
    ],
  },
];

// ─── STUDENT THALIS ──────────────────────────────────────────────────────────
const studentThalis = [
  ["Mini Thali", "5 soft rotis with delicious sabji", "₹50", "Pocket Friendly"],
  ["Dal Rice Bowl", "Simple, filling and homely dal-rice", "₹50", "Daily Favorite"],
  ["Student Special Thali", "Complete meal with roti, dal, sabji & rice", "₹70", "Best Value"],
  ["Supreme Thali", "Full thali with roti, dal, sabji, rice & fresh raita", "₹90", "Most Ordered"],
] as const;

// ─── REVIEWS ─────────────────────────────────────────────────────────────────
// TODO: Replace with verified real reviews from Google / Zomato / direct customers
const reviews: Review[] = [
  {
    name: "Ritika S.",
    role: "MBA Student, Sudama Nagar",
    review: "Hostel se seedha yahaan aate hain. Price bhi theek, quantity bhi mast, aur paneer paratha genuinely filling hota hai.",
    source: "Google", // TODO: add real Google review link
    date: "May 2025", // TODO: replace with actual date
    rating: 5,
  },
  {
    name: "Aman Verma",
    role: "Working Professional",
    review: "Office ke baad quick dinner ke liye reliable spot hai. Service fast hai aur taste har baar consistent milta hai.",
    source: "Google", // TODO: add real Google review link
    date: "April 2025", // TODO: replace with actual date
    rating: 5,
  },
  {
    name: "Joshi Family",
    role: "Weekend Family Guests",
    review: "Kids ko cheese paratha pasand aaya, humein aloo aur mix veg. Safai aur hospitality dono strong lage.",
    source: "Direct", // TODO: replace with verified source
    date: "March 2025", // TODO: replace with actual date
    rating: 5,
  },
  {
    name: "Kunal P.",
    role: "Food Lover",
    review: "Butter ka balance aur stuffing ka ratio bilkul sahi hai. Local spot hai but finish proper premium wali lagti hai.",
    source: "Zomato", // TODO: add real Zomato review link
    date: "February 2025", // TODO: replace with actual date
    rating: 5,
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "Delivery available hai?",
    answer: `Haan, ${DELIVERY_RADIUS_KM} km ke andar delivery WhatsApp aur call par coordinate ki ja sakti hai. Minimum order ${MIN_ORDER_AMOUNT} hai aur estimated delivery time approximately ${AVG_DELIVERY_TIME_MINS} minutes hai.`,
  },
  {
    question: "Delivery radius kitna hai?",
    answer: `Filhaal hum approximately ${DELIVERY_RADIUS_KM} km ke andar deliver karte hain Sudama Nagar area mein. Delivery fee ke liye WhatsApp par contact karein.`,
  },
  {
    question: "Student discount milta hai?",
    answer: "Student combos aur thali pricing already budget-focused hai (₹50 se shuru). Bulk class orders par extra deals mil sakti hain — WhatsApp par batch order details share karein.",
  },
  {
    question: "Custom paratha possible hai?",
    answer: "Bilkul. Base, stuffing, spice level, butter aur add-ons sab WhatsApp order par customize kar sakte ho. Just message karein aur batao kya chahiye.",
  },
  {
    question: "Online payment accepted hai?",
    answer: "Haan, UPI, cash, aur common digital payment options accepted hain. QR code available hai dine-in par bhi.",
  },
  {
    question: "Minimum order kitna hai?",
    answer: `Delivery ke liye minimum order ${MIN_ORDER_AMOUNT} hai. Dine-in aur pickup ke liye koi minimum nahi hai.`,
  },
  {
    question: "Family/bulk orders available hain?",
    answer: "Haan, family packs aur group combos dono available hain. Advance WhatsApp message helpful rahega taaki order sahi time par ready ho.",
  },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.45 },
};

// ─── MENU TABS COMPONENT (inline, unified) ───────────────────────────────────
type MenuItem = { name: string; description: string; price: string; badge?: string; isVeg?: boolean };
type MenuCategory = { id: string; label: string; items: MenuItem[] };

const MENU_SHOW_MORE_THRESHOLD = 6;

function UnifiedMenuTabs({
  categories,
  onAddToOrder,
}: {
  categories: MenuCategory[];
  onAddToOrder?: (name: string, price: string) => void;
}) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const [showAll, setShowAll] = useState(false);

  const currentItems = useMemo(
    () => categories.find((c) => c.id === active)?.items ?? [],
    [active, categories],
  );

  const displayedItems = showAll ? currentItems : currentItems.slice(0, MENU_SHOW_MORE_THRESHOLD);
  const hasMore = currentItems.length > MENU_SHOW_MORE_THRESHOLD;

  const handleTabChange = (id: string) => {
    setActive(id);
    setShowAll(false);
  };

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Menu categories"
        className="scrollbar-none flex gap-3 overflow-x-auto pb-1"
      >
        {categories.map((category) => {
          const isActive = category.id === active;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${category.id}`}
              id={`tab-${category.id}`}
              onClick={() => handleTabChange(category.id)}
              className={`relative min-w-max rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                isActive ? "bg-primary text-white shadow-md" : "surface-card bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Items grid */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="tabpanel"
        id={`tabpanel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {displayedItems.map((item) => (
          <article key={item.name} className="surface-card rounded-2xl bg-white p-5 flex flex-col justify-between min-h-[140px]">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-base font-bold text-slate-900">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              </div>
              <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-bold text-slate-900">
                {item.price}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-50 pt-3">
              {item.badge ? (
                <span className="inline-flex rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-primary">
                  {item.badge}
                </span>
              ) : <div />}
              {onAddToOrder && (
                <button
                  type="button"
                  onClick={() => onAddToOrder(item.name, item.price)}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                >
                  <Plus size={13} aria-hidden="true" />
                  Add
                </button>
              )}
            </div>
          </article>
        ))}
      </motion.div>

      {/* Show More / Show Less */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-primary hover:text-primary"
            aria-expanded={showAll}
          >
            {showAll ? (
              <>
                Show Less <ChevronUp size={16} aria-hidden="true" />
              </>
            ) : (
              <>
                Show {currentItems.length - MENU_SHOW_MORE_THRESHOLD} More Items{" "}
                <ChevronDown size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── FORM VALIDATION ─────────────────────────────────────────────────────────
type FormState = {
  name: string;
  phone: string;
  message: string;
};
type FormErrors = Partial<FormState>;
type SubmitState = "idle" | "loading" | "success";

function validateForm(data: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Naam zaroori hai";
  if (!data.phone.trim()) {
    errors.phone = "Phone number zaroori hai";
  } else if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\s|-/g, ""))) {
    errors.phone = "Valid 10-digit mobile number daalo";
  }
  if (!data.message.trim()) errors.message = "Message likhna zaroori hai";
  return errors;
}

// ─── ORDER CART TYPES ────────────────────────────────────────────────────────
type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export function ParathaSite() {
  // Order Dialog State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [modalSearch, setModalSearch] = useState("");

  const allMenuItems = useMemo(() => {
    return menuCategories.flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        badge: item.badge || undefined,
      }))
    );
  }, []);

  const filteredModalItems = useMemo(() => {
    if (!modalSearch.trim()) return allMenuItems;
    const search = modalSearch.toLowerCase();
    return allMenuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
    );
  }, [allMenuItems, modalSearch]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOrderModalOpen(false);
      }
    };
    if (isOrderModalOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOrderModalOpen]);

  // Cart operations
  const addToCart = useCallback((name: string, priceStr: string) => {
    const price = parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
    setCart((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (existing) {
        return prev.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { name, price, quantity: 1 }];
    });
    setIsOrderModalOpen(true);
  }, []);

  const updateQuantity = useCallback((name: string, change: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.name === name) {
            const nextQty = item.quantity + change;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const updatePrice = useCallback((name: string, newPrice: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, price: newPrice } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setSpecialInstructions("");
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const whatsappCartLink = useMemo(() => {
    if (cart.length === 0) return "#";
    const parts = [
      "Hi Parathe wale, mujhe order place karna hai:\n",
      "🛒 ORDER DETAILS:",
      ...cart.map(
        (item) => `- ${item.quantity} × ${item.name} (₹${item.price * item.quantity})`
      ),
      specialInstructions.trim() ? `\n📝 SPECIAL INSTRUCTIONS:\n${specialInstructions.trim()}` : "",
      `\n💰 Total Amount: ₹${cartTotal}`,
    ].filter(Boolean);
    return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(parts.join("\n"))}`;
  }, [cart, specialInstructions, cartTotal]);

  // Contact form state
  const [contact, setContact] = useState<FormState>({ name: "", phone: "", message: "" });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Catering form state
  const [catering, setCatering] = useState({ name: "", phone: "", details: "" });
  const [cateringErrors, setCateringErrors] = useState<Partial<typeof catering>>({});

  // Featured items slider
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.8;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const isOpen = useMemo(() => {
    try {
      const options = { timeZone: 'Asia/Kolkata', hour12: false };
      const formatter = new Intl.DateTimeFormat('en-US', {
        ...options,
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        weekday: 'long'
      });
      const parts = formatter.formatToParts(new Date());
      const partMap = Object.fromEntries(parts.map(p => [p.type, p.value]));
      
      const hour = parseInt(partMap.hour, 10);
      const minute = parseInt(partMap.minute, 10);
      const isWeekend = partMap.weekday === 'Saturday' || partMap.weekday === 'Sunday';
      
      const totalMins = hour * 60 + minute;
      const openMins = 8 * 60; // 8:00 AM
      const closeMins = isWeekend ? (23 * 60 + 30) : (23 * 60); // 11:30 PM vs 11:00 PM
      
      return totalMins >= openMins && totalMins < closeMins;
    } catch (e) {
      const now = new Date();
      const totalMins = now.getHours() * 60 + now.getMinutes();
      const day = now.getDay();
      const closeMins = day === 0 || day === 6 ? 23 * 60 + 30 : 23 * 60;
      return totalMins >= 8 * 60 && totalMins < closeMins;
    }
  }, []);

  // ── Active nav section via IntersectionObserver ──
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const ids = ["home", "menu", "student-special", "testimonials", "location", "contact", "faq"];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // ── Featured slider pagination dots ──
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSliderScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    const cardWidth = (el.firstElementChild as HTMLElement)?.offsetWidth ?? 280;
    const index = Math.round(el.scrollLeft / (cardWidth + 20));
    setActiveSlide(Math.min(Math.max(index, 0), featuredItems.length - 1));
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleSliderScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleSliderScroll);
  }, [handleSliderScroll]);

  const contactLink = useMemo(() => {
    const parts = [
      "Hi Parathe wale,",
      contact.name ? `Name: ${contact.name}` : "",
      contact.phone ? `Phone: ${contact.phone}` : "",
      contact.message ? `Message: ${contact.message}` : "Mujhe order aur details chahiye.",
    ].filter(Boolean);
    return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(parts.join("\n"))}`;
  }, [contact]);

  const cateringLink = useMemo(() => {
    const parts = [
      "Hi Parathe wale, mujhe catering inquiry karni hai.",
      catering.name ? `Name: ${catering.name}` : "",
      catering.phone ? `Phone: ${catering.phone}` : "",
      catering.details ? `Details: ${catering.details}` : "",
    ].filter(Boolean);
    return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(parts.join("\n"))}`;
  }, [catering]);

  const triggerToast = useCallback(() => {
    setShowToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setShowToast(false), 4000);
  }, []);

  const handleWhatsAppSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const errors = validateForm(contact);
    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setSubmitState("loading");
    // Simulate brief loading then success state + toast
    setTimeout(() => {
      setSubmitState("success");
      triggerToast();
      setTimeout(() => setSubmitState("idle"), 5000);
    }, 600);
  };

  const handleCateringSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const errors: Partial<typeof catering> = {};
    if (!catering.name.trim()) errors.name = "Naam zaroori hai";
    if (!catering.phone.trim()) errors.phone = "Phone zaroori hai";
    if (!catering.details.trim()) errors.details = "Details likhna zaroori hai";
    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      setCateringErrors(errors);
      return;
    }
    setCateringErrors({});
    triggerToast();
  };

  return (
    <>
      {/* ── TOAST ── */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="toast"
            role="status"
            aria-live="polite"
          >
            ✅ WhatsApp khul gaya, message bhejiye!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE STICKY CTA ── */}
      {/* Visible only on mobile, fixed bottom, safe-area support */}
      <div
        className="mobile-cta-bar fixed bottom-0 inset-x-0 z-50 flex gap-2 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-md md:hidden"
        role="complementary"
        aria-label="Quick order actions"
      >
        <button
          onClick={() => setIsOrderModalOpen(true)}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-white shadow-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span className="relative">
            <ShoppingBag size={17} aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-extrabold text-slate-900">
                {cartCount}
              </span>
            )}
          </span>
          Order via WhatsApp
        </button>
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm"
          aria-label="Call Now"
        >
          <Phone size={17} aria-hidden="true" />
          Call
        </a>
      </div>

      {/* ── DESKTOP WHATSAPP FLOAT ── */}
      {/* Fixed bottom-right on desktop; mobile already has the sticky CTA bar */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2 rounded-full bg-[#25d366] px-5 py-3.5 text-sm font-bold text-white shadow-xl hover:bg-[#1ebe5d] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366] focus-visible:ring-offset-2 transition-all"
        aria-label="Order on WhatsApp"
      >
        <MessageCircle size={18} aria-hidden="true" />
        WhatsApp Order
      </a>

      {/* ── MAIN WRAPPER ── */}
      <div className="bg-background text-slate-800 pb-20 md:pb-0">

        {/* ═══════════════════════════════════════════════
            SECTION 1: HERO
            ═══════════════════════════════════════════════ */}
        <header id="home" className="relative min-h-screen overflow-hidden">
          {/* Mobile Background Image (portrait-optimized) */}
          <div className="md:hidden absolute inset-0">
            <Image
              src="/images/paratha-hero-mobile.png"
              alt="Freshly prepared stuffed parathas with butter and chutneys at paratha Wale, Sudama Nagar Indore"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          {/* Desktop Background Image (landscape-optimized) */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/images/paratha-hero.png"
              alt="Freshly prepared stuffed parathas with butter and chutneys at paratha Wale, Sudama Nagar Indore"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/75 to-slate-950/60 lg:bg-gradient-to-r lg:from-slate-950/90 lg:via-slate-950/75 lg:to-transparent" aria-hidden="true" />

          {/* Nav */}
          <div className="absolute inset-x-0 top-0 z-20">
            <div className="section-shell">
              <div className="relative mt-4 flex items-center justify-between rounded-full border border-white/15 bg-black/20 px-4 py-3 backdrop-blur-md">
                <a
                  href="#home"
                  className="font-heading text-lg font-extrabold tracking-[0.18em] text-white"
                  aria-label="Parathe wale — home"
                >
                  PARATHE WALE
                </a>
                <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm font-medium text-white/85 md:flex">
                  {navLinks.map(([label, href]) => (
                    <a
                      key={href}
                      href={href}
                      className={`transition-colors hover:text-white focus-visible:text-white ${
                        activeSection === href.slice(1) ? "text-accent font-semibold" : ""
                      }`}
                    >
                      {label}
                    </a>
                  ))}
                </nav>
                <div className="flex items-center gap-3">
                  <span
                    className={`hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold md:inline-flex ${
                      isOpen ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
                      aria-hidden="true"
                    />
                    {isOpen ? "Open Now" : "Closed"}
                  </span>
                  <button
                    onClick={() => setIsOrderModalOpen(true)}
                    className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white md:inline-flex hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ShoppingBag size={16} aria-hidden="true" />
                    Order via WhatsApp
                  </button>
                  <MobileNav />
                </div>
              </div>
            </div>
          </div>

          {/* Hero content */}
          <div className="section-shell relative z-10 flex min-h-screen items-center pt-28 pb-16 sm:py-28">
            <div className="grid w-full items-end gap-10 lg:grid-cols-[1.1fr_0.6fr]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Tagline badge */}
                <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-accent backdrop-blur">
                  Sudama Nagar ka #1 paratha Stop 🫓
                </p>

                {/* H1 — single, keyword rich */}
                <h1 className="font-heading mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Bhook Lagi Hai?
                  <br />
                  Parathe wale Chalo!
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8 lg:text-xl">
                  Har bite mein ghar jaisa swaad. Loaded stuffing, fresh ingredients, aur pocket-friendly prices. Sudama Nagar ke students, families aur office crowd ke liye proper comfort meal spot.
                </p>

                {/* CTA hierarchy — WhatsApp PRIMARY, View Menu SECONDARY */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setIsOrderModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-white shadow-lg hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <ShoppingBag size={18} aria-hidden="true" />
                    Order via WhatsApp
                  </button>
                  <a
                    href="#menu"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-7 py-4 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    View Menu
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>

                {/* Social proof strip */}
                <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/72">
                  <a
                    href={GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white hover:underline transition-colors"
                  >
                    <Star size={14} className="text-accent" fill="currentColor" aria-hidden="true" />
                    {GOOGLE_RATING} Google Rating
                  </a>
                  <span aria-hidden="true" className="text-white/30">•</span>
                  <span>Open Daily 8AM–11PM (11:30PM Weekends)</span>
                  <span aria-hidden="true" className="text-white/30">•</span>
                  <span>Delivery within {DELIVERY_RADIUS_KM}km</span>
                </div>
              </motion.div>

              {/* Badge cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="grid gap-3 sm:grid-cols-2"
                aria-label="Quick info badges"
              >
                {heroBadges.map(({ label, sublabel, icon: Icon, link }) => {
                  const content = (
                    <>
                      <Icon size={18} className="text-accent" aria-hidden="true" />
                      <p className="mt-3 text-sm font-semibold">{label}</p>
                      <p className="mt-0.5 text-xs text-white/65">{sublabel}</p>
                    </>
                  );
                  return link ? (
                    <a
                      key={label}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md hover:bg-white/15 hover:border-white/25 transition-all"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md"
                    >
                      {content}
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </header>

        <main>
          {/* ═══════════════════════════════════════════════
              QUICK INFO STRIP (below hero)
              ═══════════════════════════════════════════════ */}
          <section aria-label="Quick info" className="border-b border-slate-200 bg-white py-4">
            <div className="section-shell">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Bike size={15} className="text-primary" aria-hidden="true" />
                  Delivery within {DELIVERY_RADIUS_KM}km
                </span>
                <span aria-hidden="true" className="hidden text-slate-300 sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <Clock3 size={15} className="text-primary" aria-hidden="true" />
                  Open {HOURS_WEEKDAY}
                </span>
                <span aria-hidden="true" className="hidden text-slate-300 sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <IndianRupee size={15} className="text-primary" aria-hidden="true" />
                  Min order {MIN_ORDER_AMOUNT}
                </span>
                <span aria-hidden="true" className="hidden text-slate-300 sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <Star size={15} className="text-accent" fill="currentColor" aria-hidden="true" />
                  {GOOGLE_RATING} Google Rating
                </span>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              SECTION 2: MENU (Unified — featured + tabs)
              ═══════════════════════════════════════════════ */}
          <section id="menu" aria-labelledby="menu-heading" className="py-18 sm:py-24">
            <div className="section-shell">
              <motion.div
                {...fadeUp}
                className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
              >
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Our Menu
                  </p>
                  <h2 id="menu-heading" className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                    Crowd favorites jo baar-baar order hote hain
                  </h2>
                  <p className="mt-3 text-slate-600">
                    From classic Aloo paratha to loaded Cheese specials — sab kuch fresh tawa se.
                  </p>
                </div>
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  <ShoppingBag size={17} aria-hidden="true" />
                  WhatsApp Order
                </button>
              </motion.div>

              {/* Featured Items Carousel / Slider */}
              <div className="mb-12 relative">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold text-slate-700 flex items-center gap-2">
                    <Sparkles size={18} className="text-accent" aria-hidden="true" />
                    Featured Items
                  </h3>
                  {/* Slider controls */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => scrollSlider("left")}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft size={16} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollSlider("right")}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label="Scroll right"
                    >
                      <ChevronRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div
                  ref={sliderRef}
                  onScroll={handleSliderScroll}
                  className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
                >
                  {featuredItems.map((item, index) => (
                    <motion.article
                      key={item.name}
                      {...fadeUp}
                      transition={{ delay: index * 0.04, duration: 0.38 }}
                      className="w-[280px] sm:w-[320px] flex-none snap-start surface-card overflow-hidden rounded-2xl bg-white"
                    >
                      {/* TODO: Replace shared hero image with unique per-item image */}
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={`${item.name} — ${item.tagline}`}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-900 shadow">
                          {item.price}
                        </span>
                        {item.badge && (
                          <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-semibold text-primary">{item.tagline}</p>
                        <h4 className="mt-1 text-base font-bold text-slate-900">{item.name}</h4>
                        <p className="mt-1.5 line-clamp-2 text-xs text-slate-600">{item.description}</p>
                        <button
                          type="button"
                          onClick={() => addToCart(item.name, item.price)}
                          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:border-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <Plus size={14} aria-hidden="true" />
                          Order Now
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
                {/* Pagination dots */}
                <div className="mt-3 flex justify-center gap-1.5" role="tablist" aria-label="Featured items pagination">
                  {featuredItems.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === activeSlide}
                      aria-label={`Go to item ${i + 1}`}
                      onClick={() => {
                        if (!sliderRef.current) return;
                        const card = sliderRef.current.children[i] as HTMLElement;
                        card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
                      }}
                      className={`rounded-full transition-all ${
                        i === activeSlide ? "h-1.5 w-5 bg-primary" : "h-1.5 w-1.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Full menu tabs */}
              <div>
                <h3 className="mb-6 font-heading text-lg font-bold text-slate-700 flex items-center gap-2">
                  <Utensils size={18} className="text-primary" aria-hidden="true" />
                  Full Menu
                </h3>
                <UnifiedMenuTabs categories={menuCategories} onAddToOrder={addToCart} />
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              SECTION 3: STUDENT SPECIAL
              ═══════════════════════════════════════════════ */}
          <section id="student-special" aria-labelledby="student-heading" className="grain py-18 sm:py-24">
            <div className="section-shell">
              <motion.div
                {...fadeUp}
                className="surface rounded-[32px] bg-gradient-to-br from-primary via-[#f0574c] to-secondary p-8 text-white sm:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
                      Student Special
                    </p>
                    <h2 id="student-heading" className="font-heading mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                      Student Ho?
                      <br />
                      Budget Ki Tension Chhodo!
                    </h2>
                    <p className="mt-4 max-w-xl text-white/85">
                      Affordable meals, large portions, fast service, aur hostel-friendly combos. Notes baad mein, pehle proper meal.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
                      <span className="rounded-full bg-white/15 px-4 py-2 text-white backdrop-blur">Affordable meals</span>
                      <span className="rounded-full bg-white/15 px-4 py-2 text-white backdrop-blur">Large portions</span>
                      <span className="rounded-full bg-white/15 px-4 py-2 text-white backdrop-blur">Fast service</span>
                      <span className="rounded-full bg-white/15 px-4 py-2 text-white backdrop-blur">Hostel friendly</span>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {studentThalis.map(([title, note, price, badge]) => (
                      <div
                        key={title}
                        className="rounded-[24px] bg-white/12 p-5 backdrop-blur-sm border border-white/20"
                      >
                        <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold text-slate-900">
                          {badge}
                        </span>
                        <h3 className="font-heading mt-4 text-xl font-bold text-white">{title}</h3>
                        <p className="mt-2 text-sm text-white/80">{note}</p>
                        <div className="mt-5 flex items-center justify-between">
                          <span className="text-2xl font-extrabold text-white">{price}</span>
                          <button
                            type="button"
                            onClick={() => addToCart(title, price)}
                            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          >
                            Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              SECTION 4: WHY CHOOSE US (6 cards)
              ═══════════════════════════════════════════════ */}
          <section aria-labelledby="why-heading" className="py-18 sm:py-24">
            <div className="section-shell">
              <motion.div {...fadeUp} className="mb-10 max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Why Choose Us
                </p>
                <h2 id="why-heading" className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Local vibe, proper quality, zero overthinking
                </h2>
              </motion.div>
              {/* 6 cards in 2×3 grid */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {whyChooseUs.map(([title, description, Icon], index) => (
                  <motion.article
                    key={title}
                    {...fadeUp}
                    transition={{ delay: index * 0.06, duration: 0.42 }}
                    className="surface-card rounded-[26px] bg-white p-5"
                  >
                    <Icon size={22} className="text-primary" aria-hidden="true" />
                    <h3 className="font-heading mt-4 text-lg font-bold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              SECTION 5: TESTIMONIALS
              ═══════════════════════════════════════════════ */}
          <section id="testimonials" aria-labelledby="testimonials-heading" className="grain py-18 sm:py-24">
            <div className="section-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <motion.div {...fadeUp}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Customer Testimonials
                </p>
                <h2 id="testimonials-heading" className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Local log jo vaapas aate rehte hain
                </h2>
                <p className="mt-4 max-w-xl text-slate-600">
                  Students, families, professionals aur proper food lovers. Review vibe seedha simple hai: quantity solid, taste reliable, pocket safe.
                </p>
                {/* Trust badges */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    <Star size={14} className="text-accent" fill="currentColor" aria-hidden="true" />
                    {GOOGLE_RATING} on Google
                  </a>
                  {/* TODO: Add FSSAI badge once registration number is confirmed */}
                  {/* <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                    <ShieldCheck size={14} aria-hidden="true" />
                    FSSAI Certified
                  </div> */}
                </div>
              </motion.div>
              <motion.div {...fadeUp}>
                {/* TODO: Reviews are placeholders — replace with verified Google/Zomato reviews */}
                <ReviewCarousel reviews={reviews} />
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              SECTION 6: SPECIAL OFFERS
              Disabled based on landing page audit recommendation.
              Reason: Offers listed are generic categories, not real priced offers.
              Placeholder/fake content reduces credibility.
              Re-enable when real, time-bound offers with pricing are available.
              ═══════════════════════════════════════════════ */}
          {/*
          <section className="grain py-18 sm:py-24" aria-label="Special offers">
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
                  ["Combo Deals", "Class ke baad group order sorted.", Utensils],
                  ["Family Packs", "Weekend sharing without kitchen stress.", HeartHandshake],
                  ["Weekend Special", "Extra loaded picks for outing mood.", Sparkles],
                ].map(([title, note, Icon]) => {
                  const Glyph = Icon as typeof BadgePercent;
                  return (
                    <motion.article key={title as string} {...fadeUp} className="surface-card rounded-[26px] bg-white p-5">
                      <Glyph size={20} className="text-primary" />
                      <h3 className="font-heading mt-4 text-lg font-bold text-slate-900">{title as string}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{note as string}</p>
                      <a href={whatsappUrl} className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Grab Offer</a>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>
          */}

          {/* ═══════════════════════════════════════════════
              HOW IT WORKS
              ═══════════════════════════════════════════════ */}
          <section aria-labelledby="how-heading" className="py-18 sm:py-24 bg-slate-50">
            <div className="section-shell">
              <motion.div {...fadeUp} className="mb-10 max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Simple Process
                </p>
                <h2 id="how-heading" className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Order karna hai? 3 steps bas
                </h2>
              </motion.div>
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  { step: "01", title: "Browse Menu", desc: "Upar diya menu dekho — parathas, thalis, rice, beverages sab.", icon: Utensils },
                  { step: "02", title: "Order on WhatsApp", desc: "WhatsApp par item ka naam bhejo — customize bhi kar sakte ho.", icon: MessageCircle },
                  { step: "03", title: "Enjoy Your Meal", desc: "Fresh tawa se nikla paratha — pickup ya delivery dono available.", icon: Sparkles },
                ].map(({ step, title, desc, icon: Icon }, i) => (
                  <motion.div
                    key={step}
                    {...fadeUp}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="relative flex flex-col items-start"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <span className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">{step}</span>
                    <h3 className="mt-1 font-heading text-xl font-bold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{desc}</p>
                    {i < 2 && (
                      <>
                        <div className="absolute right-0 top-7 hidden translate-x-1/2 sm:block" aria-hidden="true">
                          <ArrowRight size={20} className="text-primary/40" />
                        </div>
                        <div className="my-3 flex justify-start sm:hidden" aria-hidden="true">
                          <div className="h-8 w-px bg-primary/25 ml-7" />
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ShoppingBag size={18} aria-hidden="true" />
                  Order on WhatsApp
                </button>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              HYGIENE / FSSAI TRUST STRIP
              ═══════════════════════════════════════════════ */}
          <section aria-label="Food safety and hygiene" className="border-y border-slate-200 bg-white py-8">
            <div className="section-shell">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck size={18} className="text-green-600" aria-hidden="true" />
                  Clean Kitchen, Daily
                </div>
                <span aria-hidden="true" className="hidden text-slate-300 sm:inline">•</span>
                <div className="flex items-center gap-2 font-semibold">
                  <Wheat size={18} className="text-amber-600" aria-hidden="true" />
                  Fresh Dough Every Morning
                </div>
                <span aria-hidden="true" className="hidden text-slate-300 sm:inline">•</span>
                <div className="flex items-center gap-2 font-semibold">
                  <Flame size={18} className="text-red-500" aria-hidden="true" />
                  No Reheating Policy
                </div>
                <span aria-hidden="true" className="hidden text-slate-300 sm:inline">•</span>
                <div className="flex items-center gap-2 font-semibold">
                  <Star size={18} className="text-accent" fill="currentColor" aria-hidden="true" />
                  100% Pure Veg
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              SECTION 7: LOCATION + HOURS + MAP
              ═══════════════════════════════════════════════ */}
          <section id="location" aria-labelledby="location-heading" className="py-18 sm:py-24">
            <div className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <motion.div
                {...fadeUp}
                className="surface rounded-[28px] bg-slate-900 p-8 text-white"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  Location & Hours
                </p>
                {/* FIXED: Changed from text-black/90 to text-white for contrast compliance on dark bg */}
                <h2 id="location-heading" className="font-heading mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                  Sudama Nagar mein bhook lage toh seedha idhar
                </h2>
                <div className="mt-6 space-y-4 text-white/85">
                  <p className="flex items-start gap-3">
                    <MapPinned size={18} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                    <span>Shop No .1, Shruti Apartment, near Lucky Bakers, Sector D, Sudama Nagar, Indore, Madhya Pradesh - 452009</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Clock3 size={18} className="shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      Mon–Fri: {HOURS_WEEKDAY}
                      <br />
                      Sat–Sun: {HOURS_WEEKEND}
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Bike size={18} className="shrink-0 text-accent" aria-hidden="true" />
                    <span>Pickup, dine-in, nearby delivery coordination available</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone size={18} className="shrink-0 text-accent" aria-hidden="true" />
                    <a href={`tel:+${PHONE_NUMBER}`} className="hover:text-accent">
                      {PHONE_DISPLAY}
                    </a>
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://www.google.com/maps/place/Parathewale/@22.6834069,75.8362,15z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-accent px-5 py-3 text-sm font-bold text-slate-900 hover:bg-accent/90"
                  >
                    Get Directions
                  </a>
                  <a
                    href={`tel:+${PHONE_NUMBER}`}
                    className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:border-white/60"
                  >
                    Call Now
                  </a>
                  <button
                    onClick={() => setIsOrderModalOpen(true)}
                    className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Order via WhatsApp
                  </button>
                </div>
              </motion.div>

              <motion.div
                {...fadeUp}
                className="map-container overflow-hidden rounded-[28px] border border-slate-200 bg-white"
                style={{ minHeight: "420px" }}
              >
                <iframe
                  title="Parathe wale location in Sudama Nagar, Indore on Google Maps"
                  src="https://www.google.com/maps?q=Plot%20No.%201876%20SHRUTI%20Apartment%20Sudama%20Nagar%20Indore&output=embed"
                  className="h-full min-h-[420px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Map showing Parathe wale location in Sudama Nagar, Indore"
                />
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              SECTION 8: CONTACT / WHATSAPP
              Separated into: Quick Order + Catering Inquiry
              ═══════════════════════════════════════════════ */}
          <section id="contact" aria-labelledby="contact-heading" className="grain py-18 sm:py-24">
            <div className="section-shell">
              <motion.div {...fadeUp} className="mb-10 max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Contact Us
                </p>
                <h2 id="contact-heading" className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Order bhejo, query pucho, ya bulk plan karo
                </h2>
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-2">
  <div className="h-full flex flex-col">
                  <motion.div
                    {...fadeUp}
                    className="relative overflow-hidden rounded-[28px] bg-white border border-slate-100 shadow-sm flex-1 min-h-[350px] lg:min-h-0 h-full"
                  >
                    <Image
                      src="/images/paratha-shop.png"
                      alt="Parathe wale Shop Storefront"
                      fill
                      sizes="(max-w-1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </motion.div>

                </div>
                {/* ── Quick WhatsApp Order Form ── */}
                <motion.div
                  {...fadeUp}
                  className="surface-card rounded-[28px] bg-white p-5 sm:p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                      Quick Order
                    </p>
                    <h3 className="font-heading mt-1 text-xl font-bold text-slate-900">
                      WhatsApp pe order karo
                    </h3>
                    <p className="mt-0.5 text-sm text-slate-500">
                      Form fill karo, WhatsApp par message jayega — fast aur easy.
                    </p>

                    <div className="mt-4 grid gap-3">
                      {/* Name */}
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">
                          Name <span className="text-primary" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={contact.name}
                          autoComplete="name"
                          onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                          className={`mt-1.5 w-full rounded-2xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary ${formErrors.name ? "input-error border-primary" : "border-slate-200"}`}
                          placeholder="Apna naam"
                          aria-required="true"
                          aria-describedby={formErrors.name ? "contact-name-error" : undefined}
                          aria-invalid={!!formErrors.name}
                          disabled={submitState === "loading"}
                        />
                        {formErrors.name && (
                          <p id="contact-name-error" className="mt-1 text-xs font-medium text-primary" role="alert">
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700">
                          Phone <span className="text-primary" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={contact.phone}
                          autoComplete="tel"
                          onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                          className={`mt-1.5 w-full rounded-2xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary ${formErrors.phone ? "input-error border-primary" : "border-slate-200"}`}
                          placeholder="10-digit mobile number"
                          aria-required="true"
                          aria-describedby={formErrors.phone ? "contact-phone-error" : undefined}
                          aria-invalid={!!formErrors.phone}
                          disabled={submitState === "loading"}
                        />
                        {formErrors.phone && (
                          <p id="contact-phone-error" className="mt-1 text-xs font-medium text-primary" role="alert">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
                          Order / Message <span className="text-primary" aria-hidden="true">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          value={contact.message}
                          onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))}
                          className={`mt-1.5 min-h-20 w-full rounded-2xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary ${formErrors.message ? "input-error border-primary" : "border-slate-200"}`}
                          placeholder="Kya order karna hai — item name, quantity, address"
                          aria-required="true"
                          aria-describedby={formErrors.message ? "contact-message-error" : undefined}
                          aria-invalid={!!formErrors.message}
                          disabled={submitState === "loading"}
                        />
                        {formErrors.message && (
                          <p id="contact-message-error" className="mt-1 text-xs font-medium text-primary" role="alert">
                            {formErrors.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  {submitState === "success" ? (
                    <div className="mt-4 flex items-center gap-2 rounded-2xl bg-green-50 px-5 py-3 text-sm font-semibold text-green-700">
                      <CheckCircle size={18} aria-hidden="true" />
                      WhatsApp khul gaya! Message bhejiye.
                    </div>
                  ) : (
                    <a
                      href={contactLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleWhatsAppSubmit}
                      className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-white transition-all ${
                        submitState === "loading" ? "bg-[#25d366]/70 cursor-wait" : "bg-[#25d366] hover:bg-[#1ebe5d]"
                      }`}
                      aria-disabled={submitState === "loading"}
                    >
                      {submitState === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                          Opening WhatsApp...
                        </>
                      ) : (
                        <>
                          <MessageCircle size={16} aria-hidden="true" />
                          Send on WhatsApp
                        </>
                      )}
                    </a>
                  )}
                </motion.div>
          
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              SOCIAL PROOF SECTION
              Placeholder — awaiting real assets
              ═══════════════════════════════════════════════ */}
          {/* TODO: Uncomment and populate with real Instagram feed / food photos / customer content
          <section aria-label="Social proof and food photos" className="py-18 sm:py-24 bg-white">
            <div className="section-shell">
              <motion.div {...fadeUp} className="mb-10 max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Seen On Social
                </p>
                <h2 className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Real food, real people, real Parathe wale vibes
                </h2>
              </motion.div>
              TODO: Add Instagram feed embed or customer-generated photos grid
              - Use real food photos (not hero repeated)
              - Consider: instagram-feed npm package or manual grid of 6-9 images
            </div>
          </section>
          */}

          {/* ═══════════════════════════════════════════════
              GALLERY SECTION
              Disabled based on landing page audit recommendation.
              Reason: All images use repeated /images/paratha-hero.png placeholder.
              Placeholder/fake content reduces credibility.
              Re-enable when real, unique food photography is available.
              ═══════════════════════════════════════════════ */}
          {/*
          <section aria-label="Food gallery" className="py-18 sm:py-24">
            <div className="section-shell">
              <motion.div {...fadeUp} className="mb-10 max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Gallery</p>
                <h2 className="font-heading mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Butter shots, thali mood, aur tawa wali warmth
                </h2>
              </motion.div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                TODO: Replace with unique food photos (6 items):
                - /images/butter-close-up.jpg
                - /images/signature-platter.jpg
                - /images/fresh-off-tawa.jpg
                - /images/student-thali.jpg
                - /images/family-spread.jpg
                - /images/late-night.jpg
              </div>
            </div>
          </section>
          */}

          {/* ═══════════════════════════════════════════════
              SECTION 9: FAQ
              ═══════════════════════════════════════════════ */}
          <section id="faq" aria-labelledby="faq-heading" className="py-18 sm:py-24 bg-slate-50">
            <div className="section-shell">
              <motion.div {...fadeUp} className="mb-8 max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">FAQ</p>
                <h2 id="faq-heading" className="font-heading mt-2.5 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  Frequently Asked Questions
                </h2>
              </motion.div>

              {/* Semantic details/summary accordion — accessible, no JS required */}
              <div className="grid gap-3 md:grid-cols-2" role="list">
                {faqs.map(({ question, answer }, index) => (
                  <motion.details
                    key={question}
                    {...fadeUp}
                    transition={{ delay: index * 0.05, duration: 0.38 }}
                    className="surface-card group rounded-2xl bg-white"
                    role="listitem"
                  >
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 focus-visible:outline-primary"
                    >
                      <h3 className="font-heading text-sm font-bold text-slate-900">{question}</h3>
                      <span className="shrink-0 text-primary" aria-hidden="true">
                        <ChevronDown size={18} className="group-open:hidden" />
                        <ChevronUp size={18} className="hidden group-open:block" />
                      </span>
                    </summary>
                    <div className="px-4 pb-4">
                      <p className="max-w-3xl text-xs leading-6 text-slate-600">{answer}</p>
                    </div>
                  </motion.details>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* ─── SECTION 10: FOOTER ─── */}
        <footer className="bg-slate-950 py-12 text-white" role="contentinfo">
          <div className="section-shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
            <div>
              <p className="font-heading text-xl font-extrabold tracking-[0.18em]">PARATHE WALE</p>
              {/* Footer tagline is unique — not a duplicate of hero tagline */}
              <p className="mt-4 max-w-sm text-sm leading-7 text-white/72">
                Indore ke dil mein, Sudama Nagar ka apna paratha stop. Fresh tawa se nikla meal, ghar jaisa swaad, aur pocket mein rehat.
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ShoppingBag size={14} aria-hidden="true" />
                  Order via WhatsApp
                </button>
                <a
                  href={`tel:+${PHONE_NUMBER}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 hover:border-white/40"
                >
                  <Phone size={14} aria-hidden="true" />
                  Call
                </a>
              </div>
            </div>

            <nav aria-label="Footer quick links">
              <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-accent">Quick Links</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-white/72">
                {navLinks.map(([label, href]) => (
                  <a key={href} href={href} className="hover:text-white">
                    {label}
                  </a>
                ))}
              </div>
            </nav>

            <nav aria-label="Footer menu links">
              <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-accent">Menu</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-white/72">
                <a href="#menu" className="hover:text-white">Signature parathas</a>
                <a href="#student-special" className="hover:text-white">Student Thalis</a>
                {/* Disabled based on landing page audit recommendation.
                    Reason: #customize anchor does not exist — OrderBuilder section is commented out. */}
                {/* <a href="#customize">Customize Order</a> */}
                <button onClick={() => setIsOrderModalOpen(true)} className="text-left hover:text-white focus-visible:outline-none">Order via WhatsApp</button>
                <a href="#faq" className="hover:text-white">FAQ</a>
              </div>
            </nav>

            <div>
              <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-accent">Contact</p>
              <div className="mt-4 space-y-3 text-sm text-white/72">
                <p>Shop No .1, Shruti Apartment, near Lucky Bakers,<br />Sector D, Sudama Nagar, Indore - 452009</p>
                <p>
                  <a href={`tel:+${PHONE_NUMBER}`} className="hover:text-white">{PHONE_DISPLAY}</a>
                </p>
                <p>
                  <button onClick={() => setIsOrderModalOpen(true)} className="text-left hover:text-white focus-visible:outline-none">WhatsApp Us</button>
                </p>
                <p className="text-white/55 text-xs">Open: {HOURS_WEEKDAY} daily</p>
              </div>
            </div>
          </div>

          <div className="section-shell mt-8 border-t border-white/10 pt-6 text-sm text-white/45">
            &copy; 2026 Parathe wale. Indore ka apna comfort food spot.
          </div>
        </footer>
      </div>

      {/* ── ORDER DIALOG MODAL ── */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOrderModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-full max-h-[85vh] w-full max-w-2xl flex-col rounded-3xl bg-white shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="border-b border-slate-100 px-6 py-5 flex items-start justify-between">
                <div>
                  <h2 id="modal-title" className="font-heading text-2xl font-extrabold text-slate-900">
                    Apna Order Customise Karein
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Items choose karein, customized instructions likhein, aur WhatsApp par order place karein.
                  </p>
                </div>
                <button
                  onClick={() => setIsOrderModalOpen(false)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Cart Items List */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><ShoppingBag size={14} aria-hidden="true" /> Selected Items ({cartCount})</span>
                    {cart.length > 0 && (
                      <button
                        onClick={clearCart}
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 normal-case"
                      >
                        <Trash2 size={12} /> Clear All
                      </button>
                    )}
                  </h3>
                  {cart.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-slate-100 py-8 text-center bg-slate-50/30">
                      <ShoppingBag className="mx-auto text-slate-300 mb-3 animate-pulse" size={36} />
                      <p className="text-sm font-bold text-slate-600">Aapka cart khali hai</p>
                      <p className="text-xs text-slate-400 mt-1">Niche search box ya menu se items select karein!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((item) => {
                        const isCustomPrice =
                          ["Extra Butter", "Extra Cheese", "Extra Sev"].includes(item.name) ||
                          item.name.toLowerCase().includes("extra") ||
                          allMenuItems.find((mi) => mi.name === item.name)?.price === "As per wish";

                        return (
                          <div
                            key={item.name}
                            className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:border-slate-200"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-slate-900 truncate">{item.name}</p>
                              {isCustomPrice ? (
                                <div className="flex items-center gap-1.5 mt-1">
                                  <span className="text-xs text-slate-500 font-semibold">Amount: ₹</span>
                                  <input
                                    type="number"
                                    min="0"
                                    value={item.price || ""}
                                    onChange={(e) => {
                                      const val = Math.max(0, parseInt(e.target.value, 10) || 0);
                                      updatePrice(item.name, val);
                                    }}
                                    className="w-16 rounded-lg border border-slate-200 px-2 py-0.5 text-xs font-bold text-slate-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="0"
                                    aria-label={`Enter amount for ${item.name}`}
                                  />
                                </div>
                              ) : (
                                <p className="text-xs text-slate-500 mt-0.5">₹{item.price} each</p>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-3">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white p-1">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.name, -1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors focus-visible:outline-none"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="w-6 text-center text-sm font-bold text-slate-800" aria-label="Quantity">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.name, 1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors focus-visible:outline-none"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>

                              {/* Price */}
                              <span className="w-16 text-right text-sm font-bold text-slate-900">
                                ₹{item.price * item.quantity}
                              </span>

                              {/* Remove */}
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.name)}
                                className="text-slate-400 hover:text-primary transition-colors p-1"
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Quick Add Search Section */}
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                    <Plus size={14} aria-hidden="true" /> Add More Items
                  </h3>
                  
                  {/* Search Box */}
                  <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search menu (e.g. Aloo, Thali, Chai)..."
                      value={modalSearch}
                      onChange={(e) => setModalSearch(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    {modalSearch && (
                      <button
                        onClick={() => setModalSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Search Results List */}
                  <div className="max-h-[220px] overflow-y-auto border border-slate-100 rounded-2xl divide-y divide-slate-100 scrollbar-none bg-slate-50/30">
                    {filteredModalItems.length === 0 ? (
                      <p className="p-4 text-center text-xs text-slate-400">No items match your search.</p>
                    ) : (
                      filteredModalItems.map((menuItem) => {
                        const cartItem = cart.find(ci => ci.name === menuItem.name);
                        const qty = cartItem?.quantity ?? 0;
                        return (
                          <div key={menuItem.name} className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors">
                            <div className="flex-1 min-w-0 pr-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-800">{menuItem.name}</span>
                                {menuItem.badge && (
                                  <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                                    {menuItem.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5 truncate">{menuItem.description}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-sm font-bold text-slate-700">{menuItem.price}</span>
                              {qty > 0 ? (
                                <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white p-0.5">
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(menuItem.name, -1)}
                                    className="flex h-6 w-6 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 focus-visible:outline-none"
                                  >
                                    <Minus size={11} />
                                  </button>
                                  <span className="w-4 text-center text-xs font-bold text-slate-800">{qty}</span>
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(menuItem.name, 1)}
                                    className="flex h-6 w-6 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 focus-visible:outline-none"
                                  >
                                    <Plus size={11} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => addToCart(menuItem.name, menuItem.price)}
                                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:border-primary hover:text-primary transition-colors focus-visible:outline-none"
                                >
                                  <Plus size={11} /> Add
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="border-t border-slate-100 pt-6">
                  <label htmlFor="modal-instructions" className="block text-sm font-bold text-slate-700 mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    id="modal-instructions"
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="E.g. Kam teekha banana, extra butter, etc."
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-slate-100 bg-slate-50 px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Amount</p>
                    <p className="text-3xl font-extrabold text-slate-900">₹{cartTotal}</p>
                  </div>
                  {cartTotal > 0 && cartTotal < parseInt(MIN_ORDER_AMOUNT.replace(/\D/g, ""), 10) && (
                    <p className="text-right text-[11px] font-semibold text-amber-600 max-w-[200px]">
                      ⚠️ Delivery ke liye min. order {MIN_ORDER_AMOUNT} hai (Dine-in/Pickup pe koi limit nahi).
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOrderModalOpen(false)}
                    className="flex-1 rounded-full border border-slate-200 bg-white py-3.5 text-center text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                  >
                    Continue Browsing
                  </button>
                  
                  <a
                    href={whatsappCartLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (cart.length === 0) return;
                      // Auto close modal on success click
                      setTimeout(() => setIsOrderModalOpen(false), 500);
                    }}
                    className={`flex-[1.5] inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-center text-sm font-bold text-white shadow-lg transition-all ${
                      cart.length === 0
                        ? "bg-slate-300 cursor-not-allowed shadow-none"
                        : "bg-[#25d366] hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366]"
                    }`}
                    style={cart.length === 0 ? { pointerEvents: "none" } : undefined}
                  >
                    <MessageCircle size={18} />
                    Send Order on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
