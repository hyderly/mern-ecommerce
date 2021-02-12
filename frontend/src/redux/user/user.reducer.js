import { UserLoginTypes } from "./user.types";

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
    case UserLoginTypes.USER_LOGIN_SUCESS:
      return {
        laoding: false,
      };
    case UserLoginTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};