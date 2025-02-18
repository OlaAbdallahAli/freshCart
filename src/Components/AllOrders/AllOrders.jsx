// import React from "react";
import { useContext, useState } from "react";
import { useEffect } from "react";
// import styles from "./AllOrders.module.css";
import { cartContext } from "../../context/cartContext";
import { tokenContext } from "../../context/tokenContext";
import { jwtDecode } from "jwt-decode";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  let { getUserOrders } = useContext(cartContext);
  let { token } = useContext(tokenContext);
  function getUserId() {
    let decoded = jwtDecode(token);
    console.log(decoded, "helloooooooooo");
    getOrders(decoded.id);
  }
  async function getOrders(userId) {
    let data = await getUserOrders(userId);
    setOrders(data.data);
    console.log(data);
  }
  useEffect(() => {
    token && getUserId();
  }, [token]);

  return (
    <>
      <div className="relative overflow-x-auto my-12">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Is Paid
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Method Type
              </th>
              <th scope="col" className="px-6 py-3">
                Total Order Price
              </th>
              {/* <th scope="col" className="px-6 py-3">
                view details
              </th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <>
                {" "}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.id}
                  </th>
                  <td className="px-6 py-4">
                    {order.isPaid ? "paid" : "NotPaid"}
                  </td>
                  <td className="px-6 py-4">{order.paymentMethodType}</td>
                  <td className="px-6 py-4">${order.totalOrderPrice}</td>
                  {/* <td className="px-6 py-4">
                    <button
                      data-modal-target="static-modal"
                      data-modal-toggle="static-modal"
                      className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      type="button"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </td> */}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
