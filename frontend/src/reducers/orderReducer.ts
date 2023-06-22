import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_CREATE_REVIEW_FAIL,
  ORDER_CREATE_REVIEW_REQUEST,
  ORDER_CREATE_REVIEW_RESET,
  ORDER_CREATE_REVIEW_SUCCESS,
  ORDER_CANCELED_FAIL,
  ORDER_CANCELED_REQUEST,
  ORDER_CANCELED_SUCCESS,
  ORDER_CANCELED_RESET
  
} from "../constants/orderConstants";

import {Action} from '../types';

export const orderCreateReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST: //orderCreateRequest
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS: //orderCreateSuccess
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL: //orderCreateFail
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
    action: Action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST: //orderDETAILSRequest
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS: //orderDETAILSSuccess
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL: //orderDETAILSFail
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {},   action: Action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST: //orderPayRequest
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS: //orderPaySuccess
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL: //orderPayFail
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET: //orderPayReset
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] },   action: Action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST: //orderListMyRequest
      return {
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS: //orderListMySuccess
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_MY_FAIL: //orderListMyFail
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MY_RESET: //orderListMyReset
      return { orders: [] };
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {},   action: Action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST: //orderDeliverRequest
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS: //orderDeliverSuccess
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL: //orderDeliverFail
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET: //orderDeliverReset
      return {};
    default:
      return state;
  }
};

export const orderCanceledReducer = (state = {},   action: Action) => {
  switch (action.type) {
    case ORDER_CANCELED_REQUEST: //orderDeliverRequest
      return {
        loading: true,
      };
    case ORDER_CANCELED_SUCCESS: //orderDeliverSuccess
      return {
        loading: false,
        success: true,
      };
    case ORDER_CANCELED_FAIL: //orderDeliverFail
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CANCELED_RESET: //orderDeliverReset
      return {};
    default:
      return state;
  }
};

export const orderCreateReviewReducer = (state = { product: {} }, action: Action) => {
  switch (action.type) {
    case ORDER_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case ORDER_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case ORDER_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
