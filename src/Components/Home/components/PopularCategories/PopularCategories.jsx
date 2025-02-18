// import React from "react";
import { useState, useEffect } from "react";
import styles from "./PopularCategories.module.css";
import axios from "axios";
import Slider from "react-slick";
export default function PopularCategories() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 2000,
  };
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      console.log(data);
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="py-20">
      <h2 className="mb-5 text-2xl">Shop popular categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category}>
            <img src={category.image} className={styles.categoryImage} alt="" />
            <h4>{category.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
}
