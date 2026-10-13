import type { MetadataRoute } from "next";
import { absoluteUrl, LEGAL_ROUTES } from "@/shared/config";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/chat", ...Object.values(LEGAL_ROUTES)].map((path) => ({
    url: absoluteUrl(path),
  }));
}
