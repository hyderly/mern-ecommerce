import React from "react";
import { Link } from "react-router-dom";
import "./checkoutStepper.styles.css";

const CheckOutStepper = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="stepper-box">
      <div className="stepper-item">
        {step1 ? (
          <Link to="/login" className="stepper-link">
            Login
          </Link>
        ) : (
          <Link to="/login" className="stepper-link-disable">
            Login
          </Link>
        )}
      </div>
      <div className="stepper-item">
        {step2 ? (
          <Link to="/shipping" className="stepper-link">
            Shipping
          </Link>
        ) : (
          <Link to="/shipping" className="stepper-link-disable">
            Shipping
          </Link>
        )}
      </div>
      <div className="stepper-item">
        {step3 ? (
          <Link to="/payment" className="stepper-link">
            Payment
          </Link>
        ) : (
          <Link to="/payment" className="stepper-link-disable">
            Payment
          </Link>
        )}
      </div>
      <div className="stepper-item">
        {step4 ? (
          <Link to="/placeorder" className="stepper-link">
            Place Order
          </Link>
        ) : (
          <Link to="/placeorder" className="stepper-link-disable">
            Place Order
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckOutStepper;
