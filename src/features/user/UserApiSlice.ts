import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserRegistrationRequest, UserResponse } from '../user/UserModel';
import { BASE_URL } from '../../constant';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/auth` }),
  endpoints: (builder) => ({
    // User registration API
    signup: builder.mutation<UserResponse, UserRegistrationRequest>({
      query: (user) => ({
        url: '/signup',
        method: 'POST',
        body: user,
      }),
    }),

    // Authentication API (Login)
    login: builder.mutation<{ email: string; username: string; token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = userApi;
export default userApi;
