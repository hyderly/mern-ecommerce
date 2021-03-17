import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Rating from "../Rating/rating.component";

import WithSpinner from "../WithSpinner/with-spinner.component";
import ErrorMessage from "../ErrorMessage/error-message.component";

// Redux Action
import { detailProduct } from "../../redux/productDetail/productDetail.actions";
import { createProductReview } from "../../redux/product/product.actions";

// Types
import { ProductCreateReviewTypes } from "../../redux/product/product.types";

import "./productDetail.styles.css";

const ProductDetail = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetail = useSelector(state => state.productDetail);
  const { product, loading, error } = productDetail;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector(state => state.productCreateReview);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productCreateReview;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({
        type: ProductCreateReviewTypes.PRODUCT_CREATE_REVIEW_RESET,
      });
    }
    dispatch(detailProduct(match.params.id));
  }, [dispatch, match.params.id, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = e => {
    e.preventDefault();

    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <>
      <Link to="/" className="product-btn">
        &#10094; Back to shop
      </Link>
      {loading ? (
        <WithSpinner />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
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
                  Status:{" "}
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
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
          <Row style={{ "margin-top": "50px" }}>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <ErrorMessage styleType="danger">No Reviews</ErrorMessage>
              )}
              <ListGroup variant="flush">
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <ErrorMessage variant="success">
                      Review submitted successfully
                    </ErrorMessage>
                  )}

                  {errorProductReview && (
                    <ErrorMessage styleType="danger">
                      {errorProductReview}
                    </ErrorMessage>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        // disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <ErrorMessage>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </ErrorMessage>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default withRouter(ProductDetail);
