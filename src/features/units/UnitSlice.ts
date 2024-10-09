// src/features/units/UnitSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UnitState {
  unitName: string;
}

const initialState: UnitState = {
  unitName: '',
};

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    setunitName: (state, action: PayloadAction<string>) => {
      state.unitName = action.payload;
    },
  },
});

// Export actions
export const { setunitName } = unitSlice.actions;

// Export reducer
export default unitSlice.reducer;
