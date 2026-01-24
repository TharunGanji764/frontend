import {
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
import {
  CartButtons,
  CustomCardContent,
  ProductCardContainer,
  ProductInfoBox,
} from "./styles";
import { ColumnStack } from "@/components/commonStyles/styles";

interface Props {
  product: any;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((s: RootState) => s?.cart?.items);
  const wishlist = useSelector((s: RootState) => s?.wishlist?.items);

  const cartItem = cartItems?.find((i: any) => i?.id === product?.id);
  const quantity = cartItem?.quantity ?? 0;

  const inWishlist = wishlist?.some((i: any) => i?.id === product?.id);

  const handleAddFirst = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleIncrease = () => {
    dispatch(
      updateQuantity({
        id: product?.id,
        quantity: quantity + 1,
      }),
    );
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      dispatch(removeFromCart(product?.id));
    } else {
      dispatch(
        updateQuantity({
          id: product?.id,
          quantity: quantity - 1,
        }),
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
    <ProductCardContainer>
      <IconButton
        sx={{ position: "absolute", top: 8, right: 8 }}
        onClick={() =>
          inWishlist
            ? dispatch(removeFromWishlist(product?.sku))
            : dispatch(addToWishlist(product))
        }
      >
        {inWishlist ? <Favorite color="error" /> : <FavoriteBorderIcon />}
      </IconButton>

      <Link
        href={`/product/${product?.sku}`}
        style={{ textDecoration: "none" }}
      >
        <CardMedia
          component="img"
          image={product?.thumbnail}
          loading="lazy"
          sx={{
            cursor: "pointer",
            objectFit: "contain",
            height: "180px",
          }}
        />
      </Link>

      <CustomCardContent>
        <Typography variant="body2">{product?.title}</Typography>

        <ProductInfoBox>
          <Typography fontWeight={600}>₹{product?.discounted_price}</Typography>
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "text.secondary" }}
          >
            ₹{product?.price}
          </Typography>
          <Typography color="success.main" variant="body2">
            {product?.discount_percentage}% off
          </Typography>
        </ProductInfoBox>

        {quantity === 0 ? (
          <Button
            fullWidth
            sx={{ mt: 1 }}
            variant="contained"
            disabled={!product?.stock}
            onClick={handleAddFirst}
          >
            Add to Cart
          </Button>
        ) : (
          <CartButtons>
            <IconButton size="small" onClick={handleDecrease}>
              <Remove />
            </IconButton>

            <Typography fontWeight={600}>{quantity}</Typography>

            <IconButton
              size="small"
              onClick={handleIncrease}
              disabled={quantity >= product?.stockQty}
            >
              <Add />
            </IconButton>
          </CartButtons>
        )}

        <Button
          fullWidth
          sx={{ mt: 1 }}
          variant="outlined"
          disabled={!product.stock}
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </CustomCardContent>
    </ProductCardContainer>
  );
}
