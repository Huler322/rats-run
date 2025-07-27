import { gameSlice } from '@/slices/game.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector as rawUseSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';

const persistVersion = 3;

const rootReducer = combineReducers({
  game: gameSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: persistVersion,
  whitelist: ['game'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
