import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
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
    let resut = await baseQuery(args,api,extraOptions);
    if(resut.error?.status === 401){

        const res = await fetch('/auth/refresh-token', {
            method : 'POST',
            credentials : 'include'
        });

        const data = await res.json();
        const user = (api.getState() as RootState).auth.user;

        api.dispatch(
            setUser({
                user,
                token : data.data.accessToken
            })
        );
        resut = await baseQuery(args, api, extraOptions);
    };
    return resut;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: BaseQueryWithRefreshToken,
    endpoints: () => ({})
});