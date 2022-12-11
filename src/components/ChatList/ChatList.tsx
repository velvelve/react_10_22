import { ListItem } from '@mui/material';
import { FC, useState, useEffect } from 'react';
import { customAlphabet } from 'nanoid';
import { NavLink } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addChat, deleteChat } from '../../store/messages/actions';
import { selectChats } from '../../store/messages/selectors';

const nanoid = customAlphabet('1234567890', 10);

export const ChatList: FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const chats = useSelector(selectChats, (prev, next) => {
    return prev.length === next.length
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      dispatch(addChat(value));
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
            <button onClick={() => dispatch(deleteChat(chat.name))}>
              delete
            </button>
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
