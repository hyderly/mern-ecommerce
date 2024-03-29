import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Meta from '../../components/Helmat';

import { savePaymentMethod } from "../../redux/cart/cart.actions";

import CheckOutStepper from "../../components/CheckoutStepper/checkoutStepper.component";

const PaymentPage = ({ history }) => {
  const { shippingAddress } = useSelector(state => state.cart);

  useEffect(() => {
    if (Object.keys(shippingAddress).length === 0) {
      history.push("/shipping");
    }
  });

  const [paymentMethod, setPaymentMethod] = useState("Card");

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
    console.log(shippingAddress);
  };

  return (
    <>
    <Meta title="payment"/>
      <CheckOutStepper step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <h1 className="form-title">Payment Method</h1>
        <div className="form-box">
          <div className="form-group-radio">
            <input
              onChange={e => setPaymentMethod(e.target.value)}
              id="Card"
              name="paymentmethod"
              type="radio"
              value="Card"
              checked
            />
            <label htmlFor="PayPal">Credit or Debit Card</label>
          </div>

          <div className="form-group">
            <button type="submit" className="form-btn">
              Continue To Place Order
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PaymentPage;
