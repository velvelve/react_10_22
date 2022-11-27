import { FC } from 'react';
import { List, ListItem } from '@mui/material';
import { Messages } from 'src/types'


interface MessageListProps {
  messages: Messages
}

export const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <List>
      {messages.map((message, index) => (
        <ListItem key={index}>
          {message.author}: {message.text}
        </ListItem>
      ))}
    </List>
  );
};
