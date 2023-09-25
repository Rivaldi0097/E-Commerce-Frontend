import "../styles/cartTable.css";
import Delete from "../assets/delete.svg";
import Checkout from "../assets/checkout.svg";
import axios from "axios";
import { useState, useEffect } from "react";

// interface IProductData {
//   product: {
//     image: string;
//     price: number;
//     title: string;
//     _id: string;
//   };
//   quantity: number;
// }

// type cart = {
//   cartId: string;
//   cartData: IProductData[];
//   setCartData: React.Dispatch<React.SetStateAction<IProductData[]>>;
// };

// function CartTable({ cartId, cartData, setCartData }: cart) {
//   var total = 0;
//   const removeProduct = (productId: string) => {
//     axios
//       .delete(`http://3.27.117.173:5001/api/cart/${cartId}`, {
//         data: {
//           product: productId,
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         setCartData(res.data.products);
//       });
//     console.log("removes ", productId);
//   };
//   return (
//     <>
//       <h2 className="cart__title">Your Cart</h2>
//       <div className="cart__container">
//         <table className="cart__table">
//           <tr>
//             {/* <th colSpan={2}>Product</th> */}
//             <th>Product</th>
//             <th>Unit Price</th>
//             <th>Quantity</th>
//             <th>Total Price</th>
//             <th>Actions</th>
//           </tr>
//           {cartData.map((data) => {
//             total += data.quantity * data.product.price;
//             return (
//               <tr className="cart__row" key={data.product._id}>
//                 <td>
//                   <div className="product__container">
//                     <div className="product__image__container">
//                       <img
//                         src={data.product.image}
//                         className="product__image"
//                       />
//                     </div>
//                     <div className="product__title">{data.product.title}</div>
//                   </div>
//                 </td>
//                 {/* <td> {data.product.title}</td> */}
//                 <td>$ {data.product.price}</td>
//                 <td>
//                   <button className="decrease__button">-</button>
//                   {data.quantity}
//                   <button className="increase__button">+</button>
//                 </td>
//                 <td>$ {data.quantity * data.product.price}</td>
//                 <td>
//                   <img
//                     className="delete__icon"
//                     src={Delete}
//                     onClick={() => {
//                       removeProduct(data.product._id);
//                     }}
//                   ></img>
//                 </td>
//               </tr>
//             );
//           })}
//           <tr className="total__row">
//             <td colSpan={2}></td>
//             <td> Total </td>
//             <td colSpan={2}>$ {total}</td>
//           </tr>
//           <tr>
//             <td colSpan={3}></td>
//             <td colSpan={2} className="checkout__row">
//               <button className="checkout__button">
//                 <img className="checkout__icon" src={Checkout} />
//                 Check out
//               </button>
//             </td>
//           </tr>
//         </table>
//       </div>
//     </>
//   );
// }

// interface IProductData {
//   product: {
//     image: string;
//     price: number;
//     title: string;
//     _id: string;
//   };
//   quantity: number;
// }

// type cart = {
//   cartId: string;
//   cartData: IProductData[];
//   setCartData: React.Dispatch<React.SetStateAction<IProductData[]>>;
// };

type cart = {
  product: {
    image: string;
    price: number;
    title: string;
    _id: string;
  };
  quantity: number;
};

function CartTable() {
  const [cartData, setCartData] = useState<cart[]>([]);
  const [cartId, setCartId] = useState<string>("");
  var total = 0;

  const getCartData = () => {
    axios
      .get(`http://3.27.117.173:5001/api/cart/64e3697c0c5c619172d73c11`)
      .then((res) => {
        setCartData(res.data.products);
        console.log("cartData", cartData);
        setCartId(res.data._id);
        console.log("cartId", cartId);
      });
  };

  useEffect(() => {
    getCartData();
  }, []);

  // useEffect(() => {}, [cartData]);

  const updateQty = (productId: string, type: string) => {
    var typeBool = type === "increase" ? true : false;
    var payload = {
      product: productId,
      quantity: 1,
      increase: typeBool,
    };

    // if (type === "increase") {
    //   console.log("increase ", productId);
    //   typeBool = true;
    // } else {
    //   console.log("decrease ", productId);
    //   typeBool = false;
    // }

    axios
      .patch(`http://3.27.117.173:5001/api/cart/${cartId}`, payload)
      .then((res) => {
        console.log(res.data);
        setCartData(res.data.products);
      });
  };

  // const decreaseQty = (productId: string, type: string) => {
  //   console.log("decrease ", productId);
  //   axios
  //     .patch(`http://3.27.117.173:5001/api/cart/${cartId}`, {
  //       data: {
  //         product: productId,
  //       },
  //     })
  //     .then((res) => {
  //       setCartData(
  //         cartData.filter((product) => {
  //           console.log(product);
  //           return product.product._id !== productId;
  //         })
  //       );
  //     });
  // };

  const removeProduct = (productId: string) => {
    axios
      .delete(`http://3.27.117.173:5001/api/cart/${cartId}`, {
        data: {
          product: productId,
        },
      })
      .then((res) => {
        console.log(res);
        // setCartData(
        //   cartData.filter((product) => {
        //     console.log(product);
        //     return product.product._id !== productId;
        //   })
        // );
        setCartData(res.data.products);
      });
    console.log("removes ", productId);
  };

  return (
    <>
      <h2 className="cart__title">Your Cart</h2>
      <div className="cart__container">
        <table className="cart__table">
          <tr>
            {/* <th colSpan={2}>Product</th> */}
            <th>Product</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
          {cartData.map((data) => {
            var eachProdTotal = data.quantity * data.product.price;
            total += eachProdTotal;
            return (
              <tr className="cart__row" key={data.product._id}>
                <td>
                  <div className="product__container">
                    <div className="product__image__container">
                      <img
                        src={data.product.image}
                        className="product__image"
                      />
                    </div>
                    <div className="product__title">{data.product.title}</div>
                  </div>
                </td>
                {/* <td> {data.product.title}</td> */}
                <td>$ {data.product.price}</td>
                <td>
                  <button
                    className="decrease__button"
                    onClick={() => {
                      updateQty(data.product._id, "decrease");
                    }}
                  >
                    -
                  </button>
                  {data.quantity}
                  <button
                    className="increase__button"
                    onClick={() => {
                      updateQty(data.product._id, "increase");
                    }}
                  >
                    +
                  </button>
                </td>
                <td>$ {eachProdTotal.toFixed(2)}</td>
                <td>
                  <img
                    className="delete__icon"
                    src={Delete}
                    onClick={() => {
                      removeProduct(data.product._id);
                    }}
                  ></img>
                </td>
              </tr>
            );
          })}
          <tr className="total__row">
            <td colSpan={2}></td>
            <td> Total </td>
            <td colSpan={2}>$ {total.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={3}></td>
            <td colSpan={2} className="checkout__row">
              <button className="checkout__button">
                <img className="checkout__icon" src={Checkout} />
                Check out
              </button>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default CartTable;
