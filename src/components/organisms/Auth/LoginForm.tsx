import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
  Stack,
  Typography,
  alpha,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  PersonOutline,
  StorefrontOutlined,
  AlternateEmail,
  LockOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useLoginMutation } from "@/store/api/apiSlice";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/toastSlice";
import { useRouter } from "next/router";

export default function LoginForm() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [role, setRole] = useState("CUSTOMER");
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({
        emailId: userData.email,
        password: userData.password,
      }).unwrap();

      if (response?.success) {
        localStorage.setItem("accessToken", response?.data?.accessToken);
        localStorage.setItem("userData", JSON.stringify(response?.data));

        dispatch(showToast({ message: "Welcome back!", severity: "success" }));

        router.push(response?.data?.role === "SELLER" ? "/seller" : "/");
      }
      if (!response?.success) {
        dispatch(
          showToast({
            message: response?.message || "Login failed",
            severity: "error",
          }),
        );
      }
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
      <Box
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          p: 0.5,
          borderRadius: "12px",
          mb: 4,
        }}
      >
        <Tabs
          value={role}
          onChange={(_, v: string) => setRole(v)}
          variant="fullWidth"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            minHeight: 40,
            "& .MuiTab-root": {
              borderRadius: "10px",
              minHeight: 40,
              textTransform: "none",
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
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          fullWidth
          required
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmail
                  fontSize="small"
                  sx={{ color: "text.secondary", opacity: 0.6 }}
                />
              </InputAdornment>
            ),
          }}
        />

        <Box>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            fullWidth
            required
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined
                    fontSize="small"
                    sx={{ color: "text.secondary", opacity: 0.6 }}
                  />
                </InputAdornment>
              ),
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
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={
                <Typography variant="body2" fontWeight={500}>
                  Remember me
                </Typography>
              }
            />
            <Typography
              variant="body2"
              sx={{ color: "primary.main", fontWeight: 700, cursor: "pointer" }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading}
          disableElevation
          sx={{
            py: 1.5,
            borderRadius: "12px",
            fontWeight: 700,
            fontSize: "1rem",
            textTransform: "none",
            mt: 1,
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            `Login as ${role === "SELLER" ? "Merchant" : "Customer"}`
          )}
        </Button>
      </Stack>
    </Box>
  );
}
