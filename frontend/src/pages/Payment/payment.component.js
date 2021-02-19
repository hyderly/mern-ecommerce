import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckOutStepper from "../../components/CheckoutStepper/checkoutStepper.component";

const PaymentPage = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = e => {
    //   e.preventDefault();
    //   dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/placeorder");
  };

  return (
    <>
      <CheckOutStepper step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <h1 className="form-title">Payment Method</h1>
        <div className="form-box">
          <div className="form-group-radio">
            <input
              onChange={e => setPaymentMethod(e.target.value)}
              id="PayPal"
              name="paymentmethod"
              type="radio"
              value={paymentMethod}
              checked
            />
            <label htmlFor="PayPal">PayPal or Credit Card</label>
          </div>
          <div className="form-group-radio">
            <input
              onChange={e => setPaymentMethod(e.target.value)}
              id="Stripe"
              name="paymentmethod"
              type="radio"
              value={paymentMethod}
            />
            <label htmlFor="PayPal">Stripe</label>
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
