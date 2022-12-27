import { FC, Suspense, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContext } from './utils/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppRouter } from './components/AppRouter';

export const App: FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    //<PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Suspense fallback={<div>loading...</div>}>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </Suspense>
      </ThemeContext.Provider>
    </Provider>
    //</PersistGate>
  );
};

export default App;
