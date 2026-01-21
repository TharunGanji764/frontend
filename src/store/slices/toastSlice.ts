import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToastSlice = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const initialState: ToastSlice = {
  open: false,
  message: "",
  severity: "success",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        severity: ToastSlice["severity"];
      }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideToast: (state) => {
      state.open = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
