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
import {
  useCreateVariantsMutation,
  useGetSellerProductsQuery,
  useUpdateVariantsMutation,
} from "@/store/api/sellerSlice/sellerApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  prepopulateProduct,
  setIsVariantUpdated,
  setProductId,
  setSaveStatus,
  setStep,
} from "@/store/slices/seller/productWizardSlice";

interface Props {
  productId?: string | null;
  onBack: () => void;
}

export const ProductWizard = ({ productId, onBack }: Props) => {
  const { data: productsData } = useGetSellerProductsQuery();
  const dispatch = useDispatch<AppDispatch>();
  const [completedSteps, setCompleted] = useState<number[]>([]);
  const [publishSuccess, setPublish] = useState(false);
  const [isLoading, setIsLoading] = useState(!!productId);
  const state = useSelector((state: RootState) => state.productWizard);
  
  const [
    createVariants,
    { isLoading: createVariantsLoading, isSuccess: createVariantsSuccess },
  ] = useCreateVariantsMutation();
  const [
    updateVariants,
    { isLoading: updateVariantsLoading, isSuccess: updateVariantsSuccess },
  ] = useUpdateVariantsMutation();

  useEffect(() => {
    if (productId) {
      const existingProduct = productsData?.data?.find(
        (product: any) => product?.id === productId,
      );

      if (existingProduct) {
        dispatch(prepopulateProduct(existingProduct));
        setCompleted([0, 1, 2, 3]);
      }
      setIsLoading(false);
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (!state.productId || state?.currentStep === 0) return;
    if (state?.currentStep === 2) {
      if (state?.isNewProduct) {
        createVariants({ productId: productId || "", data: state.variants });
      }
      if (state?.isUpdatingProduct) {
        if (state?.isVariantsUpdated) {
          updateVariants({
            productId: productId || "",
            data: state?.variants,
          });
        }
      }
    }
    if (createVariantsLoading || updateVariantsLoading) {
      dispatch(setSaveStatus("saving"));
    }

    if (createVariantsSuccess || updateVariantsSuccess) {
      dispatch(setSaveStatus("saved"));
      dispatch(setIsVariantUpdated(false));
      dispatch(setSaveStatus("idle"));
    }
  }, [state?.currentStep, state?.productId, dispatch]);

  const canProceed =
    state?.currentStep === 0
      ? selectBasicInfoValid(state)
      : state?.currentStep === 1
        ? selectVariantsValid(state)
        : true;

  const next = () => {
    if (!canProceed) return;

    if (state.currentStep === 0 && !state.productId) {
      dispatch(setProductId(productId));
    }

    setCompleted((prev) =>
      prev?.includes(state.currentStep) ? prev : [...prev, state.currentStep],
    );
    dispatch(setStep(state.currentStep + 1));
  };

  const back = () => dispatch(setStep(state.currentStep - 1));

  const publish = () => {
    setPublish(true);
    console.log("Publishing product...", state);
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
          {state?.currentStep === 0 && (
            <BasicInfo state={state} dispatch={dispatch} />
          )}
          {state?.currentStep === 1 && (
            <Variants state={state} dispatch={dispatch} />
          )}
          {state?.currentStep === 2 && <Pricing state={state} />}
          {state?.currentStep === 3 && <Media />}
          {state?.currentStep === 4 && <Review state={state} />}
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

          {state?.currentStep < 4 ? (
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
