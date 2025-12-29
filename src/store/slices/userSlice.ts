import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

interface UserState {
  profile: {
    name: string;
    email: string;
    phone: string;
    avatar?: string; // base64 / url
  };
  addresses: Address[];
  notificationsEnabled: boolean;
}

const initialState: UserState = {
  profile: {
    name: "Guest User",
    email: "guest@shophub.com",
    phone: "9999999999",
  },
  addresses: [],
  notificationsEnabled: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<UserState["profile"]>) {
      state.profile = action.payload;
    },
    addAddress(state, action: PayloadAction<Address>) {
      state.addresses.push(action.payload);
    },
    updateAddress(state, action: PayloadAction<Address>) {
      state.addresses = state.addresses.map(a =>
        a.id === action.payload.id ? action.payload : a
      );
    },
    deleteAddress(state, action: PayloadAction<string>) {
      state.addresses = state.addresses.filter(a => a.id !== action.payload);
    },
    toggleNotifications(state) {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    logout(state) {
      return initialState; // clears user data
    },
  },
});

export const {
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  toggleNotifications,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
