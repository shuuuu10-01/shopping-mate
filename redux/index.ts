import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  reducer as todoReducer,
  actions as todoActions,
  selectors as todoSelectors,
} from "@/redux/todo";
import {
  reducer as categoryReducer,
  actions as categoryActions,
  selectors as categorySelectors,
} from "@/redux/category";

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

const rootReducer = combineReducers({ todo: todoReducer, category: categoryReducer });

export const store = configureStore({
  reducer: persistReducer(
    { key: "root", storage: AsyncStorage, whitelist: ["todo", "category"] },
    rootReducer,
  ),
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
  category: categoryActions,
};
export const selectors = { todo: todoSelectors, category: categorySelectors };

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export * from "./hooks";
