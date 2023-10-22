import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Click");
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as={"legend"}>To'lov turini tanlang</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="Click orqali"
              id="click"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
          <br></br>
        </Form.Group>

        <Button type="submit" variant="primary">
          Davom etish
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
