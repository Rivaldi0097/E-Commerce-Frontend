import { useGetProductsQuery } from "../redux/productSlice";
import { ProductModel } from "../models/productModel";
import HomeProducts from "../components/HomeProducts";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function SearchResults() {
  const location = useLocation();
  const keyword = location.state;
  const [result, setResult] = useState<ProductModel[] | undefined>([]);
  console.log("keyword ", keyword);

  const { data: productsData, isSuccess: productsSuccess } =
    useGetProductsQuery([]);
  //   var results = productsData;

  useEffect(() => {
    setResult(
      productsData?.filter((product) =>
        product.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    console.log("results ", result);
  }, [keyword]);

  return (
    <div>
      <h2
        style={{
          backgroundColor: "#f5f6f6",
          textAlign: "center",
          margin: "0",
          padding: "20px",
        }}
      >
        Search results for "{keyword}"
      </h2>
      <HomeProducts data={result} />
    </div>
  );
}

export default SearchResults;
