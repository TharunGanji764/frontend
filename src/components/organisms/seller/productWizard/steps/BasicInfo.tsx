import {
  Stack,
  Typography,
  Grid,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Box,
  InputAdornment,
  Divider,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  Inventory2Outlined,
  DescriptionOutlined,
  CategoryOutlined,
  SubtitlesOutlined,
} from "@mui/icons-material";
import { CATEGORIES } from "@/constants/seller.constants";
import { updateBasicInfo } from "@/store/slices/seller/productWizardSlice";

interface Props {
  state: any;
  dispatch: any;
}

export const BasicInfo = ({ state, dispatch }: Props) => {
  const { basicInfo } = state;
  const [errors, setErrors] = useState<any>({});
  const theme = useTheme();

  const setError = (key: string) =>
    setErrors((keys: any) => ({ ...keys, [key]: true }));

  const update = (key: string) => (value: string) =>
    dispatch(updateBasicInfo({ [key]: value }));

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "background.paper",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
      }}
    >
      <Stack spacing={4}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
            <Inventory2Outlined color="primary" fontSize="small" />
            <Typography variant="h5" fontWeight={700}>
              Basic Information
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Provide the core details that will help customers find and
            understand your product.
          </Typography>
        </Box>

        <Divider />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              placeholder="e.g. Wireless Noise Cancelling Headphones"
              required
              value={basicInfo?.title}
              onChange={(e) => update("title")(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SubtitlesOutlined fontSize="small" sx={{ opacity: 0.6 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Brand"
              placeholder="e.g. Sony"
              required
              value={basicInfo.brand}
              onChange={(e) => update("brand")(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SubtitlesOutlined fontSize="small" sx={{ opacity: 0.6 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl
              fullWidth
              required
              error={errors?.category && !basicInfo?.category}
            >
              <InputLabel>Category</InputLabel>
              <Select
                value={basicInfo?.category}
                label="Category"
                onChange={(e) => update("category")(e.target.value as string)}
                onBlur={() => setError("category")}
                startAdornment={
                  <InputAdornment position="start" sx={{ mr: 1 }}>
                    <CategoryOutlined fontSize="small" sx={{ opacity: 0.6 }} />
                  </InputAdornment>
                }
                sx={{
                  "& fieldset": {
                    border: `1px solid ${theme?.palette?.primary?.main}`,
                  },
                }}
                MenuProps={{
                  MenuListProps: {
                    sx: {
                      maxHeight: "160px",
                    },
                  },
                }}
              >
                {CATEGORIES?.map((category: any) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {errors?.category && !basicInfo.category && (
                <FormHelperText>
                  Selecting a category is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Short Description"
              placeholder="A brief catchphrase for the product..."
              required
              value={basicInfo?.description}
              onChange={(e) => update("description")(e.target.value)}
              helperText={`${basicInfo.shortDescription?.length || 0}/150 characters`}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionOutlined
                      fontSize="small"
                      sx={{ opacity: 0.6 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Full Description"
              placeholder="Describe features, materials, and benefits..." 
              value={basicInfo?.full_description}
              onChange={(e) => update("full_description")(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  alignItems: "flex-start",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ mt: 1.5 }}>
                    <DescriptionOutlined
                      fontSize="small"
                      sx={{ opacity: 0.6 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};
