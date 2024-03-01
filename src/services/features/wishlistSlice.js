"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { wishlist } from "../actions/wishlist";

const initialState = {

    isWishlistLoading: false,
    isWishlistLoaded: false,
    isWishlistLoadError: false,
    wishlistProducts: [],

    isProductAddingToWishlist: false,
    isProductAddedToWishlist: false,
    isProductAddToWishlistError: false,

    isWishlistRemoving: false,
    isWishlistRemoved: false,
    isWishlistRemoveError: false
}

// Get wishlist
export const getWishlist = createAsyncThunk('getWishlist', async ({ }, thunkAPI) => {
    try {
        const response = await wishlist.getWishlist();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Add Product to wishlist
export const addProductToWishlist = createAsyncThunk('addProductToWishlist', async ({ data }, thunkAPI) => {
    try {
        const response = await wishlist.addProductToWishlist(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

// Delete wishlist
export const removeWishlist = createAsyncThunk('removeWishlist', async ({ id }, thunkAPI) => {
    try {
        const response = await wishlist.removeWishlist(id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder

            // Get wishlist
            .addCase(getWishlist.pending, (state) => {
                state.isWishlistLoading = true;
                state.isWishlistLoaded = false;
                state.isWishlistLoadError = false;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isWishlistLoading = false;
                state.isWishlistLoaded = true;
                state.isWishlistLoadError = false;
                state.wishlistProducts = action.payload;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.isWishlistLoading = false;
                state.isWishlistLoaded = false;
                state.isWishlistLoadError = true;
            })

            // Add products to wishlist
            .addCase(addProductToWishlist.pending, (state) => {
                state.isProductAddingToWishlist = true;
                state.isProductAddedToWishlist = false;
                state.isProductAddToWishlistError = false;
            })

            .addCase(addProductToWishlist.fulfilled, (state, action) => {
                state.isProductAddingToWishlist = false;
                state.isProductAddedToWishlist = true;
                state.isProductAddToWishlistError = false;
            })

            .addCase(addProductToWishlist.rejected, (state, action) => {
                state.isProductAddingToWishlist = false;
                state.isProductAddedToWishlist = false;
                state.isProductAddToWishlistError = true;
            })

            //remove wishlist
            .addCase(removeWishlist.pending, (state, action) => {
                state.isWishlistRemoving = true;
                state.isWishlistRemoved = false;
                state.isWishlistRemoveError = false;
            })
            .addCase(removeWishlist.fulfilled, (state, action) => {
                state.isWishlistRemoving = false;
                state.isWishlistRemoved = true;
                state.isWishlistRemoveError = false;
            })
            .addCase(removeWishlist.rejected, (state, action) => {
                state.isWishlistRemoving = false;
                state.isWishlistRemoved = false;
                state.isWishlistRemoveError = true;
            })


    }
})

export default wishlistSlice.reducer