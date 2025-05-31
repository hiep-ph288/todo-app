// store.js

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import todosReducer from "./todosSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, todosReducer);

const store = configureStore({
  reducer: {
    todos: persistedReducer,
  },
});

setupListeners(store.dispatch);

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export { store, persistor };
