// import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./LayOut.module.css";
import NavBar from "./../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
export default function LayOut() {
  const [count, setCount] = useState(0);
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
