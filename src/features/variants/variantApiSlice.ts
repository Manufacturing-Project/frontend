import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateVariant } from './variantModel';

export const variantsApi = createApi({
  reducerPath: 'variantsApi', 
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/variants' }),  
  endpoints: (builder) => ({
    // Mutation for creating a unit
    createVariant: builder.mutation<void, CreateVariant>({
      query: (variant) => ({
        url: `/`,
        method: 'POST',
        body: variant,
      }),
    }),

    // Query for fetching all units
    getVariants: builder.query<CreateVariant[], void>({
      query: () => ({ 
        url: `/`,
        method: 'GET',
      }),
 
    }),
  }),
});

// Export the hooks for the endpoints
export const {
  useCreateVariantMutation,
//   useUpdateUnitMutation,
//   useDeleteUnitMutation,
  useGetVariantsQuery,
} = variantsApi;
