import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ListGroup, Card, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { error, success } = orderCreate;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  cart.shippingPrice = cart.itemPrice >= 300000 ? 0 : 15000;
  cart.totalPrice = Number(cart.itemPrice) + Number(cart.shippingPrice);

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  useEffect(() => {
    if (success) {
      navigate(`/`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, navigate]);

  const placeOrder = (e) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: 0,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={7}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Yetkazib berish</h2>
              <p>
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  Yetkazib berish:{" "}
                </span>
                {cart.shippingAddress.region} viloyati,{" "}
                {cart.shippingAddress.district} tumani,{" "}
                {cart.shippingAddress.street}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>To'lov turi</h2>
              <p>
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  To'lov:{" "}
                </span>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Mahsulotlar</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">
                  Savatda hozircha mahsulotlar yo'q.
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            className="product-image-image"
                          ></Image>
                        </Col>

                        <Col style={{ display: "flex", alignItems: "center" }}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col
                          md={4}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          {item.qty} x{" "}
                          {Math.round(item.price)
                            .toLocaleString("en-US")
                            .replace(/,/g, " ")}{" "}
                          ={" "}
                          {Math.round(item.qty * item.price)
                            .toLocaleString("en-US")
                            .replace(/,/g, " ")}{" "}
                          so'm
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={5}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    display: "block",
                    color: "#11999E",
                  }}
                >
                  <strong>Buyurtmangiz</strong>
                </span>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Mahsulotlar:</Col>
                  <Col>
                    <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      {Math.round(cart.itemsPrice)
                        .toLocaleString("en-US")
                        .replace(/,/g, " ")}{" "}
                      so'm
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Yetkazib berish:</Col>
                  <Col>
                    <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      {cart.shippingPrice === 0
                        ? "Bepul"
                        : Math.round(cart.shippingPrice)
                            .toLocaleString("en-US")
                            .replace(/,/g, " ") + " so'm"}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Jami:</Col>
                  <Col>
                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                      {Math.round(cart.itemsPrice + cart.shippingPrice)
                        .toLocaleString("en-US")
                        .replace(/,/g, " ")}{" "}
                      so'm
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrder}
                >
                  Buyurtma berish
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
