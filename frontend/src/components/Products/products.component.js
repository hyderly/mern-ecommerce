import React from "react";
import "./products.styles.css";

import Product from "../Product/product.component";

import products from "../../products.js";

const Products = () => {
  return (
    <div className="products">
      {products.map(product => (
        <Product product={product} />
      ))}
    </div>
  );
};

export default Products;
