import { Reducer } from 'redux';
import { AUTHOR, Messages } from '../../types';
import { ADD_CHAT, ADD_MESSAGE, DELETE_CHAT, DELETE_MESSAGE } from './actions';
import { MessagesActions } from './types';

const initialState: Messages = {
  first: [{ author: AUTHOR.USER, text: 'Hello, World!' }],
  second: [{ author: AUTHOR.BOT, text: 'Hello, Human!' }],
};

export const messagesReducer: Reducer<Messages, MessagesActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_CHAT: {
      return {
        ...state,
        [action.chatName]: [],
      };
    }

    case ADD_MESSAGE: {
      return {
        ...state,
        [action.chatName]: [...state[action.chatName], action.newMessage],
      };
    }

    case DELETE_CHAT: {
      const messages = { ...state };
      delete messages[action.chatName];
      return messages;
    }

    case DELETE_MESSAGE: {
      const messages = { ...state };
      const chat = messages[action.chatName];
      const filtered = chat.filter((mes) => {
        return mes.text !== action.message;
      });
      return {
        ...state,
        [action.chatName]: filtered,
      };
    }

    default:
      return state;
  }
};
