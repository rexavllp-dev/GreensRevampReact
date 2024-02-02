"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { products } from "../actions/products";

const initialState = {
    isAllProductsLoading: false,
    isAllProductsLoaded: false,
    isAllProductsLoadError: false,
    allProducts: [],
    searchQuery: '',

    isAllProductsByUserLoading: false,
    isAllProductsByUserLoaded: false,
    isAllProductsByUserLoadError: false,
    allProductsByUser: [],

    isSingleProductLoading: false,
    isSingleProductLoaded: false,
    isSingleProductLoadError: false,
    singleProduct: {},

    isProductDeleting: false,
    isProductDeleted: false,
    isProductDeleteError: false,

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

    isOptionCreating: false,
    isOptionCreated: false,
    isOptionCreateError: false,

    isProductOptionCreating: false,
    isProductOptionCreated: false,
    isProductOptionCreateError: false,

    isOptionValueUpdating: false,
    isOptionValueUpdated: false,
    isOptionValueUpdateError: false,

    isAllOptionsByProductLoading: false,
    isAllOptionsByProductLoaded: false,
    isAllOptionsByProductLoadError: false,
    allOptionsByProduct: [],

    isOptionValuesLoading: false,
    isOptionValuesLoaded: false,
    isOptionValuesLoadError: false,
    optionValues: [],

    isProductOptionDeleting: false,
    isProductOptionDeleted: false,
    isProductOptionDeleteError: false,

    isProductOptionValueDeleting: false,
    isProductOptionValueDeleted: false,
    isProductOptionValueDeleteError: false,




    isVariantCreating: false,
    isVariantCreated: false,
    isVariantCreateError: false,

    isProductVariantCreating: false,
    isProductVariantCreated: false,
    isProductVariantCreateError: false,

    isVariantValueUpdating: false,
    isVariantValueUpdated: false,
    isVariantValueUpdateError: false,

    isAllVariantsByProductLoading: false,
    isAllVariantsByProductLoaded: false,
    isAllVariantsByProductLoadError: false,
    allVariantsByProduct: [],

    isVariantValuesLoading: false,
    isVariantValuesLoaded: false,
    isVariantValuesLoadError: false,
    VariantValues: [],

    isProductVariantDeleting: false,
    isProductVariantDeleted: false,
    isProductVariantDeleteError: false,

    isProductVariantValueDeleting: false,
    isProductVariantValueDeleted: false,
    isProductVariantValueDeleteError: false,


    isRelatedProductsLoading: false,
    isRelatedProductsLoaded: false,
    isRelatedProductsLoadError: false,
    relatedProducts: [],

    isRelatedProductsCreating: false,
    isRelatedProductsCreated: false,
    isRelatedProductsCreateError: true,

    isRelatedProductsDeleting: false,
    isRelatedProductsDeleted: false,
    isRelatedProductsDeleteError: true,

    isReviewCreatingByAdmin: false,
    isReviewCreatedByAdmin: false,
    isReviewCreateByAdminError: false,

    isReviewIsLoading: false,
    isReviewIsLoaded: false,
    isReviewIsLoadError: false,
    allReviews: [],



    isProductOptionsLoading: false,
    isProductOptionsLoaded: false,
    isProductOptionsLoadError: false,
    productOptions: [],

    isStockModifying: false,
    isStockModified: false,
    isStockModifyError: false,

    isStockHistoryByProductLoading: false,
    isStockHistoryByProductLoaded: false,
    isStockHistoryByProductLoadError: false,
    stockHistoryByProduct: [],

    isProductImgDeleting: false,
    isProductImgDeleted: false,
    isProductImgDeleteError: false,
}

export const getAllProducts = createAsyncThunk('getAllProducts', async ({ search_query }, thunkAPI) => {
    try {
        const response = await products.getAllProducts({ search_query });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getAllProductsByUser = createAsyncThunk('getAllProductsByUser', async ({ page, per_page, search_query, filters, sortBy }, thunkAPI) => {
    try {
        const response = await products.getAllProductsByUser({ page, per_page, search_query, filters, sortBy });
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

export const deleteProduct = createAsyncThunk('deleteProduct', async ({ data }, thunkAPI) => {
    try {
        const response = await products.deleteProduct(data);
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

export const deleteProductImage = createAsyncThunk('deleteProductImage', async ({ id }, thunkAPI) => {
    try {
        const response = await products.deleteProductImage(id);
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

export const createOption = createAsyncThunk('createOption', async ({ data }, thunkAPI) => {
    try {
        const response = await products.createOption(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createProductOption = createAsyncThunk('createProductOption', async ({ data }, thunkAPI) => {
    try {
        const response = await products.createProductOption(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateOptionValue = createAsyncThunk('updateOptionValue', async ({ data }, thunkAPI) => {
    try {
        const response = await products.updateOptionValue(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getAllOptionsByProductId = createAsyncThunk('getAllOptionsByProductId', async ({ id }, thunkAPI) => {
    try {
        const response = await products.getAllOptionsByProductId(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getOptionValues = createAsyncThunk('getOptionValues', async ({ id }, thunkAPI) => {
    try {
        const response = await products.getOptionValues(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteProductOption = createAsyncThunk('deleteProductOption', async ({ id }, thunkAPI) => {
    try {
        const response = await products.deleteProductOption(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteProductOptionValue = createAsyncThunk('deleteProductOptionValue', async ({ id }, thunkAPI) => {
    try {
        const response = await products.deleteProductOptionValue(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})




//Product variants section

export const createVariant = createAsyncThunk('createVariant', async ({ data }, thunkAPI) => {
    try {
        const response = await products.createVariant(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createVariantLabel = createAsyncThunk('createVariantLabel', async ({ data }, thunkAPI) => {
    try {
        const response = await products.createVariantLabel(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateVariantLabel = createAsyncThunk('updateVariantLabel', async ({ data, id }, thunkAPI) => {
    try {
        const response = await products.updateVariantLabel(data, id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getAllVariantsByProductId = createAsyncThunk('getAllVariantsByProductId', async ({ id }, thunkAPI) => {
    try {
        const response = await products.getAllVariantsByProductId(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getVariantLabelsByVariantId = createAsyncThunk('getVariantLabelsByVariantId', async ({ id }, thunkAPI) => {
    try {
        const response = await products.getVariantLabelsByVariantId(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteVariant = createAsyncThunk('deleteVariant', async ({ id }, thunkAPI) => {
    try {
        const response = await products.deleteVariant(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteVariantLabel = createAsyncThunk('deleteVariantLabel', async ({ id }, thunkAPI) => {
    try {
        const response = await products.deleteVariantLabel(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createRelatedProducts = createAsyncThunk('createRelatedProducts', async ({ id, data }, thunkAPI) => {
    try {
        const response = await products.createRelatedProducts({ data, id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getAllRelatedProducts = createAsyncThunk('getAllRelatedProducts', async ({ id }, thunkAPI) => {
    try {
        const response = await products.getAllRelatedProducts({ id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteRelatedProducts = createAsyncThunk('deleteRelatedProducts', async ({ data }, thunkAPI) => {
    try {
        const response = await products.deleteRelatedProducts({ data });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const createProductReviewByAdmin = createAsyncThunk('createProductReviewByAdmin', async ({ id }, thunkAPI) => {
    try {
        const response = await products.createProductReviewByAdmin({ id, data });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getProductReview = createAsyncThunk('getProductReview', async ({ id }, thunkAPI) => {
    try {
        const response = await products.getProductReview({ id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getProductOptions = createAsyncThunk('getProductOptions', async ({ id }, thunkAPI) => {
    try {
        const response = await products.getProductOptions({ id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const modifyStock = createAsyncThunk('modifyStock', async ({ data, id }, thunkAPI) => {
    try {
        const response = await products.modifyStock({ data, id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const getStockHistoryByProduct = createAsyncThunk('getStockHistoryByProduct', async ({ id }, thunkAPI) => {
    try {
        const response = await products.getStockHistoryByProduct({ id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})




const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchQuery: function (state, action) {
            state.searchQuery = action.payload ? action.payload : ''
        }

    },
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

            //Delete product
            .addCase(deleteProduct.pending, (state, action) => {
                state.isProductDeleting = true;
                state.isProductDeleted = false;
                state.isProductDeleteError = false;
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isProductDeleting = false;
                state.isProductDeleted = true;
                state.isProductDeleteError = false;
            })

            .addCase(deleteProduct.rejected, (state, action) => {
                state.isProductDeleting = false;
                state.isProductDeleted = false;
                state.isProductDeleteError = true;
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




            .addCase(createOption.pending, (state, action) => {
                state.isOptionCreating = true;
                state.isOptionCreated = false;
                state.isOptionCreateError = false;
            })

            .addCase(createOption.fulfilled, (state, action) => {
                state.isOptionCreating = false;
                state.isOptionCreated = true;
                state.isOptionCreateError = false;
            })

            .addCase(createOption.rejected, (state, action) => {
                state.isOptionCreating = false;
                state.isOptionCreated = false;
                state.isOptionCreateError = true;
            })

            .addCase(createProductOption.pending, (state, action) => {
                state.isProductOptionCreating = true;
                state.isProductOptionCreated = false;
                state.isProductOptionCreateError = false;
            })

            .addCase(createProductOption.fulfilled, (state, action) => {
                state.isProductOptionCreating = false;
                state.isProductOptionCreated = true;
                state.isProductOptionCreateError = false;
            })

            .addCase(createProductOption.rejected, (state, action) => {
                state.isProductOptionCreating = false;
                state.isProductOptionCreated = false;
                state.isProductOptionCreateError = true;
            })

            .addCase(getAllOptionsByProductId.pending, (state, action) => {
                state.isAllOptionsByProductLoading = true;
                state.isAllOptionsByProductLoaded = false;
                state.isAllOptionsByProductLoadError = false;
            })

            .addCase(getAllOptionsByProductId.fulfilled, (state, action) => {
                state.isAllOptionsByProductLoading = false;
                state.isAllOptionsByProductLoaded = true;
                state.isAllOptionsByProductLoadError = false;
                state.allOptionsByProduct = action.payload;
            })

            .addCase(getAllOptionsByProductId.rejected, (state, action) => {
                state.isAllOptionsByProductLoading = false;
                state.isAllOptionsByProductLoaded = false;
                state.isAllOptionsByProductLoadError = true;
            })

            .addCase(getOptionValues.pending, (state, action) => {
                state.isOptionValuesLoading = true;
                state.isOptionValuesLoaded = false;
                state.isOptionValuesLoadError = false;
            })

            .addCase(getOptionValues.fulfilled, (state, action) => {
                state.isOptionValuesLoading = false;
                state.isOptionValuesLoaded = true;
                state.isOptionValuesLoadError = false;
                state.optionValues = action.payload;
            })

            .addCase(getOptionValues.rejected, (state, action) => {
                state.isOptionValuesLoading = false;
                state.isOptionValuesLoaded = false;
                state.isOptionValuesLoadError = true;
            })

            .addCase(updateOptionValue.pending, (state, action) => {
                state.isOptionValueUpdating = true;
                state.isOptionValueUpdated = false;
                state.isOptionValueUpdateError = false;
            })

            .addCase(updateOptionValue.fulfilled, (state, action) => {
                state.isOptionValueUpdating = false;
                state.isOptionValueUpdated = true;
                state.isOptionValueUpdateError = false;
            })

            .addCase(updateOptionValue.rejected, (state, action) => {
                state.isOptionValueUpdating = false;
                state.isOptionValueUpdated = false;
                state.isOptionValueUpdateError = true;
            })

            .addCase(deleteProductOption.pending, (state, action) => {
                state.isProductOptionDeleting = true;
                state.isProductOptionDeleted = false;
                state.isProductOptionDeleteError = false;
            })

            .addCase(deleteProductOption.fulfilled, (state, action) => {
                state.isProductOptionDeleting = false;
                state.isProductOptionDeleted = true;
                state.isProductOptionDeleteError = false;
            })

            .addCase(deleteProductOption.rejected, (state, action) => {
                state.isProductOptionDeleting = false;
                state.isProductOptionDeleted = false;
                state.isProductOptionDeleteError = true;
            })

            .addCase(deleteProductOptionValue.pending, (state, action) => {
                state.isProductOptionValueDeleting = true;
                state.isProductOptionValueDeleted = false;
                state.isProductOptionValueDeleteError = false;
            })

            .addCase(deleteProductOptionValue.fulfilled, (state, action) => {
                state.isProductOptionValueDeleting = false;
                state.isProductOptionValueDeleted = true;
                state.isProductOptionValueDeleteError = false;
            })

            .addCase(deleteProductOptionValue.rejected, (state, action) => {
                state.isProductOptionValueDeleting = false;
                state.isProductOptionValueDeleted = false;
                state.isProductOptionValueDeleteError = true;
            })






            .addCase(createVariant.pending, (state, action) => {
                state.isVariantCreating = true;
                state.isVariantCreated = false;
                state.isVariantCreateError = false;
            })

            .addCase(createVariant.fulfilled, (state, action) => {
                state.isVariantCreating = false;
                state.isVariantCreated = true;
                state.isVariantCreateError = false;
            })

            .addCase(createVariant.rejected, (state, action) => {
                state.isVariantCreating = false;
                state.isVariantCreated = false;
                state.isVariantCreateError = true;
            })

            .addCase(createVariantLabel.pending, (state, action) => {
                state.isProductVariantCreating = true;
                state.isProductVariantCreated = false;
                state.isProductVariantCreateError = false;
            })

            .addCase(createVariantLabel.fulfilled, (state, action) => {
                state.isProductVariantCreating = false;
                state.isProductVariantCreated = true;
                state.isProductVariantCreateError = false;
            })

            .addCase(createVariantLabel.rejected, (state, action) => {
                state.isProductVariantCreating = false;
                state.isProductVariantCreated = false;
                state.isProductVariantCreateError = true;
            })

            .addCase(getAllVariantsByProductId.pending, (state, action) => {
                state.isAllVariantsByProductLoading = true;
                state.isAllVariantsByProductLoaded = false;
                state.isAllVariantsByProductLoadError = false;
            })

            .addCase(getAllVariantsByProductId.fulfilled, (state, action) => {
                state.isAllVariantsByProductLoading = false;
                state.isAllVariantsByProductLoaded = true;
                state.isAllVariantsByProductLoadError = false;
                state.allVariantsByProduct = action.payload;
            })

            .addCase(getAllVariantsByProductId.rejected, (state, action) => {
                state.isAllVariantsByProductLoading = false;
                state.isAllVariantsByProductLoaded = false;
                state.isAllVariantsByProductLoadError = true;
            })

            .addCase(getVariantLabelsByVariantId.pending, (state, action) => {
                state.isVariantValuesLoading = true;
                state.isVariantValuesLoaded = false;
                state.isVariantValuesLoadError = false;
            })

            .addCase(getVariantLabelsByVariantId.fulfilled, (state, action) => {
                state.isVariantValuesLoading = false;
                state.isVariantValuesLoaded = true;
                state.isVariantValuesLoadError = false;
                state.VariantValues = action.payload;
            })

            .addCase(getVariantLabelsByVariantId.rejected, (state, action) => {
                state.isVariantValuesLoading = false;
                state.isVariantValuesLoaded = false;
                state.isVariantValuesLoadError = true;
            })

            .addCase(updateVariantLabel.pending, (state, action) => {
                state.isVariantValueUpdating = true;
                state.isVariantValueUpdated = false;
                state.isVariantValueUpdateError = false;
            })

            .addCase(updateVariantLabel.fulfilled, (state, action) => {
                state.isVariantValueUpdating = false;
                state.isVariantValueUpdated = true;
                state.isVariantValueUpdateError = false;
            })

            .addCase(updateVariantLabel.rejected, (state, action) => {
                state.isVariantValueUpdating = false;
                state.isVariantValueUpdated = false;
                state.isVariantValueUpdateError = true;
            })

            .addCase(deleteVariant.pending, (state, action) => {
                state.isProductVariantDeleting = true;
                state.isProductVariantDeleted = false;
                state.isProductVariantDeleteError = false;
            })

            .addCase(deleteVariant.fulfilled, (state, action) => {
                state.isProductVariantDeleting = false;
                state.isProductVariantDeleted = true;
                state.isProductVariantDeleteError = false;
            })

            .addCase(deleteVariant.rejected, (state, action) => {
                state.isProductVariantDeleting = false;
                state.isProductVariantDeleted = false;
                state.isProductVariantDeleteError = true;
            })

            .addCase(deleteVariantLabel.pending, (state, action) => {
                state.isProductVariantValueDeleting = true;
                state.isProductVariantValueDeleted = false;
                state.isProductVariantValueDeleteError = false;
            })

            .addCase(deleteVariantLabel.fulfilled, (state, action) => {
                state.isProductVariantValueDeleting = false;
                state.isProductVariantValueDeleted = true;
                state.isProductVariantValueDeleteError = false;
            })

            .addCase(deleteVariantLabel.rejected, (state, action) => {
                state.isProductVariantValueDeleting = false;
                state.isProductVariantValueDeleted = false;
                state.isProductVariantValueDeleteError = true;
            })



            .addCase(createRelatedProducts.pending, (state, action) => {
                state.isRelatedProductsCreating = true;
                state.isRelatedProductsCreated = false;
                state.isRelatedProductsCreateError = false;
            })

            .addCase(createRelatedProducts.fulfilled, (state, action) => {
                state.isRelatedProductsCreating = false;
                state.isRelatedProductsCreated = true;
                state.isRelatedProductsCreateError = false;
            })

            .addCase(createRelatedProducts.rejected, (state, action) => {
                state.isRelatedProductsCreating = false;
                state.isRelatedProductsCreated = false;
                state.isRelatedProductsCreateError = true;
            })

            .addCase(getAllRelatedProducts.pending, (state, action) => {
                state.isRelatedProductsLoading = true;
                state.isRelatedProductsLoaded = false;
                state.isRelatedProductsLoadError = false;
            })

            .addCase(getAllRelatedProducts.fulfilled, (state, action) => {
                state.isRelatedProductsLoading = false;
                state.isRelatedProductsLoaded = true;
                state.isRelatedProductsLoadError = false;
                state.relatedProducts = action.payload;
            })

            .addCase(getAllRelatedProducts.rejected, (state, action) => {
                state.isRelatedProductsLoading = false;
                state.isRelatedProductsLoaded = false;
                state.isRelatedProductsLoadError = true;
            })

            .addCase(deleteRelatedProducts.pending, (state, action) => {
                state.isRelatedProductsDeleting = true;
                state.isRelatedProductsDeleted = false;
                state.isRelatedProductsDeleteError = false;
            })

            .addCase(deleteRelatedProducts.fulfilled, (state, action) => {
                state.isRelatedProductsDeleting = false;
                state.isRelatedProductsDeleted = true;
                state.isRelatedProductsDeleteError = false;
            })

            .addCase(deleteRelatedProducts.rejected, (state, action) => {
                state.isRelatedProductsDeleting = false;
                state.isRelatedProductsDeleted = false;
                state.isRelatedProductsDeleteError = true;
            })

            .addCase(createProductReviewByAdmin.pending, (state, action) => {
                state.isReviewCreatingByAdmin = true;
                state.isReviewCreatedByAdmin = false;
                state.isReviewCreateByAdminError = false;
            })

            .addCase(createProductReviewByAdmin.fulfilled, (state, action) => {
                state.isReviewCreatingByAdmin = false;
                state.isReviewCreatedByAdmin = true;
                state.isReviewCreateByAdminError = false;
            })

            .addCase(createProductReviewByAdmin.rejected, (state, action) => {
                state.isReviewCreatingByAdmin = false;
                state.isReviewCreatedByAdmin = false;
                state.isReviewCreateByAdminError = true;
            })

            .addCase(getProductReview.pending, (state, action) => {
                state.isReviewIsLoading = true;
                state.isReviewIsLoaded = false;
                state.isReviewIsLoadError = false;
            })

            .addCase(getProductReview.fulfilled, (state, action) => {
                state.isReviewIsLoading = false;
                state.isReviewIsLoaded = true;
                state.isReviewIsLoadError = false;
                state.allReviews = action.payload;
            })

            .addCase(getProductReview.rejected, (state, action) => {
                state.isReviewIsLoading = false;
                state.isReviewIsLoaded = false;
                state.isReviewIsLoadError = true;
            })

            .addCase(getProductOptions.pending, (state, action) => {
                state.isProductOptionsLoading = true;
                state.isProductOptionsLoaded = false;
                state.isProductOptionsLoadError = false;
            })

            .addCase(getProductOptions.fulfilled, (state, action) => {
                state.isProductOptionsLoading = false;
                state.isProductOptionsLoaded = true;
                state.isProductOptionsLoadError = false;
                state.productOptions = action.payload;
            })

            .addCase(getProductOptions.rejected, (state, action) => {
                state.isProductOptionsLoading = false;
                state.isProductOptionsLoaded = false;
                state.isProductOptionsLoadError = true;
            })

            .addCase(modifyStock.pending, (state, action) => {
                state.isStockModifying = true;
                state.isStockModified = false;
                state.isStockModifyError = false;
            })

            .addCase(modifyStock.fulfilled, (state, action) => {
                state.isStockModifying = false;
                state.isStockModified = true;
                state.isStockModifyError = false;
            })

            .addCase(modifyStock.rejected, (state, action) => {
                state.isStockModifying = false;
                state.isStockModified = false;
                state.isStockModifyError = true;
            })

            .addCase(getStockHistoryByProduct.pending, (state, action) => {
                state.isStockHistoryByProductLoading = true;
                state.isStockHistoryByProductLoaded = false;
                state.isStockHistoryByProductLoadError = false;
            })

            .addCase(getStockHistoryByProduct.fulfilled, (state, action) => {
                state.isStockHistoryByProductLoading = false;
                state.isStockHistoryByProductLoaded = true;
                state.isStockHistoryByProductLoadError = false;
                state.stockHistoryByProduct = action.payload;
            })

            .addCase(getStockHistoryByProduct.rejected, (state, action) => {
                state.isStockHistoryByProductLoading = false;
                state.isStockHistoryByProductLoaded = false;
                state.isStockHistoryByProductLoadError = true;
            })

            .addCase(deleteProductImage.pending, (state, action) => {
                state.isProductImgDeleting = true;
                state.isProductImgDeleted = false;
                state.isProductImgDeleteError = false;
            })

            .addCase(deleteProductImage.fulfilled, (state, action) => {
                state.isProductImgDeleting = false;
                state.isProductImgDeleted = true;
                state.isProductImgDeleteError = false;
            })

            .addCase(deleteProductImage.rejected, (state, action) => {
                state.isProductImgDeleting = false;
                state.isProductImgDeleted = false;
                state.isProductImgDeleteError = true;
            })

    }
})

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer