import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_CREATE_REVIEW_FAIL,
  ORDER_CREATE_REVIEW_REQUEST,
  ORDER_CREATE_REVIEW_SUCCESS,
  ORDER_CANCELED_REQUEST,
  ORDER_CANCELED_SUCCESS,
  ORDER_CANCELED_FAIL,
} from "../constants/orderConstants";
import axios from "axios";
import { Dispatch } from "react";

export const createOrder = (order:any) => async (dispatch:Dispatch<any>, getState:any) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
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
    const { data } = await axios.post(`/api/orders`, order, config);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id:any) => async (dispatch:Dispatch<any>, getState:any) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/` + id, config);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch:Dispatch<any>, getState:any) => {

  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState(

    );
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/orders/myorders`,
      config
    );
    
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId:any) => async (
  dispatch:Dispatch<any>, getState:any
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
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

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      config
    );
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (err:any) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deliverOrder = (order:any) => async (dispatch:Dispatch<any>, getState:any) => {

  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState(

    );
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );
    
    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  }
  catch (error:any) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const CancelOrder = (order:any) => async (dispatch:Dispatch<any>, getState:any) => {

  try {
    dispatch({
      type: ORDER_CANCELED_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState(

    );
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/cancel`,
      {},
      config
    );
    
    dispatch({
      type: ORDER_CANCELED_SUCCESS,
      payload: data,
    });
  }
  catch (error:any) {
    dispatch({
      type: ORDER_CANCELED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createOrderReview = (OrderId:any, review:any) => async (
  dispatch: Dispatch<any>,
  getState:any
) => {
  try {
    dispatch({
      type: ORDER_CREATE_REVIEW_REQUEST,
    });

    // 1. Get the user info from the state
    const {
      userLogin: { userInfo },
    } = getState();

    // 2. Send a request to the server to create the product review
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // 3. If the request is successful, dispatch PRODUCT_CREATE_REVIEW_SUCCESS and pass the data to the reducer
    const {data} = await axios.put(`/api/orders/${OrderId}/review`, review, config);

    dispatch({
      type: ORDER_CREATE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    // 4. If the request is unsuccessful, dispatch PRODUCT_CREATE_REVIEW_FAIL and pass the error message to the reducer
    dispatch({
      type: ORDER_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};