import { ListItem } from '@mui/material';
import { FC, useState } from 'react';
import { Chat } from '../../types';
import { customAlphabet } from 'nanoid';
import { NavLink } from 'react-router-dom';

const nanoid = customAlphabet('1234567890', 10);

interface ChatListProps {
  chats: Chat[];
  onAddChat: (chat: Chat) => void;
  onDeleteChat: (chatId: string) => void;
}


export const ChatList: FC<ChatListProps> = ({ chats, onAddChat, onDeleteChat }) => {
  const [value, setValue] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      onAddChat({
        id: nanoid(),
        name: value,
      });
      setValue('');
    }
  };
  return (
    <>
      <ul>
        {chats.map((chat) => (
          <ListItem key={chat.id}>
            <NavLink
              to={`/chats/${chat.name}`}
              style={({ isActive }) => ({ color: isActive ? 'green' : 'blue' })}
            >
              {chat.name}
            </NavLink>
            <button onClick={() => onDeleteChat(chat.name)}>delete</button>
          </ListItem>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button>create chat</button>
      </form>
    </>
  );
};