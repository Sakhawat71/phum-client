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

        updateRegisterSemester: builder.mutation({
            query: ({ id, update }) => {
                console.log(id,update);
                return {
                    url: `/semester-registrations/${id}`,
                    method: 'PATCH',
                    body: update,
                }
            }
        }),




    })
});

export const {
    useGetRegisterSemesterQuery,
    useAddRegisterSemesterMutation,
    useUpdateRegisterSemesterMutation,
} = courseManagementApi;