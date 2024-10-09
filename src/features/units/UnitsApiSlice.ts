// src/features/units/UnitsApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateUnit } from './UnitModel'; // Ensure this model is defined correctly
import { BASE_URL } from '../../constant';

export const unitsApi = createApi({
  reducerPath: 'unitsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/units` }),  // Set base URL for the API
  endpoints: (builder) => ({
    // Mutation for creating a unit
    createUnit: builder.mutation<void, CreateUnit>({
      query: (unit) => ({
        url: '',  // This should be empty since the base URL already includes '/units'
        method: 'POST',
        body: unit,
      }),
    }),

    // Mutation for updating a unit
    updateUnit: builder.mutation<void, { id: string; unit: CreateUnit }>({
      query: ({ id, unit }) => ({
        url: `/${id}`,  // Correctly adds the unit ID to the URL
        method: 'PUT',  // Use PUT for updates
        body: unit,
      }),
    }),

    // Mutation for deleting a unit
    deleteUnit: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,  // Correctly adds the unit ID to the URL
        method: 'DELETE',
      }),
    }),

    // Query for fetching all units
    getUnits: builder.query<CreateUnit[], void>({
      query: () => ({
        url: '/',  // Fetch all units
        method: 'GET',
      }),
    }),
  }),
});

// Export the hooks for the endpoints
export const {
  useCreateUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
  useGetUnitsQuery,
} = unitsApi;
