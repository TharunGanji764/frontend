import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import wishlistReducer from "./slices/wishlistSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";

const loadState = () => {
  try {
    const serialized = localStorage.getItem("cart");
    return serialized ? { cart: JSON.parse(serialized) } : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  } catch {}
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    orders: orderReducer,
  },
  preloadedState: typeof window !== "undefined" ? loadState() : undefined,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
