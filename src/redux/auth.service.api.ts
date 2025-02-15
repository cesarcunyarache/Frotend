import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: 'auth',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    credentials: "include",
  }),
  tagTypes: ["Authentication"],
  endpoints: (builder) => ({
    postSignIn: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: data,
      }),
    }),
    postSignUp: builder.mutation({
        query: (data) => ({
          url: "/auth/sign-up",
          method: "POST",
          body: data,
        }),
      }),
      
    
    postForgetPassword: builder.mutation({
      query: (data) => ({
        url: "colaboradorAuth/forgetPassword",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    putResetPassword: builder.mutation({
      query: (data) => ({
        url: "colaboradorAuth/resetPassword",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    postSendOTP: builder.mutation({
      query: (data) => ({
        url: "/colaboradorAuth/sendOtp",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    postLogout: builder.mutation({
      query: () => ({
        url: "/clienteAuth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    getProfile: builder.query({
      query: () => "/colaboradorAuth/profile/",
      providesTags: ["Authentication"],
    }),

    getVerify: builder.query({
      query: () => "/clienteAuth/verify",
    }),

    postResendOTP: builder.mutation({
      query: (data) => ({
        url: "/clienteAuth/resendOtp",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

  }),
});


export const {
  usePostSignInMutation,
  usePostSignUpMutation,
  useGetProfileQuery,
  useGetVerifyQuery,
  usePostSendOTPMutation,
  usePostResendOTPMutation,
  usePostForgetPasswordMutation,
  usePutResetPasswordMutation,
  usePostLogoutMutation,
} = authApi;
