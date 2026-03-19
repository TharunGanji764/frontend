import { groupAttributes } from "@/hooks/useProductWizardSelector";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductWizardState {
  currentStep: number;
  productId: any;
  saveStatus: string;
  basicInfo: {
    title: string;
    description: string;
    full_description: string;
    category: string;
    brand: string;
  };
  attributes: any[];
  variants: any[];
  media: any[];
  isNewProduct: boolean;
  isUpdatingProduct: boolean;
  isVariantsUpdated: boolean;
  isAttributesUpdated: boolean;
}

const initialState: ProductWizardState = {
  currentStep: 0,
  productId: null,
  saveStatus: "idle",
  basicInfo: {
    title: "",
    description: "",
    full_description: "",
    category: "",
    brand: "",
  },
  attributes: [],
  variants: [],
  media: [],
  isNewProduct: false,
  isUpdatingProduct: false,
  isVariantsUpdated: false,
  isAttributesUpdated: false,
};

const productWizardSlice = createSlice({
  name: "productWizard",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<any>) {
      state.currentStep = action?.payload;
    },
    setProductId(state, action: PayloadAction<any>) {
      state.productId = action.payload;
    },
    setSaveStatus(state, action: PayloadAction<any>) {
      state.saveStatus = action.payload;
    },
    updateBasicInfo(state, action: PayloadAction<any>) {
      state.basicInfo = { ...state.basicInfo, ...action.payload };
    },
    setAttributes(state, action: PayloadAction<any>) {
      state.attributes = action.payload;
    },
    setVariants(state, action: PayloadAction<any>) {
      state.variants = action.payload;
    },
    updateVariants(state, action: PayloadAction<any>) {
      const updatedVariants = state.variants?.map(
        (variant: any, index: number) =>
          index === action?.payload?.index
            ? { ...variant, ...action.payload?.data }
            : variant,
      );
      state.variants = updatedVariants;
    },
    bulkUpdateVariants(state, action: PayloadAction<any>) {
      state.variants = state.variants?.map((variant: any) => ({
        ...variant,
        ...action?.payload,
      }));
    },

    setMedia(state, action: PayloadAction<any>) {
      state.media = action.payload;
    },
    reset(state) {
      state.currentStep = initialState.currentStep;
      state.productId = initialState.productId;
      state.saveStatus = initialState.saveStatus;
      state.basicInfo = { ...initialState.basicInfo };
      state.attributes = [];
      state.variants = [];
      state.media = [];
    },
    prepopulateProduct(state, action: PayloadAction<any>) {
      state.basicInfo = action.payload;
      state.variants = action.payload.variants;
      state.attributes = groupAttributes(
        action.payload.variants?.flatMap((variant: any) => variant?.attributes),
      );
    },
    setCreateNewProduct(state) {
      state.isNewProduct = true;
      state.isUpdatingProduct = false;
    },
    setUpdateNewProduct(state) {
      state.isNewProduct = false;
      state.isUpdatingProduct = true;
    },
    setIsVariantUpdated(state, action: PayloadAction<any>) {
      state.isVariantsUpdated = action?.payload;
    },
    setIsAttributesUpdated(state, action: PayloadAction<any>) {
      state.isAttributesUpdated = action?.payload;
    },
  },
});

export const {
  bulkUpdateVariants,
  prepopulateProduct,
  reset,
  setAttributes,
  setMedia,
  setProductId,
  setSaveStatus,
  setStep,
  setVariants,
  updateBasicInfo,
  updateVariants,
  setCreateNewProduct,
  setUpdateNewProduct,
  setIsVariantUpdated,
  setIsAttributesUpdated,
} = productWizardSlice.actions;

export default productWizardSlice.reducer;
