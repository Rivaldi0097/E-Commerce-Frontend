import { useGetProductsQuery } from "../redux/productSlice";
import { ProductModel } from "../models/productModel";
import ProductListings from "../components/ProductListings";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SearchResults() {
  const { keyword } = useParams<{ keyword: string }>();
  const [result, setResult] = useState<ProductModel[] | undefined>([]);
  const navigate = useNavigate();
  const { data: productsData } = useGetProductsQuery([]);

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
  }, [keyword]);

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
        <ProductListings data={result} />
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
