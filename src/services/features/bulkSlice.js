"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bulk } from "../actions/bulk";

const initialState = {
    isBulkDiscountCreating: false,
    isBulkDiscountCreated: false,
    isBulkDiscountCreateError: false,


    isBulkDiscountUpdating: false,
    isBulkDiscountUpdated: false,
    isBulkDiscountUpdateError: false,

    isBulkDiscountByProductLoading: false,
    isBulkDiscountByProductLoaded: false,
    isBulkDiscountByProductLoadError: false,
    bulkDiscountData: [],

    isBulkDiscountDeleting: false,
    isBulkDiscountDeleted: false,
    isBulkDiscountDeleteError: false,

    isBulkRequestCreating: false,
    isBulkRequestCreated: false,
    isBulkRequestCreateError: false,

    isAllBulkRequestsLoading: false,
    isAllBulkRequestsLoaded: false,
    isAllBulkRequestsLoadError: false,
    allBulkRequests: [],

    isBulkRequestUpdating: false,
    isBulkRequestUpdated: false,
    isBulkRequestUpdateError: false,

    isBulkStatusLoading: false,
    isBulkStatusLoaded: false,
    isBulkStatusLoadError: false,
    bulkStatusData: []
}

// Create bulk discount
export const createBulkDiscount = createAsyncThunk('createBulkDiscount', async ({ data }, thunkAPI) => {
    try {
        const response = await bulk.createBulkDiscount(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Update bulk discount
export const updateBulkDiscount = createAsyncThunk('updateBulkDiscount', async ({ data, id }, thunkAPI) => {
    try {
        const response = await bulk.updateBulkDiscount(data, id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Get bulk discount by product id
export const getBulkDiscountByProduct = createAsyncThunk('getBulkDiscountByProduct', async ({ id }, thunkAPI) => {
    try {
        const response = await bulk.getBulkDiscountByProduct(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Delete bulk discout
export const deleteBulkDiscount = createAsyncThunk('deleteBulkDiscount', async ({ id }, thunkAPI) => {
    try {
        const response = await bulk.deleteBulkDiscount(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Create bulk request
export const createBulkRequest = createAsyncThunk('createBulkRequest', async ({ data }, thunkAPI) => {
    try {
        const response = await bulk.createBulkRequest({ data });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Get all Bulk requests
export const getAllBulkRequests = createAsyncThunk('getAllBulkRequests', async ({ }, thunkAPI) => {
    try {
        const response = await bulk.getAllBulkRequests();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Get all Bulk requests
export const updateBulkRequest = createAsyncThunk('updateBulkRequest', async ({ data, id }, thunkAPI) => {
    try {
        const response = await bulk.updateBulkRequest({ data, id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Get bulk status
export const getBulkStatus = createAsyncThunk('getBulkStatus', async ({ id }, thunkAPI) => {
    try {
        const response = await bulk.getBulkStatus({ id });
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


            // Create bulk request
            .addCase(createBulkRequest.pending, (state) => {
                state.isBulkRequestCreating = true;
                state.isBulkRequestCreated = false;
                state.isBulkRequestCreateError = false;
            })
            .addCase(createBulkRequest.fulfilled, (state, action) => {
                state.isBulkRequestCreating = false;
                state.isBulkRequestCreated = true;
                state.isBulkRequestCreateError = false;
            })
            .addCase(createBulkRequest.rejected, (state, action) => {
                state.isBulkRequestCreating = false;
                state.isBulkRequestCreated = false;
                state.isBulkRequestCreateError = true;
            })

            // Update bulk request
            .addCase(updateBulkRequest.pending, (state) => {
                state.isBulkRequestUpdating = true;
                state.isBulkRequestUpdated = false;
                state.isBulkRequestUpdateError = false;
            })
            .addCase(updateBulkRequest.fulfilled, (state, action) => {
                state.isBulkRequestUpdating = false;
                state.isBulkRequestUpdated = true;
                state.isBulkRequestUpdateError = false;
            })
            .addCase(updateBulkRequest.rejected, (state, action) => {
                state.isBulkRequestUpdating = false;
                state.isBulkRequestUpdated = false;
                state.isBulkRequestUpdateError = true;
            })

            // Get all bulk request for admin       
            .addCase(getAllBulkRequests.pending, (state) => {
                state.isAllBulkRequestsLoading = true;
                state.isAllBulkRequestsLoaded = false;
                state.isAllBulkRequestsLoadError = false;
            })
            .addCase(getAllBulkRequests.fulfilled, (state, action) => {
                state.isAllBulkRequestsLoading = false;
                state.isAllBulkRequestsLoaded = true;
                state.isAllBulkRequestsLoadError = false;
                state.allBulkRequests = action.payload;
            })
            .addCase(getAllBulkRequests.rejected, (state, action) => {
                state.isAllBulkRequestsLoading = false;
                state.isAllBulkRequestsLoaded = false;
                state.isAllBulkRequestsLoadError = true;
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

            .addCase(getBulkStatus.pending, (state) => {
                state.isBulkStatusLoading = true;
                state.isBulkStatusLoaded = false;
                state.isBulkStatusLoadError = false;
            })

            .addCase(getBulkStatus.fulfilled, (state, action) => {
                state.isBulkStatusLoading = false;
                state.isBulkStatusLoaded = true;
                state.isBulkStatusLoadError = false;
                state.bulkStatusData = action.payload;
            })

            .addCase(getBulkStatus.rejected, (state, action) => {
                state.isBulkStatusLoading = false;
                state.isBulkStatusLoaded = false;
                state.isBulkStatusLoadError = true;
            })
    }
})

export default bulkSlice.reducer