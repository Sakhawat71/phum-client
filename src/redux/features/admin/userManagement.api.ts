import { TResponseRedux, } from "../../../types";
import { baseApi } from "../../api/baseApi";


const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getStudents: builder.query({
            query: (params) => ({
                url: '/students',
                method: 'GET',
                params
            }),
            // transformResponse: (response: TResponseRedux<any[]>) => {
            //     return {
            //         data: response.data,
            //         meta: response.meta,
            //     };
            // },
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