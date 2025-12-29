import { Box, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { deleteAddress } from "@/store/slices/userSlice";

export default function AddressManager() {
  const { addresses } = useSelector((s: RootState) => s.user);
  const dispatch = useDispatch();

  return (
    <Box>
      <Typography variant="h6">My Addresses</Typography>
      {addresses.map((a) => (
        <Box key={a.id} sx={{ p: 2, border: "1px solid #eee", mt: 2 }}>
          <Typography>{a.fullName}</Typography>
          <Typography>
            {a.line1}, {a.city}
          </Typography>
          <Button color="error" onClick={() => dispatch(deleteAddress(a.id))}>
            Delete
          </Button>
        </Box>
      ))}
      <Button sx={{ mt: 2 }} variant="outlined">
        Add Address
      </Button>
    </Box>
  );
}
