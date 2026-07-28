"use client";
import { useEffect, useState } from "react";
import { ProductModel } from "../models/productModel";
import "../styles/productListings.css"
import ProductStarReview from './ProductStarReview';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'universal-cookie';

interface HomeProductsProps {
  data: ProductModel[] | undefined;
  addToCart: (productId: string) => Promise<void>;
}

function ProductListings({data}: HomeProductsProps) {
    
    var cookies = new Cookies();
    const userId = cookies.get('userId');
    const [products, setProducts] =  useState<any>([])
    const [cartId, setCartId] = useState<string>("")
    const navigate = useNavigate();

    useEffect(() => {

        if (!userId) return;
        const getCartId = async () => {

            await axios.get(`${process.env.REACT_APP_HOSTNAME}/api/cart/${userId}`)
            .then((res) => {
                console.log("card data", res.data)
                console.log('cartid', res.data._id)
                setCartId(res.data._id)
            })
            .catch((err) => {
                console.log("err from getting cart data", err)
            })

        }

        getCartId()
        
    }, [userId])

    const addToCart = async (
        productId: string
    ) => {
        if(localStorage.getItem("userId") === null){
            navigate('/login')
        }else{
            
            console.log("adding to cart")
            console.log('cartId', cartId)

            const payload = {
                product: productId,
                quantity: 1,
                increase: true
            }

            await axios.patch(`${process.env.REACT_APP_HOSTNAME}/api/cart/${cartId}`, payload)
            .then((res) => {
                console.log('response from adding to cart', res)
            })
            .catch((err) => {
                console.log("error from adding to cart", err)
            })

        }
    }

    return (
        <div className='ProductOuter'>
            <div className='ProductInner'>
                {data?.map((product: ProductModel, i: number) => (
                    <div key={i} className='ProductContainer'>
                        <div 
                            className='Product' 
                            onClick={() => navigate(`/product/${product._id}`, { state: product })}
                        >
                            <div className='ImgContainer'>
                                <img src={product.image} alt={product.title} className='ProductImg' />
                            </div>

                            <div className='MaxLimit'>
                                <div>
                                    <p className='ProductNameSize textFont'>{product.title}</p>
                                </div>
                                <div>
                                    <p className='TextFont'>${product.price}</p>
                                </div>
                            </div>
                        </div>

                        <div className='ReviewsAndButtonFlex'>
                            <ProductStarReview 
                                numberOfStars={Math.floor(product.rating.rate)}
                                numberOfReviews={product.rating.count}
                            />

                            <button 
                                type='button' 
                                className='Button'
                                onClick={() => addToCart(product._id)}
                            >
                                Add to cart!
                            </button>
                        </div>
                    </div>
                ))}
                <div className='ProductContainer ItemEmpty' />
            </div>
        </div>
    );
}

export default ProductListings;
