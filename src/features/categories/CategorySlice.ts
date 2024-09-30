import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  categoryName: string;
}

const initialState: CategoryState = {
  categoryName: '',
};

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryName: (state, action: PayloadAction<string>) => {
      state.categoryName = action.payload;
    },
  },
});

export const {
  setCategoryName
} = CategorySlice.actions;

export default CategorySlice.reducer;
