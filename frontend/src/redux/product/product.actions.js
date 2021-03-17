import axios from "axios";

import {
  ProductActionTypes,
  ProductDeleteTypes,
  ProductCreateTypes,
  ProductUpdateTypes,
  ProductCreateReviewTypes,
} from "./product.types";

export const listProducts = () => async dispatch => {
  try {
    dispatch({ type: ProductActionTypes.PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({
      type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ProductActionTypes.PRODUCT_LIST_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const deleteProduct = productId => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: ProductDeleteTypes.PRODUCT_DELETE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${productId}`, config);

    dispatch({
      type: ProductDeleteTypes.PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ProductDeleteTypes.PRODUCT_DELETE_FAIL,
      payload: error.response?.data.error,
    });
  }
};

// Create Product
export const createProductItem = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: ProductCreateTypes.PRODUCT_CREATE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: ProductCreateTypes.PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ProductCreateTypes.PRODUCT_CREATE_FAIL,
      payload: error.response?.data.error,
    });
  }
};

// Update Product by Id
export const updateProductItem = product => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: ProductUpdateTypes.PRODUCT_UPDATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: ProductUpdateTypes.PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ProductUpdateTypes.PRODUCT_UPDATE_FAIL,
      payload: error.response?.data.error,
    });
  }
};

// Create Review
export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: ProductCreateReviewTypes.PRODUCT_CREATE_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(
      `/api/products/${productId}/review`,
      review,
      config
    );

    dispatch({
      type: ProductCreateReviewTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ProductCreateReviewTypes.PRODUCT_CREATE_REVIEW_FAIL,
      payload: error.response?.data.error,
    });
  }
};
