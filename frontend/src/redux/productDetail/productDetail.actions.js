import axios from "axios";

import { ProductDetailActionTypes } from "./productDetail.types";

export const detailProduct = id => async dispatch => {
  try {
    dispatch({ type: ProductDetailActionTypes.PRODUCT_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: ProductDetailActionTypes.PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ProductDetailActionTypes.PRODUCT_DETAIL_FAIL,
      payload: error.response.data.error
    });
  }
};
