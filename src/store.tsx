import { configureStore } from "@reduxjs/toolkit";
import { rawMaterialApi } from "./features/rawMaterials/rawMaterialApiSlice";
import { unitsApi } from "./features/units/unitsSlice";
import { categoriesApi } from "./features/categories/categoriesSlice";
import RawMaterialSlice  from "./features/rawMaterials/RawMaterialSlice";


export const store = configureStore({
    reducer: {
        [rawMaterialApi.reducerPath]: rawMaterialApi.reducer,
        [unitsApi.reducerPath]: unitsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
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

  