import axios from "axios";
import { UserLoginTypes } from "./user.types";

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
