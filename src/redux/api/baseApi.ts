import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQeury = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include',
    prepareHeaders(headers, { getState }) {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `${token}`);
        }
        return headers;
    },
});


//{signal, dispatch, getState}
const BaseQueryWithRefreshToken = async(args, api, extraOptions) => {
    const resut = await baseQeury(args,api,extraOptions);
    // console.log(resut);
    if(resut.error?.status === 401){

        const res = await fetch('/auth/refresh-token', {
            method : 'POST',
            credentials : 'include'
        });
        const data = await res.json();
        console.log(data);

    }
}

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: BaseQueryWithRefreshToken,
    endpoints: () => ({})
});