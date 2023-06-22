import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useDispatch } from "react-redux";
import SearchBox from "./SearchBox";
//call action = useDispatch
//bring something from state = useSelector

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <Nav.Link as={Link} to="/">
            <Navbar.Brand>MOCK SHOP</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div>
              <Routes>
                <Route path="/" element={<SearchBox></SearchBox>}></Route>
                <Route
                  path="/search/*"
                  element={<SearchBox></SearchBox>}
                ></Route>
              </Routes>
            </div>
            <Nav className="ml-auto">
              {userInfo ? (
                <>
                  <Nav.Link state={{ color: "black" }} as={Link} to="/cart">
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Nav.Link>
                  <Nav.Link state={{ color: "black" }} as={Link} to="/myorders">
                    <i className="fas fa-file"></i> My Orders
                  </Nav.Link>
                  <NavDropdown title={userInfo.name} id="username">
                    <Nav.Link
                      onClick={logoutHandler}
                      style={{ color: "black" }}
                    >
                      Logout
                    </Nav.Link>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
