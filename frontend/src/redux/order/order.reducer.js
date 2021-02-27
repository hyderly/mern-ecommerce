import {
  OrderCreateTypes,
  OrderDetailsTypes,
  OrderPayTypes,
} from "./order.types";

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
        success: true,
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

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case OrderDetailsTypes.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OrderDetailsTypes.ORDER_DETAILS_SUCCESS:
      return {
        order: action.payload,
        loading: false,
      };
    case OrderDetailsTypes.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case OrderPayTypes.ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case OrderPayTypes.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case OrderPayTypes.ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case OrderPayTypes.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
