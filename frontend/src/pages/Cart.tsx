import CartTable from "../components/CartTable";

function Cart() {
  // interface cart {
  //   product: {
  //     image: string;
  //     price: number;
  //     title: string;
  //     _id: string;
  //   };
  //   quantity: number;
  // }

  // const [cartData, setCartData] = useState<cart[]>([]);
  // const [cartId, setCartId] = useState<string>("");

  // useEffect(() => {
  //   axios
  //     .get(`http://3.27.117.173:5001/api/cart/64e3697c0c5c619172d73c11`)
  //     .then((res) => {
  //       setCartData(res.data.products);
  //       console.log("cartData", cartData);
  //       setCartId(res.data._id);
  //       console.log("cartId", cartId);
  //     });
  // }, [cartData]);
  // return <div />;
  return (
    <>
      <CartTable
      // cartData={cartData}
      // setCartData={setCartData}
      // cartId={cartId}
      ></CartTable>
    </>
  );
}

export default Cart;
