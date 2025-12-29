import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  fullName: string;
  phone: string;
  email: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
}

interface CheckoutState {
  address: Address | null;
  paymentMethod: string | null;
}

const initialState: CheckoutState = {
  address: null,
  paymentMethod: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<Address>) {
      state.address = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<string>) {
      state.paymentMethod = action.payload;
    },
    clearCheckout(state) {
      state.address = null;
      state.paymentMethod = null;
    },
  },
});

export const { setAddress, setPaymentMethod, clearCheckout } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
