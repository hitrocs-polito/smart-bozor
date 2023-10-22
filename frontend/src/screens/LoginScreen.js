import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Kirish</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email manzil</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Emailni kiriting"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Parol</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Parolni kiriting"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Kirish
        </Button>
      </Form>

      <Row>
        <Col>
          <br></br>
          Saytda yangimisiz?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            <span style={{ textDecoration: "underline" }}>
              Ro'yxatdan o'tish
            </span>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
