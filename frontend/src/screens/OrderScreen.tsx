import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Form,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import Rating from "../components/Rating";
import {
  getOrderDetails,
  deliverOrder,
  CancelOrder,
  createOrderReview,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_CREATE_REVIEW_RESET,
  ORDER_CANCELED_RESET,
} from "../constants/orderConstants";

let initialOptions = {
  "client-id": "",
  currency: "MXN",
  intent: "capture",
};

const OrderScreen = () => {
  const windowWidth = useRef(window.innerWidth);
  const navigate = useNavigate();
  const orderId = useParams().id;
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state: any) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state: any) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDetailsReview = useSelector(
    (state: any) => state.orderReviewCreate
  );
  const { loading: loadingReview, success: successReview } = orderDetailsReview;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const orderDeliver = useSelector((state: any) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderDeliver;

    const orderCanceled = useSelector((state: any) => state.orderCanceled);
  const {
    loading: loadingCanceled,
    success: successCanceled,
    error: errorCanceled,
  } = orderCanceled;

  if (!loading && order) {
    const addDecimals = (num: number) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc: any, item: any) => acc + item.price * item.qty,
        0
      )
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch<any>(getOrderDetails(orderId));
    }

    if (!order || order._id !== orderId) {
      dispatch<any>(getOrderDetails(orderId));
    }

    if (successReview || successCanceled ) {
      dispatch({ type: ORDER_CREATE_REVIEW_RESET });
      dispatch({ type: ORDER_CANCELED_RESET });
      dispatch<any>(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    orderId,
    order,
    successPay,
    successDeliver,
    successReview,
    loadingReview,
    successCanceled,
    navigate,
    userInfo,
  ]);

  const successPaymentHandler = () => {
    dispatch<any>(deliverOrder(order));
  };
  const successCanceledHandler = () => {
    dispatch<any>(CancelOrder(order));
  };

  const submitHandlerReview = (e: any) => {
    e.preventDefault();
    dispatch({ type: ORDER_CREATE_REVIEW_RESET });
    dispatch<any>(createOrderReview(orderId, { rating, comment }));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1 style={{ fontSize: "1rem" }}>Order {order._id} </h1>

      <Row>
        <Col md={windowWidth.current > 950 ? 8 : 12}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>Name:</strong> {order.user.name}
              <br></br>
              <strong>Email: </strong>{" "}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on{" "}
                  {DateTime.fromISO(order.deliveredAt).toLocaleString(
                    DateTime.DATETIME_MED
                  )}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on{" "}
                  {DateTime.fromISO(order.paidAt).toLocaleString(
                    DateTime.DATETIME_MED
                  )}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item: any, index: any) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={3}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.title}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={windowWidth.current > 950 ? 4 : 12}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && order.canceled !== true ? (
                <>
                  <ListGroup.Item>
                    <Button variant="primary" onClick={successPaymentHandler}>
                      {" "}
                      Pay and Deliver{" "}
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button variant="danger" onClick={successCanceledHandler}>
                      {" "}
                      Cancel Order{" "}
                    </Button>
                  </ListGroup.Item>
                </>
              ):<></>}
              {
                order.canceled ? (
                  <Message variant="danger">CANCELED</Message>
                ) : (
                  <></>
                )
              }
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {order.isPaid ? (
        <Row>
          <Col>
            <h2>Order Review</h2>
            {order.review ? (
              <>
                <Message variant="success">
                  You have already reviewed this order
                </Message>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Rating
                      value={order.review.rating}
                      text={`1 review`}
                    ></Rating>
                    <textarea
                      className="form-control"
                      value={order.review.comment}
                      readOnly
                    ></textarea>
                  </ListGroup.Item>
                </ListGroup>
              </>
            ) : (
              <>
                <Message variant="info">
                  You have not reviewed this order
                </Message>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Rating value={0} text={`0 reviews`}></Rating>
                  </ListGroup.Item>
                </ListGroup>

                <Form onSubmit={submitHandlerReview}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      data-value={rating}
                      onChange={(e: any) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      data-row={3}
                      value={comment}
                      onChange={(e: any) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderScreen;
