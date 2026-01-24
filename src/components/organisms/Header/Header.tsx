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
import { useLogoutMutation } from "@/store/api/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Header() {
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [query, setQuery] = useState("");
  const [logout] = useLogoutMutation();

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

        <Badge
          badgeContent={cartItems?.length}
          color="primary"
          sx={{ top: "0px" }}
        >
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
            <Button
              onClick={() => {
                logout({});
                localStorage.clear();
                router.push("/");
                router.reload();
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </HeaderBox>
  );
}
