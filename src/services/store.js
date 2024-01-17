"use client"
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import countrySlice from "./features/countrySlice";
import userSlice from "./features/userSlice";
import productSlice from "./features/productSlice";
// import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        countries: countrySlice,
        users: userSlice,
        products: productSlice
        // middleware: [thunk],
    }
})