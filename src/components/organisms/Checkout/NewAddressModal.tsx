import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function AddressModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("New Address Data:", data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} disableScrollLock={true}>
      <Box sx={style}>
        <Typography variant="h6" mb={3}>
          Add New Address
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              required
              fullWidth
              label="Address Line"
              name="address_line"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              label="City"
              name="city"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              label="State"
              name="state"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              label="Pincode"
              name="pincode"
              variant="outlined"
            />
            <FormControlLabel
              control={<Checkbox name="is_default" value="true" />}
              label="Set as default address"
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Save Address
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
