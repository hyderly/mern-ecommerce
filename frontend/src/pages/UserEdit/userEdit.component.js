import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ErrorMessage from "../../components/ErrorMessage/error-message.component";
import WithSpinner from "../../components/WithSpinner/with-spinner.component";

import { getUserDetails } from "../../redux/user/user.actions";

const UserEdit = ({ match, history }) => {
  const userId = match.params.id;

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, userId]);

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <>
      <Link to="/admin/userlist" className="product-btn">
        &#10094; Back to shop
      </Link>
      <form className="form" onSubmit={submitHandler}>
        <h1 className="form-title">Edit User</h1>

        {loading ? (
          <WithSpinner />
        ) : error ? (
          <ErrorMessage styleType="danger">{error}</ErrorMessage>
        ) : (
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
            <div className="">
              <input
                onChange={e => setIsAdmin(e.target.checked)}
                type="checkbox"
                checked={isAdmin}
                label="isAdmin"
              />
              <label>isAdmin</label>
            </div>

            <div className="form-group">
              <button type="submit" className="form-btn">
                Update
              </button>
            </div>
          </div>
        )}
        {}
      </form>
    </>
  );
};

export default UserEdit;
