// import React from "react";
import { useState, useEffect } from "react";
import styles from "./Brands.module.css";
import axios from "axios";
import Loader from "../Shared/Loader/Loader";
export default function Brands() {
  const [brands, setBrands] = useState([]);

  async function getAllBrands() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    setBrands(data.data);
    console.log(data.data);
  }
  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      <h2 className="text-center my-7 text-3xl font-bold">Brands</h2>
      <div className="mainlayer  justify-center gap-7 mb-5">
        {brands.length == 0 && <Loader />}
        {brands.length != 0 &&
          brands.map((product) => (
            <>
              <div className="mb-5">
                <img className="w-32" src={product.image} alt="brandImage" />
                <h5 className="text-main text-center">{product.name}</h5>
              </div>
            </>
          ))}
      </div>
    </>
  );
}
