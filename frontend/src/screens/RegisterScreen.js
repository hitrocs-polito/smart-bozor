import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Ro'yxatdan o'tish</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Ism</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Ismingizni kiriting"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email manzil</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Emailingizni kiriting"
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

        <Form.Group className="mb-3" controlId="passwordConfirm">
          <Form.Label>Parolni tasdiqlash</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Parolni tasdiqlang"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Ro'yxatdan o'tish
        </Button>
      </Form>

      <Row>
        <Col>
          <br></br>
          Avval ro'yxatdan o'tganmisiz?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            <span style={{ textDecoration: "underline" }}>Kirish</span>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
