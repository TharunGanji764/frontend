import { Box, Tabs, Tab, Typography, useMediaQuery } from "@mui/material";
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
import {
  ProfileContainer,
  SideBar,
  SidebarTab,
  SidebarLabel,
  SidebarDivider,
  SidebarBadge,
  MainContent,
} from "./styles";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  useGetAddressQuery,
  useGetOrdersQuery,
  useGetWishlistQuery,
} from "@/store/api/apiSlice";

export default function ProfileLayout() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data: wishlistData } = useGetWishlistQuery();
  const { data: totalOrders } = useGetOrdersQuery();
  const { data: addressList } = useGetAddressQuery();

  const sections = [
    {
      label: "Profile",
      icon: <PersonOutlineIcon sx={{ fontSize: "1rem" }} />,
      badge: null,
    },
    {
      label: "Orders",
      icon: <ShoppingBagOutlinedIcon sx={{ fontSize: "1rem" }} />,
      badge: totalOrders?.length,
    },
    {
      label: "Addresses",
      icon: <LocationOnOutlinedIcon sx={{ fontSize: "1rem" }} />,
      badge: null,
    },
    {
      label: "Wishlist",
      icon: <FavoriteBorderIcon sx={{ fontSize: "1rem" }} />,
      badge: wishlistData?.data?.length,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearWishlist());
    router.push("/");
  };

  return (
    <ProfileContainer>
      {!isMobile && (
        <SideBar elevation={0}>
          <SidebarLabel variant="body1">My Account</SidebarLabel>

          {sections.map((section, index) => (
            <SidebarTab
              key={section.label}
              $isActive={tab === index}
              $isDanger={false}
              onClick={() => setTab(index)}
            >
              {section.icon}
              <Typography
                sx={{
                  flex: 1,
                  fontSize: "0.875rem",
                  fontWeight: tab === index ? 600 : 400,
                  lineHeight: 1,
                }}
              >
                {section.label}
              </Typography>
              {section.badge !== null && (
                <SidebarBadge>{section.badge}</SidebarBadge>
              )}
            </SidebarTab>
          ))}

          <SidebarDivider />
          <SidebarLabel variant="body1">Help</SidebarLabel>
          <SidebarTab $isActive={false} $isDanger={false} onClick={() => {}}>
            <HelpOutlineIcon sx={{ fontSize: "1rem" }} />
            <Typography
              sx={{
                flex: 1,
                fontSize: "0.875rem",
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              Help Center
            </Typography>
          </SidebarTab>

          <SidebarDivider />

          <SidebarTab $isActive={false} $isDanger={true} onClick={handleLogout}>
            <LogoutIcon sx={{ fontSize: "1rem" }} />
            <Typography
              sx={{
                flex: 1,
                fontSize: "0.875rem",
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              Logout
            </Typography>
          </SidebarTab>
        </SideBar>
      )}

      <MainContent>
        {isMobile && (
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              "& .MuiTab-root": {
                fontSize: "0.8rem",
                fontWeight: 500,
                textTransform: "capitalize",
                minHeight: 40,
                color: "text.secondary",
              },
              "& .Mui-selected": {
                color: "text.primary",
                fontWeight: 600,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "text.primary",
              },
            }}
          >
            {sections.map((s) => (
              <Tab key={s.label} label={s.label} />
            ))}
          </Tabs>
        )}

        <Box>
          {tab === 0 && (
            <ProfileOverview
              totalWishlistItems={wishlistData?.data?.length}
              totalOrderItems={totalOrders?.length}
            />
          )}
          {tab === 1 && <RecentOrders orders={totalOrders} />}
          {tab === 2 && <AddressManager address={addressList} />}
          {tab === 3 && <Box>Wishlist shortcut</Box>}
        </Box>
      </MainContent>
    </ProfileContainer>
  );
}
