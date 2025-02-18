// import React from "react";
import { useContext, useState } from "react";
import { useEffect } from "react";
import styles from "./WishList.module.css";
import { wishListContext } from "../../context/wishListContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Loader from "../Shared/Loader/Loader";
import { cartContext } from "../../context/cartContext";

export default function WishList(props) {
  const {
    getWishList,
    isInWishList,
    wishList,
    setWishList,
    removeFromWishList,
  } = useContext(wishListContext);
  const { addToCart } = useContext(cartContext);
  async function getWishListProducts() {
    try {
      let { data } = await getWishList();
      console.log(data);
      setWishList(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getWishListProducts();
  }, []);
  let heartIcon = "true";

  return (
    <>
      <div className="mainlayer mb-10 gap-3">
        {wishList.length == 0 && <Loader />}
        {wishList.length != 0 &&
          wishList.map((product) => (
            <>
              <div className="sm:w-1/2 md:w-1/3 lg:w-1/6 px-3 mb-3">
                <div className="product relative">
                  <button
                    onClick={() => removeFromWishList(product.id)}
                    className="absolute right-2 top-2 text-xl"
                  >
                    <i
                      className={`fas fa-heart text-2xl  ${
                        heartIcon ? "text-red-600" : "text-gray-300"
                      } `}
                    ></i>
                  </button>
                  <Link
                    to={`/productDetails/${product.id}/${product.category._id}`}
                  >
                    <img src={product.imageCover} className="mb-2" alt="" />
                    <span className="text-main">{product.category.name}</span>
                    <h2 className="mb-4 font-bold">
                      {product.title.split(" ").splice(0, 2).join(" ")}
                    </h2>
                    <div className="flex justify-between mb-4">
                      <p>{product.price}EGP</p>
                      <p>
                        <i className="fa fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="btn bg-main w-full text-center text-white p-2 rounded-md"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
}
