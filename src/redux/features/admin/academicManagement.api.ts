import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        GetAllSemesters : builder.query({
            query : () => ({
                url : '/academic-semester',
                method : 'GET'
            }),
        }),

        addAcademicSemester : builder.mutation({
            query : (data) => ({
                url : '/academic-semester/create-academic-semester',
                method : 'POST',
                body : data,
            }),
        }),


    }),
});

export const {
    useGetAllSemestersQuery,
    useAddAcademicSemesterMutation,
} = academicManagementApi;