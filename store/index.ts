import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import auth from "./slices/auth";
import user from "./slices/user";
import orders from "./slices/orders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import expireReducer from "redux-persist-expire";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "auth"],
  transforms: [
    expireReducer("auth", {
      expireSeconds: 86400,
      autoExpire: true,
    }),

    expireReducer("user", {
      expireSeconds: 86400,
      autoExpire: true,
    }),
  ],
};

export const rootReducer = combineReducers({
  auth,
  user,
  orders,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const persistor = persistStore(store);
