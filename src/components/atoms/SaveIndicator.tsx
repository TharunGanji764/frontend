import { Stack, Typography } from "@mui/material";
import {
  CloudDone as SavedIcon,
  Sync as SavingIcon,
} from "@mui/icons-material";
import { SellerRowStack } from "./Styles";

interface Props {
  status: string;
}

export const SaveIndicator = ({ status }: Props) => {
  if (status === "idle") return null;

  const map: any = {
    saving: {
      icon: (
        <SavingIcon
          sx={{
            fontSize: 14,
            animation: "spin 1s linear infinite",
          }}
        />
      ),
      label: "Saving…",
      color: "text.secondary",
    },
    saved: {
      icon: <SavedIcon sx={{ fontSize: 14 }} />,
      label: "Saved",
      color: "success.main",
    },
    error: {
      icon: null,
      label: "Save failed",
      color: "error.main",
    },
  };

  const s = map[status];
  if (!s) return null;

  return (
    <SellerRowStack $color={s?.color} gap={0.5}>
      {s?.icon}
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {s?.label}
      </Typography>
    </SellerRowStack>
  );
};
