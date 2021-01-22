import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage/error-message.component";
import { addToCart } from "../../redux/cart/cart.actions";

const Cart = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector(state => state.cart);

  console.log(cartItems.length);

  const productId = match.params.id;
  const qty = location.query ? +location.query.split("=")[1] : 1;

  console.log(productId, qty);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <ErrorMessage>
          Cart is Empty{" "}
          <Link to="/" style={{ textDecoration: "underline" }}>
            Shop Now
          </Link>
        </ErrorMessage>
      ) : (
        "hello"
      )}
    </>
  );
};

export default withRouter(Cart);
