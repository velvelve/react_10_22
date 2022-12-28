import { Routes, Route } from 'react-router-dom';
import { Main } from '../pages/Main';
import { ChatList } from './ChatList/ChatList';
import { ChatPage } from '../pages/ChatPages/ChatPage';
import { Header } from './Header';
import { FC, lazy, useEffect, useState } from 'react';
import { AboutWithConnect } from '../pages/About';
import { Article } from '../pages/Articles';
import { Signin } from '../pages/Signin';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Signup } from '../pages/Signup';
import { db, firebaseAuth, getChats } from 'src/services/firebase';
import { onValue, ref } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { auth } from '../store/profile/slice';

const Profile = lazy(() =>
  Promise.all([
    import('../pages/Profile').then((module) => ({
      default: module.Profile,
    })),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]).then(([moduleExport]) => moduleExport)
);

export const AppRouter: FC = () => {
  const dispatch = useDispatch();
  const [chats, setChats] = useState<any[]>([]);
  const [messages, setMessages] = useState<any>({});

  useEffect(() => {
    const authUnsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      dispatch(auth(!!user));
    });

    const chatsUnsubscribe = onValue(getChats(), (snapshot) => {
      const data = snapshot.val() || {};
      setChats([...Object.values(data)]);
    });

    const messagesUnsubscribe = onValue(ref(db, 'messages/'), (snapshot) => {
      const data = snapshot.val() || {};
      setMessages(data);
    });

    return () => {
      authUnsubscribe();
      chatsUnsubscribe();
      messagesUnsubscribe();
    };
  }, [dispatch]);
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
        <Route path="chats" element={<PrivateRoute />}>
          <Route
            index
            element={<ChatList chats={chats} messages={messages} />}
          />
          <Route
            path=":chatId"
            element={<ChatPage chats={chats} messages={messages} />}
          />
        </Route>
        <Route path="articles" element={<Article />} />
      </Route>
      <Route path="*" element={<div>404 page</div>} />
    </Routes>
  );
};
