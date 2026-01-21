import { AppDispatch, RootState } from "@/store";
import { hideToast } from "@/store/slices/toastSlice";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

export default function AppSnackbar() {
  const { open, message, severity } = useSelector(
    (state: RootState) => state.toast
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => dispatch(hideToast())}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
