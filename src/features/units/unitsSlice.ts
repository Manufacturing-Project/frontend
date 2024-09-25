import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const unitsApi = createApi({
  reducerPath: 'unitsApi', 
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getUnits: builder.query({
      query: () => 'units', 
    }),
  }),
});

export const { useGetUnitsQuery } = unitsApi;
