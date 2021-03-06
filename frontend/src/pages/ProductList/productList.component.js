import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Table, Row, Col } from "react-bootstrap";

import ErrorMessage from "../../components/ErrorMessage/error-message.component";
import WithSpinner from "../../components/WithSpinner/with-spinner.component";

import { listProducts } from "../../redux/product/product.actions";

const ProductListPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const createProductHandler = () => {
    // Create Product action dispatch
  };

  const deleteUserHanlder = () => {
      // Delete Product action dispatch
  }

  return (
    <>
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
