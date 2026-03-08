import {
  Box,
  Avatar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Inventory2 as ProductsIcon,
  ShoppingCart as OrdersIcon,
  BarChart as AnalyticsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { SIDEBAR_FULL, SIDEBAR_MINI } from "@/constants/seller.constants";
import Link from "next/link";
import {
  SellerSideBarContainer,
  SideBarAvatar,
  SideBarBox,
  SideBarListItemButton,
} from "./Stylex";

const NAV_ITEMS = [
  { route: "/seller", icon: <DashboardIcon />, label: "Dashboard" },
  { route: "/seller/products", icon: <ProductsIcon />, label: "Products" },
  { route: "/seller/orders", icon: <OrdersIcon />, label: "Orders" },
  { route: "/seller/analytics", icon: <AnalyticsIcon />, label: "Analytics" },
  { route: "/seller/settings", icon: <SettingsIcon />, label: "Settings" },
];

interface Props {
  activeRoute: string;
  onNavigate: (route: string) => void;
  collapsed: boolean;
}

export const SellerSidebar = ({
  activeRoute,
  onNavigate,
  collapsed,
}: Props) => {
  const width = collapsed ? SIDEBAR_MINI : SIDEBAR_FULL;

  return (
    <SellerSideBarContainer $width={width}>
      <SideBarBox $collapsed={collapsed}>
        <SideBarAvatar>S</SideBarAvatar>

        {!collapsed && (
          <Box>
            <Typography sx={{ color: "#fff", fontWeight: 700 }}>
              ShopHub
            </Typography>
            <Typography
              sx={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}
            >
              Seller Portal
            </Typography>
          </Box>
        )}
      </SideBarBox>

      <List sx={{ flex: 1, pt: 1 }} disablePadding>
        {NAV_ITEMS?.map((item) => {
          const isActive = activeRoute === item?.route;
          return (
            <Link
              href={`${item?.route}`}
              key={item.label}
              style={{ textDecoration: "none", color: "black", width: "100%" }}
            >
              <SideBarListItemButton
                $collapsed={collapsed}
                selected={isActive}
                onClick={() => onNavigate(item?.route)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? 0 : 1.5,
                    color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                    }}
                  />
                )}
              </SideBarListItemButton>
            </Link>
          );
        })}
      </List>

      <Box
        sx={{
          p: collapsed ? 1.5 : 2,
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Stack direction="row" alignItems="center" gap={1.5}>
          <SideBarAvatar>JD</SideBarAvatar>

          {!collapsed && (
            <Box>
              <Typography sx={{ color: "#fff", fontSize: "0.8rem" }}>
                John Doe
              </Typography>
              <Typography
                sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}
              >
                Verified Seller
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </SellerSideBarContainer>
  );
};
