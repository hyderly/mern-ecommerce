import { UserLoginTypes, UserRegisterTypes } from "./user.types";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case UserLoginTypes.USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case UserLoginTypes.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case UserLoginTypes.USER_LOGIN_FAIL:
      return {
        laoding: false,
        error: action.payload,
      };
    case UserLoginTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case UserRegisterTypes.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case UserRegisterTypes.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        payload: action.payload,
      };
    case UserRegisterTypes.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
