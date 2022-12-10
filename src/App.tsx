import { FC, Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main';
import { ChatList } from './components/ChatList/ChatList';
import { ChatPage } from './pages/ChatPages/ChatPage';
import { Header } from './components/Header';
import { ThemeContext } from './utils/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './store';
import { AboutWithConnect } from './pages/About';
import React from 'react';

const Profile = React.lazy(() =>
  Promise.all([
    import('./pages/Profile').then((module) => ({
      default: module.Profile,
    })),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]).then(([moduleExport]) => moduleExport)
);

export const App: FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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
                  element={
                    <ChatList />
                  }
                />
                <Route
                  path=":chatId"
                  element={
                    <ChatPage />
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
