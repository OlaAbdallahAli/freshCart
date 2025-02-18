// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { wishListContext } from "../../../context/wishListContext";
// import styles from "./ProductItem.module.css";

export default function ProductItem(props) {
  let { imageCover, title, category, price, ratingsAverage, id } =
    props.product;
  const { addToWishList, removeFromWishList, isInWishList } =
    useContext(wishListContext);

  function isFavouriteWishList() {
    console.log(id);
    console.log(isInWishList(id));
    if (isInWishList(id)) {
      removeFromWishList(id);
    } else {
      addToWishList(id);
    }
  }
  let heartIcon = isInWishList(id);

  return (
    <div className="sm:w-1/2 md:w-1/3 lg:w-1/6 px-3 mb-3">
      <div className="product relative">
        <button
          className="absolute right-2 top-2 text-xl"
          onClick={() => isFavouriteWishList()}
        >
          <i
            className={`fas fa-heart text-2xl ${
              heartIcon ? "text-red-600" : "text-gray-300"
            } `}
          ></i>
        </button>
        <Link to={`/productDetails/${id}/${category._id}`}>
          <img src={imageCover} className="mb-2" alt="" />
          <span className="text-main">{category.name}</span>
          <h2 className="mb-4 font-bold">
            {title.split(" ").splice(0, 2).join(" ")}
          </h2>
          <div className="flex justify-between mb-4">
            <p>{price}EGP</p>
            <p>
              <i className="fa fa-star rating-color"></i>
              {ratingsAverage}
            </p>
          </div>
        </Link>
        <button
          onClick={() => props.addProductToCart(id)}
          className="btn bg-main w-full text-center text-white p-2 rounded-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
