import "../styles/cartTable.css";
import Delete from "../assets/delete.svg";
import Checkout from "../assets/checkout.svg";

interface ICartData {
  product: {
    image: string;
    price: number;
    title: string;
    _id: string;
  };
  quantity: number;
}

type cart = {
  cartData: ICartData[];
  setCartData: React.Dispatch<React.SetStateAction<ICartData[]>>;
};

function CartTable({ cartData, setCartData }: cart) {
  var total = 0;
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
            total += data.quantity * data.product.price;
            return (
              <tr className="cart__row">
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
                  <button className="decrease__button">-</button>
                  {data.quantity}
                  <button className="increase__button">+</button>
                </td>
                <td>$ {data.quantity * data.product.price}</td>
                <td>
                  <img className="delete__icon" src={Delete}></img>
                </td>
              </tr>
            );
          })}
          <tr className="total__row">
            <td colSpan={2}></td>
            <td> Total </td>
            <td colSpan={2}>$ {total}</td>
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
