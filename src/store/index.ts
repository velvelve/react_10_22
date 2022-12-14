import { messagesReducer } from './messages/slice';
import { profileReducer } from './profile/slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { articlesReducer } from './articles/slice';

//const persistConfig = {
//  key: 'root',
//  storage,
// blacklist: ['articles', 'profile'],
//};

const rootReducer = combineReducers({
  profile: profileReducer,
  messages: messagesReducer,
  articles: articlesReducer,
});

//const persistedReducer = persistReducer(persistConfig, rootReducer);

export type StoreState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
