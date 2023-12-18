"use client";

import { store } from "@/services/store";
import { Provider } from "react-redux";

export function AuthProvider({ children }) {
    return (
        <Provider store={store}>

            {children}
        </Provider>
    );
}
