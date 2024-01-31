"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cart } from "../actions/cart";
import Axios from '../axios/Axios.js';

const initialState = {

    cartProductsLoading: false,
    cartProductsLoaded: false,
    cartProductsLoadError: false,
    cartProducts: [],

    productAddingToCart: false,
    productAddedToCart: false,
    productAddToCartError: false,

    productRemovingFromCart: false,
    productRemovedFromCart: false,
    productRemoveFromCartError: false,

    productQuantityUpdating: false,
    productQuantityUpdated: false,
    productQuantityUpdateError: false
}

// Get all products in cart
export const getCartProducts = createAsyncThunk('getCartProducts', async ({ }, thunkAPI) => {
    try {
        const response = await cart.getCartProducts();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Add Product to cart
export const addProductToCart = createAsyncThunk('addProductToCart', async ({ data }, thunkAPI) => {
    try {
        const response = await cart.addProductToCart(data);
        // Set the default headers for all Axios requests
        // Axios.defaults.headers.common['connect.sid'] = response?.data?.connectSid;
        // Axios.interceptors?.request.use((config) => {
        //     config.headers['connect.sid'] =  response?.data?.connectSid;
        //     return config;
        // });

        console.log(response)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Remove product from cart
export const deleteProductFromCart = createAsyncThunk('deleteProductFromCart', async ({ id }, thunkAPI) => {
    try {
        const response = await cart.deleteProductFromCart(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Update cart quantity
export const updateProductQuantity = createAsyncThunk('updateProductQuantity', async ({ data }, thunkAPI) => {
    try {
        const response = await cart.updateProductQuantity(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder

            // Get products in cart
            .addCase(getCartProducts.pending, (state) => {
                state.cartProductsLoading = true;
                state.cartProductsLoaded = false;
                state.cartProductsLoadError = false;
            })
            .addCase(getCartProducts.fulfilled, (state, action) => {
                state.cartProductsLoading = false;
                state.cartProductsLoaded = true;
                state.cartProductsLoadError = false;
                state.cartProducts = action.payload;
            })
            .addCase(getCartProducts.rejected, (state, action) => {
                state.cartProductsLoading = false;
                state.cartProductsLoaded = false;
                state.cartProductsLoadError = true;
            })

            // Add product to cart
            .addCase(addProductToCart.pending, (state) => {
                state.productAddingToCart = true;
                state.productAddedToCart = false;
                state.productAddToCartError = false;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.productAddingToCart = false;
                state.productAddedToCart = true;
                state.productAddToCartError = false;
                // Add the returned product to the cartProducts array
                // state.cartProducts.push(action.payload);
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.productAddingToCart = false;
                state.productAddedToCart = false;
                state.productAddToCartError = true;
            })

            // Remove product from cart
            .addCase(deleteProductFromCart.pending, (state) => {
                state.productRemovingFromCart = true;
                state.productRemovedFromCart = false;
                state.productRemoveFromCartError = false;
            })
            .addCase(deleteProductFromCart.fulfilled, (state, action) => {
                state.productRemovingFromCart = false;
                state.productRemovedFromCart = true;
                state.productRemoveFromCartError = false;
                // Remove the returned product from the cartProducts array
                // state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload.id);
            })
            .addCase(deleteProductFromCart.rejected, (state, action) => {
                state.productRemovingFromCart = false;
                state.productRemovedFromCart = false;
                state.productRemoveFromCartError = true;
            })

            // Update product quantity
            .addCase(updateProductQuantity.pending, (state) => {
                state.productQuantityUpdating = true;
                state.productQuantityUpdated = false;
                state.productQuantityUpdateError = false;
            })
            .addCase(updateProductQuantity.fulfilled, (state, action) => {
                state.productQuantityUpdating = false;
                state.productQuantityUpdated = true;
                state.productQuantityUpdateError = false;
            })
            .addCase(updateProductQuantity.rejected, (state, action) => {
                state.productQuantityUpdating = false;
                state.productQuantityUpdated = false;
                state.productQuantityUpdateError = true;
            })

    }
})

export default cartSlice.reducer