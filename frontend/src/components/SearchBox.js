import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate(navigate(location.pathname));
    }
  };

  return (
    <Form onSubmit={submitHandler} inline className="search-form">
      <Form.Control
        placeholder="Qidirish..."
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button className="search-button" type="submit" variant="dark">
        Qidirish
      </Button>
    </Form>
  );
}

export default SearchBox;
