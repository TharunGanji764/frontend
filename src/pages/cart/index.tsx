import Head from "next/head";
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Divider,
  Breadcrumbs,
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
  InfoBox,
  SummaryBox,
} from "./styles";
import Image from "next/image";
import CartSummary from "@/components/organisms/Cart/CartSummary";

export default function CartPage() {
  const { data: cart } = useGetCartQuery();

  const subtotal = cart?.items?.reduce(
    (sum: any, i: any) => sum + i?.price * i?.quantity,
    0,
  );

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

      <CartContainer>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
            Shopping Cart ({cart?.items?.length || 0} items)
          </Typography>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="text.secondary">
                Home
              </Typography>
            </Link>
            <Typography variant="body2" color="text.primary">
              Cart
            </Typography>
          </Breadcrumbs>
        </Box>

        {!cart || cart?.items?.length === 0 ? (
          <Box textAlign="center" sx={{ mt: 8 }}>
            <Typography variant="h6">Your cart is empty</Typography>
            <Link href="/" passHref>
              <Button sx={{ mt: 2, borderRadius: 2 }} variant="contained">
                Continue Shopping
              </Button>
            </Link>
          </Box>
        ) : (
          <Grid container spacing={0}>
            <Grid item xs={12} md={7}>
              {cart?.items?.map((item: any) => (
                <CartItemBox key={item?.id || item?.product_id}>
                  <Image
                    src={item?.thumbnail || item?.product_image}
                    width={120}
                    height={120}
                    alt={item?.title || item?.product_name}
                    style={{ objectFit: "contain", marginRight: "0.625vw" }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="text.secondary"
                    >
                      {item?.title || item?.product_name}
                    </Typography>
                    <Typography variant="h6" fontWeight={700} sx={{ my: 0.5 }}>
                      ₹{item.price}
                    </Typography>

                    <ButtonsContainer>
                      <ButtonBox>
                        <Button
                          size="small"
                          sx={{ minWidth: 36, color: "#000" }}
                          onClick={() =>
                            handleUpdateQuantity("Decrement", item?.product_id)
                          }
                        >
                          -
                        </Button>
                        <Typography sx={{ mx: 1, fontWeight: 600 }}>
                          {item?.quantity}
                        </Typography>
                        <Button
                          size="small"
                          sx={{ minWidth: 36, color: "#000" }}
                          disabled={item?.quantity >= item?.stockQty}
                          onClick={() =>
                            handleUpdateQuantity("Increment", item?.product_id)
                          }
                        >
                          +
                        </Button>
                      </ButtonBox>

                      <IconButton
                        size="small"
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
            </Grid>

            <Grid item xs={12} md={4}>
              <CartSummary items={cart?.items} />
            </Grid>
          </Grid>
        )}
      </CartContainer>
    </>
  );
}
