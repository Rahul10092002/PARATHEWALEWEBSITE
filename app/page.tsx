import { ParathaSite } from "@/components/paratha-site";

// TODO: Update all placeholder values with real business data before launch

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": "https://parathawale.example/#restaurant",
      name: "Parathe wale",
      // TODO: Replace with real food photography URL (not hero placeholder)
      image: "https://parathawale.example/images/paratha-hero.png",
      description:
        "Fresh stuffed parathas, student thalis, and budget-friendly North Indian meals in Sudama Nagar, Indore.",
      servesCuisine: ["North Indian", "Street Food", "parathas", "Thali"],
      priceRange: "₹₹",
      telephone: "+91-74407-97391",
      url: "https://parathawale.example",
      address: {
        "@type": "PostalAddress",
        streetAddress: "PLOT NO. 1876, SHOP NO. 01, SHRITU APARTMENT SUDAMA NAGAR",
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        postalCode: "452001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        // TODO: Replace with real GPS coordinates
        latitude: "22.7196",
        longitude: "75.8577",
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
        "https://www.google.com/maps/search/?api=1&query=Parathe+wale+Sudama+Nagar+Indore",
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: "22.7196", // TODO: confirm
          longitude: "75.8577", // TODO: confirm
        },
        geoRadius: "3000", // 3km delivery radius
      },
      menu: "https://parathawale.example/#menu",
      acceptsReservations: "False",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI, Digital Wallet",
      sameAs: [
        "https://wa.me/917440797391",
        // TODO: Add Instagram, Google Business, Zomato URLs when available
      ],
      // TODO: Add real aggregate rating once reviews are collected
      // aggregateRating: {
      //   "@type": "AggregateRating",
      //   ratingValue: "4.8",
      //   reviewCount: "XXX", // TODO: real count
      //   bestRating: "5",
      // },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://parathawale.example/#localbusiness",
      name: "Parathe wale",
      description:
        "Parathe wale is Sudama Nagar's trusted paratha shop serving fresh stuffed parathas, student thalis, and affordable North Indian meals in Indore since 2018.",
      telephone: "+91-74407-97391",
      url: "https://parathawale.example",
      address: {
        "@type": "PostalAddress",
        streetAddress: "PLOT NO. 1876, SHOP NO. 01, SHRITU APARTMENT SUDAMA NAGAR",
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        postalCode: "452001",
        addressCountry: "IN",
      },
      openingHours: [
        "Mo-Fr 08:00-23:00",
        "Sa-Su 08:00-23:30",
      ],
      // TODO: Add FSSAI registration number once confirmed
      // hasCredential: "FSSAI: XXXXXXXXXXXXXX",
      priceRange: "₹₹",
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
          item: "https://parathawale.example/",
        },
      ],
    },
  ],
};

export default function Home() {
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
