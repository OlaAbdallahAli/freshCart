// import React from "react";
// import styles from "./Products.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { cartContext } from "../../context/cartContext";
import Loader from "../Shared/Loader/Loader";
import ProductItem from "../Shared/ProductItem/ProductItem";
import { wishListContext } from "../../context/wishListContext";
import { useParams } from "react-router-dom";

export default function Products() {
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
  const { page } = useParams();
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

  return (
    <>
      <h2 className="font-medium text-2xl mt-8">Best Selling Products</h2>
      <div className="mainlayer my-20">
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
