import {
  Stack,
  Paper,
  Divider,
  Button,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useProductWizard } from "@/hooks/useProductWizard";
import { WizardStepper } from "@/components/atoms/WizardStepper";
import { SaveIndicator } from "@/components/atoms/SaveIndicator";
import {
  selectBasicInfoValid,
  selectVariantsValid,
} from "@/hooks/useProductWizardSelector";
import { BasicInfo } from "./steps/BasicInfo";
import { Variants } from "./steps/Variants";
import { Pricing } from "./steps/Pricing";
import { Media } from "./steps/Media";
import { Review } from "./steps/Review";
import { MOCK_PRODUCTS } from "@/mock-data/products.mock";

interface Props {
  productId?: string | null;
  onBack: () => void;
}

export const ProductWizard = ({ productId, onBack }: Props) => {
  const [state, dispatch] = useProductWizard();
  const [completedSteps, setCompleted] = useState<number[]>([]);
  const [publishSuccess, setPublish] = useState(false);
  const [isLoading, setIsLoading] = useState(!!productId);

  useEffect(() => {
    if (productId) {
      const existingProduct = MOCK_PRODUCTS.find((p) => p.id === productId);

      if (existingProduct) {
        dispatch({
          type: "HYDRATE_PRODUCT",
          payload: existingProduct,
        });

        setCompleted([0, 1, 2, 3]);
      }
      setIsLoading(false);
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (!state.productId || state.currentStep === 0) return;

    dispatch({ type: "SET_SAVE_STATUS", payload: "saving" });

    const t = setTimeout(() => {
      dispatch({ type: "SET_SAVE_STATUS", payload: "saved" });
      setTimeout(
        () => dispatch({ type: "SET_SAVE_STATUS", payload: "idle" }),
        2000,
      );
    }, 900);

    return () => clearTimeout(t);
  }, [state.currentStep, state.productId, dispatch]);

  const canProceed =
    state.currentStep === 0
      ? selectBasicInfoValid(state)
      : state.currentStep === 1
        ? selectVariantsValid(state)
        : true;

  const next = () => {
    if (!canProceed) return;

    if (state.currentStep === 0 && !state.productId) {
      dispatch({
        type: "SET_PRODUCT_ID",
        payload: `draft_${Date.now()}`,
      });
    }

    setCompleted((prev) =>
      prev.includes(state.currentStep) ? prev : [...prev, state.currentStep],
    );
    dispatch({ type: "SET_STEP", payload: state.currentStep + 1 });
  };

  const back = () =>
    dispatch({ type: "SET_STEP", payload: state.currentStep - 1 });

  const publish = () => {
    setPublish(true);
    setTimeout(() => onBack(), 1500);
  };

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" py={10} spacing={2}>
        <CircularProgress size={40} thickness={4} />
        <Typography variant="body2" color="text.secondary">
          Fetching product details...
        </Typography>
      </Stack>
    );
  }

  if (publishSuccess) {
    return (
      <Stack alignItems="center" justifyContent="center" spacing={2} py={6}>
        <Typography fontSize={48}>🎉</Typography>
        <Typography variant="h6">
          {productId ? "Product Updated!" : "Product Published!"}
        </Typography>
        <CircularProgress size={24} />
      </Stack>
    );
  }

  return (
    <Stack spacing={3} sx={{ height: "100%" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {productId ? `EDITING: ${productId}` : "NEW PRODUCT DRAFT"}
        </Typography>
        <SaveIndicator status={state.saveStatus} />
      </Stack>

      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        <WizardStepper
          currentStep={state.currentStep}
          completedSteps={completedSteps}
        />
      </Paper>

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
          elevation={0}
        >
          {state.currentStep === 0 && (
            <BasicInfo state={state} dispatch={dispatch} />
          )}
          {state.currentStep === 1 && (
            <Variants state={state} dispatch={dispatch} />
          )}
          {state.currentStep === 2 && <Pricing state={state} />}
          {state.currentStep === 3 && <Media />}
          {state.currentStep === 4 && <Review state={state} />}
        </Paper>
      </Box>

      <Divider />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button color="inherit" onClick={onBack}>
          Cancel
        </Button>

        <Stack direction="row" spacing={2}>
          {state.currentStep > 0 && (
            <Button onClick={back} variant="outlined">
              Back
            </Button>
          )}

          {state.currentStep < 4 ? (
            <Button
              variant="contained"
              onClick={next}
              disabled={!canProceed}
              sx={{ px: 4 }}
            >
              Next Step
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={publish}
              disabled={
                !(selectBasicInfoValid(state) && selectVariantsValid(state))
              }
              sx={{ px: 4 }}
            >
              {productId ? "Save Changes" : "Publish Product"}
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
