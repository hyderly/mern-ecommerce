import axios from "axios";
import {
  UserLoginTypes,
  UserRegisterTypes,
  UserDetailsTypes,
} from "./user.types";

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: UserLoginTypes.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch({
      type: UserLoginTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UserLoginTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: UserLoginTypes.USER_LOGOUT,
  });
};

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({
      type: UserRegisterTypes.USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: UserRegisterTypes.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: UserLoginTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UserRegisterTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userDetails = id => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: UserDetailsTypes.USER_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Autherization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: UserDetailsTypes.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UserDetailsTypes.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
