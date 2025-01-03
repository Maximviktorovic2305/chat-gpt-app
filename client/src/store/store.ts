import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/user.slice';
import chatSlice from './chat/chat.slice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chatSlice: chatSlice.reducer
  },
});   

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;