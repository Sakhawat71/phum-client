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

        // admin
        getAdmins: builder.query({
            query: () => ({
                url: '/admins',
                method: 'GET',
            }),
        }),

        addAdmin: builder.mutation({
            query: (data) => ({
                url: '/users/create-admin',
                method: 'POST',
                body: data,
            })
        }),

        // faculty 

        getFaculties: builder.query({
            query: () => ({
                url: '/faculties',
                method: 'GET'
            }),
        }),

        addFacultry: builder.mutation({
            query: (data) => ({
                url: '/users/create-faculty',
                method: 'POST',
                body: data,
            })
        })

    }),
});


export const {
    useGetStudentsQuery,
    useAddStudentMutation,
    useGetStudentByIdQuery,
    useUpdateStudentMutation,
    useGetAdminsQuery,
    useAddAdminMutation,
    useGetFacultiesQuery,
    useAddFacultryMutation,
} = userManagementApi;