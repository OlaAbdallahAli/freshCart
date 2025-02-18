// import React from "react";
// import styles from "./Home.module.css";
import RecentProducts from "./components/RecentProducts/RecentProducts";
import PopularCategories from "./components/PopularCategories/PopularCategories";
import StaticSlider from "./components/StaticSlider/StaticSlider";
export default function Home() {
  return (
    <div>
      <StaticSlider />
      <PopularCategories />
      <RecentProducts />
    </div>
  );
}
