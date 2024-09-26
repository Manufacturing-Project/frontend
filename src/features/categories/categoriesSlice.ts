import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constant";


export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/category` }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "",
        }),
    
    }),
});

export const { useGetCategoriesQuery } = categoriesApi;
