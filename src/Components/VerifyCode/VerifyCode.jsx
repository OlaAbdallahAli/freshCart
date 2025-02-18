import React from "react";
import styles from "./VerifyCode.module.css";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import axios from "axios";
// import { useContext } from "react";
// import { tokenContext } from "../../context/tokenContext";

export default function VerifyCode() {
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();
  const initialValues = {
    resetCode: "",
  };

  // const validationSchema = Yup.object().shape({
  //   resetCode: Yup.string().email("required code"),
  // });
  const verifyCodeformik = useFormik({
    initialValues,

    onSubmit: callVerifyCode,
  });
  console.log("hello");

  async function callVerifyCode(values) {
    try {
      setIsCallingApi(true);
      setApiError(null);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      console.log("inside");
      console.log(data);

      if (data.status == "Success") {
        navigate("/resetpassword");
      }
      setIsCallingApi(false);

      // localStorage.getItem("userToken");
    } catch (error) {
      setApiError(error.response.data.message);
      setIsCallingApi(false);
      console.log(error);
    }
  }
  return (
    <>
      <form
        onSubmit={verifyCodeformik.handleSubmit}
        className="max-w-sm mx-auto my-20 "
      >
        <h4 className="font-medium mb-5 text-2xl">Verify Reset Code:</h4>

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
            className="block mb-2 text-sm  text-gray-400 dark:text-white"
          >
            Enter Reset Code
          </label>
          <input
            type="text"
            id="resetCode"
            name="resetCode"
            value={verifyCodeformik.values.email}
            onChange={verifyCodeformik.handleChange}
            onBlur={verifyCodeformik.handleBlur}
            className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder=""
            required
          />
          {verifyCodeformik.errors.email && verifyCodeformik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {verifyCodeformik.errors.email}
            </div>
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
            className="text-white bg-[#0aad0a] opacity-65 hover:opacity-100 block ml-auto focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        )}
      </form>
    </>
  );
}

// import React from "react";
// import styles from "./VerifyCode.module.css";
// import { useState, useEffect } from "react";

// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function VerifyCode() {
//   let navigate = useNavigate();

//   async function callVerifyCode(values) {
//     try {
//       let { data } = await axios.post(
//         "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
//         values
//       );
//       console.log("inside");
//       console.log(data);
//       if (data.status == "Success") {
//         navigate("/resetpassword");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <>
//       <form className="max-w-sm mx-auto my-20 ">
//         <h4 className="font-medium mb-5 text-2xl">Verify Reset Code:</h4>

//         <div className="mb-5">
//           <label
//             htmlFor="code"
//             className="block mb-2 text-sm  text-gray-400 dark:text-white"
//           >
//             Enter Reset Code
//           </label>
//           <input
//             type="text"
//             id="code"
//             name="code"
//             className="bg-green-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
//             placeholder=""
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           onClick={() => callVerifyCode(values)}
//           className="text-white bg-[#0aad0a] opacity-65 hover:opacity-100 block ml-auto focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           Submit
//         </button>
//       </form>
//     </>
//   );
// }
