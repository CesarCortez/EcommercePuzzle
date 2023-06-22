import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let { id } = useParams();
  const productId = id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.cart);
  const userLogin = useSelector((state: any) => state.userLogin);
  const { cartItems } = cart;
  const { userInfo } = userLogin;


  useEffect(() => {
    if (productId) {
      dispatch<any>(addToCart(productId, qty)); //cartActions.js
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id: any) => {

    dispatch<any>(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };
  const LoginHandler = () => {
    navigate("/login");
  };

  return (
    <Row>
      <Col md={8}>
        {" "}
        <h1>Shopping Cart</h1>{" "}
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty{" "}
            <Link to="/">Go to Products</Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item: any) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.title}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    {" "}
                    <Form.Select
                      value={item.qty}
                      onChange={(e) => {
                        dispatch<any>(
                          addToCart(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(10)].map((x, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    {" "}
                    <button
                      type="button"
                      data-variant="light"
                      onClick={() => {
                        removeFromCartHandler(item.product);
                      }}
                    >
                      {" "}
                      <i className="fas fa-trash"></i>{" "}
                    </button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc: any, item: any) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc: any, item: any) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              {userInfo ? (
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              ) : (
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={LoginHandler}
                >
                  Login to Checkout
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
