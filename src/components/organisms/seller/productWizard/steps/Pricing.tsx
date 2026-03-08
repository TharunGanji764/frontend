import {
  Stack,
  Typography,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TableContainer,
  Chip,
  Box,
  Divider,
  alpha,
  useTheme,
} from "@mui/material";
import { StatsCard } from "@/components/atoms/StatsCard";
import {
  StackedBarChart,
  Warehouse,
  AttachMoney,
  AnalyticsOutlined,
  ErrorOutline,
} from "@mui/icons-material";

interface Props {
  state: any;
}

export const Pricing = ({ state }: Props) => {
  const theme = useTheme();
  const { variants } = state;

  const totalStock = variants.reduce(
    (s: number, v: any) => s + (v.stock || 0),
    0,
  );
  const prices = variants.map((v: any) => v.price || 0);

  const totalPriceValue = variants.reduce(
    (s: number, v: any) => s + (v.price || 0) * (v.stock || 0),
    0,
  );

  const priceRange = prices.length
    ? { min: Math.min(...prices), max: Math.max(...prices) }
    : { min: 0, max: 0 };

  return (
    <Stack spacing={4}>
      {/* Header & Meta */}
      <Box>
        <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
          <AnalyticsOutlined color="primary" />
          <Typography variant="h6" fontWeight={700}>
            Inventory & Financial Summary
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Review your stock levels and projected inventory value before
          finalizing.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <StatsCard
            icon={<StackedBarChart />}
            label="Total Variants"
            value={variants.length}
            color={theme.palette.info.main}
            // Assuming StatsCard supports a description or trend
            sub="Unique combinations"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <StatsCard
            icon={<Warehouse />}
            label="Total Stock"
            value={totalStock.toLocaleString()}
            color={
              totalStock > 0
                ? theme.palette.success.main
                : theme.palette.error.main
            }
            sub="Units across all variants"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <StatsCard
            icon={<AttachMoney />}
            label="Inventory Value"
            value={`$${totalPriceValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            color={theme.palette.warning.main}
            sub="Potential gross revenue"
          />
        </Grid>
      </Grid>

      {/* Detailed Breakdown Table */}
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          borderColor: alpha(theme.palette.divider, 0.1),
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead
              sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}
            >
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Variant details</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>SKU</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Unit Price
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Stock
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Line Value
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {variants.map((v: any, idx: number) => {
                const isOutOfStock = (v.stock || 0) <= 0;
                return (
                  <TableRow
                    key={v.id}
                    hover
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {v.combo.map((c: any, i: number) => (
                          <Chip
                            key={i}
                            label={c.value}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderRadius: 1,
                              fontSize: "0.75rem",
                              bgcolor: "background.paper",
                            }}
                          />
                        ))}
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body2"
                        fontFamily="monospace"
                        color="text.secondary"
                      >
                        {v.sku || (
                          <Typography variant="body2" color="error">
                            MISSING SKU
                          </Typography>
                        )}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={500}>
                        ${(v.price || 0).toFixed(2)}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        {isOutOfStock && (
                          <ErrorOutline
                            sx={{ fontSize: 16, color: "orange" }}
                          />
                        )}
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color={isOutOfStock ? "warning.main" : "text.primary"}
                        >
                          {v.stock || 0}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        color="primary.main"
                      >
                        ${((v.price || 0) * (v.stock || 0)).toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>

            <TableFooter sx={{ bgcolor: alpha(theme.palette.grey[500], 0.05) }}>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography variant="body2" fontWeight={800}>
                    Estimated Inventory Totals
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={800}>
                    {totalStock}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontWeight={800}
                  >
                    ${totalPriceValue.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>

      <Box
        sx={{
          p: 2,
          bgcolor: "grey.50",
          borderRadius: 2,
          display: "flex",
          justifyContent: "center",
          border: "1px dashed",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textTransform: "uppercase", letterSpacing: 1 }}
        >
          Price Range: <strong>${priceRange.min.toFixed(2)}</strong> —{" "}
          <strong>${priceRange.max.toFixed(2)}</strong>
        </Typography>
      </Box>
    </Stack>
  );
};
