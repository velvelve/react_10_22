import { FC, Suspense, useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main';
import { ChatList } from './components/ChatList/ChatList';
import { AUTHOR, Chat, Message, Messages } from './types';
import { ChatPage } from './pages/ChatPages/ChatPage';
import { Header } from './components/Header';
import { ThemeContext } from './utils/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './store';
import { AboutWithConnect } from './pages/About';
import React from 'react';
import { nanoid } from 'nanoid';

const Profile = React.lazy(() =>
  Promise.all([
    import('./pages/Profile').then((module) => ({
      default: module.Profile,
    })),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]).then(([moduleExport]) => moduleExport)
);


const defaultMessages: Messages = {
  'first': [{ author: AUTHOR.USER, text: 'Hello, World!' }],
  'second': [{ author: AUTHOR.BOT, text: 'Hello, Human!' }],
};

export const App: FC = () => {
  //const [chats, setChats] = useState<Chat[]>([]);
  const [messageList, setMessageList] = useState<Messages>(defaultMessages);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const chats = useMemo(
    () =>
      Object.keys(messageList).map(chatName => ({
        name: chatName,
        id: nanoid(),
      })), [Object.keys(messageList).length]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const onAddChat = (newChat: Chat) => {
    {
      //setChats([...chats, newChat]);
      setMessageList({
        ...messageList,
        [newChat.name]: [],
      });
    }
  };

  const onDeleteChat = (chatId: string) => {
    //setChats(chats.filter((chat) => chat.id !== chatId));
    const newMessages = { ...messageList };
    delete newMessages[chatId];
    setMessageList(newMessages);
  }

  const onAddMessage = (chatId: string, newMessage: Message) => {
    setMessageList({
      ...messageList,
      [chatId]: [...messageList[chatId], newMessage],
    });
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Main />} />
              <Route path="profile" element={<Profile />} />
              <Route path="about" element={<AboutWithConnect />} />
              <Route path="chats">
                <Route
                  index
                  element={<ChatList chats={chats} onAddChat={onAddChat} onDeleteChat={onDeleteChat} />}
                />
                <Route
                  path=":chatId"
                  element={
                    <ChatPage
                      chats={chats}
                      onAddChat={onAddChat}
                      messages={messageList}
                      onAddMessage={onAddMessage}
                      onDeleteChat={onDeleteChat}
                    />
                  }
                />
              </Route>
              <Route path="*" element={<div>404</div>}></Route>
            </Route>
          </Routes>
        </Suspense>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default App;
