import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ProductModel } from "../models/productModel";

export const productSlice = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_HOSTNAME}),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductModel, undefined>({
            query: () => ({
                url: '/api/products/'
            }),
            providesTags:['Products']
        }),

        getProductCategories: builder.query<string[], undefined>({
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