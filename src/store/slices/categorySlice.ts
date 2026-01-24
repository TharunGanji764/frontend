import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  categories: string[];
};

const initialState: InitialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategories(state, action: PayloadAction<any>) {
      state.categories.push(action.payload);
    },
  },
});

export const { addCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
