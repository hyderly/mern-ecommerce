import { ProductActionTypes } from "./product.types";

const INITIAL_STATE = {
  products: [],
  loading: false,
};

export const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductActionTypes.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ProductActionTypes.PRODUCT_LIST_FAIL:
      return {
        loading: false,
        products: action.payload,
      };
    default:
      return state;
  }
};
