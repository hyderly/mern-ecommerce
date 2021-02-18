import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShippingPage = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  return (
    <form className="form">
      <h1 className="form-title">SignIn</h1>
      <div className="form-box">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={e => setAddress(e.target.value)}
            type="text"
            value={address}
            placeholder="Enter Adress"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={e => setCity(e.target.value)}
            type="text"
            value={city}
            placeholder="Enter City"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={e => setPostalCode(e.target.value)}
            type="text"
            value={postalCode}
            placeholder="Enter Postal Code"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={e => setCountry(e.target.value)}
            type="text"
            value={country}
            placeholder="Enter Country"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="form-btn">
            Next
          </button>
        </div>

        <div className="form-text">New Customer ?</div>
      </div>
    </form>
  );
};

export default ShippingPage;
