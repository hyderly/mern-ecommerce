import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import withSpinner from "../../components/WithSpinner/with-spinner.component";
import ErrorMessage from "../../components/ErrorMessage/error-message.component";

import { getOrderDetails } from "../../redux/order/order.actions";

const PlaceOrderPage = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, error, loading } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  });

  return loading ? (
    <withSpinner />
  ) : error ? (
    <ErrorMessage>{error}</ErrorMessage>
  ) : (
    <>
      <div class="place-order-page">
        <h1>Order {order.order._id}</h1>
        <div className="overview-box-1">
          <div className="overview-address overview-item">
            <h2>Shipping</h2>
            <p>
              <span>Address:</span>
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
          </div>
          <div className="overview-payment overview-item">
            <h2>Payment Method</h2>
            <p>
              <span>Method:</span>
              {order.paymentMethod}
            </p>
          </div>

          <div className="overview-cart overview-item">
            <h2>Order Items</h2>
            <div className="overview-car-box">
              {order.orderItems.length === 0 ? (
                <ErrorMessage>
                  Cart is Empty{" "}
                  <Link to="/" style={{ textDecoration: "underline" }}>
                    Shop Now
                  </Link>
                </ErrorMessage>
              ) : (
                order.orderItems.map(item => (
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
              <span className="summery-item-label">Items Total</span>
              <span className="summery-item-text">
                ${order.itemsTotal.toFixed(2)}
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
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {loading && <withSpinner />}
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
