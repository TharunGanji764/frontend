import { Box, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAddress } from "@/store/slices/checkoutSlice";

export default function AddressStep({ onNext }: any) {
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    dispatch(
      setAddress({
        fullName: data.get("name")?.toString() || "",
        phone: data.get("phone")?.toString() || "",
        email: data.get("email")?.toString() || "",
        line1: data.get("address")?.toString() || "",
        city: data.get("city")?.toString() || "",
        state: data.get("state")?.toString() || "",
        pincode: data.get("pincode")?.toString() || "",
      })
    );
    onNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField name="name" label="Full Name" fullWidth required />
      <TextField name="phone" label="Phone" fullWidth required sx={{ mt: 2 }} />
      <TextField name="email" label="Email" fullWidth required sx={{ mt: 2 }} />
      <TextField
        name="address"
        label="Address"
        fullWidth
        required
        sx={{ mt: 2 }}
      />
      <TextField name="city" label="City" fullWidth required sx={{ mt: 2 }} />
      <TextField name="state" label="State" fullWidth required sx={{ mt: 2 }} />
      <TextField
        name="pincode"
        label="Pincode"
        fullWidth
        required
        sx={{ mt: 2 }}
      />

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Continue
      </Button>
    </Box>
  );
}
