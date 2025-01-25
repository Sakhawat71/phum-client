import { baseApi } from "../../api/baseApi";

export const acadecmiSemseterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: () => ({
                url: '/academic-semester',
                method: "GET",
            })
        })
    })
});

export const {
    useGetAllSemestersQuery,

} = acadecmiSemseterApi;