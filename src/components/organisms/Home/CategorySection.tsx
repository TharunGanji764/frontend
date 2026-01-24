import CapitalizeString from "@/utils/CapitalizeString";
import { Box, Card, CardMedia, Typography } from "@mui/material";

export default function CategorySection({ categories }: any) {
  return (
    <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
      {categories?.map((category: any) => (
        <Card key={category} sx={{ minWidth: 160, textAlign: "center" }}>
          <CardMedia
            component="img"
            height="120"
            image={"./default-img.png"}
            loading="lazy"
          />
          <Typography variant="body2" sx={{ p: 1 }}>
            {CapitalizeString(category)}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}
