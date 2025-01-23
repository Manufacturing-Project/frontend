import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserRegistrationRequest, UserResponse } from '../user/UserModel';
import { BASE_URL } from '../../constant';

export const userapi = createApi({
  reducerPath: 'userapi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/users`}),
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserResponse, UserRegistrationRequest>({
      query: (user) => ({
        url: '/register',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = userapi;