import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import ErrorMessage from "../../components/ErrorMessage/error-message.component";
import WithSpinner from "../../components/WithSpinner/with-spinner.component";

import { login } from "../../redux/user/user.actions";

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.pushState(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <h1 className="form-title">SignIn</h1>
      {error && <ErrorMessag>{error}</ErrorMessage>}
      {loading && <withRouter />}
      {}
      <div className="form-box">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={e => setEmail(e.target.value)}
            name="email"
            value={email}
            placeholder="Enter Email Address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={e => setPassword(e.target.value)}
            name="password"
            value={password}
            placeholder="Enter Password"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="form-btn">
            SignIn
          </button>
        </div>

        <div className="form-text">
          New Customer ?
          <Link to={redirect ? `/redirect?redirect=${redirect}` : "/register"}>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
