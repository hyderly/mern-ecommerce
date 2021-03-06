import axios from "axios";
import {
  UserLoginTypes,
  UserRegisterTypes,
  UserDetailsTypes,
  UpdateProfileTypes,
  UserListTypes,
  UserDeleteTypes,
  UserUpdateTypes,
} from "./user.types";

import { OrderMyListTypes } from "../order/order.types";

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
      payload: error.response.data.error,
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: UserLoginTypes.USER_LOGOUT,
  });
  dispatch({
    type: UserDetailsTypes.USER_DETAILS_RESET,
  });
  dispatch({
    type: UserListTypes.USER_LIST_RESET,
  });
  dispatch({
    type: OrderMyListTypes.ORDER_MY_LIST_RESET,
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
      payload: error.response.data.error,
    });
  }
};

export const getUserDetails = id => async (dispatch, getState) => {
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
        Authorization: `Bearer ${userInfo.token}`,
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
      payload: error.response?.data.error,
    });
  }
};

export const updateUserProfile = user => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: UpdateProfileTypes.USER_UPDATE_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put("/api/users/profile", user, config);

    dispatch({
      type: UpdateProfileTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UpdateProfileTypes.USER_UPDATE_PROFILE_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getUserList = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: UserListTypes.USER_LIST_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/users", config);

    dispatch({
      type: UserListTypes.USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UserListTypes.USER_LIST_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const deleteUserByAdmin = userId => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: UserDeleteTypes.USER_DELETE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${userId}`, config);

    dispatch({
      type: UserDeleteTypes.USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UserDeleteTypes.USER_DELETE_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const updateUserData = user => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: UserUpdateTypes.USER_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: UserUpdateTypes.USER_UPDATE_SUCCESS,
    });

    dispatch({
      type: UserDetailsTypes.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UserUpdateTypes.USER_UPDATE_FAIL,
      payload: error.response?.data.error,
    });
  }
};
