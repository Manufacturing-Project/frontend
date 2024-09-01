import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rawMaterialsApi = createApi({
  reducerPath: 'rawMaterialsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), 
  endpoints: (builder) => ({ 
    addRawMaterial: builder.mutation({
      query: (newMaterial) => ({
        url: '/raw-materials',
        method: 'POST',
        body: newMaterial,
      }),
    }),
  }),
});

export const { useAddRawMaterialMutation } = rawMaterialsApi;
