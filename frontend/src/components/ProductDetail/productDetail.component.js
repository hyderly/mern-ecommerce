import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Rating from "../Rating/rating.component";

import "./productDetail.styles.css";

import products from "../../products";

const ProductDetail = ({ match }) => {
  const product = products.find(product => product._id === match.params.id);
  return (
    <>
      <Link to="/" className="product-btn">
        Go Back
      </Link>
      <div className="product-detail">
        <div className="product-img">
          <img src={product.image} alt={product.name} />
        </div>
        <div classNam="product-content">
          <h2 className="product-name">{product.name}</h2>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <h4 className="product-price">${product.price}</h4>
          <p className="product-description">{product.description}</p>
          <div className="product-subdetails">
            <h4 className="product-price">Price: ${product.price}</h4>
            <h4 className="product-status">
              Status: {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
            </h4>
            <button className="checkout-btn btn" disabled={product.countInStock === 0}>Add To Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ProductDetail);
