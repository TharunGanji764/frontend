import { selectBasicInfoValid, selectVariantsValid } from "@/hooks/useProductWizardSelector";
import { Stack, Typography, Paper, Alert, AlertTitle } from "@mui/material";

interface Props {
  state: any;
}

export const Review = ({ state }: Props) => {
  const basicValid = selectBasicInfoValid(state);

  const variantsValid = selectVariantsValid(state);

  const allValid = basicValid && variantsValid;

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Review & Publish</Typography>

      {!allValid && (
        <Alert severity="error">
          <AlertTitle>Incomplete fields</AlertTitle>

          {!basicValid && "Basic information missing."}
          {!variantsValid && "Variants invalid."}
        </Alert>
      )}

      <Paper sx={{ p: 2 }}>
        <Typography>Product: {state.basicInfo.name}</Typography>

        <Typography>Category: {state.basicInfo.category}</Typography>

        <Typography>Variants: {state.variants.length}</Typography>
      </Paper>

      {allValid && <Alert severity="success">All validations passed.</Alert>}
    </Stack>
  );
};
