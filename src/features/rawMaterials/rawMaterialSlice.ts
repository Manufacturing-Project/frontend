import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RawMaterialState {
    m_name: string;
    m_code: string;
    category: string;
    unit: string;
    reorderlevel: number;
    description: string;
    hasVariants?: boolean;
    isCodeValid?: boolean;
  }
  
  const initialState: RawMaterialState = {
    m_name: '',
    m_code: '',
    category: '',
    unit: '',
    reorderlevel: 0,
    description: '',
    hasVariants: false,
    isCodeValid: true,
  };
  
  const RawMaterialSlice = createSlice({
    name: 'rawMaterial',
    initialState,
    reducers: {
      setMName: (state, action: PayloadAction<string>) => {
        state.m_name = action.payload;
      },
      setMCode: (state, action: PayloadAction<string>) => {
        state.m_code = action.payload;
      },
      setCategory: (state, action: PayloadAction<string>) => {
        state.category = action.payload;
      },
      setUnit: (state, action: PayloadAction<string>) => {
        state.unit = action.payload;
      },
      setReorderLevel: (state, action: PayloadAction<number>) => {
        state.reorderlevel = action.payload;
      },
      setDescription: (state, action: PayloadAction<string>) => {
        state.description = action.payload;
      },
      setHasVariants: (state, action: PayloadAction<boolean>) => {
        state.hasVariants = action.payload;
      },
      setIsCodeValid: (state, action: PayloadAction<boolean>) => {
        state.isCodeValid = action.payload;
      },
      resetForm: (state) => initialState,
    },
  });
  
  export const {
    setMName,
    setMCode,
    setCategory,
    setUnit,
    setReorderLevel,
    setDescription,
    setHasVariants,
    setIsCodeValid,
    resetForm,
  } = RawMaterialSlice.actions;
  
  export default RawMaterialSlice.reducer;