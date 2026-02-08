import { Box, Typography, Button, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { deleteAddress } from "@/store/slices/userSlice";

export default function AddressManager() {
  const { addresses } = useSelector((s: RootState) => s.user);
  const dispatch = useDispatch();

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        My Addresses
      </Typography>

      {addresses.map((a) => (
        <Paper key={a.id} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Typography>{a.fullName}</Typography>
          <Typography color="text.secondary">
            {a.line1}, {a.city}
          </Typography>

          <Button
            color="error"
            size="small"
            sx={{ mt: 1 }}
            onClick={() => dispatch(deleteAddress(a.id))}
          >
            Delete
          </Button>
        </Paper>
      ))}

      <Button variant="outlined">Add Address</Button>
    </Box>
  );
}
