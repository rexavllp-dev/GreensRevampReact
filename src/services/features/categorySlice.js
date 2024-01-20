"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categories } from "../actions/categories";

const initialState = {
    isCategoryTreeLoading: false,
    isCategoryTreeLoaded: false,
    isCategoryTreeLoadError: false,
    categoryTree: [],
}

export const getCategoryTree = createAsyncThunk('getCategoryTree', async (data, thunkAPI) => {
    try {
        const response = await categories.getCategoryTree();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // Get all brands
            .addCase(getCategoryTree.pending, (state, action) => {
                state.isCategoryTreeLoading = true;
                state.isCategoryTreeLoaded = false;
                state.isCategoryTreeLoadError = false;
            })
            .addCase(getCategoryTree.fulfilled, (state, action) => {
                state.isCategoryTreeLoading = false;
                state.isCategoryTreeLoaded = true;
                state.isCategoryTreeLoadError = false;
                state.categoryTree = action.payload;
            })
            .addCase(getCategoryTree.rejected, (state, action) => {
                state.isCategoryTreeLoading = false;
                state.isCategoryTreeLoaded = false;
                state.isCategoryTreeLoadError = true;
            })
    }
})

export default categorySlice.reducer