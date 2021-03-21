import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Meta from "../../components/Helmat";

import { Link } from "react-router-dom";
import { Button, Table, Row, Col } from "react-bootstrap";

import ErrorMessage from "../../components/ErrorMessage/error-message.component";
import WithSpinner from "../../components/WithSpinner/with-spinner.component";

import {
  listProducts,
  deleteProduct,
  createProductItem,
} from "../../redux/product/product.actions";

import { ProductCreateTypes } from "../../redux/product/product.types";

const ProductListPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector(state => state.productCreate);
  const {
    loading: loadingCreateProduct,
    error: errorCreateProduct,
    success: successCreateProduct,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDeleteProduct,
    error: errorDeleteProduct,
    success: successDeleteProduct,
  } = productDelete;

  useEffect(() => {
    dispatch({ type: ProductCreateTypes });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreateProduct) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDeleteProduct,
    successCreateProduct,
    createdProduct,
  ]);

  const createProductHandler = () => {
    dispatch(createProductItem());
  };

  const deleteUserHanlder = productId => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(productId));
    }
  };

  return (
    <>
      <Meta title="Product List" />
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3 btn-dark" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreateProduct && <WithSpinner />}
      {errorCreateProduct && (
        <ErrorMessage styleType="danger">{errorCreateProduct}</ErrorMessage>
      )}
      {loadingDeleteProduct && <WithSpinner />}
      {errorDeleteProduct && (
        <ErrorMessage styleType="danger">{errorDeleteProduct}</ErrorMessage>
      )}
      {loading ? (
        <WithSpinner />
      ) : error ? (
        <ErrorMessage styleType="danger">{error}</ErrorMessage>
      ) : (
        <Table stripe bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATERGORY</th>
              <th>BRAND</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteUserHanlder(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListPage;
