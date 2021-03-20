import React, { useEffect } from "react";
import {Col} from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./products.styles.css";
import Product from "../Product/product.component";

import WithSpinner from "../WithSpinner/with-spinner.component";
import ErrorMessage from "../ErrorMessage/error-message.component";
import Paginate from '../Paginate/paginate.component'


// Import actions
import { listProducts } from "../../redux/product/product.actions";

const Products = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className="products-box">
    <div className="products">

      {loading ? (
        <WithSpinner />
      ) : error ? (
        <ErrorMessage styleType="danger">{error}</ErrorMessage>
      ) : (
        products.map(product => (
          <Product product={product} key={product._id} />
        ))
      )}
    </div>
    <div>

      {loading ? (
        <WithSpinner />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''}/>
      )}
      </div>

    </div>
  );
};

export default withRouter(Products);
