import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_URL="http://localhost:8080/api/course"

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_URL,
        credentials: "include",
    }),
    tagTypes: ["Course", "Lecture"],  // Define the tag type

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
        }),

        editCourse: builder.mutation({
            query: ({formData, courseId}) => ({
                url: `edit/${courseId}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Course"]
        }),

        getCourseById: builder.query({
            query: (courseId) => ({
                url: `${courseId}`,
                method: "GET",
            })
        }),

        getPublishedCourse: builder.query({
            query: () => ({
                url: "published-course",
                method: "GET",
            }),
        }),

        getPublishedCourseById: builder.query({
            query: (courseId) => ({
                url: `published-course/${courseId}`,
                method: "GET",
            }),
        }),

        createLecture: builder.mutation({
            query: ({courseId, lectureTitle}) => ({
                url: `${courseId}/lecture`,
                method: "POST",
                body: {lectureTitle},
            })
        }),

        getCourseLectures: builder.query({
            query: (courseId) => ({
                url: `${courseId}/lecture`,
                method: "GET",
            }),
            providesTags: ["Lecture"]
        }),

        editLecture: builder.mutation({
            query: ({courseId, lectureId, lectureTitle, videoInfo, isPreviewFree}) => ({
                url: `${courseId}/lecture/${lectureId}`,
                method: "PUT",
                body: {lectureTitle, videoInfo, isPreviewFree},
            }),
            invalidatesTags: ["Lecture"]
        }),

        removeLecture: builder.mutation({
            query: ({lectureId}) => ({
                url: `lecture/${lectureId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Lecture"]
        }),

        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `lecture/${lectureId}`,
                method: "GET",
            })
        }),

        publishOrUnpublishCourse: builder.mutation({
            query: ({courseId, publish}) => ({
                url: `${courseId}?publish=${publish}`,
                method: "PUT",
            }),
            invalidatesTags: ["Course"]
        }),

        removeCourse: builder.mutation({
            query: ({ courseId }) => ({
                url: `${courseId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Course"],
        }),
    })
})


export const {useCreateCourseMutation, useGetCourseQuery, useEditCourseMutation, useGetCourseByIdQuery, useCreateLectureMutation, useGetCourseLecturesQuery, useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation, usePublishOrUnpublishCourseMutation, useRemoveCourseMutation, useGetPublishedCourseQuery, useGetPublishedCourseByIdQuery} = courseApi;