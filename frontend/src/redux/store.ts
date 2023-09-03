import {configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../redux/productSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer:{
        [productSlice.reducerPath]: productSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat([productSlice.middleware])
})

setupListeners(store.dispatch)