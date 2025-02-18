// import React from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useContext, useState } from "react";
import { tokenContext } from "./../../context/tokenContext";

export default function ResetPassword() {
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [apiError, setApiError] = useState(null);

  let { setToken } = useContext(tokenContext);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    newPassword: "",
  };
  console.log("dddddd");
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("required email"),
    newPassword: Yup.string()
      .matches(new RegExp("^[A-Za-z0-9]{3,8}$"), "Invalid password")
      .required("required password"),
  });
  const resetPasswordformik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callResetPassword,
  });
  async function callResetPassword(values) {
    try {
      console.log("dddddd");
      setIsCallingApi(true);
      setApiError(null);
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      console.log(data);
      setIsCallingApi(false);
      localStorage.setItem("userToken", data.token);
      setToken(data.token);
      navigate("/");
    } catch (error) {
      setApiError(error.response.data.message);
      setIsCallingApi(false);
    }
  }
  return (
    <>
      <form
        onSubmit={resetPasswordformik.handleSubmit}
        className="max-w-sm mx-auto mt-5 mb-20"
      >
        <h4 className="font-medium  mb-5">Reset Password:</h4>

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
            email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={resetPasswordformik.values.email}
            onChange={resetPasswordformik.handleChange}
            onBlur={resetPasswordformik.handleBlur}
            className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder=""
            required
          />
          {resetPasswordformik.errors.email &&
          resetPasswordformik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {resetPasswordformik.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-2">
          <label
            htmlFor="newPassword"
            className="block mb-2 text-sm  text-gray-900 dark:text-white"
          >
            new password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={resetPasswordformik.values.password}
            onChange={resetPasswordformik.handleChange}
            onBlur={resetPasswordformik.handleBlur}
            className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />

          {resetPasswordformik.errors.password &&
          resetPasswordformik.touched.password ? (
            <>
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {resetPasswordformik.errors.password}
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        {isCallingApi ? (
          <div className=" w-auto ml-0">
            <ClipLoader color="#0aad0a" size={20} />{" "}
          </div>
        ) : (
          <button
            type="submit"
            className="text-white bg-[#0aad0a] opacity-65 mt-0 hover:opacity-100 block ml-auto focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        )}
      </form>
    </>
  );
}
