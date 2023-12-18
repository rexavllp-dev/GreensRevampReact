"use client"
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
// import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        // middleware: [thunk],
    }
})