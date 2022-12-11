import { Message } from '../../types';
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

export const deleteMessage = (chatName: string, message: string): DeleteMessage => ({
  type: DELETE_MESSAGE,
  chatName: chatName,
  message: message,
});
