"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reviews } from "../actions/reviews";

const initialState = {

    isAllReviewsByProductLoading: false,
    isAllReviewsByProductLoaded: false,
    isAllReviewsByProductLoadError: false,
    allReviewsByProduct: [],

    isCreateReviewLoading: false,
    isCreateReviewLoaded: false,
    isCreateReviewError: false,

    isAllReviewsByUserLoading: false,
    isAllReviewsByUserLoaded: false,
    isAllReviewsByUserLoadError: false,
    allReviewsByUser: [],
}

// Get all reivews by product id
export const getAllReviewsByProductId = createAsyncThunk('getAllReviewsByProductId', async ({ id }, thunkAPI) => {
    try {
        const response = await reviews.getAllReviewsByProductId({ id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Create new review
export const createReview = createAsyncThunk('createReview', async ({ data }, thunkAPI) => {
    try {
        const response = await reviews.createReview({ data });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get all review s by user
export const getAllReviewsByUser = createAsyncThunk('getAllReviewsByUser', async ({  }, thunkAPI) => {
    try {
        const response = await reviews.getAllReviewsByUser();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder

            .addCase(getAllReviewsByProductId.pending, (state) => {
                state.isAllReviewsByProductLoading = true;
                state.isAllReviewsByProductLoaded = false;
                state.isAllReviewsByProductLoadError = false;
            })
            .addCase(getAllReviewsByProductId.fulfilled, (state, action) => {
                state.isAllReviewsByProductLoading = false;
                state.isAllReviewsByProductLoaded = true;
                state.isAllReviewsByProductLoadError = false;
                state.allReviewsByProduct = action.payload;
            })
            .addCase(getAllReviewsByProductId.rejected, (state, action) => {
                state.isAllReviewsByProductLoading = false;
                state.isAllReviewsByProductLoaded = false;
                state.isAllReviewsByProductLoadError = true;
            })

            .addCase(createReview.pending, (state) => {
                state.isCreateReviewLoading = true;
                state.isCreateReviewLoaded = false;
                state.isCreateReviewError = false;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.isCreateReviewLoading = false;
                state.isCreateReviewLoaded = true;
                state.isCreateReviewError = false;
            })
            .addCase(createReview.rejected, (state, action) => {
                state.isCreateReviewLoading = false;
                state.isCreateReviewLoaded = false;
                state.isCreateReviewError = true;
            })

            .addCase(getAllReviewsByUser.pending, (state) => {
                state.isAllReviewsByUserLoading = true;
                state.isAllReviewsByUserLoaded = false;
                state.isAllReviewsByUserLoadError = false;
            })
            .addCase(getAllReviewsByUser.fulfilled, (state, action) => {
                state.isAllReviewsByUserLoading = false;
                state.isAllReviewsByUserLoaded = true;
                state.isAllReviewsByUserLoadError = false;
                state.allReviewsByUser = action.payload;
            })
            .addCase(getAllReviewsByUser.rejected, (state, action) => {
                state.isAllReviewsByUserLoading = false;
                state.isAllReviewsByUserLoaded = false;
                state.isAllReviewsByUserLoadError = true;
            })
    }
})

export default reviewSlice.reducer