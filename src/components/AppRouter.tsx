import { Routes, Route } from 'react-router-dom';
import { Main } from '../pages/Main';
import { ChatList } from './ChatList/ChatList';
import { ChatPage } from '../pages/ChatPages/ChatPage';
import { Header } from './Header';
import { FC, lazy } from 'react';
import { AboutWithConnect } from '../pages/About';
import { Article } from '../pages/Articles';
import { Signin } from '../pages/Signin';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Signup } from '../pages/Signup';

const Profile = lazy(() =>
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
        <Route
          path="profile"
          element={<PrivateRoute component={<Profile />} />}
        />
        <Route path="about" element={<AboutWithConnect />} />
        <Route path="signin" element={<PublicRoute component={<Signin />} />} />
        <Route path="signup" element={<PublicRoute component={<Signup />} />} />
        <Route path="articles" element={<Article />} />
        <Route path="chats" element={<PrivateRoute />}>
          <Route index element={<ChatList />} />
          <Route path=":chatId" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<div> 404 </div>}></Route>
      </Route>
    </Routes>
  );
};
