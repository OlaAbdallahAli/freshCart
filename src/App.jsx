import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LayOut from "./Components/LayOut/LayOut";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Products from "./Components/Products/Products";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import NotFound from "./Components/NotFound/NotFound";
import Home from "./Components/Home/Home";
import { useEffect, useContext } from "react";
import { tokenContext } from "./context/tokenContext";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import AuthView from "./Components/AuthView/AuthView";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import Checkout from "./Components/Checkout/Checkout";
import AllOrders from "./Components/AllOrders/AllOrders";
import WishList from "./Components/WishList/WishList";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

function App() {
  let { setToken } = useContext(tokenContext);

  useEffect(function () {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);
  const routes = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "productDetails/:id/:categoryId",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <WishList />
            </ProtectedRoutes>
          ),
        },

        {
          path: "login",
          element: (
            <AuthView>
              <Login />
            </AuthView>
          ),
        },
        {
          path: "forgetpassword",
          element: (
            <AuthView>
              <ForgetPassword />
            </AuthView>
          ),
        },
        {
          path: "verifycode",
          element: (
            <AuthView>
              <VerifyCode />
            </AuthView>
          ),
        },
        {
          path: "resetpassword",
          element: (
            <AuthView>
              <ResetPassword />
            </AuthView>
          ),
        },
        {
          path: "register",
          element: (
            <AuthView>
              <Register />
            </AuthView>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <div>
        <RouterProvider router={routes}></RouterProvider>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
