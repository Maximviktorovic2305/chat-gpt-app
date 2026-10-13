import { ConsentAnalytics } from "@/features/consent-analytics";
import { PrivacyPreferences } from "@/features/privacy-preferences";
import localFont from "next/font/local";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import Providers from "@/app/_providers/Providers";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE,
} from "@/shared/config";

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} — бесплатный AI-ассистент`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  category: "technology",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  icons: { icon: "/faviconka.ico", shortcut: "/faviconka.ico" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — бесплатный AI-ассистент`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — бесплатный AI-ассистент`,
    description: SITE_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
  },
  verification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
    ? { yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#141415",
  colorScheme: "dark",
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const metrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);

  return (
    <html lang="ru" className="size-full">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} bg-[#141415] size-full antialiased`}
      >
        <Providers>
          {children}

          {/* Yandex.Metrika counter */}
          <ConsentAnalytics counterId={metrikaId} nonce={nonce} />
          <PrivacyPreferences />
        </Providers>
      </body>
    </html>
  );
}
