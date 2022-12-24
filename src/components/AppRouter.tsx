import { Routes, Route } from 'react-router-dom';
import { Main } from '../pages/Main';
import { ChatList } from './ChatList/ChatList';
import { ChatPage } from '../pages/ChatPages/ChatPage';
import { Header } from './Header';
import { FC } from 'react';
import { AboutWithConnect } from '../pages/About';
import React from 'react';

const Profile = React.lazy(() =>
  Promise.all([
    import('../pages/Profile').then((module) => ({
      default: module.Profile,
    })),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]).then(([moduleExport]) => moduleExport)
);

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Main />} />
        <Route path="profile" element={<Profile />} />
        <Route path="about" element={<AboutWithConnect />} />
        <Route path="chats">
          <Route index element={<ChatList />} />
          <Route path=":chatId" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<div> 404 </div>}></Route>
      </Route>
    </Routes>
  );
};
