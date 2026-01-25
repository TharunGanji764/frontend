import { Box, Typography, Button, Chip, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useAddToCartMutation } from "@/store/api/apiSlice";
import { showToast } from "@/store/slices/toastSlice";

export default function ProductInfo({ product }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async (product: any) => {
    try {
      const response = await addToCart({
        product_id: product?.sku,
        quantity: 1,
      }).unwrap();

      if (response?.data) {
        dispatch(
          showToast({
            message: "Product added to cart",
            severity: "success",
          }),
        );
      }
    } catch (err: any) {
      dispatch(
        showToast({
          message: err?.data?.message || "Login failed",
          severity: "error",
        }),
      );
    }
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
