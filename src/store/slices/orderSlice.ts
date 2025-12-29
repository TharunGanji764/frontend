import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: string;
  items: any[];
  total: number;
  paymentMethod: string;
  status: string;
  date: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.unshift(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
