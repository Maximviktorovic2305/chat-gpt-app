import { OpportunitiesCardsProps } from "@/types";
import { ChartCandlestick, FilePenLine, TableOfContents, WandSparkles } from "lucide-react";


export const OPPORTUNITIES_CARDS: OpportunitiesCardsProps[] = [
   {
      id: 1,
      title: 'Правки',
      text: 'Проверит текст на ошибки',
      Icon: FilePenLine
   },
   {
      id: 2,
      title: 'Улучшит',
      text: 'Заинтересует читателя текстом',
      Icon: WandSparkles  
   },
   {
      id: 3,
      title: 'Суть',
      text: 'Избавит от лишнего и вычленит суть',
      Icon: TableOfContents
   },
   {
      id: 4,
      title: 'Код',
      text: 'Отредактирует или создаст код',
      Icon: ChartCandlestick
   },
]