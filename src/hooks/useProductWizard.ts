import { useReducer } from "react";

export const initialWizardState = {
  currentStep: 0,
  productId: null,
  saveStatus: "idle",
  basicInfo: {
    name: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    brand: "",
  },
  attributes: [],
  variants: [],
  media: [],
};

function wizardReducer(state: any, { type, payload }: any) {
  switch (type) {
    case "SET_STEP":
      return { ...state, currentStep: payload };

    case "SET_PRODUCT_ID":
      return { ...state, productId: payload };

    case "SET_SAVE_STATUS":
      return { ...state, saveStatus: payload };

    case "UPDATE_BASIC_INFO":
      return {
        ...state,
        basicInfo: { ...state.basicInfo, ...payload },
      };

    case "SET_ATTRIBUTES":
      return { ...state, attributes: payload };

    case "SET_VARIANTS":
      return { ...state, variants: payload };

    case "UPDATE_VARIANT": {
      const variants = state.variants.map((v: any, i: number) =>
        i === payload.index ? { ...v, ...payload.data } : v,
      );
      return { ...state, variants };
    }

    case "BULK_UPDATE_VARIANTS":
      return {
        ...state,
        variants: state.variants.map((v: any) => ({
          ...v,
          ...payload,
        })),
      };

    case "SET_MEDIA":
      return { ...state, media: payload };

    case "RESET":
      return initialWizardState;

    case "HYDRATE_PRODUCT":
      return {
        ...state,
        basicInfo: { payload },
        variants: payload.variants,
      };
    default:
      return state;
  }
}

export const useProductWizard = () => {
  return useReducer(wizardReducer, initialWizardState);
};
