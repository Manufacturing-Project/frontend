import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateRawMaterial } from "../../models/rawMaterialModel";

export const rawMaterialApi = createApi({
  reducerPath: 'rawMaterialApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/raw-materials' }), 
  endpoints: (builder) => ({
    generateMaterialCode: builder.query({
      query: (materialName) => ({
        url: `/generate-material-code`,
        method: 'POST',
        body: { materialName },
      }), 
    }),
    checkMaterialCodeAvailability: builder.query({
      query: (materialCode) => ({
        url: `/check-material-code`,
        method: 'POST',
        body: { materialCode },
      }),
    }),
    createMaterial: builder.mutation<void, CreateRawMaterial>({
      query: (material) => ({
        url: `/`,
        method: 'POST',
        body: material,
      }),
    }),
  }),
});

export const { useLazyGenerateMaterialCodeQuery, useLazyCheckMaterialCodeAvailabilityQuery, useCreateMaterialMutation } = rawMaterialApi;
