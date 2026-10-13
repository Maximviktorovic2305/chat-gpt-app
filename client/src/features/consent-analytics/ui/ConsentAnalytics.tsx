"use client";
import Script from "next/script";
import YandexMetrikaTracker from "@/shared/ui/YandexMetrikaTracker";
import { usePrivacyChoice } from "@/shared/lib/privacy-choice";
export function ConsentAnalytics({
  counterId,
  nonce,
}: {
  counterId: number;
  nonce?: string;
}) {
  const choice = usePrivacyChoice();
  if (
    choice !== "analytics" ||
    !Number.isSafeInteger(counterId) ||
    counterId <= 0
  )
    return null;
  return (
    <>
      <Script id="yandex-metrika" nonce={nonce} strategy="afterInteractive">{`
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t);a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${counterId}','ym');
    ym(${counterId}, 'init', {ssr:true,webvisor:false,clickmap:false,accurateTrackBounce:true,trackLinks:false});
  `}</Script>
      <YandexMetrikaTracker metrikaId={counterId} />
    </>
  );
}
