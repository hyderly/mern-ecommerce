import { CartActionTypes } from "./cart.types";

const INITIAL_STATE = {
  cartItems: [],
  shippingAddress: {},
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find(x => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CartActionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload),
      };

    case CartActionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CartActionTypes.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
