"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categories } from "../actions/categories";

const initialState = {
    isCategoryTreeLoading: false,
    isCategoryTreeLoaded: false,
    isCategoryTreeLoadError: false,
    allcategories: [],


    isCreateCategoryLoading: false,
    isCreateCategoryLoaded: false,
    isCreateCategoryError: false,


    isUpdateCategoryLoading: false,
    isUpdateCategoryLoaded: false,
    isUpdateCategoryError: false,

    isDeleteCategoryLoading: false,
    isDeleteCategoryLoaded: false,
    isDeleteCategoryError: false,

    isUploadImageLoading: false,
    isUploadImageLoaded: false,
    isUploadImageError: false,


    isDeleteImageLoading: false,
    isDeleteImageLoaded: false,
    isDeleteImageError: false,


    isMainCategoryTreeLoading: false,
    isMainCategoryTreeLoaded: false,
    isMainCategoryTreeLoadError: false,
    maincategories: [],    
}

export const getCategoryTree = createAsyncThunk('getCategoryTree', async (data, thunkAPI) => {
    try {
        const response = await categories.getCategoryTree();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const getMainTree = createAsyncThunk('getMainTree', async (data, thunkAPI) => {
    try {
        const response = await categories.getMainTree();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})



export const createCategory = createAsyncThunk('createCategory', async ({ data }, thunkAPI) => {
    try {
        
        const response = await categories.createCategory(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const updateCategory = createAsyncThunk('updateCategory', async ({ data, id }, thunkAPI) => {
    try {

        const response = await categories.updateCategory({ data, id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const deleteCategory = createAsyncThunk('deleteCategory', async ({ id }, thunkAPI) => {
    try {

        const response = await categories.deleteCategory({ id });
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const uploadCategoryImage = createAsyncThunk('uploadCategoryImage', async ({ data, id }, thunkAPI) => {
    try {
        const response = await categories.uploadCategoryImage(data, id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


export const deleteCategoryImage = createAsyncThunk('deleteCategoryImage', async ({ id, type }, thunkAPI) => {
    try {
        const response = await categories.deleteCategoryImage(id, type);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})








const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // Get all categories
            .addCase(getCategoryTree.pending, (state, action) => {
                state.isCategoryTreeLoading = true;
                state.isCategoryTreeLoaded = false;
                state.isCategoryTreeLoadError = false;
            })
            .addCase(getCategoryTree.fulfilled, (state, action) => {
                state.isCategoryTreeLoading = false;
                state.isCategoryTreeLoaded = true;
                state.isCategoryTreeLoadError = false;
                state.allcategories = action.payload;
            })
            .addCase(getCategoryTree.rejected, (state, action) => {
                state.isCategoryTreeLoading = false;
                state.isCategoryTreeLoaded = false;
                state.isCategoryTreeLoadError = true;
            })


             // Get all main categories
             .addCase(getMainTree.pending, (state, action) => {
                state.isCategoryTreeLoading = true;
                state.isCategoryTreeLoaded = false;
                state.isCategoryTreeLoadError = false;
            })
            .addCase(getMainTree.fulfilled, (state, action) => {
                state.isMainCategoryTreeLoading = false;
                state.isMainCategoryTreeLoaded = true;
                state.isMainCategoryTreeLoadError = false;
                state.maincategories = action.payload;
            })
            .addCase(getMainTree.rejected, (state, action) => {
                state.isCategoryTreeLoading = false;
                state.isCategoryTreeLoaded = false;
                state.isCategoryTreeLoadError = true;
            })

             // Create Category
             .addCase(createCategory.pending, (state, action) => {
                state.isCreateCategoryLoading = true;
                state.isCreateCategoryLoaded = false;
                state.isCreateCategoryError = false;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isCreateCategoryLoading = false;
                state.isCreateCategoryLoaded = true;
                state.isCreateCategoryError = false;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isCreateCategoryLoading = false;
                state.isCreateCategoryLoaded = false;
                state.isCreateCategoryError = true;
            })


             // Update Category
             .addCase(updateCategory.pending, (state, action) => {
                state.isUpdateCategoryLoading = true;
                state.isUpdateCategoryLoaded = false;
                state.isUpdateCategoryError = false;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isUpdateCategoryLoading = false;
                state.isUpdateCategoryLoaded = true;
                state.isUpdateCategoryError = false;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isUpdateCategoryLoading = false;
                state.isUpdateCategoryLoaded = false;
                state.isUpdateCategoryError = true;
            })


            // Delete Category
            .addCase(deleteCategory.pending, (state, action) => {
                state.isDeleteCategoryLoading = true;
                state.isDeleteCategoryLoaded = false;
                state.isDeleteCategoryError = false;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isDeleteCategoryLoading = false;
                state.isDeleteCategoryLoaded = true;
                state.isDeleteCategoryError = false;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isDeleteCategoryLoading = false;
                state.isDeleteCategoryLoaded = false;
                state.isDeleteCategoryError = true;
            })


            // Upload category image
            .addCase(uploadCategoryImage.pending, (state, action) => {
                state.isUploadImageLoading = true;
                state.isUploadImageLoaded = false;
                state.isUploadImageError = false;
            })
            .addCase(uploadCategoryImage.fulfilled, (state, action) => {
                state.isUploadImageLoading = false;
                state.isUploadImageLoaded = true;
                state.isUploadImageError = false;
            })
            .addCase(uploadCategoryImage.rejected, (state, action) => {
                state.isUploadImageLoading = false;
                state.isUploadImageLoaded = false;
                state.isUploadImageError = true;
            })

            // Delete category image
            .addCase(deleteCategoryImage.pending, (state, action) => {
                state.isDeleteImageLoading = true;
                state.isDeleteImageLoaded = false;
                state.isDeleteImageError = false;
            })
            .addCase(deleteCategoryImage.fulfilled, (state, action) => {
                state.isDeleteImageLoading = false;
                state.isDeleteImageLoaded = true;
                state.isDeleteImageError = false;
            })
            .addCase(deleteCategoryImage.rejected, (state, action) => {
                state.isDeleteImageLoading = false;
                state.isDeleteImageLoaded = false;
                state.isDeleteImageError = true;
            })
    }
})

export default categorySlice.reducer