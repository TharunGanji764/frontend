import { Box, Typography, Button, Chip, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";

export default function ProductInfo({ product }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <Box>
      <Typography variant="h5">{product?.title}</Typography>
      <Typography color="text.secondary">{product?.brand}</Typography>

      <Box sx={{ my: 2 }}>
        <Chip label={`${product?.rating} ★`} color="success" />
        <Typography variant="body2" sx={{ ml: 1 }} component="span">
          {product?.reviews?.length} reviews
        </Typography>
      </Box>

      <Typography variant="h6">
        ₹{product?.discounted_price}{" "}
        <Typography
          component="span"
          sx={{ textDecoration: "line-through", ml: 1 }}
        >
          ₹{product?.price}
        </Typography>
      </Typography>

      <Typography color="success.main">
        {product?.discount_percentage}% off
      </Typography>

      <Typography sx={{ mt: 1 }}>
        {product?.stock > 0 ? "In Stock" : "Out of Stock"}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          disabled={product?.stock === 0}
          onClick={() => handleAddToCart(product)}
        >
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
