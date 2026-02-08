import {
  Box,
  Typography,
  Button,
  Avatar,
  Switch,
  Divider,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import EditProfileModal from "@/components/molecules/Profile/EditProfileModal";
import { RowStack } from "@/components/commonStyles/styles";

export default function ProfileOverview() {
  const { profile, notificationsEnabled } = useSelector(
    (state: RootState) => state.user,
  );
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Stack direction="row" spacing={3} alignItems="center">
        <Avatar src={profile?.avatar} sx={{ width: 88, height: 88 }} />
        <Box>
          <Typography variant="h6" color="text.primary">
            {profile?.name}
          </Typography>
          <Typography color="text.secondary">{profile?.email}</Typography>
          <Typography color="text.secondary">{profile?.phone}</Typography>
        </Box>
      </Stack>

      <Button sx={{ mt: 3 }} variant="outlined" onClick={() => setOpen(true)}>
        Edit Profile
      </Button>

      <Divider sx={{ my: 4 }} />

      <RowStack justifyContent="space-between">
        <Typography color="text.primary">Notifications</Typography>
        <Switch checked={notificationsEnabled} />
      </RowStack>

      <EditProfileModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
