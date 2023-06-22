import React, { useEffect } from "react";
import { Button,Row,Col,ListGroup,Image,Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state:any) => state.cart);
    const { shippingAddress } = cart;

    const navigate = useNavigate();

    // Calculate prices
    const addDecimals = (num:number) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    cart.itemsPrice = addDecimals(cart.cartItems.reduce(
        (acc:any, item:any) => acc + item.price * item.qty,
        0
    ));
    cart.shippingPrice = addDecimals( cart.itemsPrice > 100 ? 0 : 10);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    const orderCreate = useSelector((state:any) => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
        }


    }, [navigate, success, order]);

    const placeOrderHandler = () => {
        dispatch<any>(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: "Not Defined",
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };

  return (
    <>
    <CheckoutSteps step1 step2 step4></CheckoutSteps>

    <Row>
        <Col md={8}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address:</strong>
                        {shippingAddress.address},{shippingAddress.city}{" "}
                        {shippingAddress.postalCode},{shippingAddress.country}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cart.cartItems.length === 0 ? (
                        <Message variant="info" >Your cart is empty</Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cart.cartItems.map((item:any, index:any) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
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
                                            {item.qty} x ${item.price} = $
                                            {item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {error && <Message variant="danger">{error}</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                            type="button"
                            className="btn-block"
                            disabled={cart.cartItems === 0}
                            onClick={placeOrderHandler}
                        >
                            Place Order
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>


    </>
  )
}

export default PlaceOrderScreen