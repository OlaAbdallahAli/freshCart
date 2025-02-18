// import React from "react";
import { useContext, useEffect } from "react";
// import styles from "./Cart.module.css";
import { cartContext } from "../../context/cartContext";
import Loader from "../Shared/Loader/Loader";
import { Link } from "react-router-dom";
import image from "../../assets/images/empty-cart.png";
export default function Cart() {
  // const [count, setCount] = useState(0);
  const { cartDetails, removeProduct, updateCount, getCart } =
    useContext(cartContext);
  useEffect(() => {
    getCart();
    cartDetails;
    console.log(cartDetails);
  }, [cartDetails]);
  async function deleteProduct(id) {
    let data = await removeProduct(id);
    console.log(data);
  }
  async function updateItems(id, count) {
    let data = await updateCount(id, count);
    console.log(data);
  }
  return (
    <>
      {cartDetails ? (
        cartDetails?.data?.products?.length == 0 ? (
          <h1 className=" text-2xl mt-3">
            Empty Cart start your Shopping
            <i className="fa-solid fa-cart-plus fa-shake text-main ml-2"></i>
            <img src={image} alt="empty cart" className="mx-auto mb-10" />
          </h1>
        ) : (
          <div className="py-6">
            <div className="flex my-4 justify-between">
              <h2 className="text-2xl">
                Total Product number
                <span className="text-main ml-2">
                  {cartDetails.numOfCartItems}
                </span>
              </h2>
              <h2 className="text-2xl">
                Total Price
                <span className="text-main ml-2">
                  $ {cartDetails.data.totalCartPrice}
                </span>
              </h2>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-6">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartDetails.data.products.map((product) => (
                    <>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                          <img
                            src={product.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt="image"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                updateItems(
                                  product.product._id,
                                  product.count - 1
                                )
                              }
                              className="inline-flex text-main items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>
                              <span>{product.count}</span>
                            </div>
                            <button
                              onClick={() =>
                                updateItems(
                                  product.product._id,
                                  product.count + 1
                                )
                              }
                              className="inline-flex text-main items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-main font-semibold text-gray-900 dark:text-white">
                          ${product.price}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            onClick={() => deleteProduct(product.product._id)}
                            className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                          >
                            Remove
                            <i className="fa-solid fa-trash-can ml-1"></i>
                          </span>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Link
              to={"/Checkout"}
              className="bg-main p-3 inline-block text-white rounded my-7"
            >
              Checkout
            </Link>
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}
