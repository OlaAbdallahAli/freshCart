// import React from "react";
// import { useState } from "react";
// import styles from "./RecentProducts.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "../../../Shared/ProductItem/ProductItem";
import Loader from "../../../Shared/Loader/Loader";
import { cartContext } from "../../../../context/cartContext";
import { toast } from "react-toastify";
import { wishListContext } from "../../../../context/wishListContext";

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(cartContext);
  const {
    wishList,
    setWishList,
    getWishList,
    addToWishList,
    removeFromWishList,
    isInWishList,
  } = useContext(wishListContext);

  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(function ({ data }) {
        console.log(data);
        setProducts(data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  useEffect(() => {
    getProducts();
  }, []);

  async function addProductToCart(id) {
    let res = await addToCart(id);
    console.log(res, "data");
    if (res.data.status == "success") {
      toast("Product added successfully!", {
        position: "top-right",
        theme: "dark",
        type: "success",
      });
    } else {
      toast("Product not added  to your cart!");
    }
  }
  // const isFavorite = isInWishList(ProductItem.id);
  // isFavorite ? removeFromWishList(id) : addToWishList(productId);

  return (
    <>
      <div className="mainlayer mb-10">
        {products.length == 0 && <Loader />}
        {products.length != 0 &&
          products.map((product) => (
            <ProductItem
              product={product}
              key={product.id}
              addProductToCart={addProductToCart}
              addToWishList={addToWishList}
              removeFromWishList={removeFromWishList}
            />
          ))}
      </div>
    </>
  );
}
