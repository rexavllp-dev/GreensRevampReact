"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bulk } from "../actions/bulk";

const initialState = {
    isBulkDiscountCreating:false,
    isBulkDiscountCreated:false,
    isBulkDiscountCreateError:false,

    isBulkDiscountUpdating:false,
    isBulkDiscountUpdated:false,
    isBulkDiscountUpdateError:false,

    isBulkDiscountByProductLoading:false,
    isBulkDiscountByProductLoaded:false,
    isBulkDiscountByProductLoadError:false,
    bulkDiscountData: [],

    isBulkDiscountDeleting:false,
    isBulkDiscountDeleted:false,
    isBulkDiscountDeleteError:false
}

// Create bulk discount
export const createBulkDiscount = createAsyncThunk('createBulkDiscount', async ({data }, thunkAPI) => {
    try {
        const response = await bulk.createBulkDiscount(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Update bulk discount
export const updateBulkDiscount = createAsyncThunk('updateBulkDiscount', async ({data, id }, thunkAPI) => {
    try {
        const response = await bulk.updateBulkDiscount(data, id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Get bulk discount by product id
export const getBulkDiscountByProduct = createAsyncThunk('getBulkDiscountByProduct', async ({ id}, thunkAPI) => {
    try {
        const response = await bulk.getBulkDiscountByProduct(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Delete bulk discout
export const deleteBulkDiscount = createAsyncThunk('deleteBulkDiscount', async ({ id}, thunkAPI) => {
    try {
        const response = await bulk.deleteBulkDiscount(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const bulkSlice = createSlice({
    name: "bulk",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder

            // Create bulk discount
            .addCase(createBulkDiscount.pending, (state) => {
                state.isBulkDiscountCreating = true;
                state.isBulkDiscountCreated = false;
                state.isBulkDiscountCreateError = false;
            })
            .addCase(createBulkDiscount.fulfilled, (state, action) => {
                state.isBulkDiscountCreating = false;
                state.isBulkDiscountCreated = true;
                state.isBulkDiscountCreateError = false;
            })
            .addCase(createBulkDiscount.rejected, (state, action) => {
                state.isBulkDiscountCreating = false;
                state.isBulkDiscountCreated = false;
                state.isBulkDiscountCreateError = true;
            })
            // Update bulk discount
            .addCase(updateBulkDiscount.pending, (state) => {
                state.isBulkDiscountUpdating = true;
                state.isBulkDiscountUpdated = false;
                state.isBulkDiscountUpdateError = false;
            })
            .addCase(updateBulkDiscount.fulfilled, (state, action) => {
                state.isBulkDiscountUpdating = false;
                state.isBulkDiscountUpdated = true;
                state.isBulkDiscountUpdateError = false;
            })
            .addCase(updateBulkDiscount.rejected, (state, action) => {
                state.isBulkDiscountUpdating = false;
                state.isBulkDiscountUpdated = false;
                state.isBulkDiscountUpdateError = true;
            })

            // Get all bulk discount by product id
            .addCase(getBulkDiscountByProduct.pending, (state) => {
                state.isBulkDiscountByProductLoading = true;
                state.isBulkDiscountByProductLoaded = false;
                state.isBulkDiscountByProductLoadError = false;
            })
            .addCase(getBulkDiscountByProduct.fulfilled, (state, action) => {
                state.isBulkDiscountByProductLoading = false;
                state.isBulkDiscountByProductLoaded = true;
                state.isBulkDiscountByProductLoadError = false;
                state.bulkDiscountData = action.payload;
            })
            .addCase(getBulkDiscountByProduct.rejected, (state, action) => {
                state.isBulkDiscountByProductLoading = false;
                state.isBulkDiscountByProductLoaded = false;
                state.isBulkDiscountByProductLoadError = true;
            })
            // Delete Bulk discount
            .addCase(deleteBulkDiscount.pending, (state) => {
                state.isBulkDiscountDeleting = true;
                state.isBulkDiscountDeleted = false;
                state.isBulkDiscountDeleteError = false;
            })
            .addCase(deleteBulkDiscount.fulfilled, (state, action) => {
                state.isBulkDiscountDeleting = false;
                state.isBulkDiscountDeleted = true;
                state.isBulkDiscountDeleteError = false;
            })
            .addCase(deleteBulkDiscount.rejected, (state, action) => {
                state.isBulkDiscountDeleting = false;
                state.isBulkDiscountDeleted = false;
                state.isBulkDiscountDeleteError = true;
            })
    }
})

export default bulkSlice.reducer