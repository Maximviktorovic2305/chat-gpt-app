import type { Metadata } from "next";
import { LEGAL_DOCUMENTS } from "@/shared/config";
import { LegalPage } from "@/screens/legal";
export const metadata: Metadata = {
  title: LEGAL_DOCUMENTS.terms.title,
  alternates: { canonical: "/user-agreement" },
  description:
    "Правовые документы: условия сервиса и обработка персональных данных.",
};
export default function Page() {
  return <LegalPage document="terms" />;
}
