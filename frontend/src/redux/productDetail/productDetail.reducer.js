import { ProductDetailActionTypes } from "./productDetail.types";

const INITIAL_STATE = {
  product: { reviews: [] },
};

export const productDetailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductDetailActionTypes.PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductDetailActionTypes.PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case ProductDetailActionTypes.PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
