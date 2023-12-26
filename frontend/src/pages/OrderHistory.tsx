import axios from "axios";
import OrderCard from "../components/OrderCard";
import { useEffect, useState } from "react";
import { orderModel } from "../models/orderModel";
import "../styles/orderHistory.css";
import Cookies from "universal-cookie";

function OrderHistory() {
  var cookies = new Cookies();
  const userId = cookies.get("userId");
  const [ordersData, setOrdersData] = useState<orderModel[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOSTNAME}/api/orders/${userId}`)
      .then((res) => {
        setOrdersData(res.data);
      });
  }, []);

  return (
    <div className="order__container">
      <h2>Order History</h2>
      <table className="order__table">
        <tr>
          <th className="order__col">Order ID</th>
          <th className="order__col">Date Ordered</th>
          <th className="order__col">Total</th>
          <th className="order__col"></th>
        </tr>
        {ordersData.length > 0 ? (
          ordersData.map((eachOrderData: orderModel) => (
            <OrderCard data={eachOrderData}></OrderCard>
          ))
        ) : (
          <tr className="empty__order__row">
            <td colSpan={4}>No order history</td>
          </tr>
        )}
      </table>
    </div>
  );
}

export default OrderHistory;
