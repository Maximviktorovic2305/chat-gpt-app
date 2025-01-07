/* eslint-disable @next/next/no-img-element */

import ButtonTryIt from "../base/ButtonTryIt"

const HomeHero = () => {
  return (
    <div className="relative size-full text-[2vw] min-h-[270px]">
      <img className="size-full -z-10 max-md:absolute max-sm:hidden" src="hero.gif" alt="hero" />         
      <h1 className="absolute max-sm:text-[3em] text-nowrap leading-[110%] text-white top-[35%] left-[9%] transform text-[48px]">ChatGPT и Mistral без VPN <br />на русском языке</h1>
      <h2 className="absolute max-sm:text-[2em] max-md:top-[64%] max-lg:top-[62%] max-lg:text-[1.5em] max-sm:left-[10%] text-[1em] lg:text-[24px] top-[54%] left-[20%]">Генерация текста с помощью нейросети</h2>         
      <ButtonTryIt className="absolute max-sm:left-[10%] max-md:top-[83%] max-lg:top-[75%] top-[63%] left-[20%]" size="l" />
    </div>
  )
}

export default HomeHero