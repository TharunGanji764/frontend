import {
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "@/store/slices/cartSlice";

export default function CartItem({ item }: any) {
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <Box component="img" src={item.image} width={100} />

      <Box sx={{ flex: 1 }}>
        <Typography fontWeight={600}>{item.title}</Typography>
        <Typography>₹{item.price}</Typography>

        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Button
            size="small"
            onClick={() =>
              dispatch(
                updateQuantity({
                  id: item.id,
                  quantity: item.quantity - 1,
                })
              )
            }
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            size="small"
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
        </Box>
      </Box>

      <IconButton onClick={() => dispatch(removeFromCart(item.id))}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
