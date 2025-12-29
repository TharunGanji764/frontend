import {
  Box,
  Typography,
  Pagination,
  Button,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { useMemo, useState } from "react";
import FilterSidebar from "@/components/molecules/Filters/FilterSidebar";
import ProductGrid from "./ProductGrid";
import SortChips from "@/components/molecules/Filters/SortChips";

interface Props {
  title: string;
  allProducts: any[];
}

export default function CategoryLayout({ title, allProducts }: Props) {
  const isMobile = useMediaQuery("(max-width:900px)");

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({
    inStock: false,
    discount: false,
    rating: 0,
    price: [0, 5000],
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let data = [...allProducts];

    if (filters.inStock) data = data.filter(p => p.inStock);
    if (filters.discount) data = data.filter(p => p.discount > 0);
    if (filters.rating) data = data.filter(p => p.rating >= filters.rating);

    data = data.filter(
      p => p.price >= filters.price[0] && p.price <= filters.price[1]
    );

    if (sort === "priceLow") data.sort((a, b) => a.price - b.price);
    if (sort === "rating") data.sort((a, b) => b.rating - a.rating);
    if (sort === "discount") data.sort((a, b) => b.discount - a.discount);

    return data;
  }, [allProducts, filters, sort]);

  const PER_PAGE = 12;
  const paginated = filteredProducts.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  return (
    <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
      {!isMobile && (
        <FilterSidebar filters={filters} setFilters={setFilters} />
      )}

      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>

        {isMobile && (
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Button onClick={() => setDrawerOpen(true)}>Filters</Button>
            <SortChips value={sort} onChange={setSort} />
          </Box>
        )}

        <ProductGrid products={paginated} />

        {filteredProducts.length === 0 && (
          <Typography sx={{ mt: 4 }}>No products found</Typography>
        )}

        <Pagination
          sx={{ mt: 4 }}
          count={Math.ceil(filteredProducts.length / PER_PAGE)}
          page={page}
          onChange={(_, p) => setPage(p)}
        />
      </Box>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="left"
      >
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </Drawer>
    </Box>
  );
}
