import { Box, Typography, Button, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { deleteAddress } from "@/store/slices/userSlice";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

import {
  ProfileSectionCard,
  ProfileSectionHeader,
  AddressCard,
  AddressIconBox,
  AddressEmptyState,
} from "./styles";

export default function AddressManager() {
  const { addresses } = useSelector((s: RootState) => s.user);
  const dispatch = useDispatch();

  return (
    <ProfileSectionCard elevation={0}>
      {/* ── Header ── */}
      <ProfileSectionHeader>
        <Typography
          sx={{ fontSize: "0.875rem", fontWeight: 700, color: "text.primary" }}
        >
          My Addresses
        </Typography>
        <Button
          startIcon={<AddIcon sx={{ fontSize: "0.85rem !important" }} />}
          variant="contained"
          size="small"
          sx={{
            textTransform: "uppercase",
            fontWeight: 600,
            fontSize: "0.729vw",
            letterSpacing: "0.06em",
            bgcolor: "text.primary",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#1F2937",
              boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
            },
          }}
        >
          Add Address
        </Button>
      </ProfileSectionHeader>

      <Box sx={{ p: "1.2rem 1.5rem" }}>
        {/* ── Empty state ── */}
        {addresses.length === 0 ? (
          <AddressEmptyState>
            <InboxOutlinedIcon
              sx={{ fontSize: "2.5rem", color: "text.secondary", mb: 1 }}
            />
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              No addresses saved
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Add a delivery address to get started
            </Typography>
          </AddressEmptyState>
        ) : (
          <Stack spacing={1.25}>
            {addresses.map((a) => (
              <AddressCard key={a.id}>
                {/* Icon */}
                <AddressIconBox>
                  <HomeOutlinedIcon sx={{ fontSize: "1rem" }} />
                </AddressIconBox>

                {/* Details */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "text.primary",
                      lineHeight: 1.3,
                    }}
                  >
                    {a.fullName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.25 }}
                  >
                    {a.line1}, {a.city}
                  </Typography>
                  {a.state && (
                    <Typography variant="body2" color="text.secondary">
                      {a.state}
                      {a.pincode ? ` — ${a.pincode}` : ""}
                    </Typography>
                  )}
                </Box>

                {/* Actions */}
                <Stack direction="row" spacing={0.75} sx={{ flexShrink: 0 }}>
                  <Button
                    size="small"
                    startIcon={
                      <EditOutlinedIcon
                        sx={{ fontSize: "0.8rem !important" }}
                      />
                    }
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 600,
                      fontSize: "0.729vw",
                      letterSpacing: "0.06em",
                      color: "text.primary",
                      borderColor: "divider",
                      borderRadius: "8px",
                      border: "1.5px solid",
                      "&:hover": {
                        borderColor: "text.primary",
                        bgcolor: "action.hover",
                      },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={
                      <DeleteOutlineIcon
                        sx={{ fontSize: "0.8rem !important" }}
                      />
                    }
                    onClick={() => dispatch(deleteAddress(a.id))}
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 600,
                      fontSize: "0.729vw",
                      letterSpacing: "0.06em",
                      color: "#DC2612",
                      borderColor: "rgba(220,38,18,0.3)",
                      borderRadius: "8px",
                      border: "1.5px solid",
                      "&:hover": {
                        borderColor: "#DC2612",
                        bgcolor: "rgba(220,38,18,0.06)",
                      },
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </AddressCard>
            ))}
          </Stack>
        )}
      </Box>
    </ProfileSectionCard>
  );
}
