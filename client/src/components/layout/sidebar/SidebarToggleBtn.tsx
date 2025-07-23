'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { StepBack, StepForward } from 'lucide-react';
import { toggleSidebar } from '@/store/sidebar/sidebar.slice';
import './SidebarToggleBtn.css'; 

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
      className={`absolute top-8 ${isOpen ? 'right-[-11px]' : 'right-[-30px]'} w-8 h-8 border-gray1 z-[9999] rounded-full flex justify-center items-center transform transition-transform duration-300`}
    >
      <div className="icon-container">
        {isOpen ? (
          <StepBack className="icon" size={24} />
        ) : (
          <StepForward className="icon" size={24} />
        )}
      </div>
    </button>
  );
};

export default SidebarToggleBtn;