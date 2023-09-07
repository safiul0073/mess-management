import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../index";
import SliceName from "../../types/SliceName";
import type { AuthStateType } from "../../types/AuthTypes";

const initialState: AuthStateType = {
    user: null,
    token: null,
    isAuth: false,
};

export const authSlice = createSlice({
    name: SliceName.USER_AUTH,
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<AuthStateType>) => {
            const { user, token, isAuth } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuth = isAuth;
        },
        logout: (state, action) => {
            state.token = null;
            state.user = null;
            state.isAuth = false;
        },
    },
});

export const { setAuthData, logout } = authSlice.actions;

export const getCurrentToken = (state: RootState) =>
    state[SliceName.USER_AUTH].token;

export const isAuthenticated = (state: RootState) =>
    state[SliceName.USER_AUTH].isAuth;

export const getCurrentUser = (state: RootState) =>
    state[SliceName.USER_AUTH].user;

export default authSlice.reducer;
