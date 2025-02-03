import { baseApi } from "../../api/baseApi";


const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getRegisterSemester: builder.query({
            query: () => ({
                url: '/semester-registrations',
                method: 'GET'
            }),
            providesTags: ['semester']
        }),

        addRegisterSemester: builder.mutation({
            query: (data) => ({
                url: '/semester-registrations/create-semester-registration',
                method: 'POST',
                body: data,
            })
        }),

        updateRegisterSemester: builder.mutation({
            query: ({ id, update }) => ({
                url: `/semester-registrations/${id}`,
                method: 'PATCH',
                body: update,
            }),
            invalidatesTags: ['semester']
        }),

        // courses
        getCourses: builder.query({
            query: () => ({
                url: '/courses',
                method: 'GET',
            }),
        }),

        addCourse: builder.mutation({
            query: (data) => ({
                url: '/courses/create-course',
                method: 'POST',
                body: data,
            })
        }),

        getAssignFaculties: builder.query({
            query : ({course : courseId}) =>  ({
                url: `/courses/${courseId}/get-faculties`,
                method : 'GET',
            }),
        }),

        assignFaculty: builder.mutation({
            query: ({ courseId, data }) => ({
                url: `/courses/${courseId}/assign-faculties`,
                method: 'PUT',
                body: data,
            }),
        }),

        getOfferedCourses : builder.query({
            query : () => ({
                url : '/offered-courses',
                method : 'GET'
            })
        }),

        createOfferedCourse : builder.mutation({
            query : (data) => ({
                url : '/offered-courses/create-offered-courses',
                method : 'POST',
                body : data
            })
        }) 

    })
});

export const {
    useGetRegisterSemesterQuery,
    useAddRegisterSemesterMutation,
    useUpdateRegisterSemesterMutation,
    useGetCoursesQuery,
    useAddCourseMutation,
    useGetAssignFacultiesQuery,
    useAssignFacultyMutation,
    useGetOfferedCoursesQuery,
    useCreateOfferedCourseMutation,

} = courseManagementApi;