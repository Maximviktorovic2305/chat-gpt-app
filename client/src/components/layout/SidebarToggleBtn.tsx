'use client'

import React from 'react';
import { useDispatch } from 'react-redux';
import { StepBack, StepForward } from 'lucide-react';
import { toggleSidebar } from '@/store/sidebar/sidebar.slice';

interface Props {
  isOpen: boolean;
}

const SidebarToggleBtn = ({ isOpen }: Props) => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(toggleSidebar());
        window.scrollTo(0, 0);
      }}
      className={`absolute top-8 ${isOpen ? 'right-[-11px]' : 'right-[-30px]'} w-8 h-8 border-gray1 rounded-full flex justify-center items-center transform transition-transform duration-300 animate-pulse`}
      aria-label={isOpen ? 'Скрыть боковую панель' : 'Показать боковую панель'}
    >
      <div >
        {isOpen ? (
          <StepBack className="text-gray1 hover:text-white/70 duration-200 " />
        ) : (
          <StepForward className="text-gray1 hover:text-white/70 duration-200 " />
        )}
      </div>
    </button>
  );
};

export default SidebarToggleBtn;