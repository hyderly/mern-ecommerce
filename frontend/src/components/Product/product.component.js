import React from "react";

import "./product.styles.css";

const Product = ({ product }) => {
  console.log(product.image);
  return (
    <div className="card">
      <a href={`/product/${product._id}`}>
        <img src={`${product.image}`} className="card-img" alt="product-img" />
      </a>
      <a className="card-header" href={`/product/${product._id}`}>
        <h2 >{product.name}</h2>
      </a>

      <div className="card-rating">
        {product.rating} from {product.numReviews} reviews
      </div>
      <h3 className="card-price">${product.price}</h3>
    </div>
  );
};

export default Product;
