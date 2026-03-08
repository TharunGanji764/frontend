import { Chip } from "@mui/material";

interface Props {
  status: string;
}

export const StatusChip = ({ status }: Props) => {
  const map: any = {
    ACTIVE: { color: "success", label: "Active" },
    DRAFT: { color: "default", label: "Draft" },
    INACTIVE: { color: "warning", label: "Inactive" },
  };

  const chipStatus = map[status] || map?.DRAFT;

  return (
    <Chip label={chipStatus?.label} color={chipStatus?.color} size="small" />
  );
};
