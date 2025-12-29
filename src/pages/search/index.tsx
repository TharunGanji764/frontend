import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Pagination,
  Button,
  Drawer,
  useMediaQuery,
} from "@mui/material";

import products from "@/mock-data/product-details";
import FilterSidebar from "@/components/molecules/Filters/FilterSidebar";
import ProductGrid from "@/components/organisms/Category/ProductGrid";
import SortChips from "@/components/molecules/Filters/SortChips";

/**
 * Simple debounce hook
 */
function useDebounce<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export default function SearchPage() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:900px)");

  const searchQuery = (router.query.q as string) || "";
  const debouncedQuery = useDebounce(searchQuery);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [filters, setFilters] = useState<any>({
    inStock: false,
    discount: false,
    rating: 0,
    price: [0, 5000],
  });

  /**
   * SEARCH + FILTER + SORT LOGIC
   */
  const filteredProducts = useMemo(() => {
    let data = [...products];

    // 🔍 Search (title + category)
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      data = data.filter(
        (p) => p.title.toLowerCase().includes(q)
        // ||
        //   (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // 🎛 Filters
    if (filters.inStock) data = data.filter((p) => p.inStock);
    if (filters.discount) data = data.filter((p) => p.discount > 0);
    if (filters.rating) data = data.filter((p) => p.rating >= filters.rating);

    data = data.filter(
      (p) => p.price >= filters.price[0] && p.price <= filters.price[1]
    );

    // 🔃 Sort
    if (sort === "priceLow") data.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") data.sort((a, b) => b.price - a.price);
    if (sort === "rating") data.sort((a, b) => b.rating - a.rating);
    if (sort === "discount") data.sort((a, b) => b.discount - a.discount);

    return data;
  }, [debouncedQuery, filters, sort]);

  // 📄 Pagination
  const PER_PAGE = 12;
  const paginated = filteredProducts.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  // Reset page when search/filter changes
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, filters, sort]);

  return (
    <>
      <Head>
        <title>
          {searchQuery
            ? `Search results for "${searchQuery}" | Shop Hub`
            : "Search | Shop Hub"}
        </title>
        <meta
          name="description"
          content={`Search results for ${searchQuery} on Shop Hub`}
        />
      </Head>

      <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <FilterSidebar filters={filters} setFilters={setFilters} />
        )}

        <Box sx={{ flex: 1 }}>
          {/* Page heading */}
          <Typography variant="h5" gutterBottom>
            {searchQuery ? `Results for "${searchQuery}"` : "Search results"}
          </Typography>

          {/* Mobile controls */}
          {isMobile && (
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Button onClick={() => setDrawerOpen(true)}>Filters</Button>
              <SortChips value={sort} onChange={setSort} />
            </Box>
          )}

          {/* Results */}
          {paginated.length > 0 ? (
            <ProductGrid products={paginated} />
          ) : (
            <Typography sx={{ mt: 4 }}>
              No products found. Try a different search.
            </Typography>
          )}

          {/* Pagination */}
          {filteredProducts.length > PER_PAGE && (
            <Pagination
              sx={{ mt: 4 }}
              count={Math.ceil(filteredProducts.length / PER_PAGE)}
              page={page}
              onChange={(_, p) => setPage(p)}
            />
          )}
        </Box>

        {/* Mobile Filter Drawer */}
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          anchor="left"
        >
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </Drawer>
      </Box>
    </>
  );
}
