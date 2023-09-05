import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/productDetails.css";
import ProductStarReview from '../components/ProductStarReview';
import Truck from "../assets/truck.svg";
import Box from "../assets/box.svg";

function Product() {

    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state;
    // console.log(location.state)

    return (
        <div>
            <p className="ProductPath">Products / <span className='CurrentProduct'>{product.category}</span></p>

            <div className="PageContainer">

                <div className='ImageBox'>
                    <div className='ProductImage'>
                        <img src={product.image} alt={product.title}  className='ImageSize'/>
                    </div>

                    {/* <div className='AlternativeProductBox'>
                        <div className='AlternativeProductImage'>
                            <img src={product.image} alt={product.title}  className='AlternativeImageSize'/>
                        </div>

                        <div className='AlternativeProductImage'>
                            <img src={product.image} alt={product.title}  className='AlternativeImageSize'/>
                        </div>
                    </div> */}
                </div>
                
                <div className='ProductDetails'>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    
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

                    <div className='ButtonFlexBox'>

                        <button className='Button'>Buy Now!</button>
                        <br/>
                        <button className='Button'>Add to Cart!</button>

                    </div>
                </div>

                
            </div>

            <button onClick={()=>navigate("/")}>Back to home page</button>
        </div>
    );
}

export default Product;