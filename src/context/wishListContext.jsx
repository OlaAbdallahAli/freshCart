import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const wishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishList, setWishList] = useState([]);
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  async function getWishList() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers }
      );
      setWishList(data?.data || []);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async function addToWishList(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      );
      getWishList();
      console.log(data);
      // setWishList([...wishList, data.product]);
      console.log("the product is added  to wishlist");
    } catch (error) {
      console.log(error);
    }
  }
  async function removeFromWishList(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      // setWishList(data);
      console.log(data);
      getWishList();
      console.log("the product is removed from wishlist");
    } catch (error) {
      console.log(error);
    }
  }
  function isInWishList(id) {
    return wishList.some((item) => item.id == id);
  }
  useEffect(() => {
    getWishList();
  }, []);

  return (
    <>
      <wishListContext.Provider
        value={{
          wishList,
          setWishList,
          getWishList,
          addToWishList,
          removeFromWishList,
          isInWishList,
        }}
      >
        {children}
      </wishListContext.Provider>
    </>
  );
}
