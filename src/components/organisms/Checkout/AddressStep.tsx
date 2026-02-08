import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useGetAddressQuery } from "@/store/api/apiSlice";
import AddressModal from "./NewAddressModal";

export default function AddressStep({ onNext }: any) {
  const { data: addressList, isLoading } = useGetAddressQuery();
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (addressList && !selectedAddress) {
      const defaultAddr = addressList?.find((addr: any) => addr?.is_default);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr);
      } else if (addressList?.length > 0) {
        setSelectedAddress(addressList[0]);
      }
    }
  }, [addressList, selectedAddress]);

  if (isLoading) return <CircularProgress />;

  return (
    <Box maxWidth={500}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Select Delivery Address
      </Typography>

      <RadioGroup
        value={selectedAddress?.id || ""}
        onChange={(e) => {
          const addr = addressList.find(
            (a: any) => String(a?.id) === e.target.value,
          );
          setSelectedAddress(addr);
        }}
      >
        {addressList?.map((addr: any) => (
          <Paper
            key={addr?.id}
            variant="outlined"
            sx={{
              p: 2,
              mb: 2,
              cursor: "pointer",
              border:
                selectedAddress?.id === addr?.id
                  ? "2px solid #1976d2"
                  : "1px solid #e0e0e0",
            }}
            onClick={() => setSelectedAddress(addr)}
          >
            <FormControlLabel
              value={addr?.id}
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {addr?.address_line} {addr?.is_default && "(Default)"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {addr?.city}, {addr?.state} - {addr?.pincode}
                  </Typography>
                  <Typography variant="body2">{addr?.phone}</Typography>
                </Box>
              }
            />
          </Paper>
        ))}
      </RadioGroup>

      <Button
        variant="contained"
        fullWidth
        disabled={!selectedAddress}
        onClick={() => onNext(selectedAddress)}
        sx={{ mt: 2 }}
      >
        Deliver to this Address
      </Button>

      <Button
        variant="text"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => setIsModalOpen(true)}
      >
        + Add New Address
      </Button>
      <AddressModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}
