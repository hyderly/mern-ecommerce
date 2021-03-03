import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ErrorMessage from "../../components/ErrorMessage/error-message.component";
import WithSpinner from "../../components/WithSpinner/with-spinner.component";

import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/user/user.actions";

import { getMyOrderList } from "../../redux/order/order.actions";

import "./profile.styles.css";

const ProfilePage = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector(state => state.orderMyList);
  const { orders, loading: loadingOrder, error: errorOrder } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(getMyOrderList());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Confirm Password not matched");
    } else {
      // Dispatch Profile Update Action
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div className="profile-page">
      <form className="profile-form" onSubmit={submitHandler}>
        {message && <ErrorMessage styleType="danger">{message}</ErrorMessage>}
        {error && <ErrorMessage styleType="danger">{error}</ErrorMessage>}
        {success && (
          <ErrorMessage styleType="success">Profile Updated</ErrorMessage>
        )}
        <h1 className="form-title">User Profile</h1>

        {loading && <WithSpinner />}
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
              Update Profile
            </button>
          </div>
        </div>
      </form>
      <div class="orders">
        {errorOrder && (
          <ErrorMessage styleType="danger">{errorOrder}</ErrorMessage>
        )}
        {loadingOrder && <WithSpinner />}
        <h1>My Orders</h1>

        <table striped bordered hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVER</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link to={`order/${order._id}`}>
                    <button class="">Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;
