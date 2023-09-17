import {configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../redux/productSlice";
import { loginSlice } from "./loginSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer:{
        [productSlice.reducerPath]: productSlice.reducer,
        [loginSlice.reducerPath]: loginSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat([
        productSlice.middleware,
        loginSlice.middleware,
    ])
})

setupListeners(store.dispatch)