import type { Metadata } from "next";
import { LEGAL_DOCUMENTS } from "@/shared/config";
import { LegalPage } from "@/screens/legal";
export const metadata: Metadata = {
  title: LEGAL_DOCUMENTS.privacy.title,
  alternates: { canonical: "/private-policy" },
  description:
    "Правовые документы: условия сервиса и обработка персональных данных.",
};
export default function Page() {
  return <LegalPage document="privacy" />;
}
