"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../actions/auth";

const initialState = {
    isUserRegistering: false,
    isUserRegisterd: false,
    isUserRegisterError: false,
    isEmailVerifying: false,
    isEmailVerified: false,
    isEmailVerifyError: false,
    isUserInfoLoading: false,
    isUserInfoLoaded: false,
    isUserInfoError: false,
    userInfo: {},

}

export const login = createAsyncThunk('login', async (data, thunkAPI) => {
    try {
        const response = await auth.login(data)
        // localStorage.setItem('token', response.data.result?.token)
        // localStorage.setItem('user', JSON.stringify(response.data.result?.user))

        Axios.interceptors.request.use((config) => {
            config.headers['Authorization'] = `Bearer ${response.data.result?.token}`;
            return config;
        });

        return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const userRegister = createAsyncThunk('userRegister', async (data, thunkAPI) => {
    try {
        const response = await auth.userRegister(data)
        return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const verifyEmail = createAsyncThunk('verifyEmail', async (data, thunkAPI) => {
    try {
        const response = await auth.verifyEmail(data)
        return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const companyRegister = createAsyncThunk('companyRegister', async (data, thunkAPI) => {
    try {
        const response = await auth.companyRegister(data)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getUserInfo = createAsyncThunk('getUserInfo', async (data, thunkAPI) => {
    try {
        const response = await auth.getUserInfo(data)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(userRegister.pending, (state, action) => {
                state.isUserRegistering = true;
                state.isUserRegisterd = false;
                state.isUserRegisterError = false;
            })

            .addCase(userRegister.fulfilled, (state, action) => {
                state.isUserRegistering = false;
                state.isUserRegisterd = true;
                state.isUserRegisterError = false;
            })

            .addCase(userRegister.rejected, (state, action) => {
                state.isUserRegistering = false;
                state.isUserRegisterd = false;
                state.isUserRegisterError = true;
            })

            .addCase(verifyEmail.pending, (state, action) => {
                state.isEmailVerifying = true;
                state.isEmailVerified = false;
                state.isEmailVerifyError = false;
            })

            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.isEmailVerifying = false;
                state.isEmailVerified = true;
                state.isEmailVerifyError = false;
            })

            .addCase(verifyEmail.rejected, (state, action) => {
                state.isEmailVerifying = false;
                state.isEmailVerified = false;
                state.isEmailVerifyError = true;
            })

            .addCase(getUserInfo.pending, (state, action) => {
                state.isUserInfoLoading = true;
                state.isUserInfoLoaded = false;
                state.isUserInfoError = false;
            })

            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.isUserInfoLoading = false;
                state.isUserInfoLoaded = true;
                state.isUserInfoError = false;
                state.userInfo = action.payload;
            })

            .addCase(getUserInfo.rejected, (state, action) => {
                state.isUserInfoLoading = false;
                state.isUserInfoLoaded = false;
                state.isUserInfoError = true;
            })

    }
})

export default authSlice.reducer