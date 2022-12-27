import { FC } from 'react';

export const MessageList: FC<any> = ({ messages }) => {
  return (
    <ul>
      {messages.map((message: any, idx: number) => (
        <li key={idx} data-testid="li">
          {message.author}: {message.text}
        </li>
      ))}
    </ul>
  );
};
