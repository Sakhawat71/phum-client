import { baseApi } from "../../api/baseApi";


const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getStudents: builder.query({
            query: (params) => ({
                url: '/students',
                method: 'GET',
                params
            }),
        }),

        getStudentById: builder.query({
            query: (studentId) => ({
                url: `/students/${studentId}`,
                method: "GET",
            }),
        }),

        addStudent: builder.mutation({
            query: (data) => ({
                url: '/users/create-student',
                method: 'POST',
                body: data,
            })
        }),

        updateStudent: builder.mutation({
            query: ({ studentId, updatedData }) => ({
                url: `/students/${studentId}`,
                method: "PATCH",
                body: updatedData,
            }),
        }),

    }),
});


export const {
    useGetStudentsQuery,
    useAddStudentMutation,
    useGetStudentByIdQuery,
    useUpdateStudentMutation,
} = userManagementApi;