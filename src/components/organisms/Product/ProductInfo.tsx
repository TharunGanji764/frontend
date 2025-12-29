import { Box, Typography, Button, Chip, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ProductInfo({ product }: any) {
  return (
    <Box>
      <Typography variant="h5">{product?.title}</Typography>
      <Typography color="text.secondary">{product.brand}</Typography>

      <Box sx={{ my: 2 }}>
        <Chip label={`${product?.rating} ★`} color="success" />
        <Typography variant="body2" sx={{ ml: 1 }} component="span">
          {product?.reviewsCount} reviews
        </Typography>
      </Box>

      <Typography variant="h6">
        ₹{product?.price}{" "}
        <Typography
          component="span"
          sx={{ textDecoration: "line-through", ml: 1 }}
        >
          ₹{product?.mrp}
        </Typography>
      </Typography>

      <Typography color="success.main">{product?.discount}% off</Typography>

      <Typography sx={{ mt: 1 }}>
        {product?.inStock ? "In Stock" : "Out of Stock"}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" disabled={!product?.inStock}>
          Add to Cart
        </Button>
        <IconButton sx={{ ml: 1 }}>
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      <Box sx={{ mt: 3 }}>
        {product?.bullets?.map((b: string, i: number) => (
          <Typography key={i}>• {b}</Typography>
        ))}
      </Box>
    </Box>
  );
}
