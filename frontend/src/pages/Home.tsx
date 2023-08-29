"use client"

import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useGetProductCategoriesQuery } from "../redux/productSlice";
import HomeProducts from "../components/HomeProducts";
import Navbar from "../components/Navbar";

function Home() {

    const [productCategories, setProductCategories] = useState<any>([]);
    const { data, isLoading } = useGetProductCategoriesQuery(undefined);


    useEffect(()=> {

        if(!isLoading){
            setProductCategories(data)
        }else{
            setProductCategories([])
        }

    }, [isLoading, data])

    return (
        <div>
                <Navbar></Navbar>
        
                <h2> Best Products For you!</h2>

                {productCategories.map((categoryName: string) => {
                    return(
                        <Button
                            key={categoryName}
                            buttonWord={categoryName}
                        />
                    )
                })}

                <HomeProducts />
        </div>
    );
}

export default Home;
