"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { products } from "../actions/products";

const initialState = {
    isAllProductsLoading: false,
    isAllProductsLoaded: false,
    isAllProductsLoadError: false,
    allProducts: [],

    isAllProductsByUserLoading: false,
    isAllProductsByUserLoaded: false,
    isAllProductsByUserLoadError: false,
    allProductsByUser: [],

    isSingleProductLoading: false,
    isSingleProductLoaded: false,
    isSingleProductLoadError: false,
    singleProduct: {},

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

    isProductSeoCreating: false,
    isProductSeoCreated: false,
    isProductSeoCreateError: false,

    isProductSeoUpdating: false,
    isProductSeoUpdated: false,
    isProductSeoUpdateError: false,

    isProductSeoLoading: false,
    isProductSeoLoaded: false,
    isProductSeoLoadError: false,


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

export const getAllProductsByUser = createAsyncThunk('getAllProductsByUser', async ({page, per_page}, thunkAPI) => {
    try {
        const response = await products.getAllProductsByUser({page, per_page});
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getSingleProduct = createAsyncThunk('getSingleProduct', async ({ id }, thunkAPI) => {
    try {
        const response = await products.getSingleProduct(id);
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

export const updateProduct = createAsyncThunk('updateProduct', async ({ data, id }, thunkAPI) => {
    try {
        const response = await products.updateProduct(data, id);
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

export const createProductSeo = createAsyncThunk('createProductSeo', async ({ data }, thunkAPI) => {
    try {
        const response = await products.createProductSeo(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateProductSeo = createAsyncThunk('updateProductSeo', async ({ data, id }, thunkAPI) => {
    try {
        const response = await products.updateProductSeo(data, id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getProductSeo = createAsyncThunk('getProductSeo', async ({ data, id }, thunkAPI) => {
    try {
        const response = await products.getProductSeo(data, id);
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

            //Get all products by user
            .addCase(getAllProductsByUser.pending, (state, action) => {
                state.isAllProductsByUserLoading = true;
                state.isAllProductsByUserLoaded = false;
                state.isAllProductsByUserLoadError = false;
            })

            .addCase(getAllProductsByUser.fulfilled, (state, action) => {
                state.isAllProductsByUserLoading = false;
                state.isAllProductsByUserLoaded = true;
                state.isAllProductsByUserLoadError = false;
                state.allProductsByUser = action.payload;
            })

            .addCase(getAllProductsByUser.rejected, (state, action) => {
                state.isAllProductsByUserLoading = false;
                state.isAllProductsByUserLoaded = false;
                state.isAllProductsByUserLoadError = true;
            })

            //Get single products
            .addCase(getSingleProduct.pending, (state, action) => {
                state.isSingleProductLoading = true;
                state.isSingleProductLoaded = false;
                state.isSingleProductLoadError = false;
            })

            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.isSingleProductLoading = false;
                state.isSingleProductLoaded = true;
                state.isSingleProductLoadError = false;
                state.singleProduct = action.payload;
            })

            .addCase(getSingleProduct.rejected, (state, action) => {
                state.isSingleProductLoading = false;
                state.isSingleProductLoaded = false;
                state.isSingleProductLoadError = true;
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


            .addCase(createProductSeo.pending, (state, action) => {
                state.isProductSeoCreating = true;
                state.isProductSeoCreated = false;
                state.isProductSeoCreateError = false;
            })

            .addCase(createProductSeo.fulfilled, (state, action) => {
                state.isProductSeoCreating = false;
                state.isProductSeoCreated = true;
                state.isProductSeoCreateError = false;
            })

            .addCase(createProductSeo.rejected, (state, action) => {
                state.isProductSeoCreating = false;
                state.isProductSeoCreated = false;
                state.isProductSeoCreateError = true;
            })

            .addCase(updateProductSeo.pending, (state, action) => {
                state.isProductSeoUpdating = true;
                state.isProductSeoUpdated = false;
                state.isProductSeoUpdateError = false;
            })

            .addCase(updateProductSeo.fulfilled, (state, action) => {
                state.isProductSeoUpdating = false;
                state.isProductSeoUpdated = true;
                state.isProductSeoUpdateError = false;
            })

            .addCase(updateProductSeo.rejected, (state, action) => {
                state.isProductSeoUpdating = false;
                state.isProductSeoUpdated = false;
                state.isProductSeoUpdateError = true;
            })

    }
})

export default productSlice.reducer