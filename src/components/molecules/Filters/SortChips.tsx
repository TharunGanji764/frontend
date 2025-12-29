import { Chip, Stack } from "@mui/material";

export default function SortChips({ value, onChange }: any) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Price ↑"
        clickable
        color={value === "priceLow" ? "primary" : "default"}
        onClick={() => onChange("priceLow")}
      />
      <Chip
        label="Rating"
        clickable
        color={value === "rating" ? "primary" : "default"}
        onClick={() => onChange("rating")}
      />
      <Chip
        label="Discount"
        clickable
        color={value === "discount" ? "primary" : "default"}
        onClick={() => onChange("discount")}
      />
    </Stack>
  );
}
