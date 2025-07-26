'use client';         

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
    interface Window {
        ym: (id: number, method: string, path: string) => void;
    }
}

const YandexMetrikaTracker = ({ metrikaId }: { metrikaId: number }) => {
    const pathname = usePathname(); 
    useEffect(() => {
        // Проверяем, что скрипт Метрики уже загружен и объект ym доступен
        if (typeof window !== 'undefined' && window.ym) {
            // Отправляем событие "просмотр страницы" в Яндекс.Метрику
            window.ym(metrikaId, 'hit', window.location.href);
            // console.log(`Яндекс.Метрика: Отправлен просмотр страницы "${window.location.href}"`);
        }
    }, [pathname, metrikaId]); 

    return null; 
};

export default YandexMetrikaTracker;