import { createSlice } from "@reduxjs/toolkit";

type authState = {
    user: null | object;
    token: null | string;
};


const initialState: authState = {
    user: null,
    token: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
        },
    },
});


export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;