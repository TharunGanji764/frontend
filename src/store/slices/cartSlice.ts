import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product_id: number;
  product_name: string;
  price: number;
  mrp: number;
  product_image: string;
  quantity: number;
}

interface CartState {
  items: any[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<any>) {
      const existing = state.items.find(
        (i) => i?.product_id === action?.payload?.data?.product_id,
      );

      if (existing) {
        existing.quantity = action?.payload?.data?.quantity;
      } else {
        state.items.push(action?.payload?.data);
      }
    },

    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const item = state.items.find((i) => i?.product_id === action?.payload?.id);
      if (item && action.payload.quantity >= 1) {
        item.quantity = action.payload.quantity;
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.product_id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItemToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
