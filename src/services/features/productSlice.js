"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { products } from "../actions/products";

const initialState = {
    isAllProductsLoading: false,
    isAllProductsLoaded: false,
    isAllProductsLoadError: false,
    allProducts: [],

    isProductCreating: false,
    isProductCreated: false,
    isProductCreateError: false,

    isProductUpdating: false,
    isProductUpdated: false,
    isProductUpdateError: false,

    isPriceCreating: false,
    isPriceCreated: false,
    isPriceCreateError: false,

    isPriceUpdating: false,
    isPriceUpdated: false,
    isPriceUpdateError: false,

    isProductImageUploading: false,
    isProductImageUploaded: false,
    isProductImageUploadError: false,

}

export const getAllProducts = createAsyncThunk('getAllProducts', async (data, thunkAPI) => {
    try {
        const response = await products.getAllProducts();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createProduct = createAsyncThunk('createProduct', async ({ data }, thunkAPI) => {
    try {
        const response = await products.createProduct(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateProduct = createAsyncThunk('updateProduct', async (data, thunkAPI) => {
    try {
        const response = await products.updateProduct();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createPrice = createAsyncThunk('createPrice', async ({ data }, thunkAPI) => {
    try {
        const response = await products.createPrice(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updatePrice = createAsyncThunk('updatePrice', async ({ data, id }, thunkAPI) => {
    try {
        const response = await products.updatePrice(data, id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const uploadProductImage = createAsyncThunk('uploadProductImage', async ({ data, id }, thunkAPI) => {
    try {
        const response = await products.uploadProductImage(data, id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
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


            //create Price
            .addCase(createPrice.pending, (state, action) => {
                state.isPriceCreating = true;
                state.isPriceCreated = false;
                state.isPriceCreateError = false;
            })

            .addCase(createPrice.fulfilled, (state, action) => {
                state.isPriceCreating = false;
                state.isPriceCreated = true;
                state.isPriceCreateError = false;
            })

            .addCase(createPrice.rejected, (state, action) => {
                state.isPriceCreating = false;
                state.isPriceCreated = false;
                state.isPriceCreateError = true;
            })

            //Update Price
            .addCase(updatePrice.pending, (state, action) => {
                state.isPriceUpdating = true;
                state.isPriceUpdated = false;
                state.isPriceUpdateError = false;
            })

            .addCase(updatePrice.fulfilled, (state, action) => {
                state.isPriceUpdating = false;
                state.isPriceUpdated = true;
                state.isPriceUpdateError = false;
            })

            .addCase(updatePrice.rejected, (state, action) => {
                state.isPriceUpdating = false;
                state.isPriceUpdated = false;
                state.isPriceUpdateError = true;
            })


            .addCase(uploadProductImage.pending, (state, action) => {
                state.isProductImageUploading = true;
                state.isProductImageUploaded = false;
                state.isProductImageUploadError = false;
            })

            .addCase(uploadProductImage.fulfilled, (state, action) => {
                state.isProductImageUploading = false;
                state.isProductImageUploaded = true;
                state.isProductImageUploadError = false;
            })

            .addCase(uploadProductImage.rejected, (state, action) => {
                state.isProductImageUploading = false;
                state.isProductImageUploaded = false;
                state.isProductImageUploadError = true;
            })

    }
})

export default productSlice.reducer