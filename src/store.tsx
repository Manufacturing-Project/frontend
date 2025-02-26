import { configureStore } from "@reduxjs/toolkit";
import { rawMaterialApi } from "./features/rawMaterials/rawMaterialApiSlice";
import { unitsApi } from "./features/units/UnitsApiSlice";
import { categoriesApi } from "./features/categories/CategoryApiSlice";
import { variantsApi } from "./features/variants/variantApiSlice";
import UnitSlice from "./features/units/UnitSlice";
import RawMaterialSlice from "./features/rawMaterials/rawMaterialSlice";
import userReducer from './features/user/UserSlice';
import { userApi } from "./features/user/UserApiSlice";

export const store = configureStore({
    reducer: {
        [rawMaterialApi.reducerPath]: rawMaterialApi.reducer,
        [unitsApi.reducerPath]: unitsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [variantsApi.reducerPath]: variantsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        unit: UnitSlice,
        rawMaterial: RawMaterialSlice,
        
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(rawMaterialApi.middleware)
            .concat(categoriesApi.middleware)
            .concat(variantsApi.middleware)
            .concat(unitsApi.middleware)
            .concat(userApi.middleware)
            
            
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export default store;
