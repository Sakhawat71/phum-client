import { TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";


const studentCourseApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        getAllOfferedCourses: builder.query({
            query: () => {

                const params = new URLSearchParams();

                return {
                    url: '/offered-courses/my-offered-courses',
                    method: 'GET',
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.mete,
                }
            }
        }),


    })
});

export const {
    useGetAllOfferedCoursesQuery,
} = studentCourseApi;