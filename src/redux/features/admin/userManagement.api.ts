import { baseApi } from "../../api/baseApi";


const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getStudents : builder.query({
            query : () => ({
                url : '',
                method : 'GET'
            }),
        }),

        addStudent : builder.mutation({
            query : (data) => ({
                url : '/users/create-student',
                method : 'POST',
                body : data,
            })
        })
    }),
});


export const {
    useGetStudentsQuery,
    useAddStudentMutation,
} = userManagementApi;