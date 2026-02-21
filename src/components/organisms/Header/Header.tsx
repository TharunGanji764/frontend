import { Toolbar, Typography, IconButton, Badge, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Favorite } from "@mui/icons-material";
import { useRouter } from "next/router";
import CategoryMenu from "./CategoryMenu";
import Link from "next/link";
import { useEffect, useState } from "react";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import { HeaderBox, Logo, MobileMenu } from "./HeaderStyles";
import {
  apiSlice,
  useAutoCompleteSearchMutation,
  useGetCartQuery,
  useLogoutMutation,
} from "@/store/api/apiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import useDebounce from "@/utils/UseDebounce";
import SearchBar from "@/components/molecules/Filters/SearchBar";

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
  const debouncedSearch = useDebounce(query, 300);
  const [autoCompleteSearch, { isLoading }] = useAutoCompleteSearchMutation();
  const [searchResults, setSearchResults] = useState<
    Array<{ product_name: string; category: string; product_id: string }>
  >([]);
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

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearch?.length > 1) {
        const res = await autoCompleteSearch({ query: debouncedSearch });
        setSearchResults(res?.data ?? []);
      } else {
        setSearchResults([]);
      }
    };
    fetchData();
  }, [debouncedSearch]);

  const handleLogout = async () => {
    await logout({ userId, sessionId });
    localStorage.clear();
    dispatch(apiSlice.util.resetApiState());
    router.push("/");
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
        <SearchBar
          searchResults={searchResults}
          isLoading={isLoading}
          query={query}
          setQuery={setQuery}
          router={router}
        />
        <Link href="/wishlist">
          <Favorite color="error" sx={{ height: "40px", marginTop: "12px" }} />
        </Link>
        <Badge badgeContent={cartCount} color="primary">
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
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </HeaderBox>
  );
}
