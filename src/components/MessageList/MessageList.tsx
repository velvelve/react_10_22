import { FC } from 'react';
import { List, ListItem } from '@mui/material';
import { Message } from '../../types';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <List>
      {messages.map((message, index) => (
        <ListItem key={index} data-testid="li">
          {message.author}: {message.text}
        </ListItem>
      ))}
    </List>
  );
};
