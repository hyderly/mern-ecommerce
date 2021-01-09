import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/rating.component";

import products from "../../products";

const ProductDetail = ({ match }) => {
  const product = products.find(product => product._id === match.params.id);
  return <div className="product-detail">Products</div>;
};

export default ProductDetail;
