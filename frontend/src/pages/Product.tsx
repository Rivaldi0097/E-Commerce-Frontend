"use client";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductReviews from "../components/ProductReviews";
import "../styles/productDetails.css";
import ProductStarReview from "../components/ProductStarReview";
import Truck from "../assets/truck.svg";
import Box from "../assets/box.svg";
import axios from "axios";
import Cookies from "universal-cookie";
import StatusModal from "../components/StatusModal";
import { isElementAccessExpression } from "typescript";

function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  const [quantity, setQuantity] = useState<number>(1);
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [status, setStatus] = useState<string>("");
  var cookies = new Cookies();

  useEffect(() => {
    document.documentElement.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const closeModal = () => {
    setShowModal(!showModal);
  };

  const addToCart = async () => {
    const cartId = cookies.get("cartId");
    if (cartId === null) {
      navigate("/login");
    } else {
      const res = await axios.patch(
        `${process.env.REACT_APP_HOSTNAME}/api/cart/${cartId}`,
        {
          product: product._id,
          quantity: quantity,
          increase: true,
        }
      );

      if (res.status === 200) {
        setShowModal(true);
        setStatus("Added to cart successfully!");
      } else {
        setShowModal(true);
        setStatus("Failed to add product to cart!");
      }
    }
  };

  const checkOut = () => {
    console.log("CHECKOUT");
    const userId = cookies.get("userId");
    if (userId === null) {
      navigate("/login");
    } else {
      const payload = {
        user: userId,
        products: [
          {
            product: product._id,
            quantity: quantity,
          },
        ],
        totalAmount: product.price * quantity,
      };

      axios
        .post(process.env.REACT_APP_HOSTNAME + "/api/orders", payload)
        .then((res) => {
          if (res.status === 201) {
            navigate("/order");
          }
        });
    }
  };

  return (
    <div className="PageContainer">
      {showModal && <StatusModal status={status} setClose={closeModal} />}
      <p className="ProductPath">
        Products / <span className="CurrentProduct">{product.category}</span>
      </p>

      <div className="Flexbox">
        <div className="ProductImage">
          <img src={product.image} alt={product.title} className="ImageSize" />
        </div>
      </div>

      <div className="ProductDetails">
        <h2 style={{ margin: "20px 40px 0px 0px" }}>{product.title}</h2>

        <hr className="SolidDivider" />

        <h2>
          ${product.price} or ${(product.price / 6).toFixed(2)} / month
        </h2>
        <p>Suggested payment term of 6 months</p>

        <ProductStarReview
          numberOfStars={product.rating.rate}
          numberOfReviews={product.rating.count}
        />

        <hr className="SolidDivider" />

        <div className="DeliveryBox">
          <div className="IconFlex">
            <img src={Truck} alt="truck" className="Icon" />
            <span style={{ fontWeight: "bold" }}>Free Delivery</span>
          </div>
          <p>Enter your postal code for delivery options.</p>

          <hr className="DeliveryDivider" />

          <div className="IconFlex">
            <img src={Box} alt="truck" className="Icon" />
            <span style={{ fontWeight: "bold" }}>Free Return</span>
          </div>
          <p>Free 30 days delivery return.</p>
        </div>

        <div className="QuantityBox">
          <div>
            <button onClick={() => setQuantity(quantity - 1)}>-</button>
          </div>

          <div>
            <input
              className="QuantityValue"
              type="text"
              value={quantity}
              onChange={() => setQuantity(quantity)}
            />
          </div>

          <div>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        <div className="ButtonFlexBox">
          <button className="BuyButton" onClick={checkOut}>
            Buy Now
          </button>
          <button className="BuyButton" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="ProductDescription">
        <h2>Product Description</h2>
        <p style={{ lineHeight: "200%" }}>{product.description}</p>
      </div>

      <div className="ProductReviews">
        <h2>Product Reviews</h2>
        <ProductReviews />
      </div>

      {/* <button onClick={()=>navigate("/")}>Back to home page</button> */}
    </div>
  );
}

export default Product;
