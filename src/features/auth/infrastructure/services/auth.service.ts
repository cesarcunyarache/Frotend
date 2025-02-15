import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { AuthResponse } from '../../domain/models/User';
import { SignInDto, SignUpDto } from '../../domain/dto/AuthDto';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<AuthResponse, SignUpDto>({
      query: (credentials) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: credentials,
      }),
    }),
    signIn: builder.mutation<AuthResponse, SignInDto>({
      query: (credentials) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: credentials,
      }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/sign-out',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
} = authApi;