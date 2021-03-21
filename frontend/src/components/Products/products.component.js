import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./products.styles.css";
import Product from "../Product/product.component";

import WithSpinner from "../WithSpinner/with-spinner.component";
import ErrorMessage from "../ErrorMessage/error-message.component";

// Import actions
import { listProducts } from "../../redux/product/product.actions";

const Products = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div className="products">
      {loading ? (
        <WithSpinner />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        products?.map(product => (
          <Product product={product} key={product._id} />
        ))
      )}
    </div>
  );
};

export default withRouter(Products);
