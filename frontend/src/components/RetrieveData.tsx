import { Outlet } from "react-router-dom";
import { store } from "../redux/store";
import { useEffect } from "react";
import { productSlice } from "../redux/productSlice";

function RetrieveData() {

    useEffect(()=>{
        //https://egghead.io/lessons/redux-prefetch-data-in-rtk-query-using-an-endpoint-s-initiate-method

        store.dispatch(productSlice.endpoints.getProductCategories.initiate(undefined))
        store.dispatch(productSlice.endpoints.getProducts.initiate(undefined))

    }, [])

    return <Outlet/>
}

export default RetrieveData;