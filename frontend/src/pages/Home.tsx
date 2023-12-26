"use client";

import { useEffect, useState } from "react";
import CategoriesButton from "../components/Button";
import {
  useGetProductCategoriesQuery,
  useGetProductsQuery,
} from "../redux/productSlice";
import { useNavigate } from "react-router-dom";
import ProductListings from "../components/ProductListings";
import { ProductModel } from "../models/productModel";
import Slider from "../components/Slider";
import StatusModal from "../components/StatusModal";
import axios from "axios";
import Cookies from "universal-cookie";

function Home() {
  const [filteredProducts, setFilteredProducts] = useState<
    ProductModel[] | undefined
  >([]);
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetProductCategoriesQuery([]);
  const { data: productData, isLoading: productLoading } = useGetProductsQuery(
    []
  );
  const [selectedCategories, setSelectedCategories] = useState<string>("all");
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [status, setStatus] = useState<string>("");
  var cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategories === "all") {
      setFilteredProducts(productData);
    } else {
      const filteredProduct = productData?.filter(
        (obj: any) => obj.category === selectedCategories
      );
      setFilteredProducts(filteredProduct);
    }

    document.documentElement.style.overflow = showModal ? "hidden" : "auto";
  }, [selectedCategories, productData, showModal]);

  const closeModal = () => {
    setShowModal((showModal) => !showModal);
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
      <Slider />

      {showModal && <StatusModal status={status} setClose={closeModal} />}

      <div className="HomeProductFlex">
        <h2> Best Products For you!</h2>
      </div>

      <div className="HomeProductFlex">
        <CategoriesButton
          key={"all"}
          id={"all"}
          buttonWord={"all"}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        {categoriesData?.map((categoryName: string) => {
          return (
            <CategoriesButton
              key={categoryName}
              id={categoryName}
              buttonWord={categoryName}
              //to set the selected category
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          );
        })}
      </div>

      <ProductListings data={filteredProducts} addToCart={addToCart} />
    </>
  );
}

export default Home;
