import Head from "next/head";
import { Box, Typography, Grid, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((s: RootState) => s.cart.items);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      <Head>
        <title>Cart | Shop Hub</title>
        <meta name="description" content="Your shopping cart" />
      </Head>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Shopping Cart
      </Typography>

      {items.length === 0 ? (
        <Box textAlign="center" sx={{ mt: 6 }}>
          <Typography>Your cart is empty</Typography>
          <Link href="/">
            <Button sx={{ mt: 2 }} variant="contained">
              Continue Shopping
            </Button>
          </Link>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 2,
                  borderBottom: "1px solid #eee",
                  pb: 2,
                }}
              >
                <img src={item?.thumbnail} width={100} alt={item.title} />

                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={600}>{item.title}</Typography>
                  <Typography>₹{item.price}</Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Button
                      size="small"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        )
                      }
                    >
                      -
                    </Button>

                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>

                    <Button
                      size="small"
                      disabled={item.quantity >= item?.stockQty}
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                    >
                      +
                    </Button>

                    <IconButton
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                border: "1px solid #eee",
                p: 2,
                position: "sticky",
                top: 80,
              }}
            >
              <Typography variant="h6">Summary</Typography>
              <Typography>Subtotal: ₹{subtotal}</Typography>

              <Link href="/checkout">
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
