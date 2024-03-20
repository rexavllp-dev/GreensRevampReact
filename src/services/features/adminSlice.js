"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { admin } from "../actions/admin";

const initialState = {
    isLatestOrdersLoading: false,
    isLatestOrdersLoaded: false,
    isLatestOrdersLoadError: false,
    latestOrders: [],

    isLatestCancelledOrdersLoading: false,
    isLatestCancelledOrdersLoaded: false,
    isLatestCancelledOrdersLoadError: false,
    latestCancelledOrders: [],

    isLatestReturnedOrdersLoading: false,
    isLatestReturnedOrdersLoaded: false,
    isLatestReturnedOrdersLoadError: false,
    latestReturnedOrders: [],

    isLatestReplacedOrdersLoading: false,
    isLatestReplacedOrdersLoaded: false,
    isLatestReplacedOrdersLoadError: false,
    latestReplacedOrders: [],

    isOutOfStockProductsLoading:false,
    isOutOfStockProductsLoaded:false,
    isOutOfStockProductsLoadError:false,
    outOfStockProducts:[],

    isExpiredProductsLoading:false,
    isExpiredProductsLoaded:false,
    isExpiredProductsLoadError:false,
    expiredProducts:[],

    isAllMinQtyProductsLoading:false,
    isAllMinQtyProductsLoaded:false,
    isAllMinQtyProductsLoadError:false,
    allMinQtyProducts:[],
}

// Get latest orders
export const getLatestOrders = createAsyncThunk('getLatestOrders', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getLatestOrders();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Get latest cancelled orders
export const getLatestCancelledOrders = createAsyncThunk('getLatestCancelledOrders', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getLatestCancelledOrders();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
// Get latest returned orders
export const getLatestReturnedOrders = createAsyncThunk('getLatestReturnedOrders', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getLatestReturnedOrders();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get latest replaced orders 
export const getLatestReplacedOrders = createAsyncThunk('getLatestReplacedOrders', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getLatestReplacedOrders();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get out of stock products
export const getOutOfStockProducts = createAsyncThunk('getOutOfStockProducts', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getOutOfStockProducts();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//Get expired products list
export const getExpiredProducts = createAsyncThunk('getExpiredProducts', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getExpiredProducts();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

//get all min qty products loading
export const getAllMinQtyProducts = createAsyncThunk('getAllMinQtyProducts', async ({ }, thunkAPI) => {
    try {
        const response = await admin.getAllMinQtyProducts();
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

            // Get latest orders
            .addCase(getLatestOrders.pending, (state) => {
                state.isLatestOrdersLoading = true;
                state.isLatestOrdersLoaded = false;
                state.isLatestOrdersLoadError = false;
            })
            .addCase(getLatestOrders.fulfilled, (state, action) => {
                state.isLatestOrdersLoading = false;
                state.isLatestOrdersLoaded = true;
                state.isLatestOrdersLoadError = false;
                state.latestOrders = action.payload;
            })
            .addCase(getLatestOrders.rejected, (state, action) => {
                state.isLatestOrdersLoading = false;
                state.isLatestOrdersLoaded = false;
                state.isLatestOrdersLoadError = true;
            })

            .addCase(getLatestCancelledOrders.pending, (state) => {
                state.isLatestCancelledOrdersLoading = true;
                state.isLatestCancelledOrdersLoaded = false;
                state.isLatestCancelledOrdersLoadError = false;
            })

            .addCase(getLatestCancelledOrders.fulfilled, (state, action) => {
                state.isLatestCancelledOrdersLoading = false;
                state.isLatestCancelledOrdersLoaded = true;
                state.isLatestCancelledOrdersLoadError = false;
                state.latestCancelledOrders = action.payload;
            })

            .addCase(getLatestCancelledOrders.rejected, (state, action) => {
                state.isLatestCancelledOrdersLoading = false;
                state.isLatestCancelledOrdersLoaded = false;
                state.isLatestCancelledOrdersLoadError = true;
            })

            .addCase(getLatestReturnedOrders.pending, (state) => {
                state.isLatestReturnedOrdersLoading = true;
                state.isLatestReturnedOrdersLoaded = false;
                state.isLatestReturnedOrdersLoadError = false;
            })

            .addCase(getLatestReturnedOrders.fulfilled, (state, action) => {
                state.isLatestReturnedOrdersLoading = false;
                state.isLatestReturnedOrdersLoaded = true;
                state.isLatestReturnedOrdersLoadError = false;
                state.latestReturnedOrders = action.payload;
            })

            .addCase(getLatestReturnedOrders.rejected, (state, action) => {
                state.isLatestReturnedOrdersLoading = false;
                state.isLatestReturnedOrdersLoaded = false;
                state.isLatestReturnedOrdersLoadError = true;
            })

            .addCase(getLatestReplacedOrders.pending, (state) => {
                state.isLatestReplacedOrdersLoading = true;
                state.isLatestReplacedOrdersLoaded = false;
                state.isLatestReplacedOrdersLoadError = false;
            })

            .addCase(getLatestReplacedOrders.fulfilled, (state, action) => {
                state.isLatestReplacedOrdersLoading = false;
                state.isLatestReplacedOrdersLoaded = true;
                state.isLatestReplacedOrdersLoadError = false;
                state.latestReplacedOrders = action.payload;
            })

            .addCase(getLatestReplacedOrders.rejected, (state, action) => {
                state.isLatestReplacedOrdersLoading = false;
                state.isLatestReplacedOrdersLoaded = false;
                state.isLatestReplacedOrdersLoadError = true;
            })


            .addCase(getOutOfStockProducts.pending, (state) => {
                state.isOutOfStockProductsLoading = true;
                state.isOutOfStockProductsLoaded = false;
                state.isOutOfStockProductsLoadError = false;
            })
            .addCase(getOutOfStockProducts.fulfilled, (state, action) => {
                state.isOutOfStockProductsLoading = false;
                state.isOutOfStockProductsLoaded = true;
                state.isOutOfStockProductsLoadError = false;
                state.outOfStockProducts = action.payload;
            })
            .addCase(getOutOfStockProducts.rejected, (state, action) => {
                state.isOutOfStockProductsLoading = false;
                state.isOutOfStockProductsLoaded = false;
                state.isOutOfStockProductsLoadError = true;
            })


            .addCase(getExpiredProducts.pending, (state, action) => {
                state.isExpiredProductsLoading = true;
                state.isExpiredProductsLoaded = false;
                state.isExpiredProductsLoadError = false;
            })
            .addCase(getExpiredProducts.fulfilled, (state, action) => {
                state.isExpiredProductsLoading = false;
                state.isExpiredProductsLoaded = true;
                state.isExpiredProductsLoadError = false;
                state.expiredProducts = action.payload;
            })
            .addCase(getExpiredProducts.rejected, (state, action) => {
                state.isExpiredProductsLoading = false;
                state.isExpiredProductsLoaded = false;
                state.isExpiredProductsLoadError = true;
            })

            .addCase(getAllMinQtyProducts.pending, (state, action) => {
                state.isAllMinQtyProductsLoading = true;
                state.isAllMinQtyProductsLoaded = false;
                state.isAllMinQtyProductsLoadError = false;
            })
            .addCase(getAllMinQtyProducts.fulfilled, (state, action) => {
                state.isAllMinQtyProductsLoading = false;
                state.isAllMinQtyProductsLoaded = true;
                state.isAllMinQtyProductsLoadError = false;
                state.allMinQtyProducts = action.payload;
            })
            .addCase(getAllMinQtyProducts.rejected, (state, action) => {
                state.isAllMinQtyProductsLoading = false;
                state.isAllMinQtyProductsLoaded = false;
                state.isAllMinQtyProductsLoadError = true;
            })
    }
})

export default adminSlice.reducer