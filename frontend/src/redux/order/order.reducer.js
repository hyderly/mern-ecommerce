import { OrderCreateTypes } from "./order.types";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case OrderCreateTypes.ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OrderCreateTypes.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
        success: true
      };
    case OrderCreateTypes.ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
