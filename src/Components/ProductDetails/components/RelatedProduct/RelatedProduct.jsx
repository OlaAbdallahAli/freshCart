// import React from "react";
import { useState, useEffect } from "react";
// import styles from "./RelatedProduct.module.css";
import axios from "axios";
import ProductItem from "./../../../Shared/ProductItem/ProductItem";

export default function RelatedProduct(props) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  let { categoryId } = props;
  console.log(categoryId);
  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(function ({ data }) {
        console.log(data.data);
        let res = data.data.filter(
          (product) => product.category._id == categoryId
        );
        console.log(res);
        setRelatedProducts(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="mainlayer mb-10">
        {relatedProducts.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
