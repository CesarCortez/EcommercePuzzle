import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

//import axios from 'axios';

const ProductScreen = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  let [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetail = useSelector((state: any) => state.productDetail);
  const { loading, error, product } = productDetail;


  //const [product, setProduct] = useState({});

  useEffect(() => {
    dispatch<any>(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
    //query string
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={6}>
              <Row>
                <Col>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{product.title}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {product.rating ? (
                        <Rating
                          value={product.rating.rate ? product.rating.rate : 0}
                          text={`${product.rating.count} reviews`}
                        ></Rating>
                      ) : (
                        <Rating value={0} text={`0 reviews`}></Rating>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Category:</Col>
                          <Col>
                            <strong>
                              {product.category ? product.category : "N/A"}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Select
                              value={qty}
                              onChange={(e: any) => {
                                setQty(e.target.value);
                              }}
                            >
                              {[...Array(10)].map((x, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Button
                          onClick={addToCartHandler}
                          className="btn-block"
                          type="button"
                        >
                          Add to Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
