import { BodyLayout } from "@/widgets/chat-layout";
import { ChatProvider } from "@/features/chat";
import { SITE_NAME, SOCIAL_IMAGE } from "@/shared/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Чат с Mistral AI на русском",
  description:
    "Бесплатный AI-чат на базе Mistral для учёбы, работы и программирования. Доступен на русском языке без VPN.",
  alternates: { canonical: "/chat" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Чат с Mistral AI на русском",
    description: "AI-ассистент для учёбы, работы и программирования.",
    url: "/chat",
    type: "website",
    siteName: SITE_NAME,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary",
    title: "Чат с Mistral AI на русском",
    description: "AI-ассистент для учёбы, работы и программирования.",
    images: [SOCIAL_IMAGE.url],
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatProvider>
      <div lang="ru" className="size-full">
        <BodyLayout>{children}</BodyLayout>
      </div>
    </ChatProvider>
  );
}
