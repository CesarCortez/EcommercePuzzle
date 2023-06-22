import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS
} from "../constants/productConstants";
import axios from "axios";
import { Dispatch } from "react";

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
    category: string;
}

let products:Product[] = [];

// 1. Send a request to the server to get product details
export const listProductDetails = (id:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const response = await axios.get<Product[]|Error>('https://fakestoreapi.com/products');
    products = response.data as Product[] ;
    products.forEach((product:Product) => {
        if (product.id === parseInt(id)){
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: product,
            });
        }
    });
  } catch (error:any) {
    // 3. If the request is unsuccessful, dispatch PRODUCT_DETAILS_FAIL and pass the error message to the reducer
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};