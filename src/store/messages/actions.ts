import { Dispatch } from 'redux';
import { AUTHOR, Message } from '../../types';
import { AddChat, AddMessage, DeleteChat, DeleteMessage } from './types';

export const ADD_CHAT = 'MESSAGES::ADD_CHAT';
export const DELETE_CHAT = 'MESSAGES::DELETE_CHAT';
export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';
export const DELETE_MESSAGE = 'MESSAGES::DELETE_MESSAGE';

export const addChat = (chatName: string): AddChat => ({
  type: ADD_CHAT,
  chatName,
});

export const deleteChat = (chatName: string): DeleteChat => ({
  type: DELETE_CHAT,
  chatName,
});

export const addMessage = (
  chatName: string,
  newMessage: Message
): AddMessage => ({
  type: ADD_MESSAGE,
  chatName: chatName,
  newMessage: newMessage,
});

export const deleteMessage = (
  chatName: string,
  message: string
): DeleteMessage => ({
  type: DELETE_MESSAGE,
  chatName: chatName,
  message: message,
});

let timeout: NodeJS.Timeout;

export const addMessageWithReply =
  (chatName: string, newMessage: Message) => (dispatch: Dispatch) => {
    dispatch(addMessage(chatName, newMessage));
    if (newMessage.author !== AUTHOR.BOT) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        dispatch(
          addMessage(chatName, {
            text: 'Hello, Human!',
            author: AUTHOR.BOT,
          })
        );
      }, 1500);
      return () => clearTimeout(timeout);
    }
  };
