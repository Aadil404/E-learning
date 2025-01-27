//authApi.js contains api for login and register using RTK query

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "@/features/authSlice";

const baseUrl = "http://localhost:8080/api/user/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    //send user registration data to backend
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),

    //send user login data to backend
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),

      //this function will be called when user login successfully
      async onQueryStarted({ dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result) dispatch(userLoggedIn({ user: result.data.user })); //calling userLoggedIn function from authSlice
        } catch (error) {
          console.log(
            "Error in loginUser, path:frontend/src/features/app/authApi.js",
            error
          );
        }
      },
    }),

    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
    })
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useLogoutUserQuery
} = authApi;
