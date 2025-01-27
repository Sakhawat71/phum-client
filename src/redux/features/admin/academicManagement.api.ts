import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        
        GetAllSemesters : builder.query({
            query : () => ({
                url : '/academic-semester',
                method : 'GET'
            }),
        }),

        createAcademicSemester : builder.mutation({
            query : () => ({
                url : '/academic-semester/create-academic-semester',
                method : 'POST'
            }),
        }),


    }),
});

export const {useGetAllSemestersQuery} = academicManagementApi;