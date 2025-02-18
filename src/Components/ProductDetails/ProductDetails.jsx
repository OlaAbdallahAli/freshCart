// import React from "react";
import { useState, useEffect, useContext } from "react";
// import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./components/RelatedProduct/RelatedProduct";
import Slider from "react-slick";
import Loader from "../Shared/Loader/Loader";
import { cartContext } from "../../context/cartContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id, categoryId } = useParams();
  let { addToCart } = useContext(cartContext);
  console.log(id);
  const [details, setDetails] = useState(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function addProductToCart(id) {
    const res = await addToCart(id);
    console.log(res, "data");
    if (res.status == "200") {
      toast("Product added successfully!", {
        position: "top-right",
        theme: "dark",
        type: "success",
      });
    } else {
      toast("Product not added  to your cart!");
    }
  }

  function getProductDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(function ({ data }) {
        console.log(data);
        setDetails(data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  useEffect(() => {
    getProductDetails();
  }, [id]);

  return (
    <>
      {details && (
        <div className="mainlayer items-center  py-6 ">
          <div className="w-4/12">
            <Slider {...settings}>
              {details?.images.map((src) => (
                <img src={src} alt="" />
              ))}
            </Slider>
          </div>
          <div className="w-8/12 pl-4">
            <h1>{details?.title}</h1>
            <p className="text-gray-500 my-2 text-sm">{details?.description}</p>
            <span>{details?.category?.name}</span>
            <div className="flex justify-between mb-4">
              <p className="text-sm">{details?.price} EGP</p>
              <p>
                <i className="fa fa-star rating-color"></i>
                {details?.ratingsAverage}
              </p>
            </div>
            <button
              onClick={() => {
                addProductToCart(id);
              }}
              className="btn bg-main w-full text-center text-white p-2 rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
      <div className="flex">{!details && <Loader />}</div>
      <div className="">
        <h2 className="text-2xl font-bold">Related Product</h2>
        <RelatedProduct categoryId={categoryId} />
      </div>
    </>
  );
}
