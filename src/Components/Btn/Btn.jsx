// import React from "react";
// import { useState, useEffect } from "react";
// import styles from "./Btn.module.css";

export default function Btn(props) {
  // const [count, setCount] = useState(0);
  console.log(props, "props");

  return (
    <>
      <button className="bg-amber-500 p-3">{props.children}</button>
    </>
  );
}
