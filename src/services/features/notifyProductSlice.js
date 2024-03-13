"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notifyProduct } from "../actions/notifyProduct";

const initialState = {

    isNotifyProductsLoading: false,
    isNotifyProductsLoaded: false,
    isNotifyProductsLoadError: false,
    notifyProducts: [],

    isNotifyProductsAdding: false,
    isNotifyProductsAdded: false,
    isNotifyProductsAddError: false,

    isNotifyProductsRemoving: false,
    isNotifyProductsRemoved: false,
    isNotifyProductsRemoveError: false
}

// Get notify products
export const getNotifiedProducts = createAsyncThunk('getNotifiedProducts', async ({ }, thunkAPI) => {
    try {
        const response = await notifyProduct.getNotifiedProducts();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Add notify products
export const addNotifyProducts = createAsyncThunk('addNotifyProducts', async ({ data }, thunkAPI) => {
    try {
        const response = await notifyProduct.addNotifyProducts(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Delete notify products
export const removeNotifyProducts = createAsyncThunk('removeNotifyProducts', async ({ id }, thunkAPI) => {
    try {
        const response = await notifyProduct.removeNotifyProducts(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


const notifyProductSlice = createSlice({
    name: "notify-product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder

            // Get notified products
            .addCase(getNotifiedProducts.pending, (state) => {
                state.isNotifyProductsLoading = true;
                state.isNotifyProductsLoaded = false;
                state.isNotifyProductsLoadError = false;
            })
            .addCase(getNotifiedProducts.fulfilled, (state, action) => {
                state.isNotifyProductsLoading = false;
                state.isNotifyProductsLoaded = true;
                state.isNotifyProductsLoadError = false;
                state.notifyProducts = action.payload;
            })
            .addCase(getNotifiedProducts.rejected, (state, action) => {
                state.isNotifyProductsLoading = false;
                state.isNotifyProductsLoaded = false;
                state.isNotifyProductsLoadError = true;
            })

            // Add notified products
            .addCase(addNotifyProducts.pending, (state) => {
                state.isNotifyProductsAdding = true;
                state.isNotifyProductsAdded = false;
                state.isNotifyProductsAddError = false;
            })

            .addCase(addNotifyProducts.fulfilled, (state, action) => {
                state.isNotifyProductsAdding = false;
                state.isNotifyProductsAdded = true;
                state.isNotifyProductsAddError = false;
            })

            .addCase(addNotifyProducts.rejected, (state, action) => {
                state.isNotifyProductsAdding = false;
                state.isNotifyProductsAdded = false;
                state.isNotifyProductsAddError = true;
            })

            //remove notify products
            .addCase(removeNotifyProducts.pending, (state, action) => {
                state.isNotifyProductsRemoving = true;
                state.isNotifyProductsRemoved = false;
                state.isNotifyProductsRemoveError = false;
            })
            .addCase(removeNotifyProducts.fulfilled, (state, action) => {
                state.isNotifyProductsRemoving = false;
                state.isNotifyProductsRemoved = true;
                state.isNotifyProductsRemoveError = false;
            })
            .addCase(removeNotifyProducts.rejected, (state, action) => {
                state.isNotifyProductsRemoving = false;
                state.isNotifyProductsRemoved = false;
                state.isNotifyProductsRemoveError = true;
            })


    }
})

export default notifyProductSlice.reducer