import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Chip,
  alpha,
  useTheme,
  Avatar,
  Stack,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  CheckCircle,
  NotificationsNoneOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { useState, ReactNode, useEffect } from "react";
import { SellerSidebar } from "@/components/organisms/seller/SellerSideBar";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

interface Props {
  children: ReactNode;
}

export const SellerLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const currentPath = router.pathname.split("/").pop() || "Dashboard";
  const displayTitle =
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  const handleRouteChange = (route: string) => {
    router.push(`${route}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        bgcolor: "#F8F9FA",
        overflow: "hidden",
      }}
    >
      <SellerSidebar
        activeRoute={router.pathname}
        onNavigate={handleRouteChange}
        collapsed={collapsed}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: 0,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid",
            borderColor: "divider",
            color: "text.primary",
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", minHeight: 64 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                onClick={() => setCollapsed((p) => !p)}
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                {collapsed ? (
                  <MenuIcon color="primary" />
                ) : (
                  <ChevronLeftIcon color="primary" />
                )}
              </IconButton>

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    mb: -0.5,
                  }}
                >
                  Seller Central
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, fontSize: "1.1rem" }}
                >
                  {displayTitle}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                label="Store Live"
                size="small"
                icon={
                  <CheckCircle
                    sx={{
                      fontSize: "14px !important",
                      color: `${theme.palette.success.main} !important`,
                    }}
                  />
                }
                sx={{
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  color: "success.dark",
                  fontWeight: 700,
                  borderRadius: 1.5,
                  px: 0.5,
                  border: "1px solid",
                  borderColor: alpha(theme.palette.success.main, 0.2),
                }}
              />

              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 1, height: 24, alignSelf: "center" }}
              />

              <Stack direction="row" spacing={1}>
                <Tooltip title="Notifications">
                  <IconButton size="small">
                    <NotificationsNoneOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Settings">
                  <IconButton size="small">
                    <SettingsOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Avatar
                src="/path-to-avatar.jpg"
                sx={{
                  width: 36,
                  height: 36,
                  border: "2px solid",
                  borderColor: "primary.light",
                  cursor: "pointer",
                }}
              />
            </Stack>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            overflowY: "auto",
            p: { xs: 2, md: 4 },
            scrollBehavior: "smooth",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <Box sx={{ maxWidth: 1800, mx: "auto" }} id="seller-content">
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
