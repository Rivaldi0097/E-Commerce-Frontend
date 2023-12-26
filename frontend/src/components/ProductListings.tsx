"use client";
import { useEffect, useState } from "react";
import { ProductModel } from "../models/productModel";
import "../styles/productListings.css";
import ProductStarReview from "./ProductStarReview";
import { useNavigate } from "react-router-dom";

interface HomeProductsProps {
  data: ProductModel[] | undefined;
  addToCart: (productId: string) => Promise<void>;
}

function ProductListings({ data, addToCart }: HomeProductsProps) {
  const [products, setProducts] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(
      <div className="ProductOuter">
        <div className="ProductInner">
          {data?.map((product: ProductModel, i: number) => {
            return (
              <div key={i} className="ProductContainer">
                <div
                  className="Product"
                  onClick={() =>
                    navigate(`/product/${product._id}`, { state: product })
                  }
                >
                  <div className="ImgContainer">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="ProductImg"
                    />
                  </div>

                  <div className="MaxLimit">
                    <div>
                      <p className="ProductNameSize textFont">
                        {product.title}
                      </p>
                    </div>

                    <div>
                      <p className="TextFont">${product.price}</p>
                    </div>
                  </div>
                </div>

                <div className="ReviewsAndButtonFlex">
                  <ProductStarReview
                    numberOfStars={Math.floor(product.rating.rate)}
                    numberOfReviews={product.rating.count}
                  />

                  <button
                    type="button"
                    className="Button"
                    onClick={() => {
                      addToCart(product._id);
                    }}
                  >
                    Add to cart!
                  </button>
                </div>
              </div>
            );
          })}
          <div className="ProductContainer ItemEmpty" />
        </div>
      </div>
    );
  }, [data]);

  return <>{products}</>;
}

export default ProductListings;
