import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateCategory } from './CategoryModel'; // Import the category model
import { BASE_URL } from '../../constant';
 
export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/category` }), // Set base URL for the API
  endpoints: (builder) => ({
    // Mutation for creating a category
    createCategory: builder.mutation<void, CreateCategory>({
      query: (category) => ({
        url: ``,
        method: 'POST',
        body: category,
      }),
    }),
 
    // Query for fetching all categories
    getCategories: builder.query<CreateCategory[], void>({
      query: () => ({
        url: ``,
        method: 'GET',
      }),
    }),
 
    // Mutation for updating a category
    updateCategory: builder.mutation<void, { id: string; category: CreateCategory }>({
      query: ({ id, category }) => ({
        url: `/${id}`, // Assuming the category ID is passed in the URL
        method: 'PUT',
        body: category,
      }),
    }),
 
    // Mutation for deleting a category
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`, // Assuming the category ID is passed in the URL
        method: 'DELETE',
      }),
    }),
  }),
});
 
// Export the hooks for the endpoints
export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;