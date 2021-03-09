import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ErrorMessage from "../../components/ErrorMessage/error-message.component";
import WithSpinner from "../../components/WithSpinner/with-spinner.component";

import { detailProduct } from "../../redux/productDetail/productDetail.actions";
import { updateProductItem } from "../../redux/product/product.actions";

import { ProductUpdateTypes } from "../../redux/product/product.types";

const ProductEditPage = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productDetail = useSelector(state => state.productDetail);
  const { loading, error, product } = productDetail;

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: loadingProductUpdate,
    error: errorProductUpdate,
    success: successProductUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successProductUpdate) {
      dispatch({ type: ProductUpdateTypes.PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(detailProduct(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successProductUpdate]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateProductItem({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="product-btn">
        &#10094; Back to shop
      </Link>
      <form className="form" onSubmit={submitHandler}>
        <h1 className="form-title">Edit Product</h1>
        {loadingProductUpdate && <WithSpinner />}
        {errorProductUpdate && (
          <ErrorMessage styleType="danger">{errorProductUpdate}</ErrorMessage>
        )}
        {loading ? (
          <WithSpinner />
        ) : error ? (
          <ErrorMessage styleType="danger">{error}</ErrorMessage>
        ) : (
          <div className="form-box">
            <div className="form-group">
              <label>Name</label>
              <input
                onChange={e => setName(e.target.value)}
                type="name"
                value={name}
                placeholder="Enter Name"
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                onChange={e => setPrice(e.target.value)}
                type="number"
                value={price}
                placeholder="Enter Product Price"
              />
            </div>

            <div className="form-group">
              <label>Image</label>
              <input
                onChange={e => setImage(e.target.value)}
                type="text"
                value={image}
                placeholder="Enter Product Image Url"
              />
            </div>

            <div className="form-group">
              <label>Brand</label>
              <input
                onChange={e => setBrand(e.target.value)}
                type="text"
                value={brand}
                placeholder="Enter Product Brand"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                onChange={e => setCategory(e.target.value)}
                type="text"
                value={category}
                placeholder="Enter Product Category"
              />
            </div>

            <div className="form-group">
              <label>Count In Stock</label>
              <input
                onChange={e => setCountInStock(e.target.value)}
                type="number"
                value={countInStock}
                placeholder="Enter Product Count In Stock"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                onChange={e => setDescription(e.target.value)}
                type="text"
                value={description}
                placeholder="Enter Product Description"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="form-btn">
                Update
              </button>
            </div>
          </div>
        )}
        {}
      </form>
    </>
  );
};

export default ProductEditPage;
