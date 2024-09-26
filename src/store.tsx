import { configureStore } from "@reduxjs/toolkit";
import { rawMaterialApi } from "./features/rawMaterials/rawMaterialApiSlice";
import { unitsApi } from "./features/units/UnitsApiSlice";
import { categoriesApi } from "./features/categories/categoriesSlice";
import UnitSlice from "./features/units/UnitSlice"
import RawMaterialSlice from "./features/rawMaterials/RawMaterialSlice"


export const store = configureStore({
    reducer: {
        [rawMaterialApi.reducerPath]: rawMaterialApi.reducer,
        [unitsApi.reducerPath]: unitsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        unit: UnitSlice,
        rawMaterial: RawMaterialSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(rawMaterialApi.middleware)
    .concat(categoriesApi.middleware) 
    .concat(unitsApi.middleware),  
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

  