import {
  Box,
  Checkbox,
  FormControlLabel,
  Slider,
  Typography,
  Button,
} from "@mui/material";

export default function FilterSidebar({ filters, setFilters }: any) {
  return (
    <Box sx={{ width: 260, position: "sticky", top: 100 }}>
      <Typography variant="h6">Filters</Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={filters.inStock}
            onChange={(e) =>
              setFilters({ ...filters, inStock: e.target.checked })
            }
          />
        }
        label="In Stock"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={filters.discount}
            onChange={(e) =>
              setFilters({ ...filters, discount: e.target.checked })
            }
          />
        }
        label="Discount"
      />

      <Typography sx={{ mt: 2 }}>Price</Typography>
      <Slider
        value={filters.price}
        max={5000}
        onChange={(_, v) => setFilters({ ...filters, price: v })}
      />

      <Typography sx={{ mt: 2 }}>Rating</Typography>
      <Slider
        value={filters.rating}
        step={1}
        max={5}
        onChange={(_, v) => setFilters({ ...filters, rating: v })}
      />

      <Button
        fullWidth
        sx={{ mt: 2 }}
        onClick={() =>
          setFilters({
            inStock: false,
            discount: false,
            rating: 0,
            price: [0, 5000],
          })
        }
      >
        Clear Filters
      </Button>
    </Box>
  );
}
