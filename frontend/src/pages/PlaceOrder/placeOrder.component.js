import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Meta from '../../components/Helmat';


import WithSpinner from "../../components/WithSpinner/with-spinner.component";
import ErrorMessage from "../../components/ErrorMessage/error-message.component";
import CheckOutStepper from "../../components/CheckoutStepper/checkoutStepper.component";

import { createOrder } from "../../redux/order/order.actions";

import "./placeorder.styles.css";

const PlaceOrderPage = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { shippingAddress, cartItems } = cart;

  // Calculations
  cart.totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  cart.itemsTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.shippingPrice = cart.itemsTotal > 100 ? 0 : 100;
  cart.tax = +(cart.itemsTotal * 0.16);
  cart.subTotal = cart.itemsTotal + cart.shippingPrice + cart.tax;

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error, loading } = orderCreate;

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsTotal,
        taxPrice: cart.tax,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.subTotal,
      })
    );
  };

  useEffect(() => {
    if (cart.paymentMethod === null) {
      history.push("/payment");
    }

    if (success) {
      history.push(`/order/${order._id}`);
    }

    // eslint-disable-next-line
  }, [history, success, cart.paymentMethod]);

  return (
    <>
      <Meta title="Place Order"/>
      <CheckOutStepper step1 step2 step3 step4 />
      <div className="place-order-page">
        <div className="overview-box-1">
          <div className="overview-address overview-item">
            <h2>Shipping</h2>
            <p>
              <span>Address:</span>
              {shippingAddress.address}, {shippingAddress.city}{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>
          <div className="overview-payment overview-item">
            <h2>Payment Method</h2>
            <p>
              <span>Method:</span>
              {cart.paymentMethod}
            </p>
          </div>

          <div className="overview-cart overview-item">
            <h2>Order Items</h2>
            <div className="overview-car-box">
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
                    <img
                      className="item-image"
                      src={item.image}
                      alt={item.name}
                    />
                    <p className="item-title">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </p>
                    <p className="item-price">${item.price}</p>
                    <span>X</span>
                    <p className="item-price">{item.qty}</p>
                    <span>=</span>
                    <p className="item-price">${item.qty * item.price}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="overview-box-2">
          <div className="overview-summary">
            <h2>Order Summary</h2>
            <div className="summery-item">
              <span className="summery-item-label">Total QTY</span>
              <span className="summery-item-text">{cart.totalItems}</span>
            </div>
            <div className="summery-item">
              <span className="summery-item-label">Items Total</span>
              <span className="summery-item-text">
                ${cart.itemsTotal.toFixed(2)}
              </span>
            </div>
            <div className="summery-item">
              <span className="summery-item-label">Shipping</span>
              <span className="summery-item-text">
                ${cart.shippingPrice.toFixed(2)}
              </span>
            </div>
            <div className="summery-item">
              <span className="summery-item-label">Tax</span>
              <span className="summery-item-text">${cart.tax.toFixed(2)}</span>
            </div>
            <div className="summery-item">
              <span className="summery-item-label">Sub Total</span>
              <span className="summery-item-text">
                ${cart.subTotal.toFixed(2)}
              </span>
            </div>
            {error && <ErrorMessage styleType='danger'>{error}</ErrorMessage>}
            {loading && <WithSpinner />}
            <div className="summery-item">
              <button
                type="button"
                disabled={cartItems === 0}
                onClick={placeOrder}
                className="form-btn"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
