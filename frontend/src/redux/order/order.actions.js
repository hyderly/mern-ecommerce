import axios from "axios";

import {
  OrderCreateTypes,
  OrderDetailsTypes,
  OrderPayTypes,
} from "./order.types";

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: OrderCreateTypes.ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders", order, config);

    dispatch({
      type: OrderCreateTypes.ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OrderCreateTypes.ORDER_CREATE_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: OrderDetailsTypes.ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: OrderDetailsTypes.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OrderDetailsTypes.ORDER_DETAILS_FAIL,
      payload: error.response?.data.error,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: OrderPayTypes.ORDER_Pay_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

    dispatch({
      type: OrderPayTypes.ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OrderPayTypes.ORDER_PAY_FAIL,
      payload: error.response?.data.error,
    });
  }
};
