import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from '@/types';

interface ChatState {
  history: ChatMessage[];
  isLoading: boolean;
}

const initialState: ChatState = {
  history: [],
  isLoading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.history.push(action.payload);
    },
    clearHistory: (state) => {
      state.history = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { addMessage, clearHistory, setLoading } = chatSlice.actions;
export default chatSlice;
