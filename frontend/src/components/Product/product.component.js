import React from "react";
import { Link } from "react-router-dom";

import "./product.styles.css";

import Rating from "../Rating/rating.component";

const Product = ({ product }) => {
  console.log(product.image);
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img src={`${product.image}`} className="card-img" alt="product-img" />
      </Link>
      <Link className="card-header" to={`/product/${product._id}`}>
        <h2>{product.name}</h2>
      </Link>

      <div className="card-rating">
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </div>
      <h3 className="card-price">${product.price}</h3>
    </div>
  );
};

export default Product;
