import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/error-message.component";
import CheckOutStepper from "../../components/CheckoutStepper/checkoutStepper.component";

import './placeorder.styles.css';

const PlaceOrderPage = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress, cartItems } = cart;

  // Calculations
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  const shippingPrice = itemsTotal > 100 ? 0 : 100
  const tax = +(itemsTotal * 0.16);
  const subTotal = itemsTotal + shippingPrice + tax;

  useEffect(() => {
    if (cart.paymentMethod === null) {
      history.push("/payment");
    }
  });

  return (
    <>
      <CheckOutStepper step1 step2 step3 step4 />
      <div class="place-order-page"> 
        <div className="overview-box-1">
          <div className="overview-address overview-item">
              <h2>Shipping</h2>
              <p>
                <span>Address:</span>
                
                {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}, {shippingAddress.country}
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
                {
                  cartItems.length === 0 ? (
                    <ErrorMessage>
                      Cart is Empty{" "}
                      <Link to="/" style={{ textDecoration: "underline" }}>
                        Shop Now
                      </Link>
                    </ErrorMessage>
                  ):(
                    cartItems.map(item => (
                      <div className="cart-item" key={item.product}>
                        <img className="item-image" src={item.image} alt={item.name} />
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
                  )
                }
              </div>
          </div>
        </div>

        <div className="overview-box-2">
              <div className="overview-summary">
                <h2 >Order Summary</h2>
                <div className="summery-item">
                  <span className="summery-item-label">Total QTY</span>
                  <span className="summery-item-text">{totalItems}</span>
                </div>
                <div className="summery-item">
                  <span className="summery-item-label">Items Total</span>
                  <span className="summery-item-text">${itemsTotal.toFixed(2)}</span>
                </div>
                <div className="summery-item">
                  <span className="summery-item-label">Shipping</span>
                  <span className="summery-item-text">${shippingPrice.toFixed(2)}</span>
                </div>
                <div className="summery-item">
                  <span className="summery-item-label">Tax</span>
                  <span className="summery-item-text">${tax.toFixed(2)}</span>
                </div>
                <div className="summery-item">
                  <span className="summery-item-label">Sub Total</span>
                  <span className="summery-item-text">${subTotal.toFixed(2)}</span> 
                </div>
                <div className="summery-item">
                    <button
                      type="button"
                      disabled={cartItems === 0}
                      // onClick={checkoutHandler}
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
