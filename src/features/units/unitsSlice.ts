import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constant';

export const unitsApi = createApi({
  reducerPath: 'unitsApi', 
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/units` }),
  endpoints: (builder) => ({
    getUnits: builder.query({
      query: () => '', 
    }),
  }),
});

export const { useGetUnitsQuery } = unitsApi;
