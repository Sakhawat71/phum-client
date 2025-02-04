import { TAcademicDepartment } from "../../../types/academicManagement.type";
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
                    meta: response.meta,
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
                    meta: response.meta,
                }
            },
        }),

        addAcademicFaculty: builder.mutation({
            query: (data) => ({
                url: '/academic-faculties/create-academic-faculty',
                method: 'POST',
                body: data,
            }),
        }),

        getAcademicDepartment: builder.query({
            query: () => ({
                url: '/academic-department',
                method: 'GET'
            }),
            transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),

        addAcademicDepartment: builder.mutation({
            query: (data) => ({
                url: '/academic-department/create-academic-department',
                method: 'POST',
                body: data,
            }),
        }),

    }),
});

export const {
    useGetAllSemestersQuery,
    useAddAcademicSemesterMutation,
    useGetAcademicFacultiesQuery,
    useAddAcademicFacultyMutation,
    useGetAcademicDepartmentQuery,
    useAddAcademicDepartmentMutation,
} = academicManagementApi;