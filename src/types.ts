export interface Message {
  author: AUTHOR;
  text: string;
}

export type Messages = Message[];

export enum AUTHOR {
  USER = 'USER',
  BOT = 'BOT',
}
