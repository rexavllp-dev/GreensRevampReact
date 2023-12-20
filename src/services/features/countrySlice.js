"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { countries } from "../actions/countries";

const initialState = {
    isCountriesLoading: false,
    isCountriesLoaded: false,
    isCountriesLoadError:false,
    allCountries: []

}

export const getAllCountries = createAsyncThunk('getAllCountries', async () => {
    try {
        const response = await countries.getAllCountries();
        return response.data
    } catch (error) {
        return error.response.data;
    }
})

const countrySlice = createSlice({
    name: "countries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getAllCountries.pending, (state, action) => {
                state.isCountriesLoading = true;
                state.isCountriesLoaded = false;
                state.isCountriesLoadError = false;
            })

            .addCase(getAllCountries.fulfilled, (state, action) => {
                state.isCountriesLoading = false;
                state.isCountriesLoaded = true;
                state.isCountriesLoadError = false;
                state.allCountries = action.payload;
            })

            .addCase(getAllCountries.rejected, (state, action) => {
                state.isCountriesLoading = false;
                state.isCountriesLoaded = false;
                state.isCountriesLoadError = true;
            })

    }
})

export default countrySlice.reducer