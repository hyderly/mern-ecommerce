import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckOutStepper from "../../components/CheckoutStepper/checkoutStepper.component";

import { saveShippingAddress } from "../../redux/cart/cart.actions";

const ShippingPage = ({ history }) => {
  const { shippingAddress } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.userLogin);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  });

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <>
      <CheckOutStepper step1 step2 />
      <form className="form" onSubmit={submitHandler}>
        <h1 className="form-title">Shipping Details</h1>
        <div className="form-box">
          <div className="form-group">
            <label htmlFor="email">Address</label>
            <input
              onChange={e => setAddress(e.target.value)}
              type="text"
              value={address}
              placeholder="Enter Address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">City</label>
            <input
              onChange={e => setCity(e.target.value)}
              type="text"
              value={city}
              placeholder="Enter City"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Postal Code</label>
            <input
              onChange={e => setPostalCode(e.target.value)}
              type="text"
              value={postalCode}
              placeholder="Enter Postal Code"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Country</label>
            <input
              onChange={e => setCountry(e.target.value)}
              type="text"
              value={country}
              placeholder="Enter Country"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="form-btn">
              COntinue To Payments
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ShippingPage;
