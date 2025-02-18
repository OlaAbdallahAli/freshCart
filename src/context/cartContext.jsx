import { createContext, useContext, useEffect, useState } from "react";
// import { tokenContext } from "./tokenContext";
import axios from "axios";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  //   const token = useContext(tokenContext);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartDetails, setCartDetails] = useState(null);
  const [cartId, setCartId] = useState("");
  const API_URL = "https://ecommerce.routemisr.com/api/v1/cart";
  const ORDER_API_URL = `https://ecommerce.routemisr.com/api/v1/orders`;
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  useEffect(() => {
    getCart();
  }, []);

  async function addToCart(productId) {
    const res = await axios.post(
      API_URL,
      { productId },
      {
        headers,
      },
      console.log("heloooooooo")
    );
    //   .then((res) => {
    //     console.log(res);
    //     return res;
    //   })

    //   .catch((error) => {
    //     console.log(error);
    //     return error;
    //   });
    if (res.data.status == "success") {
      setNumOfCartItems(res.data.numOfCartItems);
    }
    return res;
  }
  async function getCart() {
    const res = await axios.get(API_URL, {
      headers,
    });

    console.log(res.data);
    if (res.data.status == "success") {
      setNumOfCartItems(res.data.numOfCartItems);
      setCartDetails(res.data);
      setCartId(res.data.cartId);
    }

    return res;
  }
  async function removeProduct(id) {
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers,
    });

    console.log(res.data, "datadatadata");
    if (res.data.status == "success") {
      setNumOfCartItems(res.data.numOfCartItems);
    }
    setCartDetails(res.data);

    return res;
  }
  async function updateCount(id, count) {
    const res = await axios.put(
      `${API_URL}/${id}`,
      { count },
      {
        headers,
      }
    );

    if (res.data.status == "success") {
      setNumOfCartItems(res.data.numOfCartItems);
    }
    setCartDetails(res.data);

    return res;
  }
  async function cashOnDelivery(shippingAddress) {
    const res = await axios.post(
      `${ORDER_API_URL}/${cartId}`,
      { shippingAddress },
      {
        headers,
      }
    );
    if (res.data.status == "success") {
      getCart();
    }
    return res;
  }
  async function onLinePayment(shippingAddress) {
    const res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
      { shippingAddress },
      {
        headers,
      }
    );
    return res;
  }
  async function getUserOrders(userId) {
    const res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
    return res;
  }

  return (
    <>
      <cartContext.Provider
        value={{
          numOfCartItems,
          setNumOfCartItems,
          addToCart,
          getCart,
          cartDetails,
          setCartDetails,
          removeProduct,
          updateCount,
          cashOnDelivery,
          onLinePayment,
          getUserOrders,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}
