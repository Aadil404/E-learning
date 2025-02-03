import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_URL="http://localhost:8080/api/course"

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_URL,
        credentials: "include",
    }),
    tagTypes: ["Course"],  // Define the tag type

    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (inputData) => ({
                url: "create",
                method: "POST",
                body: inputData,
            }),
            invalidatesTags: ["Course"]  // Invalidate cache when a new course is created
        }),

        getCourse: builder.query({
            query: () => ({
                url: "",
                method: "GET"
            }),
            providesTags: ["Course"]  // Tag the fetched course data
        })
    })
})


export const {useCreateCourseMutation, useGetCourseQuery} = courseApi;