import React from "react";
import "./home.styles.css";

import Meta from "../../components/Helmat";

import Products from "../../components/Products/products.component";
import TopCarousel from "../../components/ProductCarousel/productCarousel.component";

const HomePage = ({match}) => {

  const keyword = match.params.keyword;

  return (
    <>
      <Meta title="Welcome to proShop | Home" />
      {
        !keyword &&  <TopCarousel/>
      }
     
      
      <Products />
    </>
  );
};

export default HomePage;
