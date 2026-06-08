import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://parathawale.example",
      lastModified: "2026-06-08",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
