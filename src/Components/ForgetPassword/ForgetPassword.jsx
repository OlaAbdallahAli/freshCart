// import React from "react";
import { useState, useEffect } from "react";
// import styles from "./ForgetPassword.module.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useContext } from "react";
import { tokenContext } from "../../context/tokenContext";

export default function ForgetPassword() {
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [apiError, setApiError] = useState(null);
  let { setToken } = useContext(tokenContext);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("required email"),
  });
  const forgetPasswardformik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callforgetPassward,
  });

  async function callforgetPassward(values) {
    try {
      setIsCallingApi(true);
      setApiError(null);

      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );

      console.log(data);

      setIsCallingApi(false);
      // setToken(data.token);
      // localStorage.getItem("userToken");
      // console.log(data.token);
      navigate("/verifycode");
    } catch (error) {
      setApiError(error.response.data.message);
      setIsCallingApi(false);
    }
  }

  return (
    <>
      {" "}
      <form
        onSubmit={forgetPasswardformik.handleSubmit}
        className="max-w-sm mx-auto mt-5 mb-20"
      >
        <h4 className="font-medium mb-5">Forget Password:</h4>

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
            htmlFor="email"
            className="block mb-2 text-sm  text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={forgetPasswardformik.values.email}
            onChange={forgetPasswardformik.handleChange}
            onBlur={forgetPasswardformik.handleBlur}
            className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Add your Email"
            required
          />
          {forgetPasswardformik.errors.email &&
          forgetPasswardformik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {forgetPasswardformik.errors.email}
            </div>
          ) : (
            ""
          )}
          <span className="text-gray-400 text-sm">
            We'll never share your email with anyone else.
          </span>
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
            Submit
          </button>
        )}
      </form>
    </>
  );
}
