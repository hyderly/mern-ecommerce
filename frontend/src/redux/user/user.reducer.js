import {
  UserLoginTypes,
  UserRegisterTypes,
  UserDetailsTypes,
  UpdateProfileTypes,
  UserListTypes,
  UserDeleteTypes,
  UserUpdateTypes,
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
    case UserDetailsTypes.USER_DETAILS_RESET:
      return {
        user: {},
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

export const userListReducer = (
  state = { users: [], loading: true },
  action
) => {
  switch (action.type) {
    case UserListTypes.USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case UserListTypes.USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case UserListTypes.USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UserListTypes.USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UserDeleteTypes.USER_DELETE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case UserDeleteTypes.USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UserDeleteTypes.USER_DELETE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case UserUpdateTypes.USER_UPDATE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case UserUpdateTypes.USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UserUpdateTypes.USER_UPDATE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case UserUpdateTypes.USER_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};
