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

  // ... Logic remains the same as your original snippet ...
  const addAttribute = () => {
    if (!newAttrName.trim() || attributes.length >= 3) return;
    const newAttrs = [...attributes, { name: newAttrName.trim(), values: [] }];
    dispatch({ type: "SET_ATTRIBUTES", payload: newAttrs });
    setNewAttrName("");
  };

  const addValue = (attrIdx: number) => {
    const val = (newValueInputs[attrIdx] || "").trim();
    if (!val) return;
    const newAttrs = attributes.map((a: any, i: number) =>
      i === attrIdx ? { ...a, values: [...a.values, val] } : a,
    );
    dispatch({ type: "SET_ATTRIBUTES", payload: newAttrs });
    dispatch({
      type: "SET_VARIANTS",
      payload: generateCartesianVariants(newAttrs),
    });
    setNewValueInputs((p: any) => ({ ...p, [attrIdx]: "" }));
  };

  const applyBulkPrice = () => {
    const price = parseFloat(bulkPrice);
    if (!isNaN(price) && price > 0) {
      dispatch({ type: "BULK_UPDATE_VARIANTS", payload: { price } });
      setBulkPrice("");
    }
  };

  const applyBulkStock = () => {
    const stock = parseInt(bulkStock);
    if (!isNaN(stock) && stock >= 0) {
      dispatch({ type: "BULK_UPDATE_VARIANTS", payload: { stock } });
      setBulkStock("");
    }
  };

  const updateVariant = (index: number, field: string, value: any) =>
    dispatch({
      type: "UPDATE_VARIANT",
      payload: { index, data: { [field]: value } },
    });

  return (
    <Stack spacing={4}>
      {/* --- Section 1: Attribute Configuration --- */}
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
            {attributes.length < 3 ? (
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
              {attributes.map((attr: any, ai: number) => (
                <Box
                  key={ai}
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
                    {attr.name.toUpperCase()}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <TextField
                      size="small"
                      placeholder={`Add value for ${attr.name}`}
                      value={newValueInputs[ai] || ""}
                      onChange={(e) =>
                        setNewValueInputs((p: any) => ({
                          ...p,
                          [ai]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => e.key === "Enter" && addValue(ai)}
                      sx={{ maxWidth: 250 }}
                    />
                    <IconButton color="primary" onClick={() => addValue(ai)}>
                      <AddCircleOutline />
                    </IconButton>
                  </Stack>

                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {attr.values.map((val: string, vi: number) => (
                      <Chip
                        key={vi}
                        label={val}
                        onDelete={() => {}} // Suggest adding delete logic
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

      {/* --- Section 2: Variant Management --- */}
      {variants.length > 0 && (
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
            {/* Bulk Actions Header */}
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
                  {variants.map((v: any, vi: number) => (
                    <TableRow key={v.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {v.combo.map((c: any, i: number) => (
                            <Chip
                              key={i}
                              label={c.value}
                              size="small"
                              variant="filled"
                              sx={{
                                fontSize: "0.7rem",
                                height: 20,
                                bgcolor: "grey.100",
                              }}
                            />
                          ))}
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          value={v.sku}
                          placeholder="SKU-001"
                          onChange={(e) =>
                            updateVariant(vi, "sku", e.target.value)
                          }
                          error={!v.sku.trim()}
                        />
                      </TableCell>

                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={v.price || ""}
                          onChange={(e) =>
                            updateVariant(
                              vi,
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
                          error={!v.price || v.price <= 0}
                        />
                      </TableCell>

                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={v.stock}
                          onChange={(e) =>
                            updateVariant(
                              vi,
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
