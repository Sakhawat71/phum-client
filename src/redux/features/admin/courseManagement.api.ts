import { baseApi } from "../../api/baseApi";


const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        getRegisterSemester: builder.query({
            query: () => ({
                url: '/semester-registrations',
                method: 'GET'
            }),
            providesTags : ['semester']
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
            invalidatesTags : ['semester']
        }),

        // courses
        getCourses : builder.query({
            query : () => ({
                url : '/courses',
                method : 'GET',
            })
        })

    })
});

export const {
    useGetRegisterSemesterQuery,
    useAddRegisterSemesterMutation,
    useUpdateRegisterSemesterMutation,
    useGetCoursesQuery,
} = courseManagementApi;