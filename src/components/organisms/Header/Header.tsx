import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  InputBase,
  Button,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import CategoryMenu from "./CategoryMenu";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import { Favorite } from "@mui/icons-material";

export default function Header() {
  const router = useRouter();
  const isLoggedIn = false; // later from Redux/Auth

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar sx={{ gap: 2 }}>
        {/* Mobile menu */}
        <IconButton sx={{ display: { md: "none" } }}>
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6">Shop Hub</Typography>
        </Link>
        {/* Category dropdown */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <CategoryMenu />
        </Box>

        {/* Search */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#F3F4F6",
            px: 2,
            py: 0.5,
            borderRadius: 999,
          }}
        >
          <SearchIcon sx={{ color: "text.secondary" }} />
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
        </Box>

        {/* Wishlist */}
        <Link href="/wishlist">
          <IconButton>
            <Favorite color="error" />
          </IconButton>
        </Link>

        {/* Cart */}
        <Badge badgeContent={2} color="primary">
          <Link href="/cart">
            <IconButton>🛒</IconButton>
          </Link>
        </Badge>

        {/* Auth */}
        {/* {!isLoggedIn ? ( */}
        <>
          <Button variant="text">Login</Button>
          <Button variant="outlined">Register</Button>
        </>
        {/* ) : ( */}
        <>
          <Link href="/profile">
            <IconButton>👤</IconButton>
          </Link>
          <Button>Logout</Button>
        </>
        {/* )} */}
      </Toolbar>
    </AppBar>
  );
}
