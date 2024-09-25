import { configureStore } from "@reduxjs/toolkit";
import { rawMaterialApi } from "./features/rawMaterials/rawMaterialSlice";
import { unitsApi } from "./features/units/unitsSlice";
import { categoriesApi } from "./features/categories/categoriesSlice";


export const store = configureStore({
    reducer: {
        [rawMaterialApi.reducerPath]: rawMaterialApi.reducer,
        [unitsApi.reducerPath]: unitsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(rawMaterialApi.middleware)
    .concat(categoriesApi.middleware)
    .concat(unitsApi.middleware),  
});

export default store;

 