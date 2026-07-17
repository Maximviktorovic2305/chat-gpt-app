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
    updateLastAssistantMessage: (state, action: PayloadAction<string>) => {
      for (let index = state.history.length - 1; index >= 0; index -= 1) {
        if (state.history[index].role === 'assistant') {
          state.history[index].content = action.payload;
          break;
        }
      }
    },
    clearHistory: (state) => {
      state.history = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addMessage,
  updateLastAssistantMessage,
  clearHistory,
  setLoading,
} = chatSlice.actions;
export default chatSlice;
