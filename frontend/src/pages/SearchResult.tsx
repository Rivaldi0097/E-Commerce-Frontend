import { useGetProductsQuery } from "../redux/productSlice";
import { ProductModel } from "../models/productModel";
import HomeProducts from "../components/HomeProducts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SearchResults() {
  // const location = useLocation();
  // const keyword = location.state;
  // type QueryParams = {
  //   keyword: string;
  // };
  const { keyword } = useParams<{ keyword: string }>();
  const [result, setResult] = useState<ProductModel[] | undefined>([]);
  const navigate = useNavigate();
  // var content = <></>;
  const { data: productsData } = useGetProductsQuery([]);

  useEffect(() => {
    console.log("keyword ", keyword);

    if (keyword !== undefined) {
      setResult(
        productsData?.filter((product) =>
          product.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      console.log("results ", result);
    } else {
      navigate("/");
    }
  }, [keyword]);

  // {
  //   result && result.length > 0
  //     ? (content = (
  //         <>
  //           <h2
  //             style={{
  //               backgroundColor: "#f5f6f6",
  //               textAlign: "center",
  //               margin: "0",
  //               padding: "20px",
  //             }}
  //           >
  //             Search results for "{keyword}"
  //           </h2>
  //           <HomeProducts data={result} />
  //         </>
  //       ))
  //     : (content = (
  //         <>
  //           <h2
  //             style={{
  //               backgroundColor: "#f5f6f6",
  //               textAlign: "center",
  //               margin: "0",
  //               padding: "20px",
  //             }}
  //           >
  //             No products found
  //           </h2>
  //         </>
  //       ));
  // }

  const content =
    result && result.length > 0 ? (
      <>
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
      </>
    ) : (
      <>
        <div
          style={{
            backgroundColor: "#f5f6f6",
            textAlign: "center",
            margin: "0",
            padding: "20px",
            // height: "100%",
            height: "calc(100vh - 5vh)",
            display: "flex",
            flexFlow: "column",
          }}
        >
          No products found
        </div>
      </>
    );

  return content;
}

export default SearchResults;
