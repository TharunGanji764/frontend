import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO: API integration
    console.log("Register submit");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField label="Full Name" fullWidth required sx={{ mb: 2 }} />

      <TextField label="Email" type="email" fullWidth required sx={{ mb: 2 }} />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        required
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        required
        sx={{ mb: 3 }}
      />

      <Button type="submit" variant="contained" fullWidth>
        Create Account
      </Button>
    </Box>
  );
}
