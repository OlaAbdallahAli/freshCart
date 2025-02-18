// import React from "react";
import { useState } from "react";
// import { useEffect } from "react";
// import styles from "./Login.module.css";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useContext } from "react";
import { tokenContext } from "./../../context/tokenContext";

export default function Login() {
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [apiError, setApiError] = useState(null);

  let { setToken } = useContext(tokenContext);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("required email"),
    password: Yup.string()
      .matches(new RegExp("^[A-Za-z0-9]{3,8}$"), "Invalid password")
      .required("required password"),
  });
  const Loginformik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callLogin,
  });
  async function callLogin(values) {
    try {
      setIsCallingApi(true);
      setApiError(null);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
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
        onSubmit={Loginformik.handleSubmit}
        className="max-w-sm mx-auto mt-5 mb-20"
      >
        <h4 className="font-medium">Log In Now:</h4>

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
            value={Loginformik.values.email}
            onChange={Loginformik.handleChange}
            onBlur={Loginformik.handleBlur}
            className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder=""
            required
          />
          {Loginformik.errors.email && Loginformik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {Loginformik.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm  text-gray-900 dark:text-white"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={Loginformik.values.password}
            onChange={Loginformik.handleChange}
            onBlur={Loginformik.handleBlur}
            className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />

          {Loginformik.errors.password && Loginformik.touched.password ? (
            <>
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {Loginformik.errors.password}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <p>
          <Link
            to={"/forgetpassword"}
            className=" cursor-pointer mt-0 text-red-800 text-sm hover:underline"
          >
            Forget password
          </Link>
        </p>

        {isCallingApi ? (
          <div className=" w-auto ml-0">
            <ClipLoader color="#0aad0a" size={20} />{" "}
          </div>
        ) : (
          <div className="flex">
            <p>
              <Link
                to={"/register"}
                className=" cursor-pointer mt-0 text-green-800 text-sm hover:underline"
              >
                I haven't account Register here...
              </Link>
            </p>
            <button
              type="submit"
              className="text-white bg-[#0aad0a] opacity-65 mt-0 hover:opacity-100 block ml-auto focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </div>
        )}
      </form>
    </>
  );
}
