"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { payment } from "../actions/payment";

const initialState = {

    isPaymentCreating: false,
    isPaymentCreated: false,
    isPaymentCreateError: false,
    stripeUrl: {},

    isPayCompleting: false,
    isPayCompleted: false,
    isPayCompleteError: false,


    isPayFailLoading: false,
    isPayFailed: false,
    isPayFailError: false,


    isAllTransactionsLoading: false,
    isAllTransactionsLoaded: false,
    isAllTransactionsLoadError: false,
    allTransactions: []
}

export const getStripeUrl = createAsyncThunk('getStripeUrl', async ({ data }, thunkAPI) => {

    try {

        const response = await payment.getStripeUrl(data);
        return thunkAPI.fulfillWithValue(response.data);

    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const payComplete = createAsyncThunk('payComplete', async ({ data }, thunkAPI) => {

    try {

        const response = await payment.payComplete(data);
        return thunkAPI.fulfillWithValue(response.data);

    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const payFailed = createAsyncThunk('payFailed', async ({ data }, thunkAPI) => {

    try {

        const response = await payment.payFailed(data);
        return thunkAPI.fulfillWithValue(response.data);

    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getAllTransactions = createAsyncThunk('getAllTransactions', async ({ }, thunkAPI) => {

    try {
        const response = await payment.getAllTransactions();
        return thunkAPI.fulfillWithValue(response.data);

    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // Create inventory
            .addCase(getStripeUrl.pending, (state, action) => {
                state.isPaymentCreating = true;
                state.isPaymentCreated = false;
                state.isPaymentCreateError = false;
            })
            .addCase(getStripeUrl.fulfilled, (state, action) => {
                state.isPaymentCreating = false;
                state.isPaymentCreated = true;
                state.isPaymentCreateError = false;
                state.stripeUrl = action.payload;
            })
            .addCase(getStripeUrl.rejected, (state, action) => {
                state.isPaymentCreating = false;
                state.isPaymentCreated = false;
                state.isPaymentCreateError = true;
            })

            // Pay complete
            .addCase(payComplete.pending, (state, action) => {
                state.isPayCompleting = true;
                state.isPayCompleted = false;
                state.isPayCompleteError = false;
            })
            .addCase(payComplete.fulfilled, (state, action) => {
                state.isPayCompleting = false;
                state.isPayCompleted = true;
                state.isPayCompleteError = false;
            })
            .addCase(payComplete.rejected, (state, action) => {
                state.isPayCompleting = false;
                state.isPayCompleted = false;
                state.isPayCompleteError = true;
            })

            // Pay failed
            .addCase(payFailed.pending, (state, action) => {
                state.isPayFailLoading = true;
                state.isPayFailed = false;
                state.isPayFailError = false;
            })
            .addCase(payFailed.fulfilled, (state, action) => {
                state.isPayFailLoading = false;
                state.isPayFailed = true;
                state.isPayFailError = false;
            })
            .addCase(payFailed.rejected, (state, action) => {
                state.isPayFailLoading = false;
                state.isPayFailed = false;
                state.isPayFailError = true;
            })

            //Get all transactions
            .addCase(getAllTransactions.pending, (state, action) => {
                state.isAllTransactionsLoading = true;
                state.isAllTransactionsLoaded = false;
                state.isAllTransactionsLoadError = false;
            })

            .addCase(getAllTransactions.fulfilled, (state, action) => {
                state.isAllTransactionsLoading = false;
                state.isAllTransactionsLoaded = true;
                state.isAllTransactionsLoadError = false;
                state.allTransactions = action.payload;
            })

            .addCase(getAllTransactions.rejected, (state, action) => {
                state.isAllTransactionsLoading = false;
                state.isAllTransactionsLoaded = false;
                state.isAllTransactionsLoadError = true;
            })


    }
})

export default paymentSlice.reducer