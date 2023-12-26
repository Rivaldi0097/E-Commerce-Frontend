import Electronics from "../assets/headphone.avif";
import Jewelery from "../assets/jewelry.jpg";
import WomenClothing from "../assets/womens-clothing.jpg";
import MenClothing from "../assets/mens-clothing.jpg";
import { ProductModel } from "../models/productModel";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../redux/productSlice";
import ProductListings from "../components/ProductListings";
import "../styles/categoryProducts.css";
import StatusModal from "../components/StatusModal";
import axios from "axios";
import Cookies from "universal-cookie";

function CategoryProducts() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [imgSrc, setImgSrc] = useState<any>(undefined);
  const [products, setProducts] = useState<ProductModel[] | undefined>([]);
  const { data: AllProductsData, isSuccess: AllProductsSuccess } =
    useGetProductsQuery([]);
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [status, setStatus] = useState<string>("");
  var cookies = new Cookies();
  const navigate = useNavigate();

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

    document.documentElement.style.overflow = showModal ? "hidden" : "auto";
  }, [categoryName, showModal]);

  const closeModal = () => {
    console.log("close modal");
    setShowModal((showModal) => !showModal);
    console.log(showModal);
  };

  const addToCart = async (productId: String) => {
    if (cookies.get("userId") === null) {
      navigate("/login");
    } else {
      const cartId = cookies.get("cartId");
      const res = await axios.patch(
        `${process.env.REACT_APP_HOSTNAME}/api/cart/${cartId}`,
        {
          product: productId,
          quantity: 1,
          increase: true,
        }
      );

      console.log(res.status);

      if (res.status === 200) {
        console.log(showModal);
        setShowModal((showModal) => !showModal);
        console.log(showModal);

        setStatus("Added to cart successfully!");
      } else {
        setShowModal((showModal) => !showModal);
        setStatus("Failed to add product to cart!");
      }
    }
  };

  return (
    <>
      <div className="img__text" style={{ backgroundImage: `url(${imgSrc})` }}>
        <div>{categoryName}</div>
      </div>
      <br />
      {showModal && <StatusModal status={status} setClose={closeModal} />}

      <ProductListings data={products} addToCart={addToCart} />
    </>
  );
}

export default CategoryProducts;
