"use client"
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import countrySlice from "./features/countrySlice";
import userSlice from "./features/userSlice";
import productSlice from "./features/productSlice";
import brandSlice from "./features/brandSlice";
import categorySlice from "./features/categorySlice";
import inventorySlice from "./features/inventorySlice";
import cartSlice from "./features/cartSlice";

// import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        countries: countrySlice,
        users: userSlice,
        products: productSlice,
        brands:  brandSlice,
        categories: categorySlice,
        inventory: inventorySlice,
        cart: cartSlice
        // middleware: [thunk],
    }
})