"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { admin } from "../actions/admin";
import { Container } from "postcss";

const initialState = {

    isHomeBannerLoading: false,
    isHomeBannerLoaded: false,
    isHomeBannerLoadError: false,
    homebanners: [],

    isHomeBannerUpdating: false,
    isHomeBannerUpdated: false,
    isHomeBannerUpdateError: false
}


// update banner
export const updateBanner = createAsyncThunk('updateBanner', async ({ data, id }, thunkAPI) => {
    try {
        const response = await admin.updateBanner({data, id}); 
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// listBanner
export const listBanner = createAsyncThunk('listBanner', async ({}, thunkAPI) => {
    try {
        const response = await admin.listBanner(); 
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})





const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // Update Banner
            .addCase(updateBanner.pending, (state) => {

                state.isHomeBannerUpdating = true;
                state.isHomeBannerUpdated = false;
                state.isHomeBannerUpdateError = false;
            })

            .addCase(updateBanner.fulfilled, (state, action) => {

                state.isHomeBannerUpdating = false;
                state.isHomeBannerUpdated = true;
                state.isHomeBannerUpdateError = false;

            })

            .addCase(updateBanner.rejected, (state, action) => {

                state.isHomeBannerLoading = false;
                state.isHomeBannerUpdated = false;
                state.isHomeBannerUpdateError = true;

            })


            // List Banner
            .addCase(listBanner.pending, (state) => {

                state.isHomeBannerLoading = true;
                state.isHomeBannerLoaded = false;
                state.isHomeBannerLoadError = false;
            })

            .addCase(listBanner.fulfilled, (state, action) => {

                state.isHomeBannerLoading    = false;
                state.isHomeBannerLoaded     = true;
                state.isHomeBannerLoadError  = false;
                state.homebanners            = action.payload; 


            })

            .addCase(listBanner.rejected, (state, action) => {

                state.isHomeBannerLoading = false;
                state.isHomeBannerLoaded = false;
                state.isHomeBannerLoadError = true;

            })

    }
})

export default adminSlice.reducer