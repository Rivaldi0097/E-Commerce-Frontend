"use client"

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductReviews from '../components/ProductReviews';
import "../styles/productDetails.css";
import ProductStarReview from '../components/ProductStarReview';
import Truck from "../assets/truck.svg";
import Box from "../assets/box.svg";

function Product() {

    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state;
    const [quantity, setQuantity] = useState<number>(0);
    // console.log(location.state)

    return (
        <div className="PageContainer">
            <p className="ProductPath">Products / <span className='CurrentProduct'>{product.category}</span></p>
            
            <div className='Flexbox'>
                <div className='ProductImage'>
                    <img src={product.image} alt={product.title}  className='ImageSize'/>
                </div>
            </div>
            
            <div className='ProductDetails'>
                <h1>{product.title}</h1>

                
                <hr className='SolidDivider' />

                <h2>${product.price} or ${(product.price/6).toFixed(2)} / Month</h2>
                <p>Suggested payment term of 6 months</p>

                <ProductStarReview
                    numberOfStars={product.rating.rate}
                    numberOfReviews={product.rating.count}
                />

                <hr className='SolidDivider' />



                <div className='DeliveryBox'>
                    <div>
                        <img src={Truck} alt="truck" className='Icon'/>
                        <span>Free Delivery</span>
                        <p>Enter your postal code for delivery options.</p>
                    </div>

                    <hr className='DeliveryDivider' />

                    <div>
                        <img src={Box} alt="truck" className='Icon'/>Free Return
                        <p>Free 30 days delivery return.</p>
                    </div>
                </div>

                <div className='QuantityBox'>
                    <div>
                        <button
                            onClick={()=>setQuantity(quantity-1)}
                        >
                            -
                        </button>
                    </div>

                    <div>
                        <input
                            className='QuantityValue'
                            type='number'
                            value={quantity}
                            onChange={() => setQuantity(quantity)}
                        />
                    </div>

                    <div>
                        <button
                            onClick={()=>setQuantity(quantity+1)}
                        >
                                +
                        </button>
                    </div>
                </div>

                <div className='ButtonFlexBox'>

                    <button className='BuyButton'>Buy Now</button>
                    <button className='BuyButton'>Add to Cart</button>

                </div>
            </div>

            

            <div className='ProductDescription'>
                <h2>Product Description</h2>
                <p>{product.description}</p>
            </div>

            <div className='ProductReviews'>
                <h2>Product Reviews</h2>
                <ProductReviews />
            </div>






            {/* <button onClick={()=>navigate("/")}>Back to home page</button> */}
        </div>
    );
}

export default Product;