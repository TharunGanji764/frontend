import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  Button,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import CategoryMenu from "./CategoryMenu";
import Link from "next/link";
import { useState } from "react";
import { Favorite } from "@mui/icons-material";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import {
  CartBadge,
  HeaderBox,
  Logo,
  MobileMenu,
  SearchInputBox,
} from "./HeaderStyles";
import {
  apiSlice,
  useGetCartQuery,
  useLogoutMutation,
} from "@/store/api/apiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

export default function Header() {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const dispatch = useDispatch<AppDispatch>();
  const sessionId = JSON.parse(
    global?.window?.localStorage?.getItem("userData") || "{}",
  )?.sessionId;
  const userId = JSON.parse(
    global?.window?.localStorage?.getItem("userData") || "{}",
  )?.userId;

  const [query, setQuery] = useState("");
  const [logout] = useLogoutMutation();

  const { cartCount } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
    selectFromResult: ({ data }) => ({
      cartCount:
        data?.items?.reduce(
          (total: number, item: any) => total + item.quantity,
          0,
        ) ?? 0,
    }),
  });

  const handleLogout = async () => {
    await logout({ userId, sessionId });
    localStorage.clear();
    dispatch(apiSlice.util.resetApiState());
    router.push("/");
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <HeaderBox>
      <Toolbar sx={{ gap: 2, alignItems: "center" }}>
        <IconButton sx={{ display: { md: "none" } }}>
          <MenuIcon />
        </IconButton>

        <Logo href="/">
          <Typography variant="h6">Shop Hub</Typography>
        </Logo>
        <MobileMenu>
          <CategoryMenu />
        </MobileMenu>

        <SearchInputBox>
          <SearchIcon sx={{ color: "text.primary" }} />
          <TextField
            placeholder="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            sx={{
              flex: 1,
              "& fieldset": { border: "none" },
            }}
          />
        </SearchInputBox>

        <Link href="/wishlist">
          <Favorite color="error" sx={{ height: "40px", marginTop: "12px" }} />
        </Link>

        <Badge badgeContent={cartCount} color="primary" sx={{ top: "0px" }}>
          <Link href="/cart">
            <IconButton>🛒</IconButton>
          </Link>
        </Badge>

        {!isLoggedIn ? (
          <>
            <Link href="/auth/login">
              <Button variant="text">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outlined">Register</Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/profile">
              <IconButton>👤</IconButton>
            </Link>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </HeaderBox>
  );
}
