"use client"
import { useEffect, useState } from 'react';
import { ProductModel } from "../models/productModel";
import { useGetProductsQuery } from "../redux/productSlice";
import "../styles/homeProducts.css"
import Button from './Button';
import ProductStarReview from './ProductStarReview';

interface HomeProductsProps{
    data: ProductModel[]
}

function HomeProducts({data}: HomeProductsProps) {
    
    // const { data, isLoading} = useGetProductsQuery(undefined);
    const [products, setProducts] =  useState<any>([])

    // useEffect(()=> {

    //     if(!isLoading ){
    //         console.log(data)
    //         setProducts(data)
    //     }else{
    //         setProducts([])
    //     }

    // }, [isLoading, data])

    useEffect(() => {
        setProducts(
            <div className='ProductFlex'>
                {data.map((product: ProductModel, i:number) => {
                    return(
                        <div key={i} className='ProductContainer'>
                            <div className='Product'>
                                <div className='ImgContainer'>
                                    <img src={product.image} alt={product.title} className='ProductImg'/>
                                </div>

                                <div className='MaxLimit'>
                                        <div>
                                            <p className='ProductNameSize textFont'>{product.title}</p>
                                        </div>

                                        <div>
                                            <p className='TextFont'>${product.price}</p>
                                        </div>

                                        {/* <p className='OverflowText'>{product.description}</p> */}
                                </div>
                            </div>


                            <ProductStarReview 
                                numberOfStars={Math.floor(product.rating.rate)}
                                numberOfReviews={product.rating.count}
                            />

                            <button type='button' className='Button'>
                                "Add to cart!"
                            </button>
                            
                        </div>
                    )
                })}
            </div>
        )
    }, [data])

    return (
        <>
            {products}
        </>
    );
}

export default HomeProducts;