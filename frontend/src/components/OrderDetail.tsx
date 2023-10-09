import { product } from "../models/orderModel";

interface OrderDetailProp {
  data: product[];
}

const OrderDetail = ({ data }: OrderDetailProp) => {
  console.log(data);
  return (
    <table className="detail__table">
      <tr>
        <th>Product</th>
        <th>Unit Price</th>
        <th>Quantity</th>
        <th>Sub Total</th>
      </tr>
      {data?.map((product) => {
        var eachProdTotal = product.quantity * product.product.price;
        return (
          <tr className="cart__row" key={product.product._id}>
            <td>
              <div className="product__container">
                <div className="product__image__container">
                  <img
                    src={product.product.image}
                    className="product__image"
                    alt="product"
                  />
                </div>
                <div className="product__title">{product.product.title}</div>
              </div>
            </td>
            <td>$ {product.product.price}</td>
            <td>{product.quantity}</td>
            <td>$ {eachProdTotal.toFixed(2)}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default OrderDetail;
