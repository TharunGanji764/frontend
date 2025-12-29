import { Dialog, Box, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "@/store/slices/userSlice";
import { RootState } from "@/store";
import { useState } from "react";

export default function EditProfileModal({ open, onClose }: any) {
  const { profile } = useSelector((s: RootState) => s.user);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(profile.avatar);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    dispatch(
      updateProfile({
        name: data.get("name") as string,
        email: data.get("email") as string,
        phone: data.get("phone") as string,
        avatar,
      })
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, width: 400 }}>
        <TextField
          name="name"
          defaultValue={profile.name}
          label="Name"
          fullWidth
        />
        <TextField
          name="email"
          defaultValue={profile.email}
          label="Email"
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          name="phone"
          defaultValue={profile.phone}
          label="Phone"
          fullWidth
          sx={{ mt: 2 }}
        />

        <Button component="label" sx={{ mt: 2 }}>
          Upload Avatar
          <input
            type="file"
            hidden
            onChange={(e: any) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setAvatar(reader.result as string);
              reader.readAsDataURL(file);
            }}
          />
        </Button>

        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Save
        </Button>
      </Box>
    </Dialog>
  );
}
