import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import Header from "./components/Header";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Container } from "react-bootstrap";

const App: React.FC = () => {
  return (
    <Router>
      <Header></Header>
      <main>
        <Container className="mt-5">
          <Routes>
            <Route path="/" element={<HomeScreen></HomeScreen>}></Route>
            <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>
            <Route
              path="/register"
              element={<RegisterScreen></RegisterScreen>}
            ></Route>
            <Route
              path="/product/:id"
              element={<ProductScreen></ProductScreen>}
            ></Route>
            <Route
              path="/cart/:id?"
              element={<CartScreen></CartScreen>}
            ></Route>
            <Route
              path="/shipping"
              element={<ShippingScreen></ShippingScreen>}
            ></Route>
            <Route
              path="/placeorder"
              element={<PlaceOrderScreen></PlaceOrderScreen>}
            ></Route>
            <Route
              path="/order/:id"
              element={<OrderScreen></OrderScreen>}
            ></Route>
            <Route
              path="/myorders"
              element={<MyOrdersScreen></MyOrdersScreen>}
            ></Route>
            <Route
              path="/search/:keyword"
              element={<HomeScreen></HomeScreen>}
            ></Route>
          </Routes>
        </Container>
      </main>
    </Router>
  );
};

export default App;
