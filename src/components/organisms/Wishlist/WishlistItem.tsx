import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";

export default function WishlistItem({ item }: any) {
  const dispatch = useDispatch();

  const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100) || 0;

  return (
    <Card sx={{ height: "100%" }}>
      <Box component="img" src={item.image} width="100%" />

      <CardContent>
        <Typography fontWeight={600}>{item.title}</Typography>
        <Typography>⭐ {item.rating}</Typography>

        <Typography>
          ₹{item.price}{" "}
          <Typography
            component="span"
            sx={{ textDecoration: "line-through", ml: 1 }}
          >
            ₹{item.mrp}
          </Typography>
        </Typography>

        {discount > 0 && (
          <Chip
            label={`${discount}% Price Drop`}
            color="success"
            size="small"
          />
        )}

        <Typography sx={{ mt: 1 }}>
          {item.inStock ? "In Stock" : "Out of Stock"}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          disabled={!item.inStock}
          onClick={() => {
            dispatch(addToCart({ ...item, quantity: 1 }));
            dispatch(removeFromWishlist(item.id));
          }}
        >
          Move to Cart
        </Button>

        <Button
          fullWidth
          sx={{ mt: 1 }}
          color="error"
          onClick={() => dispatch(removeFromWishlist(item.id))}
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  );
}
