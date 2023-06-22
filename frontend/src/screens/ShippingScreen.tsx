import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state:any) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHabdler = (e:any) => {
    e.preventDefault();
    dispatch<any>(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/placeorder");
    };

  return (

  <FormContainer>
    <CheckoutSteps step1 step2 step4={false}></CheckoutSteps>
    <h1>Shipping</h1>
    <Form onSubmit={submitHabdler}>
      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        ></Form.Control>
      </Form.Group>
    <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter City"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        ></Form.Control>
      </Form.Group>
    <Form.Group controlId="postalCode">
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
        ></Form.Control>
    </Form.Group>
    <Form.Group controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
        ></Form.Control>
    </Form.Group>
    <Button type="submit" variant="primary">
        Continue
    </Button>
    </Form>
  </FormContainer>
    );
};

export default ShippingScreen;
