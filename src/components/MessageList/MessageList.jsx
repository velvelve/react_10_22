import React from 'react';
import { List, ListItem } from '@mui/material';

export const MessageList = ({ messages }) => {
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
