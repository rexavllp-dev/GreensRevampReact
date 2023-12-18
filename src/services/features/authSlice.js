"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../actions/auth";

const initialState = {
    data: 'hello world'

}

export const login = createAsyncThunk('login', async (data, thunkAPI) => {
    try {
        const response = await auth.login(data)
        localStorage.setItem('token', response.data.result?.token)
        localStorage.setItem('user', JSON.stringify(response.data.result?.user))

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
        return response.data
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const companyRegister = createAsyncThunk('companyRegister', async (data, thunkAPI) => {
    try {
        const response = await auth.companyRegister(data)
        return response.data
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

    }
})

export default authSlice.reducer