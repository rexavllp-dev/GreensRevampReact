"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { brands } from "../actions/brands";

const initialState = {
    isAllBrandsLoading: false,
    isAllBrandsLoaded: false,
    isAllBrandsLoadError: false,
    allBrands: [],
    isSingleBrandLoading:false,
    isSingleBrandLoaded:false,
    isSingleBrandLoadError:false,
    singleBrand: {},
    isCreateBrandLoading: false,
    isCreateBrandLoaded: false,
    isCreateBrandError: false,
    isUpdateBrandLoading: false,
    isUpdateBrandLoaded: false,
    isUpdateBrandError: false,
    isUploadImageLoading: false,
    isUploadImageLoaded: false,
    isUploadImageError: false,
}

export const getAllBrands = createAsyncThunk('getAllBrands', async (data, thunkAPI) => {
    try {
        const response = await brands.getAllBrands();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getSingleBrand = createAsyncThunk('getSingleBrand', async ({ id }, thunkAPI) => {
    try {
        const response = await brands.getSingleBrand(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createBrand = createAsyncThunk('createBrand', async ({ data }, thunkAPI) => {
    try {
        const response = await brands.createBrand(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateBrand = createAsyncThunk('updateBrand', async (data, thunkAPI) => {
    try {
        const response = await brands.updateBrand();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const uploadBrandImage = createAsyncThunk('uploadBrandImage', async ({ data, id }, thunkAPI) => {
    try {
        const response = await brands.uploadBrandImage(data, id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // Get all brands
            .addCase(getAllBrands.pending, (state, action) => {
                state.isAllBrandsLoading = true;
                state.isAllBrandsLoaded = false;
                state.isAllBrandsLoadError = false;
            })
            .addCase(getAllBrands.fulfilled, (state, action) => {
                state.isAllBrandsLoading = false;
                state.isAllBrandsLoaded = true;
                state.isAllBrandsLoadError = false;
                state.allBrands = action.payload;
            })
            .addCase(getAllBrands.rejected, (state, action) => {
                state.isAllBrandsLoading = false;
                state.isAllBrandsLoaded = false;
                state.isAllBrandsLoadError = true;
            })

            // Get Single Brand
            .addCase(getSingleBrand.pending, (state, action) => {
                state.isSingleBrandLoading = true;
                state.isSingleBrandLoaded = false;
                state.isSingleBrandLoadError = false;
            })
            .addCase(getSingleBrand.fulfilled, (state, action) => {
                state.isSingleBrandLoading = false;
                state.isSingleBrandLoaded = true;
                state.isSingleBrandLoadError = false;
                state.singleBrand = action.payload;
            })
            .addCase(getSingleBrand.rejected, (state, action) => {
                state.isSingleBrandLoading = false;
                state.isSingleBrandLoaded = false;
                state.isSingleBrandLoadError = true;
            })

            // Create brand
            .addCase(createBrand.pending, (state, action) => {
                state.isCreateBrandLoading = true;
                state.isCreateBrandLoaded = false;
                state.isCreateBrandError = false;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.isCreateBrandLoading = false;
                state.isCreateBrandLoaded = true;
                state.isCreateBrandError = false;
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.isCreateBrandLoading = false;
                state.isCreateBrandLoaded = false;
                state.isCreateBrandError = true;
            })

            // Update brand
            .addCase(updateBrand.pending, (state, action) => {
                state.isUpdateBrandLoading = true;
                state.isUpdateBrandLoaded = false;
                state.isUpdateBrandError = false;
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.isUpdateBrandLoading = false;
                state.isUpdateBrandLoaded = true;
                state.isUpdateBrandError = false;
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.isUpdateBrandLoading = false;
                state.isUpdateBrandLoaded = false;
                state.isUpdateBrandError = true;
            })

            // Upload brand image
            .addCase(uploadBrandImage.pending, (state, action) => {
                state.isUploadImageLoading = true;
                state.isUploadImageLoaded = false;
                state.isUploadImageError = false;
            })
            .addCase(uploadBrandImage.fulfilled, (state, action) => {
                state.isUploadImageLoading = false;
                state.isUploadImageLoaded = true;
                state.isUploadImageError = false;
            })
            .addCase(uploadBrandImage.rejected, (state, action) => {
                state.isUploadImageLoading = false;
                state.isUploadImageLoaded = false;
                state.isUploadImageError = true;
            });
    }
})

export default brandSlice.reducer