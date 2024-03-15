"use client";

import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function ToastProvider({ children }) {
    return (
        <>
            {children}
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                style={{ fontSize: '14px' }}
            /> */}

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ fontSize: '14px' }}
                theme="dark"
                // transition:Bounce
            />
        </>
    );
}