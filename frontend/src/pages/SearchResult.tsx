import { useGetProductsQuery } from "../redux/productSlice";
import { ProductModel } from "../models/productModel";
import ProductListings from "../components/ProductListings";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StatusModal from "../components/StatusModal";
import axios from "axios";
import Cookies from "universal-cookie";

function SearchResults() {
  const { keyword } = useParams<{ keyword: string }>();
  const [result, setResult] = useState<ProductModel[] | undefined>([]);
  const navigate = useNavigate();
  const { data: productsData } = useGetProductsQuery([]);
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [status, setStatus] = useState<string>("");
  var cookies = new Cookies();

  useEffect(() => {
    if (keyword !== undefined) {
      setResult(
        productsData?.filter((product) =>
          product.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    } else {
      navigate("/");
    }
    document.documentElement.style.overflow = showModal ? "hidden" : "auto";
  }, [keyword, showModal]);

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

  const content =
    result && result.length > 0 ? (
      <>
        <h2
          style={{
            backgroundColor: "#f5f6f6",
            textAlign: "center",
            margin: "2vw 10vw 0px 10vw",
            padding: "20px 20px 0px 20px",
          }}
        >
          Search results for "{keyword}"
        </h2>

        {showModal && <StatusModal status={status} setClose={closeModal} />}

        <ProductListings data={result} addToCart={addToCart} />
      </>
    ) : (
      <>
        <div
          style={{
            backgroundColor: "#f5f6f6",
            textAlign: "center",
            margin: "0",
            flexGrow: "1",
            paddingTop: "20px",
            height: "calc(100vh - 5vh - 40px)",
          }}
        >
          No products found
        </div>
      </>
    );

  return content;
}

export default SearchResults;
