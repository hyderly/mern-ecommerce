import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import withSpinner from "../WithSpinner/with-spinner.component";
import ErrorMessage from "../ErrorMessage/error-message.component";
import { addToCart, removeFromCart } from "../../redux/cart/cart.actions";

import "./cart.styles.css";

const Cart = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector(state => state.cart);

  const productId = match.params.id;
  const qty = location.search ? +location.search.split("=")[1] : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };


  return (
    <div className="Cart">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-box">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <ErrorMessage>
              Cart is Empty{" "}
              <Link to="/" style={{ textDecoration: "underline" }}>
                Shop Now
              </Link>
            </ErrorMessage>
          ) : (
            cartItems.map(item => (
              <div className="cart-item" key={item.product}>
                <img className="item-image" src={item.image} alt={item.name} />
                <p className="item-title">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </p>
                <p className="item-price">${item.price}</p>
                {item.countInStock > 0 && (
                  <>
                    <label>QTY: </label>
                    <select
                      value={item.qty}
                      onChange={e =>
                        dispatch(addToCart(item.product, +e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                <button
                  className="trash-btn"
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  <i className="fas fa-trash " />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-total">
          <h2 className="total-title">
            Subtotal of ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            items
          </h2>
          <h3>
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Cart);
