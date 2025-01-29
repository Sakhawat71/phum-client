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

        addStudent: builder.mutation({
            query: (data) => ({
                url: '/users/create-student',
                method: 'POST',
                body: data,
            })
        })
    }),
});


export const {
    useGetStudentsQuery,
    useAddStudentMutation,
} = userManagementApi;