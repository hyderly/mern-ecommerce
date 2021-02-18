import {
  UserLoginTypes,
  UserRegisterTypes,
  UserDetailsTypes,
  UpdateProfileTypes,
} from "./user.types";

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
        userInfo: action.payload,
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

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case UserDetailsTypes.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserDetailsTypes.USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case UserDetailsTypes.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UpdateProfileTypes.USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case UpdateProfileTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case UpdateProfileTypes.USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
