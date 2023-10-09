import { orderModel } from "../models/orderModel";
import { useState } from "react";
import OrderDetail from "./OrderDetail";

interface ordersProp {
  data: orderModel | undefined;
}

const OrderCard = ({ data }: ordersProp) => {
  console.log(data);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  return (
    <>
      <tr className="order__card">
        <td className="order__col">{data?._id}</td>
        <td className="order__col">
          {new Date(data?.createdAt!).toString().slice(0, -35)}
        </td>
        <td className="order__col">$ {data?.totalAmount}</td>
        <td className="order__col">
          <button
            className="view__details__button"
            onClick={() => {
              setShowDetail(!showDetail);
            }}
          >
            View Details
          </button>
        </td>
      </tr>
      <tr className="order__detail">
        <td colSpan={4} className="order__col">
          {showDetail ? (
            <OrderDetail data={data?.products!}></OrderDetail>
          ) : (
            <></>
          )}
        </td>
      </tr>
    </>
  );
};

export default OrderCard;
