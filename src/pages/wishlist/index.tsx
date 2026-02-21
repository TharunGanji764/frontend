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
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import {
  ShoppingBagOutlined,
  FavoriteBorder,
  NavigateNext,
} from "@mui/icons-material";
import Link from "next/link";
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
        {/* Breadcrumbs Section - Matching image_972382.png */}
        <Box sx={{ mb: 3, px: 0.5 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#0F172A",
              mb: 0.5,
              fontSize: "1.5rem",
            }}
          >
            Wishlist ({items.length} items)
          </Typography>
          <Breadcrumbs
            separator={
              <NavigateNext sx={{ fontSize: "1rem", color: "#94A3B8" }} />
            }
            aria-label="breadcrumb"
          >
            <MuiLink
              component={Link}
              underline="hover"
              color="#64748B"
              href="/"
              sx={{ fontSize: "0.85rem", fontWeight: 500 }}
            >
              Home
            </MuiLink>
            <Typography
              sx={{ fontSize: "0.85rem", color: "#0F172A", fontWeight: 600 }}
            >
              Wishlist
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Action Header Card */}
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: "12px",
                border: "1px solid #EBEBEB",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "#fff",
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
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      lineHeight: 1.2,
                    }}
                  >
                    Collection Summary
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    Ready to move to bag
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.5}>
                <Button
                  size="small"
                  variant="text"
                  color="error"
                  onClick={() => dispatch(clearWishlist())}
                  sx={{
                    textTransform: "none",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
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
                    borderRadius: "8px",
                    px: 2.5,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#1E293B" },
                  }}
                >
                  Move all to Cart
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Dense Items Grid */}
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            borderRadius: "12px",
            border: "1px solid #EBEBEB",
            bgcolor: "#fff",
          }}
        >
          <Grid container spacing={1}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} md={3} lg={2.4} key={item.id}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: "10px",
                    border: "1px solid #F1F5F9",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      borderColor: "#0F172A",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
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
