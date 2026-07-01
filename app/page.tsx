import { ParathaSite } from "@/components/paratha-site";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parathewalewebsite.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": `${siteUrl}/#restaurant`,
        name: "Parathe Wale",
        image: `${siteUrl}/images/paratha-hero.png`,
        description:
          "Fresh stuffed parathas, student thalis, and budget-friendly North Indian meals in Sudama Nagar, Indore.",
        servesCuisine: ["North Indian", "Street Food", "parathas", "Thali"],
        priceRange: "₹",
        telephone: "+91-74407-97391",
        url: siteUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Shop No .1, Shruti Apartment, near Lucky Bakers, Sector D, Sudama Nagar",
          addressLocality: "Indore",
          addressRegion: "Madhya Pradesh",
          postalCode: "452009",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "22.6834",
          longitude: "75.8362",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "23:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday", "Sunday"],
            opens: "08:00",
            closes: "23:30",
          },
        ],
        hasMap:
          "https://www.google.com/maps/place/Parathewale/@22.6834069,75.8362,15z",
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: "22.6834",
            longitude: "75.8362",
          },
          geoRadius: "3000", // 3km delivery radius
        },
        menu: `${siteUrl}/#menu`,
        acceptsReservations: "False",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Digital Wallet",
        sameAs: [
          "https://wa.me/917440797391",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: "Parathe Wale",
        description:
          "Parathe Wale is Sudama Nagar's trusted paratha shop serving fresh stuffed parathas, student thalis, and affordable North Indian meals in Indore since 2018.",
        telephone: "+91-74407-97391",
        url: siteUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Shop No .1, Shruti Apartment, near Lucky Bakers, Sector D, Sudama Nagar",
          addressLocality: "Indore",
          addressRegion: "Madhya Pradesh",
          postalCode: "452009",
          addressCountry: "IN",
        },
        openingHours: [
          "Mo-Fr 08:00-23:00",
          "Sa-Su 08:00-23:30",
        ],
        priceRange: "₹",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Digital Wallet",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}/`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Delivery available hai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Haan, 3 km ke andar delivery WhatsApp aur call par coordinate ki ja sakti hai. Minimum order ₹80 hai aur estimated delivery time approximately 30 minutes hai."
            }
          },
          {
            "@type": "Question",
            name: "Delivery radius kitna hai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Filhaal hum approximately 3 km ke andar deliver karte hain Sudama Nagar area mein. Delivery fee ke liye WhatsApp par contact karein."
            }
          },
          {
            "@type": "Question",
            name: "Student discount milta hai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Student combos aur thali pricing already budget-focused hai (₹50 se shuru). Bulk class orders par extra deals mil sakti hain — WhatsApp par batch order details share karein."
            }
          },
          {
            "@type": "Question",
            name: "Custom paratha possible hai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Bilkul. Base, stuffing, spice level, butter aur add-ons sab WhatsApp order par customize kar sakte ho. Just message karein aur batao kya chahiye."
            }
          },
          {
            "@type": "Question",
            name: "Online payment accepted hai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Haan, UPI, cash, aur common digital payment options accepted hain. QR code available hai dine-in par bhi."
            }
          },
          {
            "@type": "Question",
            name: "Minimum order kitna hai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Delivery ke liye minimum order ₹80 hai. Dine-in aur pickup ke liye koi minimum nahi hai."
            }
          },
          {
            "@type": "Question",
            name: "Family/bulk orders available hain?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Haan, family packs aur group combos dono available hain. Advance WhatsApp message helpful rahega taaki order sahi time par ready ho."
            }
          }
        ]
      }
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ParathaSite />
    </>
  );
}
