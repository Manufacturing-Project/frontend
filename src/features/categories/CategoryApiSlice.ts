import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateCategory } from './CategoryModel'; // Import the category model

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/category' }), // Set base URL for the API
  endpoints: (builder) => ({
    // Mutation for creating a category
    createCategory: builder.mutation<void, CreateCategory>({
      query: (category) => ({
        url: `/`,
        method: 'POST',
        body: category,
      }),
    }),

    // Query for fetching all categories
    getCategories: builder.query<CreateCategory[], void>({
      query: () => ( {
        url: `/`,
        method: 'GET',
      }),
    }),
  }),
});

// Export the hooks for the endpoints
export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} = categoriesApi;
