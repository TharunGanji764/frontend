import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import WishlistItem from "@/components/organisms/Wishlist/WishlistItem";
import EmptyWishlist from "@/components/organisms/Wishlist/EmptyWishlist";
import { addToCart } from "@/store/slices/cartSlice";
import { clearWishlist } from "@/store/slices/wishlistSlice";

export default function WishlistPage() {
  const items = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:900px)");

  if (items.length === 0) return <EmptyWishlist />;

  return (
    <>
      <Head>
        <title>Wishlist | Shop Hub</title>
        <meta name="description" content="Your saved products" />
      </Head>

      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        My Wishlist
      </Typography>

      {isMobile && (
        <Button
          variant="contained"
          fullWidth
          sx={{ mb: 2 }}
          onClick={() => {
            items.forEach((i) => dispatch(addToCart({ ...i, quantity: 1 })));
            dispatch(clearWishlist());
          }}
        >
          Move All to Cart
        </Button>
      )}

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <WishlistItem item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
