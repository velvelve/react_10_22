import { FC, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from './../pages/Main';
import { Profile } from './../pages/Profile';
import { ChatList } from './components/ChatList/ChatList';
import { Chat } from './types';

const defaultChats: Chat[] = [
  {
    id: '1',
    name: 'first',
  },
  {
    id: '2',
    name: 'second',
  },
];

export const App: FC = () => {
  const [chats, setChats] = useState<Chat[]>(defaultChats);

  return (
    <Routes>
      <Route path="/" element={<Main />} />

      <Route path="profile" element={<Profile />} />
      <Route path="chats">
        <Route index element={<ChatList chats={chats} />} />
      </Route>
    </Routes>
  );
};

export default App;
