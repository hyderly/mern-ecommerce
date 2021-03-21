import React from "react";
import "./home.styles.css";

import Meta from "../../components/Helmat";

import Products from "../../components/Products/products.component";
import TopCarousel from "../../components/ProductCarousel/productCarousel.component";

const HomePage = () => {
  return (
    <>
      <Meta title="Welcome to proShop | Home" />
      {/* <TopCarousel/> */}
      <h1 className="home-title" style={{ "margin-top": "60px" }}>
        LATEST PRODUCTS
      </h1>
      <Products />
    </>
  );
};

export default HomePage;
