import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite/dist/flowbite.min.js";
import App from "./App.jsx";
import CounterContextProvider from "./context/counterContext";
import TokenContextProvider from "./context/tokenContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import CartContextProvider from "./context/cartContext.jsx";
import WishListContextProvider from "./context/wishListContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenContextProvider>
      <WishListContextProvider>
        <CartContextProvider>
          <CounterContextProvider>
            <App />
          </CounterContextProvider>
        </CartContextProvider>
      </WishListContextProvider>
    </TokenContextProvider>
  </StrictMode>
);
