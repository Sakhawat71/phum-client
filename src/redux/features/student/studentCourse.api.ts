import { TResponseRedux } from "../../../types";
import { IOfferedCourse } from "../../../types/student.type";
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
            transformResponse: (response: TResponseRedux<IOfferedCourse[]>) => {
                return {
                    data: response?.data?.result,
                    meta: response?.data?.meta,
                }
            }
        }),


    })
});

export const {
    useGetAllOfferedCoursesQuery,
} = studentCourseApi;