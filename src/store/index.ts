import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import wishlistReducer from "./slices/wishlistSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";
import { apiSlice } from "./api/apiSlice";
import toastReducer from "./slices/toastSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import categoriesReducer from "./slices/categorySlice";
import loaderReducer from "./slices/loaderSlice";
import { sellerApiSlice } from "./api/sellerSlice/sellerApiSlice";
import productWizardSlice from "./slices/seller/productWizardSlice";

const appReducer = combineReducers({
  cart: cartReducer,
  checkout: checkoutReducer,
  wishlist: wishlistReducer,
  user: userReducer,
  orders: orderReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [sellerApiSlice.reducerPath]: sellerApiSlice.reducer,
  toast: toastReducer,
  categories: categoriesReducer,
  loader: loaderReducer,
  productWizard: productWizardSlice,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any,
) => {
  if (action.type === "auth/logout") {
    state = undefined;
    storage.removeItem("persist:root");
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(apiSlice.middleware)
      .concat(sellerApiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
