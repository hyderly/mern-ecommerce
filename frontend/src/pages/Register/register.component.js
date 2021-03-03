import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ErrorMessage from "../../components/ErrorMessage/error-message.component";
import WithSpinner from "../../components/WithSpinner/with-spinner.component";

import { register } from "../../redux/user/user.actions";

const RegisterPage = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();

    // Dispatch Register
    if (confirmPassword !== password) {
      setMessage("Password Does Not Matched");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      {message && <ErrorMessage styleType="danger">{message}</ErrorMessage>}
      {error && <ErrorMessage styleType="danger">{error}</ErrorMessage>}
      <h1 className="form-title">Sign Up</h1>

      {loading && <WithSpinner />}
      {}
      <div className="form-box">
        <div className="form-group">
          <label>Name</label>
          <input
            onChange={e => setName(e.target.value)}
            type="name"
            value={name}
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={e => setEmail(e.target.value)}
            type="email"
            value={email}
            placeholder="Enter Email Address"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={e => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Enter Password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="form-btn">
            Register
          </button>
        </div>

        <div className="form-text">
          Already Register ?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
