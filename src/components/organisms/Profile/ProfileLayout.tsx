import { Box, Tabs, Tab, useMediaQuery, Button } from "@mui/material";
import { useState } from "react";
import ProfileOverview from "./ProfileOverview";
import AddressManager from "./AddressManager";
import RecentOrders from "./RecentOrders";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { clearWishlist } from "@/store/slices/wishlistSlice";
import { clearCart } from "@/store/slices/cartSlice";
import { logout, logout as logoutUser } from "@/store/slices/userSlice";
import { useRouter } from "next/router";

const sections = ["Profile", "Orders", "Addresses", "Wishlist", "Logout"];

export default function ProfileLayout() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    dispatch(clearWishlist());
    router.push("/");
  };

  return (
    <Box sx={{ display: "flex", mt: 3 }}>
      {isMobile ? (
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable">
          {sections.map((s) => (
            <Tab key={s} label={s} />
          ))}
        </Tabs>
      ) : (
        <Box sx={{ width: 220 }}>
          {sections.map((s, i) => (
            <Box
              key={s}
              sx={{
                p: 1.5,
                cursor: "pointer",
                fontWeight: tab === i ? 600 : 400,
              }}
              onClick={() => setTab(i)}
            >
              {s}
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ flex: 1, ml: { md: 3 }, mt: { xs: 2, md: 0 } }}>
        {tab === 0 && <ProfileOverview />}
        {tab === 1 && <RecentOrders />}
        {tab === 2 && <AddressManager />}
        {tab === 3 && <Box>Wishlist shortcut</Box>}
        {tab === 4 && (
          <Button
            color="error"
            onClick={() => {
              dispatch(logout());
              dispatch(clearCart());
              dispatch(clearWishlist());
            }}
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
}
