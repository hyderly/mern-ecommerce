import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

import ErrorMessage from "../../components/ErrorMessage/error-message.component";
import WithSpinner from "../../components/WithSpinner/with-spinner.component";

import { getUserList, deleteUserByAdmin } from "../../redux/user/user.actions";

import "bootstrap/dist/css/bootstrap.min.css";

const UserList = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;

  const deleteUser = useSelector(state => state.deleteUser);
  const {
    loading: loadingDeleteUser,
    error: errorDeleteUser,
    success: successDeleteUser,
  } = deleteUser;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDeleteUser]);

  const deleteUserHanlder = id => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deleteUserByAdmin(id));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loadingDeleteUser && <WithSpinner/>}
      {errorDeleteUser && (
        <ErrorMessage styleType="danger">{errorDeleteUser}</ErrorMessage>
      )}
      {loading ? (
        <WithSpinner />
      ) : error ? (
        <ErrorMessage styleType="danger">{error}</ErrorMessage>
      ) : (
        <Table stripe bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>
                  {user.name}
                  {user.name === userInfo.name && (
                    <span style={{ color: "green" }}> ( You )</span>
                  )}
                </td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteUserHanlder(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserList;
