import Electronics from "../assets/headphone.avif";
import Jewelery from "../assets/jewelry.jpg";
import WomenClothing from "../assets/womens-clothing.jpg";
import MenClothing from "../assets/mens-clothing.jpg";
import { ProductModel } from "../models/productModel";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../redux/productSlice";
import ProductListings from "../components/ProductListings";
import "../styles/categoryProducts.css";

function CategoryProducts() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [imgSrc, setImgSrc] = useState<any>(undefined);
  const [products, setProducts] = useState<ProductModel[] | undefined>([]);
  const { data: AllProductsData, isSuccess: AllProductsSuccess } =
    useGetProductsQuery([]);

  useEffect(() => {
    if (AllProductsSuccess) {
      setProducts(
        AllProductsData.filter((products) => products.category === categoryName)
      );
    }

    if (categoryName === "men's clothing") {
      setImgSrc(MenClothing);
    } else if (categoryName === "women's clothing") {
      setImgSrc(WomenClothing);
    } else if (categoryName === "electronics") {
      setImgSrc(Electronics);
    } else if (categoryName === "jewelery") {
      setImgSrc(Jewelery);
    }
  }, [categoryName]);

  return (
    <>
      {/* <div className="img__container"> */}
      {/* <img src={Electronics}></img> */}
      {/* <img src={Jewelry}></img>
        <img src={WomenClothing}></img>
        <img src={MenClothing}></img> */}
      <div className="img__text" style={{ backgroundImage: `url(${imgSrc})` }}>
        <div>{categoryName}</div>
      </div>
      <br />
      {/* </div> */}
      <ProductListings data={products} />
    </>
  );
}

export default CategoryProducts;
