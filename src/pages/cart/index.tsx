import Head from "next/head";
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "@/store/api/apiSlice";
import {
  ButtonBox,
  ButtonsContainer,
  CartContainer,
  CartItemBox,
} from "./styles";
import Image from "next/image";
import CartSummary from "@/components/organisms/Cart/CartSummary";

export default function CartPage() {
  const { data: cart } = useGetCartQuery();

  const [updateQuantity] = useUpdateCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleUpdateQuantity = async (action: string, id: string) => {
    await updateQuantity({ productId: id, action });
  };

  return (
    <>
      <Head>
        <title>Cart | Shop Hub</title>
        <meta name="description" content="Your shopping cart" />
      </Head>

      <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", display: "flex" }}>
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, width: "100%" }}>
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
              Shopping Cart ({cart?.items?.length || 0} items)
            </Typography>
            <Breadcrumbs
              separator={
                <NavigateNextIcon sx={{ fontSize: "1rem", color: "#94A3B8" }} />
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
                Cart
              </Typography>
            </Breadcrumbs>
          </Box>

          {!cart || cart?.items?.length === 0 ? (
            <Box textAlign="center" sx={{ mt: 8 }}>
              <Typography variant="h6">Your cart is empty</Typography>
              <Link href="/" passHref>
                <Button
                  sx={{ mt: 2, borderRadius: 2, bgcolor: "#0F172A" }}
                  variant="contained"
                >
                  Continue Shopping
                </Button>
              </Link>
            </Box>
          ) : (
            /* Layout Grid - Matches the compact spacing of the Profile/Wishlist UI */
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  {cart?.items?.map((item: any) => (
                    <CartItemBox
                      key={item?.id || item?.product_id}
                      sx={{
                        borderRadius: "12px",
                        border: "1px solid #EBEBEB",
                        bgcolor: "#fff",
                        p: 2,
                        m: 0, // Removing old margins to use Grid gap
                      }}
                    >
                      <Image
                        src={item?.thumbnail || item?.product_image}
                        width={100}
                        height={100}
                        alt={item?.title || item?.product_name}
                        style={{ objectFit: "contain", marginRight: "16px" }}
                      />

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color="#64748B"
                          sx={{
                            textTransform: "uppercase",
                            fontSize: "0.7rem",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {item?.title || item?.product_name}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={800}
                          sx={{ my: 0.5, color: "#0F172A" }}
                        >
                          ₹{item.price}
                        </Typography>

                        <ButtonsContainer sx={{ mt: 1 }}>
                          <ButtonBox
                            sx={{
                              border: "1px solid #E2E8F0",
                              borderRadius: "8px",
                            }}
                          >
                            <Button
                              size="small"
                              sx={{
                                minWidth: 32,
                                color: "#0F172A",
                                fontWeight: 700,
                              }}
                              onClick={() =>
                                handleUpdateQuantity(
                                  "Decrement",
                                  item?.product_id,
                                )
                              }
                            >
                              -
                            </Button>
                            <Typography
                              sx={{
                                mx: 1,
                                fontWeight: 700,
                                fontSize: "0.9rem",
                              }}
                            >
                              {item?.quantity}
                            </Typography>
                            <Button
                              size="small"
                              sx={{
                                minWidth: 32,
                                color: "#0F172A",
                                fontWeight: 700,
                              }}
                              disabled={item?.quantity >= item?.stockQty}
                              onClick={() =>
                                handleUpdateQuantity(
                                  "Increment",
                                  item?.product_id,
                                )
                              }
                            >
                              +
                            </Button>
                          </ButtonBox>

                          <IconButton
                            size="small"
                            sx={{
                              ml: 2,
                              bgcolor: "#FFF1F2",
                              "&:hover": { bgcolor: "#FFE4E6" },
                            }}
                            onClick={() =>
                              removeFromCart({ productId: item?.product_id })
                            }
                          >
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                        </ButtonsContainer>
                      </Box>
                    </CartItemBox>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Cart Summary stickied with same margins as profile cards */}
                <Box sx={{ position: "sticky", top: 20 }}>
                  <CartSummary items={cart?.items} />
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
}
