import OTPInput from "@/components/atoms/Otp";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useState } from "react";

const OTPVerificationScreen = ({
  email = "user@example.com",
  handleSubmit,
  handleResendOtp,
}: any) => {
  const [otpCode, setOtpCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = async () => {
    setIsSubmitting(true);
    setIsSubmitting(false);
    handleSubmit(otpCode);
  };

  const handleResendClick = () => {
    handleResendOtp();
  };

  return (
    <Box sx={{ maxWidth: 450, mx: "auto", mt: 4, textAlign: "center" }}>
      <Typography variant="h5" fontWeight={800} gutterBottom>
        Verify your Email
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        We've sent a 6-digit verification code to <br />
        <strong>{email}</strong>
      </Typography>

      <Box sx={{ mb: 4 }}>
        <OTPInput onComplete={(code) => setOtpCode(code)} />
      </Box>

      <Button
        fullWidth
        variant="contained"
        size="large"
        disabled={otpCode?.length < 6 || isSubmitting}
        onClick={handleVerify}
        sx={{
          py: 1.5,
          borderRadius: "12px",
          fontWeight: 700,
          textTransform: "none",
          boxShadow: "none",
        }}
      >
        Verify & Activate Account
      </Button>

      <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Didn't receive the code?
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          fontWeight={700}
          sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          onClick={handleResendClick}
        >
          Resend Code
        </Typography>
      </Stack>
    </Box>
  );
};

export default OTPVerificationScreen;
