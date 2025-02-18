// import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import styles from "./Categories.module.css";
// import RelatedProduct from "../ProductDetails/components/RelatedProduct/RelatedProduct";
import axios from "axios";
import Loader from "../Shared/Loader/Loader";
import RelatedProduct from "../ProductDetails/components/RelatedProduct/RelatedProduct";

export default function Categories() {
  const [products, setProducts] = useState([]);

  async function GetAllCategories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    console.log(data);
    setProducts(data.data);
  }

  useEffect(() => {
    GetAllCategories();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-700 my-10">Categories</h2>
      <div className="mainlayer ml-4 mb-10 gap-7 align-content ">
        {products.length == 0 && <Loader />}
        {products.length != 0 &&
          products.map((product) => (
            <div className=" mb-10">
              <img className="w-56 h-[280px]" src={product.image}></img>
              <h4 className="text-2xl">{product.name}</h4>
            </div>
          ))}
      </div>
    </>
  );
}
