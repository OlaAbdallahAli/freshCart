// import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./StaticSlider.module.css";
import Slider from "react-slick";
import slide1 from "../../../../assets/images/slider-image-1.jpeg";
import slide2 from "../../../../assets/images/slider-image-2.jpeg";
import slide3 from "../../../../assets/images/slider-image-3.jpeg";
import static1 from "../../../../assets/images/ad-banner-1.png";
import static2 from "../../../../assets/images/ad-banner-2.png";

export default function StaticSlider() {
  const [count, setCount] = useState(0);
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 2000,
  };

  return (
    <>
      <div className="mainlayer">
        <div className="w-3/4 ">
          <Slider {...settings}>
            <img
              src={slide1}
              className="w-full h-[400px] object-cover"
              alt=""
            />
            <img
              src={slide2}
              className="w-full h-[400px] object-cover"
              alt=""
            />
            <img
              src={slide3}
              className="w-full h-[400px] object-cover"
              alt=""
            />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={static1} className="w-full h-[200px] object-cover" alt="" />
          <img src={static2} className="w-full h-[200px] object-cover" alt="" />
        </div>
      </div>
    </>
  );
}
