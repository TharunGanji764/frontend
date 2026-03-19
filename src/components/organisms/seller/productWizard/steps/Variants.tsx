import { generateCartesianVariants } from "@/hooks/useProductWizardSelector";
import {
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
  Chip,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  InputAdornment,
  IconButton,
  Divider,
  alpha,
} from "@mui/material";
import { useState } from "react";
import {
  AddCircleOutline,
  LayersOutlined,
  FlashOnOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import {
  bulkUpdateVariants,
  setAttributes,
  setIsAttributesUpdated,
  setIsVariantUpdated,
  setVariants,
  updateVariants,
} from "@/store/slices/seller/productWizardSlice";
import { useDeleteAttributesMutation } from "@/store/api/sellerSlice/sellerApiSlice";

interface Props {
  state: any;
  dispatch: any;
}

export const Variants = ({ state, dispatch }: Props) => {
  const { attributes, variants } = state;
  const [newAttrName, setNewAttrName] = useState("");
  const [newValueInputs, setNewValueInputs] = useState<any>({});
  const [bulkPrice, setBulkPrice] = useState("");
  const [bulkStock, setBulkStock] = useState("");
  const [updateAttributes] = useDeleteAttributesMutation();
  console.log("state: ", state?.isAttributesUpdated);

  const addAttribute = () => {
    if (!newAttrName?.trim() || attributes?.length >= 3) return;
    const newAttrs = [...attributes, { name: newAttrName?.trim(), values: [] }];
    dispatch(setAttributes(newAttrs));
    dispatch(setIsVariantUpdated(true));
    setNewAttrName("");
  };

  const handleDeleteValue = (attr: any, value: string) => {
    dispatch(setIsAttributesUpdated(true));
    if (state?.isAttributesUpdated) {
      updateAttributes({
        productId: state?.productId,
        data: { name: attr?.name, value },
      });
    }
  };

  const addValue = (attrIdx: number) => {
    const val = (newValueInputs[attrIdx] || "").trim();
    if (!val) return;
    const newAttrs = attributes?.map((attribute: any, index: number) =>
      attribute?.name === attrIdx
        ? { ...attribute, values: [...attribute?.values, val] }
        : attribute,
    );
    dispatch(setAttributes(newAttrs));
    const variants = generateCartesianVariants(newAttrs, state);
    dispatch(setVariants(variants));
    dispatch(setIsVariantUpdated(true));
    setNewValueInputs((p: any) => ({ ...p, [attrIdx]: "" }));
  };

  const applyBulkPrice = () => {
    const price = parseFloat(bulkPrice);
    if (!isNaN(price) && price > 0) {
      dispatch(bulkUpdateVariants({ price }));
      dispatch(setIsVariantUpdated(true));
      setBulkPrice("");
    }
  };

  const applyBulkStock = () => {
    const stock = parseInt(bulkStock);
    if (!isNaN(stock) && stock >= 0) {
      dispatch(bulkUpdateVariants({ stock }));
      dispatch(setIsVariantUpdated(true));
      setBulkStock("");
    }
  };

  const updateVariant = (index: number, field: string, value: any) => {
    dispatch(updateVariants({ index, data: { [field]: value } }));
    dispatch(setIsVariantUpdated(true));
  };

  return (
    <Stack spacing={4}>
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <LayersOutlined color="primary" />
          <Typography variant="h6" fontWeight={700}>
            Attributes & Options
          </Typography>
        </Stack>

        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Box
            p={3}
            bgcolor={(theme) => alpha(theme.palette.primary.main, 0.02)}
          >
            {attributes?.length < 3 ? (
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add attribute (e.g. Size, Color)"
                  value={newAttrName}
                  onChange={(e) => setNewAttrName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addAttribute()}
                />
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={addAttribute}
                  sx={{ px: 4 }}
                >
                  Add
                </Button>
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Maximum of 3 attributes reached.
              </Typography>
            )}
          </Box>

          <Divider />

          <Box p={3}>
            <Stack spacing={3}>
              {attributes?.map((attribute: any, index: number) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px dashed",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="primary"
                    gutterBottom
                  >
                    {attribute?.name?.toUpperCase()}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <TextField
                      size="small"
                      placeholder={`Add value for ${attribute?.name}`}
                      value={newValueInputs[attribute?.name] || ""}
                      onChange={(e) =>
                        setNewValueInputs((p: any) => ({
                          ...p,
                          [attribute?.name]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && addValue(attribute?.name)
                      }
                      sx={{ maxWidth: 250 }}
                    />
                    <IconButton
                      color="primary"
                      onClick={() => addValue(attribute?.name)}
                    >
                      <AddCircleOutline />
                    </IconButton>
                  </Stack>

                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {attribute?.values?.map((value: string, index: number) => (
                      <Chip
                        key={index}
                        label={value}
                        onDelete={() => {
                          handleDeleteValue(attribute, value);
                        }}
                        variant="outlined"
                        color="primary"
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
        </Paper>
      </Box>

      {variants?.length > 0 && (
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <FlashOnOutlined color="warning" />
            <Typography variant="h6" fontWeight={700}>
              Generated Variants
            </Typography>
          </Stack>

          <Paper
            variant="outlined"
            sx={{ borderRadius: 2, overflow: "hidden" }}
          >
            <Box
              p={2}
              sx={{
                bgcolor: (theme) => alpha(theme.palette.warning.main, 0.05),
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ textTransform: "uppercase", opacity: 0.6 }}
                >
                  Bulk Edit:
                </Typography>
                <TextField
                  size="small"
                  type="number"
                  placeholder="Price"
                  value={bulkPrice}
                  onChange={(e) => setBulkPrice(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  sx={{ width: 130, bgcolor: "background.paper" }}
                />
                <Button
                  size="small"
                  variant="outlined"
                  onClick={applyBulkPrice}
                >
                  Set Price
                </Button>

                <Divider orientation="vertical" flexItem />

                <TextField
                  size="small"
                  type="number"
                  placeholder="Stock"
                  value={bulkStock}
                  onChange={(e) => setBulkStock(e.target.value)}
                  sx={{ width: 130, bgcolor: "background.paper" }}
                />
                <Button
                  size="small"
                  variant="outlined"
                  onClick={applyBulkStock}
                >
                  Set Stock
                </Button>
              </Stack>
            </Box>

            <TableContainer sx={{ maxHeight: 400 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", bgcolor: "grey.50" }}>
                      Variant Combination
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        bgcolor: "grey.50",
                        width: 200,
                      }}
                    >
                      SKU
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        bgcolor: "grey.50",
                        width: 150,
                      }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        bgcolor: "grey.50",
                        width: 120,
                      }}
                    >
                      Stock
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {variants?.map((variant: any, index: number) => (
                    <TableRow key={variant?.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {variant?.attributes?.map(
                            (attribute: any, index: number) => (
                              <Chip
                                key={index}
                                label={attribute?.attribute_value}
                                size="small"
                                variant="filled"
                                sx={{
                                  fontSize: "0.7rem",
                                  height: 20,
                                  bgcolor: "grey.100",
                                }}
                              />
                            ),
                          )}
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          value={variant?.sku}
                          placeholder="SKU-001"
                          onChange={(e) =>
                            updateVariant(index, "sku", e.target.value)
                          }
                          error={!variant?.sku?.trim()}
                        />
                      </TableCell>

                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={variant?.price || ""}
                          onChange={(e) =>
                            updateVariant(
                              index,
                              "price",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                          }}
                          error={!variant?.price || variant?.price <= 0}
                        />
                      </TableCell>

                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={variant?.stock}
                          onChange={(e) =>
                            updateVariant(
                              index,
                              "stock",
                              parseInt(e.target.value) || 0,
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}
    </Stack>
  );
};
