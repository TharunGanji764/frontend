import {
  Box,
  Tabs,
  Tab,
  useMediaQuery,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ProfileOverview from "./ProfileOverview";
import AddressManager from "./AddressManager";
import RecentOrders from "./RecentOrders";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { clearWishlist } from "@/store/slices/wishlistSlice";
import { clearCart } from "@/store/slices/cartSlice";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "next/router";
import { ProfileContainer, SideBar, SidebarTabs } from "./styles";

const sections = ["Profile", "Orders", "Addresses", "Wishlist", "Logout"];

export default function ProfileLayout() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearWishlist());
    router.push("/");
  };

  return (
    <ProfileContainer>
      {!isMobile && (
        <SideBar>
          <Typography sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}>
            My Account
          </Typography>

          {sections?.map((section, index) => (
            <SidebarTabs
              key={section}
              $isActive={tab === index}
              onClick={() =>
                section === "Logout" ? handleLogout() : setTab(index)
              }
            >
              {section}
            </SidebarTabs>
          ))}
        </SideBar>
      )}

      <Box sx={{ flex: 1, maxWidth: 900 }}>
        {isMobile && (
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            sx={{ mb: 2 }}
          >
            {sections?.map((section) => (
              <Tab key={section} label={section} />
            ))}
          </Tabs>
        )}

        <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
          {tab === 0 && <ProfileOverview />}
          {tab === 1 && <RecentOrders />}
          {tab === 2 && <AddressManager />}
          {tab === 3 && <Box>Wishlist shortcut</Box>}
        </Paper>
      </Box>
    </ProfileContainer>
  );
}
