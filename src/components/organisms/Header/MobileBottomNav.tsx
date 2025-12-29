import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function MobileBottomNav() {
  return (
    <Paper sx={{ display: { xs: "block", md: "none" } }} elevation={3}>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Wishlist" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Cart" icon={<ShoppingCartIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
