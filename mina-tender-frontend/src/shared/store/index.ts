import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducers, middleWares } from "./reducersAndMiddlewares";

const persistConfig = {
  key: " Root Reducer",
  storage,
};

const reducer = persistReducer(persistConfig, combineReducers(reducers));

export const store = configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/FLUSH",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(middleWares),
});

export const persistor = persistStore(store);
export type RootStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
