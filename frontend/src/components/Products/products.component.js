import React, { useState, useEffect } from "react";
import axios from "axios";
import "./products.styles.css";
import Product from "../Product/product.component";

// import products from '../../products'

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
      console.log(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="products">
      {products.map(product => (
        <Product product={product} key={product._id} />
      ))}
    </div>
  );
};

export default Products;
