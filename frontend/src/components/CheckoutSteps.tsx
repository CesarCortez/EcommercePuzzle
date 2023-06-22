import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Steps {
  step1: boolean | string;
  step2: boolean | string;
  step4: boolean | string;
}

const CkeckoutSteps = ({ step1, step2, step4 }: Steps) => {
  return (
    <div className="row justify-content-center mb-4">
      <div className="col">
        <Nav.Item>
          {step1 ? (
            <Nav.Link as={Link} to="/login">
              Sign In
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Sign In</Nav.Link>
          )}
        </Nav.Item>
      </div>

      <div className="col">
        <Nav.Item>
          {step2 ? (
            <Nav.Link as={Link} to="/shipping">
              Shipping
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}
        </Nav.Item>
      </div>

      <div className="col">
        <Nav.Item>
          {step4 ? (
            <Nav.Link as={Link} to="/placeorder">
              Place Order
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
          )}
        </Nav.Item>
      </div>
    </div>
  );
};

export default CkeckoutSteps;
