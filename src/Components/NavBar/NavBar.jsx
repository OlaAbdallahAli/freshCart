import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";

// import styles from "./NavBar.module.css";
// import Register from "../Register/Register";
// import Login from "./../Login/Login";
// import Cart from "./../Cart/Cart";
// import Products from "./../Products/Products";
// import Categories from "./../Categories/Categories";
// import Brands from "./../Brands/Brands";
import { useContext } from "react";
import { tokenContext } from "./../../context/tokenContext";
import { cartContext } from "../../context/cartContext";
import WishList from "./../WishList/WishList";

export default function NavBar() {
  let { token, setToken } = useContext(tokenContext);

  let navigate = useNavigate();
  let { numOfCartItems } = useContext(cartContext);
  function signOut() {
    //Remove local storage
    localStorage.removeItem("userToken");
    //set token null
    setToken(null);
    //navigate login
    navigate("/login");
  }
  return (
    <>
      <nav className="bg-[#f1f3f2] mb-3 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className=" flex items-center justify-between gap-5 ">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} width={"200px"} alt="fresh-cart-Logo" />
            </a>
            <div
              className="hidden w-full md:block md:w-auto md:relative md:top-0 absolute top-[80px] left-0"
              id="navbar-default"
            >
              {token ? (
                <ul className="font-medium  flex flex-col gap-4 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-[#f1f3f2]  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <NavLink
                      to={""}
                      className="block py-2 px-3 rounded-sm  md:p-0 dark:text-white "
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"cart"}
                      className="block py-2 px-3 text-gray-900 rounded-sm  md:border-0D md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white "
                    >
                      Cart <span className="">{numOfCartItems}</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"products"}
                      className="block py-2 px-3 text-gray-900 rounded-sm  md:border-0D md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white "
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="categories"
                      className="block py-2 px-3 text-gray-900 rounded-sm   md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"brands"}
                      className="block py-2 px-3 text-gray-900 rounded-sm   md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"wishlist"}
                      className="block py-2 px-3 text-gray-900 rounded-sm   md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      WishList
                      <i className=" ml-0.5 fas fa-heart text-green-250 hover:text-red-500"></i>
                    </NavLink>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="flex gap-3 align-middle">
            <ul className="flex gap-3">
              <li>
                <i className="fa-brands fa-instagram"></i>
              </li>
              <li>
                <i className="fa-brands fa-facebook"></i>
              </li>
              <li>
                <i className="fa-brands fa-tiktok"></i>
              </li>
              <li>
                <i className="fa-brands fa-twitter"></i>
              </li>
              <li>
                <i className="fa-brands fa-linkedin"></i>
              </li>
              <li>
                <i className="fa-brands fa-youtube"></i>
              </li>
            </ul>
            <ul className="flex gap-3">
              {token ? (
                <li>
                  <span
                    className="  hover:cursor-pointer hover:bg-[#0aad0a] hover:text-white hover:p-1 rounded "
                    onClick={signOut}
                  >
                    SignOut
                  </span>
                </li>
              ) : (
                <>
                  {" "}
                  <li>
                    <NavLink to={"register"}>Register</NavLink>
                  </li>
                  <li>
                    <NavLink to={"login"}>Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}
