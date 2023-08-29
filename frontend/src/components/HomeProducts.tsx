"use client"
import { useEffect, useState } from 'react';
import { ProductModel } from "../models/productModel";
import { useGetProductsQuery } from "../redux/productSlice";
import Button from './Button';

function HomeProducts() {
    
    const { data, isLoading} = useGetProductsQuery(undefined);
    const [products, setProducts] =  useState<any>([])

    useEffect(()=> {

        if(!isLoading ){
            setProducts(data)
        }else{
            setProducts([])
        }

    }, [isLoading, data])

    return (
        <div className='ProductFlex'>
            {products.map((product: ProductModel, i:number) => {
                return(
                    <div className='ProductContainer'>
                        <div key={i} className='Product'>
                            <div className='ImgContainer'>
                                <img src={product.image} alt={product.title} className='ProductImg'/>
                            </div>

                            <div className='MaxLimit'>
                                    <div>
                                        <p className='ProductNameSize textFont'>{product.title}</p>
                                    </div>

                                    <div>
                                        <p className='textFont'>${product.price}</p>
                                    </div>

                                    {/* <p className='OverflowText'>{product.description}</p> */}
                            </div>
                        </div>

                        
                        <Button
                            buttonWord="Add to cart!"
                        />
                    </div>
                )
            })}
        </div>
    );
}

export default HomeProducts;