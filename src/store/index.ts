import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import wishlistReducer from "./slices/wishlistSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";
import { apiSlice } from "./api/apiSlice";
import toastReducer from "./slices/toastSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import categoriesReducer from "./slices/categorySlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user"],
};

const rootReducer = {
  cart: cartReducer,
  checkout: checkoutReducer,
  wishlist: wishlistReducer,
  user: userReducer,
  orders: orderReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  toast: toastReducer,
  categories: categoriesReducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
