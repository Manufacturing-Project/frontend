import { configureStore } from "@reduxjs/toolkit";
import { rawMaterialApi } from "./features/rawMaterials/rawMaterialApiSlice";
import { unitsApi } from "./features/units/UnitsApiSlice";
import { categoriesApi } from "./features/categories/CategoryApiSlice";
import { variantsApi } from "./features/variants/variantApiSlice";
import UnitSlice from "./features/units/UnitSlice";
import RawMaterialSlice from "./features/rawMaterials/rawMaterialSlice";
import userReducer from './features/user/UserSlice';
import {userapi} from './features/user/UserApiSlice'
import {authApi}  from "../src/features/authentication/Authaapislice";
import AuthReducer from "../src/features/authentication/Authslice";

export const store = configureStore({
    reducer: {
        [rawMaterialApi.reducerPath]: rawMaterialApi.reducer,
        [unitsApi.reducerPath]: unitsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [variantsApi.reducerPath]: variantsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userapi.reducerPath]: userapi.reducer,
        unit: UnitSlice,
        rawMaterial: RawMaterialSlice,
        auth: AuthReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(rawMaterialApi.middleware)
            .concat(categoriesApi.middleware)
            .concat(variantsApi.middleware)
            .concat(unitsApi.middleware)
            .concat(authApi.middleware)
            .concat(userapi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export default store;
