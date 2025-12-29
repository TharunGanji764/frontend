import { Box, Typography, Button, Avatar, Switch } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import EditProfileModal from "@/components/molecules/Profile/EditProfileModal";

export default function ProfileOverview() {
  const { profile, notificationsEnabled } = useSelector(
    (state: RootState) => state.user
  );
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Avatar src={profile.avatar} sx={{ width: 80, height: 80 }} />
      <Typography variant="h6" sx={{ mt: 1 }}>
        {profile.name}
      </Typography>
      <Typography>{profile.email}</Typography>
      <Typography>{profile.phone}</Typography>

      <Button sx={{ mt: 2 }} variant="outlined" onClick={() => setOpen(true)}>
        Edit Profile
      </Button>

      <Box sx={{ mt: 3 }}>
        <Typography>Notifications</Typography>
        <Switch checked={notificationsEnabled} />
      </Box>

      <EditProfileModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
