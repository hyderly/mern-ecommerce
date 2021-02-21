import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { savePaymentMethod } from "../../redux/cart/cart.actions";

import CheckOutStepper from "../../components/CheckoutStepper/checkoutStepper.component";

const PlaceOrderPage = ({ history }) => {
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    if (cart.paymentMethod === null) {
      history.push("/payment");
    }
  });

  return (
    <div class="place-order-page">
      <CheckOutStepper step1 step2 step3 step4 />
      <div className="overview-box-1">
        <div className="overview-address">
            <h2 className="overview-title"
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
