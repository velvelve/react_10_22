import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { AUTHOR, Message, MessagesWithId } from '../../types';

export interface AddMessage {
  chatName: string;
  newMessage: Message;
}

const initialState: MessagesWithId = {
  first: [{ id: '1', author: AUTHOR.USER, text: 'Hello, World!' }],
  second: [{ id: '2', author: AUTHOR.BOT, text: 'Hello, Human!' }],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<string>) => {
      state[action.payload] = [];
    },
    addMessage: (state, action: PayloadAction<AddMessage>) => {
      state[action.payload.chatName].push({
        id: nanoid(),
        author: action.payload.newMessage.author,
        text: action.payload.newMessage.text,
      });
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

let timeout: NodeJS.Timeout;

export const addMessageWithReply = createAsyncThunk(
  'messages/addMessageWithReply',
  (payload: AddMessage, { dispatch }) => {
    const { chatName, newMessage } = payload;
    dispatch(addMessage({ chatName, newMessage }));
    if (newMessage.author !== AUTHOR.BOT) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        dispatch(
          addMessage({
            chatName: payload.chatName,
            newMessage: {
              text: 'Hello, Human!',
              author: AUTHOR.BOT,
            },
          })
        );
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }
);

export const { addChat, addMessage, deleteChat } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;

/*
const messages = { ...state };
      const chat = messages[action.chatName];
      const filtered = chat.filter((mes) => {
        return mes.text !== action.message;
      });
      return {
        ...state,
        [action.chatName]: filtered,
      };

      */
