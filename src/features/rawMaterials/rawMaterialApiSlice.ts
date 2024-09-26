import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateRawMaterial } from "./rawMaterialModel";
import { BASE_URL } from '../../constant';

export const rawMaterialApi = createApi({
  reducerPath: 'rawMaterialApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/materials` }), 
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
