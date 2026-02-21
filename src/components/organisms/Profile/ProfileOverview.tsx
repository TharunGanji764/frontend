import {
  Box,
  Typography,
  Button,
  Avatar,
  Switch,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import EditProfileModal from "@/components/molecules/Profile/EditProfileModal";

// MUI Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import {
  ProfileBanner,
  ProfileHeroCard,
  ProfileHeroBody,
  AvatarEditWrapper,
  AvatarEditButton,
  StatCard,
  StatIconWrapper,
  SectionCard,
  SectionHeader,
  InfoGrid,
  InfoField,
  NotifRow,
  NotifIcon,
  StatusChip,
} from "./styles";

const stats = [
  {
    icon: <ShoppingBagOutlinedIcon sx={{ fontSize: "1.1rem" }} />,
    value: "24",
    label: "Total Orders",
    variant: "default" as const,
  },
  {
    icon: <FavoriteBorderIcon sx={{ fontSize: "1.1rem" }} />,
    value: "12",
    label: "Wishlist Items",
    variant: "success" as const,
  },
  {
    icon: <AttachMoneyIcon sx={{ fontSize: "1.1rem" }} />,
    value: "$1.4k",
    label: "Total Spent",
    variant: "warning" as const,
  },
];

// ── Notification prefs config ─────────────────────────────────────────────────
const notifPrefs = [
  {
    key: "push",
    icon: <NotificationsNoneIcon sx={{ fontSize: "0.95rem" }} />,
    label: "Push Notifications",
    desc: "Receive alerts for orders and promotions",
  },
  {
    key: "email",
    icon: <EmailOutlinedIcon sx={{ fontSize: "0.95rem" }} />,
    label: "Email Updates",
    desc: "Weekly newsletters and promotional offers",
  },
  {
    key: "sms",
    icon: <PhoneIphoneOutlinedIcon sx={{ fontSize: "0.95rem" }} />,
    label: "SMS Alerts",
    desc: "Order status updates via text message",
  },
  {
    key: "restock",
    icon: <TrendingUpIcon sx={{ fontSize: "0.95rem" }} />,
    label: "Restock Alerts",
    desc: "Notify when wishlist items are back in stock",
  },
];

export default function ProfileOverview() {
  const { profile, notificationsEnabled } = useSelector(
    (state: RootState) => state.user,
  );
  const [open, setOpen] = useState(false);

  const [notifState, setNotifState] = useState({
    push: notificationsEnabled ?? true,
    email: true,
    sms: false,
    restock: true,
  });

  const handleNotifToggle = (key: keyof typeof notifState) => {
    setNotifState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Box>
      <ProfileHeroCard elevation={0}>
        <ProfileBanner />

        <ProfileHeroBody>
          <AvatarEditWrapper>
            <Avatar
              src={profile?.avatar}
              sx={{
                width: 76,
                height: 76,
                border: "3px solid #fff",
                boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
                fontSize: "1.5rem",
                fontWeight: 700,
                bgcolor: "text.primary",
              }}
            >
              {profile?.name?.[0]?.toUpperCase()}
            </Avatar>
            <AvatarEditButton onClick={() => setOpen(true)}>
              <EditOutlinedIcon sx={{ fontSize: "0.7rem" }} />
            </AvatarEditButton>
          </AvatarEditWrapper>

          <Box sx={{ flex: 1, pb: 0.5 }}>
            <Typography variant="h5" color="text.primary">
              {profile?.name || "—"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.25 }}
            >
              {profile?.email}
              {profile?.email && profile?.phone ? " · " : ""}
              {profile?.phone}
            </Typography>
          </Box>

          {/* Action buttons */}
          <Stack direction="row" spacing={1} sx={{ pb: 0.5, flexShrink: 0 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={
                <ShareOutlinedIcon sx={{ fontSize: "0.85rem !important" }} />
              }
              sx={{
                textTransform: "uppercase",
                fontWeight: 600,
                fontSize: "0.729vw",
                letterSpacing: "0.06em",
                borderColor: "divider",
                color: "text.primary",
                borderRadius: "8px",
                "&:hover": {
                  borderColor: "text.primary",
                  bgcolor: "action.hover",
                },
              }}
            >
              Share
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={
                <EditOutlinedIcon sx={{ fontSize: "0.85rem !important" }} />
              }
              onClick={() => setOpen(true)}
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
              Edit Profile
            </Button>
          </Stack>
        </ProfileHeroBody>
      </ProfileHeroCard>

      {/* ── Stats Row ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          mb: "1.1rem",
        }}
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} elevation={0}>
            <StatIconWrapper variant={stat.variant}>
              {stat.icon}
            </StatIconWrapper>
            <Box>
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "text.primary",
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.25 }}
              >
                {stat.label}
              </Typography>
            </Box>
          </StatCard>
        ))}
      </Box>

      {/* ── Personal Information ── */}
      <SectionCard elevation={0}>
        <SectionHeader>
          <Typography
            sx={{
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Personal Information
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={
              <EditOutlinedIcon sx={{ fontSize: "0.85rem !important" }} />
            }
            onClick={() => setOpen(true)}
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              fontSize: "0.729vw",
              letterSpacing: "0.06em",
              borderColor: "divider",
              color: "text.primary",
              borderRadius: "8px",
              "&:hover": {
                borderColor: "text.primary",
                bgcolor: "action.hover",
              },
            }}
          >
            Edit
          </Button>
        </SectionHeader>

        <Box sx={{ p: "1.2rem 1.5rem" }}>
          <InfoGrid>
            <InfoField>
              <Typography component="label" className="field-label">
                First Name
              </Typography>
              <Typography className="field-value">
                {profile?.name?.split(" ")[0] || "—"}
              </Typography>
            </InfoField>
            <InfoField>
              <Typography component="label" className="field-label">
                Last Name
              </Typography>
              <Typography className="field-value">
                {profile?.name?.split(" ")[1] || "—"}
              </Typography>
            </InfoField>
            <InfoField>
              <Typography component="label" className="field-label">
                Email Address
              </Typography>
              <Typography className="field-value">
                {profile?.email || "—"}
              </Typography>
            </InfoField>
            <InfoField>
              <Typography component="label" className="field-label">
                Phone Number
              </Typography>
              <Typography className="field-value">
                {profile?.phone || "—"}
              </Typography>
            </InfoField>
            <InfoField>
              <Typography component="label" className="field-label">
                Account Status
              </Typography>
              <StatusChip>Active</StatusChip>
            </InfoField>
          </InfoGrid>
        </Box>
      </SectionCard>

      {/* ── Notifications & Preferences ── */}
      <SectionCard elevation={0}>
        <SectionHeader>
          <Typography
            sx={{
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Notifications & Preferences
          </Typography>
        </SectionHeader>

        <Box sx={{ px: "1.5rem" }}>
          {notifPrefs.map((pref, index) => (
            <NotifRow
              key={pref.key}
              sx={{
                borderBottom:
                  index < notifPrefs.length - 1 ? "1px solid" : "none",
                borderColor: "divider",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.2}>
                <NotifIcon>{pref.icon}</NotifIcon>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "text.primary",
                    }}
                  >
                    {pref.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pref.desc}
                  </Typography>
                </Box>
              </Stack>

              <Switch
                checked={notifState[pref.key as keyof typeof notifState]}
                onChange={() =>
                  handleNotifToggle(pref.key as keyof typeof notifState)
                }
                size="small"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#fff",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#111827",
                    opacity: 1,
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "#E5E7EB",
                    opacity: 1,
                  },
                }}
              />
            </NotifRow>
          ))}
        </Box>
      </SectionCard>

      <EditProfileModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
