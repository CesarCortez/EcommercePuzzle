import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";
import { userRegisterReducer } from "./reducers/userReducers";
import { productDetailReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderDeliverReducer,
  orderCanceledReducer,
  orderCreateReviewReducer
} from "./reducers/orderReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderCanceled: orderCanceledReducer,
  orderReviewCreate: orderCreateReviewReducer,
  orderListMy: orderListMyReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") as any)
  : [];

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod") as any)
  : null;

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") as any)
  : null;

const saveShippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress") as any)
  : {};

const userRegisterInfoFromStorage = localStorage.getItem("userRegisterInfo")
  ? JSON.parse(localStorage.getItem("userRegisterInfo") as any)
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: saveShippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  userRegister: { userRegisterInfo: userRegisterInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
