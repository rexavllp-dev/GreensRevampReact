"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { menus } from "../actions/menus";

const initialState = {

    isAllMenusLoading: false,
    isAllMenusLoaded: false,
    isAllMenusLoadError: false,
    allMenus: [],

    isSingleMenuLoading: false,
    isSingleMenuLoaded: false,
    isSingleMenuLoadError: false,
    singleMenu: {},
    isCreateMenuLoading: false,
    isCreateMenuLoaded: false,
    isCreateMenuError: false,
    isUpdateMenuLoading: false,
    isUpdateMenuLoaded: false,
    isUpdateMenuError: false,
    isUploadImageLoading: false,
    isUploadImageLoaded: false,
    isUploadImageError: false,

    isMenuSeoCreating: false,
    isMenuSeoCreated: false,
    isMenuSeoCreateError: false,

    isMenuSeoUpdating: false,
    isMenuSeoUpdated: false,
    isMenuSeoUpdateError: false
}

export const getAllMenus = createAsyncThunk('getAllMenus', async ({}, thunkAPI) => {

    try {

        const response = await menus.getAllMenus();
        return thunkAPI.fulfillWithValue(response.data);

    } catch (error) {
        // throw error
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getSingleMenu = createAsyncThunk('getSingleMenu', async ({ id }, thunkAPI) => {
    try {
        const response = await menus.getSingleMenu(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createMenu = createAsyncThunk('createMenu', async ({ data }, thunkAPI) => {
    try {
        const response = await menus.createMenu(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateMenu = createAsyncThunk('updateMenu', async ({ data, id }, thunkAPI) => {
    try {
        const response = await menus.updateMenu({ data, id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const uploadMenuImage = createAsyncThunk('uploadMenuImage', async ({ data, id }, thunkAPI) => {
    try {
        const response = await menus.uploadMenuImage(data, id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createMenuSeo = createAsyncThunk('createMenuSeo', async ({ data }, thunkAPI) => {
    try {
        const response = await menus.createMenuSeo({data});
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateMenuSeo = createAsyncThunk('updateMenuSeo', async ({ data, id }, thunkAPI) => {
    try {
        const response = await menus.updateMenuSeo(data, id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const brandSlice = createSlice({
    name: "menus",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // Get all menus
            .addCase(getAllMenus.pending, (state, action) => {
                state.isAllMenusLoading = true;
                state.isAllMenusLoaded = false;
                state.isAllMenusLoadError = false;
            })
            .addCase(getAllMenus.fulfilled, (state, action) => {
                state.isAllMenusLoading = false;
                state.isAllMenusLoaded = true;
                state.isAllMenusLoadError = false;
                state.allMenus = action.payload.result;
            })
            .addCase(getAllMenus.rejected, (state, action) => {
                state.isAllMenusLoading = false;
                state.isAllMenusLoaded = false;
                state.isAllMenusLoadError = true;
            })

            // Get Single Menu
            .addCase(getSingleMenu.pending, (state, action) => {
                state.isSingleMenuLoading = true;
                state.isSingleMenuLoaded = false;
                state.isSingleMenuLoadError = false;
            })
            .addCase(getSingleMenu.fulfilled, (state, action) => {
                state.isSingleMenuLoading = false;
                state.isSingleMenuLoaded = true;
                state.isSingleMenuLoadError = false;
                state.singleMenu = action.payload;
            })
            .addCase(getSingleMenu.rejected, (state, action) => {
                state.isSingleMenuLoading = false;
                state.isSingleMenuLoaded = false;
                state.isSingleMenuLoadError = true;
            })

            // Create brand
            .addCase(createMenu.pending, (state, action) => {
                state.isCreateMenuLoading = true;
                state.isCreateMenuLoaded = false;
                state.isCreateMenuError = false;
            })
            .addCase(createMenu.fulfilled, (state, action) => {
                state.isCreateMenuLoading = false;
                state.isCreateMenuLoaded = true;
                state.isCreateMenuError = false;
            })
            .addCase(createMenu.rejected, (state, action) => {
                state.isCreateMenuLoading = false;
                state.isCreateMenuLoaded = false;
                state.isCreateMenuError = true;
            })

            // Update brand
            .addCase(updateMenu.pending, (state, action) => {
                state.isUpdateMenuLoading = true;
                state.isUpdateMenuLoaded = false;
                state.isUpdateMenuError = false;
            })
            .addCase(updateMenu.fulfilled, (state, action) => {
                state.isUpdateMenuLoading = false;
                state.isUpdateMenuLoaded = true;
                state.isUpdateMenuError = false;
            })
            .addCase(updateMenu.rejected, (state, action) => {
                state.isUpdateMenuLoading = false;
                state.isUpdateMenuLoaded = false;
                state.isUpdateMenuError = true;
            })

            // Upload brand image
            .addCase(uploadMenuImage.pending, (state, action) => {
                state.isUploadImageLoading = true;
                state.isUploadImageLoaded = false;
                state.isUploadImageError = false;
            })
            .addCase(uploadMenuImage.fulfilled, (state, action) => {
                state.isUploadImageLoading = false;
                state.isUploadImageLoaded = true;
                state.isUploadImageError = false;
            })
            .addCase(uploadMenuImage.rejected, (state, action) => {
                state.isUploadImageLoading = false;
                state.isUploadImageLoaded = false;
                state.isUploadImageError = true;
            })

            .addCase(createMenuSeo.pending, (state, action) => {
                state.isMenuSeoCreating = true;
                state.isMenuSeoCreated = false;
                state.isMenuSeoCreateError = false;
            })
            .addCase(createMenuSeo.fulfilled, (state, action) => {
                state.isMenuSeoCreating = false;
                state.isMenuSeoCreated = true;
                state.isMenuSeoCreateError = false;
            })
            .addCase(createMenuSeo.rejected, (state, action) => {
                state.isMenuSeoCreating = false;
                state.isMenuSeoCreated = false;
                state.isMenuSeoCreateError = true;
            })

            .addCase(updateMenuSeo.pending, (state, action) => {
                state.isMenuSeoUpdating = true;
                state.isMenuSeoUpdated = false;
                state.isMenuSeoUpdateError = false;
            })
            .addCase(updateMenuSeo.fulfilled, (state, action) => {
                state.isMenuSeoUpdating = false;
                state.isMenuSeoUpdated = true;
                state.isMenuSeoUpdateError = false;
            })
            .addCase(updateMenuSeo.rejected, (state, action) => {
                state.isMenuSeoUpdating = false;
                state.isMenuSeoUpdated = false;
                state.isMenuSeoUpdateError = true;
            })
    }
})

export default brandSlice.reducer