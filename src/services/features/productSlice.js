"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { products } from "../actions/products";

const initialState = {
    isAllProductsLoading: false,
    isAllProductsLoaded: false,
    isAllProductsLoadError:false,
    allProducts: [],

    isProductCreating:false,
    isProductCreated:false,
    isProductCreateError:false,

    isProductUpdating:false,
    isProductUpdated:false,
    isProductUpdateError:false,

}

export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
    try {
        const response = await products.getAllProducts();
        return response.data
    } catch (error) {
        return error.response.data;
    }
})

export const createProduct = createAsyncThunk('createProduct', async () => {
    try {
        const response = await products.createProduct();
        return response.data
    } catch (error) {
        return error.response.data;
    }
})

export const updateProduct = createAsyncThunk('updateProduct', async () => {
    try {
        const response = await products.updateProduct();
        return response.data
    } catch (error) {
        return error.response.data;
    }
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder

        //Get all products
            .addCase(getAllProducts.pending, (state, action) => {
                state.isAllProductsLoading = true;
                state.isAllProductsLoaded = false;
                state.isAllProductsLoadError = false;
            })

            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isAllProductsLoading = false;
                state.isAllProductsLoaded = true;
                state.isAllProductsLoadError = false;
                state.allProducts = action.payload;
            })

            .addCase(getAllProducts.rejected, (state, action) => {
                state.isAllProductsLoading = false;
                state.isAllProductsLoaded = false;
                state.isAllProductsLoadError = true;
            })

            //createProduct
            .addCase(createProduct.pending, (state, action) => {
                state.isProductCreating = true;
                state.isProductCreated = false;
                state.isProductCreateError = false;
            })

            .addCase(createProduct.fulfilled, (state, action) => {
                state.isProductCreating = false;
                state.isProductCreated = true;
                state.isProductCreateError = false;
            })

            .addCase(createProduct.rejected, (state, action) => {
                state.isProductCreating = false;
                state.isProductCreated = false;
                state.isProductCreateError = true;
            })

            //Update Product
            .addCase(updateProduct.pending, (state, action) => {
                state.isProductUpdating = true;
                state.isProductUpdated = false;
                state.isProductUpdateError = false;
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isProductUpdating = false;
                state.isProductUpdated = true;
                state.isProductUpdateError = false;
            })

            .addCase(updateProduct.rejected, (state, action) => {
                state.isProductUpdating = false;
                state.isProductUpdated = false;
                state.isProductUpdateError = true;
            })

    }
})

export default productSlice.reducer