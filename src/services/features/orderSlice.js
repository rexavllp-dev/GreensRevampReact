"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { order } from "../actions/order";

const initialState = {
    isOrderCreating:false,
    isOrderCreated:false,
    isOrderCreateError:false,
}

export const createOrder = createAsyncThunk('createOrder', async ({data}, thunkAPI) => {
    try {
        const response = await order.createOrder(data);
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
    }
})

export default orderSlice.reducer