import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateUnit } from './UnitModel'; // Import the unit model

export const unitsApi = createApi({
  reducerPath: 'unitsApi', 
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/units' }),  // Set base URL for the API
  endpoints: (builder) => ({
    // Mutation for creating a unit
    createUnit: builder.mutation<void, CreateUnit>({
      query: (unit) => ({
        url: `/`,
        method: 'POST',
        body: unit,
      }),
    }),

    // Mutation for updating a unit
    updateUnit: builder.mutation<void, { id: string; unit: CreateUnit }>({
      query: ({ id, unit }) => ({
        url: `/${id}`,
        method: 'PUT',  // or 'PUT' depending on your API
        body: unit,
      }),
    }),

    // Mutation for deleting a unit
    deleteUnit: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),

    // Query for fetching all units
    getUnits: builder.query<CreateUnit[], void>({
      query: () => `/`,
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
