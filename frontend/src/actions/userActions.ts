import axios from "axios";
import {
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LIST_RESET,
  ORDER_LIST_MY_RESET,
} from "../constants/userConstants";
import { Dispatch } from "react";

export const login = (email: string, password: string) => async (
  dispatch: Dispatch<any>
) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error:any) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : "Invalid email or password",
    });
  }
};

export const register = (
  name: string,
  email: string,
  password: string
) => async (dispatch: Function) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userRegisterInfo", JSON.stringify(data));
  } catch (error:any) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch: Function) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("userRegisterInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  // dispatch({ type: USER_DETAILS_RESET });
  // dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
};
