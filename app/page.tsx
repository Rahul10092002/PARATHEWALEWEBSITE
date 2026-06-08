import { ParathaSite } from "@/components/paratha-site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      name: "Paratha Wale",
      image: "/images/paratha-hero.png",
      servesCuisine: ["North Indian", "Street Food", "Parathas"],
      priceRange: "₹₹",
      telephone: "+91 99999 99999",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sudama Nagar, Sector D, Near Lucky Bakery",
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN",
      },
      areaServed: "Sudama Nagar, Indore",
      acceptsReservations: "False",
      hasMenu: "#menu",
      sameAs: ["https://wa.me/919999999999"],
    },
    {
      "@type": "LocalBusiness",
      name: "Paratha Wale",
      description:
        "Fresh stuffed parathas, student thalis, affordable meals and customizable options in Sudama Nagar, Indore.",
      telephone: "+91 99999 99999",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sudama Nagar, Sector D, Near Lucky Bakery",
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN",
      },
      openingHours: "Mo-Su 08:00-23:00",
      url: "https://parathawale.example",
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
