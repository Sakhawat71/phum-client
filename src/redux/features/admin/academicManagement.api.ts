import { TAcademicFaculty, TAcademicSemester, TResponseRedux } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        GetAllSemesters: builder.query({
            query: () => ({
                url: '/academic-semester',
                method: 'GET'
            }),
            transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
                return {
                    data: response.data,
                    meta: response.mete,
                };
            },
        }),

        addAcademicSemester: builder.mutation({
            query: (data) => ({
                url: '/academic-semester/create-academic-semester',
                method: 'POST',
                body: data,
            }),
        }),

        getAcademicFaculties: builder.query({
            query: () => ({
                url: '/academic-faculties',
                method: 'GET'
            }),
            transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
                return {
                    data: response.data,
                    meta: response.mete,
                }
            },
        }),
        
        addAcademicFaculty : builder.mutation({
            query: (data) => ({
                url : '/academic-faculties/create-academic-faculty',
                method: 'POST',
                body : data,
            }),
        }),

    }),
});

export const {
    useGetAllSemestersQuery,
    useAddAcademicSemesterMutation,
    useGetAcademicFacultiesQuery,
    useAddAcademicFacultyMutation,

} = academicManagementApi;