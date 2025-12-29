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
import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO: API integration
    console.log("Login submit");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
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

      <FormControlLabel
        control={<Checkbox />}
        label="Remember me"
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" fullWidth>
        Login
      </Button>
    </Box>
  );
}
