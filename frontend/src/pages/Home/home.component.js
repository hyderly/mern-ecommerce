import React from "react";
import "./home.styles.css";

import Products from "../../components/Products/products.component";

const HomePage = () => {
  return (
    <>
      <h1 className="home-title">LATEST PRODUCTS</h1>
      <Products />
    </>
  );
};

export default HomePage;
