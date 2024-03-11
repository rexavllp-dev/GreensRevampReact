"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { activity } from "../actions/activity";

const initialState = {

    isActivityLogLoading: false,
    isActivityLogLoaded: false,
    isActivityLogLoadError: false,
    activityLog: [],
}

// Get Activity log
export const getActivityLog = createAsyncThunk('getActivityLog', async ({ }, thunkAPI) => {
    try {
        const response = await activity.getActivityLog();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const activiySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder

            // Get activity log
            .addCase(getActivityLog.pending, (state) => {
                state.isActivityLogLoading = true;
                state.isActivityLogLoaded = false;
                state.isActivityLogLoadError = false;
            })
            .addCase(getActivityLog.fulfilled, (state, action) => {
                state.isActivityLogLoading = false;
                state.isActivityLogLoaded = true;
                state.isActivityLogLoadError = false;
                state.wishlistProducts = action.payload;
            })
            .addCase(getActivityLog.rejected, (state, action) => {
                state.isActivityLogLoading = false;
                state.isActivityLogLoaded = false;
                state.isActivityLogLoadError = true;
            })
    }
})

export default activiySlice.reducer