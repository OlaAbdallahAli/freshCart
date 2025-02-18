// import React from "react";

import styles from "./NotFound.module.css";
import NotFoundImage from "../../assets/images/error.svg";
export default function NotFound() {
  return (
    <>
      <div className="container w-full ">
        <img className="mx-auto" src={NotFoundImage} alt="" />
      </div>
    </>
  );
}
