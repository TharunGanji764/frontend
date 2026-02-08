import { Box, Typography, Button, Divider } from "@mui/material";

export default function ReviewStep({
  cartItems,
  subtotal,
  address,
  onPlaceOrder,
}: any) {
  return (
    <Box>
      <Typography variant="h6">Review Order</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <b>Address</b>
      </Typography>
      <Typography>{address?.address_line}</Typography>
      <Typography>
        {address?.city}, {address?.state} - {address?.pincode}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography>
        <b>Items</b>
      </Typography>
      {cartItems?.map((item: any) => (
        <Box
          key={item?.id}
          sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}
        >
          <Typography variant="h6">
            {item?.product_name} (x{item?.quantity})
          </Typography>

          {item?.product_image && (
            <Box
              component="img"
              src={item.product_image}
              alt={item.product_name}
              sx={{ width: 100, height: 100, objectFit: "cover", my: 1 }}
            />
          )}

          <Typography variant="body2" color="text.secondary">
            <strong>Price:</strong> ${item?.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>SKU/Product ID:</strong> {item?.product_id}
          </Typography>
          <Typography
            variant="body2"
            display="block"
            sx={{ mt: 1, color: "gray" }}
          >
            ID: {item?.id}
          </Typography>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />
      <Typography>
        <b>Total</b>: ₹{subtotal}
      </Typography>

      <Button
        sx={{ mt: 3 }}
        variant="contained"
        fullWidth
        onClick={onPlaceOrder}
      >
        Place Order & Pay
      </Button>
    </Box>
  );
}
