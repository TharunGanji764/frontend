import { Box, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setPaymentMethod } from "@/store/slices/checkoutSlice";
import { useState } from "react";

export default function PaymentStep({ onNext }: any) {
  const [method, setMethod] = useState("");
  const dispatch = useDispatch();

  const handleContinue = () => {
    dispatch(setPaymentMethod(method));
    onNext();
  };

  return (
    <Box>
      <RadioGroup value={method} onChange={(e) => setMethod(e.target.value)}>
        <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
        <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
        <FormControlLabel value="CARD" control={<Radio />} label="Card" />
      </RadioGroup>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!method}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </Box>
  );
}
