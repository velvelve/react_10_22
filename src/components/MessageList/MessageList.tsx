import { FC } from 'react';
import { List, ListItem } from '@mui/material';
import { AUTHOR, Message } from '../../types';
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../../store/messages/actions';
import { useParams } from 'react-router-dom';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: FC<MessageListProps> = ({ messages }) => {
  const { chatId } = useParams();
  const dispatch = useDispatch();

  const handleDelete = (message: string) => {
    if (chatId) {
      dispatch(deleteMessage(chatId, message));
    }
  };

  return (
    <List>
      {messages.map((message, index) => (
        <div key={index}>
          <ListItem data-testid="li">
            {message.author}: {message.text}
          </ListItem>
          {message.author === AUTHOR.USER && (
            <button onClick={() => handleDelete(message.text)}>
              Delete message
            </button>
          )}
        </div>
      ))}
    </List>
  );
};
