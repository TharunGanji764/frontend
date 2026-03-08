import React, { useState, useRef, useEffect } from "react";
import { Stack, Box, TextField, useTheme, alpha } from "@mui/material";

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export default function OTPInput({ length = 6, onComplete }: OTPInputProps) {
  const theme = useTheme();
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    const combinedCode = newOtp.join("");
    if (combinedCode.length === length) {
      onComplete(combinedCode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData("text").slice(0, length).split("");
    const newOtp = [...otp];
    data.forEach((char, i) => {
      if (!isNaN(Number(char))) newOtp[i] = char;
    });
    setOtp(newOtp);
    if (data.length === length) onComplete(newOtp.join(""));
  };

  return (
    <Stack direction="row" spacing={1.5} justifyContent="center">
      {otp?.map((digit, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputRefs.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          variant="outlined"
          autoComplete="one-time-code"
          inputProps={{
            style: {
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: 700,
              padding: "12px 8px",
            },
            maxLength: 1,
            inputMode: "numeric",
          }}
          sx={{
            width: { xs: 45, sm: 56 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: alpha(theme.palette.primary.main, 0.02),
              "&.Mui-focused": {
                bgcolor: "white",
                boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
              },
            },
          }}
        />
      ))}
    </Stack>
  );
}
