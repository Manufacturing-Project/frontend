import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constant';

interface AuthResponse {
  email: string;
  username: string;
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: `${BASE_URL}/auths` }),
  endpoints: (builder) => ({
    
    
    signIn: builder.mutation<AuthResponse, { username: string; password: string }>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {  useSignInMutation } = authApi;
