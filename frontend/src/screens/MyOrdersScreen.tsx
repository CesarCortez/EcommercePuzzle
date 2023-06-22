import React, { useEffect} from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { listMyOrders } from "../actions/orderActions";

const MyOrdersScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state: any) => state.orderListMy);
  let { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (!orders || orders.length === 0) {
      dispatch<any>(listMyOrders());
    }
  }, [dispatch, navigate, userInfo, orders]);

  useEffect(
    () => () => {
      orders = [];
    },
    []
  );

  return (
    <Row>
      <Col>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <div>
            <Table
              responsive
              className="table table-striped table-bordered table-hover table-sm "
            >
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </Link>
                    </td>
                    <td>
                      {order.canceled ? (
                        <p>Canceled</p>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default MyOrdersScreen;
