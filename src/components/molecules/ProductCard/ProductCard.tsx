import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Favorite, Add, Remove } from "@mui/icons-material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/store";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "@/store/slices/cartSlice";

interface Props {
  product: any;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((s: RootState) => s.cart.items);
  const wishlist = useSelector((s: RootState) => s.wishlist.items);

  const cartItem = cartItems.find((i: any) => i.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  const inWishlist = wishlist.some((i: any) => i.id === product.id);

  const handleAddFirst = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleIncrease = () => {
    dispatch(
      updateQuantity({
        id: product.id,
        quantity: quantity + 1,
      })
    );
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(
        updateQuantity({
          id: product.id,
          quantity: quantity - 1,
        })
      );
    }
  };

  const handleBuyNow = () => {
    if (!cartItem) {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
    router.push("/checkout");
  };

  return (
    <Card sx={{ height: "100%", position: "relative" }}>
      {/* Wishlist */}
      <IconButton
        sx={{ position: "absolute", top: 8, right: 8 }}
        onClick={() =>
          inWishlist
            ? dispatch(removeFromWishlist(product.id))
            : dispatch(addToWishlist(product))
        }
      >
        {inWishlist ? <Favorite /> : <FavoriteBorderIcon />}
      </IconButton>

      {/* Image */}
      <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="180"
          image={product.image}
          loading="lazy"
          sx={{ cursor: "pointer" }}
        />
      </Link>

      <CardContent>
        <Typography variant="body2">{product.title}</Typography>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography fontWeight={600}>₹{product.price}</Typography>
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "text.secondary" }}
          >
            ₹{product.mrp}
          </Typography>
          <Typography color="success.main">{product.discount}% off</Typography>
        </Box>

        {/* ADD / QTY CONTROLS */}
        {quantity === 0 ? (
          <Button
            fullWidth
            sx={{ mt: 1 }}
            variant="contained"
            disabled={!product.inStock}
            onClick={handleAddFirst}
          >
            Add to Cart
          </Button>
        ) : (
          <Box
            sx={{
              mt: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              px: 1,
              height: 40,
            }}
          >
            <IconButton size="small" onClick={handleDecrease}>
              <Remove />
            </IconButton>

            <Typography fontWeight={600}>{quantity}</Typography>

            <IconButton
              size="small"
              onClick={handleIncrease}
              disabled={quantity >= product.stockQty}
            >
              <Add />
            </IconButton>
          </Box>
        )}

        {/* BUY NOW */}
        <Button
          fullWidth
          sx={{ mt: 1 }}
          variant="outlined"
          disabled={!product.inStock}
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
}
