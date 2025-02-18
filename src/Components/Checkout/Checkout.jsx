// import React from "react";
import { useState, useContext } from "react";
// import { useEffect } from "react";
// import styles from "./Checkout.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import { cartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const { cashOnDelivery, onLinePayment } = useContext(cartContext);
  const navigate = useNavigate();
  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const validationSchema = Yup.object().shape({
    details: Yup.string().required("required "),
    phone: Yup.string().required("required "),
    city: Yup.string().required("required "),
  });
  const shippingForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callPayment,
  });
  async function callPayment(values) {
    console.log(isOnline);
    try {
      setIsCallingApi(true);
      if (isOnline == true) {
        const data = await onLinePayment(values);
        console.log(data);
        window.location.href = data.data.session.url;
      } else {
        const data = await cashOnDelivery(values);
        console.log(data);
        navigate("/allorders");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form
        onSubmit={shippingForm.handleSubmit}
        className="max-w-sm mx-auto mt-5 mb-20"
      >
        <h4 className="font-bold text-main text-xl mb-5">Shipping info:</h4>

        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : (
          ""
        )}

        <div className="mb-5">
          <label
            htmlFor="details"
            className="block mb-2 text-sm  text-gray-700 dark:text-white"
          >
            Details
          </label>
          <input
            type="text"
            id="details"
            name="details"
            value={shippingForm.values.details}
            onChange={shippingForm.handleChange}
            onBlur={shippingForm.handleBlur}
            className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="add your Address"
            required
          />
          {shippingForm.errors.details && shippingForm.touched.details ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {shippingForm.errors.details}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm  text-gray-700 dark:text-white"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={shippingForm.values.phone}
            onChange={shippingForm.handleChange}
            onBlur={shippingForm.handleBlur}
            className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="put your phone number"
            required
          />
          {shippingForm.errors.phone && shippingForm.touched.phone ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {shippingForm.errors.phone}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm  text-gray-700 dark:text-white"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingForm.values.city}
            onChange={shippingForm.handleChange}
            onBlur={shippingForm.handleBlur}
            className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="add your city"
            required
          />
          {shippingForm.errors.city && shippingForm.touched.city ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {shippingForm.errors.city}
            </div>
          ) : (
            ""
          )}
          <input
            className="bg-amber-800"
            type={"checkbox"}
            value="online"
            onChange={() => setIsOnline(true)}
          />
          <label className="mx-3">online</label>
        </div>
        {isCallingApi ? (
          <div className=" w-auto ml-0">
            <ClipLoader color="#0aad0a" size={20} />{" "}
          </div>
        ) : (
          <button
            type="submit"
            className="text-white bg-[#0aad0a] opacity-65 hover:opacity-100 block ml-auto focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Pay now
          </button>
        )}
      </form>
    </>
  );
}
