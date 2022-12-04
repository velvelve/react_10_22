import { FC, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main';
import { Profile } from './pages/Profile';
import { ChatList } from './components/ChatList/ChatList';
import { AUTHOR, Chat, Message, Messages } from './types';
import { ChatPage } from './pages/ChatPage';
import { Header } from './components/Header';

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

const defaultMessages: Messages = {
  '1': [{ author: AUTHOR.USER, text: 'Hello, World!' }],
  '2': [{ author: AUTHOR.BOT, text: 'Hello, Human!' }],
};

export const App: FC = () => {
  const [chats, setChats] = useState<Chat[]>(defaultChats);
  const [messageList, setMessageList] = useState<Messages>(defaultMessages);
  const onAddChat = (newChat: Chat) => {
    {
      setChats([...chats, newChat]);
      setMessageList({
        ...messageList,
        [newChat.id]: [],
      });
    }
  };

  const onAddMessage = (chatId: string, newMessage: Message) => {
    setMessageList({
      ...messageList,
      [chatId]: [...messageList[chatId], newMessage],
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Main />} />
        <Route path="profile" element={<Profile />} />
        <Route path="chats">
          <Route
            index
            element={<ChatList chats={chats} onAddChat={onAddChat} />}
          />
          <Route
            path=":chatId"
            element={
              <ChatPage
                chats={chats}
                onAddChat={onAddChat}
                messages={messageList}
                onAddMessage={onAddMessage}
              />
            }
          />
        </Route>
        <Route path="*" element={<div>404</div>}></Route>
      </Route>
    </Routes>
  );
};

export default App;
