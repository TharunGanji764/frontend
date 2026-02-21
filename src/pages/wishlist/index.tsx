import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import { ShoppingBagOutlined, FavoriteBorder } from "@mui/icons-material";
import WishlistItem from "@/components/organisms/Wishlist/WishlistItem";
import EmptyWishlist from "@/components/organisms/Wishlist/EmptyWishlist";
import { addItemToCart } from "@/store/slices/cartSlice";
import { clearWishlist } from "@/store/slices/wishlistSlice";
import { useGetWishlistQuery } from "@/store/api/apiSlice";
import Loader from "@/components/atoms/Loader";

const WishlistPage = () => {
  const items = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();
  const { isLoading } = useGetWishlistQuery();

  if (isLoading) return <Loader />;
  if (items.length === 0) return <EmptyWishlist />;

  const handleMoveAll = () => {
    items.forEach((i: any) => dispatch(addItemToCart({ ...i, quantity: 1 })));
    dispatch(clearWishlist());
  };

  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", display: "flex" }}>
      <Head>
        <title>Wishlist | Shop Hub</title>
      </Head>

      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, width: "100%" }}>
        <Grid container sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "12px",
                border: "1px solid #EBEBEB",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    bgcolor: "#E8F5E9",
                    p: 1,
                    borderRadius: "8px",
                    display: "flex",
                    color: "#4CAF50",
                  }}
                >
                  <FavoriteBorder fontSize="small" />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    My Wishlist
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {items.length} items saved
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="text"
                  color="error"
                  onClick={() => dispatch(clearWishlist())}
                  sx={{ textTransform: "none", fontSize: "0.8rem" }}
                >
                  Clear all
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={
                    <ShoppingBagOutlined
                      sx={{ fontSize: "1.1rem !important" }}
                    />
                  }
                  onClick={handleMoveAll}
                  sx={{
                    bgcolor: "#0F172A",
                    textTransform: "none",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    "&:hover": { bgcolor: "#1E293B" },
                  }}
                >
                  Move all to Cart
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: "12px",
            border: "1px solid #EBEBEB",
            bgcolor: "#fff",
          }}
        >
          <Typography sx={{ mb: 2, fontWeight: 700, px: 1 }}>
            Saved Items
          </Typography>

          <Grid container spacing={0.5}>
            {items.map((item) => (
              <Grid item xs={12} sm={2.2} key={item.id}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: "8px",
                    border: "1px solid #F0F0F0",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: "#0F172A",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                    },
                  }}
                >
                  <WishlistItem item={item} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default WishlistPage;
