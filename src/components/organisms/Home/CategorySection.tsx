import { Box, Card, CardMedia, Typography } from "@mui/material";
import products from "@/mock-data/product-details";
import getCategories from "@/utils/getCategories";

export default function CategorySection() {
  const categories = getCategories(products);

  return (
    <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
      {categories?.map((cat) => (
        <Card key={cat} sx={{ minWidth: 160, textAlign: "center" }}>
          <CardMedia
            component="img"
            height="120"
            image={"./default-img.png"}
            loading="lazy"
          />
          <Typography variant="body2" sx={{ p: 1 }}>
            {cat}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}
