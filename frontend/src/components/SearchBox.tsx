import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBox = () => {
  const windowWidth = useRef(window.innerWidth);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  let location = useLocation().pathname;
  let regex = /page/;
  let result = regex.test(location);
  useEffect(() => {
    if (keyword.length < 1 && result !== true) navigate("/");
  }, [keyword, navigate, windowWidth, location,result]);

  const submitHandler = (e:any) => {
    e.preventDefault();
    if (keyword.trim()) navigate(`/search/${keyword}`);
    else navigate("/");
  };

  return (
    <Form onSubmit={submitHandler} className="form-inline my-2 my-lg-0">
      <Form.Control
        className={
          windowWidth.current <= 950
            ? "mr-sm-2 sm-5 mb-2 rounded"
            : "mr-sm-2 ml-sm-5 rounded"
        }
        name="q"
        type="text"
        placeholder="Search Products..."
        aria-label="Search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button
        variant="outline-secondary"
        className={
          windowWidth.current < 600
            ? "my-2 my-sm-0 btn-block rounded"
            : "my-2 my-sm-0 rounded"
        }
        type="submit"
        value="Submit"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
