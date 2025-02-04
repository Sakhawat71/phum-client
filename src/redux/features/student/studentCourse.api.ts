import { TResponseRedux } from "../../../types";
import { IOfferedCourseForStudents } from "../../../types/student.type";
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
            transformResponse: (response: TResponseRedux<IOfferedCourseForStudents[]>) => {
                return {
                    data: response?.data?.result,
                    meta: response?.data?.meta,
                }
            },
            providesTags: ['offeredCourses']
        }),

        enrollCourse: builder.mutation({
            query: (data) => ({
                url: '/enrolled-courses/create-enrolled-course',
                method: 'POST',
                body : data,
            }),
            invalidatesTags: ['offeredCourses']
        }),

        getEnrolledCourses : builder.query({
            query: () => {
                const params = new URLSearchParams();
                return {
                    url: '/enrolled-courses/my-enrolled-courses',
                    method: 'GET',
                    params: params,
                };
            },
            // transformResponse: (response: TResponseRedux<IOfferedCourseForStudents[]>) => {
            //     return {
            //         data: response?.data?.result,
            //         meta: response?.data?.meta,
            //     }
            // },
        }),


    })
});

export const {
    useGetAllOfferedCoursesQuery,
    useEnrollCourseMutation,
    useGetEnrolledCoursesQuery,
} = studentCourseApi;