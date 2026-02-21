import { CardMedia, Typography, IconButton, Button } from "@mui/material";
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
import { addItemToCart } from "@/store/slices/cartSlice";
import {
  CartButtons,
  CustomCardContent,
  ProductCardContainer,
  ProductInfoBox,
} from "./styles";
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useGetCartQuery,
  useGetWishlistQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "@/store/api/apiSlice";
import { showToast } from "@/store/slices/toastSlice";

interface Props {
  product: any;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: cart } = useGetCartQuery();
  const [addToWishList] = useAddToWishlistMutation();
  useGetWishlistQuery();

  const wishlist = useSelector((s: RootState) => s?.wishlist?.items);

  const cartItem = cart?.items?.find(
    (item: any) => item?.product_id === product?.sku,
  );
  const quantity = cartItem?.quantity ?? 0;

  const inWishlist = wishlist?.some((i: any) => i?.id === product?.sku);

  const [addToCart] = useAddToCartMutation();
  const [updateQuantity] = useUpdateCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleAddFirst = async () => {
    try {
      const res = await addToCart({
        product_id: product?.sku,
        quantity: 1,
      });
      if (!(res?.error as any)) {
        return dispatch(
          showToast({
            message: "Item added to cart successfully",
            severity: "success",
          }),
        );
      } else {
        throw new Error((res?.error as any)?.data?.message);
      }
    } catch (err) {
      return dispatch(
        showToast({
          message: (err as any)?.message,
          severity: "error",
        }),
      );
    }
  };

  const handleIncrease = async (action: string) => {
    const response = await updateQuantity({
      productId: product?.sku,
      action,
    });
    if (response?.data?.item) {
      dispatch(
        showToast({
          message: "Quantity Updated",
          severity: "success",
        }),
      );
    }
  };

  const handleDecrease = async (action: string) => {
    if (quantity === 1) {
      const response = await removeFromCart({ productId: product?.sku });
      if (response) {
        dispatch(
          showToast({
            message: "Item removed from cart ",
            severity: "success",
          }),
        );
      }
    } else {
      const response = await updateQuantity({
        productId: product?.sku,
        action,
      });
      if (response?.data?.item) {
        dispatch(
          showToast({
            message: "Quantity Updated",
            severity: "success",
          }),
        );
      }
    }
  };

  const handleBuyNow = async () => {
    if (!cartItem) {
      await addToCart({
        product_id: product?.sku,
        quantity: 1,
      });
    } else {
      await updateQuantity({
        productId: product?.sku,
        action: "Increment",
      });
    }
    global.window.location.href = "/checkout";
  };

  return (
    <ProductCardContainer>
      <IconButton
        sx={{ position: "absolute", top: 8, right: 8 }}
        onClick={() =>
          inWishlist
            ? dispatch(removeFromWishlist(product?.sku))
            : addToWishList({ productId: product?.sku })
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
            variant="primary"
            disabled={!product?.stock}
            onClick={handleAddFirst}
          >
            Add to Cart
          </Button>
        ) : (
          <CartButtons>
            <IconButton
              size="small"
              onClick={() => handleDecrease("Decrement")}
            >
              <Remove />
            </IconButton>

            <Typography fontWeight={600}>{quantity}</Typography>

            <IconButton
              size="small"
              onClick={() => handleIncrease("Increment")}
              disabled={quantity >= product?.stockQty}
            >
              <Add />
            </IconButton>
          </CartButtons>
        )}

        <Button
          fullWidth
          sx={{ mt: 1 }}
          variant="secondary"
          disabled={!product.stock}
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </CustomCardContent>
    </ProductCardContainer>
  );
}
