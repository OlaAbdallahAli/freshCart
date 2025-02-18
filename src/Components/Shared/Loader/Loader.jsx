// import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./Loader.module.css";
export default function Loader() {
  const [count, setCount] = useState(0);
  return (
    <i className="fa-solid fa-cart-shopping fa-bounce text-main text-8xl mx-auto" />
  );
}
