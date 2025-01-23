import { createSlice } from '@reduxjs/toolkit';


const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: { isOpen: true },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setInitialState: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setInitialState } = sidebarSlice.actions;
export default sidebarSlice;