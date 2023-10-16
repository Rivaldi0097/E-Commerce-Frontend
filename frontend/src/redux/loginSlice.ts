import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import Cookies from 'universal-cookie';
var cookies = new Cookies();

interface Login {
    _id: string,
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    email: string,
    sessionId: string
}

interface LoginProps{
    username: string,
    password: string
}

export const loginSlice = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_HOSTNAME
    }),
    tagTypes: ['Login'],
    endpoints: (builder) => ({
        getLogin: builder.mutation<Login, LoginProps>({
            query: (obj) => ({
                url: '/api/users/login',
                method:'POST',
                body: obj,
                credentials:'include',
                cookie: cookies.get('userId')
            }),
            async onQueryStarted(obj, {queryFulfilled}){
                queryFulfilled.then((res) => {
                    // localStorage.setItem("userId", res.data._id)
                    // console.log(res)
                    cookies.set('sessionId', res.data.sessionId, {
                        path:'/',
                        secure: true,
                        maxAge:  60 * 60 * 1000,
                        sameSite: 'none'
                    });
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
    })
})

export const {
    useGetLoginMutation,
} = loginSlice