"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { inventory } from "../actions/inventory";

const initialState = {
    isInventoryCreating: false,
    isInventoryCreated: false,
    isInventoryCreateError: false,
    isInventoryUpdating: false,
    isInventoryUpdated: false,
    isInventoryUpdateError: false,
}

export const createInventory = createAsyncThunk('createInventory', async ({data}, thunkAPI) => {
    try {
        const response = await inventory.createInventory(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateInventory = createAsyncThunk('updateInventory', async ({data, id}, thunkAPI) => {
    try {
        const response = await inventory.updateInventory(data, id);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        // throw error
        return thunkAPI.rejectWithValue(error.response.data);
    }
})


const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            // Create inventory
            .addCase(createInventory.pending, (state, action) => {
                state.isInventoryCreating = true;
                state.isInventoryCreated = false;
                state.isInventoryCreateError = false;
            })
            .addCase(createInventory.fulfilled, (state, action) => {
                state.isInventoryCreating = false;
                state.isInventoryCreated = true;
                state.isInventoryCreateError = false;
            })
            .addCase(createInventory.rejected, (state, action) => {
                state.isInventoryCreating = false;
                state.isInventoryCreated = false;
                state.isInventoryCreateError = true;
            })
            // update inventory
            .addCase(updateInventory.pending, (state, action) => {
                state.isInventoryUpdating = true;
                state.isInventoryUpdated = false;
                state.isInventoryUpdateError = false;
            })
            .addCase(updateInventory.fulfilled, (state, action) => {
                state.isInventoryUpdating = false;
                state.isInventoryUpdated = true;
                state.isInventoryUpdateError = false;
            })
            .addCase(updateInventory.rejected, (state, action) => {
                state.isInventoryUpdating = false;
                state.isInventoryUpdated = false;
                state.isInventoryUpdateError = true;
            })
    }
})

export default inventorySlice.reducer