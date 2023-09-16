import CartTable from "../components/CartTable";
import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  interface cart {
    product: {
      image: string;
      price: number;
      title: string;
      _id: string;
    };
    quantity: number;
  }
  const [cartData, setCartData] = useState<cart[]>([]);
  useEffect(() => {
    axios
      .get(`http://3.27.117.173:5001/api/cart/64e3697c0c5c619172d73c11`)
      .then((res) => {
        console.log(res.data.products);
        setCartData(res.data.products);
        console.log("cartData", cartData);
      });
  }, []);
  // return <div />;
  return (
    <>
      <CartTable cartData={cartData} setCartData={setCartData}></CartTable>
    </>
  );
}

export default Cart;
