import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Rating from "../Rating/rating.component";

import WithSpinner from "../WithSpinner/with-spinner.component";
import ErrorMessage from "../ErrorMessage/error-message.component";

// Redux Action
import { detailProduct } from "../../redux/productDetail/productDetail.actions";

import "./productDetail.styles.css";

const ProductDetail = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetail = useSelector(state => state.productDetail);
  const { product, loading, error } = productDetail;

  useEffect(() => {
    dispatch(detailProduct(match.params.id));
  }, [dispatch, match.params.id]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link to="/" className="product-btn">
        &#10094; Go Back
      </Link>
      {loading ? (
        <WithSpinner />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <div className="product-detail">
          <div className="product-img">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-content">
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
              {product.countInStock > 0 && (
                <>
                  <label>QTY: </label>
                  <select value={qty} onChange={e => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {product.countInStock > 0 && (
                <button
                  onClick={addToCartHandler}
                  type="button"
                  className="checkout-btn btn"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(ProductDetail);
