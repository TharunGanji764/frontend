import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useLoginMutation } from "@/store/api/apiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { showToast } from "@/store/slices/toastSlice";
import { useRouter } from "next/router";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({
        emailId: userData.email,
        password: userData.password,
      }).unwrap();
      localStorage.setItem("accessToken", response?.accessToken);
      localStorage.setItem("userData", JSON.stringify(response));

      dispatch(
        showToast({
          message: "Logged in successfully",
          severity: "success",
        }),
      );

      router.push("/");
      // router.reload();
    } catch (err: any) {
      dispatch(
        showToast({
          message: err?.data?.message || "Login failed",
          severity: "error",
        }),
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        fullWidth
        required
        sx={{ mb: 2 }}
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        required
        sx={{ mb: 2 }}
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <FormControlLabel
        control={<Checkbox />}
        label="Remember me"
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
}
