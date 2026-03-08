import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  PersonOutline,
  StorefrontOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import {
  useRegisterMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/store/api/apiSlice";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";
import OTPVerificationScreen from "./OtpForm";
import { useRouter } from "next/router";

export default function RegisterForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const [role, setRole] = useState("CUSTOMER");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
  const [resendOtp, { isLoading: isResendingOtp }] = useResendOtpMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
  const [userData, setUserData] = useState<{
    emailId: string;
    mobile: string;
    password: string;
    username: string;
    storeName?: string;
  }>({
    emailId: "",
    mobile: "",
    password: "",
    username: "",
    storeName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await register({ ...userData, role });
    console.log("response: ", response);
    if (response?.data?.data?.success) {
      dispatch(
        showToast({
          message: response?.data?.message,
          severity: "success",
        }),
      );
      setShowOtpScreen(true);
    }
    if (!response?.data?.data?.success) {
      dispatch(
        showToast({
          message: response?.data?.message || "Registration failed",
          severity: "error",
        }),
      );
    }
  };

  const handleCreateAccount = async (data: any) => {
    const response = await verifyOtp({ emailId: userData?.emailId, otp: data });
    if (response?.data?.data?.success) {
      dispatch(
        showToast({
          message: response?.data?.message,
          severity: "success",
        }),
      );
      setShowOtpScreen(false);
      router.push("/auth/login");
    }
    if (!response?.data?.data?.success) {
      dispatch(
        showToast({
          message: response?.data?.message || "OTP verification failed",
          severity: "error",
        }),
      );
    }
  };

  const handleResendOtp = async () => {
    const response = await resendOtp({ emailId: userData?.emailId });
    if (response?.data?.message) {
      dispatch(
        showToast({
          message: response?.data?.message,
          severity: "success",
        }),
      );
    }
  };

  if (showOtpScreen) {
    return (
      <OTPVerificationScreen
        email={userData?.emailId}
        handleSubmit={handleCreateAccount}
        handleResendOtp={handleResendOtp}
      />
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          padding: "12px",
          borderRadius: "12px",
          mb: 4,
        }}
      >
        <Tabs
          value={role}
          onChange={(_, value: string) => setRole(value)}
          variant="fullWidth"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            minHeight: 40,
            "& .MuiTab-root": {
              borderRadius: "10px",
              minHeight: 40,
              transition: "0.2s",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "text.secondary",
              "&.Mui-selected": {
                bgcolor: "white",
                color: "primary.main",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              },
            },
          }}
        >
          <Tab
            value="CUSTOMER"
            label="Customer"
            icon={<PersonOutline sx={{ fontSize: 18 }} />}
            iconPosition="start"
            disableRipple
          />
          <Tab
            value="SELLER"
            label="Merchant"
            icon={<StorefrontOutlined sx={{ fontSize: 18 }} />}
            iconPosition="start"
            disableRipple
          />
        </Tabs>
      </Box>

      <Stack spacing={2.5}>
        <TextField
          label="Full Name"
          placeholder="e.g. John Doe"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={userData?.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <TextField
          label="Mobile Number"
          placeholder="e.g. 1234567890"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={userData?.mobile}
          onChange={(e) => {
            if (e.target.value.length <= 10) {
              setUserData({ ...userData, mobile: e.target.value });
            }
          }}
          type="number"
        />
        {role === "SELLER" && (
          <TextField
            label="Store Name"
            placeholder="e.g. Nexus Tech Store"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            sx={{
              animation: "fadeIn 0.3s ease-out",
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "translateY(-10px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
            value={userData?.storeName}
            onChange={(e) =>
              setUserData({ ...userData, storeName: e.target.value })
            }
          />
        )}

        <TextField
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={userData?.emailId}
          onChange={(e) =>
            setUserData({ ...userData, emailId: e.target.value })
          }
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={userData?.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
      </Stack>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disableElevation
        sx={{
          mt: 4,
          py: 1.5,
          borderRadius: "12px",
          fontWeight: 700,
          fontSize: "1rem",
          textTransform: "none",
        }}
      >
        Create {role === "SELLER" ? "Merchant" : "Customer"} Account
      </Button>

      <Typography
        variant="body2"
        display="block"
        sx={{ mt: 2, textAlign: "center", color: "text.secondary", px: 2 }}
      >
        By clicking "Create Account", you agree to ShopHub's Terms of Service
        and Privacy Policy.
      </Typography>
    </Box>
  );
}
