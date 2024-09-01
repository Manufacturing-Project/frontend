import { configureStore } from "@reduxjs/toolkit";
import { rawMaterialsApi } from "./features/rawMaterials/rawMaterialApiSlice";


export const store = configureStore({
    reducer: {
        [rawMaterialsApi.reducerPath]: rawMaterialsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        rawMaterialsApi.middleware,
    ),  
});

export default store;

  