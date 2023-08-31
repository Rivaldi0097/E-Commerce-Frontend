"use client"

import { useEffect, useState } from "react";
import CategoriesButton from "../components/Button";
import { useGetProductCategoriesQuery, useGetProductsQuery } from "../redux/productSlice";
import HomeProducts from "../components/HomeProducts";
import Navbar from "../components/Navbar";

function Home() {

    const [productCategories, setProductCategories] = useState<any>([]);
    const [products, setProducts] = useState<any>([]);
    const [filteredProducts, setFilteredProducts] = useState<any>([]);
    const { data: categoriesData, isLoading: categoriesLoading } = useGetProductCategoriesQuery(undefined);
    const { data: productData, isLoading:productLoading} = useGetProductsQuery(undefined);
    const [selectedCategories, setSelectedCategories] = useState<string>("all");

    useEffect(()=> {

        if(!categoriesLoading && !productLoading){
            setProductCategories(categoriesData)
            setProducts(productData)
            setFilteredProducts(productData)
        }else{
            setProductCategories([])
            setProducts([])
        }

    }, [categoriesLoading, productLoading, categoriesData, productData])

    useEffect(() => {
        

        if(selectedCategories === "all"){
            setFilteredProducts(products)
        }else{
            const filteredProduct = products?.filter((obj:any) => obj.category === selectedCategories);
            setFilteredProducts(filteredProduct)
            
        }



    }, [selectedCategories])


    return (
        <>
            <Navbar/>
            
            <div className="ProductFlex">
                <h2> Best Products For you!</h2>
            </div>

            <div className="ProductFlex">
                <CategoriesButton 
                    key={"all"}
                    id={"all"}
                    buttonWord={"all"}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                />
                
                {productCategories.map((categoryName: string) => {
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

            <HomeProducts 
                data={filteredProducts}
            />
        </>
    );
}

export default Home;
