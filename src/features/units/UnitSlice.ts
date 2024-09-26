import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UnitState {
    unitName: string;
  }

  const initialState: UnitState = {
    unitName: '',
  };

  const UnitSlice = createSlice({
      name: 'unit',
      initialState,
      reducers: {

        setunitName: (state , action: PayloadAction<string>) =>{
            state.unitName = action.payload;
        }
      }
  });

  export const {
    setunitName
  } = UnitSlice.actions;

  export default UnitSlice.reducer

  

