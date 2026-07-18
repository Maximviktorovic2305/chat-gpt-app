'use client'

import { useEffect, useState } from 'react';

const TypingLoader: React.FC = () => {
  const [dots, setDots] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length < 4) {
          return prev + '.';
        } else {
          return '';
        }
      });
    }, 300); 

    return () => clearInterval(interval); 
  }, []);

  return (
      <span className="text-[12px] text-white/50">Пишу ответ{dots}</span>
  );
};

export default TypingLoader;
