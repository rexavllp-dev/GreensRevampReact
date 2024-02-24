"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { order } from "../actions/order";

const initialState = {
    isOrderCreating: false,
    isOrderCreated: false,
    isOrderCreateError: false,
    isOrderLoading: false,
    isOrderLoaded: false,
    isOrderLoadError: false,
    singleOrder: {},

    isUserOrdersLoading: false,
    isUserOrdersLoaded: false,
    isUserOrdersLoadError: false,
    userOrders: [],
}

export const createOrder = createAsyncThunk('createOrder', async ({ data }, thunkAPI) => {
    try {
        const response = await order.createOrder(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getOrder = createAsyncThunk('getOrder', async ({ id }, thunkAPI) => {
    try {
        const response = await order.getOrder(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getUserOrders = createAsyncThunk('getUserOrders', async ({  }, thunkAPI) => {
    try {
        const response = await order.getUserOrders();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})



const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // Create order
            .addCase(createOrder.pending, (state, action) => {
                state.isOrderCreating = true;
                state.isOrderCreated = false;
                state.isOrderCreateError = false;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isOrderCreating = false;
                state.isOrderCreated = true;
                state.isOrderCreateError = false;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isOrderCreating = false;
                state.isOrderCreated = false;
                state.isOrderCreateError = true;
            })
            // Get order
            .addCase(getOrder.pending, (state, action) => {
                state.isOrderLoading = true;
                state.isOrderLoaded = false;
                state.isOrderLoadError = false;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isOrderLoading = false;
                state.isOrderLoaded = true;
                state.isOrderLoadError = false;
                state.singleOrder = action.payload;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isOrderLoading = false;
                state.isOrderLoaded = false;
                state.isOrderLoadError = true;
            })
            // Get user orders
            .addCase(getUserOrders.pending, (state, action) => {
                state.isUserOrdersLoading = true;
                state.isUserOrdersLoaded = false;
                state.isUserOrdersLoadError = false;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.isUserOrdersLoading = false;
                state.isUserOrdersLoaded = true;
                state.isUserOrdersLoadError = false;
                state.userOrders = action.payload;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.isUserOrdersLoading = false;
                state.isUserOrdersLoaded = false;
                state.isUserOrdersLoadError = true;
            })
    }
})

export default orderSlice.reducer