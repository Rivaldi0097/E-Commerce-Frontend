import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { UserModel } from "../models/userModel";

interface UserProps{
    userId: string
}

interface UserModelReturn {
    _id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNum: number,
    address:{
        street: string,
        city: string,
        state: string,
        zip: number
    }
}

export const userSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_HOSTNAME
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.query<UserModelReturn, UserProps>({
            query: (userId) => ({
                url: `/api/users/${userId}`,
                method: 'GET',
            }),
            providesTags: ['User']
        }),

        updateUser: builder.mutation<UserModelReturn, UserModel>({
            query:(obj) => ({
                url: '/api/users/updateUser',
                method: 'PATCH',
                body: obj,
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {
    useGetUserQuery,
    useUpdateUserMutation
} = userSlice