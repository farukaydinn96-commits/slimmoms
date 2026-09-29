import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";

import uiReducer from "./ui/uiSlice";
import productsReducer from "./products/products-slice";
import authReducer from "./auth/auth-slice";
import { setupAxiosInterceptors } from "../services/api/interceptor"; // ✅

const persistAuthConfig = {
  key: "user-token",
  storage,
  whitelist: ["accessToken", "refreshToken"],
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: persistedAuthReducer,
  products: productsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupAxiosInterceptors(store); 

export const persistor = persistStore(store);
