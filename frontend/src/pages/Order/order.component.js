import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Meta from '../../components/Helmat';


import WithSpinner from "../../components/WithSpinner/with-spinner.component";
import ErrorMessage from "../../components/ErrorMessage/error-message.component";

import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../redux/order/order.actions";
import {
  OrderDeliverTypes,
  OrderPayTypes,
} from "../../redux/order/order.types";

const OrderPage = ({ history, match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector(state => state.orderPay);
  const { success: successPay, error: errorPay } = orderPay;

  const orderDeliver = useSelector(state => state.orderDeliver);
  const {
    success: successDeliver,
    error: errorDeliver,
    loading: loadingDeliver,
  } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (!order || successPay || successDeliver) {
      dispatch({ type: OrderPayTypes.ORDER_PAY_RESET });
      dispatch({ type: OrderDeliverTypes.ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }

    console.log(order);
  }, [history, userInfo, dispatch, orderId, successPay, order, successDeliver]);

  const submitPaymentHandler = () => {
    if (!successPay) {
      dispatch(payOrder(orderId));
    }
  };

  const deliverHander = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <WithSpinner />
  ) : error ? (
    <ErrorMessage styleType="danger">{error}</ErrorMessage>
  ) : (
    <>
    <Meta title="Order Detail"/>
      <div className="place-order-page">
        <div className="overview-box-1">
          <h1>Order </h1>
          <span>{order._id}</span>
          <div className="overview-address overview-item">
            <h2>Shipping</h2>
            <p>
              <span>Name:</span> {order.user.name}
            </p>

            <p>
              <span>Email: </span>
              <a style={{ color: "#000" }} href={`mailto:${order.user.email}`}>
                {order.user.email}
              </a>
            </p>

            <p>
              <span>Address:</span>
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>

            {order.isDelivered ? (
              <ErrorMessage styleType="success">
                {order.deliveredAt}
              </ErrorMessage>
            ) : (
              <ErrorMessage styleType="danger">Not Delivered </ErrorMessage>
            )}
          </div>
          <div className="overview-payment overview-item">
            <h2>Payment Method</h2>
            <p>
              <span>Method:</span>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <ErrorMessage styleType="success">{order.paidAt}</ErrorMessage>
            ) : (
              <ErrorMessage styleType="danger">Not Paid </ErrorMessage>
            )}
          </div>

          <div className="overview-cart overview-item">
            <h2>Order Items</h2>
            <div className="overview-car-box">
              {order.orderItems.length === 0 ? (
                <ErrorMessage>
                  Order is Empty{" "}
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
                ${order.itemsPrice.toFixed(2)}
              </span>
            </div>
            <div className="summery-item">
              <span className="summery-item-label">Shipping</span>
              <span className="summery-item-text">
                ${order.shippingPrice.toFixed(2)}
              </span>
            </div>
            <div className="summery-item">
              <span className="summery-item-label">Tax</span>
              <span className="summery-item-text">
                ${order.taxPrice.toFixed(2)}
              </span>
            </div>
            <div className="summery-item">
              <span className="summery-item-label">Sub Total</span>
              <span className="summery-item-text">
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>
            {errorPay ? (
              <ErrorMessage styleType="danger">{errorPay}</ErrorMessage>
            ) : (
              ""
            )}

            <div className="summery-item">
              {order.isPaid ? (
                ""
              ) : (
                <button
                  class="form-btn summery-item"
                  onClick={submitPaymentHandler}
                >
                  Pay now
                </button>
              )}
              {loadingDeliver && <WithSpinner />}
              {errorDeliver && (
                <ErrorMessage styleType="danger">{errorDeliver}</ErrorMessage>
              )}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <button class="form-btn summery-item" onClick={deliverHander}>
                    Mark As Deliver
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
