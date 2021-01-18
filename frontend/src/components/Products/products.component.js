import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./products.styles.css";
import Product from "../Product/product.component";

// Import actions
import { listProducts } from "../../redux/product/product.actions";

const Products = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="products">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        products.map(product => <Product product={product} key={product._id} />)
      )}
    </div>
  );
};

export default Products;
