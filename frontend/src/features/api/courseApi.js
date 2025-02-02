import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_URL="http://localhost:8080/api/course/"

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_URL,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (inputData) => ({
                url: "create",
                method: "POST",
                body: inputData,
            }),
        })
    })

})

export const {useCreateCourseMutation} = courseApi;