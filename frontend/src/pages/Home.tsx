"use client"

import { useEffect, useState } from "react";
import CategoriesButton from "../components/Button";
import { useGetProductCategoriesQuery, useGetProductsQuery } from "../redux/productSlice";
import ProductListings from "../components/ProductListings";
import { ProductModel } from "../models/productModel";
import Slider from "../components/Slider";

function Home() {

    const [filteredProducts, setFilteredProducts] = useState<ProductModel[] | undefined>([]);
    const { data: categoriesData, isLoading: categoriesLoading } = useGetProductCategoriesQuery([]);
    const { data: productData, isLoading:productLoading} = useGetProductsQuery([]);
    const [selectedCategories, setSelectedCategories] = useState<string>("all");


    useEffect(() => {
        if(selectedCategories === "all"){
            setFilteredProducts(productData)
        }else{
            const filteredProduct = productData?.filter((obj:any) => obj.category === selectedCategories);
            setFilteredProducts(filteredProduct)
            
        }

    }, [selectedCategories, productData])


    return (
        <>

            <Slider />
            
            <>

                <div className="HomeProductFlex">
                    <h2> Best Products For you!</h2>
                </div>

                <div className="HomeProductFlex">
                    <CategoriesButton 
                        key={"all"}
                        id={"all"}
                        buttonWord={"all"}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                    
                    {categoriesData?.map((categoryName: string) => {
                        return(
                            <CategoriesButton
                                key={categoryName}
                                id={categoryName}
                                buttonWord={categoryName}
                                //to set the selected category
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                            />
                        )
                    })}
                </div>

                <ProductListings 
                    data={filteredProducts}
                />

            </>
        </>
    );
}

export default Home;
