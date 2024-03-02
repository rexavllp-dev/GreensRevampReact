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

    isOrderItemLoading: false,
    isOrderItemLoaded: false,
    isOrderItemLoadError: false,
    orderItem: [],

    isUserOrdersLoading: false,
    isUserOrdersLoaded: false,
    isUserOrdersLoadError: false,
    userOrders: [],

    isOrderCanceling: false,
    isOrderCanceled: false,
    isOrderCancelError: false,

    isIndividualOrderCanceling: false,
    isIndividualOrderCanceled: false,
    isIndividualOrderCancelError: false
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

export const getOrderItem = createAsyncThunk('getOrderItem', async ({ id }, thunkAPI) => {
    try {
        const response = await order.getOrderItem(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getUserOrders = createAsyncThunk('getUserOrders', async ({ }, thunkAPI) => {
    try {
        const response = await order.getUserOrders();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const cancelOrder = createAsyncThunk('cancelOrder', async ({ data }, thunkAPI) => {
    try {
        const response = await order.cancelOrder(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const cancelIndividualOrder = createAsyncThunk('cancelIndividualOrder', async ({ data }, thunkAPI) => {
    try {
        const response = await order.cancelIndividualOrder(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const returnProduct = createAsyncThunk('returnProduct', async ({ data }, thunkAPI) => {
    try {
        const response = await order.returnProduct(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const replaceProduct = createAsyncThunk('replaceProduct', async ({ data }, thunkAPI) => {
    try {
        const response = await order.replaceProduct(data);
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
            // Get order item
            .addCase(getOrderItem.pending, (state, action) => {
                state.isOrderItemLoading = true;
                state.isOrderItemLoaded = false;
                state.isOrderItemLoadError = false;
            })
            .addCase(getOrderItem.fulfilled, (state, action) => {
                state.isOrderItemLoading = false;
                state.isOrderItemLoaded = true;
                state.isOrderItemLoadError = false;
                state.orderItem = action.payload;
            })
            .addCase(getOrderItem.rejected, (state, action) => {
                state.isOrderItemLoading = false;
                state.isOrderItemLoaded = false;
                state.isOrderItemLoadError = true;
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

            //cancel order
            .addCase(cancelOrder.pending, (state, action) => {
                state.isOrderCanceling = true;
                state.isOrderCanceled = false;
                state.isOrderCancelError = false;
            })

            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.isOrderCanceling = false;
                state.isOrderCanceled = true;
                state.isOrderCancelError = false;
            })

            .addCase(cancelOrder.rejected, (state, action) => {
                state.isOrderCanceling = false;
                state.isOrderCanceled = false;
                state.isOrderCancelError = true;
            })

            //cancel individual Order
            .addCase(cancelIndividualOrder.pending, (state, action) => {
                state.isIndividualOrderCanceling = true;
                state.isIndividualOrderCanceled = false;
                state.isIndividualOrderCancelError = false;
            })

            .addCase(cancelIndividualOrder.fulfilled, (state, action) => {
                state.isIndividualOrderCanceling = false;
                state.isIndividualOrderCanceled = true;
                state.isIndividualOrderCancelError = false;
            })

            .addCase(cancelIndividualOrder.rejected, (state, action) => {
                state.isIndividualOrderCanceling = false;
                state.isIndividualOrderCanceled = false;
                state.isIndividualOrderCancelError = true;
            })
    }
})

export default orderSlice.reducer