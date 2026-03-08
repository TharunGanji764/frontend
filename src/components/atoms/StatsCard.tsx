import { Paper, Typography, Box, alpha, useTheme } from "@mui/material";
import { ReactNode } from "react";
import {
  SellerStatsContainer,
  SellerStatsDescription,
  SellerStatsIconBox,
  SellerStatsTitle,
  SellerStatsWaterMarkIcon,
} from "./Styles";

interface Props {
  icon: ReactNode;
  label: string;
  value: string | number;
  description?: string;
  color?: string;
}

export const StatsCard = ({
  icon,
  label,
  value,
  description,
  color = "primary.main",
}: Props) => {
  const theme = useTheme();

  const getMainColor = () => {
    const parts = color.split(".");
    return parts.length > 1
      ? (theme.palette as any)[parts[0]][parts[1]]
      : color;
  };

  const mainColor = getMainColor();

  return (
    <SellerStatsContainer variant="outlined">
      <SellerStatsIconBox $alpha={alpha} $mainColor={mainColor}>
        {icon && (
          <Box sx={{ display: "flex", "& svg": { fontSize: 28 } }}>{icon}</Box>
        )}
      </SellerStatsIconBox>

      <Box sx={{ flexGrow: 1 }}>
        <SellerStatsTitle variant="body2">{label}</SellerStatsTitle>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            lineHeight: 1,
            mb: description ? 0.5 : 0,
          }}
        >
          {value}
        </Typography>

        {description && (
          <SellerStatsDescription variant="body2">
            {description}
          </SellerStatsDescription>
        )}
      </Box>

      <SellerStatsWaterMarkIcon>{icon}</SellerStatsWaterMarkIcon>
    </SellerStatsContainer>
  );
};
