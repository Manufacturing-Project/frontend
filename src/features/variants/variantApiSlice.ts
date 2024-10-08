import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateVariant } from './variantModel';
import { BASE_URL } from '../../constant';

export const variantsApi = createApi({
  reducerPath: 'variantsApi', 
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/variants` }),  
  endpoints: (builder) => ({
    createVariant: builder.mutation<void, CreateVariant>({
      query: (variant) => ({
        url: `/`,
        method: 'POST',
        body: variant,
      }),
    }),

    getVariants: builder.query<CreateVariant[], void>({
      query: () => ({ 
        url: `/`,
        method: 'GET',
      }),
 
    }),

    updateVariant: builder.mutation<void, { id: string; variant: CreateVariant }>({
      query: ({ id, variant }) => ({
        url: `/${id}`,
        method: 'PUT', 
        body: variant, 
      }),
    }),

    // Mutation for deleting a unit
    deleteVariant: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),


  }),
});

export const {
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
  useGetVariantsQuery,
} = variantsApi;
