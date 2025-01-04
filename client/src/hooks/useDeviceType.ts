'use client'         

import { useEffect, useState } from 'react';

const useDeviceType = () => {
    const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

    const getDeviceType = () => {
        const width = window.innerWidth;

        if (width < 640) {
            return 'mobile';
        } else if (width >= 640 && width < 1024) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    };

    useEffect(() => {
        const type = getDeviceType();
        setDeviceType(type);
        
        const handleResize = () => {
            setDeviceType(getDeviceType());
        };

        window.addEventListener('resize', handleResize);

        // Очистка обработчика при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return deviceType;
};

export default useDeviceType;