import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  reducer as todoReducer,
  actions as todoActions,
  selectors as todoSelectors,
} from "@/redux/todo";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({ todo: todoReducer });

export const store = configureStore({
  reducer: persistReducer({ key: "root", storage: AsyncStorage, whitelist: ["todo"] }, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const actions = {
  todo: todoActions,
};
export const selectors = { todo: todoSelectors };

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export * from "./hooks";
