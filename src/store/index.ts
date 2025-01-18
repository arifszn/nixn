import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loggedInUserSlice from '@/store/slices/loggedInUser.slice';
import tokenSlice from '@/store/slices/token.slice';
import { privateApi, publicApi, rtkQueryErrorLogger } from '@/store/api';
import { setupListeners } from '@reduxjs/toolkit/query';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  whitelist: ['loggedInUser', 'token']
};

const rootReducer = combineReducers({
  loggedInUser: loggedInUserSlice,
  token: tokenSlice,
  publicApi: publicApi.reducer,
  privateApi: privateApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(publicApi.middleware, privateApi.middleware, rtkQueryErrorLogger),
    devTools: process.env.NODE_ENV !== 'production',
  });
  setupListeners(store.dispatch);

  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
