import axios from "axios";

import {
  OrderCreateTypes,
  OrderDetailsTypes,
  OrderPayTypes,
  OrderMyListTypes,
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

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OrderPayTypes.ORDER_PAY_REQUEST
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
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


export const getMyOrderList =  () => async (dispatch, getState) => {
  try {
    dispatch({
      type: OrderMyListTypes.ORDER_MY_LIST_REQUEST
    })

    const {
      userLogin: { userInfo },
    } = getState();
  
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {data} = await axios.get('/api/orders/myorders', config);

    dispatch({
      type: OrderMyListTypes.ORDER_MY_LIST_SUCCESS,
      payload: data
    })
    
  } catch (error) {
      dispatch({
        type: OrderMyListTypes.ORDER_MY_LIST_FAIL,
        payload: error.response?.data.error
      })
  }
}
