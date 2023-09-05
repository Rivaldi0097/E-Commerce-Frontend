import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ProductModel } from "../models/productModel";

export const productSlice = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_HOSTNAME}),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        //https://stackoverflow.com/questions/25469244/how-can-i-define-an-interface-for-an-array-of-objects
        getProducts: builder.query<ProductModel[], []>({
            query: () => ({
                url: '/api/products/'
            }),
            providesTags:['Products']
        }),

        getProductCategories: builder.query<string[], []>({
            query: () => ({
                url: '/api/products/productCategories/'
            })
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductCategoriesQuery
} = productSlice