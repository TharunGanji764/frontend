import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  InputAdornment,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
  alpha,
  useTheme,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  EditOutlined,
  DeleteOutline,
  CheckCircle,
  Storefront,
  Warehouse,
  Inventory2Outlined,
  WarningAmber,
} from "@mui/icons-material";
import { useState, useMemo } from "react";
import { StatusChip } from "@/components/atoms/StatusChip";
import { StatsCard } from "@/components/atoms/StatsCard";
import { MOCK_PRODUCTS } from "@/mock-data/products.mock";
import { SellerHeader } from "@/components/atoms/SellerHeader";
import CustomModal from "@/components/atoms/CustomModal";
import { ProductWizard } from "./productWizard/ProductWizard";
import {
  ProductListBox,
  ProductListBoxHeader,
  ProductListContainer,
  ProductListIconButton,
  ProductListStack,
  ProductListStockStack,
  ProductListTableCell,
} from "./Stylex";

interface Props {
  onCreateNew?: () => void;
  onEdit?: (id: string) => void;
}

export const ProductsList = ({}: Props) => {
  const theme = useTheme();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState("ALL");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );

  const handleOpenCreateModal = () => {
    setSelectedProductId(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (id: string) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const filtered = useMemo(
    () =>
      MOCK_PRODUCTS?.filter((product: any) => {
        const matchSearch =
          product?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
          product?.category?.toLowerCase()?.includes(search?.toLowerCase());
        const matchStatus =
          statusFilter === "ALL" || product?.status === statusFilter;
        return matchSearch && matchStatus;
      }),
    [search, statusFilter],
  );

  const stats = useMemo(
    () => ({
      total: MOCK_PRODUCTS?.length,
      active: MOCK_PRODUCTS?.filter((product) => product?.status === "ACTIVE")
        ?.length,
      draft: MOCK_PRODUCTS?.filter((product) => product?.status === "DRAFT")
        ?.length,
      totalStock: MOCK_PRODUCTS?.reduce(
        (sum, product) => sum + product?.totalStock,
        0,
      ),
    }),
    [],
  );

  const statsItems = [
    {
      label: "Total Products",
      value: stats?.total,
      icon: <Inventory2Outlined />,
      color: "primary.main",
    },
    {
      label: "Active Listings",
      value: stats?.active,
      icon: <CheckCircle />,
      color: "success.main",
    },
    {
      label: "Drafts",
      value: stats?.draft,
      icon: <Storefront />,
      color: "warning.main",
    },
    {
      label: "Total Units",
      value: stats?.totalStock?.toLocaleString(),
      icon: <Warehouse />,
      color: "info.main",
    },
  ];

  return (
    <ProductListContainer>
      <SellerHeader
        title="Inventory Management"
        subtitle="Manage, track, and optimize your product listings."
        action={
          <Button
            variant="contained"
            disableElevation
            startIcon={<AddIcon />}
            onClick={handleOpenCreateModal}
            sx={{ borderRadius: 2, px: 3, py: 1 }}
          >
            Create Product
          </Button>
        }
      />

      <Grid container spacing={1}>
        {statsItems?.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <StatsCard {...item} />
          </Grid>
        ))}
      </Grid>

      <ProductListBox variant="outlined">
        <ProductListBoxHeader $alpha={alpha}>
          <ProductListStack>
            <Tabs
              value={statusFilter}
              onChange={(_, v) => setStatus(v)}
              indicatorColor="primary"
              textColor="primary"
              sx={{ minHeight: 40 }}
            >
              {["ALL", "ACTIVE", "DRAFT", "INACTIVE"]?.map((status: any) => (
                <Tab
                  key={status}
                  label={status}
                  value={status}
                  sx={{ fontWeight: 700, fontSize: "12px" }}
                  disableRipple
                />
              ))}
            </Tabs>

            <TextField
              size="small"
              placeholder="Quick search by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: "340px", bgcolor: "background.paper" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ opacity: 0.5 }} />
                  </InputAdornment>
                ),
              }}
            />
          </ProductListStack>
        </ProductListBoxHeader>

        <Divider />

        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "grey.50" }}>
                <ProductListTableCell>Product Details</ProductListTableCell>
                <ProductListTableCell>Category</ProductListTableCell>
                <ProductListTableCell>Status</ProductListTableCell>
                <ProductListTableCell align="right">
                  Variants
                </ProductListTableCell>
                <ProductListTableCell align="right">Stock</ProductListTableCell>
                <ProductListTableCell align="right">
                  Retail Price
                </ProductListTableCell>
                <ProductListTableCell align="right">
                  Actions
                </ProductListTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered?.map((product) => (
                <TableRow
                  key={product?.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Box>
                      <Typography variant="body1" fontWeight={700}>
                        {product?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Added on {product?.createdAt}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={product?.category}
                      size="small"
                      variant="outlined"
                      sx={{ borderRadius: 1, fontWeight: 500 }}
                    />
                  </TableCell>

                  <TableCell>
                    <StatusChip status={product?.status} />
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {product?.variantCount} items
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <ProductListStockStack>
                      {product?.totalStock < 10 && (
                        <Tooltip title="Low Stock Warning">
                          <WarningAmber
                            sx={{ fontSize: 16, color: "orange" }}
                          />
                        </Tooltip>
                      )}
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        color={
                          product?.totalStock < 10
                            ? "warning.main"
                            : "text.primary"
                        }
                      >
                        {product?.totalStock}
                      </Typography>
                    </ProductListStockStack>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={700}>
                      ₹{product?.price.toFixed(2)}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <ProductListStockStack>
                      <Tooltip title="Edit Product">
                        <ProductListIconButton
                          size="small"
                          onClick={() => handleOpenEditModal(product?.id)}
                        >
                          <EditOutlined fontSize="small" />
                        </ProductListIconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <ProductListIconButton size="small">
                          <DeleteOutline fontSize="small" />
                        </ProductListIconButton>
                      </Tooltip>
                    </ProductListStockStack>
                  </TableCell>
                </TableRow>
              ))}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                    <Stack spacing={1} alignItems="center">
                      <Inventory2Outlined sx={{ fontSize: 40, opacity: 0.1 }} />
                      <Typography color="text.secondary">
                        No products found matching your search criteria.
                      </Typography>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => {
                          setSearch("");
                          setStatus("ALL");
                        }}
                      >
                        Clear Filters
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </ProductListBox>

      <CustomModal
        open={isModalOpen}
        onClose={handleCloseModal}
        headingTitle={
          selectedProductId ? "Edit Product Information" : "Create New Product"
        }
        isFormModal={true}
        width={1100}
      >
        <ProductWizard
          productId={selectedProductId}
          onBack={handleCloseModal}
        />
      </CustomModal>
    </ProductListContainer>
  );
};
