import { baseApi } from "../../api/baseApi";


const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getRegisterSemester: builder.query({
            query: () => ({
                url: '/semester-registrations',
                method: 'GET'
            })
        }),

        addRegisterSemester: builder.mutation({
            query: (data) => ({
                url: '/semester-registrations/create-semester-registration',
                method: 'POST',
                body: data,
            })
        }),




    })
});

export const {
    useGetRegisterSemesterQuery,
    useAddRegisterSemesterMutation,
} = courseManagementApi;