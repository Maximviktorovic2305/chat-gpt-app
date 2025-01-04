import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/user.slice';
import chatSlice from './chat/chat.slice';
import sidebarSlice from './sidebar/sidebar.slice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: chatSlice.reducer,
    sidebar: sidebarSlice.reducer
  },
});   

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;